-- ═══════════════════════════════════════════════════════════════════════════
-- CALLEFITS BY DANNI — Grants de privilegios sobre schema public
-- Ejecutar en Supabase Dashboard → SQL Editor DESPUÉS de la migración.
--
-- Supabase no otorga privilegios automáticamente a los roles cuando las
-- tablas son creadas con SQL puro (CREATE TABLE). Estos GRANTs son
-- obligatorios para que el catálogo público y el panel admin funcionen.
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── Acceso al schema ─────────────────────────────────────────────────────────
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- ─── service_role (admin key — bypasea RLS pero NECESITA grant de tabla) ─────
-- Necesario para que el panel admin pueda hacer INSERT/UPDATE/DELETE
GRANT ALL PRIVILEGES ON public.categories       TO service_role;
GRANT ALL PRIVILEGES ON public.products         TO service_role;
GRANT ALL PRIVILEGES ON public.product_variants TO service_role;
GRANT ALL PRIVILEGES ON public.product_images   TO service_role;
GRANT ALL PRIVILEGES ON public.testimonials     TO service_role;

-- ─── anon (clave pública — lectura del catálogo) ──────────────────────────────
-- Las políticas RLS filtran qué filas son visibles (solo activos/publicados)
GRANT SELECT ON public.categories       TO anon;
GRANT SELECT ON public.products         TO anon;
GRANT SELECT ON public.product_variants TO anon;
GRANT SELECT ON public.product_images   TO anon;
GRANT SELECT ON public.testimonials     TO anon;

-- ─── authenticated (usuario con sesión — admin panel con RLS activo) ──────────
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories       TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products         TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_variants TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_images   TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials     TO authenticated;

-- ─── Secuencias (necesario para INSERT con gen_random_uuid()) ─────────────────
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- ─── Storage: bucket products-media ──────────────────────────────────────────
GRANT ALL ON storage.buckets  TO service_role;
GRANT ALL ON storage.objects  TO service_role;
