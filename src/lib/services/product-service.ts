/**
 * product-service.ts — Adaptador híbrido resiliente de datos de productos.
 *
 * ARQUITECTURA MOCK-FALLBACK:
 * ┌───────────────────────────────────────────────────────────┐
 * │  isSupabaseConfigured()?                                  │
 * │      YES → Consulta PostgreSQL (Supabase)                 │
 * │      NO  → Mock local (src/data/mock-products.ts)         │
 * │                                                           │
 * │  Error de red / Supabase inalcanzable →                   │
 * │      → Warn en consola + fallback a mock local            │
 * └───────────────────────────────────────────────────────────┘
 *
 * Los componentes UI NUNCA deben importar el mock directamente.
 * En Fase 7 (Supabase conectado), el swap es transparente.
 * Cero `any`. Tipos inferidos desde ProductSchema y tipos internos.
 */
import {
  type Category,
  type Product,
  type ProductFilters,
  ProductSchema,
  CATEGORY_LABELS,
  CategoryEnum,
} from "@/types/product";

// ─── Mock local (fallback) ────────────────────────────────────────────────────

import { MOCK_PRODUCTS } from "@/data/mock-products";

// ─── Tipos internos de filas de la base de datos ─────────────────────────────

type DbImageRow = {
  id: string;
  storage_path: string;
  alt_text: string;
  sort_order: number;
  is_primary: boolean;
};

type DbVariantRow = {
  id: string;
  sku: string;
  size: string;
  color: string;
  color_hex: string;
  stock_quantity: number;
  is_available: boolean;
  price_override: number | null;
};

type DbProductRow = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  base_price: number;
  compare_at_price: number | null;
  status: string;
  is_featured: boolean;
  attributes: {
    compression: string;
    material: string;
    waistType: string;
    careInstructions: string[];
  };
  created_at: string;
  categories: { slug: string } | null;
  product_images: DbImageRow[];
  product_variants: DbVariantRow[];
};

// ─── Helpers internos ─────────────────────────────────────────────────────────

/**
 * Verifica si las variables de entorno de Supabase están configuradas.
 * Exportada para testabilidad unitaria (ver tests/unit/supabase-service.test.ts).
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return (
    typeof url === "string" &&
    url.trim().length > 0 &&
    typeof key === "string" &&
    key.trim().length > 0
  );
}

/**
 * Construye la URL pública de una imagen a partir de su storage_path.
 * - Si storage_path es una URL completa (Unsplash en desarrollo), la retorna tal cual.
 * - Si es una ruta relativa, construye la URL del CDN de Supabase Storage.
 */
function resolveImageUrl(storagePath: string): string {
  if (storagePath.startsWith("http://") || storagePath.startsWith("https://")) {
    return storagePath;
  }
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return `${base}/storage/v1/object/public/products-media/${storagePath}`;
}

/**
 * Convierte una fila de DB (snake_case) al tipo `Product` (camelCase, validado por Zod).
 * Retorna `null` si la validación falla (ej. datos corruptos en DB) para no propagar errores.
 */
function mapDbRowToProduct(row: DbProductRow): Product | null {
  try {
    const categorySlug = row.categories?.slug;
    if (!categorySlug) {
      console.warn("[ProductService] Producto sin categoría asociada:", row.id);
      return null;
    }

    return ProductSchema.parse({
      id: row.id,
      slug: row.slug,
      name: row.name,
      shortDescription: row.short_description,
      description: row.description,
      basePrice: Math.round(Number(row.base_price)),
      compareAtPrice:
        row.compare_at_price != null
          ? Math.round(Number(row.compare_at_price))
          : undefined,
      category: categorySlug,
      isFeatured: row.is_featured,
      status: row.status as "draft" | "active" | "archived",
      attributes: {
        compression: row.attributes.compression as "Alta" | "Media" | "Ligera",
        material: row.attributes.material,
        waistType: row.attributes.waistType,
        careInstructions: row.attributes.careInstructions,
      },
      images: [...row.product_images]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((img) => ({
          id: img.id,
          url: resolveImageUrl(img.storage_path),
          altText: img.alt_text,
          isPrimary: img.is_primary,
          sortOrder: img.sort_order,
        })),
      variants: row.product_variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        size: v.size as "XS" | "S" | "M" | "L" | "XL",
        color: v.color,
        colorHex: v.color_hex,
        stockQuantity: v.stock_quantity,
        isAvailable: v.is_available,
        ...(v.price_override != null
          ? { priceOverride: Number(v.price_override) }
          : {}),
      })),
      createdAt: row.created_at,
    });
  } catch (err) {
    console.error("[ProductService] Error mapeando producto:", row.id, err);
    return null;
  }
}

