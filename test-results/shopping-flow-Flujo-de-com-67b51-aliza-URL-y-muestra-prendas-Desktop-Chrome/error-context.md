# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shopping-flow.spec.ts >> Flujo de compra principal >> Test 2 — Filtro de categoría 'Leggings' actualiza URL y muestra prendas
- Location: tests\e2e\shopping-flow.spec.ts:32:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /category=leggings/
Received string:  "http://localhost:3000/catalog"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html lang="es" class="__variable_246ccd __variable_c29908 h-full antialiased">…</html>
       - unexpected value "http://localhost:3000/catalog"

```

```yaml
- link "Saltar al contenido principal":
  - /url: "#main-content"
- banner "Anuncios de la tienda":
  - paragraph: ENVÍOS A TODO EL PAÍS • CONFECCIÓN PREMIUM & ALTO RENDIMIENTO • ATENCIÓN PERSONALIZADA POR WHATSAPP
- banner:
  - link "CALLEFITS BY DANNI — Ir al inicio":
    - /url: /
    - text: CALLEFITS BY DANNI
  - navigation "Navegación principal":
    - link "Inicio":
      - /url: /
    - link "Catálogo":
      - /url: /catalog
    - link "Colecciones":
      - /url: /catalog?featured=true
    - link "Sobre Danni":
      - /url: /#sobre-danni
    - link "Preguntas":
      - /url: /#faq
  - link "Instagram de CALLEFITS BY DANNI":
    - /url: https://instagram.com/callefitsbydanni
  - link "TikTok de CALLEFITS BY DANNI":
    - /url: https://tiktok.com/@callefitsbydanni
