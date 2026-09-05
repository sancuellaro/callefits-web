# Manual Técnico y de Producto — Plataforma Web CALLEFITS BY DANNI

| Metadato | Valor |
| :--- | :--- |
| **Documento** | Manual Técnico Integral y Fuente de Verdad Arquitectónica |
| **Marca** | **CALLEFITS BY DANNI** |
| **Versión** | 1.1.0 (Consolidada) |
| **Fecha de Baseline** | 2026-09-04 |
| **Estado** | Aprobado para Arquitectura, Implementación y Guía Agéntica |
| **Gobernanza de Agentes** | Regido por `AGENTS.md` y `PROJECT_STATE.md` |

---

## 1. Reglas Maestras de Gobernanza y Desarrollo

Este documento es la **fuente de verdad central**. Toda decisión debe originarse aquí o registrarse mediante un *Architecture Decision Record* (ADR) en `docs/decisions/`. El código es el resultado de las especificaciones, nunca la especificación en sí misma.

### 1.1 Doce Mandamientos Inmutables
1. **Cero invención:** Queda estrictamente prohibido asumir o inventar requisitos comerciales no documentados.
2. **MVP Quirúrgico:** No anticipar ni implementar en el MVP funcionalidades proyectadas para fases futuras (ej. pasarelas de pago cuando el canal definido es WhatsApp).
3. **Clasificación taxativa:** Toda información debe categorizarse explícitamente como: `CONFIRMADO`, `REQUISITO DERIVADO`, `PROPUESTA`, `PENDIENTE` o `FUTURO`.
4. **Trazabilidad arquitectónica:** No se modifican decisiones estructurales sin un ADR aprobado.
5. **Preservación funcional:** Prohibido eliminar o alterar funcionalidades existentes sin autorización expresa.
6. **Simplicidad tecnológica:** Cada dependencia externa añadida debe justificar impacto en bundle, rendimiento, seguridad y alternativas descartadas.
7. **Testing obligatorio:** Ningún cambio funcional se da por concluido sin sus respectivas pruebas unitarias o de integración.
8. **Sincronización documental:** Todo cambio relevante en el código exige actualizar de inmediato `PROJECT_STATE.md` y `CHANGELOG.md`.
9. **Quality Gates obligatorios:** Antes de mergear o desplegar, deben ejecutarse sin errores los checks de types, linting, tests y build.
10. **Lectura obligatoria para Agentes:** Antes de escribir o modificar código, el agente debe inspeccionar obligatoriamente `AGENTS.md`, `PROJECT_STATE.md` y los manuales en `docs/`.
11. **Resolución de conflictos:** Si existe discrepancia entre este documento, el código y una nueva solicitud, el desarrollo se detiene de inmediato para resolverla explícitamente.
12. **Tokens antes que estilos directos:** Prohibido el uso de valores hexadecimales dispersos en componentes. Toda interfaz debe construirse a partir del sistema centralizado de tokens de diseño.

### 1.2 Matriz de Clasificación del Estado de Información
* **CONFIRMADO:** Marca: **CALLEFITS BY DANNI**; oferta inicial: ropa deportiva física de alta calidad (11 a 50 ítems); catálogo consultivo con cierre de pedidos en WhatsApp; presencia auténtica de la representante (Danni) sin sobreexposición; SEO prioritario; escalabilidad hacia productos de belleza y ecommerce internacional.
* **REQUISITO DERIVADO:** Responsive mobile-first; sistema de tokens desacoplado; administración de contenido (precios, stock, imágenes); seguridad en endpoints; testing automatizado; CI/CD; separación estricta de ambientes.
* **PROPUESTA TÉCNICA (Baseline Aprobada):** Next.js 15 (App Router, RSC), TypeScript Strict, Tailwind CSS, shadcn/ui, Framer Motion, Supabase (PostgreSQL, Auth, Storage), Zod, Vitest, Playwright, Vercel.
* **PENDIENTE:** Dominio de producción; paleta cromática definitiva en variables CSS; tipografías finales; variantes exactas por prenda; textos legales formales; credenciales de proveedores.
* **FUTURO (Roadmap V2/V3):** Carrito de compras web; checkout automatizado con Stripe; cuentas de usuario con libreta de direcciones; catálogo de cosméticos y maquillaje; transacciones multi-moneda internacionales.

