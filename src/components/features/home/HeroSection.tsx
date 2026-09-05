/**
 * HeroSection — Sección principal de alto impacto.
 * Server Component: contenido estático + links dinámicos de WhatsApp.
 * min-h [80–88vh], layout asimétrico: texto izquierda / imagen derecha.
 */
import Image from "next/image";
import Link from "next/link";
import { Shield, Truck, CheckCircle } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";

// ─── URLs ─────────────────────────────────────────────────────────────────────

const HERO_IMAGE_URL = "/danni/hero-danni.jpg";

const ADVISORY_WA_MESSAGE = encodeURIComponent(
  "Hola CALLEFITS BY DANNI, quisiera recibir asesoría personalizada sobre la guía de tallas para elegir mis prendas. ¡Muchas gracias!",
);

function buildWaLink(message: string) {
  const num = BRAND_CONFIG.contact.whatsapp.number.replace("+", "");
  return `https://wa.me/${num}?text=${message}`;
}

// ─── Sellos de confianza ──────────────────────────────────────────────────────

const TRUST_BADGES = [
  { icon: Shield, label: "Confección Premium" },
  { icon: Truck, label: "Envíos Nacionales" },
  { icon: CheckCircle, label: "Garantía de Ajuste" },
] as const;

// ─── Componente ────────────────────────────────────────────────────────────────

export function HeroSection() {
  const advisoryLink = buildWaLink(ADVISORY_WA_MESSAGE);

  return (
    <section
      aria-label="Hero — CALLEFITS BY DANNI"
      className="relative flex min-h-[80vh] w-full flex-col overflow-hidden md:min-h-[88vh]"
    >
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-12">
        {/* ── Columna de contenido — izquierda en desktop ─────────────────── */}
        <div className="flex flex-col justify-center bg-background px-6 py-16 sm:px-10 md:py-20 lg:col-span-5 lg:px-12 xl:px-16">
          {/* Tagline superior */}
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-500">
            NUEVA COLECCIÓN&nbsp;&nbsp;•&nbsp;&nbsp;ALTO RENDIMIENTO
          </p>

          {/* Titular principal */}
          <h1 className="text-3xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
            ELEGANCIA,
            <br />
            DISCIPLINA
            <br />
            Y CONFORT EN
            <br />
            CADA MOVIMIENTO.
          </h1>

          {/* Párrafo editorial */}
          <p className="mt-6 max-w-md text-sm leading-7 text-neutral-500">
            Prendas deportivas diseñadas para acompañar tu exigencia física con soporte
            anatómico, compresión graduada y tejidos 100%&nbsp;libres de transparencias.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/catalog"
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius)] bg-brand-primary px-7 text-xs font-semibold uppercase tracking-wider text-brand-primary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              EXPLORAR COLECCIÓN
            </Link>
            <a
              href={advisoryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius)] border border-black/10 px-7 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-brand-primary hover:text-brand-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              PEDIR ASESORÍA 1 A 1
            </a>
          </div>

          {/* Sellos de confianza */}
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-black/5 pt-8">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon
                  className="h-3.5 w-3.5 flex-shrink-0 text-neutral-400"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-medium text-neutral-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Columna de imagen — derecha en desktop ───────────────────────── */}
        <div className="relative order-first aspect-[4/5] w-full max-h-[520px] bg-surface-muted sm:aspect-[4/3] lg:order-last lg:col-span-7 lg:aspect-auto lg:h-auto lg:max-h-none">
          <Image
            src={HERO_IMAGE_URL}
            alt="Mujer atlética usando ropa deportiva CALLEFITS BY DANNI en estudio de entrenamiento"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-top lg:object-center"
          />
          {/* Overlay sutil en gradiente cálido para vincular con el fondo */}
          <div
            className="absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-background to-transparent lg:block"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
