import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getProductById } from "@/lib/services/product-service";
import { formatPrice, calculateDiscountPercentage } from "@/lib/formatters";
import { CATEGORY_LABELS } from "@/types/product";
import { PricingForm } from "./PricingForm";
import { StockForm } from "./StockForm";
import { ImageUploadForm } from "./ImageUploadForm";

// ─── Tipos ─────────────────────────────────────────────────────────────────────

interface ProductEditorPageProps {
  params: Promise<{ id: string }>;
}

// ─── Metadatos dinámicos ──────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: ProductEditorPageProps,
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  return {
    title: product
      ? `Editar: ${product.name} — Admin CALLEFITS`
      : "Prenda no encontrada — Admin CALLEFITS",
    robots: { index: false, follow: false },
  };
}

// ─── Sub-componente: Tarjeta de sección ───────────────────────────────────────

function AdminCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius)] border border-black/5 bg-surface p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:p-6">
      <h2 className="mb-4 border-b border-black/5 pb-3 text-sm font-semibold tracking-tight text-neutral-800">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Página principal del editor ──────────────────────────────────────────────

export default async function ProductEditorPage({ params }: ProductEditorPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const discountPct = product.compareAtPrice
    ? calculateDiscountPercentage(product.basePrice, product.compareAtPrice)
    : 0;

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <Link
          href="/admin/products"
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-neutral-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Volver a la lista de productos
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              {CATEGORY_LABELS[product.category]}
            </p>
            <h1 className="mt-0.5 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              {product.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-neutral-900">
              {formatPrice(product.basePrice)}
            </span>
            {discountPct > 0 && (
              <span className="rounded-full bg-brand-primary px-2 py-0.5 text-[10px] font-semibold uppercase text-brand-primary-foreground">
                -{discountPct}% oferta
              </span>
            )}
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                product.status === "active"
                  ? "bg-green-50 text-green-700"
                  : "bg-neutral-100 text-neutral-500"
              }`}
            >
              {product.status === "active" ? "Activo" : "Borrador"}
            </span>
          </div>
        </div>
      </div>

      {/* Tarjeta 1: Información General (solo lectura en este MVP) */}
      <AdminCard title="Información General">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
              Descripción Breve
            </p>
            <p className="text-sm text-neutral-600">{product.shortDescription}</p>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
              Atributos Técnicos
            </p>
            <ul className="space-y-0.5 text-sm text-neutral-600">
              <li>
                <span className="text-neutral-400">Compresión:</span>{" "}
                {product.attributes.compression}
              </li>
              <li>
                <span className="text-neutral-400">Material:</span>{" "}
                {product.attributes.material}
              </li>
              <li>
                <span className="text-neutral-400">Tiro:</span>{" "}
                {product.attributes.waistType}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
            Descripción Completa
          </p>
          <p className="text-sm leading-7 text-neutral-600">{product.description}</p>
        </div>
      </AdminCard>

      {/* Tarjeta 2: Precios y Estado */}
      <AdminCard title="Gestión de Precios y Disponibilidad">
        <PricingForm product={product} />
      </AdminCard>

      {/* Tarjeta 3: Inventario y Variantes */}
      <AdminCard title="Inventario y Variantes">
        <p className="mb-4 text-xs text-neutral-400">
          Ajusta el stock disponible de cada talla y color. Los cambios se reflejan en
          tiempo real en la tienda pública.
        </p>
        <StockForm variants={product.variants} productSlug={product.slug} />
      </AdminCard>

      {/* Tarjeta 4: Galería de Fotografías */}
      <AdminCard title="Galería de Fotografías">
        <ImageUploadForm productId={product.id} images={product.images} />
      </AdminCard>
    </div>
  );
}
