# CALLEFITS BY DANNI — Plataforma Web Oficial

Plataforma web comercial y catálogo interactivo de ropa deportiva femenina de alta gama para la marca **CALLEFITS BY DANNI**. Desarrollada con arquitectura Server-First de alto rendimiento, diseño modular basado en tokens semánticos y flujo de conversión optimizado hacia WhatsApp Business.

---

## 🏛️ Fuentes de Verdad y Documentación

Para entender la arquitectura, requerimientos y decisiones del sistema, consulta la documentación oficial:

1. **Reglas para Desarrolladores y Agentes de IA:** [`AGENTS.md`](./AGENTS.md)
2. **Estado Actual y Roadmap de Fases:** [`PROJECT_STATE.md`](./PROJECT_STATE.md)
3. **Manual Técnico Integral:** [`docs/technical-manual.md`](./docs/technical-manual.md)
4. **Especificación Formal de Requerimientos:** [`docs/requirements.md`](./docs/requirements.md)
5. **Registro de Decisiones Arquitectónicas:** [`docs/decisions/ADR-001.md`](./docs/decisions/ADR-001.md)
6. **Historial de Versiones:** [`CHANGELOG.md`](./CHANGELOG.md)

---

## 🚀 Stack Tecnológico Aprobado

- **Framework:** Next.js 15 (App Router, React Server Components)
- **Lenguaje:** TypeScript (Strict Mode)
- **Estilos:** Tailwind CSS con tokens de diseño centralizados en variables CSS
- **Componentes UI:** shadcn/ui (base modular personalizable)
- **Micro-interacciones:** Framer Motion
- **Backend, Datos y Almacenamiento:** Supabase (PostgreSQL 16, Row Level Security, Storage CDN)
- **Validación:** Zod
- **Testing:** Vitest (Unitario/Integración) y Playwright (End-to-End)
- **Hosting & CI/CD:** Vercel Edge Network + GitHub Actions

---

## 📋 Protocolo de Ejecución para Agentes

Cualquier agente que trabaje en este repositorio debe seguir el siguiente flujo antes de dar una tarea por terminada:

```bash
# 1. Verificar tipado estricto
npm run typecheck

# 2. Verificar reglas de código
npm run lint

# 3. Ejecutar pruebas automatizadas
npm run test

# 4. Probar build de producción
npm run build