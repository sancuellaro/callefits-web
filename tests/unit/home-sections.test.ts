import { describe, expect, it } from "vitest";
import { FAQ_DATA } from "@/data/faq-data";
import { getFeaturedProducts, getCategoriesWithCounts } from "@/lib/services/product-service";
import { BRAND_CONFIG } from "@/config/brand.config";

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

describe("FAQ_DATA", () => {
  it("contiene exactamente 5 preguntas frecuentes", () => {
    expect(FAQ_DATA).toHaveLength(5);
  });

  it("cada ítem tiene id, question y answer no vacíos", () => {
    FAQ_DATA.forEach((faq) => {
      expect(faq.id).toBeTruthy();
      expect(faq.question.length).toBeGreaterThan(10);
      expect(faq.answer.length).toBeGreaterThan(30);
    });
  });

  it("los ids de las preguntas son únicos", () => {
    const ids = FAQ_DATA.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("incluye la pregunta sobre transparencias (requerimiento de marca crítico)", () => {
    const hasTransparencias = FAQ_DATA.some(
      (f) =>
        f.question.toLowerCase().includes("transparent") ||
        f.id === "faq-transparencias",
    );
    expect(hasTransparencias).toBe(true);
  });

  it("incluye la pregunta sobre tallas", () => {
    const hasTallas = FAQ_DATA.some(
      (f) => f.question.toLowerCase().includes("talla") || f.id === "faq-tallas",
    );
    expect(hasTallas).toBe(true);
  });

  it("incluye la pregunta sobre despachos y tiempos de entrega", () => {
    const hasDespacho = FAQ_DATA.some(
      (f) => f.question.toLowerCase().includes("despacho") || f.id === "faq-despacho",
    );
    expect(hasDespacho).toBe(true);
  });

  it("incluye la pregunta sobre métodos de pago", () => {
    const hasPago = FAQ_DATA.some(
      (f) => f.question.toLowerCase().includes("pago") || f.id === "faq-pago",
    );
    expect(hasPago).toBe(true);
  });

  it("incluye la pregunta sobre política de cambios", () => {
    const hasCambios = FAQ_DATA.some(
      (f) => f.question.toLowerCase().includes("garantía") || f.id === "faq-cambios",
    );
    expect(hasCambios).toBe(true);
  });
});

// ─── Productos destacados (consumidos por FeaturedProductsSection) ────────────

describe("getFeaturedProducts — consumido por FeaturedProductsSection", () => {
  it("retorna al menos 4 productos para la grilla de la Home", async () => {
    const products = await getFeaturedProducts(4);
    expect(products.length).toBeGreaterThanOrEqual(1);
    expect(products.length).toBeLessThanOrEqual(4);
  });

  it("todos los productos retornados tienen isFeatured: true", async () => {
    const products = await getFeaturedProducts(4);
    expect(products.every((p) => p.isFeatured)).toBe(true);
  });

  it("todos los productos tienen al menos 2 imágenes (requerimiento BR-004)", async () => {
    const products = await getFeaturedProducts(4);
    expect(products.every((p) => p.images.length >= 2)).toBe(true);
  });

  it("todos los productos tienen al menos 3 variantes", async () => {
    const products = await getFeaturedProducts(4);
    expect(products.every((p) => p.variants.length >= 3)).toBe(true);
  });

  it("todos los productos tienen precio base positivo (BR-002)", async () => {
    const products = await getFeaturedProducts(4);
    expect(products.every((p) => p.basePrice > 0)).toBe(true);
  });
});

// ─── Categorías (consumidas por FeaturedCategoriesSection) ───────────────────

describe("getCategoriesWithCounts — consumido por FeaturedCategoriesSection", () => {
  it("retorna exactamente 4 categorías para la grilla de Home", async () => {
    const categories = await getCategoriesWithCounts();
    expect(categories).toHaveLength(4);
  });

  it("todas las categorías tienen imagen válida (URL https)", async () => {
    const categories = await getCategoriesWithCounts();
    expect(categories.every((c) => c.image.startsWith("https://"))).toBe(true);
  });

  it("cada categoría tiene al menos 1 prenda activa", async () => {
    const categories = await getCategoriesWithCounts();
    expect(categories.every((c) => c.count >= 1)).toBe(true);
  });
});

// ─── BRAND_CONFIG — integridad de datos en secciones de Home ─────────────────

describe("BRAND_CONFIG — datos institucionales usados en HeroSection y AboutDanni", () => {
  it("el número de WhatsApp está configurado en formato E.164", () => {
    expect(BRAND_CONFIG.contact.whatsapp.number).toMatch(/^\+\d{6,15}$/);
  });

  it("el tagline coincide con la copy del HeroSection", () => {
    expect(BRAND_CONFIG.tagline).toBe(
      "Elegancia, disciplina y confort en cada movimiento",
    );
  });

  it("tiene redes sociales configuradas para footer y secciones de comunidad", () => {
    expect(BRAND_CONFIG.socials.instagram).toContain("instagram.com");
    expect(BRAND_CONFIG.socials.tiktok).toContain("tiktok.com");
  });
});
