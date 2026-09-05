# Especificación Formal de Requerimientos del Sistema

| Metadato | Detalle |
| :--- | :--- |
| **Proyecto** | Plataforma Web Comercial **CALLEFITS BY DANNI** |
| **Documento** | `docs/requirements.md` — Requerimientos de Software y Criterios de Aceptación |
| **Versión** | 1.1.0 |
| **Estado** | Aprobado para Implementación y Validación de Calidad |
| **Documentos Asociados** | `docs/technical-manual.md`, `AGENTS.md`, `PROJECT_STATE.md` |

---

## 1. Convenciones y Glosario

### 1.1 Prefijos de Clasificación
* **`BR` (Business Requirement):** Necesidades y metas directas del modelo comercial.
* **`FR` (Functional Requirement):** Capacidades interactivas y lógica de la plataforma.
* **`DS` (Design System):** Reglas visuales, tokens de diseño y consistencia de interfaz.
* **`NFR` (Non-Functional Requirement):** Rendimiento, accesibilidad, compatibilidad y SEO.
* **`SEC` (Security):** Autenticación, autorización y protección de datos.
* **`OPS` (Operations):** Despliegue, CI/CD, control de versiones y mantenimiento.

### 1.2 Prioridades (Estándar MoSCoW)
* **MUST:** Obligatorio para el lanzamiento del MVP. Su ausencia bloquea la salida a producción.
* **SHOULD:** Altamente deseable. Debe implementarse salvo impedimento técnico justificado.
* **COULD:** Opcional o secundario para fases inmediatas posteriores (V1.1).
* **FUTURE:** Reservado explícitamente para el roadmap a medio/largo plazo (V2 y V3).

### 1.3 Actores del Sistema
1. **Visitante / Compradora:** Usuario que navega en móvil o desktop buscando ropa deportiva de alta calidad, consulta detalles y solicita su pedido por WhatsApp.
2. **Administradora (Danni):** Propietaria de la marca con credenciales seguras para modificar precios, fotos, disponibilidad y textos del catálogo sin tocar código.

---

## 2. Requerimientos de Negocio (BR)

### BR-001: Catálogo Especializado de Ropa Deportiva
* **Prioridad:** `MUST` | **Estado:** Confirmado
* **Descripción:** La plataforma debe exhibir la colección de prendas deportivas de la marca (entre 11 y 50 referencias iniciales), organizada por categorías lógicas (Leggings, Tops, Sets, Enterizos).
* **Criterios de Aceptación:**
  - Cada producto debe mostrar fotografía principal, nombre comercial, categoría y precio base.
  - El usuario debe poder navegar y filtrar entre categorías sin recargas completas de página.
  - La visualización debe mantener jerarquía estética de marca premium.

### BR-002: Exhibición Transparente de Precios
* **Prioridad:** `MUST` | **Estado:** Confirmado
* **Descripción:** Todos los productos activos deben mostrar su precio de venta de forma clara y visible.
* **Criterios de Aceptación:**
  - Formato monetario regionalizado legible (ej. `$120.000 COP`).
  - Si una prenda tiene descuento, debe mostrar el precio original tachado (`compare_at_price`) y el precio final resaltado.
  - Prohibido solicitar contacto solo para saber el precio; la transparencia es un pilar de confianza de la marca.

### BR-003: Canalización de Pedidos por WhatsApp Dinámico
* **Prioridad:** `MUST` | **Estado:** Confirmado
* **Descripción:** El cierre de la venta se realiza a través de WhatsApp Business, con mensajes contextuales generados automáticamente según la selección del cliente.
* **Criterios de Aceptación:**
  - El botón "Pedir por WhatsApp" en la ficha de producto debe abrir la app de WhatsApp o WhatsApp Web con el número configurado en `brand.config.ts`.
  - El texto predeterminado debe incluir: nombre del producto, talla elegida, color seleccionado y precio vigente.
  - Si la prenda no tiene stock en la variante elegida, el botón debe inhabilitarse visualmente o cambiar a "Consultar disponibilidad".

### BR-004: Exhibición Fotográfica de Alta Resolución
* **Prioridad:** `MUST` | **Estado:** Confirmado
* **Descripción:** La plataforma debe permitir visualizar las prendas desde múltiples ángulos para evidenciar calidad de tela, costuras, compresión y ajuste anatómico.
* **Criterios de Aceptación:**
  - Mínimo 2 a 4 fotografías por prenda.
  - Galería con cambio fluido de imagen principal al hacer clic en miniaturas.
  - Optimización automática de entrega mediante `next/image` en formato WebP/AVIF.

