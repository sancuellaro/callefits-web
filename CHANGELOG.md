# CHANGELOG.md — Registro Histórico de Cambios

Todas las modificaciones relevantes del proyecto se registran en este documento siguiendo el formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/) y [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Added
- Nada pendiente por el momento.

---

## [0.1.0-alpha.4] - 2026-09-04

### Added
- `src/lib/variant-utils.ts` — Utilidades puras para selección de variantes: `getUniqueColors`, `getAllUniqueSizes` (orden XS→XL), `getVariantByColorAndSize`, `isSizeAvailableForColor` (stock > 0 AND isAvailable), `getFirstAvailableSizeForColor`.
- `src/components/features/products/ProductCard.tsx` — Tarjeta editorial: `aspect-[3/4]`, zoom `scale-105` hover, badge OFERTA/DESTACADO, swatches colorHex, precios con `formatPrice` y precio tachado si `compareAtPrice`. Server Component.
- `src/components/features/products/CatalogFilters.tsx` — Pills de 5 categorías + select de ordenamiento. Navegación con `useRouter` sin `useSearchParams` (evita Suspense). Client Component.
- `src/components/features/products/CatalogEmptyState.tsx` — Estado vacío con icono de búsqueda y enlace de reset. Server Component.
- `src/app/catalog/loading.tsx` — Skeleton loader: barra de filtros + grid 2/3/4 cols con 8 tarjetas `aspect-[3/4]` pulsantes.
- `src/app/catalog/page.tsx` — Server Component: `await searchParams` (Next.js 15), validación safe de `category` y `sort`, header editorial y grilla 2/3/4 cols.
- `src/components/features/products/ProductGallery.tsx` — Galería cliente: miniaturas en columna vertical (desktop) u horizontal (móvil), borde activo de 2px, `priority` en primera imagen. Client Component.
- `src/components/features/products/ProductAccordion.tsx` — Acordeón multi-sección (Specs Técnicas / Cuidados / Envíos), estado open independiente por sección, transición `max-h` CSS. Client Component.
- `src/components/features/products/ProductPurchasePanel.tsx` — Selector color (muestrario circular con `ring`), selector talla (deshabilitado con línea diagonal si agotado), botón WhatsApp ónix ancho completo o estado "AGOTADO". Client Component.
- `src/app/catalog/[slug]/page.tsx` — Server Component: `await params` (Next.js 15), `notFound()` si slug inválido, breadcrumbs accesibles, layout `grid-cols-12` (7+5), `generateMetadata` dinámico, sección de relacionados.
- `src/app/catalog/[slug]/not-found.tsx` — Vista 404 de producto con botones Catálogo e Inicio.
- `tests/unit/catalog-ui.test.ts` — 20 pruebas de `variant-utils`.

### Changed
- `next.config.ts` — Añadido `images.remotePatterns` para `images.unsplash.com` (https).

---

## [0.1.0-alpha.3] - 2026-09-04

### Added
- `src/types/product.ts` — Schemas Zod estrictos y tipos inferidos: `CategoryEnum` (`leggings`/`tops`/`sets`/`enterizos`), `SizeEnum` (XS→XL), `CompressionEnum`, `ProductStatusEnum`, `ProductImageSchema` (min 2), `ProductVariantSchema` (min 3, con regex hex para `colorHex`), `ProductAttributeSchema`, `ProductSchema` (slug kebab-case regex, name 3-120 chars), `ProductFiltersSchema`. Exporta `CATEGORY_LABELS`.
- `src/lib/formatters.ts` — `formatPrice(amount)`: pesos colombianos con `Intl.NumberFormat('es-CO')` (ej. `$ 135.000 COP`). `calculateDiscountPercentage(basePrice, compareAtPrice)`: porcentaje entero con `Math.round`, retorna `0` si sin descuento. `buildProductWhatsAppUrl(params)`: URL `wa.me` con mensaje estructurado en negritas WhatsApp (`*text*`), emojis y saltos de línea, codificado con `encodeURIComponent`.
- `src/data/mock-products.ts` — Catálogo de 16 prendas editoriales (4 por categoría) con nombres aspiracionales estilo marca premium, descripciones técnicas de tejido, colores sofisticados (Negro Ónix, Café Moca, Verde Oliva Táctico, Azul Medianoche, Terracota, Rosa Empolvado, Gris Mineral), fotos reales de Unsplash y SKUs únicos. Validado globalmente con `z.array(ProductSchema).parse()`.
- `src/lib/services/product-service.ts` — Capa de acceso a datos desacoplada preparada para swap a Supabase: `getProducts(filters?)`, `getProductBySlug(slug)`, `getFeaturedProducts(limit?)`, `getRelatedProducts(currentSlug, category, limit?)`, `getCategoriesWithCounts()`.
- `tests/unit/formatters.test.ts` — 19 pruebas unitarias cubriendo formateo COP, cálculo de descuentos y construcción de URLs WhatsApp con verificación de decodificación del mensaje.
- `tests/unit/product-service.test.ts` — 26 pruebas: filtros por categoría (4 exactas), ordenamiento precio asc/desc (verificación de array), búsqueda textual, `getProductBySlug` (encontrado y null), featured, related y conteo de categorías.

---

## [0.1.0-alpha.2] - 2026-09-04

### Added
- `src/components/layout/AnnouncementBar.tsx` — Franja editorial superior con fondo ónix (`bg-brand-primary`), tipografía uppercase `tracking-[0.2em]`, texto truncado en móvil y fluido en desktop. Server Component.
- `src/components/layout/Navbar.tsx` — Header sticky editorial (`backdrop-blur-md bg-background/85`, `border-b border-black/5`) con logo compositivo "CALLEFITS / BY DANNI", navegación desktop con micro-línea hover animada vía CSS, iconos de Instagram y TikTok (SVG inline) desde `brand.config.ts`, y drawer móvil animado con Framer Motion (overlay + panel deslizante, cierre por Escape/clic fuera, `aria-modal`). Client Component.
- `src/components/layout/Footer.tsx` — Footer institucional 4 columnas (1→2→4 col responsivo sobre `bg-surface-muted`): Identidad, Exploración del catálogo, Atención al Cliente y Comunidad & Redes. Barra de copyright dinámica. Server Component.
- `src/components/common/WhatsAppFloatingButton.tsx` — Cápsula pill de lujo (`bg-neutral-900`) con ícono `MessageCircle` + texto "¿Dudas con tu talla? Escríbenos" en desktop; círculo compacto 48×48 en móvil. Animación de entrada con Framer Motion, respeto de `prefers-reduced-motion`. Client Component.
- `src/app/layout.tsx` ensamblado: `AnnouncementBar → Navbar → <main> → Footer → WhatsAppFloatingButton`.

### Changed
- `tailwind.config.ts` — Actualizado todos los colores semánticos a formato `hsl(var(--token) / <alpha-value>)` para habilitar modificadores de opacidad de Tailwind 3 (`bg-background/85`, `border-black/5`, etc.).

---

## [0.1.0-alpha.1] - 2026-09-04

### Added
- Inicialización del proyecto **Next.js 15.5.25** (App Router, `src/app`, React 19) con TypeScript en modo estricto y alias `@/*` → `./src/*`.
- Configuración de **Tailwind CSS 3** vía `tailwind.config.ts`, enlazado a variables semánticas CSS.
- Sistema de tokens de diseño "Beiked-Nike" en `src/app/globals.css`: fondo hueso (`--background`), ónix (`--foreground`), superficies (`--surface`, `--surface-muted`), marca (`--brand-primary`, `--brand-secondary`, `--brand-accent`), bordes y radio (`--border`, `--ring`, `--radius`).
- Componentes primitivos base en `src/components/ui/`: `Button` (variantes `default`, `outline`, `secondary`, `ghost`, `link`), `Badge`, `Card`, `Skeleton`, `Input`.
- Utilidad `cn()` en `src/lib/utils.ts` (basada en `clsx` + `tailwind-merge`) para composición segura de clases.
- Archivo centralizado `src/config/brand.config.ts`, tipado y validado con **Zod**, con nombre de marca, slogan, WhatsApp, redes sociales y categorías iniciales del catálogo.
- Configuración de **Vitest** (`vitest.config.ts`) con entorno `jsdom` y `tests/setup.ts` para matchers de `@testing-library/jest-dom`.
- Prueba unitaria `tests/unit/brand-config.test.ts` verificando la exportación y validación Zod de `BRAND_CONFIG`.
- Scripts `npm run test` y `npm run typecheck` en `package.json`.
- `.env.example` y `.prettierrc.json` (con `prettier-plugin-tailwindcss`).

### Changed
- Dependencias fijadas a **Next.js 15.5.25** y **Tailwind CSS 3.4.x** (en lugar de las versiones "latest" resueltas automáticamente por `create-next-app`, que apuntaban a Next 16 y Tailwind 4) para cumplir el baseline aprobado en `ADR-001`.
- `eslint.config.mjs` reescrito con `FlatCompat` (`@eslint/eslintrc`) para ser compatible con `eslint-config-next@15`.

### Security
- `vitest` fijado en `^3.2.7` para resolver una vulnerabilidad crítica reportada en la cadena de dependencias de `vitest@2.x`/`vite`/`esbuild`.

---

## [0.1.0-alpha] - 2026-09-04

### Added
- Creación de la identidad del repositorio para **CALLEFITS BY DANNI**.
- `AGENTS.md`: Reglas permanentes y restricciones inmutables para desarrollo agéntico.
- `PROJECT_STATE.md`: Sistema de tracking del estado del proyecto y checklist de fases.
- `docs/technical-manual.md`: Manual técnico integral y fuente de verdad del producto.
- `docs/requirements.md`: Especificación formal de requerimientos con criterios de aceptación MoSCoW.
- `docs/decisions/ADR-001.md`: Aprobación formal del stack baseline (Next.js 15, Tailwind tokens, Supabase, Vitest).
- Definición de la estrategia de desacoplamiento de diseño mediante tokens semánticos en variables CSS.
- Definición de la estrategia comercial: Catálogo dinámico con cierre de ventas contextualizado en WhatsApp.

### Security
- Reglas de aislamiento de secretos: Prohibición de versionar `.env*` y restricción de claves privadas al entorno del servidor.