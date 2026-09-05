/**
 * admin-schemas.ts — Esquemas Zod para acciones del panel administrativo.
 *
 * Separado de actions.ts para garantizar testabilidad con Vitest
 * sin importar módulos exclusivos del servidor (next/headers, next/cache).
 * Los Server Actions importan desde aquí; los tests también.
 */
import { z } from "zod";

// ─── Resultado genérico de una Server Action ──────────────────────────────────

export type AdminActionResult = {
  success: boolean;
  message: string;
};

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

// ─── Actualización de precios y estado de prenda ──────────────────────────────

export const UpdateProductPricingSchema = z.object({
  productId: z.string().min(1, "El ID de producto es requerido"),
  basePrice: z.coerce
    .number()
    .int("El precio debe ser un número entero")
    .positive("El precio base debe ser un número positivo en COP"),
  compareAtPrice: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  status: z.enum(["active", "draft"], {
    errorMap: () => ({ message: "Estado inválido: usa 'active' o 'draft'" }),
  }),
  isFeatured: z
    .preprocess(
      (v) => v === "true" || v === true || v === "on",
      z.boolean(),
    )
    .default(false),
});

export type UpdateProductPricingInput = z.infer<typeof UpdateProductPricingSchema>;

// ─── Actualización de stock de variante individual ────────────────────────────

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

// ─── Validación de archivo de imagen para subida ─────────────────────────────

const ALLOWED_MIME_TYPES = [
  "image/webp",
  "image/jpeg",
  "image/jpg",
  "image/png",
] as const;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const ImageUploadSchema = z.object({
  productId: z.string().min(1, "El ID de producto es requerido"),
  altText: z.string().min(5, "El texto alternativo debe ser descriptivo (mín. 5 caracteres)"),
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
