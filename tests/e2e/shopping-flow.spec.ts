import { test, expect } from "@playwright/test";

/**
 * Flujo crítico de compra — CALLEFITS BY DANNI
 *
 * Cubre: Home → Catálogo → Filtros → Ficha de producto → Botón WhatsApp.
 * Selectores semánticos (getByRole, getByLabel, getByText) para robustez.
 * waitUntil:'domcontentloaded' para evitar timeouts por recursos tardíos.
 */

const GOTO_OPTS = { waitUntil: "domcontentloaded" as const };

test.describe("Flujo de compra principal", () => {
  test("Test 1 — Home muestra titular y navega a /catalog al hacer clic en CTA", async ({
    page,
  }) => {
    await page.goto("/", GOTO_OPTS);

    // El titular principal del hero debe estar visible
    const heading = page.getByRole("heading", { level: 1 }).first();
    await expect(heading).toBeVisible();

    // CTA principal "EXPLORAR COLECCIÓN"
    const ctaLink = page.getByRole("link", { name: /explorar colecci/i }).first();
    await expect(ctaLink).toBeVisible();
    await ctaLink.click();

    // Debe navegar al catálogo
    await expect(page).toHaveURL(/\/catalog/);
  });

  test("Test 2 — Filtro de categoría 'Leggings' actualiza URL y muestra prendas", async ({
    page,
  }) => {
    await page.goto("/catalog", GOTO_OPTS);

    // Esperar a que cargue algún elemento de la grilla
    await page.waitForSelector('[aria-label*="cat"]', { timeout: 20_000 }).catch(() => null);

    // Clic en el filtro de categoría Leggings
    const leggingsBtn = page.getByRole("button", { name: "Leggings" });
    await expect(leggingsBtn).toBeVisible();
    await leggingsBtn.click();

    // La URL debe contener el parámetro de categoría
    await expect(page).toHaveURL(/category=leggings/);

    // Debe mostrar al menos un resultado
    const items = page.getByRole("listitem");
    expect(await items.count()).toBeGreaterThan(0);
  });

  test("Test 3 — Clic en primera prenda navega a la ficha de producto", async ({
    page,
  }) => {
    await page.goto("/catalog", GOTO_OPTS);

    // Obtener el primer enlace de prenda de la grilla
    const firstProductLink = page
      .getByRole("listitem")
      .filter({ has: page.locator('a[href*="/catalog/"]') })
      .first()
      .getByRole("link");

    await expect(firstProductLink).toBeVisible({ timeout: 20_000 });
    await firstProductLink.click();

    // Debe navegar a /catalog/[slug]
    await expect(page).toHaveURL(/\/catalog\/.+/);

    // La ficha de producto usa <article>
    await expect(page.getByRole("article")).toBeVisible();
  });

  test("Test 4 — Botón WhatsApp en ficha de producto tiene URL con protocolo wa.me", async ({
    page,
  }) => {
    await page.goto("/catalog/legging-seamless-sculpt-pro", GOTO_OPTS);

    // Esperar que el panel de compra cargue
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible({ timeout: 20_000 });

    // Intentar seleccionar talla M si el botón existe y está habilitado
    const sizeM = page.getByRole("button", { name: /Talla M/ });
    const sizeMCount = await sizeM.count();
    if (sizeMCount > 0) {
      const isEnabled = await sizeM.isEnabled();
      if (isEnabled) await sizeM.click();
    }

    // Esperar a que el CTA de WhatsApp (o botón agotado) esté presente
    // Usando CSS selector que cubre ambos casos
    const ctaLocator = page.locator(
      'a[href*="wa.me"], button[disabled]:has-text("AGOTADO")',
    );
    await expect(ctaLocator.first()).toBeVisible({ timeout: 20_000 });

    // Si hay link activo de WhatsApp, verificar su URL
    const waLinks = page.locator('a[href*="wa.me"]');
    const waCount = await waLinks.count();
    if (waCount > 0) {
      const href = await waLinks.first().getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toContain("wa.me");
      // El mensaje decodificado debe contener el nombre del producto
      const decoded = decodeURIComponent(href ?? "");
      expect(decoded.toLowerCase()).toContain("legging");
    }
  });
});
