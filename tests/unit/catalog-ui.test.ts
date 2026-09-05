import { describe, expect, it } from "vitest";
import {
  getUniqueColors,
  getAllUniqueSizes,
  getVariantByColorAndSize,
  isSizeAvailableForColor,
  getFirstAvailableSizeForColor,
} from "@/lib/variant-utils";
import type { ProductVariant } from "@/types/product";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

/** Conjunto de variantes de prueba que representa un producto real del catálogo. */
const MOCK_VARIANTS: ProductVariant[] = [
  {
    id: "v1",
    sku: "CF-TEST-BLK-S",
    size: "S",
    color: "Negro Ónix",
    colorHex: "#121212",
    stockQuantity: 8,
    isAvailable: true,
  },
  {
    id: "v2",
    sku: "CF-TEST-BLK-M",
    size: "M",
    color: "Negro Ónix",
    colorHex: "#121212",
    stockQuantity: 12,
    isAvailable: true,
  },
  {
    id: "v3",
    sku: "CF-TEST-MOC-M",
    size: "M",
    color: "Café Moca",
    colorHex: "#6B4A3A",
    stockQuantity: 6,
    isAvailable: true,
  },
  {
    id: "v4",
    sku: "CF-TEST-OLV-L",
    size: "L",
    color: "Verde Oliva Táctico",
    colorHex: "#5C6B3A",
    stockQuantity: 4,
    isAvailable: true,
  },
  {
    id: "v5",
    sku: "CF-TEST-MID-L",
    size: "L",
    color: "Azul Medianoche",
    colorHex: "#1A2744",
    stockQuantity: 0,         // Sin stock
    isAvailable: false,
  },
  {
    id: "v6",
    sku: "CF-TEST-BLK-XS",
    size: "XS",
    color: "Negro Ónix",
    colorHex: "#121212",
    stockQuantity: 0,         // Sin stock aunque exists
    isAvailable: false,
  },
];

// ─── getUniqueColors ───────────────────────────────────────────────────────────

describe("getUniqueColors", () => {
  it("retorna cada color único exactamente una vez", () => {
    const colors = getUniqueColors(MOCK_VARIANTS);
    const names = colors.map((c) => c.color);
    expect(names).toEqual(["Negro Ónix", "Café Moca", "Verde Oliva Táctico", "Azul Medianoche"]);
  });

  it("no incluye duplicados de colores repetidos", () => {
    const colors = getUniqueColors(MOCK_VARIANTS);
    const uniqueNames = new Set(colors.map((c) => c.color));
    expect(uniqueNames.size).toBe(colors.length);
  });

  it("preserva el colorHex correcto de cada color", () => {
    const colors = getUniqueColors(MOCK_VARIANTS);
    const negro = colors.find((c) => c.color === "Negro Ónix");
    expect(negro?.colorHex).toBe("#121212");
    const moca = colors.find((c) => c.color === "Café Moca");
    expect(moca?.colorHex).toBe("#6B4A3A");
  });

  it("retorna array vacío cuando no hay variantes", () => {
    expect(getUniqueColors([])).toEqual([]);
  });
});

// ─── getAllUniqueSizes ─────────────────────────────────────────────────────────

describe("getAllUniqueSizes", () => {
  it("retorna las tallas en orden canónico XS → XL", () => {
    const sizes = getAllUniqueSizes(MOCK_VARIANTS);
    // MOCK_VARIANTS tiene: XS, S, M, L
    expect(sizes).toEqual(["XS", "S", "M", "L"]);
  });

  it("no incluye tallas que no existen en las variantes", () => {
    const sizes = getAllUniqueSizes(MOCK_VARIANTS);
    expect(sizes).not.toContain("XL");
  });

  it("no incluye duplicados", () => {
    const sizes = getAllUniqueSizes(MOCK_VARIANTS);
    expect(new Set(sizes).size).toBe(sizes.length);
  });

  it("retorna array vacío cuando no hay variantes", () => {
    expect(getAllUniqueSizes([])).toEqual([]);
  });
});

// ─── getVariantByColorAndSize ─────────────────────────────────────────────────

describe("getVariantByColorAndSize", () => {
  it("encuentra la variante correcta por color y talla", () => {
    const v = getVariantByColorAndSize(MOCK_VARIANTS, "Negro Ónix", "M");
    expect(v?.id).toBe("v2");
    expect(v?.sku).toBe("CF-TEST-BLK-M");
  });

  it("retorna undefined cuando el color no existe", () => {
    const v = getVariantByColorAndSize(MOCK_VARIANTS, "Rosa Pastel Inexistente", "M");
    expect(v).toBeUndefined();
  });

  it("retorna undefined cuando la talla no existe para ese color", () => {
    const v = getVariantByColorAndSize(MOCK_VARIANTS, "Café Moca", "S");
    expect(v).toBeUndefined();
  });

  it("encuentra variante de Azul Medianoche L (sin stock)", () => {
    const v = getVariantByColorAndSize(MOCK_VARIANTS, "Azul Medianoche", "L");
    expect(v?.id).toBe("v5");
    expect(v?.isAvailable).toBe(false);
    expect(v?.stockQuantity).toBe(0);
  });
});

// ─── isSizeAvailableForColor ──────────────────────────────────────────────────

describe("isSizeAvailableForColor", () => {
  it("retorna true para variantes con stock y disponibilidad activa", () => {
    expect(isSizeAvailableForColor(MOCK_VARIANTS, "Negro Ónix", "S")).toBe(true);
    expect(isSizeAvailableForColor(MOCK_VARIANTS, "Negro Ónix", "M")).toBe(true);
    expect(isSizeAvailableForColor(MOCK_VARIANTS, "Café Moca", "M")).toBe(true);
  });

  it("retorna false cuando isAvailable es false (aunque exista la variante)", () => {
    expect(isSizeAvailableForColor(MOCK_VARIANTS, "Azul Medianoche", "L")).toBe(false);
  });

  it("retorna false cuando stockQuantity es 0 (aunque isAvailable sea false)", () => {
    expect(isSizeAvailableForColor(MOCK_VARIANTS, "Negro Ónix", "XS")).toBe(false);
  });

  it("retorna false cuando la combinación color+talla no existe", () => {
    expect(isSizeAvailableForColor(MOCK_VARIANTS, "Café Moca", "XL")).toBe(false);
    expect(isSizeAvailableForColor(MOCK_VARIANTS, "Azul Inexistente", "M")).toBe(false);
  });
});

// ─── getFirstAvailableSizeForColor ────────────────────────────────────────────

describe("getFirstAvailableSizeForColor", () => {
  it("retorna la primera talla disponible para Negro Ónix (S)", () => {
    // Negro Ónix tiene XS(sin stock), S(con stock), M(con stock)
    // En orden SIZE_ORDER: XS → S → M → L → XL
    // XS no disponible → siguiente con stock es S
    const size = getFirstAvailableSizeForColor(MOCK_VARIANTS, "Negro Ónix");
    expect(size).toBe("S");
  });

  it("retorna la primera talla disponible para Café Moca (M)", () => {
    const size = getFirstAvailableSizeForColor(MOCK_VARIANTS, "Café Moca");
    expect(size).toBe("M");
  });

  it("retorna undefined cuando el color no tiene ninguna talla disponible", () => {
    const size = getFirstAvailableSizeForColor(MOCK_VARIANTS, "Azul Medianoche");
    expect(size).toBeUndefined();
  });

  it("retorna undefined cuando el color no existe", () => {
    const size = getFirstAvailableSizeForColor(MOCK_VARIANTS, "Color Inexistente");
    expect(size).toBeUndefined();
  });
});
