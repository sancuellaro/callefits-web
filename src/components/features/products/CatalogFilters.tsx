"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/product";

// ─── Datos estáticos ───────────────────────────────────────────────────────────

const FILTER_PILLS: { label: string; value: Category | "all" }[] = [
  { label: "Todas", value: "all" },
  { label: "Leggings", value: "leggings" },
  { label: "Tops", value: "tops" },
  { label: "Sets", value: "sets" },
  { label: "Enterizos", value: "enterizos" },
];

const SORT_OPTIONS: { label: string; value: string }[] = [
  { label: "Destacados", value: "featured" },
  { label: "Precio: Menor a Mayor", value: "price_asc" },
  { label: "Precio: Mayor a Menor", value: "price_desc" },
  { label: "Novedades", value: "newest" },
];

// ─── Props ─────────────────────────────────────────────────────────────────────

interface CatalogFiltersProps {
  activeCategory?: Category;
  activeSort?: string;
  totalCount: number;
}

// ─── Componente ────────────────────────────────────────────────────────────────

export function CatalogFilters({ activeCategory, activeSort, totalCount }: CatalogFiltersProps) {
  const router = useRouter();

  function navigate(newCategory: Category | "all", newSort?: string) {
    const params = new URLSearchParams();
    if (newCategory !== "all") params.set("category", newCategory);
    if (newSort && newSort !== "featured") params.set("sort", newSort);
    const qs = params.toString();
    router.push(`/catalog${qs ? `?${qs}` : ""}`);
  }

  function handleCategoryChange(value: Category | "all") {
    navigate(value, activeSort);
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    navigate(activeCategory ?? "all", e.target.value);
  }

  return (
    <div className="space-y-4">
      {/* Pills de categoría */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTER_PILLS.map(({ label, value }) => {
          const isActive = value === "all" ? !activeCategory : activeCategory === value;
          return (
            <button
              key={value}
              onClick={() => handleCategoryChange(value)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest transition-all duration-200",
                isActive
                  ? "bg-brand-primary text-brand-primary-foreground shadow-sm"
                  : "border border-black/10 bg-transparent text-foreground/60 hover:border-black/25 hover:text-foreground",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Línea de metainfo + selector de orden */}
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          Mostrando{" "}
          <span className="text-neutral-700">{totalCount}</span>{" "}
          prenda{totalCount !== 1 ? "s" : ""} de alta gama
        </p>

        <select
          value={activeSort ?? "featured"}
          onChange={handleSortChange}
          aria-label="Ordenar catálogo"
          className="rounded-[var(--radius)] border border-black/10 bg-surface px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Separador micro */}
      <div className="border-t border-black/5" />
    </div>
  );
}
