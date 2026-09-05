import type { Metadata } from "next";
import { getProducts } from "@/lib/services/product-service";
import type { Category, ProductFilters } from "@/types/product";
import { ProductCard } from "@/components/features/products/ProductCard";
import { CatalogFilters } from "@/components/features/products/CatalogFilters";
import { CatalogEmptyState } from "@/components/features/products/CatalogEmptyState";

// ─── Metadatos ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora la colección completa de ropa deportiva de alto rendimiento CALLEFITS BY DANNI. Leggings, Tops, Sets y Enterizos de confección premium.",
};

// ─── Helpers de validación de searchParams ────────────────────────────────────

const VALID_CATEGORIES: Category[] = ["leggings", "tops", "sets", "enterizos"];
const VALID_SORTS = ["featured", "price_asc", "price_desc", "newest"] as const;
type ValidSort = (typeof VALID_SORTS)[number];

function parseCategory(raw?: string): Category | undefined {
  return VALID_CATEGORIES.includes(raw as Category) ? (raw as Category) : undefined;
}

function parseSort(raw?: string): ValidSort | undefined {
  return VALID_SORTS.includes(raw as ValidSort) ? (raw as ValidSort) : undefined;
}

// ─── Página ───────────────────────────────────────────────────────────────────

interface CatalogPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    search?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  // Next.js 15: searchParams es una Promesa — debe resolverse con await
  const resolved = await searchParams;

  const activeCategory = parseCategory(resolved.category);
  const activeSort = parseSort(resolved.sort);
  const activeSearch = resolved.search?.trim() || undefined;

  const filters: ProductFilters = {
    category: activeCategory,
    sort: activeSort,
    search: activeSearch,
  };

  const products = await getProducts(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* ── Encabezado editorial ─────────────────────────────────────────── */}
      <header className="mb-10">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          CALLEFITS BY DANNI
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          COLECCIÓN DE ALTO RENDIMIENTO
        </h1>
        <p className="mt-2 max-w-xl text-sm text-neutral-500">
          Prendas deportivas diseñadas con soporte anatómico, compresión graduada y máxima
          sofisticación. Cada pieza, una declaración de poder y elegancia.
        </p>
      </header>

      {/* ── Filtros y ordenamiento ────────────────────────────────────────── */}
      <div className="mb-8">
        <CatalogFilters
          activeCategory={activeCategory}
          activeSort={activeSort}
          totalCount={products.length}
        />
      </div>

      {/* ── Grilla de productos o estado vacío ───────────────────────────── */}
      {products.length === 0 ? (
        <CatalogEmptyState />
      ) : (
        <ul
          className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
          aria-label="Catálogo de prendas deportivas"
        >
          {products.map((product, idx) => (
            <li key={product.id}>
              <ProductCard product={product} priority={idx < 4} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