---

## 2. Visión del Producto y Modelo Comercial

### 2.1 Visión del Negocio
Construir la plataforma web profesional de **CALLEFITS BY DANNI**, proyectando elegancia, sofisticación, comodidad, motivación y autenticidad. La plataforma debe desmarcarse de las plantillas genéricas de comercio electrónico, combinando una experiencia visual premium con una estructura modular que permita evolucionar de forma transparente hacia una tienda online transaccional global.

### 2.2 Objetivos e Indicadores Clave
* **Objetivo Comercial Principal:** Captar usuarios mediante búsqueda orgánica y redes sociales, exponer el catálogo y canalizar la intención de compra hacia **WhatsApp** con mensajes contextuales prellenados.
* **Objetivo de Marca:** Mostrar la calidad superior y el ajuste de las prendas, reforzando la confianza al evidenciar que detrás de la marca está Danni con un proceso genuino de confección y curaduría.
* **Indicadores de Éxito (KPIs):**
  1. *Confianza y Conversión:* Ratio de visitas que activan el CTA de pedido vía WhatsApp.
  2. *Usabilidad y Rendimiento:* Core Web Vitals en rangos óptimos (LCP < 2.5s, CLS < 0.1, FID/INP < 200ms) en navegación móvil.
  3. *Autonomía Editorial:* Capacidad del negocio de alterar precios, fotos y catálogo sin intervención de ingeniería.

### 2.3 Flujo Comercial del MVP
```
[Visitante Descubre Marca] 
       ↓ (SEO / Instagram / TikTok)
[Exploración de Catálogo y Colecciones]
       ↓ (Filtros por categoría, tallas, fotos HD y precios claros)
[Ficha de Producto: Selección de Talla/Color]
       ↓ (Clic en "Pedir por WhatsApp")
[Apertura de WhatsApp con Mensaje Contextual Prellenado]
       ↓
[Cierre Comercial Humano / Procesamiento de Pago y Envío]
```

---

## 3. Alcance y Roadmap de Evolución

```
       FASE MVP                    FASE V1.1                    FASE V2                      FASE V3
┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
│ • Catálogo Ropa Dep. │    │ • Promociones Admin. │    │ • Cuentas de Usuario │    │ • Cosméticos/Belleza │
│ • Ficha de Producto  │    │ • Testimonios Dinám. │    │ • Historial Pedidos  │    │ • Pagos Stripe Int.  │
│ • Pedidos WhatsApp   │───>│ • Guía Tallas Interact│───>│ • Carrito & Checkout │───>│ • Multi-Moneda/Idioma│
│ • Admin CMS Básico   │    │ • Optimización SEO   │    │ • Gestión Inventario │    │ • Logística Avanzada │
│ • Tokens de Diseño   │    │ • Analytics de Event.│    │ • Cupones y Descuento│    │ • Expansión Global   │
└──────────────────────┘    └──────────────────────┘    └──────────────────────┘    └──────────────────────┘
```

### 3.1 Matriz de Requisitos del Sistema (MoSCoW)

