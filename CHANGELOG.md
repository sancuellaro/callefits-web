# CHANGELOG.md — Registro Histórico de Cambios

Todas las modificaciones relevantes del proyecto se registran en este documento siguiendo el formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/) y [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Added
- Nada pendiente por el momento.

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