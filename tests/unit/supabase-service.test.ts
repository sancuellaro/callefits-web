/**
 * supabase-service.test.ts — Pruebas unitarias del adaptador híbrido.
 *
 * En el entorno de test (Vitest), NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
 * no están configuradas, por lo que isSupabaseConfigured() retorna false y todas
 * las funciones del servicio operan 100% sobre el catálogo mock local.
 * Esto garantiza que los tests son deterministas y no dependen de conectividad externa.
 */
import { describe, expect, it } from "vitest";
import {
  isSupabaseConfigured,
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getRelatedProducts,
  getCategoriesWithCounts,
} from "@/lib/services/product-service";
import { ProductSchema } from "@/types/product";

// ─── isSupabaseConfigured ──────────────────────────────────────────────────────

describe("isSupabaseConfigured()", () => {
  it("retorna false cuando NEXT_PUBLIC_SUPABASE_URL no está configurada en el entorno de test", () => {
    expect(isSupabaseConfigured()).toBe(false);
  });

  it("retorna el tipo boolean", () => {
    expect(typeof isSupabaseConfigured()).toBe("boolean");
  });
});

// ─── Fallback al catálogo mock ────────────────────────────────────────────────

describe("getProducts() — fallback al mock cuando Supabase no está configurado", () => {
  it("retorna los 16 productos activos del catálogo mock", async () => {
    const products = await getProducts();
    expect(products).toHaveLength(16);
  });

  it("todos los productos retornados pasan la validación de ProductSchema", async () => {
    const products = await getProducts();
    products.forEach((p) => {
      expect(() => ProductSchema.parse(p)).not.toThrow();
    });
  });

  it("filtra correctamente por categoría 'leggings' (debe retornar 4)", async () => {
    const leggings = await getProducts({ category: "leggings" });
    expect(leggings).toHaveLength(4);
    expect(leggings.every((p) => p.category === "leggings")).toBe(true);
  });

  it("ordena por price_asc: el primer producto tiene el precio más bajo", async () => {
    const products = await getProducts({ sort: "price_asc" });
    const prices = products.map((p) => p.basePrice);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]!);
    }
  });

  it("ordena por price_desc: el primer producto tiene el precio más alto", async () => {
    const products = await getProducts({ sort: "price_desc" });
    const prices = products.map((p) => p.basePrice);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]!);
    }
  });

  it("búsqueda textual retorna productos relevantes", async () => {
    const results = await getProducts({ search: "legging" });
    expect(results.length).toBeGreaterThan(0);
  });

  it("búsqueda sin resultados retorna array vacío", async () => {
    const results = await getProducts({ search: "zzz_producto_inexistente_xyz" });
    expect(results).toHaveLength(0);
  });
});

// ─── getProductBySlug ──────────────────────────────────────────────────────────

describe("getProductBySlug() — fallback al mock", () => {
  it("encuentra el Legging Seamless Sculpt Pro por slug", async () => {
    const p = await getProductBySlug("legging-seamless-sculpt-pro");
    expect(p).not.toBeNull();
    expect(p?.name).toBe("Legging Seamless Sculpt Pro");
  });

  it("el producto encontrado pasa validación de ProductSchema", async () => {
    const p = await getProductBySlug("legging-seamless-sculpt-pro");
    expect(() => ProductSchema.parse(p)).not.toThrow();
  });

  it("retorna null cuando el slug no existe", async () => {
    const p = await getProductBySlug("slug-que-no-existe-en-catalogo");
    expect(p).toBeNull();
  });

  it("retorna null para slug vacío", async () => {
    const p = await getProductBySlug("");
    expect(p).toBeNull();
  });

  it("el producto tiene al menos 2 imágenes con URL válida (BR-004)", async () => {
    const p = await getProductBySlug("legging-seamless-sculpt-pro");
    expect(p?.images.length).toBeGreaterThanOrEqual(2);
    p?.images.forEach((img) => {
      expect(img.url).toMatch(/^https?:\/\//);
    });
  });

  it("el producto tiene al menos 3 variantes con SKU único", async () => {
    const p = await getProductBySlug("legging-seamless-sculpt-pro");
    expect(p?.variants.length).toBeGreaterThanOrEqual(3);
    const skus = p?.variants.map((v) => v.sku) ?? [];
    expect(new Set(skus).size).toBe(skus.length);
  });
});

// ─── getFeaturedProducts ───────────────────────────────────────────────────────

describe("getFeaturedProducts() — fallback al mock", () => {
  it("retorna solo productos con isFeatured: true", async () => {
    const products = await getFeaturedProducts();
    expect(products.every((p) => p.isFeatured)).toBe(true);
  });

  it("respeta el límite especificado", async () => {
    const products = await getFeaturedProducts(2);
    expect(products.length).toBeLessThanOrEqual(2);
  });

  it("el catálogo mock tiene al menos 4 productos destacados", async () => {
    const products = await getFeaturedProducts(10);
    expect(products.length).toBeGreaterThanOrEqual(4);
  });
});

// ─── getRelatedProducts ────────────────────────────────────────────────────────

describe("getRelatedProducts() — fallback al mock", () => {
  it("retorna productos de la misma categoría sin incluir el producto actual", async () => {
    const related = await getRelatedProducts("legging-seamless-sculpt-pro", "leggings");
    expect(related.every((p) => p.category === "leggings")).toBe(true);
    expect(related.every((p) => p.slug !== "legging-seamless-sculpt-pro")).toBe(true);
  });

  it("respeta el límite de resultados", async () => {
    const related = await getRelatedProducts("legging-seamless-sculpt-pro", "leggings", 2);
    expect(related.length).toBeLessThanOrEqual(2);
  });
});

// ─── getCategoriesWithCounts ───────────────────────────────────────────────────

describe("getCategoriesWithCounts() — fallback al mock", () => {
  it("retorna exactamente 4 categorías", async () => {
    const cats = await getCategoriesWithCounts();
    expect(cats).toHaveLength(4);
  });

  it("cada categoría tiene count > 0 y una imagen URL válida", async () => {
    const cats = await getCategoriesWithCounts();
    cats.forEach((c) => {
      expect(c.count).toBeGreaterThan(0);
      expect(c.image).toMatch(/^https?:\/\//);
    });
  });

  it("los slugs de categoría son valores válidos del enum", async () => {
    const cats = await getCategoriesWithCounts();
    const validSlugs = ["leggings", "tops", "sets", "enterizos"];
    cats.forEach((c) => {
      expect(validSlugs).toContain(c.category);
    });
  });
});
