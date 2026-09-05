# PROJECT_STATE.md — Estado Actual del Proyecto

## Información General
- **Marca:** **CALLEFITS BY DANNI**
- **Versión:** 0.1.0-alpha.4
- **Fase Actual:** FASE 4 COMPLETADA → Lista para iniciar FASE 5 (Home Page de Alto Impacto)
- **Última Validación:** Catálogo filtrable, ficha de producto + botón WhatsApp — 70 tests, typecheck, lint y build de producción verificados (2026-09-04)

---

## Estado de Requerimientos

### Confirmados y Resueltos
- [x] Nombre de marca oficial: **CALLEFITS BY DANNI**.
- [x] Catálogo inicial: Ropa deportiva femenina de alta calidad (11 a 50 productos).
- [x] Flujo de conversión principal: Catálogo → Ficha con selector de talla/color → Pedido vía WhatsApp.
- [x] Stack baseline aprobado (Next.js 15 App Router, Tailwind CSS tokens, shadcn/ui, Supabase, Vitest, Vercel).
- [x] Presencia auténtica de la representante (Danni) como sello de confianza.
- [x] Documentación maestra aprobada en `/docs`:
  - `docs/technical-manual.md` (Manual Integral)
  - `docs/requirements.md` (Especificación formal MoSCoW)
  - `docs/decisions/ADR-001.md` (Stack y Arquitectura)

### Completados (Fase 1)
- [x] Inicialización técnica de Next.js 15.5.25 (App Router, `src/app`) y TypeScript en modo estricto.
- [x] Configuración de variables semánticas CSS ("Beiked-Nike") y Tailwind tokens en `globals.css` + `tailwind.config.ts`.
- [x] Configuración del archivo maestro `src/config/brand.config.ts` tipado y validado con Zod.
- [x] Componentes primitivos base (`Button`, `Badge`, `Card`, `Skeleton`, `Input`) en `src/components/ui/`.
- [x] Configuración de Vitest (jsdom) + prueba unitaria de `brand.config.ts`.
- [x] Quality Gates verdes: `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build`.

### Completados (Fase 2)
- [x] `AnnouncementBar.tsx` — Franja superior editorial (Server Component, tokens ónix, texto truncado en móvil).
- [x] `Navbar.tsx` — Header sticky con backdrop-blur, logo editorial, nav desktop con hover animado, drawer móvil con Framer Motion y cierre por Escape/overlay.
- [x] `Footer.tsx` — 4 columnas responsivas: Identidad, Exploración, Atención y Comunidad (Server Component).
- [x] `WhatsAppFloatingButton.tsx` — Cápsula pill de lujo en ónix; círculo compacto en móvil (Client Component, Framer Motion, prefers-reduced-motion).
- [x] `layout.tsx` actualizado: ensamblaje global AnnouncementBar → Navbar → main → Footer → WhatsAppFloatingButton.
- [x] `tailwind.config.ts` actualizado con `<alpha-value>` para soportar modificadores de opacidad (`bg-background/85`, etc.).
- [x] Quality Gates verdes: `npm run typecheck` (0 errores), `npm run lint` (0 advertencias), `npm run test` (5/5).

### Completados (Fase 3)
- [x] `src/types/product.ts` — Schemas Zod estrictos: `CategoryEnum`, `SizeEnum`, `CompressionEnum`, `ProductStatusEnum`, `ProductImageSchema`, `ProductVariantSchema`, `ProductAttributeSchema`, `ProductSchema`, `ProductFiltersSchema` + todos los tipos inferidos.
- [x] `src/lib/formatters.ts` — `formatPrice` (COP con separador de miles), `calculateDiscountPercentage` (entero, 0 si sin descuento), `buildProductWhatsAppUrl` (URL wa.me con mensaje estructurado y encodeURIComponent).
- [x] `src/data/mock-products.ts` — 16 prendas editoriales (4 × categoría) validadas con `z.array(ProductSchema).parse()`, nombres aspiracionales, descripciones técnicas de tejido, variantes de color sofisticadas y fotos Unsplash.
- [x] `src/lib/services/product-service.ts` — Capa de servicios asíncronos desacoplada: `getProducts`, `getProductBySlug`, `getFeaturedProducts`, `getRelatedProducts`, `getCategoriesWithCounts`. Lista para swap a Supabase en Fase 6.
- [x] `tests/unit/formatters.test.ts` — 19 pruebas: formateo COP, descuento, URL WhatsApp completa con verificación de decodificación.
- [x] `tests/unit/product-service.test.ts` — 26 pruebas: filtros, ordenamientos, búsqueda textual, slug lookup, featured, related y categorías.
- [x] Quality Gates verdes: `typecheck` (0 errores), `lint` (0 advertencias), `test` (50/50).

