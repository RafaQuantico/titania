// ── CORPUS MEF ECUADOR ────────────────────────────────────────────────────────
export const RW_NORMAS = [
  // LEYES MARCO
  { id:"E-L01", tipo:"Ley Orgánica", numero:"COPYFP", nombre:"Código Orgánico de Planificación y Finanzas Públicas",
    area:"Finanzas Públicas", subtema:"Marco presupuestario y planificación",
    vigente:"2010-10-22", ultima_mod:"2021-07-27", estado:"vigente_modificado",
    desc:"Marco jurídico que regula la planificación del desarrollo y las finanzas públicas. Establece el Sistema Nacional de Finanzas Públicas (SINFIP), el ciclo presupuestario y la gestión de la deuda pública.",
    organismos:["MEF","SENPLADES/SENESCYT","BCE"],
    cambios:[
      {fecha:"2021-07", desc:"Reforma: ajuste del ciclo presupuestario y nuevas reglas fiscales post-COVID. Flexibilización de topes de endeudamiento."},
      {fecha:"2020-04", desc:"Decreto Ejecutivo 1026: medidas fiscales de emergencia — reasignación presupuestaria sin requerimiento de aprobación ordinaria."},
    ],
    pendientes:["Reglamento de reglas fiscales actualizadas — en revisión técnica MEF"],
    fuente:"Registro Oficial Suplemento N°306", alerta: null as string | null },

  { id:"E-L02", tipo:"Ley Orgánica", numero:"LOSNCP", nombre:"Ley Orgánica del Sistema Nacional de Contratación Pública",
    area:"Contratación Pública", subtema:"Procedimientos de contratación y SERCOP",
    vigente:"2008-08-04", ultima_mod:"2024-03-15", estado:"vigente_modificado",
    desc:"Regula los procedimientos de contratación de bienes, obras, servicios y consultoría por parte del Estado. Define el SERCOP y el portal COMPRASPUBLICAS.",
    organismos:["SERCOP","Contraloría General del Estado","Procuraduría"],
    cambios:[
      {fecha:"2024-03", desc:"Reforma 2024: ampliación de umbrales para contratación directa. Nuevos procedimientos para contratación de emergencia y obras de infraestructura crítica."},
      {fecha:"2021-06", desc:"Incorporación de criterios de sostenibilidad ambiental en pliegos de contratación."},
    ],
    pendientes:["Actualización Reglamento General LOSNCP — pendiente publicación 2025"],
    fuente:"Registro Oficial Suplemento N°395",
    alerta:"⚠ Reforma 2024 en vigor: revisar umbrales y procedimientos actualizados" },

  { id:"E-L03", tipo:"Ley Orgánica", numero:"LOEP", nombre:"Ley Orgánica de Empresas Públicas",
    area:"Empresas Públicas", subtema:"Gobierno corporativo y control",
    vigente:"2009-10-16", ultima_mod:"2020-06-22", estado:"vigente",
    desc:"Regula la constitución, organización, funcionamiento, fusión, escisión y liquidación de las empresas públicas. Establece el marco de control de gestión y rendición de cuentas.",
    organismos:["Contraloría General del Estado","MEF","EMIS"],
    cambios:[{fecha:"2020-06", desc:"Reforma: refuerzo de controles internos y obligaciones de transparencia."}],
    pendientes:[] as string[], fuente:"Registro Oficial Suplemento N°48", alerta: null as string | null },

  { id:"E-L04", tipo:"Ley Orgánica", numero:"COPCI", nombre:"Código Orgánico de la Producción, Comercio e Inversiones",
    area:"Inversión y Fomento Productivo", subtema:"Incentivos tributarios e inversión extranjera",
    vigente:"2010-12-29", ultima_mod:"2023-05-10", estado:"vigente_modificado",
    desc:"Marco para la atracción de inversión, fomento productivo y desarrollo industrial. Define zonas especiales, incentivos tributarios y el régimen de inversiones extranjeras.",
    organismos:["MEF","Ministerio de Producción","SRI","Pro Ecuador"],
    cambios:[
      {fecha:"2023-05", desc:"Reforma: nuevos incentivos para sectores estratégicos (tecnología, energías renovables, agroindustria)."},
    ],
    pendientes:["Reglamento de zonas de inversión prioritaria 2025"], fuente:"Registro Oficial Suplemento N°351", alerta: null as string | null },

  { id:"E-L05", tipo:"Ley Orgánica", numero:"COOTAD", nombre:"Código Orgánico de Organización Territorial, Autonomía y Descentralización",
    area:"Gobierno Territorial", subtema:"Competencias GADs y transferencias fiscales",
    vigente:"2010-10-19", ultima_mod:"2025-01-20", estado:"vigente_modificado",
    desc:"Organiza el régimen de los GADs (municipios, prefecturas, juntas parroquiales). Define las transferencias del Presupuesto General del Estado y la distribución de competencias.",
    organismos:["MEF","AME","CONGOPE","Consejo de Competencias"],
    cambios:[
      {fecha:"2025-01", desc:"Reforma 2025: actualización de modelo de distribución de transferencias a GADs. Nuevas reglas para presupuesto participativo."},
    ],
    pendientes:[] as string[], fuente:"Registro Oficial Suplemento N°303",
    alerta:"⚠ Reforma ene.2025: revisar impacto en modelo de transferencias vigente" },

  { id:"E-L06", tipo:"Ley Orgánica", numero:"CODA 2017", nombre:"Código Orgánico del Ambiente",
    area:"Ambiente", subtema:"EIA, áreas protegidas, responsabilidad ambiental",
    vigente:"2017-06-12", ultima_mod:"2023-01-15", estado:"vigente_modificado",
    desc:"Marco jurídico ambiental de Ecuador. Regula los instrumentos de evaluación ambiental, las áreas protegidas, la participación ciudadana y la responsabilidad ambiental de proyectos de inversión.",
    organismos:["MAATE","GADs","Contraloría"],
    cambios:[{fecha:"2023-01", desc:"Reforma: actualización de plazos EIA y obligatoriedad de evaluación para proyectos financiados con fondos públicos."}],
    pendientes:[] as string[], fuente:"Registro Oficial Suplemento N°983", alerta: null as string | null },

  // NORMATIVA SECUNDARIA MEF
  { id:"E-N01", tipo:"Acuerdo Ministerial", numero:"AM 067/2016 MEF", nombre:"Clasificador Presupuestario de Ingresos y Gastos",
    area:"Presupuesto", subtema:"Clasificación y codificación presupuestaria",
    vigente:"2016-04-20", ultima_mod:"2024-08-01", estado:"vigente_modificado",
    desc:"Establece el sistema de clasificación y codificación de ingresos y gastos del sector público no financiero. Base para la formulación y ejecución presupuestaria.",
    organismos:["MEF","Subsecretaría de Presupuesto"],
    cambios:[
      {fecha:"2024-08", desc:"Actualización 2024: incorporación de nuevas partidas para gasto en digitalización, ciberseguridad y transición energética."},
    ],
    pendientes:[] as string[], fuente:"MEF — Subsecretaría de Presupuesto", alerta: null as string | null },

  { id:"E-N02", tipo:"Norma Técnica", numero:"Normas Control Interno CGE 2009", nombre:"Normas de Control Interno para el Sector Público",
    area:"Control Interno", subtema:"Ambiente de control, evaluación de riesgo, actividades de control",
    vigente:"2009-12-14", ultima_mod:"2023-07-01", estado:"vigente_modificado",
    desc:"Marco de referencia para el diseño e implementación del control interno en entidades del sector público. Basado en el modelo COSO. Obligatorio para todas las instituciones del Estado.",
    organismos:["Contraloría General del Estado"],
    cambios:[{fecha:"2023-07", desc:"Actualización: incorporación de componentes de control de TI y gobierno de datos en sector público."}],
    pendientes:["Guía de implementación de control interno digital — en elaboración CGE"],
    fuente:"Contraloría General del Estado", alerta: null as string | null },

  { id:"E-N03", tipo:"Acuerdo Ministerial", numero:"AM TULSMA 061/2015 MAATE", nombre:"Texto Unificado Legislación Secundaria M. Ambiente (TULSMA)",
    area:"Ambiente", subtema:"Límites permisibles, calidad ambiental, residuos, agua, aire",
    vigente:"2015-04-04", ultima_mod:"2022-09-20", estado:"vigente_modificado",
    desc:"Consolidación de normas técnicas y límites permisibles de calidad ambiental. Libro VI contiene normas de calidad ambiental para agua, aire, suelo, ruido y residuos.",
    organismos:["MAATE","GADs","AGD"],
    cambios:[{fecha:"2022-09", desc:"Actualización Anexo I: límites calidad agua para consumo humano."}],
    pendientes:["Revisión límites calidad del aire — proceso MAATE 2025"],
    fuente:"MAATE — Registro Oficial", alerta: null as string | null },

  { id:"E-N04", tipo:"Reglamento", numero:"Regl. LOSNCP (DE 588/2009)", nombre:"Reglamento General de la Ley de Contratación Pública",
    area:"Contratación Pública", subtema:"Procedimientos precontractuales y contractuales",
    vigente:"2009-05-12", ultima_mod:"2024-06-01", estado:"vigente_modificado",
    desc:"Regula la aplicación de la LOSNCP. Define procedimientos específicos: licitación, cotización, menor cuantía, subasta inversa, consultoría. Establece modelos de pliegos.",
    organismos:["SERCOP","Contraloría General del Estado"],
    cambios:[{fecha:"2024-06", desc:"Actualización de umbrales por inflación y adecuación a reforma LOSNCP 2024."}],
    pendientes:["Reglamento actualizado post-reforma 2024 — pendiente publicación"],
    fuente:"Registro Oficial Suplemento N°588",
    alerta:"⚠ Reglamento en proceso de actualización post-reforma LOSNCP 2024" },

  { id:"E-N05", tipo:"Reglamento", numero:"SUIA (MAATE)", nombre:"Sistema Único de Información Ambiental",
    area:"Ambiente", subtema:"Permisos ambientales, licencias, seguimiento",
    vigente:"2014-01-01", ultima_mod:"2023-06-01", estado:"vigente_modificado",
    desc:"Plataforma nacional de gestión de permisos ambientales. Integra la ficha ambiental, estudios de impacto, licencias ambientales y el seguimiento de planes de manejo.",
    organismos:["MAATE","AGD","GADs"],
    cambios:[{fecha:"2023-06", desc:"Integración con plataforma GOB.EC y firma electrónica obligatoria."}],
    pendientes:["Módulo de monitoreo post-licencia — en desarrollo MAATE"],
    fuente:"MAATE/SUIA", alerta:"⚠ Módulo seguimiento planes de manejo aún en desarrollo" },

  { id:"E-N06", tipo:"Acuerdo Ministerial", numero:"AM 063/2023 MAATE", nombre:"Reglamento Cambio Climático — NDC Ecuador",
    area:"Ambiente / Inversión", subtema:"NDC, mercado de carbono, sectores estratégicos",
    vigente:"2023-11-01", ultima_mod:"2023-11-01", estado:"vigente",
    desc:"Regula la implementación de las Contribuciones Determinadas a Nivel Nacional (NDC). Define mecanismos de carbono, obligaciones sectoriales y criterios de elegibilidad de proyectos.",
    organismos:["MAATE","MEF","Ministerio de Energía"],
    cambios:[] as {fecha:string; desc:string}[], pendientes:["Reglamento de Mercado de Carbono — en consulta pública Q2 2026"],
    fuente:"MAATE", alerta: null as string | null },

  { id:"E-N07", tipo:"Norma Técnica", numero:"NTE INEN / SERCOP", nombre:"Pliegos estándar y especificaciones técnicas SERCOP",
    area:"Contratación Pública", subtema:"Especificaciones técnicas y bienes normalizados",
    vigente:"2020-01-01", ultima_mod:"2024-10-01", estado:"vigente_modificado",
    desc:"Catálogo de bienes y servicios normalizados del Estado. Define especificaciones técnicas mínimas y precios referenciales para los principales rubros de gasto público.",
    organismos:["SERCOP","INEN"],
    cambios:[{fecha:"2024-10", desc:"Actualización de catálogo: incorporación de servicios de IA, software GovTech y equipamiento de ciberseguridad."}],
    pendientes:[] as string[], fuente:"SERCOP — portal COMPRASPUBLICAS", alerta: null as string | null },

  { id:"E-N08", tipo:"Resolución", numero:"RE-SERCOP-2024-0046", nombre:"Resolución SERCOP — Contratación Directa Ampliada",
    area:"Contratación Pública", subtema:"Contratación directa — nuevos umbrales",
    vigente:"2024-04-01", ultima_mod:"2024-04-01", estado:"vigente",
    desc:"Establece los nuevos montos máximos para contratación directa y régimen especial tras la reforma LOSNCP 2024. Impacto directo en procedimientos de adquisición de tecnología y consultoría.",
    organismos:["SERCOP"],
    cambios:[] as {fecha:string; desc:string}[], pendientes:[] as string[], fuente:"SERCOP",
    alerta:"⚠ Vigente desde abril 2024: verificar umbrales antes de iniciar proceso de contratación" },
];

