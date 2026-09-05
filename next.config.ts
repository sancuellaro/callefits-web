import type { NextConfig } from "next";

// ─── Encabezados de seguridad HTTP ────────────────────────────────────────────
// Aplicados a todas las rutas públicas de la tienda.
// Protegen contra XSS, clickjacking, sniffing MIME y fugas de referrer.

const SECURITY_HEADERS = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ── Compresión gzip/brotli en producción ─────────────────────────────────
  compress: true,

  // ── Imágenes: formatos modernos + dominios remotos autorizados ────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        // Fotografías del catálogo desde Unsplash (desarrollo/demo)
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Supabase Storage CDN (producción — bucket products-media)
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // ── Encabezados de seguridad HTTP ─────────────────────────────────────────
  async headers() {
    return [
      {
        // Aplica a todas las rutas del sitio público
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
