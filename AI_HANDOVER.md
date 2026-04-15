# TITANIA SYNC - Proyecto Demo (Handover Context)

Este documento contiene la memoria de desarrollo del proyecto Titania Sync para asegurar la continuidad del trabajo en un nuevo entorno. **Instrucciones para la IA:** Lee detenidamente este archivo para asimilar la estructura, las dependencias, la lógica de negocio y las decisiones de diseño tomadas hasta el momento.

## 1. Naturaleza del Proyecto
El proyecto original consistía en un prototipo de una sola página generado en React puro (con datos estáticos en duro) traído desde un chat con Claude. 
El trabajo actual ha refactorizado y migrado este prototipo a un entorno de **producción realista** usando **Next.js** y **Tailwind CSS**. La aplicación está alojada y desplegada en **Vercel** (`https://sync.titan-ia.com`).

El objetivo principal es crear una "Demo Premium" de gestión de **Compromisos Ambientales en el SEIA chileno** para el "Proyecto Inmobiliario Brisas de Mirasur", demostrando un panel visual de cumplimiento, una biblioteca documental y un chatbot con IA para análisis regulatorio integrado.

## 2. Arquitectura de Datos y Componentes
### - Base de Datos Local (`src/data/mca.ts`)
Aquí se independizó la Matriz de Compromisos Ambientales (MCA). 
- Tiene 47 compromisos clasificados por fases y tipos.
- Muestra el rastreo regulatorio (Trazabilidad) de cada documento en el proceso.
- Contiene el `SYSTEM_PROMPT` estricto que se envía al bot. El nombre real (Mirasur) fue enmascarado y el prompt obliga a la IA a llamarlo siempre "Proyecto Inmobiliario (DEMO)".

### - Interfaz de Usuario y Onboarding (`src/app/page.tsx` y `src/app/layout.tsx`)
- Identidad TitaniaSync: Navbar, sidebar y dashboard portan un branding estricto esmeralda/verde oscuro (#1a2f24, #518b62, #8ebc9b).
- Panel Responsivo: Tablas y vistas colapsan en pantallas estrechas con configuraciones `flex-col`.

### - Novedad Exclusiva: Generación de Reportes PDF Dinámicos e Inteligentes
- Se crearon dos botones de exportación en el Dashboard: "Exportar Informe Consolidado" y "Exportar Reporte de Brechas".
- **Flujo:** Al pulsar, encripta el `estado` actual de la interfaz y la `MCA` como `SYSTEM_PROMPT` + Instrucción de reporte extenso -> Pide a `claude-sonnet` (con capacidad extendida a `max_tokens: 4096` en `/api/chat/route.ts`) la redacción profunda -> Devuelve un Markdown puro.
- **Visual:** Se simula una barra de progreso `isGeneratingPdf` de 45 segundos mientras procesa la IA.
- **Renderizado Final:** El texto de IA se inyecta en una hoja oculta (`print:block`) con membrete esmeralda corporativo Titania y logo. Luego lanza un script para pre-capturar un nombre de archivo bonito y el `window.print()` captura perfectamente las tablas con salto de página.

## 3. Flujo Multi-Pc (Traspaso en Disco Duro Externo)
**Para evitar fallos (Module Not Found o Generic Failure) al saltar entre los ordenadores del usuario:**
1. Siempre se debe arrancar con `npm run dev`. El código en `package.json` fue alterado para que este comando ejecute: `"rm -rf .next && next dev"`. Esto purga instantáneamente cualquier archivo guardado con las rutas de disco duro del otro computador, evitando "cagadas" de compilación.
2. Al iniciar un nuevo bloque de trabajo, el usuario SOLO debe enviar este `AI_HANDOVER.md` (o pedir que el bot lo lea).
3. Todo estará al día y en sincronía instantánea.

**Próximos pasos a definir por el usuario:**
Validar funcionamiento final de los reportes tras pruebas intensivas o continuar inyectando funciones extras en la biblioteca.