export const RW_ALERTAS = [
  { id:"A001", nivel:"crítico", area:"Contratación Pública",
    titulo:"Reglamento LOSNCP actualizado pendiente — incertidumbre en umbrales",
    desc:"La reforma LOSNCP de marzo 2024 amplió los umbrales para contratación directa, pero el Reglamento General aún no ha sido publicado en su versión actualizada. Existen criterios transitorios en aplicación que pueden generar observaciones de Contraloría.",
    norma:"LOSNCP reforma 2024 + Regl. DE 588", fecha:"2024-03-15", impacto:"Alto" },
  { id:"A002", nivel:"crítico", area:"Gobierno Territorial",
    titulo:"Reforma COOTAD ene.2025 — nuevo modelo de transferencias a GADs",
    desc:"La reforma de enero 2025 modifica el modelo de distribución de transferencias del PGE a GADs. Instituciones que participan en la liquidación presupuestaria deben revisar las nuevas fórmulas de asignación.",
    norma:"COOTAD reforma ene.2025", fecha:"2025-01-20", impacto:"Alto" },
  { id:"A003", nivel:"alto", area:"Finanzas Públicas",
    titulo:"Reglas fiscales post-COVID — revisión técnica en curso",
    desc:"Las reglas fiscales introducidas por la reforma COPYFP 2021 están en revisión técnica por el MEF. Se esperan ajustes a los topes de deuda y déficit primario para el ciclo 2025-2027.",
    norma:"COPYFP reforma 2021", fecha:"2025-03-01", impacto:"Medio" },
  { id:"A004", nivel:"alto", area:"Contratación Pública",
    titulo:"Actualización catálogo SERCOP: servicios IA y GovTech incorporados",
    desc:"Desde octubre 2024 el catálogo normalizado SERCOP incluye servicios de inteligencia artificial, plataformas GovTech y equipamiento de ciberseguridad. Abre la puerta a contratación directa para pilotos tecnológicos bajo ciertos umbrales.",
    norma:"NTE SERCOP — actualización oct.2024", fecha:"2024-10-01", impacto:"Medio" },
  { id:"A005", nivel:"medio", area:"Ambiente / Inversión",
    titulo:"Reglamento Mercado de Carbono Ecuador en consulta pública",
    desc:"El reglamento de mecanismos de carbono está en consulta pública. Relevante para proyectos de inversión con componente de transición energética financiados con fondos públicos.",
    norma:"AM 063/2023 MAATE", fecha:"2026-02-01", impacto:"Bajo" },
  { id:"A006", nivel:"medio", area:"Control Interno",
    titulo:"Guía de control interno digital CGE — en elaboración",
    desc:"La Contraloría está desarrollando una guía específica para el control interno de sistemas digitales y datos en el sector público. Aplicará a todas las instituciones que implementen herramientas de IA.",
    norma:"Normas Control Interno CGE", fecha:"2025-09-01", impacto:"Medio" },
];

