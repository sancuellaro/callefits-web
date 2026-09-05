"use client";

import { useActionState, useRef } from "react";
import Image from "next/image";
import { Loader2, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { uploadProductImageAction } from "../../actions";
import type { ProductImage } from "@/types/product";

interface ImageUploadFormProps {
  productId: string;
  images: ProductImage[];
}

export function ImageUploadForm({ productId, images }: ImageUploadFormProps) {
  const [state, formAction, isPending] = useActionState(uploadProductImageAction, {
    success: false,
    message: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sorted = [...images].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-5">
      {/* Galería actual */}
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
          Fotografías Actuales
        </p>
        <div className="flex flex-wrap gap-3">
          {sorted.map((img) => (
            <div key={img.id} className="relative">
              <div className="relative h-24 w-24 overflow-hidden rounded-[var(--radius)] border border-black/10 bg-surface-muted">
                <Image
                  src={img.url}
                  alt={img.altText}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              {img.isPrimary && (
                <span className="absolute -top-1.5 -right-1.5 rounded-full border border-white bg-brand-primary px-1.5 py-0.5 text-[9px] font-semibold uppercase text-brand-primary-foreground">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Formulario de subida */}
      <form action={formAction} encType="multipart/form-data" className="space-y-3">
        <input type="hidden" name="productId" value={productId} />

        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
          Subir Nueva Fotografía
        </p>

        {/* Alt text */}
        <div>
          <label htmlFor="altText" className="mb-1 block text-xs text-neutral-500">
            Texto alternativo descriptivo (obligatorio, mín. 5 caracteres)
          </label>
          <input
            id="altText"
            name="altText"
            type="text"
            required
            minLength={5}
            placeholder="Ej: Legging en Negro Ónix, vista frontal..."
            className="h-10 w-full rounded-[var(--radius)] border border-black/10 bg-surface px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Selector de archivo */}
        <div>
          <input
            ref={fileInputRef}
            id="file"
            name="file"
            type="file"
            required
            accept="image/webp,image/jpeg,image/jpg,image/png"
            className="sr-only"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-24 w-full flex-col items-center justify-center gap-1.5 rounded-[var(--radius)] border-2 border-dashed border-black/10 bg-surface-muted text-neutral-400 transition-colors hover:border-brand-primary hover:text-brand-primary"
          >
            <Upload className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">
              Clic para seleccionar imagen
            </span>
            <span className="text-[10px]">WebP, JPEG, PNG — máx. 5 MB</span>
          </button>
        </div>

        {/* Feedback */}
        {state.message && (
          <div
            role="status"
            aria-live="polite"
            className={`flex items-center gap-2 rounded-[var(--radius)] px-3 py-2 text-sm ${
              state.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
            }`}
          >
            {state.success ? (
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
            )}
            {state.message}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="flex h-10 items-center gap-2 rounded-[var(--radius)] border border-black/10 px-5 text-xs font-semibold uppercase tracking-wider text-neutral-700 transition-colors hover:bg-brand-primary hover:text-brand-primary-foreground disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              Subiendo...
            </>
          ) : (
            "SUBIR FOTOGRAFÍA"
          )}
        </button>
      </form>
    </div>
  );
}
