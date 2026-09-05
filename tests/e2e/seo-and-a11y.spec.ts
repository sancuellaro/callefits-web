import { test, expect } from "@playwright/test";

/**
 * SEO Técnico y Accesibilidad — CALLEFITS BY DANNI
 *
 * Verifica: robots.txt, sitemap.xml, JSON-LD Schema.org y
 * elementos de accesibilidad WCAG 2.2 AA.
 *
 * Nota: Las pruebas de página usan waitUntil:'domcontentloaded' para evitar
 * timeouts por recursos tardíos (Supabase queries, imágenes externas).
 */

const GOTO_OPTS = { waitUntil: "domcontentloaded" as const };

test.describe("SEO técnico y archivos de rastreo", () => {
  test("Test 1 — robots.txt retorna 200 con reglas correctas", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");

    expect(response.status()).toBe(200);
    const body = await response.text();

    // Next.js capitaliza "User-Agent" (con A mayúscula)
    expect(body).toContain("User-Agent: *");
    expect(body).toContain("Allow: /");

    // El panel admin debe estar bloqueado para robots
    expect(body).toContain("Disallow: /admin/");

    // Debe referenciar el sitemap
    expect(body).toContain("sitemap.xml");
  });

  test("Test 2 — sitemap.xml retorna 200 y contiene rutas clave", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");

    expect(response.status()).toBe(200);
    const body = await response.text();

    // Debe ser XML con namespace de sitemap
    expect(body).toContain("<?xml");
    expect(body).toContain("<urlset");

    // Debe contener la home y el catálogo
    expect(body).toContain("/catalog");

    // Debe contener al menos una ruta de producto
    expect(body).toMatch(/\/catalog\/[a-z0-9-]+/);
  });
});

test.describe("Datos estructurados Schema.org", () => {
  test("Test 3 — Home contiene schema Organization válido", async ({
    page,
  }) => {
    await page.goto("/", GOTO_OPTS);

    // Verificar que existe al menos un script JSON-LD
    const ldScripts = await page.$$('script[type="application/ld+json"]');
    expect(ldScripts.length).toBeGreaterThan(0);

    // El primer script debe tener tipo ClothingStore
    const content = await ldScripts[0]!.textContent();
    const schema = JSON.parse(content ?? "{}") as Record<string, unknown>;
    expect(schema["@type"]).toBe("ClothingStore");
    expect((schema["name"] as string)).toContain("CALLEFITS");
  });

  test("Test 4 — Ficha de producto contiene schema Product y BreadcrumbList", async ({
    page,
  }) => {
    await page.goto("/catalog/legging-seamless-sculpt-pro", GOTO_OPTS);

    const ldScripts = await page.$$('script[type="application/ld+json"]');
    expect(ldScripts.length).toBeGreaterThanOrEqual(2);

    // Extraer y parsear todos los schemas de la página
    const schemas: Record<string, unknown>[] = [];
    for (const script of ldScripts) {
      const text = await script.textContent();
      if (text) {
        try {
          schemas.push(JSON.parse(text) as Record<string, unknown>);
        } catch {
          // ignorar scripts JSON-LD con error de parsing
        }
      }
    }

    // Debe existir schema de tipo Product
    const productSchema = schemas.find((s) => s["@type"] === "Product");
    expect(productSchema).toBeDefined();
    expect((productSchema!["name"] as string)).toContain("Legging");

    // Debe existir schema de tipo BreadcrumbList
    const breadcrumb = schemas.find((s) => s["@type"] === "BreadcrumbList");
    expect(breadcrumb).toBeDefined();
  });
});

test.describe("Accesibilidad WCAG 2.2 AA", () => {
  test("Test 5 — Home tiene enlace 'Saltar al contenido principal'", async ({
    page,
  }) => {
    await page.goto("/", GOTO_OPTS);

    // El enlace de skip debe estar en el DOM (sr-only por defecto)
    const skipLink = page.getByRole("link", {
      name: /saltar al contenido principal/i,
    });
    await expect(skipLink).toBeAttached();
    expect(await skipLink.getAttribute("href")).toBe("#main-content");
  });

  test("Test 6 — El elemento main tiene id='main-content'", async ({
    page,
  }) => {
    await page.goto("/", GOTO_OPTS);
    const main = page.locator("#main-content");
    await expect(main).toBeAttached();
  });

  test("Test 7 — Botón flotante de WhatsApp tiene aria-label descriptivo", async ({
    page,
  }) => {
    await page.goto("/catalog", GOTO_OPTS);

    // El botón flotante tiene aria-label="Contactar por WhatsApp"
    // Usamos getByLabel para seleccionar específicamente el flotante (no el texto del FAQ)
    const waButton = page.getByLabel("Contactar por WhatsApp");
    await expect(waButton).toBeAttached();
    const ariaLabel = await waButton.getAttribute("aria-label");
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel!.toLowerCase()).toContain("whatsapp");
  });

  test("Test 8 — Página de catálogo tiene heading de sección accesible", async ({
    page,
  }) => {
    await page.goto("/catalog", GOTO_OPTS);
    // El encabezado principal del catálogo
    const heading = page.getByRole("heading", {
      name: /colecci.n de alto rendimiento/i,
    });
    await expect(heading).toBeVisible();
  });
});
