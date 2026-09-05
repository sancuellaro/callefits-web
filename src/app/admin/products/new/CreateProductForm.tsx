"use client";

import { useActionState, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { createProductAction } from "../../actions";
import { generateSlug } from "@/lib/admin-schemas";
import { cn } from "@/lib/utils";

const INPUT_CLASS =
  "h-11 w-full rounded-[var(--radius)] border border-black/10 bg-surface px-3 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const LABEL_CLASS =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500";

export function CreateProductForm() {
  const [state, formAction, isPending] = useActionState(createProductAction, {
    success: false,
    message: "",
  });

  const [name, setName] = useState("");
  const [colorHex, setColorHex] = useState("#121212");

  const slugPreview = generateSlug(name);

  return (
    <form action={formAction} className="space-y-6">
      {/* ── Información General ─────────────────────────────────────────── */}
      <section className="rounded-[var(--radius)] border border-black/5 bg-surface p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <h2 className="mb-4 border-b border-black/5 pb-3 text-sm font-semibold text-neutral-800">
          Información General
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Nombre */}
          <div className="sm:col-span-2">
            <label htmlFor="name" className={LABEL_CLASS}>Nombre de la Prenda *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={120}
              placeholder="Ej: Legging Seamless Sculpt Pro"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={INPUT_CLASS}
            />
            {slugPreview && (
              <p className="mt-1 text-[11px] text-neutral-400">
                Slug URL: <code className="font-mono text-neutral-600">{slugPreview}</code>
              </p>
            )}
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="category" className={LABEL_CLASS}>Categoría *</label>
            <select
              id="category"
              name="category"
              required
              className={INPUT_CLASS}
            >
              <option value="">Seleccionar categoría...</option>
              <option value="leggings">Leggings</option>
              <option value="tops">Tops</option>
              <option value="sets">Sets Combinados</option>
              <option value="enterizos">Enterizos</option>
            </select>
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="status" className={LABEL_CLASS}>Estado Inicial</label>
            <select id="status" name="status" className={INPUT_CLASS} defaultValue="draft">
              <option value="draft">Borrador (oculto al público)</option>
              <option value="active">Activo (visible en tienda)</option>
            </select>
          </div>

          {/* Descripción breve */}
          <div className="sm:col-span-2">
            <label htmlFor="shortDescription" className={LABEL_CLASS}>
              Descripción Breve * (máx. 200 caracteres)
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              required
              maxLength={200}
              rows={2}
              placeholder="Tiro ultra alto con compresión postural inteligente..."
              className={cn(INPUT_CLASS, "h-auto py-2.5 resize-none")}
            />
          </div>

          {/* Descripción larga */}
          <div className="sm:col-span-2">
            <label htmlFor="description" className={LABEL_CLASS}>
              Descripción Técnica Completa *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              placeholder="Diseñado para transformar cada entrenamiento..."
              className={cn(INPUT_CLASS, "h-auto py-2.5 resize-none")}
            />
          </div>
        </div>
      </section>

      {/* ── Precios ──────────────────────────────────────────────────────── */}
      <section className="rounded-[var(--radius)] border border-black/5 bg-surface p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <h2 className="mb-4 border-b border-black/5 pb-3 text-sm font-semibold text-neutral-800">
          Precios (COP)
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="basePrice" className={LABEL_CLASS}>Precio Base * (ej: 135000)</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-neutral-400">$</span>
              <input id="basePrice" name="basePrice" type="number" required min={1000} step={1000}
                placeholder="135000" className={cn(INPUT_CLASS, "pl-7")} />
            </div>
          </div>
          <div>
            <label htmlFor="compareAtPrice" className={LABEL_CLASS}>
              Precio de Oferta — opcional (precio original antes de rebaja)
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-neutral-400">$</span>
              <input id="compareAtPrice" name="compareAtPrice" type="number" min={0} step={1000}
                placeholder="160000 (dejar vacío si no hay oferta)" className={cn(INPUT_CLASS, "pl-7")} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Atributos Textiles ──────────────────────────────────────────── */}
      <section className="rounded-[var(--radius)] border border-black/5 bg-surface p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <h2 className="mb-4 border-b border-black/5 pb-3 text-sm font-semibold text-neutral-800">
          Atributos Textiles
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="compression" className={LABEL_CLASS}>Nivel de Compresión *</label>
            <select id="compression" name="compression" required className={INPUT_CLASS}>
              <option value="">Seleccionar...</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Ligera">Ligera</option>
            </select>
          </div>

          <div>
            <label htmlFor="waistType" className={LABEL_CLASS}>Tipo de Tiro / Corte *</label>
            <input id="waistType" name="waistType" type="text" required
              placeholder="Ej: Tiro Alto Anatómico con soporte lumbar"
              className={INPUT_CLASS} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="material" className={LABEL_CLASS}>Composición del Tejido *</label>
            <input id="material" name="material" type="text" required
              placeholder="Ej: 80% Poliamida reciclada, 20% Elastano"
              className={INPUT_CLASS} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="careInstructions" className={LABEL_CLASS}>
              Instrucciones de Cuidado * (una por línea)
            </label>
            <textarea id="careInstructions" name="careInstructions" required rows={3}
              defaultValue={"Lavar a mano o máquina en ciclo suave (máx. 30°C)\nNo usar blanqueador ni suavizante\nTender en sombra sobre superficie plana\nNo usar secadora ni plancha"}
              className={cn(INPUT_CLASS, "h-auto py-2.5 resize-none font-mono text-xs")} />
          </div>
        </div>
      </section>

      {/* ── Variante Inicial ─────────────────────────────────────────────── */}
      <section className="rounded-[var(--radius)] border border-black/5 bg-surface p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <h2 className="mb-4 border-b border-black/5 pb-3 text-sm font-semibold text-neutral-800">
          Variante Inicial (Talla + Color + Stock)
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="variantSize" className={LABEL_CLASS}>Talla *</label>
            <select id="variantSize" name="variantSize" required className={INPUT_CLASS}>
              <option value="">Seleccionar...</option>
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="variantColor" className={LABEL_CLASS}>Nombre del Color *</label>
            <input id="variantColor" name="variantColor" type="text" required
              placeholder="Ej: Negro Ónix" className={INPUT_CLASS} />
          </div>

          <div>
            <label htmlFor="variantColorHex" className={LABEL_CLASS}>Color (HEX) *</label>
            <div className="flex gap-2">
              <input type="color" value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
                className="h-11 w-14 cursor-pointer rounded-[var(--radius)] border border-black/10 p-1"
                aria-label="Selector de color" />
              <input id="variantColorHex" name="variantColorHex" type="text"
                value={colorHex} onChange={(e) => setColorHex(e.target.value)}
                pattern="^#[0-9A-Fa-f]{6}$" required
                className={cn(INPUT_CLASS, "font-mono")} />
            </div>
          </div>

          <div>
            <label htmlFor="variantStock" className={LABEL_CLASS}>Stock Inicial</label>
            <input id="variantStock" name="variantStock" type="number" min={0} step={1}
              defaultValue={0} className={INPUT_CLASS} />
          </div>
        </div>
      </section>

      {/* ── Error global ─────────────────────────────────────────────────── */}
      {state.message && !state.success && (
        <div role="alert" className="flex items-center gap-2 rounded-[var(--radius)] bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          {state.message}
        </div>
      )}

      {/* ── Submit ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <button type="submit" disabled={isPending}
          className="flex h-12 items-center gap-2 rounded-[var(--radius)] bg-brand-primary px-8 text-xs font-semibold uppercase tracking-wider text-brand-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60">
          {isPending ? (
            <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Creando Prenda...</>
          ) : "CREAR PRENDA"}
        </button>
        <Link href="/admin/products" className="text-xs text-neutral-400 hover:text-neutral-700">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
