# Contexto Multi-Proyecto: Titania Sync

El proyecto ahora cuenta con **dos entornos completamente integrados**:
1. **Proyecto Inmobiliario — Brisas de Mirasur:** Dashboard principal con MCA, Brechas, Estado & Reportes y Biblioteca Documental.
2. **Proyecto Desaladoras:** Panel analítico basado en corpus de 89 documentos SEIA con pestañas: Proyectos, Criterios Evaluador, Persistencia, Brechas Técnicas, Riesgos y Estado & Reportes.

---

## Sistema de Autenticación y Captación de Leads (Arquitectura Actual)

### Fuente de Verdad: Supabase
- **Proyecto:** `https://nxxsxrhuuprehlthzwng.supabase.co`
- **Tabla:** `usuarios_demo`
- **Columnas:** `id`, `created_at`, `nombre`, `institucion`, `correo` (unique), `estado` ('pendiente' | 'aprobado' | 'bloqueado'), `ultimo_ingreso`
- La clave `anon` tiene acceso completo (RLS desactivado en esta tabla).

### Flujo Completo
1. **Login:** Usuario ingresa correo + contraseña (`DemoTitania1122!`). El frontend llama a `/api/log-sheet` con `tipoAccion: "Verificar"`. Supabase busca el correo con `estado = 'aprobado'`. Si existe → entra. Si no → mensaje de error.
2. **Registro:** Usuario llena el formulario de "Solicitar acceso". Llama a `/api/request-access` que:
   - Guarda en Supabase con `estado = 'pendiente'`
   - Envía correo interno a `contacto@titan-ia.com` con **botón verde de aprobación**
   - Envía correo de autorespuesta al solicitante
3. **Aprobación:** Rafael hace clic en "✅ Aprobar acceso con un clic" en el correo → llama a `/api/approve-user?correo=xxx&token=titania-admin-2025` → Supabase actualiza el estado a `'aprobado'` → página verde de confirmación en el navegador.
4. **Log pasivo a Google Sheets:** Cada ingreso y solicitud envía también los datos al webhook de Apps Script (solo como espejo/historial). Si Google Sheets falla, el sistema no se ve afectado.

### APIs Relevantes
| Endpoint | Función |
|---|---|
| `POST /api/log-sheet` | Verificar correo (login), registrar ingreso, registrar solicitud |
| `POST /api/request-access` | Guardar en Supabase + enviar correos por Hostinger |
| `GET /api/approve-user` | Aprobar usuario con un clic desde el correo |
| `POST /api/chat` | Chat con Claude (Anthropic) |

### Variables de Entorno Requeridas (`.env.local`)
```
ANTHROPIC_API_KEY=...
SMTP_PASSWORD="Colomba1122!"
GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/AKfycbyaBjiDteejGkckaCyvE56pI-mQ4CfNxcZ4v4Rbran5c0iiEH2N3DWoBwe2y2IQ_QdmGg/exec"
NEXT_PUBLIC_SUPABASE_URL=https://nxxsxrhuuprehlthzwng.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54eHN4cmh1dXByZWhsdGh6d25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0ODAyMDYsImV4cCI6MjA5MzA1NjIwNn0.QvLv2jRMnj3HKe_4BRhy6JB5yFHY01z_FsjUFyj0O-M
```
> ⚠️ El `.env.local` NO viaja por Git. Debe crearse manualmente en cada computador nuevo.
> Las variables de Supabase y Google Sheets YA están guardadas en Vercel (no necesitan setearse en el dashboard de Vercel manualmente).

---

## Flujo de Trabajo Multi-Equipo (Disco Externo)
- **Problema Caché:** El servidor en el disco externo arroja errores al cambiar de Mac si se mantiene el caché de Turbopack. **Solucionado:** `npm run dev` hace un `rm -rf .next` silencioso antes de bootear.
- **Cambio de computador:** Ejecutar `npm run sync` al terminar el día. Esto sube todo a GitHub y Vercel automáticamente.
- **Producción:** `https://sync.titan-ia.com`

---

## Archivos Clave
| Archivo | Función |
|---|---|
| `src/app/page.tsx` | Lógica principal: login, navegación, chat, renderizado de dashboards |
| `src/components/DesaladorasDashboard.tsx` | Dashboard completo del Proyecto Desaladoras |
| `src/data/desaladorasData.ts` | Datos del corpus de 89 documentos SEIA |
| `src/app/api/log-sheet/route.ts` | Verificación login + log a Supabase y Google Sheets |
| `src/app/api/request-access/route.ts` | Registro de nuevos usuarios + correos Hostinger |
| `src/app/api/approve-user/route.ts` | Aprobación de usuarios con un clic desde el correo |
| `src/lib/supabase.ts` | Cliente de Supabase compartido |