- main:
  - paragraph: CALLEFITS BY DANNI
  - heading "COLECCIÓN DE ALTO RENDIMIENTO" [level=1]
  - paragraph: Prendas deportivas diseñadas con soporte anatómico, compresión graduada y máxima sofisticación. Cada pieza, una declaración de poder y elegancia.
  - button "Todas" [pressed]
  - button "Leggings"
  - button "Tops"
  - button "Sets"
  - button "Enterizos"
  - paragraph: Mostrando 16 prendas de alta gama
  - combobox "Ordenar catálogo":
    - option "Destacados" [selected]
    - 'option "Precio: Menor a Mayor"'
    - 'option "Precio: Mayor a Menor"'
    - option "Novedades"
  - list "Catálogo de prendas deportivas":
    - listitem:
      - link "Ver Legging Seamless Sculpt Pro":
        - /url: /catalog/legging-seamless-sculpt-pro
        - img "Legging Seamless Sculpt Pro en Negro Ónix, vista frontal completa mostrando el tiro ultra alto"
        - text: OFERTA -25% Leggings
        - paragraph: Legging Seamless Sculpt Pro
        - text: $ 120.000 COP $ 160.000 COP
    - listitem:
      - link "Ver Legging Ribbed V-Waist Mocha":
        - /url: /catalog/legging-ribbed-v-waist-mocha
        - img "Legging Ribbed V-Waist Mocha en Café Moca Tostado, detalle de cintura en V"
        - text: DESTACADO Leggings
        - paragraph: Legging Ribbed V-Waist Mocha
        - text: $ 140.000 COP
    - listitem:
      - link "Ver Top Deportivo Vitality Cross-Back":
        - /url: /catalog/top-deportivo-vitality-cross-back
        - img "Top Deportivo Vitality Cross-Back en Negro Ónix, vista de la espalda cruzada"
        - text: DESTACADO Tops
        - paragraph: Top Deportivo Vitality Cross-Back
        - text: $ 85.000 COP
    - listitem:
      - link "Ver Set Essential Sculpt Biker & Top":
        - /url: /catalog/set-essential-sculpt-biker-top
        - img "Set Essential Sculpt Biker & Top en Café Moca Tostado completo, vista frontal"
        - text: OFERTA -13% Sets Combinados
        - paragraph: Set Essential Sculpt Biker & Top
        - text: $ 169.000 COP $ 195.000 COP
    - listitem:
      - link "Ver Set Terracota Energy Duo":
        - /url: /catalog/set-terracota-energy-duo
        - img "Set Terracota Energy Duo vista frontal completa en color Terracota"
        - text: DESTACADO Sets Combinados
        - paragraph: Set Terracota Energy Duo
        - text: $ 185.000 COP
    - listitem:
      - link "Ver Enterizo Escultor Halter Backless":
        - /url: /catalog/enterizo-escultor-halter-backless
        - img "Enterizo Escultor Halter Backless en Negro Ónix, vista de espalda abierta en U"
        - text: DESTACADO Enterizos
        - paragraph: Enterizo Escultor Halter Backless
        - text: $ 179.000 COP
    - listitem:
      - link "Ver Biker High-Waist AirTouch":
        - /url: /catalog/biker-high-waist-airtouch
        - img "Biker High-Waist AirTouch en Negro Ónix, modelo en postura de extensión completa"
        - text: Leggings
        - paragraph: Biker High-Waist AirTouch
        - text: $ 95.000 COP
    - listitem:
      - link "Ver Legging Compresivo Eclipse Noir":
        - /url: /catalog/legging-compresivo-eclipse-noir
        - img "Legging Compresivo Eclipse Noir en Negro Ónix, vista frontal completa"
        - text: Leggings
        - paragraph: Legging Compresivo Eclipse Noir
        - text: $ 145.000 COP
    - listitem:
      - link "Ver Top Halter Sculpt Asymmetric":
        - /url: /catalog/top-halter-sculpt-asymmetric
        - img "Top Halter Sculpt Asymmetric en Negro Ónix, vista frontal del diseño de un hombro"
        - text: Tops
        - paragraph: Top Halter Sculpt Asymmetric
        - text: $ 89.000 COP
    - listitem:
      - link "Ver Crop Top Manga Larga Seamless Flow":
        - /url: /catalog/crop-top-manga-larga-seamless-flow
        - img "Crop Top Manga Larga Seamless Flow en Gris Mineral, vista frontal"
        - text: Tops
        - paragraph: Crop Top Manga Larga Seamless Flow
        - text: $ 115.000 COP
    - listitem:
      - link "Ver Top Bralette Essential Luxe":
        - /url: /catalog/top-bralette-essential-luxe
        - img "Top Bralette Essential Luxe en Negro Ónix, vista frontal del escote cuadrado"
        - text: Tops
        - paragraph: Top Bralette Essential Luxe
        - text: $ 79.000 COP
    - listitem:
      - link "Ver Set Ribbed Athletic Olive":
        - /url: /catalog/set-ribbed-athletic-olive
        - img "Set Ribbed Athletic Olive en Verde Oliva Táctico, conjunto completo coordinado"
        - text: Sets Combinados
        - paragraph: Set Ribbed Athletic Olive
        - text: $ 189.000 COP
    - listitem:
      - link "Ver Set Core Comfort Midnight":
        - /url: /catalog/set-core-comfort-midnight
        - img "Set Core Comfort Midnight en Azul Medianoche, conjunto de top y biker"
        - text: Sets Combinados
        - paragraph: Set Core Comfort Midnight
        - text: $ 175.000 COP
    - listitem:
      - link "Ver Catsuit Deportivo Long-Leg Eclipse":
        - /url: /catalog/catsuit-deportivo-long-leg-eclipse
        - img "Catsuit Deportivo Long-Leg Eclipse en Negro Ónix, vista frontal del enterizo completo"
        - text: Enterizos
        - paragraph: Catsuit Deportivo Long-Leg Eclipse
        - text: $ 210.000 COP
    - listitem:
      - link "Ver Unitard Biker Contour Studio":
        - /url: /catalog/unitard-biker-contour-studio
        - img "Unitard Biker Contour Studio en Negro Ónix, vista frontal del corte biker"
        - text: Enterizos
        - paragraph: Unitard Biker Contour Studio
        - text: $ 155.000 COP
    - listitem:
      - link "Ver Enterizo Ribbed Strappy Performance":
        - /url: /catalog/enterizo-ribbed-strappy-performance
        - img "Enterizo Ribbed Strappy Performance en Terracota, vista de la espalda con tirantes cruzados"
        - text: Enterizos
        - paragraph: Enterizo Ribbed Strappy Performance
        - text: $ 169.000 COP
