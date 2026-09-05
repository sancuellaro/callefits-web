/**
 * admin-actions.test.ts — Validación unitaria de los schemas Zod del panel admin.
 *
 * Prueba los schemas de validación directamente (sin ejecutar Server Actions,
 * que requieren entorno Next.js). Esto garantiza que las reglas de negocio
 * críticas (precios, stock, credenciales) son correctas antes de que
 * el código llegue al servidor.
 */
import { describe, expect, it } from "vitest";
import {
  AdminLoginSchema,
  UpdateProductPricingSchema,
  UpdateVariantStockSchema,
  ImageUploadSchema,
} from "@/lib/admin-schemas";

// ─── AdminLoginSchema ──────────────────────────────────────────────────────────

describe("AdminLoginSchema", () => {
  it("rechaza un email con formato incorrecto", () => {
    const result = AdminLoginSchema.safeParse({
      email: "no-es-un-email",
      password: "Callefits2026!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0]?.message).toMatch(/email/i);
  });

  it("rechaza contraseña vacía", () => {
    const result = AdminLoginSchema.safeParse({
      email: "admin@callefits.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza contraseña con menos de 6 caracteres", () => {
    const result = AdminLoginSchema.safeParse({
      email: "admin@callefits.com",
      password: "abc",
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0]?.message).toContain("6 caracteres");
  });

  it("rechaza email vacío", () => {
    const result = AdminLoginSchema.safeParse({
      email: "",
      password: "Callefits2026!",
    });
    expect(result.success).toBe(false);
  });

  it("acepta credenciales válidas de demo", () => {
    const result = AdminLoginSchema.safeParse({
      email: "admin@callefits.com",
      password: "Callefits2026!",
    });
    expect(result.success).toBe(true);
    expect(result.data?.email).toBe("admin@callefits.com");
  });
});

// ─── UpdateProductPricingSchema ───────────────────────────────────────────────

describe("UpdateProductPricingSchema", () => {
  const valid = {
    productId: "prod-001",
    basePrice: "135000",
    compareAtPrice: "",
    status: "active",
    isFeatured: "false",
  };

  it("rechaza precio base negativo", () => {
    const result = UpdateProductPricingSchema.safeParse({
      ...valid,
      basePrice: "-10000",
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0]?.message).toMatch(/positivo/i);
  });

  it("rechaza precio base cero", () => {
    const result = UpdateProductPricingSchema.safeParse({
      ...valid,
      basePrice: "0",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza productId vacío", () => {
    const result = UpdateProductPricingSchema.safeParse({
      ...valid,
      productId: "",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza estado no permitido", () => {
    const result = UpdateProductPricingSchema.safeParse({
      ...valid,
      status: "archived", // no está en el enum del schema
    });
    expect(result.success).toBe(false);
  });

  it("acepta datos válidos de precio activo", () => {
    const result = UpdateProductPricingSchema.safeParse(valid);
    expect(result.success).toBe(true);
    expect(result.data?.basePrice).toBe(135000);
    expect(result.data?.status).toBe("active");
    expect(result.data?.compareAtPrice).toBeUndefined();
  });

  it("acepta precio base y compareAtPrice como cadenas numéricas (FormData)", () => {
    const result = UpdateProductPricingSchema.safeParse({
      productId: "prod-009",
      basePrice: "169000",
      compareAtPrice: "195000",
      status: "active",
      isFeatured: "on",
    });
    expect(result.success).toBe(true);
    expect(result.data?.basePrice).toBe(169000);
    expect(result.data?.compareAtPrice).toBe(195000);
    expect(result.data?.isFeatured).toBe(true);
  });

  it("acepta status 'draft' como borrador", () => {
    const result = UpdateProductPricingSchema.safeParse({
      ...valid,
      status: "draft",
    });
    expect(result.success).toBe(true);
    expect(result.data?.status).toBe("draft");
  });
});

// ─── UpdateVariantStockSchema ─────────────────────────────────────────────────

describe("UpdateVariantStockSchema", () => {
  const valid = {
    variantId: "var-001-1",
    productSlug: "legging-seamless-sculpt-pro",
    stockQuantity: "8",
    isAvailable: "true",
  };

  it("rechaza stock negativo", () => {
    const result = UpdateVariantStockSchema.safeParse({
      ...valid,
      stockQuantity: "-1",
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0]?.message).toMatch(/negativo/i);
  });

  it("acepta stock cero (agotado)", () => {
    const result = UpdateVariantStockSchema.safeParse({
      ...valid,
      stockQuantity: "0",
      isAvailable: "false",
    });
    expect(result.success).toBe(true);
    expect(result.data?.stockQuantity).toBe(0);
    expect(result.data?.isAvailable).toBe(false);
  });

  it("rechaza variantId vacío", () => {
    const result = UpdateVariantStockSchema.safeParse({
      ...valid,
      variantId: "",
    });
    expect(result.success).toBe(false);
  });

  it("convierte 'on' (checkbox HTML) a boolean true para isAvailable", () => {
    const result = UpdateVariantStockSchema.safeParse({
      ...valid,
      isAvailable: "on",
    });
    expect(result.success).toBe(true);
    expect(result.data?.isAvailable).toBe(true);
  });

  it("acepta datos válidos de stock disponible", () => {
    const result = UpdateVariantStockSchema.safeParse(valid);
    expect(result.success).toBe(true);
    expect(result.data?.stockQuantity).toBe(8);
    expect(result.data?.isAvailable).toBe(true);
  });
});

// ─── ImageUploadSchema ────────────────────────────────────────────────────────

describe("ImageUploadSchema — validación de texto alternativo", () => {
  it("rechaza altText con menos de 5 caracteres", () => {
    const result = ImageUploadSchema.safeParse({
      productId: "prod-001",
      altText: "img",
      file: new File(["test"], "test.webp", { type: "image/webp" }),
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0]?.message).toContain("5 caracteres");
  });

  it("rechaza tipos de archivo no permitidos", () => {
    const result = ImageUploadSchema.safeParse({
      productId: "prod-001",
      altText: "Foto de producto válida",
      file: new File(["test"], "test.gif", { type: "image/gif" }),
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0]?.message).toMatch(/webp|jpeg|png/i);
  });

  it("rechaza archivos mayores a 5 MB", () => {
    const bigBuffer = new ArrayBuffer(5 * 1024 * 1024 + 1);
    const result = ImageUploadSchema.safeParse({
      productId: "prod-001",
      altText: "Foto de producto válida para test",
      file: new File([bigBuffer], "big.jpg", { type: "image/jpeg" }),
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0]?.message).toContain("5 MB");
  });

  it("acepta imagen WebP con altText descriptivo", () => {
    const result = ImageUploadSchema.safeParse({
      productId: "prod-001",
      altText: "Legging Seamless Sculpt Pro en Negro Ónix, vista frontal",
      file: new File(["contenido"], "foto.webp", { type: "image/webp" }),
    });
    expect(result.success).toBe(true);
  });
});
