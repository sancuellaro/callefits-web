import { describe, expect, it } from "vitest";
import {
  formatPrice,
  calculateDiscountPercentage,
  buildProductWhatsAppUrl,
} from "@/lib/formatters";
import { BRAND_CONFIG } from "@/config/brand.config";

// ─── formatPrice ──────────────────────────────────────────────────────────────

describe("formatPrice", () => {
  it("formatea cantidades estándar con separador de miles colombiano (punto)", () => {
    expect(formatPrice(135000)).toBe("$ 135.000 COP");
    expect(formatPrice(89000)).toBe("$ 89.000 COP");
    expect(formatPrice(210000)).toBe("$ 210.000 COP");
  });

  it("formatea cantidades de más de 6 dígitos correctamente", () => {
    expect(formatPrice(1000000)).toBe("$ 1.000.000 COP");
    expect(formatPrice(2500000)).toBe("$ 2.500.000 COP");
  });

  it("formatea cero sin separadores (caso límite)", () => {
    expect(formatPrice(0)).toBe("$ 0 COP");
  });

  it("incluye el símbolo $ al inicio y el sufijo COP al final", () => {
    const result = formatPrice(169000);
    expect(result.startsWith("$ ")).toBe(true);
    expect(result.endsWith(" COP")).toBe(true);
  });
});

// ─── calculateDiscountPercentage ──────────────────────────────────────────────

describe("calculateDiscountPercentage", () => {
  it("calcula el 20% de descuento del ejemplo del manual técnico", () => {
    // (150000 - 120000) / 150000 * 100 = 20
    expect(calculateDiscountPercentage(120000, 150000)).toBe(20);
  });

  it("calcula el 16% de descuento del Legging Sculpt Pro (redondeado)", () => {
    // (160000 - 135000) / 160000 * 100 = 15.625 → Math.round → 16
    expect(calculateDiscountPercentage(135000, 160000)).toBe(16);
  });

  it("retorna 0 cuando el precio base es igual al precio de lista", () => {
    expect(calculateDiscountPercentage(100000, 100000)).toBe(0);
  });

  it("retorna 0 cuando compareAtPrice es menor que basePrice (sin descuento real)", () => {
    expect(calculateDiscountPercentage(100000, 80000)).toBe(0);
  });

  it("calcula 50% de descuento exacto", () => {
    expect(calculateDiscountPercentage(50000, 100000)).toBe(50);
  });

  it("retorna un número entero (sin decimales)", () => {
    const result = calculateDiscountPercentage(135000, 160000);
    expect(Number.isInteger(result)).toBe(true);
  });
});

// ─── buildProductWhatsAppUrl ───────────────────────────────────────────────────

describe("buildProductWhatsAppUrl", () => {
  const sampleParams = {
    productName: "Legging Seamless Sculpt Pro",
    size: "M",
    color: "Negro Ónix",
    price: 135000,
    slug: "legging-seamless-sculpt-pro",
  };

  it("retorna una URL válida que comienza con https://wa.me/", () => {
    const url = buildProductWhatsAppUrl(sampleParams);
    expect(url).toMatch(/^https:\/\/wa\.me\//);
  });

  it("incluye el número de WhatsApp de BRAND_CONFIG sin el símbolo '+'", () => {
    const url = buildProductWhatsAppUrl(sampleParams);
    const expectedNumber = BRAND_CONFIG.contact.whatsapp.number.replace("+", "");
    expect(url).toContain(expectedNumber);
  });

  it("incluye el parámetro 'text=' con el mensaje codificado", () => {
    const url = buildProductWhatsAppUrl(sampleParams);
    expect(url).toContain("text=");
    // El signo & que separa el param no debe aparecer sin codificar en el mensaje
    const textPart = url.split("text=")[1];
    expect(textPart).toBeTruthy();
  });

  it("el mensaje decodificado contiene el nombre del producto", () => {
    const url = buildProductWhatsAppUrl(sampleParams);
    const decoded = decodeURIComponent(url.split("text=")[1] ?? "");
    expect(decoded).toContain("Legging Seamless Sculpt Pro");
  });

  it("el mensaje decodificado contiene la talla y el color seleccionados", () => {
    const url = buildProductWhatsAppUrl(sampleParams);
    const decoded = decodeURIComponent(url.split("text=")[1] ?? "");
    expect(decoded).toContain("M");
    expect(decoded).toContain("Negro Ónix");
  });

  it("el mensaje decodificado contiene el precio formateado correctamente", () => {
    const url = buildProductWhatsAppUrl(sampleParams);
    const decoded = decodeURIComponent(url.split("text=")[1] ?? "");
    expect(decoded).toContain("135.000 COP");
  });

  it("el mensaje decodificado incluye el slug en la URL de referencia", () => {
    const url = buildProductWhatsAppUrl(sampleParams);
    const decoded = decodeURIComponent(url.split("text=")[1] ?? "");
    expect(decoded).toContain("legging-seamless-sculpt-pro");
  });

  it("incluye el SKU en el mensaje cuando se proporciona", () => {
    const url = buildProductWhatsAppUrl({ ...sampleParams, sku: "CF-LEG-SCULPT-BLK-M" });
    const decoded = decodeURIComponent(url.split("text=")[1] ?? "");
    expect(decoded).toContain("CF-LEG-SCULPT-BLK-M");
  });

  it("genera URLs diferentes para diferentes productos", () => {
    const url1 = buildProductWhatsAppUrl(sampleParams);
    const url2 = buildProductWhatsAppUrl({
      ...sampleParams,
      productName: "Biker High-Waist AirTouch",
      slug: "biker-high-waist-airtouch",
      size: "L",
    });
    expect(url1).not.toBe(url2);
  });
});
