import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/lib/services/product-service";
import { CATEGORY_LABELS } from "@/types/product";
import { formatPrice } from "@/lib/formatters";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductGallery } from "@/components/features/products/ProductGallery";
import { ProductPurchasePanel } from "@/components/features/products/ProductPurchasePanel";
import { ProductCard } from "@/components/features/products/ProductCard";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://callefits.com";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

// ─── Metadatos dinámicos enriquecidos ─────────────────────────────────────────

export async function generateMetadata(
  { params }: ProductDetailPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Producto no encontrado" };

  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0];
  const canonicalUrl = `${BASE_URL}/catalog/${product.slug}`;

  return {
    title: `${product.name} | Ropa Deportiva CALLEFITS`,
    description: `${product.shortDescription} Confección de alta gama, compresión ${product.attributes.compression} y precio desde ${formatPrice(product.basePrice)}. Pide tu talla por WhatsApp con atención personalizada.`,
    keywords: [
      product.name.toLowerCase(),
      product.category,
      "ropa deportiva mujer colombia",
      `compresión ${product.attributes.compression.toLowerCase()}`,
      "callefits by danni",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${product.name} | CALLEFITS BY DANNI`,
      description: product.shortDescription,
      url: canonicalUrl,
      type: "website",
      locale: "es_CO",
      images: primaryImage
        ? [
            {
              url: primaryImage.url,
              alt: primaryImage.altText,
              width: 1000,
              height: 1333,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: primaryImage ? [primaryImage.url] : undefined,
    },
  };
}

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────

function Breadcrumbs({ category, name }: { category: string; name: string }) {
  const categoryLabel = CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category;
  return (
    <nav aria-label="Migas de pan" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-400">
        <li>
          <Link href="/" className="hover:text-neutral-700">
            Inicio
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/catalog" className="hover:text-neutral-700">
            Catálogo
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link
            href={`/catalog?category=${category}`}
            className="hover:text-neutral-700"
          >
            {categoryLabel}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li
          className="max-w-[180px] truncate font-medium text-neutral-600 sm:max-w-xs"
          aria-current="page"
        >
          {name}
        </li>
      </ol>
    </nav>
  );
}

// ─── Página de detalle ────────────────────────────────────────────────────────

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(slug, product.category, 4);

  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
  const canonicalUrl = `${BASE_URL}/catalog/${product.slug}`;
  const hasAvailableVariant = product.variants.some((v) => v.isAvailable);

  // ── Schema.org: Product ────────────────────────────────────────────────────
  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    sku: product.variants[0]?.sku,
    brand: {
      "@type": "Brand",
      name: "CALLEFITS BY DANNI",
    },
    offers: {
      "@type": "Offer",
      price: product.basePrice,
      priceCurrency: "COP",
      availability: hasAvailableVariant
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: canonicalUrl,
      seller: {
        "@type": "Organization",
        name: "CALLEFITS BY DANNI",
      },
    },
  };

  // ── Schema.org: BreadcrumbList ─────────────────────────────────────────────
  const breadcrumbSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catálogo",
        item: `${BASE_URL}/catalog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabel,
        item: `${BASE_URL}/catalog?category=${product.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Datos estructurados Schema.org */}
      <JsonLd schema={productSchema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* Migas de pan */}
      <Breadcrumbs category={product.category} name={product.name} />

      {/* ── Layout a dos columnas en desktop ─────────────────────────────── */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Galería — 7/12 columnas */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Panel de compra — 5/12 columnas, sticky */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <ProductPurchasePanel product={product} />
          </div>
        </div>
      </div>

      {/* ── Descripción completa ─────────────────────────────────────────── */}
      <section className="mt-14 max-w-3xl" aria-labelledby="desc-heading">
        <h2
          id="desc-heading"
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400"
        >
          Sobre esta prenda
        </h2>
        <p className="text-sm leading-7 text-neutral-600">{product.description}</p>
      </section>

      {/* ── Productos relacionados ───────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="mt-16" aria-labelledby="related-heading">
          <div className="mb-6 flex items-center justify-between">
            <h2
              id="related-heading"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400"
            >
              TAMBIÉN TE PUEDE GUSTAR
            </h2>
            <Link
              href={`/catalog?category=${product.category}`}
              className="text-xs font-medium uppercase tracking-widest text-neutral-400 underline-offset-4 hover:text-neutral-700 hover:underline"
            >
              Ver más →
            </Link>
          </div>
          <ul
            className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
            aria-label="Prendas relacionadas"
          >
            {relatedProducts.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
