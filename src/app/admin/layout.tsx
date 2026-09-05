/**
 * admin/layout.tsx — Layout del panel administrativo.
 *
 * Comportamiento:
 * - Sin sesión activa: renderiza solo {children} (login form sin barra).
 * - Con sesión activa: renderiza TopBar + sidebar links + {children}.
 *
 * La verificación de sesión es Server-Side; no expone datos al cliente.
 */
import Link from "next/link";
import { cookies } from "next/headers";
import { ExternalLink, LayoutGrid, LogOut } from "lucide-react";
import { logoutAdminAction } from "./actions";
import { isSupabaseConfigured } from "@/lib/services/product-service";
import {
  DEMO_SESSION_COOKIE,
  DEMO_SESSION_VALUE,
} from "@/middleware";
import { BRAND_CONFIG } from "@/config/brand.config";

// ─── Verificación de sesión (Server-Side) ────────────────────────────────────

async function getAdminSession(): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      return !!user;
    } catch {
      return false;
    }
  }

  const cookieStore = await cookies();
  return cookieStore.get(DEMO_SESSION_COOKIE)?.value === DEMO_SESSION_VALUE;
}

// ─── TopBar ───────────────────────────────────────────────────────────────────

function AdminTopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-primary">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/admin/products"
          className="flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
          aria-label="Panel de administración CALLEFITS BY DANNI"
        >
          <span className="text-sm font-bold tracking-tight text-brand-primary-foreground">
            CALLEFITS
          </span>
          <span className="text-[8px] font-light uppercase tracking-[0.3em] text-brand-primary-foreground/60">
            BY DANNI
          </span>
        </Link>

        {/* Centro — badge modo */}
        <span className="hidden rounded-full border border-white/20 px-3 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-primary-foreground/70 sm:block">
          MODO ADMINISTRADORA
        </span>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <Link
            href="/catalog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-[var(--radius)] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-brand-primary-foreground/70 transition-colors hover:bg-white/10 hover:text-brand-primary-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Ver Tienda</span>
          </Link>

          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-[var(--radius)] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-brand-primary-foreground/70 transition-colors hover:bg-white/10 hover:text-brand-primary-foreground"
              aria-label="Cerrar sesión de administración"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </div>

      {/* Sub-nav */}
      <div className="border-t border-white/10 bg-brand-primary/95">
        <div className="mx-auto flex max-w-7xl gap-1 px-4 py-1 sm:px-6 lg:px-8">
          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 rounded-[var(--radius)] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-brand-primary-foreground/60 transition-colors hover:bg-white/10 hover:text-brand-primary-foreground"
          >
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
            Productos
          </Link>
        </div>
      </div>
    </header>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await getAdminSession();

  // Sin sesión: solo renderiza children (será la pantalla de login)
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AdminTopBar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="border-t border-black/5 py-3">
        <p className="text-center text-[11px] text-neutral-400">
          Panel Administrativo — {BRAND_CONFIG.name}
        </p>
      </footer>
    </div>
  );
}