### Completados (Fase 4)
- [x] `next.config.ts` — `remotePatterns` para `images.unsplash.com` + `next/image` operativo.
- [x] `src/lib/variant-utils.ts` — Lógica pura y testeable: `getUniqueColors`, `getAllUniqueSizes`, `getVariantByColorAndSize`, `isSizeAvailableForColor`, `getFirstAvailableSizeForColor`.
- [x] `ProductCard.tsx` — Tarjeta editorial, `aspect-[3/4]`, zoom hover, badge descuento/destacado, swatches de color, precios formateados. Server Component.
- [x] `CatalogFilters.tsx` — Pills de categoría + select de ordenamiento con `useRouter`, sin `useSearchParams`. Client Component.
- [x] `CatalogEmptyState.tsx` — Estado vacío sobrio con botón de reset. Server Component.
- [x] `catalog/loading.tsx` — Skeleton de filtros + 8 tarjetas `aspect-[3/4]` pulsantes.
- [x] `catalog/page.tsx` — Server Component que resuelve `await searchParams`, valida filtros y renderiza grilla 2/3/4 cols.
- [x] `ProductGallery.tsx` — Galería interactiva con miniaturas: vertical desktop / horizontal móvil. Client Component.
- [x] `ProductAccordion.tsx` — 3 secciones colapsables (Specs, Cuidados, Envíos). Client Component.
- [x] `ProductPurchasePanel.tsx` — Selector color+talla, variante agotada deshabilitada, botón WhatsApp con `buildProductWhatsAppUrl`. Client Component.
- [x] `catalog/[slug]/page.tsx` — Server Component con `await params`, breadcrumbs, layout 7/5 cols desktop, productos relacionados. Metadatos dinámicos.
- [x] `catalog/[slug]/not-found.tsx` — Vista 404 de producto con botones de regreso.
- [x] `tests/unit/catalog-ui.test.ts` — 20 pruebas de `variant-utils` (colores, tallas, disponibilidad, primer disponible).
- [x] Quality Gates verdes: `typecheck` (0), `lint` (0), `test` (70/70), `build` (✓ sin errores).

### En Progreso (Fase 5 Inmediata)
- [ ] Home Page de alto impacto: Hero, Categorías, Diferenciadores, Storytelling Danni, Testimonios, FAQ.

### Pendientes de Negocio (Para fases posteriores)
- [ ] Dominio web definitivo registrado por el cliente.
- [ ] Credenciales finales de Supabase y Vercel bajo cuenta del cliente.
- [ ] Archivos finales de fotografías HD de las prendas y logo en vector.
- [ ] Textos definitivos de políticas de cambio y garantías.

---

## Roadmap de Implementación

- [x] **Fase 0:** Gobernanza, Reglas Agénticas y Documentación Base
- [x] **Fase 1:** Scaffolding Técnico, Tooling, Tokens CSS y Testing Base
- [x] **Fase 2:** Layout Global, Navbar Responsive y Botón Flotante de WhatsApp
- [x] **Fase 3:** Arquitectura de Datos, Tipos TypeScript y Mock Catálogo (RF-01, RF-02, RF-03)
- [x] **Fase 4:** Catálogo Interactivo y Ficha de Producto con Pedido a WhatsApp
- [ ] **Fase 5:** Home Page de Alto Impacto, Storytelling "Danni", Confianza y FAQ (RF-04, RF-05, RF-06)
- [ ] **Fase 6:** Conexión con Supabase (PostgreSQL, Migraciones SQL, Storage y RLS)
- [ ] **Fase 7:** Panel Administrativo Base (CMS para precios, fotos y catálogo)
- [ ] **Fase 8:** SEO Técnico Dinámico, Accesibilidad WCAG y Suite de Testing E2E
- [ ] **Fase 9:** Pipeline CI/CD con GitHub Actions y Despliegue en Vercel