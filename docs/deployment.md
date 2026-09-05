# Manual de Despliegue y Operaciones — CALLEFITS BY DANNI

| Metadato | Detalle |
|:---|:---|
| **Plataforma** | Vercel Edge Network |
| **Framework** | Next.js 15 (App Router) |
| **Base de Datos** | Supabase (PostgreSQL 16 + Auth + Storage) |
| **Documento** | Guía operativa de despliegue, rollback y mantenimiento |
| **Versión** | 1.0.0 (Production Ready) |

---

## 1. Guía de Primer Despliegue en Vercel

### Prerrequisitos
- [x] Repositorio de GitHub con el código empujado a la rama `main`.
- [x] Proyecto de Supabase creado y migración SQL ejecutada.
- [x] Dominio personalizado registrado (opcional para el despliegue inicial).

### Pasos

**Paso 1 — Conectar repositorio**
1. Ir a [vercel.com/new](https://vercel.com/new) e iniciar sesión con GitHub.
2. Seleccionar el repositorio `CALLEFITS-web` de la lista.
3. Hacer clic en **Import**.

**Paso 2 — Configurar el proyecto**
1. En **Framework Preset**: seleccionar **Next.js** (Vercel lo detecta automáticamente).
2. En **Root Directory**: dejar en `.` (raíz del repositorio).
3. En **Build Command**: `npm run build` (ya está configurado en `package.json`).
4. En **Output Directory**: `.next` (valor por defecto para Next.js).
5. En **Install Command**: `npm ci` (instalación limpia y reproducible).

**Paso 3 — Variables de entorno**
Antes de hacer clic en Deploy, configurar las variables de entorno (ver sección 2).

**Paso 4 — Desplegar**
Hacer clic en **Deploy**. Vercel construirá y desplegará la aplicación en aproximadamente 2–4 minutos.

---

## 2. Matriz de Variables de Entorno

Configurar en **Vercel Dashboard → Project → Settings → Environment Variables**
para los entornos **Production** y **Preview**.

| Variable | Entorno | Descripción | Dónde obtenerla |
|:---|:---|:---|:---|
| `NEXT_PUBLIC_SUPABASE_URL` | Production + Preview | URL pública del proyecto Supabase | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production + Preview | Clave anónima (segura en cliente con RLS) | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | **Solo Production** | Clave de servicio con privilegios totales | Supabase Dashboard → Settings → API → service_role |
| `NEXT_PUBLIC_SITE_URL` | Production + Preview | URL base del sitio (para sitemap y schemas) | `https://callefits.com` o la URL de Vercel |

> **⚠️ Seguridad crítica:** `SUPABASE_SERVICE_ROLE_KEY` nunca debe tener el prefijo `NEXT_PUBLIC_`. Vercel la mantendrá como variable de servidor exclusiva.

### Verificación
Tras guardar las variables, Vercel mostrará un indicador verde. Volver a desplegar para que las nuevas variables se apliquen con `git push` o clic en **Redeploy**.

---

## 3. Vinculación de Dominio Personalizado

### Pasos en Vercel
1. Ir a **Project → Settings → Domains**.
2. Ingresar el dominio del cliente (ej. `callefits.com`) y hacer clic en **Add**.
3. Vercel mostrará los registros DNS a configurar.

### Configuración DNS (en el registrador del cliente)

| Tipo | Nombre | Valor | TTL |
|:---|:---|:---|:---|
| `A` | `@` (raíz) | `76.76.21.21` | 3600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | 3600 |

> **Tiempo de propagación:** Los cambios de DNS tardan entre 15 minutos y 48 horas en propagarse globalmente. Vercel emitirá el certificado SSL/TLS automáticamente una vez que los DNS estén propagados.

### Verificación
Acceder a `https://callefits.com` y verificar que el certificado HTTPS esté activo (candado en el navegador).

---

## 4. Procedimiento de Rollback Inmediato

Ante cualquier error crítico en producción, restaurar la versión anterior en menos de 30 segundos:

### Pasos de Rollback en Vercel
1. Ir a **Vercel Dashboard → Proyecto CALLEFITS → Deployments**.
2. Localizar el último deployment marcado como **✓ Ready** (el inmediatamente anterior al problemático).
3. Hacer clic en los **3 puntos (···)** del deployment estable.
4. Seleccionar **Promote to Production**.
5. Confirmar en el diálogo → La URL de producción apunta inmediatamente a esa versión.

### Verificación post-rollback
- Acceder a `https://callefits.com/catalog` y verificar que la tienda carga.
- Acceder a `https://callefits.com/admin/login` y verificar que el panel responde.
- Revisar el panel de **Analytics** de Vercel para confirmar que las métricas vuelven a la normalidad.

> **Política:** Ante cualquier anomalía en producción que afecte la experiencia de compra de las clientas, ejecutar rollback inmediato sin esperar análisis. El diagnóstico se hace DESPUÉS de restaurar el servicio.

---

## 5. Pipeline CI/CD (GitHub Actions)

El archivo `.github/workflows/ci.yml` ejecuta automáticamente los siguientes Quality Gates en cada `push` o Pull Request a `main`:

```
Checkout → Node.js 20 → npm ci
    │
    ├── QG1: npm run lint        (ESLint)
    ├── QG2: npm run typecheck   (TypeScript strict)
    ├── QG3: npm run test        (Vitest — 150+ tests)
    ├── QG4: npm run test:e2e    (Playwright — 15 tests)
    └── QG5: npm run build       (Next.js production build)
```

**El merge a `main` está bloqueado** hasta que los 5 Quality Gates pasen en verde.

### Variables de entorno en CI
Las pruebas E2E en CI se ejecutan en modo demo (sin Supabase) porque las claves de Supabase son secretos de producción. El servicio de productos cae automáticamente al catálogo mock local (16 prendas). Todos los flujos críticos de compra siguen funcionando en este modo.

Si se quiere habilitar E2E con Supabase en CI en el futuro, agregar los secrets en **GitHub → Repository → Settings → Secrets and variables → Actions**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 6. Rutina de Verificación Post-Despliegue (Smoke Tests)

Después de cada deploy a producción, verificar manualmente:

### Tienda Pública
- [ ] `https://callefits.com/` — Home page carga con Hero, categorías y productos destacados.
- [ ] `https://callefits.com/catalog` — Catálogo muestra las 16+ prendas correctamente.
- [ ] `https://callefits.com/catalog/legging-seamless-sculpt-pro` — Ficha de producto carga con galería y selector de variantes.
- [ ] Clic en "PEDIR POR WHATSAPP" en una ficha → abre WhatsApp con mensaje prellenado.
- [ ] `https://callefits.com/robots.txt` — Retorna 200 con `Disallow: /admin/`.
- [ ] `https://callefits.com/sitemap.xml` — Retorna 200 con URLs del catálogo.

### Panel Administrativo
- [ ] `https://callefits.com/admin` → redirige a `/admin/login`.
- [ ] Login con credenciales de Supabase Auth → accede al dashboard.
- [ ] Lista de productos muestra los productos de Supabase.
- [ ] Editar precio de un producto → cambio reflejado en la tienda inmediatamente.

### Core Web Vitals
- Ejecutar **Google PageSpeed Insights** sobre `https://callefits.com/` y verificar:
  - LCP < 2.5 segundos
  - CLS < 0.1
  - INP < 200 ms

---

## 7. Operaciones de Supabase

### Backup de datos
Supabase realiza backups automáticos diarios en el plan Pro. Para el plan Free (MVP inicial):
- Exportar periódicamente el catálogo con el archivo `supabase/seed.sql` actualizado.
- En Supabase Dashboard → Database → Backups → Download.

### Monitoreo
- **Supabase Dashboard → Reports** → Verificar latencia de queries y errores de RLS.
- **Vercel Dashboard → Analytics** → Core Web Vitals y errores del servidor.

---

## 8. Estructura de Ramas Git

```
main (protegida)
│
├── feature/*   → Nuevas funcionalidades
├── fix/*        → Correcciones de bugs
└── docs/*       → Actualizaciones de documentación
```

Toda rama de trabajo debe pasar el CI completo antes de ser mergeada a `main`.
Las releases formales se marcan con **Git tags semánticos** (`v1.0.0`, `v1.1.0`, etc.).
