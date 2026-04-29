# Contexto Multi-Proyecto: Titania Sync

El proyecto ahora cuenta con **dos entornos completamente integrados**:
1. **Brisas de Mirasur (Inmobiliario):** Dashboard principal y Biblioteca de Documentos.
2. **Análisis Desaladoras (Sanitario/Portuario):** Un panel analítico oscuro basado en un corpus de 89 documentos.

### Últimos Cambios Realizados (Sistema de Acceso y Captación de Leads)
1. **Login Dinámico y Requerido:** Se implementó un campo de correo obligatorio junto con la contraseña.
2. **Formulario de Registro:** Se agregó un pop-up ("Solicita acceso aquí") que captura Nombre, Institución y Correo.
3. **Notificaciones SMTP (Hostinger):** 
   - Se configuró `/api/request-access` usando `nodemailer` con Hostinger (`contacto@titan-ia.com`).
   - Envía un correo de aviso interno a `contacto@titan-ia.com`.
   - Envía una respuesta automática de confirmación al cliente que llenó el formulario.
   - Requiere la variable `SMTP_PASSWORD` en `.env.local`.
4. **Base de Datos en Google Sheets (Apps Script Webhook):**
   - Se configuró el endpoint `/api/log-sheet` que conecta con una URL Webhook de Google Apps Script.
   - Guarda automáticamente todos los eventos de "Ingreso" y "Solicitud" con fecha y hora de Santiago.
   - **Módulo de Memoria:** Si es un "Ingreso" (solo trae correo), el script busca en las filas anteriores para recuperar el Nombre y la Empresa y pegarlas en el nuevo log.
   - **Módulo de Seguridad (Verificar):** El login tiene una pre-validación. Si el correo que intenta loguearse no existe en el Sheet como "Solicitud", le bloquea el paso con un error amarillo de autorización.
   - Requiere la variable `GOOGLE_SHEET_WEBHOOK_URL` en `.env.local`.

### Flujo de Trabajo Multi-Equipo (Disco Externo)
- **Problema Caché Rutas Absolutas:** El servidor en el disco externo arroja errores al cambiar de Mac si se mantiene el caché de Turbopack. Solucionado: el comando `npm run dev` hace un `rm -rf .next` silencioso antes de bootear.
- **Push Automático:** Para cambiar de computador a final del día, ejecutar siempre en la terminal: `npm run sync`. Esto sube todo a Github/Vercel sin lidiar con comandos git manuales.
