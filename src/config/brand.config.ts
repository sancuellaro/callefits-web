import { z } from "zod";

/**
 * Esquema de validación del archivo maestro de configuración de marca.
 * Toda referencia institucional (WhatsApp, redes sociales, categorías)
 * debe originarse exclusivamente desde este módulo. Prohibido hardcodear
 * estos valores en componentes (ver AGENTS.md, regla técnica #4).
 */
const brandConfigSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  legalName: z.string().min(1),
  tagline: z.string().min(1),
  contact: z.object({
    whatsapp: z.object({
      number: z.string().regex(/^\+\d{6,15}$/, "Número inválido en formato E.164"),
      defaultMessage: z.string().min(1),
    }),
    email: z.string().email(),
    phone: z.string().min(1),
  }),
  socials: z.object({
    instagram: z.string().url(),
    tiktok: z.string().url(),
  }),
  categories: z.array(z.string().min(1)).min(1),
});

export type BrandConfig = z.infer<typeof brandConfigSchema>;

const rawBrandConfig = {
  name: "CALLEFITS BY DANNI",
  shortName: "CALLEFITS",
  legalName: "CALLEFITS BY DANNI S.A.S. (Pendiente)",
  tagline: "Elegancia, disciplina y confort en cada movimiento",
  contact: {
    whatsapp: {
      number: "+573000000000",
      defaultMessage:
        "Hola CALLEFITS BY DANNI, deseo recibir información sobre una prenda deportiva.",
    },
    email: "contacto@callefits.com",
    phone: "+57 300 000 0000",
  },
  socials: {
    instagram: "https://instagram.com/callefitsbydanni",
    tiktok: "https://tiktok.com/@callefitsbydanni",
  },
  categories: ["Leggings", "Tops", "Sets Combinados", "Enterizos"],
} as const;

/**
 * Configuración de marca validada en tiempo de carga del módulo.
 * Si el objeto no cumple el esquema, la aplicación falla de forma
 * explícita al iniciar en lugar de propagar datos inválidos.
 */
export const BRAND_CONFIG: BrandConfig = brandConfigSchema.parse(rawBrandConfig);
