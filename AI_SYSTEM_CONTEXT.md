# Contexto del Sistema: Titania Sync (Plataforma Regulatoria)

## Estado Actual y Logros
- **Refactorización UI/UX:** Hemos logrado migrar por completo la interfaz a Tailwind CSS en modo claro, con una estructura responsive de 3 columnas para Desktop y un diseño nativo hiperfluido para Mobile (NavBar + Menú lateral oculto deslizante + Chat flotante Modal en Slide-over).
- **Extracción de Datos:** Removimos los 350+ renglones técnicos (Matriz de Compromisos Ambientales, Sistema de Prompts) a `/src/data/mca.ts` para que `page.tsx` quedase puramente para el diseño (UI) e interactividad.
- **Backend I.A. (Proxy de Anthropic):** En lugar de hacer Fetch de datos directamente desde el frontend y comprometer la seguridad o la política de CORS de Claude, creamos un Endpoint robusto y puro de Next.js (`/src/app/api/chat/route.ts`).
- **Descubrimiento de Modelo 2026:** Validamos que la API Key actual pertenece a un plan avanzado de Anthropic que usa de base los modelos `claude-sonnet-4-6`. El proxy está adaptado directamente a este motor de razonamiento de punta.
- **Despliegue Continuo (Vercel):** La plataforma está deployada y funcional online (`titania-six.vercel.app` o su variante autogenerada).

## Arquitectura de la Base de Código
1. **`/src/app/page.tsx`**: Contiene la lógica del Dashboard interactivo. Todo es Responsive e incluye `react-markdown` instalado para parsear las negritas de Claude. Contiene tres variables principales de layout `showMobileSidebar` y `showMobileChat`.
2. **`/src/app/api/chat/route.ts`**: Frontend manda post al proxy, proxy manda peticiones seguras al motor de Anthropic mediante la `ANTHROPIC_API_KEY` inyectada en variables de entorno.
3. **`/src/app/globals.css`**: Almacena las variables de color estándar `--color-titania-brand` y la clase `.scrollbar-hide` esencial para interactividad móvil.
4. **`/src/data/mca.ts`**: Todo el conocimiento documental y las reglas estrictas (Prompt) del agente.

## Variables de Entorno (¡No están en GitHub!)
- `ANTHROPIC_API_KEY` (Guardada en tu Vercel y localmente en tu `.env.local` del Mac Mini). **DEBES VOLVER A CREAR ESTE ARCHIVO EN LA NUEVA COMPUTADORA**.

## Pasos para iniciar en la nueva computadora (Setup & Despliegue)
Para que puedas volver a empujar el código hacia internet en tu otra máquina, realiza el siguiente ritual apenas descomprimas el proyecto:

1. **Recupera los módulos:**
   Abre una terminal en la carpeta del proyecto y ejecuta:
   ```bash
   npm install
   ```

2. **Vincula tu terminal con tu Nube Vercel:**
   Para poder volver a ejecutar comandos como `npx vercel --prod`, tu terminal en la nueva computadora necesita autorización. Ejecuta:
   ```bash
   npx vercel login
   ```
   (Elige tu método de inicio de sesión, usualmente GitHub o Correo). Luego, para reactivar el enlace con tu proyecto exacto, ejecuta el siguiente comando y dile que **Sí** (y) a enlazar al proyecto existente:
   ```bash
   npx vercel link
   ```

3. **(Opcional) Autenticación en Github:**
   Si deseas sincronizar el repositorio `RafaQuantico/titania` por Git, tu nueva computadora debe tener la credencial correcta (pues vimos un error 403 hace tiempo). Te recomiendo instalar **GitHub Desktop** e iniciar sesión (es la forma visual más fácil y maneja las llaves por ti), abriendo el proyecto allí para hacer *Commit & Push*.

4. **Variables de entorno de producción:**
   ¡Buenas noticias! Como la clave de Anthropic ya quedó grabada en la infraestructura central de tu servidor en Vercel, no necesitas volver a subirla. Una vez estés loageado (`vercel login`), cualquier empuje que hagas (`npx vercel --prod`) la usará automáticamente.

## Siguientes Pasos
Avisar a la IA en la nueva máquina al iniciar lectura de este documento para empalmar. Tareas pendientes descritas oralmente por el humano.