| ID | Requisito | Tipo | Prioridad | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-BR-001** | Catálogo interactivo de ropa deportiva (11-50 ítems iniciales) | Funcional | **MUST** | Confirmado |
| **REQ-BR-002** | Exhibición transparente de precios e información técnica | Funcional | **MUST** | Confirmado |
| **REQ-BR-003** | Generación de pedido/contacto vía enlace dinámico de WhatsApp | Funcional | **MUST** | Confirmado |
| **REQ-BR-004** | Galería fotográfica optimizada multi-ángulo por producto | Funcional | **MUST** | Confirmado |
| **REQ-BR-005** | Storytelling de marca e integración de la representante Danni | Funcional | **MUST** | Confirmado |
| **REQ-BR-006** | Sección de Testimonios y Prueba Social (activable al recopilar contenido) | Contenido | **SHOULD** | Confirmado |
| **REQ-BR-007** | Enlaces y social proof con redes sociales (Instagram / TikTok) | Integración | **SHOULD** | Confirmado |
| **REQ-BR-008** | Arquitectura y metadatos optimizados para posicionamiento SEO | No Funcional | **MUST** | Confirmado |
| **REQ-BR-009** | Gestión administrativa autónoma de precios y disponibilidad | CMS | **MUST** | Derivado |
| **REQ-BR-010** | Carga, ordenamiento y reemplazo de fotografías desde panel | CMS | **MUST** | Derivado |
| **REQ-BR-011** | Administración de textos editoriales, banners y FAQs | CMS | **SHOULD** | Derivado |
| **REQ-BR-012** | Autenticación y perfiles de usuario finales | Funcional | **COULD (V2)**| Visión |
| **REQ-BR-013** | Historial de órdenes y libreta de direcciones para clientes | Funcional | **COULD (V2)**| Derivado |
| **REQ-BR-014** | Pasarela de pagos automatizada con Stripe | Ecommerce | **FUTURE (V2)**| Propuesta |
| **REQ-BR-015** | Expansión de catálogo hacia Línea de Belleza y Maquillaje | Negocio | **FUTURE (V3)**| Confirmado |
| **REQ-BR-016** | Venta internacional multi-divisa con cálculo de envíos | Negocio | **FUTURE (V3)**| Confirmado |
| **REQ-DS-001** | Tokens de color desacoplados y configurables centralmente | UI/UX | **MUST** | Confirmado |
| **REQ-NFR-001**| Diseño 100% responsivo con enfoque prioritario Mobile-First | No Funcional | **MUST** | Derivado |
| **REQ-NFR-002**| Accesibilidad con estándar de referencia WCAG 2.2 Nivel AA | No Funcional | **MUST** | Derivado |
| **REQ-NFR-003**| Comunicaciones encriptadas de extremo a extremo mediante HTTPS | Seguridad | **MUST** | Derivado |
| **REQ-NFR-004**| Suite de pruebas automatizadas (Unitarias, Integración y E2E) | Calidad | **MUST** | Derivado |
| **REQ-NFR-005**| Pipeline de Integración y Despliegue Continuo (CI/CD) | DevOps | **SHOULD** | Propuesto |

---

## 4. Arquitectura de Software y Stack Tecnológico

### 4.1 Principios Arquitectónicos
* **Server-First:** Empleo intensivo de React Server Components (RSC) en Next.js 15 para reducir el bundle JS en el cliente, acelerar el *First Contentful Paint* y blindar el SEO.
* **Separación de Responsabilidades:** Clara división entre UI pura, Server Actions de orquestación, servicios de datos y almacenamiento relacional.
* **Resiliencia y Baja Fricción:** En caso de fallas de base de datos o mantenimiento, la plataforma debe degradar de forma elegante hacia datos estáticos o estados informativos sin caerse.

### 4.2 Stack Tecnológico Oficial

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND & CORE ENGINE                          │
│   Next.js 15 (App Router)  │  React 19  │  TypeScript (Strict Mode)   │
├────────────────────────────────────────────────────────────────────────┤
│                           DESIGN & STYLING                             │
│   Tailwind CSS  │  shadcn/ui (Base Modular)  │  Framer Motion (Micro)  │
├────────────────────────────────────────────────────────────────────────┤
│                       BACKEND, DATA & STORAGE                          │
│   Supabase (PostgreSQL 16)  │  Supabase Auth  │  Supabase Storage CDN  │
├────────────────────────────────────────────────────────────────────────┤
│                          QUALITY & TOOLING                             │
│   Vitest (Unit/Int)  │  Playwright (E2E)  │  Zod (Schemas)  │  ESLint │
├────────────────────────────────────────────────────────────────────────┤
│                      INFRASTRUCTURE & HOSTING                          │
│   Vercel Edge Network  │  GitHub Actions (CI/CD)  │  Resend (Emails)   │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Arquitectura Lógica de Componentes
```
[Navegador del Cliente]
       │ (HTTPS / HTTP/2)
       ▼
[Edge Network / Vercel]
       │
       ├─► [Public App Router (RSC)]
       │      ├── Home Page (Server Component con ISR/Cache)
       │      ├── Catálogo & Filtros (Server Component + Client Islands)
       │      ├── Detalle de Producto (Static Params / On-Demand Revalidation)
       │      └── Utilidad WhatsApp Context Builder
       │
       ├─► [Admin Panel Router (RSC / Protected)]
       │      ├── Middleware (Validación de Sesión y Rol Admin en Supabase Auth)
       │      └── Server Actions (Mutación de datos con Zod Validation)
       │
       └─► [Supabase BaaS Layer]
              ├── PostgreSQL con RLS (Row Level Security activo)
              ├── Storage CDN (Buckets protegidos y optimizados)
              └── Auth Engine (JWT con cookies HttpOnly seguras)
```