/** Aplica filtros y ordenamiento en memoria sobre un array de productos. */
function applyFiltersInMemory(
  products: Product[],
  filters?: ProductFilters,
): Product[] {
  let results = products.filter(
    (p) => p.status !== "archived" && p.status !== "draft",
  );

  if (filters?.category !== undefined) {
    results = results.filter((p) => p.category === filters.category);
  }
  if (filters?.size !== undefined) {
    results = results.filter((p) =>
      p.variants.some((v) => v.size === filters.size && v.isAvailable),
    );
  }
  if (filters?.featured !== undefined) {
    results = results.filter((p) => p.isFeatured === filters.featured);
  }
  if (filters?.search?.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.attributes.material.toLowerCase().includes(q),
    );
  }

  switch (filters?.sort) {
    case "price_asc":
      results = [...results].sort((a, b) => a.basePrice - b.basePrice);
      break;
    case "price_desc":
      results = [...results].sort((a, b) => b.basePrice - a.basePrice);
      break;
    case "newest":
      results = [...results].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    default:
      results = [...results].sort((a, b) => {
        if (b.isFeatured && !a.isFeatured) return 1;
        if (a.isFeatured && !b.isFeatured) return -1;
        return a.id.localeCompare(b.id);
      });
  }
  return results;
}

// ─── SELECT de productos desde Supabase ──────────────────────────────────────

const PRODUCT_SELECT = `
  id, slug, name, short_description, description,
  base_price, compare_at_price, status, is_featured,
  attributes, created_at,
  categories!inner(slug),
  product_images(id, storage_path, alt_text, sort_order, is_primary),
  product_variants(id, sku, size, color, color_hex, stock_quantity, is_available, price_override)
` as const;

// ─── getProducts ──────────────────────────────────────────────────────────────

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    console.info("[ProductService] Usando catálogo local (Supabase no configurado).");
    return applyFiltersInMemory(MOCK_PRODUCTS, filters);
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("status", "active");

    if (error) throw error;

    const rows = (data ?? []) as unknown as DbProductRow[];
    const products = rows.map(mapDbRowToProduct).filter((p): p is Product => p !== null);
    return applyFiltersInMemory(products, filters);
  } catch (err) {
    console.warn(
      "[ProductService] Usando catálogo local (Supabase no configurado o inalcanzable).",
      err,
    );
    return applyFiltersInMemory(MOCK_PRODUCTS, filters);
  }
}

// ─── getProductBySlug ──────────────────────────────────────────────────────────

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug && p.status === "active") ?? null;
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("slug", slug)
      .eq("status", "active")
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return mapDbRowToProduct(data as unknown as DbProductRow);
  } catch (err) {
    console.warn(
      "[ProductService] Usando catálogo local (Supabase no configurado o inalcanzable).",
      err,
    );
    return MOCK_PRODUCTS.find((p) => p.slug === slug && p.status === "active") ?? null;
  }
}

