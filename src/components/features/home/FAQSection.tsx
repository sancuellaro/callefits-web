"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ_DATA } from "@/data/faq-data";
import { BRAND_CONFIG } from "@/config/brand.config";

/**
 * FAQSection — Acordeón interactivo con las 5 preguntas frecuentes más críticas.
 * Client Component: gestiona el estado open/close de cada ítem.
 */

function buildWaFaqLink() {
  const num = BRAND_CONFIG.contact.whatsapp.number.replace("+", "");
  const msg = encodeURIComponent(BRAND_CONFIG.contact.whatsapp.defaultMessage);
  return `https://wa.me/${num}?text=${msg}`;
}

// ─── Item del acordeón ────────────────────────────────────────────────────────

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-black/5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="text-sm font-medium text-neutral-800 md:text-base">
          {question}
        </span>
        {isOpen ? (
          <Minus
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400"
            aria-hidden="true"
          />
        ) : (
          <Plus
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400"
            aria-hidden="true"
          />
        )}
      </button>

      {/* Contenido con transición suave */}
      <div
        className={cn(
          "overflow-hidden text-sm leading-7 text-neutral-500 transition-all duration-300",
          isOpen ? "max-h-96 pb-5" : "max-h-0",
        )}
      >
        {answer}
      </div>
    </div>
  );
}

// ─── Sección principal ────────────────────────────────────────────────────────

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  const waLink = buildWaFaqLink();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
    >
      {/* Encabezado centrado */}
      <div className="mb-10 text-center">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          RESPUESTAS CLARAS
        </p>
        <h2
          id="faq-heading"
          className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
        >
          PREGUNTAS FRECUENTES
        </h2>
      </div>

      {/* Acordeón */}
      <div className="divide-y-0 rounded-[var(--radius)] border border-black/5 bg-surface px-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="border-t-0">
          {FAQ_DATA.map((faq, idx) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>

      {/* CTA al pie — pregunta adicional */}
      <div className="mt-8 rounded-[var(--radius)] border border-black/5 bg-surface-muted px-6 py-5 text-center">
        <p className="mb-4 text-sm text-neutral-600">
          ¿Tienes otra pregunta? Escríbenos directamente a WhatsApp y te respondemos en minutos.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center rounded-[var(--radius)] bg-brand-primary px-6 text-xs font-semibold uppercase tracking-wider text-brand-primary-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </section>
  );
}