- contentinfo:
  - heading "CALLEFITS BY DANNI" [level=3]
  - paragraph: Prendas deportivas de alta gama diseñadas para brindar máxima compresión, confort anatómico y sofisticación en cada entrenamiento. Confección con amor y precisión desde Colombia.
  - paragraph: “Elegancia, disciplina y confort en cada movimiento”
  - heading "Explorar" [level=3]
  - navigation "Navegación del catálogo en el pie de página":
    - link "Leggings":
      - /url: /catalog?category=leggings
    - link "Tops":
      - /url: /catalog?category=tops
    - link "Sets Combinados":
      - /url: /catalog?category=sets-combinados
    - link "Enterizos":
      - /url: /catalog?category=enterizos
    - link "Guía de Tallas":
      - /url: /#guia-tallas
  - heading "Atención al Cliente" [level=3]
  - paragraph: Lunes a Sábado 9:00 am – 7:00 pm (COT)
  - paragraph: Tiempo de despacho nacional 3 a 7 días hábiles
  - 'link "WhatsApp: +57 300 000 0000"':
    - /url: https://wa.me/573000000000?text=Hola%20CALLEFITS%20BY%20DANNI%2C%20deseo%20recibir%20informaci%C3%B3n%20sobre%20una%20prenda%20deportiva.
  - link "contacto@callefits.com":
    - /url: mailto:contacto@callefits.com
  - heading "Comunidad" [level=3]
  - paragraph: Somos una marca auténtica. Cada prenda pasa por las manos de Danni antes de llegar a las tuyas.
  - link "Instagram de CALLEFITS BY DANNI":
    - /url: https://instagram.com/callefitsbydanni
    - text: "@callefitsbydanni"
  - link "TikTok de CALLEFITS BY DANNI":
    - /url: https://tiktok.com/@callefitsbydanni
    - text: "@callefitsbydanni"
  - paragraph: © 2026 CALLEFITS BY DANNI. Todos los derechos reservados.
  - paragraph: CALLEFITS BY DANNI S.A.S. (Pendiente)
- link "Contactar por WhatsApp":
  - /url: https://wa.me/573000000000?text=Hola%20CALLEFITS%20BY%20DANNI%2C%20deseo%20recibir%20informaci%C3%B3n%20sobre%20una%20prenda%20deportiva.
  - text: ¿Dudas con tu talla? Escríbenos
