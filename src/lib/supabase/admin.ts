/**
 * supabase/admin.ts — Cliente Supabase con privilegios de administrador.
 *
 * REGLAS DE SEGURIDAD ESTRICTAS (ver AGENTS.md, regla técnica #5 y #6):
 * 1. NUNCA exportar `createAdminClient` a bundles del cliente.
 * 2. NUNCA usar SUPABASE_SERVICE_ROLE_KEY en componentes con 'use client'.
 * 3. Usar EXCLUSIVAMENTE en Server Actions, Route Handlers y scripts.
 * 4. Este módulo incluye una guardia de entorno que lanza un error si se
 *    invoca desde el navegador.
 */
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  // Guardia de entorno: previene uso accidental en el navegador
  if (typeof window !== "undefined") {
    throw new Error(
      "[Supabase Admin] createAdminClient() solo puede invocarse en entornos de servidor. " +
        "Nunca la importes en un componente 'use client'.",
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !url.trim()) {
    throw new Error(
      "[Supabase Admin] NEXT_PUBLIC_SUPABASE_URL no está configurada.",
    );
  }
  if (!serviceKey || !serviceKey.trim()) {
    throw new Error(
      "[Supabase Admin] SUPABASE_SERVICE_ROLE_KEY no está configurada. " +
        "Esta variable es exclusiva del servidor y nunca debe tener el prefijo NEXT_PUBLIC_.",
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      // Sin persistencia de sesión en el cliente de servicio
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
