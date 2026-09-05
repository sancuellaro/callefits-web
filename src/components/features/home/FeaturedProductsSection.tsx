/**
 * FeaturedProductsSection — Prendas destacadas del catálogo.
 * Server Component asíncrono que consume getFeaturedProducts(4).
 * Reutiliza ProductCard de la Fase 4 sin modificaciones.
 */
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/services/product-service";
import { ProductCard } from "@/components/features/products/ProductCard";

export async function FeaturedProductsSection() {
  const products = await getFeaturedProducts(4);

  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-heading"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      {/* Encabezado */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
            SELECCIÓN EXCLUSIVA
          </p>
          <h2
            id="featured-heading"
            className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
          >
            PRENDAS MÁS DESEADAS
          </h2>
        </div>
        <Link
          href="/catalog"
          className="hidden text-xs font-medium uppercase tracking-widest text-neutral-400 underline-offset-4 transition-colors hover:text-neutral-700 hover:underline sm:inline-block"
        >
          Ver todo el catálogo →
        </Link>
      </div>

      {/* Grilla 2 cols mobile / 4 cols desktop */}
      <ul
        className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4"
        aria-label="Prendas deportivas destacadas"
      >
        {products.map((product, idx) => (
          <li key={product.id}>
            <ProductCard product={product} priority={idx < 2} />
          </li>
        ))}
      </ul>

      {/* Ver más — solo mobile */}
      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/catalog"
          className="inline-flex h-11 items-center rounded-[var(--radius)] border border-black/10 px-7 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-brand-primary hover:text-brand-primary-foreground"
        >
          Ver todo el catálogo
        </Link>
      </div>
    </section>
  );
}
