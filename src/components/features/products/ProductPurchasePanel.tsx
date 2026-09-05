"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { Product, Size } from "@/types/product";
import { formatPrice, calculateDiscountPercentage, buildProductWhatsAppUrl } from "@/lib/formatters";
import {
  getUniqueColors,
  getAllUniqueSizes,
  isSizeAvailableForColor,
  getVariantByColorAndSize,
  getFirstAvailableSizeForColor,
} from "@/lib/variant-utils";
import { cn } from "@/lib/utils";
import { ProductAccordion } from "./ProductAccordion";

// ─── Props ─────────────────────────────────────────────────────────────────────

interface ProductPurchasePanelProps {
  product: Product;
}

// ─── Componente ────────────────────────────────────────────────────────────────

/**
 * ProductPurchasePanel — Panel derecho de la ficha de producto.
 * Gestiona la selección de color, talla y dispara el enlace a WhatsApp.
 */
export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const colors = getUniqueColors(product.variants);
  const allSizes = getAllUniqueSizes(product.variants);

  // ── Estado de selección ──────────────────────────────────────────────────
  const defaultColor = colors[0]?.color ?? "";
  const defaultSize =
    getFirstAvailableSizeForColor(product.variants, defaultColor) ?? allSizes[0] ?? ("M" as Size);

  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);
  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize);

  // ── Cálculos derivados ───────────────────────────────────────────────────
  const selectedVariant = getVariantByColorAndSize(product.variants, selectedColor, selectedSize);
  const isVariantAvailable =
    (selectedVariant?.isAvailable ?? false) && (selectedVariant?.stockQuantity ?? 0) > 0;

  const activePrice = selectedVariant?.priceOverride ?? product.basePrice;
  const discountPct = product.compareAtPrice
    ? calculateDiscountPercentage(activePrice, product.compareAtPrice)
    : 0;

  const whatsappUrl = buildProductWhatsAppUrl({
    productName: product.name,
    size: selectedSize,
    color: selectedColor,
    price: activePrice,
    slug: product.slug,
    sku: selectedVariant?.sku,
  });

  // ── Handlers ─────────────────────────────────────────────────────────────
  function handleColorChange(color: string) {
    setSelectedColor(color);
    const firstAvailable = getFirstAvailableSizeForColor(product.variants, color);
    setSelectedSize(firstAvailable ?? allSizes[0] ?? ("M" as Size));
  }

  return (
    <div className="flex flex-col gap-5">
      {/* ── Nombre y subtítulo ──────────────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          CALLEFITS BY DANNI
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">
          {product.name}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          {product.shortDescription}
        </p>
      </div>

      {/* ── Precios ─────────────────────────────────────────────────────── */}
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-neutral-900">
          {formatPrice(activePrice)}
        </span>
        {discountPct > 0 && product.compareAtPrice && (
          <>
            <span className="text-sm text-neutral-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            <span className="rounded-[var(--radius)] bg-brand-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand-primary-foreground">
              -{discountPct}%
            </span>
          </>
        )}
      </div>

      <div className="border-t border-black/5" />

      {/* ── Selector de color ────────────────────────────────────────────── */}
      <div>
        <p className="mb-3 text-xs font-medium text-neutral-500">
          Color:{" "}
          <span className="font-semibold text-neutral-800">{selectedColor}</span>
        </p>
        <div className="flex flex-wrap gap-2.5">
          {colors.map(({ color, colorHex }) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorChange(color)}
              title={color}
              aria-label={`Color: ${color}${selectedColor === color ? " (seleccionado)" : ""}`}
              aria-pressed={selectedColor === color}
              className={cn(
                "h-7 w-7 rounded-full border-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                selectedColor === color
                  ? "border-brand-primary ring-2 ring-brand-primary ring-offset-2"
                  : "border-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] hover:border-neutral-300",
              )}
              style={{ backgroundColor: colorHex }}
            />
          ))}
        </div>
      </div>

      {/* ── Selector de talla ────────────────────────────────────────────── */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium text-neutral-500">
            Talla:{" "}
            <span className="font-semibold text-neutral-800">{selectedSize}</span>
          </p>
          <Link
            href="/#guia-tallas"
            className="text-[11px] text-neutral-400 underline-offset-2 hover:text-neutral-700 hover:underline"
          >
            Guía de tallas
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => {
            const available = isSizeAvailableForColor(product.variants, selectedColor, size);
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                disabled={!available}
                onClick={() => available && setSelectedSize(size)}
                aria-label={`Talla ${size}${!available ? " — agotada" : ""}${isSelected ? " (seleccionada)" : ""}`}
                aria-pressed={isSelected}
                className={cn(
                  "relative flex h-10 min-w-[44px] items-center justify-center rounded-[var(--radius)] border px-3 text-xs font-semibold uppercase tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  !available
                    ? "cursor-not-allowed border-black/8 text-neutral-300 opacity-40"
                    : isSelected
                      ? "border-brand-primary bg-brand-primary text-brand-primary-foreground"
                      : "border-black/10 text-neutral-700 hover:border-black/30",
                )}
              >
                {size}
                {/* Línea diagonal en tallas agotadas */}
                {!available && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="absolute h-px w-3/4 rotate-45 bg-neutral-300" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Botón de conversión WhatsApp ─────────────────────────────────── */}
      {isVariantAvailable ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Pedir ${product.name} en talla ${selectedSize}, color ${selectedColor} por WhatsApp`}
          className="flex w-full items-center justify-center gap-3 rounded-[var(--radius)] bg-brand-primary py-4 text-xs font-semibold uppercase tracking-wider text-brand-primary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          PEDIR POR WHATSAPP
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-[var(--radius)] bg-neutral-200 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400"
        >
          AGOTADO EN ESTA TALLA
        </button>
      )}

      {/* ── Acordeón de detalles técnicos ────────────────────────────────── */}
      <ProductAccordion attributes={product.attributes} />
    </div>
  );
}
