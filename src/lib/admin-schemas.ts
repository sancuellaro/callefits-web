/**
 * admin-schemas.ts — Schemas Zod para el panel administrativo CALLEFITS.
 *
 * Sin imports de next/headers, next/cache ni módulos server-only.
 * Seguro para Client Components, Server Actions y tests Vitest.
 */
import { z } from "zod";
import { CategoryEnum, SizeEnum, CompressionEnum } from "@/types/product";

// ─── Tipos comunes ────────────────────────────────────────────────────────────

export type AdminActionResult = {
  success: boolean;
  message: string;
};

// ─── Utilidades ───────────────────────────────────────────────────────────────

/**
 * Convierte un nombre de prenda a slug kebab-case URL-safe.
 * Exportada para uso en formularios cliente (preview en tiempo real).
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/[^a-z0-9\s-]/g, "") // elimina caracteres especiales
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-");
}

// ─── Helper interno: preprocess de precio opcional ───────────────────────────

const optionalPrice = z.preprocess((v) => {
  const str = String(v ?? "").trim();
  if (str === "" || str === "0" || str === "null" || str === "undefined") return undefined;
  return v;
}, z.coerce.number().int().positive().optional());

// ─── Login administrativo ─────────────────────────────────────────────────────

export const AdminLoginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Ingresa un email válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});
export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;

// ─── Precios y estado de prenda (CORRECCIÓN: min 1000, compareAt opcional) ───

export const UpdateProductPricingSchema = z
  .object({
    productId: z.string().min(1, "El ID de producto es requerido"),
    basePrice: z.coerce
      .number()
      .int("El precio debe ser un número entero")
      .min(1000, "El precio base debe ser de al menos $1.000 COP"),
    compareAtPrice: optionalPrice,
    status: z.enum(["active", "draft"], {
      errorMap: () => ({ message: "Estado inválido: usa 'active' o 'draft'" }),
    }),
    isFeatured: z
      .preprocess(
        (v) => v === "true" || v === true || v === "on",
        z.boolean(),
      )
      .default(false),
  })
  .refine(
    (d) => !d.compareAtPrice || d.compareAtPrice > d.basePrice,
    {
      message:
        "El precio de oferta debe ser mayor al precio base (es el precio antes de la rebaja)",
      path: ["compareAtPrice"],
    },
  );
export type UpdateProductPricingInput = z.infer<typeof UpdateProductPricingSchema>;

// ─── Stock de variante individual ─────────────────────────────────────────────

export const UpdateVariantStockSchema = z.object({
  variantId: z.string().min(1, "El ID de variante es requerido"),
  productSlug: z.string().min(1, "El slug del producto es requerido"),
  stockQuantity: z.coerce
    .number()
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo"),
  isAvailable: z.preprocess(
    (v) => v === "true" || v === true || v === "on",
    z.boolean(),
  ),
});
export type UpdateVariantStockInput = z.infer<typeof UpdateVariantStockSchema>;

// ─── Crear producto nuevo ──────────────────────────────────────────────────────

export const CreateProductSchema = z
  .object({
    name: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(120, "El nombre no puede superar 120 caracteres"),
    category: CategoryEnum,
    shortDescription: z
      .string()
      .min(10, "La descripción breve debe tener al menos 10 caracteres")
      .max(200, "La descripción breve no puede superar 200 caracteres"),
    description: z
      .string()
      .min(10, "La descripción técnica debe tener al menos 10 caracteres"),
    basePrice: z.coerce
      .number()
      .int("El precio debe ser un número entero")
      .min(1000, "El precio base debe ser de al menos $1.000 COP"),
    compareAtPrice: optionalPrice,
    status: z.enum(["active", "draft"]).default("draft"),
    isFeatured: z
      .preprocess((v) => v === "on" || v === "true" || v === true, z.boolean())
      .default(false),
    // Atributos textiles
    compression: CompressionEnum,
    material: z.string().min(3, "El material es requerido"),
    waistType: z.string().min(3, "El tipo de tiro/corte es requerido"),
    careInstructions: z
      .string()
      .min(5, "Añade al menos una instrucción de cuidado")
      .transform((s) =>
        s
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0),
      ),
    // Variante inicial
    variantSize: SizeEnum,
    variantColor: z.string().min(1, "El nombre del color es requerido"),
    variantColorHex: z
      .string()
      .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Formato hex inválido (ej. #121212)"),
    variantStock: z.coerce
      .number()
      .int()
      .min(0, "El stock inicial no puede ser negativo")
      .default(0),
  })
  .refine(
    (d) => !d.compareAtPrice || d.compareAtPrice > d.basePrice,
    {
      message:
        "El precio de oferta debe ser mayor al precio base",
      path: ["compareAtPrice"],
    },
  );
export type CreateProductInput = z.infer<typeof CreateProductSchema>;

// ─── Eliminar producto ────────────────────────────────────────────────────────

export const DeleteProductSchema = z.object({
  productId: z.string().min(1, "El ID de producto es requerido"),
});
export type DeleteProductInput = z.infer<typeof DeleteProductSchema>;

// ─── Añadir variante a prenda existente ───────────────────────────────────────

export const AddVariantSchema = z.object({
  productId: z.string().min(1, "El ID de producto es requerido"),
  productSlug: z.string().min(1, "El slug del producto es requerido"),
  size: SizeEnum,
  color: z.string().min(1, "El nombre del color es requerido"),
  colorHex: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Formato hex inválido"),
  stockQuantity: z.coerce
    .number()
    .int()
    .min(0, "El stock inicial no puede ser negativo")
    .default(0),
});
export type AddVariantInput = z.infer<typeof AddVariantSchema>;

// ─── Eliminar variante ────────────────────────────────────────────────────────

export const DeleteVariantSchema = z.object({
  variantId: z.string().min(1, "El ID de variante es requerido"),
  productSlug: z.string().min(1, "El slug del producto es requerido"),
});
export type DeleteVariantInput = z.infer<typeof DeleteVariantSchema>;

// ─── Subida de imagen ──────────────────────────────────────────────────────────

const ALLOWED_MIME_TYPES = [
  "image/webp",
  "image/jpeg",
  "image/jpg",
  "image/png",
] as const;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const ImageUploadSchema = z.object({
  productId: z.string().min(1, "El ID de producto es requerido"),
  altText: z
    .string()
    .min(5, "El texto alternativo debe ser descriptivo (mín. 5 caracteres)"),
  file: z
    .instanceof(File, { message: "Debes seleccionar un archivo de imagen" })
    .refine(
      (f) => ALLOWED_MIME_TYPES.includes(f.type as (typeof ALLOWED_MIME_TYPES)[number]),
      { message: "Solo se permiten archivos .webp, .jpeg, .jpg y .png" },
    )
    .refine((f) => f.size <= MAX_FILE_SIZE_BYTES, {
      message: "El archivo no puede superar los 5 MB",
    }),
});
export type ImageUploadInput = z.infer<typeof ImageUploadSchema>;
