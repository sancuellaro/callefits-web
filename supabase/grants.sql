-- ═══════════════════════════════════════════════════════════════════════════
-- CALLEFITS BY DANNI — Grants de privilegios sobre schema public
-- Ejecutar en Supabase Dashboard → SQL Editor DESPUÉS de la migración.
--
-- Por defecto Supabase no otorga SELECT/INSERT/UPDATE/DELETE a los roles
-- anon y authenticated sobre tablas creadas con CREATE TABLE.
-- Estas sentencias son necesarias para que el catálogo público funcione
-- y para que las políticas RLS puedan evaluarse correctamente.
-- ═══════════════════════════════════════════════════════════════════════════

-- Acceso al schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Lectura pública (anon → catálogo) — las políticas RLS filtran qué filas ve cada rol
GRANT SELECT ON public.categories       TO anon, authenticated;
GRANT SELECT ON public.products         TO anon, authenticated;
GRANT SELECT ON public.product_variants TO anon, authenticated;
GRANT SELECT ON public.product_images   TO anon, authenticated;
GRANT SELECT ON public.testimonials     TO anon, authenticated;

-- Escritura administrativa (authenticated → panel admin)
-- La service role key bypasea RLS por completo y no necesita estos grants,
-- pero los dejamos para el cliente de sesión de administradora.
GRANT INSERT, UPDATE, DELETE ON public.categories       TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products         TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_variants TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_images   TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials     TO authenticated;

-- Acceso a secuencias (necesario para INSERT con serial/uuid)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
