/**
 * BrandPillarsSection — Los 4 pilares diferenciadores de CALLEFITS BY DANNI.
 * Server Component: sin estado ni interacción.
 * Fondo bg-surface-muted con borde superior e inferior fino.
 */
import { Activity, Shield, Layers, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Datos de los pilares ─────────────────────────────────────────────────────

const PILLARS: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: Activity,
    title: "COMPRESIÓN ANATÓMICA",
    body: "Soporte muscular graduado que moldea la silueta sin restringir la respiración ni la amplitud de movimiento durante entrenamientos de alta intensidad.",
  },
  {
    icon: Shield,
    title: "CERO TRANSPARENCIAS",
    body: "Tejidos de alta densidad y doble capa testeados a prueba de sentadillas profundas (Squat-Proof garantizado) en todos los leggings y enterizos de la colección.",
  },
  {
    icon: Layers,
    title: "TACTO SEGUNDA PIEL",
    body: "Fibras inteligentes de poliamida premium y elastano con suavidad térmica natural, secado ultra rápido y recuperación de forma entrenamiento tras entrenamiento.",
  },
  {
    icon: MessageCircle,
    title: "ASESORÍA PERSONALIZADA",
    body: "Acompañamiento humano y directo por WhatsApp con Danni para resolver cualquier duda de talla, color o ajuste antes de confirmar tu pedido. Sin bots, sin formularios.",
  },
];

// ─── Componente ────────────────────────────────────────────────────────────────

export function BrandPillarsSection() {
  return (
    <section
      aria-labelledby="pillars-heading"
      className="w-full border-y border-black/5 bg-surface-muted"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {/* Encabezado centrado */}
        <div className="mb-12 text-center">
          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
            POR QUÉ ELEGIRNOS
          </p>
          <h2
            id="pillars-heading"
            className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
          >
            LO QUE NOS HACE DIFERENTES
          </h2>
        </div>

        {/* Cuadrícula de pilares */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start gap-4">
              {/* Icono */}
              <div
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[var(--radius)] border border-black/8 bg-surface"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5 text-neutral-700" strokeWidth={1.5} />
              </div>

              {/* Texto */}
              <div>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-800">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-500">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
