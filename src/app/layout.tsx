import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/common/WhatsAppFloatingButton";
import { BRAND_CONFIG } from "@/config/brand.config";
import "./globals.css";

// ─── Tipografías ──────────────────────────────────────────────────────────────

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── Metadatos maestros con SEO comercial ─────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : (process.env.NEXT_PUBLIC_SITE_URL ?? "https://callefits.com"),
  ),
  title: {
    default:
      "CALLEFITS BY DANNI | Ropa Deportiva Femenina de Alta Gama Colombia",
    template: `%s | CALLEFITS BY DANNI`,
  },
  description:
    "Marca colombiana de ropa deportiva femenina de alta calidad, compresión anatómica y cero transparencias al mejor precio. Leggings tiro alto, tops deportivos, sets y enterizos. Compra directa con atención personalizada por WhatsApp.",
  keywords: [
    "ropa deportiva mujer colombia",
    "leggings tiro alto compresión",
    "tops deportivos soporte",
    "sets deportivos elegantes",
    "ropa deportiva calidad precio",
    "callefits by danni",
    "leggings sin transparencias",
    "ropa fitness colombia",
  ],
  authors: [{ name: "Danni — CALLEFITS" }],
  creator: BRAND_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: BRAND_CONFIG.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CALLEFITS BY DANNI — Colección de Ropa Deportiva Femenina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@callefitsbydanni",
    site: "@callefitsbydanni",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// ─── Layout maestro ───────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        {/* Enlace accesible "Saltar al contenido" — WCAG 2.2 Criterion 2.4.1 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-[var(--radius)] focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:uppercase focus:tracking-widest focus:text-brand-primary-foreground"
        >
          Saltar al contenido principal
        </a>

        {/* ① Franja de anuncios superior */}
        <AnnouncementBar />

        {/* ② Header editorial sticky */}
        <Navbar />

        {/* ③ Contenido principal — id="main-content" para el enlace de skip */}
        <main
          id="main-content"
          className="flex-1"
          style={{ minHeight: "calc(100vh - 200px)" }}
        >
          {children}
        </main>

        {/* ④ Footer institucional */}
        <Footer />

        {/* ⑤ Cápsula flotante de WhatsApp — persistente en todo el sitio */}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
