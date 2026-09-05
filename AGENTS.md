# AGENTS.md — Protocolo y Reglas Permanentes de Desarrollo

## 1. Identidad y Propósito del Proyecto
- **Marca:** **CALLEFITS BY DANNI**
- **Propósito:** Plataforma web comercial de ropa deportiva de alta calidad y diseño sofisticado.
- **Canal de Cierre Comercial MVP:** Catálogo dinámico con derivación directa a **WhatsApp Business**.
- **Visión Futura:** Expansión modular hacia cosméticos/maquillaje y venta online internacional con Stripe (no implementar pasarelas de pago complejas en el MVP).

## 2. Antes de Tocar una Sola Línea de Código
El agente debe inspeccionar obligatoriamente en este orden:
1. `AGENTS.md` (este documento).
2. `PROJECT_STATE.md` (para saber en qué fase estamos y qué está bloqueado/permitido).
3. `docs/technical-manual.md` (fuente de verdad técnica).
4. `docs/requirements.md` (especificación de requerimientos funcionales y criterios de aceptación).
5. `docs/decisions/ADR-001.md` (baseline tecnológico oficial).

## 3. Reglas Técnicas Inmutables
1. **Cero Invención:** Prohibido inventar requerimientos, testimonios, fotografías falsas o claims de marca. Si falta información, consultar.
2. **Server-First (Next.js 15):** Usa React Server Components (RSC) por defecto. Usa `'use client'` únicamente cuando existan hooks interactivos (`useState`, `useEffect`) o eventos de usuario.
3. **Cero Colores Hardcodeados:** Prohibido usar valores hexadecimales directos en componentes (`bg-[#1a1a1a]`, `text-black`). Todo debe consumir las variables CSS de diseño semántico configuradas en `globals.css` (`bg-primary`, `text-foreground`, `border-border`).
4. **Configuración Centralizada:** Prohibido escribir números de WhatsApp, correos o redes sociales dentro de los componentes. Todos deben importarse desde `@/config/brand.config.ts`.
5. **Seguridad y Secretos:** Cero credenciales o claves privadas en código o componentes cliente. Las claves sensibles como `SUPABASE_SERVICE_ROLE_KEY` viven exclusivamente en variables de entorno del servidor.
6. **Autorización Server-Side:** Un usuario logueado en Supabase no es automáticamente administrador. Toda acción sensible debe validar el rol `admin` en el servidor mediante middleware y políticas RLS en PostgreSQL.
7. **Simplicidad sin Sobreingeniería:** No instalar librerías externas sin justificar su necesidad técnica ni implementar carritos de compra complejos en esta etapa.

## 4. Manejo de Ambigüedades
Si una tarea presenta una disyuntiva técnica o funcional que afecte arquitectura, costos o experiencia de usuario:
1. Detenerse inmediatamente.
2. Explicar el punto ambiguo y su impacto.
3. Presentar 2 o 3 alternativas viables con pros y contras.
4. Recomendar una opción justificada.
5. Esperar confirmación antes de proceder.

## 5. Protocolo de Calidad y Definition of Done (DoD)
Una tarea o feature solo se considera terminada cuando:
- [ ] Código TypeScript estricto sin uso de `any`.
- [ ] Responsive validado en resoluciones móvil (360px-412px), tablet (768px) y desktop (1280px+).
- [ ] `npm run typecheck` (`tsc --noEmit`) pasa con 0 errores.
- [ ] `npm run lint` pasa sin advertencias críticas.
- [ ] Pruebas unitarias o de integración relevantes creadas y aprobadas (`npm run test`).
- [ ] Manejo explícito de estados: carga (`Skeleton`), error y estado vacío (`EmptyState`).
- [ ] `PROJECT_STATE.md` actualizado en la sección de tareas completadas y siguiente paso.
- [ ] `CHANGELOG.md` actualizado con los cambios realizados bajo el estándar Keep a Changelog.