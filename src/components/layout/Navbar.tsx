"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";

// ─── Constantes ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalog" },
  { label: "Colecciones", href: "/catalog?featured=true" },
  { label: "Sobre Danni", href: "/#sobre-danni" },
  { label: "Preguntas", href: "/#faq" },
] as const;

// ─── Iconos de redes sociales (SVG inline — TikTok y Instagram son marcas) ────

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

// ─── Sub-componente: Logo editorial ─────────────────────────────────────────

function NavLogo() {
  return (
    <Link
      href="/"
      className="group flex flex-col items-start leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="CALLEFITS BY DANNI — Ir al inicio"
    >
      <span className="text-base font-bold tracking-tight text-foreground transition-opacity group-hover:opacity-70 sm:text-lg">
        CALLEFITS
      </span>
      <span className="text-[9px] font-light tracking-[0.25em] text-foreground/60 uppercase transition-opacity group-hover:opacity-70">
        BY DANNI
      </span>
    </Link>
  );
}

// ─── Sub-componente: Iconos sociales ────────────────────────────────────────

function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href={BRAND_CONFIG.socials.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram de CALLEFITS BY DANNI"
        className="text-foreground/50 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <InstagramIcon className="h-4 w-4" />
      </a>
      <a
        href={BRAND_CONFIG.socials.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok de CALLEFITS BY DANNI"
        className="text-foreground/50 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <TikTokIcon className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

// ─── Menú móvil (overlay pantalla completa editorial) ───────────────────────

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  reducedMotion: boolean | null;
}

function MobileMenu({ isOpen, onClose, reducedMotion }: MobileMenuProps) {
  const whatsappHref = `https://wa.me/${BRAND_CONFIG.contact.whatsapp.number.replace("+", "")}?text=${encodeURIComponent(BRAND_CONFIG.contact.whatsapp.defaultMessage)}`;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const panelVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  const reducedVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const transition = reducedMotion
    ? { duration: 0.15 }
    : { type: "spring", stiffness: 320, damping: 32 };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro */}
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={reducedMotion ? reducedVariants : overlayVariants}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel deslizante desde la derecha */}
          <motion.nav
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-surface shadow-2xl sm:max-w-sm"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={reducedMotion ? reducedVariants : panelVariants}
            transition={transition}
          >
            {/* Cabecera del panel */}
            <div className="flex items-center justify-between border-b border-black/5 px-6 py-5">
              <NavLogo />
              <button
                onClick={onClose}
                aria-label="Cerrar menú de navegación"
                className="rounded p-1.5 text-foreground/50 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Links de navegación editorial */}
            <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between py-3 text-xl font-light tracking-tight text-foreground transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span>{link.label}</span>
                  <span className="text-foreground/20 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>

            {/* Pie del panel: sociales y WhatsApp */}
            <div className="border-t border-black/5 px-6 py-6">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-5 flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-brand-primary py-3 text-xs font-semibold uppercase tracking-widest text-brand-primary-foreground transition-opacity hover:opacity-80"
              >
                Pedir por WhatsApp
              </a>
              <div className="flex items-center justify-center gap-6">
                <SocialIcons />
                <span className="text-[10px] uppercase tracking-widest text-foreground/30">
                  @callefitsbydanni
                </span>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Componente principal: Navbar ────────────────────────────────────────────

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Cerrar con la tecla Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Evitar scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-black/5 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <NavLogo />

          {/* Navegación desktop */}
          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-7 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs font-medium uppercase tracking-widest text-foreground/50 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-[width] after:duration-300 hover:text-foreground hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones de marca: redes + hamburguesa */}
          <div className="flex items-center gap-5">
            <SocialIcons className="hidden sm:flex" />

            {/* Botón hamburguesa — solo móvil */}
            <button
              ref={closeButtonRef}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Abrir menú de navegación"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="rounded p-1.5 text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil fuera del header para no quedar bajo el sticky */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        reducedMotion={shouldReduceMotion}
      />
    </>
  );
}
