/**
 * variant-utils.ts — Lógica pura de selección de variantes de producto.
 *
 * Funciones puras sin efectos secundarios, extraídas de los componentes
 * para garantizar testabilidad 100% con Vitest (ver tests/unit/catalog-ui.test.ts).
 */
import type { ProductVariant, Size } from "@/types/product";

// ─── Tipos auxiliares ─────────────────────────────────────────────────────────

export interface ColorOption {
  color: string;
  colorHex: string;
}

// ─── Funciones puras ──────────────────────────────────────────────────────────

/** Orden canónico de tallas para mostrar en selectores. */
const SIZE_ORDER: Size[] = ["XS", "S", "M", "L", "XL"];

/**
 * Retorna los colores únicos del array de variantes en su orden de aparición.
 * No incluye duplicados (compara por nombre de color).
 */
export function getUniqueColors(variants: ProductVariant[]): ColorOption[] {
  const seen = new Set<string>();
  return variants.reduce<ColorOption[]>((acc, v) => {
    if (!seen.has(v.color)) {
      seen.add(v.color);
      acc.push({ color: v.color, colorHex: v.colorHex });
    }
    return acc;
  }, []);
}

/**
 * Retorna las tallas únicas de todas las variantes del producto,
 * ordenadas según SIZE_ORDER (XS → XL).
 */
export function getAllUniqueSizes(variants: ProductVariant[]): Size[] {
  const available = new Set(variants.map((v) => v.size));
  return SIZE_ORDER.filter((s) => available.has(s));
}

/**
 * Busca la variante exacta por color y talla.
 * Retorna `undefined` si la combinación no existe.
 */
export function getVariantByColorAndSize(
  variants: ProductVariant[],
  color: string,
  size: string,
): ProductVariant | undefined {
  return variants.find((v) => v.color === color && v.size === size);
}

/**
 * Determina si la combinación de color + talla tiene stock disponible.
 * Retorna `false` si la variante no existe, está marcada como no disponible,
 * o tiene stockQuantity === 0.
 */
export function isSizeAvailableForColor(
  variants: ProductVariant[],
  color: string,
  size: string,
): boolean {
  const variant = getVariantByColorAndSize(variants, color, size);
  return (variant?.isAvailable ?? false) && (variant?.stockQuantity ?? 0) > 0;
}

/**
 * Retorna la primera talla disponible para el color dado.
 * Útil para inicializar el selector tras cambiar el color.
 */
export function getFirstAvailableSizeForColor(
  variants: ProductVariant[],
  color: string,
): Size | undefined {
  const allSizes = getAllUniqueSizes(variants);
  return allSizes.find((s) => isSizeAvailableForColor(variants, color, s));
}
