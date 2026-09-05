/**
 * env-check.ts — Verificación de variables de entorno.
 *
 * EDGE-SAFE: sin imports de next/headers, next/cache ni módulos server-only.
 * Seguro de importar en Client Components, Server Components y middleware.
 */

/** Verifica si las credenciales de Supabase están presentes en el entorno. */
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