export const RW_FUENTES = [
  { id:"F001", nombre:"Registro Oficial de Ecuador", url:"https://www.registroficial.gob.ec",
    tipo:"Diario oficial", estado:"activa", pais:"EC",
    desc:"Publicación oficial del Estado ecuatoriano. Leyes, decretos ejecutivos, acuerdos ministeriales y resoluciones. Fuente primaria de toda la normativa vigente.",
    ultima_rev:"2026-06-24", frecuencia:"Diaria", n_indexadas:98 },
  { id:"F002", nombre:"MEF — Ministerio de Economía y Finanzas", url:"https://finanzas.gob.ec",
    tipo:"Organismo técnico", estado:"activa", pais:"EC",
    desc:"Normativas presupuestarias, circulares, acuerdos ministeriales y clasificadores del MEF. Incluye el portal del SINFIP y normativas de inversión pública.",
    ultima_rev:"2026-06-23", frecuencia:"Semanal", n_indexadas:34 },
  { id:"F003", nombre:"SERCOP — Sistema Nacional de Contratación Pública", url:"https://www.sercop.gob.ec",
    tipo:"Organismo técnico", estado:"activa", pais:"EC",
    desc:"Resoluciones, pliegos estándar, catálogo de bienes normalizados y portal COMPRASPUBLICAS. Base para contratación de tecnología pública.",
    ultima_rev:"2026-06-22", frecuencia:"Semanal", n_indexadas:29 },
  { id:"F004", nombre:"Contraloría General del Estado", url:"https://www.contraloria.gob.ec",
    tipo:"Organismo fiscalizador", estado:"activa", pais:"EC",
    desc:"Normas de control interno, informes de auditoría, pronunciamientos y criterios administrativos sobre gestión pública.",
    ultima_rev:"2026-06-20", frecuencia:"Semanal", n_indexadas:22 },
  { id:"F005", nombre:"MAATE — Ministerio del Ambiente Ecuador", url:"https://ambiente.gob.ec",
    tipo:"Organismo técnico", estado:"activa", pais:"EC",
    desc:"Normativa ambiental ecuatoriana, acuerdos ministeriales MAATE, SUIA y seguimiento de proyectos con componente ambiental.",
    ultima_rev:"2026-06-21", frecuencia:"Semanal", n_indexadas:18 },
  { id:"F006", nombre:"SUIA — Sistema Único de Información Ambiental", url:"https://suia.ambiente.gob.ec",
    tipo:"Base de datos", estado:"configurando", pais:"EC",
    desc:"Permisos ambientales, licencias, fichas técnicas y seguimiento de proyectos. Módulo de monitoreo post-licencia en desarrollo.",
    ultima_rev:"—", frecuencia:"Diaria", n_indexadas:0 },
  { id:"F007", nombre:"Procuraduría General del Estado", url:"https://www.pge.gob.ec",
    tipo:"Organismo técnico", estado:"configurando", pais:"EC",
    desc:"Dictámenes jurídicos, pronunciamientos sobre contratación pública, consultas absueltas y criterios de interpretación normativa.",
    ultima_rev:"—", frecuencia:"Mensual", n_indexadas:0 },
];

