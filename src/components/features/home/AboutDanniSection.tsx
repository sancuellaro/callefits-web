/**
 * AboutDanniSection — Storytelling editorial sobre Danni y el origen de la marca.
 * Server Component: layout asimétrico de 2 columnas con narrativa auténtica.
 * Presencia humana sin saturación; elegancia deportiva con propósito.
 */
import Image from "next/image";
import { BRAND_CONFIG } from "@/config/brand.config";

// ─── URLs ─────────────────────────────────────────────────────────────────────

const DANNI_IMAGE_URL =
  "https://images.unsplash.com/photo-1536922246289-88c42f957773?auto=format&fit=crop&w=900&q=85";

const DANNI_WA_MESSAGE = encodeURIComponent(
  "Hola Danni! Soy seguidora de CALLEFITS BY DANNI y me encantaría conversar sobre la colección y recibir tu asesoría personalizada.",
);

function buildWaLink(msg: string) {
  const num = BRAND_CONFIG.contact.whatsapp.number.replace("+", "");
  return `https://wa.me/${num}?text=${msg}`;
}

// ─── Componente ────────────────────────────────────────────────────────────────

export function AboutDanniSection() {
  const danniWaLink = buildWaLink(DANNI_WA_MESSAGE);

  return (
    <section
      id="sobre-danni"
      aria-labelledby="danni-heading"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ── Columna visual (5/12 en desktop) ──────────────────────────── */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[var(--radius)] border border-black/5 shadow-[0_2px_24px_rgba(0,0,0,0.04)]">
            <div className="relative aspect-[3/4] w-full bg-surface-muted">
              <Image
                src={DANNI_IMAGE_URL}
                alt="Danni, fundadora de CALLEFITS BY DANNI, en su estudio de entrenamiento"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* ── Columna de contenido (7/12 en desktop) ────────────────────── */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Etiqueta superior */}
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400">
            LA VISIÓN DETRÁS DE CALLEFITS
          </p>

          {/* Titular editorial */}
          <h2
            id="danni-heading"
            className="text-2xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-3xl md:text-4xl"
          >
            DISEÑADO POR UNA MUJER QUE ENTRENA,<br className="hidden sm:block" />{" "}
            PARA MUJERES QUE EXIGEN LO MEJOR.
          </h2>

          {/* Narrativa auténtica */}
          <div className="space-y-4 text-sm leading-7 text-neutral-500">
            <p>
              Hola, soy Danni. <strong className="font-medium text-neutral-700">CALLEFITS</strong> nació
              de una frustración real: era difícil encontrar prendas deportivas que realmente no
              transparentaran, que tuvieran un tiro alto que no se bajara a mitad de un set y que
              al mismo tiempo lucieran elegantes fuera del gimnasio.
            </p>
            <p>
              Cada legging, top y enterizo de esta colección pasa por mis manos y por
              entrenamientos reales antes de llegar a ti. No vendemos simplemente ropa; entregamos
              la confianza y la seguridad de sentirte imparable en cada movimiento.
            </p>
          </div>

          {/* Cita destacada */}
          <blockquote className="border-l-2 border-brand-primary pl-5">
            <p className="text-base font-light italic leading-relaxed text-neutral-700">
              &ldquo;Tu disciplina merece prendas que estén a tu altura.&rdquo;
            </p>
            <footer className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              — Danni, Fundadora de CALLEFITS
            </footer>
          </blockquote>

          {/* CTA hacia WhatsApp con Danni */}
          <a
            href={danniWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-fit items-center rounded-[var(--radius)] border border-black/10 px-7 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-brand-primary hover:text-brand-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            CONVERSAR CON DANNI POR WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