// ─── getFeaturedProducts ───────────────────────────────────────────────────────

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.filter((p) => p.isFeatured && p.status === "active").slice(
      0,
      limit,
    );
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("status", "active")
      .eq("is_featured", true)
      .limit(limit);

    if (error) throw error;

    const rows = (data ?? []) as unknown as DbProductRow[];
    return rows.map(mapDbRowToProduct).filter((p): p is Product => p !== null);
  } catch (err) {
    console.warn(
      "[ProductService] Usando catálogo local (Supabase no configurado o inalcanzable).",
      err,
    );
    return MOCK_PRODUCTS.filter((p) => p.isFeatured && p.status === "active").slice(0, limit);
  }
}

// ─── getRelatedProducts ────────────────────────────────────────────────────────

export async function getRelatedProducts(
  currentSlug: string,
  category: Category,
  limit = 4,
): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_PRODUCTS.filter(
      (p) => p.category === category && p.slug !== currentSlug && p.status === "active",
    ).slice(0, limit);
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    // Obtener category_id desde el slug de categoría
    const { data: catData, error: catError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", category)
      .eq("is_active", true)
      .maybeSingle();

    if (catError || !catData) throw catError ?? new Error("Categoría no encontrada");

    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("category_id", catData.id)
      .eq("status", "active")
      .neq("slug", currentSlug)
      .limit(limit);

    if (error) throw error;

    const rows = (data ?? []) as unknown as DbProductRow[];
    return rows.map(mapDbRowToProduct).filter((p): p is Product => p !== null);
  } catch (err) {
    console.warn(
      "[ProductService] Usando catálogo local (Supabase no configurado o inalcanzable).",
      err,
    );
    return MOCK_PRODUCTS.filter(
      (p) => p.category === category && p.slug !== currentSlug && p.status === "active",
    ).slice(0, limit);
  }
}

// ─── getCategoriesWithCounts ───────────────────────────────────────────────────

export interface CategorySummary {
  category: Category;
  name: string;
  count: number;
  image: string;
}

export async function getCategoriesWithCounts(): Promise<CategorySummary[]> {
  if (!isSupabaseConfigured()) {
    return buildCategorySummaryFromMock();
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const { data: categories, error } = await supabase
      .from("categories")
      .select("id, slug, name")
      .eq("is_active", true)
      .order("name");

    if (error) throw error;

    const summaries = await Promise.all(
      (categories ?? []).map(async (cat) => {
        const { count } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("category_id", cat.id)
          .eq("status", "active");

        const { data: featuredImgs } = await supabase
          .from("products")
          .select("product_images(storage_path, is_primary)")
          .eq("category_id", cat.id)
          .eq("is_featured", true)
          .eq("status", "active")
          .limit(1);

        type FeaturedImgRow = { product_images: { storage_path: string; is_primary: boolean }[] };
        const firstFeatured = (featuredImgs as unknown as FeaturedImgRow[] | null)?.[0];
        const primaryPath =
          firstFeatured?.product_images.find((i) => i.is_primary)?.storage_path ?? "";

        return {
          category: cat.slug as Category,
          name: cat.name,
          count: count ?? 0,
          image: resolveImageUrl(primaryPath),
        };
      }),
    );

    return summaries;
  } catch (err) {
    console.warn(
      "[ProductService] Usando catálogo local (Supabase no configurado o inalcanzable).",
      err,
    );
    return buildCategorySummaryFromMock();
  }
}

/** Helper: construye el resumen de categorías desde el catálogo mock local. */
function buildCategorySummaryFromMock(): CategorySummary[] {
  return CategoryEnum.options.map((category) => {
    const items = MOCK_PRODUCTS.filter(
      (p) => p.category === category && p.status === "active",
    );
    const featured = items.find((p) => p.isFeatured);
    const rep = featured ?? items[0];
    const primaryImage =
      rep?.images.find((i) => i.isPrimary)?.url ?? rep?.images[0]?.url ?? "";

    return {
      category,
      name: CATEGORY_LABELS[category],
      count: items.length,
      image: primaryImage,
    };
  });
}
