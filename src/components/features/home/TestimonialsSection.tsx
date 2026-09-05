/**
 * TestimonialsSection — Prueba social con reseñas de la comunidad.
 * Server Component: contenido estático placeholder.
 *
 * NOTA: Los testimonios siguientes son contenido ilustrativo de demostración
 * definido explícitamente en la especificación de la Fase 5. Serán reemplazados
 * por reseñas reales verificadas en Fase 6 (conexión con Supabase + tabla testimonials).
 * Cumple el requerimiento BR-006: estado vacío cuando no hay testimonios publicados.
 */

// ─── Datos placeholder ────────────────────────────────────────────────────────

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  city: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Compré el Legging Seamless Sculpt Pro y no lo puedo creer — ¡ni una sola transparencia en 60 minutos de crossfit! El tiro alto se mantiene sin esfuerzo y el ajuste es exactamente lo que describe la prenda. Definitivamente no es el último pedido.",
    author: "Valentina R.",
    city: "Medellín",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Llevaba meses buscando un set de legging + top que no se vea genérico. El Set Terracota Energy Duo superó todas mis expectativas. Danni me asesoró personalmente en WhatsApp, me ayudó con la talla y el despacho llegó en 3 días. ¡Atención impecable!",
    author: "Camila M.",
    city: "Bogotá",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Primero me dio un poco de miedo comprar por WhatsApp sin tienda física, pero Danni me explicó todo el proceso paso a paso. La calidad del tejido es real — se nota que es artesanal y de alta calidad. Ya pedí el Enterizo Escultor y estoy enamorada.",
    author: "Sofía G.",
    city: "Cali",
    rating: 5,
  },
];

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div
      aria-label={`${count} de 5 estrellas`}
      className="flex items-center gap-0.5"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i < count ? "text-brand-accent" : "text-neutral-200"}
          style={{ fontSize: "14px" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="flex flex-col gap-4 rounded-[var(--radius)] border border-black/5 bg-surface p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      {/* Rating + badge */}
      <div className="flex items-center justify-between">
        <StarRating count={testimonial.rating} />
        <span className="rounded-[var(--radius)] border border-black/8 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-neutral-400">
          Compra Verificada
        </span>
      </div>

      {/* Reseña */}
      <blockquote className="flex-1">
        <p className="text-sm leading-7 text-neutral-600">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      {/* Autor */}
      <footer className="border-t border-black/5 pt-4">
        <p className="text-xs font-semibold text-neutral-800">{testimonial.author}</p>
        <p className="text-[11px] text-neutral-400">{testimonial.city}</p>
      </footer>
    </article>
  );
}

// ─── Sección principal ────────────────────────────────────────────────────────

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      {/* Encabezado */}
      <div className="mb-10 text-center">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          OPINIONES REALES
        </p>
        <h2
          id="testimonials-heading"
          className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
        >
          LA VOZ DE NUESTRA COMUNIDAD
        </h2>
      </div>

      {/* Cuadrícula de testimonios */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    </section>
  );
}