### BR-005: Storytelling y Diferenciadores de Marca
* **Prioridad:** `MUST` | **Estado:** Confirmado
* **Descripción:** La plataforma debe transmitir los valores de autenticidad, elegancia, comodidad y disciplina de **CALLEFITS BY DANNI**, visibilizando a Danni como la persona real detrás de la marca sin convertir el sitio en un blog personal.
* **Criterios de Aceptación:**
  - Sección editorial dedicada "Detrás de la Marca / Sobre Danni" en la Home y página propia.
  - Destacar los 4 diferenciadores clave: 1. Confección premium, 2. Cero transparencias, 3. Comodidad ergonómica, 4. Trato personalizado.

### BR-006: Prueba Social y Confianza del Consumidor
* **Prioridad:** `SHOULD` | **Estado:** Confirmado
* **Descripción:** Integración de elementos que mitiguen la desconfianza de compra en marcas emergentes.
* **Criterios de Aceptación:**
  - Sección de testimonios reales o reseñas verificadas con calificación de estrellas (1-5).
  - Estado vacío (`EmptyState`) elegante en caso de no contar aún con testimonios públicos cargados (sin fabricar testimonios falsos).
  - Bloque de Preguntas Frecuentes (FAQ) cubriendo pagos, envíos nacionales y cambios de talla.

### BR-007: Integración con Canales Sociales
* **Prioridad:** `SHOULD` | **Estado:** Confirmado
* **Descripción:** Conexión visible con los perfiles oficiales de la marca en Instagram y TikTok para validar presencia activa.
* **Criterios de Aceptación:**
  - Enlaces centralizados desde `brand.config.ts` presentes en Navbar y Footer.
  - Apertura en pestaña externa segura con atributos `rel="noopener noreferrer"`.
  - No usar widgets externos pesados que deterioren el tiempo de carga del sitio.

### BR-008: Optimización para Motores de Búsqueda (SEO)
* **Prioridad:** `MUST` | **Estado:** Confirmado
* **Descripción:** Arquitectura optimizada para posicionar orgánicamente términos como: *"Ropa deportiva de buena calidad y a buen precio"*.
* **Criterios de Aceptación:**
  - Metaetiquetas dinámicas por producto (`title`, `description`, `canonical`).
  - Open Graph y Twitter Cards automáticas con la fotografía destacada.
  - Generación automática de `sitemap.xml` y `robots.txt` a partir de las rutas del catálogo.
  - Marcado de datos estructurados Schema.org (`Product` y `Organization`) en formato JSON-LD.

---

## 3. Requerimientos Funcionales (FR)

### FR-001: Navegación y Filtros del Catálogo
* **Prioridad:** `MUST` | **Actores:** Compradora
* **Descripción:** El usuario debe poder explorar el catálogo completo y aplicar filtros sin fricción.
* **Criterios de Aceptación:**
  - Filtrado por categoría (Leggings, Tops, Sets, Enterizos).
  - Ordenamiento por precio (menor a mayor / mayor a menor).
  - Actualización de la URL mediante Query Params (`/catalog?category=leggings&sort=price_asc`) para permitir compartir búsquedas y guardar favoritos.
  - Estado de carga Skeleton durante transiciones y mensaje informativo si no hay resultados.

### FR-002: Selector de Variantes en Ficha de Producto
* **Prioridad:** `MUST` | **Actores:** Compradora
* **Descripción:** La ficha técnica debe permitir elegir la combinación de talla y color deseada antes de contactar.
* **Criterios de Aceptación:**
  - Selector visual interactivo para tallas (`XS`, `S`, `M`, `L`, `XL`).
  - Muestrario de color o etiquetas de tono (ej. Negro Ónix, Café Moca, Verde Oliva).
  - El estado seleccionado debe actualizar inmediatamente los parámetros del enlace de WhatsApp.

### FR-003: Botón Flotante Global de Soporte y Ventas
* **Prioridad:** `MUST` | **Actores:** Compradora
* **Descripción:** En todo el sitio debe persistir un botón flotante de acceso rápido a WhatsApp.
* **Criterios de Aceptación:**
  - Fijado en la esquina inferior derecha sin tapar información crucial o botones interactivos de navegación.
  - Mensaje predeterminado de consulta general amigable.
  - Accesibilidad total por teclado y etiqueta `aria-label="Contactar por WhatsApp"`.

