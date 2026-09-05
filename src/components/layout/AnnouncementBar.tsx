/**
 * AnnouncementBar — Franja editorial superior.
 * Server Component: sin estado ni interacción.
 */
export function AnnouncementBar() {
  return (
    <div
      role="banner"
      aria-label="Anuncios de la tienda"
      className="bg-brand-primary text-brand-primary-foreground w-full overflow-hidden"
    >
      <p className="mx-auto max-w-7xl truncate py-2 px-4 text-center text-[10px] font-medium uppercase tracking-[0.2em] md:text-xs md:tracking-[0.2em] lg:overflow-visible lg:whitespace-normal">
        ENVÍOS A TODO EL PAÍS&nbsp;&nbsp;•&nbsp;&nbsp;CONFECCIÓN PREMIUM &amp; ALTO
        RENDIMIENTO&nbsp;&nbsp;•&nbsp;&nbsp;ATENCIÓN PERSONALIZADA POR WHATSAPP
      </p>
    </div>
  );
}
