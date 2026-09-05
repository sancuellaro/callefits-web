import { describe, expect, it } from "vitest";
import {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getRelatedProducts,
  getCategoriesWithCounts,
} from "@/lib/services/product-service";

// ─── getProducts ──────────────────────────────────────────────────────────────

describe("getProducts", () => {
  it("retorna las 16 prendas del catálogo por defecto (sin filtros)", async () => {
    const products = await getProducts();
    expect(products).toHaveLength(16);
  });

  it("filtra exactamente 4 prendas para la categoría 'leggings'", async () => {
    const products = await getProducts({ category: "leggings" });
    expect(products).toHaveLength(4);
    expect(products.every((p) => p.category === "leggings")).toBe(true);
  });

  it("filtra exactamente 4 prendas para la categoría 'tops'", async () => {
    const products = await getProducts({ category: "tops" });
    expect(products).toHaveLength(4);
    expect(products.every((p) => p.category === "tops")).toBe(true);
  });

  it("filtra exactamente 4 prendas para la categoría 'sets'", async () => {
    const products = await getProducts({ category: "sets" });
    expect(products).toHaveLength(4);
    expect(products.every((p) => p.category === "sets")).toBe(true);
  });

  it("filtra exactamente 4 prendas para la categoría 'enterizos'", async () => {
    const products = await getProducts({ category: "enterizos" });
    expect(products).toHaveLength(4);
    expect(products.every((p) => p.category === "enterizos")).toBe(true);
  });

  it("ordena por 'price_asc': el primer elemento tiene el precio más bajo", async () => {
    const products = await getProducts({ sort: "price_asc" });
    expect(products.length).toBeGreaterThan(0);
    const prices = products.map((p) => p.basePrice);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]!);
    }
  });

  it("ordena por 'price_desc': el primer elemento tiene el precio más alto", async () => {
    const products = await getProducts({ sort: "price_desc" });
    expect(products.length).toBeGreaterThan(0);
    const prices = products.map((p) => p.basePrice);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]!);
    }
  });

  it("filtra solo los productos destacados (isFeatured: true)", async () => {
    const products = await getProducts({ featured: true });
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => p.isFeatured === true)).toBe(true);
  });

  it("búsqueda textual encuentra prendas que contienen la query en el nombre", async () => {
    const results = await getProducts({ search: "seamless" });
    expect(results.length).toBeGreaterThan(0);
    // Todos los resultados deben contener 'seamless' en alguno de sus campos buscables
    expect(
      results.every(
        (p) =>
          p.name.toLowerCase().includes("seamless") ||
          p.shortDescription.toLowerCase().includes("seamless") ||
          p.attributes.material.toLowerCase().includes("seamless"),
      ),
    ).toBe(true);
  });

  it("retorna array vacío cuando la búsqueda textual no coincide", async () => {
    const results = await getProducts({ search: "zzz-inexistente-xyz" });
    expect(results).toHaveLength(0);
  });

  it("combina filtros: category 'leggings' + sort 'price_desc'", async () => {
    const products = await getProducts({ category: "leggings", sort: "price_desc" });
    expect(products).toHaveLength(4);
    const prices = products.map((p) => p.basePrice);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]!);
    }
  });
});

// ─── getProductBySlug ──────────────────────────────────────────────────────────

describe("getProductBySlug", () => {
  it("encuentra el Legging Seamless Sculpt Pro por su slug", async () => {
    const product = await getProductBySlug("legging-seamless-sculpt-pro");
    expect(product).not.toBeNull();
    expect(product?.name).toBe("Legging Seamless Sculpt Pro");
    expect(product?.category).toBe("leggings");
  });

  it("encuentra el producto con compareAtPrice cuando tiene descuento", async () => {
    const product = await getProductBySlug("legging-seamless-sculpt-pro");
    expect(product?.compareAtPrice).toBe(160000);
    expect(product?.basePrice).toBe(135000);
  });

  it("retorna null cuando el slug no existe en el catálogo", async () => {
    const product = await getProductBySlug("producto-que-no-existe");
    expect(product).toBeNull();
  });

  it("retorna null para un slug vacío", async () => {
    const product = await getProductBySlug("");
    expect(product).toBeNull();
  });

  it("encuentra el enterizo destacado por slug", async () => {
    const product = await getProductBySlug("enterizo-escultor-halter-backless");
    expect(product).not.toBeNull();
    expect(product?.isFeatured).toBe(true);
    expect(product?.category).toBe("enterizos");
  });
});

// ─── getFeaturedProducts ───────────────────────────────────────────────────────

describe("getFeaturedProducts", () => {
  it("retorna solo productos con isFeatured: true", async () => {
    const products = await getFeaturedProducts();
    expect(products.every((p) => p.isFeatured)).toBe(true);
  });

  it("respeta el límite cuando se especifica", async () => {
    const products = await getFeaturedProducts(2);
    expect(products.length).toBeLessThanOrEqual(2);
  });

  it("retorna al menos 4 productos destacados del catálogo mock", async () => {
    const products = await getFeaturedProducts(10);
    expect(products.length).toBeGreaterThanOrEqual(4);
  });
});

// ─── getRelatedProducts ────────────────────────────────────────────────────────

describe("getRelatedProducts", () => {
  it("retorna productos de la misma categoría excluyendo el slug actual", async () => {
    const related = await getRelatedProducts("legging-seamless-sculpt-pro", "leggings");
    expect(related.every((p) => p.category === "leggings")).toBe(true);
    expect(related.every((p) => p.slug !== "legging-seamless-sculpt-pro")).toBe(true);
  });

  it("retorna máximo 3 relacionados para categoría con 4 total (excluido 1)", async () => {
    const related = await getRelatedProducts("biker-high-waist-airtouch", "leggings");
    expect(related.length).toBeLessThanOrEqual(3);
  });

  it("respeta el límite personalizado de resultados", async () => {
    const related = await getRelatedProducts("legging-seamless-sculpt-pro", "leggings", 2);
    expect(related.length).toBeLessThanOrEqual(2);
  });
});

// ─── getCategoriesWithCounts ───────────────────────────────────────────────────

describe("getCategoriesWithCounts", () => {
  it("retorna exactamente 4 categorías", async () => {
    const categories = await getCategoriesWithCounts();
    expect(categories).toHaveLength(4);
  });

  it("todas las categorías tienen count igual a 4", async () => {
    const categories = await getCategoriesWithCounts();
    expect(categories.every((c) => c.count === 4)).toBe(true);
  });

  it("todas las categorías tienen una imagen válida (URL no vacía)", async () => {
    const categories = await getCategoriesWithCounts();
    expect(categories.every((c) => c.image.startsWith("https://"))).toBe(true);
  });

  it("los nombres de categoría son los labels en español definidos en CATEGORY_LABELS", async () => {
    const categories = await getCategoriesWithCounts();
    const names = categories.map((c) => c.name);
    expect(names).toContain("Leggings");
    expect(names).toContain("Tops");
    expect(names).toContain("Sets Combinados");
    expect(names).toContain("Enterizos");
  });
});