### FR-004: Autenticación Segura de Administradora
* **Prioridad:** `MUST` | **Actores:** Administradora
* **Descripción:** Acceso restringido al panel de control `/admin` mediante correo y contraseña.
* **Criterios de Aceptación:**
  - Middleware de Next.js que intercepte cualquier petición a `/admin/*` y redirija a `/admin/login` si no hay sesión válida.
  - Sesiones gestionadas mediante cookies seguras HttpOnly con Supabase Auth.
  - Bloqueo de acceso tras múltiples intentos fallidos (protección contra fuerza bruta).

### FR-005: Administración de Catálogo y Precios (CMS)
* **Prioridad:** `MUST` | **Actores:** Administradora
* **Descripción:** Capacidad de crear, editar y archivar prendas sin tocar código fuente.
* **Criterios de Aceptación:**
  - Formulario administrativo para editar: nombre, descripción, categoría, precio base y precio de oferta.
  - Interruptor para cambiar el estado del producto: `Activo`, `Borrador` o `Agotado`.
  - Revalidación automática en Next.js (`revalidatePath`) al guardar para reflejar cambios de inmediato en la tienda pública.

### FR-006: Subida y Gestión de Fotografías de Producto
* **Prioridad:** `MUST` | **Actores:** Administradora
* **Descripción:** Interfaz para cargar fotografías directamente al almacenamiento en la nube.
* **Criterios de Aceptación:**
  - Carga directa de imágenes hacia el bucket protegido de Supabase Storage.
  - Validación de extensiones permitidas: `.webp`, `.jpg`, `.jpeg`, `.png` con límite de peso de 5 MB por archivo.
  - Posibilidad de reordenar fotos y designar cuál es la foto de portada (`is_primary`).

### FR-007: Gestión Básica de Categorías
* **Prioridad:** `MUST` | **Actores:** Administradora
* **Descripción:** Crear y renombrar categorías del catálogo.
* **Criterios de Aceptación:**
  - Creación de categoría con nombre y generación automática de `slug` URL-friendly (ej. "Tops Deportivos" -> `tops-deportivos`).
  - Impedir la eliminación de una categoría si tiene prendas asociadas para evitar referencias huérfanas.

### Requerimientos Funcionales Futuros (Roadmap V2 y V3)
* **FR-008: Cuentas de Usuario y Perfiles** (`FUTURE - V2`): Registro con correo/Google para consultar compras anteriores y guardar datos personales.
* **FR-009: Libreta de Direcciones de Envío** (`FUTURE - V2`): Gestión de direcciones de entrega predeterminadas para agilizar futuras órdenes.
* **FR-010: Historial de Pedidos Web** (`FUTURE - V2`): Consulta del estado de órdenes pasadas con números de guía de envío.
* **FR-011: Carrito de Compras y Checkout con Stripe** (`FUTURE - V2`): Transacciones online directas con tarjetas de crédito/débito y pasarelas locales.
* **FR-012: Expansión de Catálogo hacia Línea de Belleza** (`FUTURE - V3`): Soporte de atributos específicos para cosméticos y cuidado personal (tono, ingredientes, fecha de caducidad).
* **FR-013: Venta Internacional y Multi-Moneda** (`FUTURE - V3`): Detección geográfica de IP, conversión a divisas internacionales (USD, EUR) y reglas aduaneras.

---

## 4. Requerimientos del Sistema de Diseño (DS)

### DS-001: Tokens Centralizados e Inmutabilidad de Estilos
* **Prioridad:** `MUST` | **Estado:** Confirmado
* **Descripción:** Todo el diseño se rige por variables semánticas en CSS. Se prohíbe el uso de valores hexadecimales dispersos en el código (`#ffffff`, `bg-[#121212]`).
* **Criterios de Aceptación:**
  - Configuración estricta en `src/app/globals.css` consumiendo tokens semánticos: `--background`, `--foreground`, `--brand-primary`, `--brand-secondary`, `--brand-accent`, `--border`, `--radius`.
  - Integración total con Tailwind CSS y componentes de shadcn/ui.