export const RW_EJEMPLOS = [
  { label:"Contratación consultoría", texto:"Para la contratación de servicios de consultoría por un monto superior a USD 50.000, la entidad contratante deberá publicar el concurso en el portal COMPRASPUBLICAS con al menos 5 días hábiles de anticipación, presentar el estudio de prefactibilidad aprobado y contar con la certificación presupuestaria del MEF." },
  { label:"Transferencia a GAD", texto:"Las transferencias del Presupuesto General del Estado a los Gobiernos Autónomos Descentralizados se realizarán conforme a las cuotas establecidas en el Modelo de Equidad Territorial del COOTAD, en cuatro pagos trimestrales. El MEF liquidará los valores dentro de los primeros 15 días de cada trimestre." },
  { label:"Licencia ambiental", texto:"Todo proyecto de inversión pública que implique la remoción de suelo en superficies superiores a 5 hectáreas deberá contar con Licencia Ambiental del MAATE previa a su ejecución, obtenida mediante el Sistema SUIA con el Estudio de Impacto Ambiental aprobado y el plan de manejo ambiental correspondiente." },
  { label:"Control interno TI", texto:"Las entidades del sector público que implementen sistemas de información, plataformas digitales o herramientas de inteligencia artificial deberán cumplir con las Normas de Control Interno de la CGE en su componente de Tecnologías de la Información, incluyendo la evaluación de riesgo tecnológico y la documentación de flujos de tratamiento de datos." },
];

