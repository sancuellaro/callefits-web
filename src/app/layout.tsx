import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/common/WhatsAppFloatingButton";
import { BRAND_CONFIG } from "@/config/brand.config";
import "./globals.css";

// ─── Tipografías ────────────────────────────────────────────────────────────

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── Metadatos globales ──────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: BRAND_CONFIG.name,
    template: `%s | ${BRAND_CONFIG.name}`,
  },
  description: BRAND_CONFIG.tagline,
  openGraph: {
    siteName: BRAND_CONFIG.name,
    locale: "es_CO",
    type: "website",
  },
};

// ─── Layout maestro ──────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        {/* ① Franja de anuncios superior */}
        <AnnouncementBar />

        {/* ② Header editorial sticky */}
        <Navbar />

        {/* ③ Contenido principal de cada página */}
        <main className="flex-1" style={{ minHeight: "calc(100vh - 200px)" }}>
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
