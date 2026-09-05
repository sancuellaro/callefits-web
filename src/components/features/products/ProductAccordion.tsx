"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductAttribute } from "@/types/product";
import { BRAND_CONFIG } from "@/config/brand.config";

interface ProductAccordionProps {
  attributes: ProductAttribute;
}

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionItem({ title, isOpen, onToggle, children }: AccordionItemProps) {
  return (
    <div className="border-t border-black/8">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
          {title}
        </span>
        {isOpen ? (
          <Minus className="h-3.5 w-3.5 flex-shrink-0 text-neutral-400" aria-hidden="true" />
        ) : (
          <Plus className="h-3.5 w-3.5 flex-shrink-0 text-neutral-400" aria-hidden="true" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 pb-4" : "max-h-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * ProductAccordion — Tres secciones colapsables con información técnica de la prenda.
 *   1. Especificaciones Técnicas
 *   2. Cuidados de la Prenda
 *   3. Envíos y Asesoría 1 a 1
 */
export function ProductAccordion({ attributes }: ProductAccordionProps) {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));

  function toggle(index: number) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  const whatsappHref = `https://wa.me/${BRAND_CONFIG.contact.whatsapp.number.replace("+", "")}?text=${encodeURIComponent(BRAND_CONFIG.contact.whatsapp.defaultMessage)}`;

  return (
    <div className="mt-6">
      {/* 1 — Especificaciones Técnicas */}
      <AccordionItem
        title="Especificaciones Técnicas"
        isOpen={openSections.has(0)}
        onToggle={() => toggle(0)}
      >
        <dl className="space-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="w-28 flex-shrink-0 text-neutral-400">Compresión</dt>
            <dd className="font-medium text-neutral-700">{attributes.compression}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-28 flex-shrink-0 text-neutral-400">Composición</dt>
            <dd className="font-medium text-neutral-700">{attributes.material}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-28 flex-shrink-0 text-neutral-400">Corte / Tiro</dt>
            <dd className="font-medium text-neutral-700">{attributes.waistType}</dd>
          </div>
        </dl>
      </AccordionItem>

      {/* 2 — Cuidados de la Prenda */}
      <AccordionItem
        title="Cuidados de la Prenda"
        isOpen={openSections.has(1)}
        onToggle={() => toggle(1)}
      >
        <ul className="space-y-1.5">
          {attributes.careInstructions.map((instruction) => (
            <li key={instruction} className="flex items-start gap-2 text-sm text-neutral-600">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300" aria-hidden="true" />
              {instruction}
            </li>
          ))}
        </ul>
      </AccordionItem>

      {/* 3 — Envíos y Asesoría */}
      <AccordionItem
        title="Envíos y Asesoría 1 a 1"
        isOpen={openSections.has(2)}
        onToggle={() => toggle(2)}
      >
        <div className="space-y-3 text-sm text-neutral-600">
          <p>
            🚚 <span className="font-medium text-neutral-800">Despacho a toda Colombia.</span>{" "}
            Tiempo promedio de entrega de 3 a 7 días hábiles con guía de rastreo.
          </p>
          <p>
            ✅ Todas las prendas pasan por un control de calidad personal de Danni antes de ser
            empacadas y enviadas.
          </p>
          <p>
            💬 ¿Tienes dudas sobre la talla, el color o el ajuste?{" "}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-accent underline-offset-4 hover:underline"
            >
              Escríbenos por WhatsApp
            </a>{" "}
            para recibir asesoría personalizada gratuita.
          </p>
        </div>
      </AccordionItem>
    </div>
  );
}
