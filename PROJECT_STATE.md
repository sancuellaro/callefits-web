# PROJECT_STATE.md — Estado Actual del Proyecto

## Información General
- **Marca:** **CALLEFITS BY DANNI**
- **Versión:** 0.1.0-alpha.2
- **Fase Actual:** FASE 2 COMPLETADA → Lista para iniciar FASE 3 (Tipos TypeScript, Arquitectura de Datos y Mock Catálogo)
- **Última Validación:** Layout maestro, Navbar drawer, Footer y cápsula WhatsApp verificados con Quality Gates en verde (2026-09-04)

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

### En Progreso (Fase 3 Inmediata)
- [ ] Tipos TypeScript centralizados para productos, categorías y variantes.
- [ ] Datos mock del catálogo para desarrollo sin Supabase.
- [ ] Arquitectura de la capa de datos (repositorio pattern).

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
- [ ] **Fase 3:** Arquitectura de Datos, Tipos TypeScript y Mock Catálogo (RF-01, RF-02, RF-03)
- [ ] **Fase 4:** Catálogo Interactivo y Ficha de Producto con Pedido a WhatsApp
- [ ] **Fase 5:** Home Page de Alto Impacto, Storytelling "Danni", Confianza y FAQ (RF-04, RF-05, RF-06)
- [ ] **Fase 6:** Conexión con Supabase (PostgreSQL, Migraciones SQL, Storage y RLS)
- [ ] **Fase 7:** Panel Administrativo Base (CMS para precios, fotos y catálogo)
- [ ] **Fase 8:** SEO Técnico Dinámico, Accesibilidad WCAG y Suite de Testing E2E
- [ ] **Fase 9:** Pipeline CI/CD con GitHub Actions y Despliegue en Vercel