import type { Metadata } from "next";
import { getProducts } from "@/lib/services/product-service";
import { AdminProductsTable } from "./AdminProductsTable";

export const metadata: Metadata = {
  title: "Gestión de Productos — Admin CALLEFITS",
  robots: { index: false, follow: false },
};

// ─── Tarjeta métrica ─────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note?: string;
}) {
  return (
    <div className="rounded-[var(--radius)] border border-black/5 bg-surface p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-neutral-900">{value}</p>
      {note && <p className="mt-0.5 text-[11px] text-neutral-400">{note}</p>}
    </div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default async function AdminProductsPage() {
  // Obtiene TODOS los productos, incluyendo borradores (para admin)
  const allProducts = await getProducts();

  const active = allProducts.filter((p) => p.status === "active").length;
  const draft = allProducts.filter((p) => p.status === "draft").length;

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          PANEL DE CONTROL
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">
          Gestión del Catálogo
        </h1>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          label="Total Prendas"
          value={allProducts.length}
          note="en el catálogo completo"
        />
        <MetricCard
          label="Activas en Tienda"
          value={active}
          note="visibles para compradores"
        />
        <MetricCard
          label="En Borrador"
          value={draft}
          note="ocultas del catálogo público"
        />
      </div>

      {/* Tabla de productos */}
      <div className="rounded-[var(--radius)] border border-black/5 bg-surface p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:p-6">
        <h2 className="mb-4 text-sm font-semibold tracking-tight text-neutral-900">
          Todas las Prendas
        </h2>
        <AdminProductsTable products={allProducts} />
      </div>
    </div>
  );
}
