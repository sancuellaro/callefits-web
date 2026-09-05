/**
 * supabase/client.ts — Cliente Supabase para componentes 'use client'.
 *
 * IMPORTANTE: Solo usar en componentes con 'use client' (navegador).
 * Para Server Components y Server Actions, usar @/lib/supabase/server.ts.
 * Para operaciones administrativas (Panel Admin), usar @/lib/supabase/admin.ts.
 */
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
