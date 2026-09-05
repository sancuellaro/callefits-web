/**
 * product.ts — Esquemas Zod y tipos TypeScript para el catálogo CALLEFITS BY DANNI.
 *
 * Fuente de verdad para la estructura de datos de prendas deportivas.
 * Todo componente UI y capa de servicio debe importar sus tipos desde aquí.
 * Cero uso de `any`. Inferencia estricta mediante z.infer<typeof Schema>.
 */
import { z } from "zod";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const CategoryEnum = z.enum(["leggings", "tops", "sets", "enterizos"]);

export const SizeEnum = z.enum(["XS", "S", "M", "L", "XL"]);

export const CompressionEnum = z.enum(["Alta", "Media", "Ligera"]);

export const ProductStatusEnum = z.enum(["draft", "active", "archived"]);

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

export const ProductImageSchema = z.object({
  id: z.string().min(1),
  /** URL de imagen completa (Supabase Storage o CDN externo). */
  url: z.string().url("La URL de la imagen debe ser una URL válida"),
  /** Texto alternativo descriptivo — obligatorio para accesibilidad WCAG. */
  altText: z.string().min(5, "El texto alternativo debe ser descriptivo (mín. 5 caracteres)"),
  isPrimary: z.boolean(),
  sortOrder: z.number().int().min(0),
});

export const ProductVariantSchema = z.object({
  id: z.string().min(1),
  /** Código de referencia interno: ej. "CF-LEG-SCULPT-BLK-S". */
  sku: z.string().min(1),
  size: SizeEnum,
  /** Nombre comercial del color: ej. "Negro Ónix", "Café Moca". */
  color: z.string().min(1),
  /**
   * Hex del color para el muestrario visual en UI.
   * Es un dato del producto, no una clase CSS directa.
   */
  colorHex: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Formato hex inválido (ej. #121212)"),
  stockQuantity: z
    .number()
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo"),
  isAvailable: z.boolean(),
  /** Precio alternativo para esta variante específica (supera a basePrice). */
  priceOverride: z.number().positive().optional(),
});

export const ProductAttributeSchema = z.object({
  compression: CompressionEnum,
  /** Composición del tejido: ej. "78% Poliamida reciclada, 22% Elastano". */
  material: z.string().min(1),
  /** Descripción del tipo de cintura o corte: ej. "Tiro Alto Anatómico". */
  waistType: z.string().min(1),
  /** Instrucciones de cuidado textil. */
  careInstructions: z.array(z.string().min(1)).min(1),
});

// ─── Schema principal de producto ─────────────────────────────────────────────

export const ProductSchema = z.object({
  id: z.string().min(1),
  /** Identificador URL-friendly único: solo minúsculas, números y guiones. */
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "El slug debe estar en kebab-case (minúsculas, sin caracteres especiales)",
    ),
  /** Nombre comercial aspiracional de la prenda (3–120 caracteres). */
  name: z.string().min(3).max(120),
  /** Descripción breve para tarjetas de catálogo (máx. 200 caracteres). */
  shortDescription: z.string().min(1).max(200),
  /** Descripción técnica completa para la ficha de producto. */
  description: z.string().min(1),
  /** Precio de venta activo en pesos colombianos (COP). Entero positivo. */
  basePrice: z.number().int().positive("El precio debe ser un número entero positivo"),
  /** Precio anterior para calcular el descuento visible (opcional). */
  compareAtPrice: z.number().int().positive().optional(),
  category: CategoryEnum,
  isFeatured: z.boolean(),
  status: ProductStatusEnum,
  attributes: ProductAttributeSchema,
  /** Mínimo 2 imágenes por prenda (requerimiento BR-004). */
  images: z.array(ProductImageSchema).min(2, "Cada prenda debe tener al menos 2 imágenes"),
  /** Mínimo 3 variantes por prenda (talla/color). */
  variants: z
    .array(ProductVariantSchema)
    .min(3, "Cada prenda debe tener al menos 3 variantes"),
  /** Timestamp ISO de creación del registro. */
  createdAt: z.string().datetime({ message: "createdAt debe ser un timestamp ISO 8601 válido" }),
});

// ─── Schema de filtros para el catálogo ──────────────────────────────────────

export const ProductFiltersSchema = z.object({
  category: CategoryEnum.optional(),
  size: SizeEnum.optional(),
  featured: z.boolean().optional(),
  sort: z.enum(["featured", "price_asc", "price_desc", "newest"]).optional(),
  search: z.string().optional(),
});

// ─── Tipos inferidos — exportar para uso en toda la aplicación ────────────────

export type Category = z.infer<typeof CategoryEnum>;
export type Size = z.infer<typeof SizeEnum>;
export type Compression = z.infer<typeof CompressionEnum>;
export type ProductStatus = z.infer<typeof ProductStatusEnum>;
export type ProductImage = z.infer<typeof ProductImageSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type ProductAttribute = z.infer<typeof ProductAttributeSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductFilters = z.infer<typeof ProductFiltersSchema>;

/** Mapa de nombre para mostrar por categoría. */
export const CATEGORY_LABELS: Record<Category, string> = {
  leggings: "Leggings",
  tops: "Tops",
  sets: "Sets Combinados",
  enterizos: "Enterizos",
} as const;