- alert
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | /**
  4   |  * Flujo crítico de compra — CALLEFITS BY DANNI
  5   |  *
  6   |  * Cubre: Home → Catálogo → Filtros → Ficha de producto → Botón WhatsApp.
  7   |  * Selectores semánticos (getByRole, getByLabel, getByText) para robustez.
  8   |  * waitUntil:'domcontentloaded' para evitar timeouts por recursos tardíos.
  9   |  */
  10  | 
  11  | const GOTO_OPTS = { waitUntil: "domcontentloaded" as const };
  12  | 
  13  | test.describe("Flujo de compra principal", () => {
  14  |   test("Test 1 — Home muestra titular y navega a /catalog al hacer clic en CTA", async ({
  15  |     page,
  16  |   }) => {
  17  |     await page.goto("/", GOTO_OPTS);
  18  | 
  19  |     // El titular principal del hero debe estar visible
  20  |     const heading = page.getByRole("heading", { level: 1 }).first();
  21  |     await expect(heading).toBeVisible();
  22  | 
  23  |     // CTA principal "EXPLORAR COLECCIÓN"
  24  |     const ctaLink = page.getByRole("link", { name: /explorar colecci/i }).first();
  25  |     await expect(ctaLink).toBeVisible();
  26  |     await ctaLink.click();
  27  | 
  28  |     // Debe navegar al catálogo
  29  |     await expect(page).toHaveURL(/\/catalog/);
  30  |   });
  31  | 
  32  |   test("Test 2 — Filtro de categoría 'Leggings' actualiza URL y muestra prendas", async ({
  33  |     page,
  34  |   }) => {
  35  |     await page.goto("/catalog", GOTO_OPTS);
  36  | 
  37  |     // Esperar a que cargue algún elemento de la grilla
  38  |     await page.waitForSelector('[aria-label*="cat"]', { timeout: 20_000 }).catch(() => null);
  39  | 
  40  |     // Clic en el filtro de categoría Leggings
  41  |     const leggingsBtn = page.getByRole("button", { name: "Leggings" });
  42  |     await expect(leggingsBtn).toBeVisible();
  43  |     await leggingsBtn.click();
  44  | 
  45  |     // La URL debe contener el parámetro de categoría
> 46  |     await expect(page).toHaveURL(/category=leggings/);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  47  | 
  48  |     // Debe mostrar al menos un resultado
  49  |     const items = page.getByRole("listitem");
  50  |     expect(await items.count()).toBeGreaterThan(0);
  51  |   });
  52  | 
  53  |   test("Test 3 — Clic en primera prenda navega a la ficha de producto", async ({
  54  |     page,
  55  |   }) => {
  56  |     await page.goto("/catalog", GOTO_OPTS);
  57  | 
  58  |     // Obtener el primer enlace de prenda de la grilla
  59  |     const firstProductLink = page
  60  |       .getByRole("listitem")
  61  |       .filter({ has: page.locator('a[href*="/catalog/"]') })
  62  |       .first()
  63  |       .getByRole("link");
  64  | 
  65  |     await expect(firstProductLink).toBeVisible({ timeout: 20_000 });
  66  |     await firstProductLink.click();
  67  | 
  68  |     // Debe navegar a /catalog/[slug]
  69  |     await expect(page).toHaveURL(/\/catalog\/.+/);
  70  | 
  71  |     // La ficha de producto usa <article>
  72  |     await expect(page.getByRole("article")).toBeVisible();
  73  |   });
  74  | 
  75  |   test("Test 4 — Botón WhatsApp en ficha de producto tiene URL con protocolo wa.me", async ({
  76  |     page,
  77  |   }) => {
  78  |     await page.goto("/catalog/legging-seamless-sculpt-pro", GOTO_OPTS);
  79  | 
  80  |     // Esperar que el panel de compra cargue
  81  |     const heading = page.getByRole("heading", { level: 1 });
  82  |     await expect(heading).toBeVisible({ timeout: 20_000 });
  83  | 
  84  |     // Intentar seleccionar talla M si el botón existe y está habilitado
  85  |     const sizeM = page.getByRole("button", { name: /Talla M/ });
  86  |     const sizeMCount = await sizeM.count();
  87  |     if (sizeMCount > 0) {
  88  |       const isEnabled = await sizeM.isEnabled();
  89  |       if (isEnabled) await sizeM.click();
  90  |     }
  91  | 
  92  |     // Esperar a que el CTA de WhatsApp (o botón agotado) esté presente
  93  |     // Usando CSS selector que cubre ambos casos
  94  |     const ctaLocator = page.locator(
  95  |       'a[href*="wa.me"], button[disabled]:has-text("AGOTADO")',
  96  |     );
  97  |     await expect(ctaLocator.first()).toBeVisible({ timeout: 20_000 });
  98  | 
  99  |     // Si hay link activo de WhatsApp, verificar su URL
  100 |     const waLinks = page.locator('a[href*="wa.me"]');
  101 |     const waCount = await waLinks.count();
  102 |     if (waCount > 0) {
  103 |       const href = await waLinks.first().getAttribute("href");
  104 |       expect(href).toBeTruthy();
  105 |       expect(href).toContain("wa.me");
  106 |       // El mensaje decodificado debe contener el nombre del producto
  107 |       const decoded = decodeURIComponent(href ?? "");
  108 |       expect(decoded.toLowerCase()).toContain("legging");
  109 |     }
  110 |   });
  111 | });
  112 | 
```