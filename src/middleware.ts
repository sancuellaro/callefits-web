/**
 * middleware.ts — Protección de rutas del panel administrativo /admin/*.
 *
 * Flujo de autenticación:
 * ┌──────────────────────────────────────────────────────────────────┐
 * │ Petición a /admin/*                                              │
 * │   ├── /admin/login → pasar sin validar                          │
 * │   └── cualquier otra ruta → validar sesión:                     │
 * │         • Supabase configurado → supabase.auth.getUser()         │
 * │         • Sin Supabase → cookie de sesión demo                  │
 * │         ├── Sin sesión → redirigir a /admin/login?redirect=     │
 * │         └── Con sesión → refresca cookies y continúa            │
 * └──────────────────────────────────────────────────────────────────┘
 *
 * Manejo de cookies: el middleware rota las cookies de sesión de Supabase
 * en cada request para evitar expiración silenciosa (best practice SSR).
 */
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// ─── Constantes ───────────────────────────────────────────────────────────────

export const DEMO_SESSION_COOKIE = "__callefits_admin_demo";
export const DEMO_SESSION_VALUE = "cf-admin-demo-2026-authenticated";

// ─── Helper inline (edge-safe, sin imports pesados) ──────────────────────────

function supabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return typeof url === "string" && url.trim().length > 0 &&
         typeof key === "string" && key.trim().length > 0;
}

// ─── Middleware ────────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Solo actúa sobre rutas /admin/*
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // /admin/login siempre pasa sin validación
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // ── Modo Supabase ────────────────────────────────────────────────────────────
  if (supabaseConfigured()) {
    const response = NextResponse.next({
      request: { headers: request.headers },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            // Escribir al request (para SSR posterior en este ciclo)
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            // Escribir a la respuesta (para el navegador)
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // Refresca la sesión y verifica autenticación en un solo round-trip
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  // ── Modo Demo (sin Supabase) ─────────────────────────────────────────────────
  const demoSession = request.cookies.get(DEMO_SESSION_COOKIE);
  if (demoSession?.value !== DEMO_SESSION_VALUE) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// ─── Configuración del matcher ────────────────────────────────────────────────

export const config = {
  matcher: ["/admin/:path*"],
};