---

## 5. Modelo de Datos Relacional

El esquema está diseñado para soportar ropa deportiva en el MVP y expandirse a cosméticos sin reestructuración estructural.

```
┌───────────────────────────┐         ┌───────────────────────────┐
│        categories         │         │         products          │
├───────────────────────────┤         ├───────────────────────────┤
│ id: uuid (PK)             │1       N│ id: uuid (PK)             │
│ slug: varchar (Unique)    ├────────►│ category_id: uuid (FK)    │
│ name: varchar             │         │ slug: varchar (Unique)    │
│ description: text         │         │ name: varchar             │
│ is_active: boolean        │         │ description: text         │
│ created_at: timestamptz   │         │ base_price: numeric(10,2) │
└───────────────────────────┘         │ compare_at_price: numeric │
                                      │ status: enum_prod_status  │
                                      │ is_featured: boolean      │
                                      │ seo_title: varchar        │
                                      │ seo_description: text     │
                                      │ created_at: timestamptz   │
                                      │ updated_at: timestamptz   │
                                      └─────────────┬─────────────┘
                                                    │ 1
                         ┌──────────────────────────┼──────────────────────────┐
                         │ N                        │ N                        │ N
                         ▼                          ▼                          ▼
          ┌───────────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐
          │      product_images       │ │     product_variants      │ │       order_items         │
          ├───────────────────────────┤ ├───────────────────────────┤ ├───────────────────────────┤
          │ id: uuid (PK)             │ │ id: uuid (PK)             │ │ id: uuid (PK)             │
          │ product_id: uuid (FK)     │ │ product_id: uuid (FK)     │ │ order_id: uuid (FK)       │
          │ storage_path: text        │ │ sku: varchar (Unique)     │ │ product_id: uuid (FK)     │
          │ alt_text: varchar         │ │ size: varchar             │ │ variant_id: uuid (FK null)│
          │ sort_order: int2          │ │ color: varchar            │ │ product_name_snap: varchar│
          │ is_primary: boolean       │ │ stock_quantity: int4      │ │ unit_price_snap: numeric  │
          │ created_at: timestamptz   │ │ price_override: numeric   │ │ variant_desc_snap: varchar│
          └───────────────────────────┘ │ is_available: boolean     │ │ quantity: int2            │
                                        └───────────────────────────┘ └───────────────────────────┘
```

### 5.1 Entidades Auxiliares y Evolutivas
* **testimonials:** `id`, `author_name`, `role_or_context`, `quote`, `rating (1-5)`, `image_url`, `is_published`, `sort_order`.
* **orders (Base desacoplada para WhatsApp y Ecommerce Futuro):** `id`, `order_number`, `customer_name`, `customer_contact`, `channel (enum: 'whatsapp', 'web')`, `status (enum: 'draft', 'inquiry', 'confirmed', 'shipped', 'cancelled')`, `subtotal`, `total`, `notes`, `created_at`.
* **Regla de Inmutabilidad (Snapshots):** Los pedidos históricos jamás deben mutar si un producto cambia de precio o nombre. Por ello, `order_items` almacena instantáneas (`*_snap`) de los valores exactos al momento de la consulta/orden.

---

## 6. Sistema de Diseño y Tokens Centralizados

