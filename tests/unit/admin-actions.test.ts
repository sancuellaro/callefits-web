/**
 * admin-actions.test.ts — Validación unitaria de schemas Zod del panel admin.
 *
 * Prueba los schemas directamente (sin Server Actions) para garantizar que
 * las reglas de negocio críticas son correctas antes de llegar al servidor.
 */
import { describe, expect, it } from "vitest";
import {
  AdminLoginSchema,
  UpdateProductPricingSchema,
  UpdateVariantStockSchema,
  ImageUploadSchema,
  CreateProductSchema,
  DeleteProductSchema,
  AddVariantSchema,
  DeleteVariantSchema,
  generateSlug,
} from "@/lib/admin-schemas";

// ─── generateSlug ──────────────────────────────────────────────────────────────

describe("generateSlug", () => {
  it("convierte nombre con mayúsculas y espacios a kebab-case", () => {
    expect(generateSlug("Legging Seamless Sculpt Pro")).toBe("legging-seamless-sculpt-pro");
  });

  it("elimina tildes y caracteres especiales", () => {
    expect(generateSlug("Enterizo Óscar Énfasis")).toBe("enterizo-oscar-enfasis");
  });

  it("colapsa múltiples espacios/guiones en uno", () => {
    expect(generateSlug("Top   Halter  Luxe")).toBe("top-halter-luxe");
  });
});

// ─── AdminLoginSchema ──────────────────────────────────────────────────────────

describe("AdminLoginSchema", () => {
  it("rechaza email con formato incorrecto", () => {
    const r = AdminLoginSchema.safeParse({ email: "no-es-un-email", password: "Callefits2026!" });
    expect(r.success).toBe(false);
  });
  it("rechaza contraseña vacía", () => {
    const r = AdminLoginSchema.safeParse({ email: "admin@callefits.com", password: "" });
    expect(r.success).toBe(false);
  });
  it("rechaza contraseña con menos de 6 caracteres", () => {
    const r = AdminLoginSchema.safeParse({ email: "admin@callefits.com", password: "abc" });
    expect(r.success).toBe(false);
  });
  it("acepta credenciales válidas", () => {
    const r = AdminLoginSchema.safeParse({ email: "admin@callefits.com", password: "Callefits2026!" });
    expect(r.success).toBe(true);
  });
});

// ─── UpdateProductPricingSchema ───────────────────────────────────────────────

describe("UpdateProductPricingSchema — corrección de bug de precios", () => {
  const base = { productId: "prod-001", status: "active", isFeatured: "false" };

  it("acepta precio exacto de $120.000 COP sin errores", () => {
    const r = UpdateProductPricingSchema.safeParse({ ...base, basePrice: "120000" });
    expect(r.success).toBe(true);
    expect(r.data?.basePrice).toBe(120000);
  });

  it("acepta precio de $135.000 COP (caso real del catálogo)", () => {
    const r = UpdateProductPricingSchema.safeParse({ ...base, basePrice: "135000" });
    expect(r.success).toBe(true);
  });

  it("acepta cualquier entero positivo ≥ 1000 como precio base", () => {
    const r = UpdateProductPricingSchema.safeParse({ ...base, basePrice: "95000" });
    expect(r.success).toBe(true);
  });

  it("rechaza precio base menor a $1.000 COP", () => {
    const r = UpdateProductPricingSchema.safeParse({ ...base, basePrice: "500" });
    expect(r.success).toBe(false);
  });

  it("rechaza precio base cero", () => {
    const r = UpdateProductPricingSchema.safeParse({ ...base, basePrice: "0" });
    expect(r.success).toBe(false);
  });

  it("rechaza precio base negativo", () => {
    const r = UpdateProductPricingSchema.safeParse({ ...base, basePrice: "-10000" });
    expect(r.success).toBe(false);
  });

  it("acepta sin compareAtPrice (campo opcional — vacío o undefined)", () => {
    const r = UpdateProductPricingSchema.safeParse({ ...base, basePrice: "135000", compareAtPrice: "" });
    expect(r.success).toBe(true);
    expect(r.data?.compareAtPrice).toBeUndefined();
  });

  it("acepta compareAtPrice mayor al basePrice", () => {
    const r = UpdateProductPricingSchema.safeParse({
      ...base, basePrice: "135000", compareAtPrice: "160000",
    });
    expect(r.success).toBe(true);
    expect(r.data?.compareAtPrice).toBe(160000);
  });

  it("rechaza compareAtPrice menor o igual al basePrice", () => {
    const r = UpdateProductPricingSchema.safeParse({
      ...base, basePrice: "135000", compareAtPrice: "100000",
    });
    expect(r.success).toBe(false);
  });

  it("rechaza status no permitido (archived)", () => {
    const r = UpdateProductPricingSchema.safeParse({ ...base, basePrice: "135000", status: "archived" });
    expect(r.success).toBe(false);
  });

  it("acepta status 'draft'", () => {
    const r = UpdateProductPricingSchema.safeParse({ ...base, basePrice: "135000", status: "draft" });
    expect(r.success).toBe(true);
  });
});

// ─── UpdateVariantStockSchema ─────────────────────────────────────────────────

describe("UpdateVariantStockSchema", () => {
  const base = { variantId: "var-001-1", productSlug: "legging-seamless-sculpt-pro", isAvailable: "true" };

  it("acepta stock cero (agotado)", () => {
    const r = UpdateVariantStockSchema.safeParse({ ...base, stockQuantity: "0" });
    expect(r.success).toBe(true);
    expect(r.data?.stockQuantity).toBe(0);
  });

  it("rechaza stock negativo", () => {
    const r = UpdateVariantStockSchema.safeParse({ ...base, stockQuantity: "-1" });
    expect(r.success).toBe(false);
  });

  it("convierte 'on' (checkbox HTML) a true", () => {
    const r = UpdateVariantStockSchema.safeParse({ ...base, stockQuantity: "8", isAvailable: "on" });
    expect(r.success).toBe(true);
    expect(r.data?.isAvailable).toBe(true);
  });
});

