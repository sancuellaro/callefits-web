import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CreateProductForm } from "./CreateProductForm";

export const metadata: Metadata = {
  title: "Nueva Prenda — Admin CALLEFITS",
  robots: { index: false, follow: false },
};

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/products"
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-neutral-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Volver a la lista
        </Link>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          PANEL ADMINISTRATIVO
        </p>
        <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-neutral-900">
          Nueva Prenda del Catálogo
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Completa todos los campos para añadir una nueva prenda. Podrás subir
          fotografías y añadir variantes adicionales desde el editor de prenda.
        </p>
      </div>

      <CreateProductForm />
    </div>
  );
}