Queda prohibido acoplar valores cromáticos fijos en clases directas de Tailwind (ej. `bg-[#1a1a1a]`). La identidad visual de **CALLEFITS BY DANNI** se gobierna exclusivamente mediante variables semánticas en `src/styles/globals.css`.

### 6.1 Capa Central de Tokens (CSS Variables)
```css
:root {
  /* Tokens de Superficie y Texto */
  --background: 0 0% 98%;
  --foreground: 240 10% 3.9%;
  --surface: 0 0% 100%;
  --surface-muted: 240 4.8% 95.9%;
  
  /* Identidad de Marca: CALLEFITS BY DANNI */
  --brand-primary: 240 5.9% 10%;        /* Negro deportivo de alta gama */
  --brand-primary-foreground: 0 0% 98%;
  --brand-secondary: 35 25% 90%;       /* Tono neutro cálido / elegancia */
  --brand-secondary-foreground: 240 5.9% 10%;
  --brand-accent: 12 76% 61%;          /* Acento enérgico / motivación */
  --brand-accent-foreground: 0 0% 100%;

  /* Estados y Bordes */
  --border: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --success: 142 76% 36%;
  --error: 0 84.2% 60.2%;
  
  /* Geometría */
  --radius: 0.5rem;
}
```

### 6.2 Centralización de Configuración Institucional
Todo componente visual que requiera referencias empresariales debe importar exclusivamente el módulo `@/config/brand.config.ts`:

```typescript
export const BRAND_CONFIG = {
  name: "CALLEFITS BY DANNI",
  shortName: "CALLEFITS",
  legalName: "CALLEFITS BY DANNI S.A.S. (Pendiente)",
  tagline: "Elegancia, disciplina y confort en cada movimiento",
  contact: {
    whatsapp: {
      number: "+573000000000", // Centralizado y modificable
      defaultMessage: "Hola CALLEFITS BY DANNI, deseo recibir información sobre una prenda deportiva.",
    },
    email: "contacto@callefits.com",
    phone: "+57 300 000 0000",
  },
  socials: {
    instagram: "https://instagram.com/callefitsbydanni",
    tiktok: "https://tiktok.com/@callefitsbydanni",
  },
  categories: ["Leggings", "Tops Deportivos", "Sets Combinados", "Enterizos"],
} as const;
```

---

## 7. Experiencia de Usuario (UX) e Interfaces Clave

### 7.1 Arquitectura Visual de la Home Page
1. **Top Announcement Bar:** Avisos estratégicos ("Envíos a todo el país | Pide tu set personalizado por WhatsApp").
2. **Main Navigation Header:** Logo estilizado de **CALLEFITS BY DANNI**, enlaces simples (Inicio, Catálogo, Colecciones, Sobre Danni, FAQ) y acceso directo a WhatsApp/Redes.
3. **Hero Section:** Imagen o video optimizado de alta fidelidad, propuesta de valor orientada a la fusión entre sofisticación y rendimiento deportivo, y CTA principal ("Explorar Colección").
4. **Categorías Destacadas:** Tarjetas visuales de alto contraste con transiciones suaves.
5. **Diferenciadores de Marca:** Bloque limpio de cuatro pilares: Confección Premium, Ergonomía Total, Precio Directo y Autenticidad.
6. **Detrás de la Marca (Storytelling con Danni):** Espacio editorial íntimo donde Danni transmite el origen de la marca, los valores de empoderamiento femenino y la exigencia en los materiales (evitando la saturación personalista).
7. **Testimonios / Prueba Social:** Carousel o grilla de reseñas reales (con placeholder estructurado hasta disponer del material definitivo).
8. **Preguntas Frecuentes (FAQ):** Acordeón accesible resolviendo inquietudes sobre tallas, envíos y métodos de pago.
9. **Footer Completo:** Datos legales, canales de atención, links de navegación y políticas.

### 7.2 Catálogo y Ficha de Producto
* **Filtros Clave:** Categoría, orden por precio y disponibilidad de tallas (S, M, L).
* **Ficha de Producto:** Galería interactiva con cambio dinámico de imagen, selector visual de variante (talla/color), ficha técnica de materiales/cuidados y selector de cantidad.
* **Constructor de Enlace de WhatsApp:**

