"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { updateVariantStockAction } from "../../actions";
import type { ProductVariant } from "@/types/product";

interface VariantStockRowProps {
  variant: ProductVariant;
  productSlug: string;
}

/** Fila individual de la tabla de stock, con su propio estado de acción. */
function VariantStockRow({ variant, productSlug }: VariantStockRowProps) {
  const [state, formAction, isPending] = useActionState(updateVariantStockAction, {
    success: false,
    message: "",
  });

  return (
    <tr className="border-b border-black/5 last:border-0">
      {/* Talla */}
      <td className="py-3 pr-4 align-middle text-sm font-semibold text-neutral-800">
        {variant.size}
      </td>

      {/* Color */}
      <td className="py-3 pr-4 align-middle">
        <div className="flex items-center gap-2">
          <span
            className="h-4 w-4 flex-shrink-0 rounded-full border border-black/10 shadow-sm"
            style={{ backgroundColor: variant.colorHex }}
            aria-hidden="true"
          />
          <span className="text-sm text-neutral-600">{variant.color}</span>
        </div>
      </td>

      {/* SKU */}
      <td className="py-3 pr-4 align-middle font-mono text-xs text-neutral-400">
        {variant.sku}
      </td>

      {/* Form de stock + disponibilidad */}
      <td className="py-3 align-middle">
        <form action={formAction} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="variantId" value={variant.id} />
          <input type="hidden" name="productSlug" value={productSlug} />

          <input
            name="stockQuantity"
            type="number"
            min={0}
            step={1}
            defaultValue={variant.stockQuantity}
            aria-label={`Stock para ${variant.size} ${variant.color}`}
            className="h-9 w-20 rounded-[var(--radius)] border border-black/10 bg-surface px-2 text-sm text-center text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />

          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-neutral-600">
            <input
              type="checkbox"
              name="isAvailable"
              value="true"
              defaultChecked={variant.isAvailable}
              className="h-4 w-4 rounded accent-brand-primary"
            />
            Disponible
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="flex h-8 items-center gap-1.5 rounded-[var(--radius)] border border-black/10 px-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-700 transition-colors hover:bg-brand-primary hover:text-brand-primary-foreground disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
            ) : (
              "Guardar"
            )}
          </button>

          {state.message && (
            <span
              className={`flex items-center gap-1 text-[11px] ${state.success ? "text-green-600" : "text-red-500"}`}
              role="status"
              aria-live="polite"
            >
              {state.success ? (
                <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
              ) : (
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
              )}
              {state.success ? "Guardado" : "Error"}
            </span>
          )}
        </form>
      </td>
    </tr>
  );
}

// ─── StockForm ────────────────────────────────────────────────────────────────

interface StockFormProps {
  variants: ProductVariant[];
  productSlug: string;
}

export function StockForm({ variants, productSlug }: StockFormProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[540px]">
        <thead>
          <tr className="border-b border-black/5">
            {["Talla", "Color", "SKU", "Stock / Estado"].map((h) => (
              <th
                key={h}
                className="pb-3 pr-4 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => (
            <VariantStockRow key={v.id} variant={v} productSlug={productSlug} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
