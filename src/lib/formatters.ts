/**
 * formatters.ts — Utilidades de presentación y constructor de pedidos WhatsApp.
 *
 * Todas las funciones son puras (sin efectos secundarios), deterministas y
 * totalmente tipadas. Cobertura de pruebas 100% requerida (ver NFR-004).
 */
import { BRAND_CONFIG } from "@/config/brand.config";

// ─── Formateo de precios ───────────────────────────────────────────────────────

/**
 * Formatea un monto en pesos colombianos al estilo editorial de la marca.
 *
 * @example
 * formatPrice(135000) // "$ 135.000 COP"
 * formatPrice(0)      // "$ 0 COP"
 */
export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `$ ${formatted} COP`;
}

// ─── Cálculo de descuento ─────────────────────────────────────────────────────

/**
 * Calcula el porcentaje de ahorro entero respecto al precio de lista original.
 * Retorna 0 si no hay descuento real (compareAtPrice ≤ basePrice).
 *
 * Fórmula: ((compareAtPrice - basePrice) / compareAtPrice) × 100
 *
 * @example
 * calculateDiscountPercentage(120000, 150000) // 20
 * calculateDiscountPercentage(135000, 160000) // 16
 * calculateDiscountPercentage(100000, 80000)  // 0  (no descuento)
 */
export function calculateDiscountPercentage(
  basePrice: number,
  compareAtPrice: number,
): number {
  if (compareAtPrice <= basePrice) return 0;
  return Math.round(((compareAtPrice - basePrice) / compareAtPrice) * 100);
}

// ─── Constructor de pedido WhatsApp ───────────────────────────────────────────

export interface WhatsAppOrderParams {
  productName: string;
  size: string;
  color: string;
  price: number;
  slug: string;
  sku?: string;
}

/**
 * Genera la URL oficial de wa.me con el mensaje de pedido preformateado.
 *
 * El mensaje usa sintaxis nativa de WhatsApp:
 * - *texto* para negritas
 * - \n para saltos de línea
 *
 * Todo el bloque de texto se codifica con encodeURIComponent para garantizar
 * compatibilidad con el protocolo wa.me sin romper emojis ni caracteres especiales.
 *
 * El número de WhatsApp se importa desde BRAND_CONFIG (nunca hardcodeado aquí).
 */
export function buildProductWhatsAppUrl(params: WhatsAppOrderParams): string {
  const { productName, size, color, price, slug, sku } = params;

  const skuLine = sku ? `\n📦 *SKU:* ${sku}` : "";

  const message =
    `Hola *${BRAND_CONFIG.name}*, me interesa coordinar el pedido de la siguiente prenda:\n\n` +
    `🛍️ *Prenda:* ${productName}\n` +
    `📏 *Talla:* ${size}\n` +
    `🎨 *Color:* ${color}\n` +
    `🏷️ *Precio:* ${formatPrice(price)}` +
    skuLine +
    `\n🔗 *Referencia:* https://callefits.com/catalog/${slug}\n\n` +
    `¿Tienen disponibilidad para coordinar el pago y despacho? ¡Muchas gracias!`;

  const number = BRAND_CONFIG.contact.whatsapp.number.replace("+", "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
