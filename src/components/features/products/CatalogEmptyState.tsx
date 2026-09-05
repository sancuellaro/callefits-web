/**
 * CatalogEmptyState — Estado vacío elegante del catálogo.
 * Server Component.
 */
import Link from "next/link";

export function CatalogEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      {/* Icono decorativo */}
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full border border-black/8 bg-surface-muted"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.25}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
          Sin resultados
        </p>
        <h2 className="text-xl font-light tracking-tight text-neutral-900">
          No encontramos prendas con estos filtros
        </h2>
        <p className="max-w-xs text-sm text-neutral-400">
          Prueba ajustando los filtros de categoría o seleccionando una talla
          diferente para explorar toda la colección.
        </p>
      </div>

      <Link
        href="/catalog"
        className="inline-flex items-center rounded-[var(--radius)] border border-black/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-brand-primary hover:text-brand-primary-foreground"
      >
        Ver Todo el Catálogo
      </Link>
    </div>
  );
}
