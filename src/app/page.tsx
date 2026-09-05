/**
 * Home Page — CALLEFITS BY DANNI.
 * Server Component asíncrono: ensambla todas las secciones de la Home.
 * Espaciado vertical rítmico con space-y para coherencia editorial.
 */
import type { Metadata } from "next";
import { HeroSection } from "@/components/features/home/HeroSection";
import { FeaturedCategoriesSection } from "@/components/features/home/FeaturedCategoriesSection";
import { FeaturedProductsSection } from "@/components/features/home/FeaturedProductsSection";
import { BrandPillarsSection } from "@/components/features/home/BrandPillarsSection";
import { AboutDanniSection } from "@/components/features/home/AboutDanniSection";
import { TestimonialsSection } from "@/components/features/home/TestimonialsSection";
import { FAQSection } from "@/components/features/home/FAQSection";
import { BRAND_CONFIG } from "@/config/brand.config";

// ─── Metadatos ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
  description:
    "Descubre la colección de ropa deportiva de alto rendimiento de CALLEFITS BY DANNI: leggings, tops, sets y enterizos con confección premium, cero transparencias y envíos a toda Colombia.",
  openGraph: {
    title: BRAND_CONFIG.name,
    description: BRAND_CONFIG.tagline,
    type: "website",
  },
};

// ─── Página ───────────────────────────────────────────────────────────────────

export default async function HomePage() {
  return (
    <>
      {/* ① Hero — pantalla completa editorial */}
      <HeroSection />

      {/* ② Resto de secciones con espaciado rítmico vertical */}
      <div className="space-y-20 py-16 md:space-y-32 md:py-24">
        {/* ② Categorías destacadas */}
        <FeaturedCategoriesSection />

        {/* ③ Prendas más deseadas */}
        <FeaturedProductsSection />

        {/* ④ Pilares de la marca — fondo contrastado, ocupa el ancho completo */}
        <div className="-mx-0 w-full">
          <BrandPillarsSection />
        </div>

        {/* ⑤ Storytelling — Sobre Danni */}
        <AboutDanniSection />

        {/* ⑥ Prueba social */}
        <TestimonialsSection />

        {/* ⑦ FAQ */}
        <FAQSection />
      </div>
    </>
  );
}
