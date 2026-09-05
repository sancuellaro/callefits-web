"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatters";
import { CATEGORY_LABELS } from "@/types/product";

interface AdminProductsTableProps {
  products: Product[];
}

export function AdminProductsTable({ products }: AdminProductsTableProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = products.filter((p) => {
    const matchesSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "leggings", "tops", "sets", "enterizos"] as const;

  return (
    <div>
      {/* Barra de herramientas */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Buscador */}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre de prenda..."
          aria-label="Buscar prenda"
          className="h-10 w-full rounded-[var(--radius)] border border-black/10 bg-surface px-3 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:max-w-xs"
        />

        {/* Filtro categoría */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-widest transition-colors ${
                categoryFilter === cat
                  ? "bg-brand-primary text-brand-primary-foreground"
                  : "border border-black/10 text-foreground/60 hover:text-foreground"
              }`}
            >
              {cat === "all" ? "Todas" : CATEGORY_LABELS[cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla con scroll horizontal en móvil */}
      <div className="overflow-x-auto rounded-[var(--radius)] border border-black/5">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-black/5 bg-surface-muted">
            <tr>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                Prenda
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                Precios
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                Estado
              </th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                Variantes / Stock
              </th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 bg-surface">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-neutral-400">
                  No se encontraron prendas con ese criterio.
                </td>
              </tr>
            )}
            {filtered.map((p) => {
              const primaryImage = p.images.find((i) => i.isPrimary) ?? p.images[0];
              const totalStock = p.variants.reduce(
                (sum, v) => sum + v.stockQuantity,
                0,
              );
              const isActive = p.status === "active";

              return (
                <tr key={p.id} className="group transition-colors hover:bg-surface-muted/40">
                  {/* Miniatura + nombre */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-[var(--radius)] border border-black/5 bg-surface-muted">
                        {primaryImage && (
                          <Image
                            src={primaryImage.url}
                            alt={primaryImage.altText}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 group-hover:text-neutral-700">
                          {p.name}
                        </p>
                        <p className="text-[11px] uppercase tracking-widest text-neutral-400">
                          {CATEGORY_LABELS[p.category]}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Precios */}
                  <td className="px-4 py-3">
                    <p className="font-semibold text-neutral-900">
                      {formatPrice(p.basePrice)}
                    </p>
                    {p.compareAtPrice && (
                      <p className="text-xs text-neutral-400 line-through">
                        {formatPrice(p.compareAtPrice)}
                      </p>
                    )}
                  </td>

                  {/* Badge de estado */}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-neutral-400"}`}
                        aria-hidden="true"
                      />
                      {isActive ? "Activo" : "Borrador"}
                    </span>
                  </td>

                  {/* Variantes / stock */}
                  <td className="px-4 py-3 text-right text-xs text-neutral-500">
                    <span className="font-medium text-neutral-700">
                      {p.variants.length}
                    </span>{" "}
                    variantes
                    <br />
                    <span className="font-medium text-neutral-700">{totalStock}</span>{" "}
                    uds. totales
                  </td>

                  {/* Acción */}
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="inline-flex h-8 items-center rounded-[var(--radius)] bg-brand-primary px-3 text-[11px] font-semibold uppercase tracking-wider text-brand-primary-foreground transition-opacity hover:opacity-80"
                    >
                      Gestionar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
