/**
 * ProductCard — Tarjeta de producto editorial para la grilla del catálogo.
 * Server Component: sin estado ni eventos directos.
 */
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice, calculateDiscountPercentage } from "@/lib/formatters";
import { getUniqueColors } from "@/lib/variant-utils";
import { CATEGORY_LABELS } from "@/types/product";

// ─── Props ─────────────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

// ─── Componente ────────────────────────────────────────────────────────────────

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const primaryImage =
    product.images.find((img) => img.isPrimary) ?? product.images[0];

  const discountPct = product.compareAtPrice
    ? calculateDiscountPercentage(product.basePrice, product.compareAtPrice)
    : 0;

  const hasDiscount = discountPct > 0;
  const uniqueColors = getUniqueColors(product.variants);
  const visibleColors = uniqueColors.slice(0, 4);
  const hiddenColorCount = uniqueColors.length - visibleColors.length;

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group flex flex-col"
      aria-label={`Ver ${product.name}`}
    >
      {/* ── Imagen ─────────────────────────────────────────────────────────── */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius)] bg-surface-muted">
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        {/* Badge de descuento / destacado */}
        {hasDiscount ? (
          <span className="absolute left-2 top-2 rounded-[var(--radius)] bg-brand-primary px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-brand-primary-foreground">
            OFERTA -{discountPct}%
          </span>
        ) : product.isFeatured ? (
          <span className="absolute left-2 top-2 rounded-[var(--radius)] border border-white/30 bg-white/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
            DESTACADO
          </span>
        ) : null}

        {/* Swatches de colores — esquina inferior derecha */}
        {uniqueColors.length > 1 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            {visibleColors.map((c) => (
              <span
                key={c.color}
                title={c.color}
                className="h-3 w-3 rounded-full border border-white/40 shadow-sm"
                style={{ backgroundColor: c.colorHex }}
                aria-hidden="true"
              />
            ))}
            {hiddenColorCount > 0 && (
              <span className="text-[10px] text-white/80">+{hiddenColorCount}</span>
            )}
          </div>
        )}
      </div>

      {/* ── Texto ─────────────────────────────────────────────────────────── */}
      <div className="mt-3 flex flex-col gap-0.5">
        {/* Categoría */}
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          {CATEGORY_LABELS[product.category]}
        </span>

        {/* Nombre */}
        <p className="line-clamp-1 text-sm font-medium text-neutral-900 transition-colors group-hover:text-neutral-600">
          {product.name}
        </p>

        {/* Precios */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-neutral-900">
            {formatPrice(product.basePrice)}
          </span>
          {hasDiscount && product.compareAtPrice && (
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