### DS-002: Reconfiguración Dinámica de Paleta
* **Prioridad:** `MUST` | **Estado:** Confirmado
* **Descripción:** Capacidad de modificar toda la identidad cromática de la marca alterando únicamente el bloque `:root` de variables CSS.
* **Criterios de Aceptación:**
  - Cambiar el valor de `--brand-primary` actualiza de forma inmediata y armónica botones, encabezados, bordes y acentos en toda la plataforma sin romper contrastes ni requerir edición de componentes individuales.

### DS-003: Accesibilidad Visual y Contraste
* **Prioridad:** `MUST` | **Estado:** Confirmado
* **Descripción:** Todo texto y control interactivo debe cumplir las relaciones de contraste estándar.
* **Criterios de Aceptación:**
  - Ratio de contraste mínimo de 4.5:1 para texto estándar sobre cualquier fondo.
  - Ratio de contraste mínimo de 3.0:1 para elementos de interfaz gráfica (bordes de inputs, botones secundarios).

---

## 5. Requerimientos No Funcionales (NFR)

### NFR-001: Diseño Responsive y Mobile-First
* **Prioridad:** `MUST` | **Estado:** Derivado
* **Descripción:** Experiencia impecable diseñada prioritariamente para pantallas táctiles de smartphones, adaptándose con elegancia a resoluciones mayores.
* **Criterios de Aceptación:**
  - Verificación visual sin desbordamientos horizontales en viewports: Móvil (360px, 390px, 412px), Tablet (768px, 820px), Laptop (1024px, 1280px) y Desktop (1440px+).
  - Elementos táctiles interactivos con dimensiones mínimas de 44x44 píxeles.

### NFR-002: Estándar de Accesibilidad WCAG 2.2 Nivel AA
* **Prioridad:** `MUST` | **Estado:** Derivado
* **Descripción:** La plataforma debe ser accesible para personas con discapacidades visuales, motoras o cognitivas.
* **Criterios de Aceptación:**
  - Navegación estructural completa mediante teclado (`Tab`, `Shift+Tab`, `Enter`, `Escape`).
  - Indicadores de foco visibles en todos los enlaces y botones (`focus-visible:ring`).
  - Todas las imágenes con propósito informativo deben contar con atributo `alt` descriptivo.

### NFR-003: Rendimiento y Core Web Vitals
* **Prioridad:** `MUST` | **Estado:** Derivado
* **Descripción:** Velocidad de carga ultrarrápida en redes móviles 4G.
* **Criterios de Aceptación:**
  - **LCP (Largest Contentful Paint):** < 2.5 segundos.
  - **CLS (Cumulative Layout Shift):** < 0.1.
  - **INP (Interaction to Next Paint):** < 200 milisegundos.
  - Implementación de imágenes optimizadas con `priority` únicamente en la sección Hero LCP.

### NFR-004: Suite de Pruebas Automatizadas
* **Prioridad:** `MUST` | **Estado:** Derivado
* **Descripción:** Cobertura de pruebas para prevenir regresiones.
* **Criterios de Aceptación:**
  - **Pruebas Unitarias (Vitest):** 100% de cobertura en funciones de formateo, lógica de WhatsApp y esquemas de validación Zod.
  - **Pruebas End-to-End (Playwright):** Automatización de flujos críticos (Navegación Home -> Filtro de Catálogo -> Detalle de Producto -> Clic en WhatsApp -> Redirección del Middleware de Admin).

---

## 6. Seguridad y Protección de Datos (SEC)

### SEC-001: Aislamiento de Secretos y Variables de Entorno
* **Prioridad:** `MUST` | **Estado:** Confirmado
* **Descripción:** Cero exposición de credenciales privadas en el frontend o repositorios de código.
* **Criterios de Aceptación:**
  - Archivos `.env*` rigurosamente ignorados en `.gitignore`.
  - Mantenimiento estricto de `.env.example` con la lista de variables requeridas sin valores reales.
  - Claves privadas (como `SUPABASE_SERVICE_ROLE_KEY`) restringidas exclusivamente a entornos de servidor; prohibido usar el prefijo `NEXT_PUBLIC_` para secretos.

### SEC-002: Autorización Server-Side y Row Level Security (RLS)
* **Prioridad:** `MUST` | **Estado:** Confirmado
* **Descripción:** La seguridad de la base de datos y endpoints debe validarse en el servidor y a nivel de base de datos.
* **Criterios de Aceptación:**
  - RLS activado en todas las tablas de Supabase PostgreSQL.
  - Las consultas de clientes anónimos solo pueden leer registros donde `status = 'active'`.
  - Toda mutación de datos (creación, edición o eliminación de productos) debe autenticarse en el servidor y validarse contra el esquema Zod correspondiente.

