"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { updateProductPricingAndStatusAction } from "../../actions";
import type { Product } from "@/types/product";

interface PricingFormProps {
  product: Product;
}

export function PricingForm({ product }: PricingFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateProductPricingAndStatusAction,
    { success: false, message: "" },
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* ID oculto */}
      <input type="hidden" name="productId" value={product.id} />

      {/* Grid de precios */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Precio Base */}
        <div>
          <label
            htmlFor="basePrice"
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500"
          >
            Precio Base (COP)
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-neutral-400">
              $
            </span>
            <input
              id="basePrice"
              name="basePrice"
              type="number"
              min={1000}
              step={1}
              required
              defaultValue={product.basePrice}
              className="h-11 w-full rounded-[var(--radius)] border border-black/10 bg-surface pl-7 pr-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Precio Anterior / Oferta */}
        <div>
          <label
            htmlFor="compareAtPrice"
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500"
          >
            Precio Anterior (Oferta) — opcional
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-neutral-400">
              $
            </span>
            <input
              id="compareAtPrice"
              name="compareAtPrice"
              type="number"
              min={1000}
              step={1}
              defaultValue={product.compareAtPrice ?? ""}
              placeholder="Sin oferta"
              className="h-11 w-full rounded-[var(--radius)] border border-black/10 bg-surface pl-7 pr-3 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
      </div>

      {/* Estado de visibilidad */}
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
          Visibilidad en el Catálogo
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          {(["active", "draft"] as const).map((s) => (
            <label
              key={s}
              className="flex flex-1 cursor-pointer items-center gap-3 rounded-[var(--radius)] border border-black/10 px-4 py-3 transition-colors has-[:checked]:border-brand-primary has-[:checked]:bg-brand-primary/5"
            >
              <input
                type="radio"
                name="status"
                value={s}
                defaultChecked={product.status === s}
                className="h-4 w-4 accent-brand-primary"
              />
              <div>
                <p className="text-sm font-medium text-neutral-800">
                  {s === "active" ? "Activo \u2014 Visible en Cat\u00e1logo" : "Borrador \u2014 Oculto al p\u00fablico"}
                </p>
                <p className="text-xs text-neutral-400">
                  {s === "active"
                    ? "Las compradoras pueden ver y ordenar esta prenda."
                    : "Invisible en la tienda, solo visible en el panel admin."}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Destacado */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          name="isFeatured"
          value="true"
          defaultChecked={product.isFeatured}
          className="h-4 w-4 rounded accent-brand-primary"
        />
        <span className="text-sm font-medium text-neutral-700">
          Marcar como prenda destacada (aparece en Home y sección &ldquo;Más Deseadas&rdquo;)
        </span>
      </label>

      {/* Feedback */}
      {state.message && (
        <div
          role="status"
          aria-live="polite"
          className={`flex items-center gap-2 rounded-[var(--radius)] px-3 py-2 text-sm ${
            state.success
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          )}
          {state.message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-brand-primary text-xs font-semibold uppercase tracking-wider text-brand-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Guardando...
          </>
        ) : (
          "GUARDAR CAMBIOS DE PRECIO"
        )}
      </button>
    </form>
  );
}