```typescript
export function buildProductWhatsAppLink(params: {
  productName: string;
  size: string;
  color: string;
  price: number;
}): string {
  const message = `Hola CALLEFITS BY DANNI, me encanta la prenda "${params.productName}" en Talla: ${params.size}, Color: ${params.color} ($${params.price.toLocaleString('es-CO')}). ¿Tienen disponibilidad para coordinar mi pedido?`;
  return `https://wa.me/${BRAND_CONFIG.contact.whatsapp.number.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
}
```

---

## 8. Panel Administrativo (CMS) y Gestión de Activos

Para cumplir el requisito de no tocar código ante cambios de inventario o precios, se implementará un área administrativa segura en `/admin`.

### 8.1 Seguridad y Control de Acceso
* **Autenticación:** Implementada con Supabase Auth utilizando cookies seguras HttpOnly gestionadas en Next.js Middleware.
* **Separación de Privilegios:** La tabla `profiles` vinculará el `user_id` de Auth con un enum de rol (`admin`, `customer`). El acceso al área administrativa se rechaza en el Middleware si el usuario no tiene rol `admin`.
* **Row Level Security (RLS) en PostgreSQL:**
  * Políticas públicas: Acceso de solo lectura (`SELECT`) a productos activos y categorías para cualquier usuario anónimo.
  * Políticas de mutación: Creación, actualización y eliminación (`INSERT`, `UPDATE`, `DELETE`) reservadas exclusivamente a usuarios autenticados con rol `admin`.

### 8.2 Manejo de Fotografías (Supabase Storage)
* Los archivos se suben al bucket protegido `products`.
* Transformación automática de formato a WebP/AVIF con compresión sin pérdidas.
* La base de datos solo almacena el identificador/ruta del objeto (`storage_path`), impidiendo links rotos por cambios de host o URLs temporales.

---

## 9. SEO Técnico, Rendimiento y Accesibilidad

### 9.1 Directrices de SEO Técnico
* **Enfoque Semántico:** Posicionamiento sobre la intención comercial: *"Ropa deportiva de buena calidad y a buen precio"*.
* **Generación de Metadatos Dinámicos:** Implementación de `generateMetadata()` en cada ruta `src/app/catalog/[slug]/page.tsx` para generar títulos únicos, meta-descriptions persuasivas y etiquetas canónicas.
* **Open Graph & Twitter Cards:** Generación automatizada con la foto principal de cada prenda para compartir enlaces estéticos en WhatsApp e Instagram.
* **Indexación y Rastreo:** Rutas nativas `src/app/sitemap.ts` y `src/app/robots.ts` actualizadas automáticamente a partir de los slugs de productos en Supabase.
* **Datos Estructurados (JSON-LD):** Esquema `Product` de Schema.org inyectado en cada ficha de prenda con nombre, precio, divisa y disponibilidad.

### 9.2 Rendimiento Web (Core Web Vitals)
* Uso prioritario de `next/image` con tamaños adaptativos (`sizes`), placeholders con efecto blur y prioridad de carga (`priority`) exclusivamente en la imagen Hero LCP.
* Reducción al mínimo de librerías en el bundle cliente. Las animaciones en Framer Motion deben limitarse a componentes interactivos clave respetando `prefers-reduced-motion`.

### 9.3 Accesibilidad (WCAG 2.2 Nivel AA)
* Contraste cromático mínimo garantizado de 4.5:1 para texto normal y 3:1 para texto grande o elementos gráficos interactivos.
* Navegación completa por teclado con anillos de foco visibles (`focus-visible:ring`).
* Elementos interactivos etiquetados inequívocamente con `aria-label` (especialmente botones con iconos de WhatsApp o cierre de menús).

---

## 10. Seguridad, Infraestructura y Operaciones

### 10.1 Gestión de Secretos y Ambientes
* Queda estrictamente prohibido versionar archivos `.env` en Git.
* Se mantendrá un archivo versionado `.env.example` con la lista de variables requeridas sin valores reales.
* Los secretos administrativos (como `SUPABASE_SERVICE_ROLE_KEY`) solo pueden ejecutarse en entornos Server-Side y jamás exponerse con el prefijo `NEXT_PUBLIC_`.

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   LOCAL (Dev)   │  ──►  │ PREVIEW / STAG  │  ──►  │   PRODUCTION    │
│   .env.local    │       │ Vercel Branches │       │  Main Protected │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### 10.2 Propiedad y Gobierno de Activos
Bajo el principio de soberanía del cliente, todas las cuentas críticas deben crearse a nombre de la marca o su representante:
1. Dominio y DNS.
2. Organización y Repositorio de GitHub.
3. Proyecto de Supabase (Base de datos y Storage).
4. Cuenta de Vercel.
5. Cuentas comerciales oficiales de WhatsApp, Instagram y TikTok.
El equipo técnico o agentes deben operar bajo permisos delegados.

### 10.3 Estrategia de Git y Despliegues
* **Ramas Principales:** `main` (código en producción siempre estable).
* **Ramas de Trabajo:** `feature/nombre-tarea`, `fix/descripcion`, `docs/actualizacion`.
* **Commits Convencionales:** `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.
* **CI/CD Pipeline:** En cada Pull Request a `main`, GitHub Actions ejecutará:
  1. `npm run lint`
  2. `npm run typecheck`
  3. `npm run test` (Vitest)
  4. `npm run build`
