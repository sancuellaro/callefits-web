/**
 * Footer — Institucional editorial con 4 columnas responsivas.
 * Server Component: sin estado ni interacción directa.
 */
import { BRAND_CONFIG } from "@/config/brand.config";

// ─── Datos estáticos del footer ──────────────────────────────────────────────

const CATALOG_LINKS: { label: string; href: string }[] = [
  { label: "Leggings", href: "/catalog?category=leggings" },
  { label: "Tops", href: "/catalog?category=tops" },
  { label: "Sets Combinados", href: "/catalog?category=sets-combinados" },
  { label: "Enterizos", href: "/catalog?category=enterizos" },
  { label: "Guía de Tallas", href: "/#guia-tallas" },
];

// ─── Sub-componentes ─────────────────────────────────────────────────────────

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const externalProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      className="block py-0.5 text-sm text-foreground/50 transition-colors hover:text-foreground"
      {...externalProps}
    >
      {children}
    </a>
  );
}

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

// ─── Columnas de contenido ────────────────────────────────────────────────────

function ColIdentidad() {
  return (
    <div className="flex flex-col">
      <FooterHeading>CALLEFITS BY DANNI</FooterHeading>
      <p className="text-sm leading-relaxed text-foreground/50">
        Prendas deportivas de alta gama diseñadas para brindar máxima compresión, confort
        anatómico y sofisticación en cada entrenamiento. Confección con amor y precisión desde
        Colombia.
      </p>
      <p className="mt-4 text-[11px] italic text-foreground/40">
        &ldquo;{BRAND_CONFIG.tagline}&rdquo;
      </p>
    </div>
  );
}

function ColExploracion() {
  return (
    <div className="flex flex-col">
      <FooterHeading>Explorar</FooterHeading>
      <nav aria-label="Navegación del catálogo en el pie de página">
        {CATALOG_LINKS.map((link) => (
          <FooterLink key={link.href} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </nav>
    </div>
  );
}

function ColAtencion() {
  const whatsappHref = `https://wa.me/${BRAND_CONFIG.contact.whatsapp.number.replace("+", "")}?text=${encodeURIComponent(BRAND_CONFIG.contact.whatsapp.defaultMessage)}`;

  return (
    <div className="flex flex-col">
      <FooterHeading>Atención al Cliente</FooterHeading>
      <div className="space-y-2 text-sm text-foreground/50">
        <p>
          Lunes a Sábado
          <br />
          <span className="font-medium text-foreground/70">9:00 am – 7:00 pm (COT)</span>
        </p>
        <p>
          Tiempo de despacho nacional
          <br />
          <span className="font-medium text-foreground/70">3 a 7 días hábiles</span>
        </p>
      </div>
      <div className="mt-4 space-y-1.5">
        <FooterLink href={whatsappHref} external>
          WhatsApp: {BRAND_CONFIG.contact.phone}
        </FooterLink>
        <FooterLink href={`mailto:${BRAND_CONFIG.contact.email}`} external>
          {BRAND_CONFIG.contact.email}
        </FooterLink>
      </div>
    </div>
  );
}

function ColComunidad() {
  return (
    <div className="flex flex-col">
      <FooterHeading>Comunidad</FooterHeading>
      <p className="mb-4 text-sm text-foreground/50">
        Somos una marca auténtica. Cada prenda pasa por las manos de Danni antes de llegar a
        las tuyas.
      </p>
      <div className="flex flex-col gap-3">
        <a
          href={BRAND_CONFIG.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram de CALLEFITS BY DANNI"
          className="flex items-center gap-2.5 text-sm text-foreground/50 transition-colors hover:text-foreground"
        >
          <InstagramIcon className="h-4 w-4 flex-shrink-0" />
          <span>@callefitsbydanni</span>
        </a>
        <a
          href={BRAND_CONFIG.socials.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok de CALLEFITS BY DANNI"
          className="flex items-center gap-2.5 text-sm text-foreground/50 transition-colors hover:text-foreground"
        >
          <TikTokIcon className="h-3.5 w-3.5 flex-shrink-0" />
          <span>@callefitsbydanni</span>
        </a>
      </div>
    </div>
  );
}

// ─── Footer principal ─────────────────────────────────────────────────────────

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/5 bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Grid 4 columnas responsivo */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <ColIdentidad />
          <ColExploracion />
          <ColAtencion />
          <ColComunidad />
        </div>

        {/* Separador */}
        <div className="mt-12 border-t border-black/5 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-[11px] text-foreground/40">
              &copy; {currentYear}{" "}
              <span className="font-medium">{BRAND_CONFIG.name}</span>. Todos los derechos
              reservados.
            </p>
            <p className="text-[11px] text-foreground/30">
              {BRAND_CONFIG.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
