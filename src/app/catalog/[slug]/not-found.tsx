/**
 * not-found.tsx — Vista de prenda no encontrada para /catalog/[slug].
 * Se activa automáticamente cuando getProductBySlug retorna null
 * y el Server Component invoca notFound().
 */
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      {/* Número decorativo */}
      <p
        className="select-none text-8xl font-bold tracking-tighter text-neutral-100"
        aria-hidden="true"
      >
        404
      </p>

      <div className="-mt-8 space-y-2">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-800">
          Esta prenda ya no está disponible
        </h1>
        <p className="text-sm text-neutral-500">
          Es posible que haya sido descontinuada, renombrada o que el enlace sea incorrecto.
          Explora el catálogo completo para encontrar la prenda perfecta para ti.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/catalog"
          className="rounded-[var(--radius)] bg-brand-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-brand-primary-foreground transition-opacity hover:opacity-80"
        >
          Explorar Catálogo
        </Link>
        <Link
          href="/"
          className="rounded-[var(--radius)] border border-black/10 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-600 transition-colors hover:bg-surface-muted"
        >
          Ir al Inicio
        </Link>
      </div>
    </div>
  );
}