export const SYSTEM_PROMPT_REGWATCH = `Eres el Asistente de Inteligencia Regulatoria de RegWatch Ecuador, especializado en el marco normativo ecuatoriano relevante para el Ministerio de Economía y Finanzas.

CORPUS ACTIVO:
- Finanzas Públicas: COPYFP (2010, ref.2021), Reglamento COPYFP, Clasificador Presupuestario MEF AM 067
- Contratación Pública: LOSNCP (ref.2024), Reglamento General (pendiente actualización), Resoluciones SERCOP, Catálogo normalizado (inc. IA y GovTech oct.2024)
- Gobierno Territorial: COOTAD (ref.ene.2025) — nuevo modelo transferencias GADs
- Empresas Públicas: LOEP 2009, Normas Control Interno CGE
- Inversión y Fomento: COPCI (ref.2023)
- Ambiente (proyectos inversión pública): CODA 2017, TULSMA AM 061, SUIA, AM 063/2023 CC/NDC

ALERTAS CLAVE:
1. LOSNCP reform.2024: umbrales nuevos contratación directa, reglamento general pendiente
2. COOTAD reforma ene.2025: nuevo modelo distribución transferencias GADs
3. Catálogo SERCOP oct.2024: servicios IA y GovTech incorporados — abre contratación directa para pilotos tecnológicos
4. CGE: guía control interno digital en elaboración — aplicará a sistemas de IA en sector público

FUENTES: Registro Oficial EC, MEF, SERCOP, Contraloría General del Estado, MAATE, Procuraduría.

MODO DIDÁCTICO: Al responder, indica siempre (1) qué norma sustenta la respuesta con número y fuente, (2) qué organismo es responsable de aplicarla, (3) si hay un límite de interpretación. Usa lenguaje claro para funcionarios públicos que pueden estar en una etapa inicial de adopción de IA.

Para preguntas sobre el piloto Titania: el piloto tiene 8-12 semanas, presupuesto referencial USD 40.000, comienza con diagnóstico + corpus + taxonomía + demo funcional. El primer paso es NDA.

Responde en español ecuatoriano institucional, conciso y trazable.`;

export const RW_SUGGS = [
  "¿Qué norma aplica a la contratación de servicios de IA?",
  "¿Cómo afecta la reforma COOTAD 2025 al MEF?",
  "¿Qué cambió en LOSNCP en 2024?",
  "Requisitos licencia ambiental inversión pública",
];

export const RW_WELCOME = `Hola. Soy el Asistente de Inteligencia Regulatoria de RegWatch Ecuador.

Tengo acceso al corpus normativo relevante para el Ministerio de Economía y Finanzas: ${RW_NORMAS.length} normas indexadas desde el Registro Oficial, MEF, SERCOP, Contraloría y MAATE.

**Alertas activas:**
🔴 Reforma COOTAD ene.2025: nuevo modelo de transferencias a GADs
🔴 Reforma LOSNCP 2024: nuevos umbrales — reglamento actualizado pendiente
⚠️ Catálogo SERCOP oct.2024: servicios de IA y GovTech ya son contratables

Puedo ayudarte a buscar qué norma aplica a un trámite, interpretar cambios recientes y comparar procedimientos. ¿Qué necesitas consultar?`;
