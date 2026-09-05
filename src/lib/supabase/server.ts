/**
 * supabase/server.ts — Cliente Supabase para Server Components y Server Actions.
 *
 * Gestiona cookies de sesión de forma segura con `next/headers`.
 * Compatible con Next.js 15 App Router (cookies() es asíncrona).
 *
 * Este módulo SOLO puede importarse en código server-side.
 * Intentar importarlo en un Client Component causará un error en build.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll puede ser invocado desde un Server Component donde
            // no se permite escribir cookies. Se puede ignorar de forma segura
            // si el middleware de Supabase Auth está configurado correctamente.
          }
        },
      },
    },
  );
}
