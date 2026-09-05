"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

/**
 * ProductGallery — Galería interactiva de fotos de producto.
 * - Imagen principal grande con aspect-[3/4].
 * - Tira de miniaturas: vertical a la izquierda en desktop, horizontal debajo en móvil.
 * - Cambio de imagen al clic en miniatura con indicador de borde activo.
 * - La primera imagen tiene `priority` para LCP.
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sorted = [...images].sort((a, b) => a.sortOrder - b.sortOrder);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = sorted[activeIndex] ?? sorted[0];

  return (
    /* Estructura: en móvil apilan (col), en desktop van en fila con thumbs a la izquierda */
    <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
      {/* ── Tira de miniaturas ───────────────────────────────────────────── */}
      <div
        role="list"
        aria-label={`Fotos de ${productName}`}
        className="order-2 flex flex-row gap-2 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-x-visible lg:pb-0"
      >
        {sorted.map((img, idx) => (
          <button
            key={img.id}
            role="listitem"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Foto ${idx + 1}: ${img.altText}`}
            aria-current={activeIndex === idx}
            className={cn(
              "relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-[var(--radius)] border-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:h-20 lg:w-20",
              activeIndex === idx
                ? "border-brand-primary"
                : "border-transparent hover:border-black/20",
            )}
          >
            <Image
              src={img.url}
              alt={img.altText}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* ── Imagen principal ─────────────────────────────────────────────── */}
      <div className="relative order-1 aspect-[3/4] w-full overflow-hidden rounded-[var(--radius)] bg-surface-muted lg:order-2 lg:flex-1">
        {activeImage && (
          <Image
            src={activeImage.url}
            alt={activeImage.altText}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-opacity duration-300"
          />
        )}
      </div>
    </div>
  );
}
