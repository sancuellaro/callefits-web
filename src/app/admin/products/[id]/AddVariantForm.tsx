"use client";

import { useActionState, useState } from "react";
import { Plus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { addVariantAction } from "../../actions";
import { cn } from "@/lib/utils";

interface AddVariantFormProps {
  productId: string;
  productSlug: string;
}

const INPUT_CLASS =
  "h-10 w-full rounded-[var(--radius)] border border-black/10 bg-surface px-3 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function AddVariantForm({ productId, productSlug }: AddVariantFormProps) {
  const [state, formAction, isPending] = useActionState(addVariantAction, {
    success: false,
    message: "",
  });
  const [colorHex, setColorHex] = useState("#121212");

  return (
    <div className="mt-6 rounded-[var(--radius)] border border-black/5 bg-surface-muted p-4">
      <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        Añadir Nueva Talla o Color
      </p>

      <form action={formAction}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="productSlug" value={productSlug} />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {/* Talla */}
          <div>
            <label htmlFor="addSize" className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              Talla *
            </label>
            <select id="addSize" name="size" required className={INPUT_CLASS}>
              <option value="">Seleccionar</option>
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Nombre del color */}
          <div>
            <label htmlFor="addColor" className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              Nombre Color *
            </label>
            <input id="addColor" name="color" type="text" required
              placeholder="Negro Ónix" className={INPUT_CLASS} />
          </div>

          {/* HEX */}
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              HEX *
            </label>
            <div className="flex gap-1.5">
              <input type="color" value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
                className="h-10 w-10 flex-shrink-0 cursor-pointer rounded-[var(--radius)] border border-black/10 p-0.5"
                aria-label="Selector de color hex" />
              <input name="colorHex" type="text" value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
                pattern="^#[0-9A-Fa-f]{6}$" required
                className={cn(INPUT_CLASS, "font-mono text-xs")} />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="addStock" className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              Stock
            </label>
            <input id="addStock" name="stockQuantity" type="number"
              min={0} step={1} defaultValue={0} className={INPUT_CLASS} />
          </div>

          {/* Botón */}
          <div className="flex items-end">
            <button type="submit" disabled={isPending}
              className="flex h-10 w-full items-center justify-center gap-1.5 rounded-[var(--radius)] bg-brand-primary text-[11px] font-semibold uppercase tracking-wider text-brand-primary-foreground transition-opacity hover:opacity-80 disabled:opacity-50">
              {isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <><Plus className="h-3.5 w-3.5" aria-hidden="true" /> Añadir</>
              )}
            </button>
          </div>
        </div>

        {state.message && (
          <div role="status" aria-live="polite"
            className={`mt-2 flex items-center gap-1.5 text-xs ${state.success ? "text-green-600" : "text-red-500"}`}>
            {state.success ? (
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