### SEC-003: Cifrado y Tráfico HTTPS Exclusivo
* **Prioridad:** `MUST` | **Estado:** Confirmado
* **Descripción:** Todas las comunicaciones entre el cliente, Vercel y Supabase deben viajar encriptadas.
* **Criterios de Aceptación:**
  - Certificados SSL/TLS forzados en Vercel.
  - Redirección automática de tráfico HTTP a HTTPS (código de respuesta 301).

---

## 7. Operaciones, DevOps y Despliegue (OPS)

### OPS-001: Pipeline Automatizado de Integración Continua (CI)
* **Prioridad:** `SHOULD` | **Estado:** Propuesto
* **Descripción:** Verificación de código automática ante cualquier propuesta de cambio.
* **Criterios de Aceptación:**
  - GitHub Actions configurado para ejecutarse en cada Pull Request a `main`.
  - El pipeline debe ejecutar y aprobar sin fallos:
    1. `npm run lint`
    2. `npm run typecheck` (`tsc --noEmit`)
    3. `npm run test` (Vitest)
    4. `npm run build`

### OPS-002: Mecanismo de Rollback Inmediato
* **Prioridad:** `SHOULD` | **Estado:** Propuesto
* **Descripción:** Capacidad de revertir una versión defectuosa en producción en menos de 2 minutos.
* **Criterios de Aceptación:**
  - Procedimiento documentado en `docs/deployment.md` para utilizar la función *Instant Rollback* de Vercel hacia la última compilación estable.
  - Cada versión en producción debe estar asociada a un Git Tag semántico (ej. `v1.0.0`).

### OPS-003: Estrategia de Copias de Seguridad (Backups)
* **Prioridad:** `SHOULD` | **Estado:** Propuesto
* **Descripción:** Salvaguarda de la información del catálogo e imágenes.
* **Criterios de Aceptación:**
  - Backups diarios automatizados provistos por la plataforma gestionada de Supabase.
  - Exportación periódica del archivo de semillas `supabase/seed.sql` ante cambios importantes en el catálogo base.

---

## 8. Matriz de Trazabilidad de Requerimientos (RTM)

Esta matriz conecta los requerimientos con su implementación técnica y su prueba de verificación:

| Requisito | Componente / Módulo Afectado | Tipo de Verificación | Criterio de Pase |
| :--- | :--- | :--- | :--- |
| **BR-001 / FR-001** | `src/app/catalog/page.tsx` | Vitest / Playwright | Filtrado correcto por categoría y URL sincronizada. |
| **BR-002** | `src/lib/formatters.ts` | Pruebas Unitarias | Formato `$XXX.XXX COP` consistente y manejo de precios con descuento. |
| **BR-003 / FR-003** | `WhatsAppFloatingButton.tsx` / `ProductVariantSelector.tsx` | Playwright E2E | Enlace codificado correctamente hacia WhatsApp con mensaje contextual. |
| **BR-005** | `src/components/features/home/AboutDanniSection.tsx` | Inspección Visual & UX | Presencia auténtica de Danni sin invadir el catálogo comercial. |
| **FR-004 / SEC-002**| `src/middleware.ts` / Supabase Auth | Playwright E2E | Redirección forzada de usuarios no autenticados a `/admin/login`. |
| **FR-005 / FR-006**| `src/app/admin/products/` | Pruebas de Integración | Actualización de precio e imagen reflejada de inmediato en la tienda pública. |
| **DS-001 / DS-002** | `src/app/globals.css` | Inspección de Tokens | Cero valores hexadecimales en el código; cambio global de variables CSS exitoso. |
| **NFR-001** | Layout global / Viewports Tailwind | Emulación en Navegador | Navegación fluida y sin overflow horizontal en viewports de 360px a 1440px. |
| **NFR-003** | `next/image` / Server Components | Auditoría Lighthouse | Core Web Vitals en rangos verdes (LCP < 2.5s). |
| **SEC-001** | `src/lib/supabase/` | Code Review & Lint | Ningún secreto expuesto en bundles del cliente (`NEXT_PUBLIC_`). |