* **Rollback Inmediato:** Ante cualquier anomalía en producción, se utilizará la función de *Instant Rollback* de Vercel para restaurar la versión estable anterior en segundos.

---

## 11. Estrategia de Testing y Calidad

Una tarea no se considera terminada simplemente porque "se ve bien en pantalla". Debe satisfacer el siguiente esquema de verificación:

### 11.1 Pirámide de Pruebas
1. **Pruebas Unitarias (Vitest):**
   * Validación de utilidades (ej. formateador de precios colombianos, constructor de URLs de WhatsApp).
   * Validación de esquemas Zod (validación de datos de producto y formularios).
   * Lógica del archivo `brand.config.ts`.
2. **Pruebas de Integración (Vitest + Testing Library):**
   * Renderizado de componentes complejos con diferentes estados: carga (`Skeleton`), error y lista vacía (`Empty`).
   * Verificación del selector de variantes en la ficha de producto.
3. **Pruebas End-to-End (Playwright):**
   * **Flujo Crítico 1:** Home → Clic en Catálogo → Filtrar por Talla → Abrir Producto → Clic en WhatsApp (verificar URL generada).
   * **Flujo Crítico 2:** Navegación en viewport móvil (360px) comprobando apertura del menú hamburguesa y botón flotante.
   * **Flujo Crítico 3:** Acceso a `/admin` bloqueado para usuarios no autenticados.

### 11.2 Definition of Done (DoD)
Para dar por completado cualquier requerimiento o bloque de trabajo, debe verificarse:
- [ ] Código escrito en TypeScript estricto sin uso de `any`.
- [ ] Estilos dependientes exclusivamente de tokens CSS semánticos.
- [ ] `npm run typecheck` ejecutado con 0 errores.
- [ ] `npm run lint` ejecutado sin advertencias críticas.
- [ ] Pruebas unitarias o de integración correspondientes aprobadas.
- [ ] Comportamiento responsive validado en resoluciones móvil (375px), tablet (768px) y desktop (1280px+).
- [ ] Atributos de accesibilidad (`aria-label`, `alt` en imágenes) verificados.
- [ ] Archivos `PROJECT_STATE.md` y `CHANGELOG.md` actualizados.

---

## 12. Protocolo de Operación para Agentes de IA

Este protocolo debe ser respetado por cualquier entorno agéntico (Cursor, Windsurf, Claude Code, Aider u otros).

