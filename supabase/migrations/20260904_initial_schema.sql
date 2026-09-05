-- ═══════════════════════════════════════════════════════════════════════════
-- CALLEFITS BY DANNI — Migración inicial del esquema PostgreSQL 16
-- Archivo: 20260904_initial_schema.sql
-- Descripción: Schema relacional completo, índices, RLS y Storage bucket.
-- Idempotente: seguro de ejecutar múltiples veces (CREATE IF NOT EXISTS).
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── Extensiones ─────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Para búsqueda de texto eficiente

-- ─── ENUMS ───────────────────────────────────────────────────────────────────

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_type') THEN
    CREATE TYPE category_type AS ENUM ('leggings', 'tops', 'sets', 'enterizos');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'size_type') THEN
    CREATE TYPE size_type AS ENUM ('XS', 'S', 'M', 'L', 'XL');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'compression_type') THEN
    CREATE TYPE compression_type AS ENUM ('Alta', 'Media', 'Ligera');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_status') THEN
    CREATE TYPE product_status AS ENUM ('draft', 'active', 'archived');
  END IF;
END $$;

-- ─── TABLA: categories ────────────────────────────────────────────────────────
-- Categorías jerárquicas del catálogo. Slug único para URLs limpias.

CREATE TABLE IF NOT EXISTS categories (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL
                 CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name         TEXT NOT NULL,
  description  TEXT,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE categories IS 'Categorías del catálogo deportivo de CALLEFITS BY DANNI';
COMMENT ON COLUMN categories.slug IS 'Identificador URL-friendly: kebab-case minúsculas';

-- ─── TABLA: products ──────────────────────────────────────────────────────────
-- Prendas deportivas con atributos técnicos y metadata SEO.
-- El campo `attributes` almacena compresión, material, tiro y cuidados en JSONB.

CREATE TABLE IF NOT EXISTS products (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id       UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  slug              TEXT UNIQUE NOT NULL
                      CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name              TEXT NOT NULL CHECK (char_length(name) BETWEEN 3 AND 120),
  short_description TEXT NOT NULL CHECK (char_length(short_description) BETWEEN 1 AND 200),
  description       TEXT NOT NULL,
  base_price        NUMERIC(10, 2) NOT NULL CHECK (base_price >= 0),
  compare_at_price  NUMERIC(10, 2) CHECK (compare_at_price > base_price),
  status            product_status NOT NULL DEFAULT 'draft',
  is_featured       BOOLEAN NOT NULL DEFAULT false,
  seo_title         TEXT,
  seo_description   TEXT,
  -- JSONB para compresión, material, waistType y careInstructions
  attributes        JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE products IS 'Catálogo de prendas deportivas de CALLEFITS BY DANNI';
COMMENT ON COLUMN products.attributes IS 'JSON: { compression, material, waistType, careInstructions[] }';

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_products_updated_at ON products;
CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── TABLA: product_variants ──────────────────────────────────────────────────
-- Variantes de talla y color por producto. SKU único global.
-- stock_quantity: inventario actual. is_available: control editorial de visibilidad.

CREATE TABLE IF NOT EXISTS product_variants (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id     UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku            TEXT UNIQUE NOT NULL,
  size           size_type NOT NULL,
  color          TEXT NOT NULL,
  color_hex      TEXT NOT NULL CHECK (color_hex ~ '^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$'),
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  is_available   BOOLEAN NOT NULL DEFAULT true,
  price_override NUMERIC(10, 2) CHECK (price_override > 0),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE product_variants IS 'Variantes de talla y color por prenda';
COMMENT ON COLUMN product_variants.price_override IS 'Precio alternativo que supera al base_price del producto';

-- ─── TABLA: product_images ────────────────────────────────────────────────────
-- Imágenes de producto en Supabase Storage.
-- storage_path: ruta relativa dentro del bucket 'products-media'.
-- Para imágenes externas (ej. Unsplash en desarrollo), storage_path = URL completa.

CREATE TABLE IF NOT EXISTS product_images (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id   UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  alt_text     TEXT NOT NULL CHECK (char_length(alt_text) >= 5),
  sort_order   INTEGER NOT NULL DEFAULT 0,
  is_primary   BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE product_images IS 'Imágenes de producto en Supabase Storage CDN';
COMMENT ON COLUMN product_images.storage_path IS
  'Ruta en bucket products-media o URL externa para desarrollo. Construir URL pública en la capa de servicio.';

-- ─── TABLA: testimonials ─────────────────────────────────────────────────────
-- Reseñas verificadas de clientas. is_published controla visibilidad pública.

CREATE TABLE IF NOT EXISTS testimonials (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name  TEXT NOT NULL,
  city         TEXT,
  quote        TEXT NOT NULL,
  rating       INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  is_published BOOLEAN NOT NULL DEFAULT false,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE testimonials IS 'Reseñas verificadas de clientas de CALLEFITS BY DANNI';

-- ─── ÍNDICES DE RENDIMIENTO ───────────────────────────────────────────────────

-- Productos
CREATE INDEX IF NOT EXISTS idx_products_slug       ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category   ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status     ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured   ON products(is_featured) WHERE is_featured = true;

-- Búsqueda de texto en productos (pg_trgm)
CREATE INDEX IF NOT EXISTS idx_products_name_trgm  ON products USING GIN (name gin_trgm_ops);

-- Variantes e imágenes
CREATE INDEX IF NOT EXISTS idx_variants_product    ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_variants_sku        ON product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_images_product      ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_images_primary      ON product_images(product_id) WHERE is_primary = true;

-- Testimonios
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(is_published) WHERE is_published = true;

-- ─── ROW LEVEL SECURITY (RLS) ─────────────────────────────────────────────────

-- Activar RLS en todas las tablas
ALTER TABLE categories       ENABLE ROW LEVEL SECURITY;
ALTER TABLE products         ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images   ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials     ENABLE ROW LEVEL SECURITY;

-- ── POLÍTICAS PÚBLICAS (Lectura anónima) ──────────────────────────────────────

-- categories: lecturas públicas de categorías activas
DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories"
  ON categories FOR SELECT
  USING (is_active = true);

-- products: lecturas públicas solo de prendas activas (REQ-BR-001)
DROP POLICY IF EXISTS "public_read_active_products" ON products;
CREATE POLICY "public_read_active_products"
  ON products FOR SELECT
  USING (status = 'active');

-- product_variants: lecturas de variantes de productos activos
DROP POLICY IF EXISTS "public_read_product_variants" ON product_variants;
CREATE POLICY "public_read_product_variants"
  ON product_variants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_variants.product_id
        AND p.status = 'active'
    )
  );

-- product_images: lecturas de imágenes de productos activos
DROP POLICY IF EXISTS "public_read_product_images" ON product_images;
CREATE POLICY "public_read_product_images"
  ON product_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_images.product_id
        AND p.status = 'active'
    )
  );

-- testimonials: lecturas públicas solo de testimonios publicados
DROP POLICY IF EXISTS "public_read_published_testimonials" ON testimonials;
CREATE POLICY "public_read_published_testimonials"
  ON testimonials FOR SELECT
  USING (is_published = true);

-- ── POLÍTICAS ADMINISTRATIVAS (Escritura autenticada) ─────────────────────────
-- Solo usuarios con sesión autenticada (rol admin validado en middleware)
-- pueden mutar datos. El control de rol admin se implementa en Fase 7.

DROP POLICY IF EXISTS "admin_write_categories" ON categories;
CREATE POLICY "admin_write_categories"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_write_products" ON products;
CREATE POLICY "admin_write_products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_write_variants" ON product_variants;
CREATE POLICY "admin_write_variants"
  ON product_variants FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_write_images" ON product_images;
CREATE POLICY "admin_write_images"
  ON product_images FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "admin_write_testimonials" ON testimonials;
CREATE POLICY "admin_write_testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ─── SUPABASE STORAGE — Bucket products-media ────────────────────────────────
-- Bucket público para imágenes de productos optimizadas (WebP/AVIF via CDN).

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products-media',
  'products-media',
  true,
  5242880, -- 5 MB por archivo
  ARRAY['image/webp', 'image/avif', 'image/jpeg', 'image/jpg', 'image/png']
)
ON CONFLICT (id) DO UPDATE
  SET public = EXCLUDED.public,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Política de lectura pública para el bucket products-media
DROP POLICY IF EXISTS "public_read_products_media" ON storage.objects;
CREATE POLICY "public_read_products_media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products-media');

-- Política de subida para usuarios autenticados
DROP POLICY IF EXISTS "auth_upload_products_media" ON storage.objects;
CREATE POLICY "auth_upload_products_media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'products-media' AND auth.role() = 'authenticated');

-- Política de actualización para usuarios autenticados
DROP POLICY IF EXISTS "auth_update_products_media" ON storage.objects;
CREATE POLICY "auth_update_products_media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'products-media' AND auth.role() = 'authenticated');

-- Política de borrado para usuarios autenticados
DROP POLICY IF EXISTS "auth_delete_products_media" ON storage.objects;
CREATE POLICY "auth_delete_products_media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'products-media' AND auth.role() = 'authenticated');
