/**
 * FeaturedCategoriesSection — Grilla editorial de 4 categorías del catálogo.
 * Server Component asíncrono que consume getCategoriesWithCounts().
 */
import Image from "next/image";
import Link from "next/link";
import { getCategoriesWithCounts } from "@/lib/services/product-service";
import type { Category } from "@/types/product";

// ─── Componente interno de tarjeta ────────────────────────────────────────────

interface CategoryCardProps {
  category: Category;
  name: string;
  count: number;
  image: string;
  index: number;
}

function CategoryCard({ category, name, count, image, index }: CategoryCardProps) {
  return (
    <Link
      href={`/catalog?category=${category}`}
      className="group relative block overflow-hidden rounded-[var(--radius)] bg-surface-muted"
      aria-label={`Explorar categoría: ${name} — ${count} prendas`}
    >
      {/* Imagen de fondo */}
      <div className="relative aspect-[3/4]">
        {image ? (
          <Image
            src={image}
            alt={`Colección de ${name} CALLEFITS BY DANNI`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
            priority={index < 2}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-surface-muted" />
        )}

        {/* Overlay degradé inferior para legibilidad */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
          aria-hidden="true"
        />

        {/* Contenido sobre el overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
            {count} prendas
          </p>
          <h3 className="text-lg font-semibold tracking-wider text-white md:text-xl">
            {name.toUpperCase()}
          </h3>
          <span className="mt-1 inline-block text-xs font-medium tracking-widest text-white/70 transition-colors group-hover:text-white">
            Explorar&nbsp;→
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Sección principal ────────────────────────────────────────────────────────

export async function FeaturedCategoriesSection() {
  const categories = await getCategoriesWithCounts();

  return (
    <section aria-labelledby="categories-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
            EXPLORAR POR CATEGORÍA
          </p>
          <h2
            id="categories-heading"
            className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
          >
            TODA LA COLECCIÓN
          </h2>
        </div>
        <Link
          href="/catalog"
          className="hidden text-xs font-medium uppercase tracking-widest text-neutral-400 underline-offset-4 hover:text-neutral-700 hover:underline sm:block"
        >
          Ver todo →
        </Link>
      </div>

      {/* Cuadrícula editorial */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {categories.map((cat, idx) => (
          <CategoryCard
            key={cat.category}
            category={cat.category}
            name={cat.name}
            count={cat.count}
            image={cat.image}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}