### 12.1 Flujo Obligatorio de Ejecución del Agente
```
1. LEER DOCUMENTACIÓN
   ├── Inspeccionar @AGENTS.md
   ├── Revisar @PROJECT_STATE.md
   └── Consultar requerimiento en @docs/requirements.md
          │
2. ANALIZAR & DETECTAR RESTRICCIONES
   ├── ¿Hay dependencias nuevas? (Si no están aprobadas, detenerse)
   └── ¿Hay ambigüedades? (Proponer opciones, no inventar)
          │
3. IMPLEMENTAR CÓDIGO
   ├── Modular, server-first y con tokens semánticos
   └── Manejo de estados (Loading, Empty, Error)
          │
4. VERIFICAR QUALITY GATES
   ├── Ejecutar tests (Vitest)
   ├── Ejecutar typecheck (`tsc --noEmit`)
   └── Ejecutar linting
          │
5. ACTUALIZAR ESTADO & REPORTAR
   ├── Registrar cambios en @PROJECT_STATE.md y CHANGELOG.md
   └── Resumir de forma precisa los archivos modificados
```

### 12.2 Estructura del Repositorio Esperada
```text
callefits-web/
├── AGENTS.md                   # Instrucciones maestras e inviolables del agente
├── PROJECT_STATE.md            # Estado actual de fases y checklist de avance
├── CHANGELOG.md                # Registro de cambios por versión (SemVer)
├── README.md                   # Guía de instalación y visión general
├── package.json
├── tsconfig.json
├── tailwind.config.ts
│
├── docs/                       # Fuente de verdad modular
│   ├── technical-manual.md     # Este manual técnico integral
│   ├── requirements.md         # Requisitos funcionales y no funcionales
│   ├── architecture.md         # Decisiones y diagramas de arquitectura
│   ├── data-model.md           # Esquemas relacionales y políticas RLS
│   ├── design-system.md        # Tokens CSS y especificaciones visuales
│   └── decisions/              # Architecture Decision Records
│       └── ADR-001-stack.md
│
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (shop)/             # Rutas públicas de catálogo y marca
│   │   ├── admin/              # Rutas privadas de gestión
│   │   ├── layout.tsx          # Layout maestro con Navbar y Footer
│   │   └── globals.css         # Definición de tokens semánticos CSS
│   ├── components/             # UI Components (ui/, layout/, features/)
│   ├── config/                 # Configuración central (brand.config.ts)
│   ├── lib/                    # Clientes de Supabase, validadores Zod, utils
│   └── types/                  # Definiciones de TypeScript
│
└── tests/                      # Suite de pruebas automatizadas
    ├── unit/
    ├── integration/
    └── e2e/
```

### 12.3 Matriz de Riesgos y Mitigación Inmediata

| Riesgo Técnico / Negocio | Nivel | Estrategia de Mitigación Inmediata |
| :--- | :---: | :--- |
| **R1: Sobreingeniería prematura** | ALTO | Bloquear cualquier desarrollo de carrito de compra o checkout complejo hasta la Fase V2. El canal de conversión del MVP es exclusivamente WhatsApp. |
| **R2: Inconsistencia visual o cambios costosos** | MEDIO | Todo color o espaciado debe utilizar tokens semánticos de CSS. Cambiar la paleta de la marca se limitará a alterar valores en `globals.css`. |
| **R3: Carencia de contenido o testimonios reales** | MEDIO | Diseñar componentes con estados vacíos (`EmptyStates`) amigables. Prohibido fabricar testimonios o fotografías falsas. |
| **R4: Pérdida de rendimiento en móviles** | ALTO | Uso estricto de Server Components, optimización de imágenes con `next/image` y monitoreo de Core Web Vitals en cada build. |
| **R5: Vulnerabilidad en panel administrativo** | CRÍTICO | No depender de rutas secretas. Implementar middleware con verificación de JWT y RLS estricto en la base de datos de Supabase. |

---

## 13. Conclusión y Compromiso de Calidad

Este manual no persigue simplemente desplegar un sitio web estético. Su finalidad es dotar a **CALLEFITS BY DANNI** de un **activo digital empresarial**:
* Que represente con fidelidad y elegancia la propuesta de valor de Danni.
* Que maximice las ventas iniciales reduciendo al mínimo la fricción hacia WhatsApp.
* Que permita a la administración gestionar su catálogo sin depender de desarrolladores.
* Y que constituya una base de ingeniería sólida y modular, capaz de transformarse en una plataforma global de comercio electrónico sin tener que reescribir una sola línea de sus cimientos.