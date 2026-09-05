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
import { JsonLd } from "@/components/seo/JsonLd";
import { BRAND_CONFIG } from "@/config/brand.config";

// ─── Metadatos SEO de la Home ─────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Ropa Deportiva Femenina de Alta Gama | Leggings, Tops y Sets Colombia",
  description:
    "Descubre la colección CALLEFITS BY DANNI: leggings tiro alto, tops con soporte, sets coordinados y enterizos de alta compresión. Cero transparencias, confección premium y envíos a toda Colombia. Compra por WhatsApp.",
  openGraph: {
    title: "CALLEFITS BY DANNI — Ropa Deportiva Femenina Colombia",
    description:
      "Leggings tiro alto, tops deportivos, sets elegantes y enterizos de alta compresión. Confección premium, cero transparencias. Envíos nacionales.",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

// ─── Schema.org Organization (ClothingStore) ──────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: BRAND_CONFIG.name,
  url: "https://callefits.com",
  logo: "https://callefits.com/logo.png",
  telephone: BRAND_CONFIG.contact.whatsapp.number,
  email: BRAND_CONFIG.contact.email,
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
  },
  sameAs: [BRAND_CONFIG.socials.instagram, BRAND_CONFIG.socials.tiktok],
  priceRange: "$$",
  description: BRAND_CONFIG.tagline,
};

// ─── Página ───────────────────────────────────────────────────────────────────

export default async function HomePage() {
  return (
    <>
      {/* Datos estructurados de la tienda — Schema.org ClothingStore */}
      <JsonLd schema={organizationSchema} />

      {/* ① Hero — pantalla completa editorial */}
      <HeroSection />

      {/* ② Resto de secciones con espaciado rítmico vertical */}
      <div className="space-y-20 py-16 md:space-y-32 md:py-24">
        {/* Categorías destacadas */}
        <FeaturedCategoriesSection />

        {/* Prendas más deseadas */}
        <FeaturedProductsSection />

        {/* Pilares de la marca */}
        <div className="-mx-0 w-full">
          <BrandPillarsSection />
        </div>

        {/* Storytelling — Sobre Danni */}
        <AboutDanniSection />

        {/* Prueba social */}
        <TestimonialsSection />

        {/* FAQ */}
        <FAQSection />
      </div>
    </>
  );
}
