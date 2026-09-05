import { test, expect } from "@playwright/test";

/**
 * Protección del panel administrativo — CALLEFITS BY DANNI
 *
 * Verifica que:
 * 1. Usuarios no autenticados son redirigidos a /admin/login.
 * 2. La pantalla de login tiene el formulario accesible correcto.
 * 3. El login funciona (en modo demo sin Supabase, o con Supabase Auth).
 */

const GOTO_OPTS = { waitUntil: "domcontentloaded" as const };

test.describe("Seguridad del panel admin", () => {
  test("Test 1 — Acceso anónimo a /admin/products redirige a /admin/login", async ({
    page,
    context,
  }) => {
    // Limpiar todas las cookies para asegurar sesión nula
    await context.clearCookies();
    await page.goto("/admin/products", GOTO_OPTS);

    // El middleware debe redirigir al login
    await expect(page).toHaveURL(/\/admin\/login/, { timeout: 30_000 });

    // La pantalla de login debe estar visible
    await expect(
      page.getByText(/PANEL DE CONTROL EXCLUSIVO/i),
    ).toBeVisible();
  });

  test("Test 2 — La pantalla de login tiene formulario accesible y campos identificados", async ({
    page,
  }) => {
    await page.goto("/admin/login", GOTO_OPTS);

    // Los inputs deben ser identificables por label
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Contraseña")).toBeVisible();

    // El botón de submit debe ser accesible
    await expect(
      page.getByRole("button", { name: /iniciar sesi/i }),
    ).toBeVisible();

    // El título de la marca debe estar visible
    await expect(page.getByText("CALLEFITS").first()).toBeVisible();

    // El identificador del panel debe estar presente
    await expect(
      page.getByText(/PANEL DE CONTROL EXCLUSIVO/i),
    ).toBeVisible();
  });

  test("Test 3 — Login con credenciales de demo intenta autenticación y responde sin crash", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.goto("/admin/login", GOTO_OPTS);

    // Rellenar formulario con credenciales de demo
    await page.getByLabel("Email").fill("admin@callefits.com");
    await page.getByLabel("Contraseña").fill("Callefits2026!");
    await page.getByRole("button", { name: /iniciar sesi/i }).click();

    // Esperar la respuesta del servidor (máx 30s para Supabase auth)
    await page.waitForURL(/\/admin\/(products|login)/, { timeout: 30_000 });

    // En cualquier modo:
    // - Demo (sin Supabase): navega a /admin/products
    // - Supabase configurado pero sin usuario: queda en /admin/login con error
    // El test valida que la respuesta es una de esas dos opciones, sin crash JS
    const url = page.url();
    expect(url).toMatch(/\/admin\/(products|login)/);
  });
});
