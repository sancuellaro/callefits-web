"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";

/**
 * WhatsAppFloatingButton — Cápsula flotante de lujo.
 *
 * Comportamiento responsivo:
 * - sm+  → Cápsula completa: ícono + texto "¿Dudas con tu talla? Escríbenos"
 * - < sm → Círculo compacto 48×48 px con ícono centrado
 *
 * Animación: entry suave con respeto de prefers-reduced-motion.
 */

function buildWhatsAppHref(): string {
  const number = BRAND_CONFIG.contact.whatsapp.number.replace("+", "");
  const message = encodeURIComponent(BRAND_CONFIG.contact.whatsapp.defaultMessage);
  return `https://wa.me/${number}?text=${message}`;
}

export function WhatsAppFloatingButton() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <motion.a
      href={buildWhatsAppHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={[
        // Posicionamiento fijo
        "fixed bottom-6 right-6 z-50",
        // Diseño base compartido: fondo ónix profundo
        "flex items-center justify-center",
        "bg-neutral-900 text-white",
        // Sombra refinada
        "shadow-[0_8px_32px_rgba(0,0,0,0.22)]",
        // Transición hover
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.30)]",
        // Focus accesible
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        // Móvil pequeño (< sm): círculo 48×48
        "h-12 w-12 rounded-full",
        // sm+: cápsula ergonómica
        "sm:h-auto sm:w-auto sm:rounded-full sm:px-5 sm:py-3",
      ].join(" ")}
      {...motionProps}
    >
      {/* Ícono siempre visible */}
      <MessageCircle
        className="h-5 w-5 flex-shrink-0"
        strokeWidth={1.75}
        aria-hidden="true"
      />

      {/* Texto visible solo en sm+ */}
      <span className="hidden pl-2.5 text-xs font-medium tracking-wide sm:inline">
        ¿Dudas con tu talla?{" "}
        <span className="font-semibold">Escríbenos</span>
      </span>
    </motion.a>
  );
}