// ─── CreateProductSchema ──────────────────────────────────────────────────────

describe("CreateProductSchema", () => {
  const validProduct = {
    name: "Legging Seamless Test",
    category: "leggings",
    shortDescription: "Descripción breve de prueba suficientemente larga",
    description: "Descripción técnica detallada del producto de prueba para validación",
    basePrice: "135000",
    status: "draft",
    isFeatured: "false",
    compression: "Alta",
    material: "80% Poliamida, 20% Elastano",
    waistType: "Tiro Alto Anatómico",
    careInstructions: "Lavar en agua fría\nNo usar secadora",
    variantSize: "M",
    variantColor: "Negro Ónix",
    variantColorHex: "#121212",
    variantStock: "10",
  };

  it("acepta datos completos y válidos de un nuevo producto", () => {
    const r = CreateProductSchema.safeParse(validProduct);
    expect(r.success).toBe(true);
    expect(r.data?.name).toBe("Legging Seamless Test");
    expect(r.data?.basePrice).toBe(135000);
    expect(r.data?.careInstructions).toEqual(["Lavar en agua fría", "No usar secadora"]);
  });

  it("rechaza nombre con menos de 3 caracteres", () => {
    const r = CreateProductSchema.safeParse({ ...validProduct, name: "AB" });
    expect(r.success).toBe(false);
  });

  it("rechaza categoría inválida", () => {
    const r = CreateProductSchema.safeParse({ ...validProduct, category: "zapatos" });
    expect(r.success).toBe(false);
  });

  it("rechaza precio base bajo el mínimo de $1.000", () => {
    const r = CreateProductSchema.safeParse({ ...validProduct, basePrice: "500" });
    expect(r.success).toBe(false);
  });

  it("rechaza hex de color con formato incorrecto", () => {
    const r = CreateProductSchema.safeParse({ ...validProduct, variantColorHex: "121212" });
    expect(r.success).toBe(false);
  });

  it("acepta talla XS como variante inicial", () => {
    const r = CreateProductSchema.safeParse({ ...validProduct, variantSize: "XS" });
    expect(r.success).toBe(true);
    expect(r.data?.variantSize).toBe("XS");
  });
});

// ─── DeleteProductSchema ──────────────────────────────────────────────────────

describe("DeleteProductSchema", () => {
  it("acepta un ID de producto válido", () => {
    const r = DeleteProductSchema.safeParse({ productId: "prod-001" });
    expect(r.success).toBe(true);
  });
  it("rechaza ID vacío", () => {
    const r = DeleteProductSchema.safeParse({ productId: "" });
    expect(r.success).toBe(false);
  });
});

// ─── AddVariantSchema ─────────────────────────────────────────────────────────

describe("AddVariantSchema", () => {
  const validVariant = {
    productId: "prod-001",
    productSlug: "legging-seamless-sculpt-pro",
    size: "L",
    color: "Café Moca",
    colorHex: "#6B4A3A",
    stockQuantity: "5",
  };

  it("acepta datos válidos de una nueva variante", () => {
    const r = AddVariantSchema.safeParse(validVariant);
    expect(r.success).toBe(true);
    expect(r.data?.size).toBe("L");
    expect(r.data?.colorHex).toBe("#6B4A3A");
  });

  it("rechaza talla inválida", () => {
    const r = AddVariantSchema.safeParse({ ...validVariant, size: "XXL" });
    expect(r.success).toBe(false);
  });

  it("rechaza hex sin símbolo #", () => {
    const r = AddVariantSchema.safeParse({ ...validVariant, colorHex: "6B4A3A" });
    expect(r.success).toBe(false);
  });

  it("rechaza stock negativo", () => {
    const r = AddVariantSchema.safeParse({ ...validVariant, stockQuantity: "-1" });
    expect(r.success).toBe(false);
  });
});

// ─── DeleteVariantSchema ──────────────────────────────────────────────────────

describe("DeleteVariantSchema", () => {
  it("acepta variante con slug válido", () => {
    const r = DeleteVariantSchema.safeParse({
      variantId: "var-001-1",
      productSlug: "legging-seamless-sculpt-pro",
    });
    expect(r.success).toBe(true);
  });
  it("rechaza variantId vacío", () => {
    const r = DeleteVariantSchema.safeParse({ variantId: "", productSlug: "mi-prenda" });
    expect(r.success).toBe(false);
  });
});

// ─── ImageUploadSchema ────────────────────────────────────────────────────────

describe("ImageUploadSchema", () => {
  it("rechaza altText con menos de 5 caracteres", () => {
    const r = ImageUploadSchema.safeParse({
      productId: "prod-001", altText: "img",
      file: new File(["test"], "test.webp", { type: "image/webp" }),
    });
    expect(r.success).toBe(false);
  });

  it("rechaza tipos de archivo no permitidos (gif)", () => {
    const r = ImageUploadSchema.safeParse({
      productId: "prod-001", altText: "Foto de producto",
      file: new File(["test"], "test.gif", { type: "image/gif" }),
    });
    expect(r.success).toBe(false);
  });

  it("acepta imagen webp con alt descriptivo", () => {
    const r = ImageUploadSchema.safeParse({
      productId: "prod-001", altText: "Legging en Negro Ónix, vista frontal",
      file: new File(["contenido"], "foto.webp", { type: "image/webp" }),
    });
    expect(r.success).toBe(true);
  });
});
