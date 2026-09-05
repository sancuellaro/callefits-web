import { describe, expect, it } from "vitest";
import { BRAND_CONFIG } from "@/config/brand.config";

describe("BRAND_CONFIG", () => {
  it("exporta el nombre oficial y el slogan de la marca", () => {
    expect(BRAND_CONFIG.name).toBe("CALLEFITS BY DANNI");
    expect(BRAND_CONFIG.tagline).toBe(
      "Elegancia, disciplina y confort en cada movimiento",
    );
  });

  it("expone el número de WhatsApp configurado en formato E.164", () => {
    expect(BRAND_CONFIG.contact.whatsapp.number).toBe("+573000000000");
    expect(BRAND_CONFIG.contact.whatsapp.number).toMatch(/^\+\d{6,15}$/);
  });

  it("expone los enlaces oficiales de Instagram y TikTok", () => {
    expect(BRAND_CONFIG.socials.instagram).toBe(
      "https://instagram.com/callefitsbydanni",
    );
    expect(BRAND_CONFIG.socials.tiktok).toBe(
      "https://tiktok.com/@callefitsbydanni",
    );
  });

  it("incluye las categorías iniciales del catálogo", () => {
    expect(BRAND_CONFIG.categories).toEqual([
      "Leggings",
      "Tops",
      "Sets Combinados",
      "Enterizos",
    ]);
  });

  it("valida exitosamente contra el esquema Zod sin lanzar excepciones", () => {
    expect(() => BRAND_CONFIG).not.toThrow();
    expect(BRAND_CONFIG).toMatchObject({
      name: "CALLEFITS BY DANNI",
      shortName: "CALLEFITS",
      legalName: "CALLEFITS BY DANNI S.A.S. (Pendiente)",
    });
  });
});
