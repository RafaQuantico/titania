import { useState, useRef, useEffect } from "react";

const C = {
  bg:"#F0F3F8", panel:"#FFFFFF", card:"#F6F8FC",
  navy:"#0F2D4A", navy2:"#1A3D60",
  teal:"#0B6E6E", tealL:"#E6F4F4",
  blue:"#1D6FA4", blueL:"#EAF4FC",
  green:"#0A7C5C", greenL:"#E6F5F0",
  amber:"#C9710A", amberL:"#FEF7EC",
  red:"#C0392B", redL:"#FEF0EE",
  yellow:"#B07D06", yellowL:"#FEFBE8",
  slate:"#5A6D80", slateL:"#EEF2F6",
  border:"#DDE3EC", border2:"#C4CDD9",
  text:"#1A2433", textDim:"#5A6D80", textFaint:"#8FA0B0",
};

// ── CORPUS MEF ECUADOR ────────────────────────────────────────────────────────
const NORMAS = [
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
    fuente:"Registro Oficial Suplemento N°306", alerta:null },

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
    pendientes:[], fuente:"Registro Oficial Suplemento N°48", alerta:null },

  { id:"E-L04", tipo:"Ley Orgánica", numero:"COPCI", nombre:"Código Orgánico de la Producción, Comercio e Inversiones",
    area:"Inversión y Fomento Productivo", subtema:"Incentivos tributarios e inversión extranjera",
    vigente:"2010-12-29", ultima_mod:"2023-05-10", estado:"vigente_modificado",
    desc:"Marco para la atracción de inversión, fomento productivo y desarrollo industrial. Define zonas especiales, incentivos tributarios y el régimen de inversiones extranjeras.",
    organismos:["MEF","Ministerio de Producción","SRI","Pro Ecuador"],
    cambios:[
      {fecha:"2023-05", desc:"Reforma: nuevos incentivos para sectores estratégicos (tecnología, energías renovables, agroindustria)."},
    ],
    pendientes:["Reglamento de zonas de inversión prioritaria 2025"], fuente:"Registro Oficial Suplemento N°351", alerta:null },

  { id:"E-L05", tipo:"Ley Orgánica", numero:"COOTAD", nombre:"Código Orgánico de Organización Territorial, Autonomía y Descentralización",
    area:"Gobierno Territorial", subtema:"Competencias GADs y transferencias fiscales",
    vigente:"2010-10-19", ultima_mod:"2025-01-20", estado:"vigente_modificado",
    desc:"Organiza el régimen de los GADs (municipios, prefecturas, juntas parroquiales). Define las transferencias del Presupuesto General del Estado y la distribución de competencias.",
    organismos:["MEF","AME","CONGOPE","Consejo de Competencias"],
    cambios:[
      {fecha:"2025-01", desc:"Reforma 2025: actualización de modelo de distribución de transferencias a GADs. Nuevas reglas para presupuesto participativo."},
    ],
    pendientes:[], fuente:"Registro Oficial Suplemento N°303",
    alerta:"⚠ Reforma ene.2025: revisar impacto en modelo de transferencias vigente" },

  { id:"E-L06", tipo:"Ley Orgánica", numero:"CODA 2017", nombre:"Código Orgánico del Ambiente",
    area:"Ambiente", subtema:"EIA, áreas protegidas, responsabilidad ambiental",
    vigente:"2017-06-12", ultima_mod:"2023-01-15", estado:"vigente_modificado",
    desc:"Marco jurídico ambiental de Ecuador. Regula los instrumentos de evaluación ambiental, las áreas protegidas, la participación ciudadana y la responsabilidad ambiental de proyectos de inversión.",
    organismos:["MAATE","GADs","Contraloría"],
    cambios:[{fecha:"2023-01", desc:"Reforma: actualización de plazos EIA y obligatoriedad de evaluación para proyectos financiados con fondos públicos."}],
    pendientes:[], fuente:"Registro Oficial Suplemento N°983", alerta:null },

  // NORMATIVA SECUNDARIA MEF
  { id:"E-N01", tipo:"Acuerdo Ministerial", numero:"AM 067/2016 MEF", nombre:"Clasificador Presupuestario de Ingresos y Gastos",
    area:"Presupuesto", subtema:"Clasificación y codificación presupuestaria",
    vigente:"2016-04-20", ultima_mod:"2024-08-01", estado:"vigente_modificado",
    desc:"Establece el sistema de clasificación y codificación de ingresos y gastos del sector público no financiero. Base para la formulación y ejecución presupuestaria.",
    organismos:["MEF","Subsecretaría de Presupuesto"],
    cambios:[
      {fecha:"2024-08", desc:"Actualización 2024: incorporación de nuevas partidas para gasto en digitalización, ciberseguridad y transición energética."},
    ],
    pendientes:[], fuente:"MEF — Subsecretaría de Presupuesto", alerta:null },

  { id:"E-N02", tipo:"Norma Técnica", numero:"Normas Control Interno CGE 2009", nombre:"Normas de Control Interno para el Sector Público",
    area:"Control Interno", subtema:"Ambiente de control, evaluación de riesgo, actividades de control",
    vigente:"2009-12-14", ultima_mod:"2023-07-01", estado:"vigente_modificado",
    desc:"Marco de referencia para el diseño e implementación del control interno en entidades del sector público. Basado en el modelo COSO. Obligatorio para todas las instituciones del Estado.",
    organismos:["Contraloría General del Estado"],
    cambios:[{fecha:"2023-07", desc:"Actualización: incorporación de componentes de control de TI y gobierno de datos en sector público."}],
    pendientes:["Guía de implementación de control interno digital — en elaboración CGE"],
    fuente:"Contraloría General del Estado", alerta:null },

  { id:"E-N03", tipo:"Acuerdo Ministerial", numero:"AM TULSMA 061/2015 MAATE", nombre:"Texto Unificado Legislación Secundaria M. Ambiente (TULSMA)",
    area:"Ambiente", subtema:"Límites permisibles, calidad ambiental, residuos, agua, aire",
    vigente:"2015-04-04", ultima_mod:"2022-09-20", estado:"vigente_modificado",
    desc:"Consolidación de normas técnicas y límites permisibles de calidad ambiental. Libro VI contiene normas de calidad ambiental para agua, aire, suelo, ruido y residuos.",
    organismos:["MAATE","GADs","AGD"],
    cambios:[{fecha:"2022-09", desc:"Actualización Anexo I: límites calidad agua para consumo humano."}],
    pendientes:["Revisión límites calidad del aire — proceso MAATE 2025"],
    fuente:"MAATE — Registro Oficial", alerta:null },

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
    cambios:[], pendientes:["Reglamento de Mercado de Carbono — en consulta pública Q2 2026"],
    fuente:"MAATE", alerta:null },

  { id:"E-N07", tipo:"Norma Técnica", numero:"NTE INEN / SERCOP", nombre:"Pliegos estándar y especificaciones técnicas SERCOP",
    area:"Contratación Pública", subtema:"Especificaciones técnicas y bienes normalizados",
    vigente:"2020-01-01", ultima_mod:"2024-10-01", estado:"vigente_modificado",
    desc:"Catálogo de bienes y servicios normalizados del Estado. Define especificaciones técnicas mínimas y precios referenciales para los principales rubros de gasto público.",
    organismos:["SERCOP","INEN"],
    cambios:[{fecha:"2024-10", desc:"Actualización de catálogo: incorporación de servicios de IA, software GovTech y equipamiento de ciberseguridad."},],
    pendientes:[], fuente:"SERCOP — portal COMPRASPUBLICAS", alerta:null },

  { id:"E-N08", tipo:"Resolución", numero:"RE-SERCOP-2024-0046", nombre:"Resolución SERCOP — Contratación Directa Ampliada",
    area:"Contratación Pública", subtema:"Contratación directa — nuevos umbrales",
    vigente:"2024-04-01", ultima_mod:"2024-04-01", estado:"vigente",
    desc:"Establece los nuevos montos máximos para contratación directa y régimen especial tras la reforma LOSNCP 2024. Impacto directo en procedimientos de adquisición de tecnología y consultoría.",
    organismos:["SERCOP"],
    cambios:[], pendientes:[], fuente:"SERCOP",
    alerta:"⚠ Vigente desde abril 2024: verificar umbrales antes de iniciar proceso de contratación" },
];

const ALERTAS = [
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

const FUENTES = [
  { id:"F001", nombre:"Registro Oficial de Ecuador", url:"https://registroficial.gob.ec",
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

const EJEMPLOS = [
  { label:"Procedimiento contratación consultoría", texto:"Para la contratación de servicios de consultoría por un monto superior a USD 50.000, la entidad contratante deberá publicar el concurso en el portal COMPRASPUBLICAS con al menos 5 días hábiles de anticipación, presentar el estudio de prefactibilidad aprobado y contar con la certificación presupuestaria del MEF." },
  { label:"Transferencia presupuestaria a GAD", texto:"Las transferencias del Presupuesto General del Estado a los Gobiernos Autónomos Descentralizados se realizarán conforme a las cuotas establecidas en el Modelo de Equidad Territorial del COOTAD, en cuatro pagos trimestrales. El MEF liquidará los valores dentro de los primeros 15 días de cada trimestre." },
  { label:"Requisito licencia ambiental", texto:"Todo proyecto de inversión pública que implique la remoción de suelo en superficies superiores a 5 hectáreas deberá contar con Licencia Ambiental del MAATE previa a su ejecución, obtenida mediante el Sistema SUIA con el Estudio de Impacto Ambiental aprobado y el plan de manejo ambiental correspondiente." },
  { label:"Control interno TI sector público", texto:"Las entidades del sector público que implementen sistemas de información, plataformas digitales o herramientas de inteligencia artificial deberán cumplir con las Normas de Control Interno de la CGE en su componente de Tecnologías de la Información, incluyendo la evaluación de riesgo tecnológico y la documentación de flujos de tratamiento de datos." },
];

const SYS = `Eres el Asistente de Inteligencia Regulatoria de RegWatch Ecuador, especializado en el marco normativo ecuatoriano relevante para el Ministerio de Economía y Finanzas.

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

// ── HELPERS ───────────────────────────────────────────────────────────────────
const eStyle = {
  vigente:           { label:"Vigente",                  color:C.green,  bg:C.greenL },
  vigente_modificado:{ label:"Vigente — modificado",     color:C.blue,   bg:C.blueL  },
  configurando:      { label:"En configuración",         color:C.slate,  bg:C.slateL },
  activa:            { label:"Activa",                   color:C.green,  bg:C.greenL },
  error:             { label:"Sin respuesta",            color:C.red,    bg:C.redL   },
};
const nStyle = {
  crítico:{ color:C.red,   bg:C.redL   },
  alto:   { color:C.amber, bg:C.amberL },
  medio:  { color:C.yellow,bg:C.yellowL},
  bajo:   { color:C.slate, bg:C.slateL },
};
const aStyle = {
  "Finanzas Públicas":C.navy,"Contratación Pública":C.blue,
  "Gobierno Territorial":C.teal,"Control Interno":C.slate,
  "Ambiente":C.green,"Ambiente / Inversión":C.green,
  "Inversión y Fomento":C.amber,"Empresas Públicas":C.navy,
};

const Pill=({text,color,bg,xs})=>(
  <span style={{background:bg||`${color}15`,color,borderRadius:20,
    padding:xs?"1px 8px":"3px 11px",fontSize:xs?8.5:10,fontWeight:600,
    whiteSpace:"nowrap",border:`1px solid ${color}25`}}>{text}</span>
);
const Tag=({text,color})=>(
  <span style={{background:`${color}10`,color,borderRadius:4,
    padding:"1px 6px",fontSize:9,fontWeight:600,border:`1px solid ${color}20`}}>{text}</span>
);

// ── ONBOARDING ────────────────────────────────────────────────────────────────
const Onboarding=({onClose})=>(
  <div style={{position:"fixed",inset:0,zIndex:999,
    background:"rgba(10,20,35,0.65)",backdropFilter:"blur(4px)",
    display:"flex",alignItems:"center",justifyContent:"center",padding:24}}
    onClick={onClose}>
    <div style={{background:`linear-gradient(135deg,${C.navy},${C.navy2})`,
      borderRadius:14,padding:"28px 30px",color:"#fff",position:"relative",
      maxWidth:640,width:"100%",boxShadow:"0 24px 64px rgba(0,0,0,0.4)"}}
      onClick={e=>e.stopPropagation()}>
      <button onClick={onClose} style={{position:"absolute",top:12,right:14,
        background:"rgba(255,255,255,0.1)",border:"none",borderRadius:5,
        color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:16,
        width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",
        lineHeight:1}}>×</button>
      <div style={{fontSize:10,color:C.teal,fontWeight:700,letterSpacing:"0.07em",
        textTransform:"uppercase",marginBottom:5}}>¿Cómo funciona RegWatch?</div>
      <div style={{fontSize:15,fontWeight:800,marginBottom:16}}>
        Tres pasos para convertir normativa dispersa en conocimiento accionable
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>
        {[
          {n:"1",t:"Corpus",icon:"📋",desc:"El sistema indexa normas, resoluciones, acuerdos ministeriales e instructivos desde fuentes oficiales. Cada norma queda con trazabilidad documental y alerta de cambios."},
          {n:"2",t:"Procesamiento IA",icon:"⚡",desc:"Al hacer una consulta, el motor busca en el corpus, identifica normas relevantes, mapea requisitos y plazos, y cita la fuente oficial."},
          {n:"3",t:"Respuesta trazable",icon:"🔍",desc:"Recibes la respuesta con cita a la norma, organismo responsable y advertencia sobre límites de interpretación. Apoya el criterio del funcionario; no lo reemplaza."},
        ].map((s,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.08)",borderRadius:9,
            padding:"14px 14px",border:"1px solid rgba(255,255,255,0.1)"}}>
            <div style={{fontSize:20,marginBottom:6}}>{s.icon}</div>
            <div style={{fontSize:12,fontWeight:800,color:C.teal,marginBottom:4}}>{s.n}. {s.t}</div>
            <div style={{fontSize:10.5,color:"rgba(255,255,255,0.6)",lineHeight:1.55}}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:9.5,color:"rgba(255,255,255,0.35)",
        borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:10}}>
        ⚠ RegWatch no automatiza decisiones públicas ni reemplaza el criterio legal o técnico de los funcionarios. · Haz clic fuera para cerrar.
      </div>
    </div>
  </div>
);

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
const Dashboard=({})=>(
  <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
      {[
        {v:NORMAS.length,l:"Normas indexadas",c:C.blue,sub:"Marco normativo MEF Ecuador"},
        {v:ALERTAS.length,l:"Alertas activas",c:C.amber,sub:`${ALERTAS.filter(a=>a.nivel==="crítico").length} críticas`},
        {v:NORMAS.reduce((s,n)=>s+(n.pendientes?.length||0),0),l:"Actos pendientes",c:C.red,sub:"Reglamentos / instructivos"},
        {v:FUENTES.filter(f=>f.estado==="activa").length,l:"Fuentes activas",c:C.green,sub:"de "+FUENTES.length+" configuradas"},
      ].map((s,i)=>(
        <div key={i} style={{background:C.panel,borderRadius:10,padding:"14px 16px",
          border:`1px solid ${C.border}`,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
          <div style={{fontSize:24,fontWeight:800,color:s.c}}>{s.v}</div>
          <div style={{fontSize:11,fontWeight:600,color:C.text}}>{s.l}</div>
          <div style={{fontSize:9.5,color:C.textFaint,marginTop:2}}>{s.sub}</div>
        </div>
      ))}
    </div>
    <div style={{background:C.panel,borderRadius:10,padding:"14px 18px",
      border:`1px solid ${C.border}`,marginBottom:12}}>
      <div style={{fontSize:11.5,fontWeight:700,color:C.navy,marginBottom:10}}>
        3 módulos demostrativos — piloto Titania × MEF Ecuador
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {[
          {n:"Demo 1",t:"Consulta regulatoria",desc:"Asistente que responde qué norma aplica a un trámite o procedimiento del MEF, con cita a la fuente y organismo responsable.",icon:"💬",c:C.teal},
          {n:"Demo 2",t:"Clasificador de documentos",desc:"Toma texto de una norma o resolución y lo clasifica automáticamente: tipo, materia, organismo, requisitos, plazos y riesgos.",icon:"🗂",c:C.blue},
          {n:"Demo 3",t:"Vigilancia y alertas",desc:"Dashboard que detecta cambios normativos relevantes para el MEF, materias afectadas y procesos que deben revisarse.",icon:"🔔",c:C.amber},
        ].map((d,i)=>(
          <div key={i} style={{background:C.card,borderRadius:8,padding:"12px 14px",
            border:`1px solid ${d.c}25`}}>
            <div style={{fontSize:20,marginBottom:4}}>{d.icon}</div>
            <div style={{fontSize:9.5,fontWeight:700,color:d.c}}>{d.n}</div>
            <div style={{fontSize:12,fontWeight:700,color:C.navy,marginBottom:4}}>{d.t}</div>
            <div style={{fontSize:10,color:C.textDim,lineHeight:1.45}}>{d.desc}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{background:C.panel,borderRadius:10,padding:"14px 18px",
      border:`1px solid ${C.border}`}}>
      <div style={{fontSize:11.5,fontWeight:700,color:C.navy,marginBottom:10}}>
        Cambios regulatorios recientes — Ecuador
      </div>
      {[
        {f:"Ene 2025",a:"Gobierno Territorial",n:"COOTAD reforma",d:"Nuevo modelo distribución transferencias GADs",niv:"crítico"},
        {f:"Oct 2024",a:"Contratación Pública",n:"Catálogo SERCOP",d:"Servicios IA y GovTech incorporados al catálogo normalizado",niv:"alto"},
        {f:"Mar 2024",a:"Contratación Pública",n:"LOSNCP reforma",d:"Nuevos umbrales contratación directa",niv:"crítico"},
        {f:"Nov 2023",a:"Ambiente / Inversión",n:"AM 063/2023 MAATE",d:"Reglamento CC y NDC Ecuador",niv:"medio"},
        {f:"Jul 2021",a:"Finanzas Públicas",n:"COPYFP reforma",d:"Nuevas reglas fiscales post-COVID",niv:"medio"},
      ].map((r,i)=>{
        const ns=nStyle[r.niv];
        const ac=aStyle[r.a]||C.slate;
        return (
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",
            borderBottom:i<4?`1px solid ${C.border}`:"none"}}>
            <span style={{fontSize:10,fontWeight:600,color:C.blue,minWidth:55}}>{r.f}</span>
            <Tag text={r.a} color={ac}/>
            <span style={{fontSize:10,fontWeight:600,color:C.navy,minWidth:120}}>{r.n}</span>
            <span style={{fontSize:10,color:C.textDim,flex:1}}>{r.d}</span>
            <Pill text={r.niv} color={ns.color} bg={ns.bg} xs/>
          </div>
        );
      })}
    </div>
  </div>
);

// ── REGISTRO ──────────────────────────────────────────────────────────────────
const Registro=()=>{
  const [sel,setSel]=useState(null);
  const [filtro,setFiltro]=useState("Todas");
  const areas=["Todas",...new Set(NORMAS.map(n=>n.area))];
  const data=filtro==="Todas"?NORMAS:NORMAS.filter(n=>n.area===filtro);
  return (
    <div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
        {areas.map(a=>{
          const ac=aStyle[a]||C.navy;
          return (
            <button key={a} onClick={()=>setFiltro(a)}
              style={{background:filtro===a?ac:C.slateL,color:filtro===a?"#fff":C.slate,
                border:`1px solid ${filtro===a?ac:C.border}`,borderRadius:20,
                padding:"3px 12px",fontSize:9.5,fontWeight:600,
                cursor:"pointer",fontFamily:"inherit"}}>{a}</button>
          );
        })}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {data.map(n=>{
          const es=eStyle[n.estado]||eStyle.vigente;
          const ac=aStyle[n.area]||C.navy;
          const isOpen=sel===n.id;
          return (
            <div key={n.id} onClick={()=>setSel(isOpen?null:n.id)}
              style={{background:C.panel,border:`1px solid ${isOpen?ac:C.border}`,
                borderRadius:10,padding:"12px 14px",cursor:"pointer",
                boxShadow:isOpen?`0 4px 14px ${ac}18`:"0 1px 4px rgba(0,0,0,0.05)",
                transition:"all 0.15s"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:5}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:6,marginBottom:3,flexWrap:"wrap",alignItems:"center"}}>
                    <Tag text={n.tipo} color={ac}/>
                    <Tag text={n.area} color={ac}/>
                    <Pill text={es.label} color={es.color} bg={es.bg} xs/>
                    {n.alerta&&<Pill text="⚠ Alerta" color={C.amber} bg={C.amberL} xs/>}
                  </div>
                  <div style={{fontSize:13,fontWeight:700,color:C.navy,marginBottom:1}}>{n.numero}</div>
                  <div style={{fontSize:11,color:C.textDim}}>{n.nombre}</div>
                </div>
                <span style={{fontSize:9.5,color:C.textFaint,flexShrink:0}}>{n.ultima_mod.slice(0,7)}</span>
              </div>
              <div style={{display:"flex",gap:3,flexWrap:"wrap",alignItems:"center"}}>
                {n.organismos.map((o,i)=>(
                  <span key={i} style={{background:C.slateL,color:C.slate,
                    borderRadius:3,padding:"1px 6px",fontSize:9}}>{o}</span>
                ))}
              </div>
              {isOpen&&(
                <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
                  <p style={{fontSize:11,color:C.textDim,lineHeight:1.6,marginBottom:10}}>{n.desc}</p>
                  {n.alerta&&(
                    <div style={{background:C.amberL,border:`1px solid ${C.amber}35`,
                      borderRadius:6,padding:"7px 10px",marginBottom:10}}>
                      <div style={{fontSize:10.5,color:C.amber,fontWeight:600}}>{n.alerta}</div>
                    </div>
                  )}
                  {n.cambios?.length>0&&(
                    <div style={{marginBottom:10}}>
                      <div style={{fontSize:9.5,fontWeight:700,color:C.navy,
                        textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:5}}>Historial</div>
                      {n.cambios.map((c,i)=>(
                        <div key={i} style={{display:"flex",gap:8,background:C.slateL,
                          borderRadius:5,padding:"5px 8px",marginBottom:3}}>
                          <span style={{fontSize:10,fontWeight:600,color:C.blue,minWidth:55}}>{c.fecha}</span>
                          <span style={{fontSize:10,color:C.text}}>{c.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {n.pendientes?.length>0&&(
                    <div>
                      <div style={{fontSize:9.5,fontWeight:700,color:C.amber,
                        textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:5}}>Pendientes</div>
                      {n.pendientes.map((p,i)=>(
                        <div key={i} style={{display:"flex",gap:6,background:C.amberL,
                          borderRadius:5,padding:"5px 8px",marginBottom:3}}>
                          <span style={{color:C.amber}}>⏳</span>
                          <span style={{fontSize:10,color:C.text}}>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{marginTop:8,fontSize:9,color:C.textFaint}}>Fuente: {n.fuente}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── CLASIFICADOR ──────────────────────────────────────────────────────────────
const Clasificador=()=>{
  const [texto,setTexto]=useState("");
  const [res,setRes]=useState(null);
  const [loading,setLoading]=useState(false);
  const [ej,setEj]=useState(null);

  const clasificar=async(t)=>{
    const txt=t||texto; if(!txt.trim()||loading) return;
    setLoading(true); setRes(null);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,
          system:`Eres un clasificador de documentos normativos y administrativos para Ecuador. Contexto: corpus MEF Ecuador (COPYFP, LOSNCP, COOTAD, LOEP, COPCI, CODA, TULSMA, normas CGE).
Devuelve SOLO un JSON:
{"tipo_norma":"Ley / Reglamento / Acuerdo Ministerial / Resolución / Procedimiento / Requisito / Otro","area":"Finanzas Públicas / Contratación Pública / Gobierno Territorial / Ambiente / Control Interno / Otro","organismo_competente":["array"],"procedimiento_afectado":"texto","requisitos":["array"],"plazos":["array"],"obligaciones":["array"],"riesgos":["array"],"norma_probable":"texto","nivel":"Constitucional / Legal / Reglamentario / Administrativo / Técnico","resumen":"una línea"}
Solo JSON, sin markdown.`,
          messages:[{role:"user",content:txt}]})
      });
      const d=await r.json();
      try{setRes(JSON.parse(d.content?.[0]?.text||"{}"));}
      catch{setRes({resumen:d.content?.[0]?.text||"Error.",error:true});}
    }catch{setRes({error:true,resumen:"Error de conexión."});}
    setLoading(false);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{background:C.blueL,borderRadius:10,padding:"12px 14px",
        border:`1px solid ${C.blue}25`}}>
        <div style={{fontSize:11,fontWeight:700,color:C.blue,marginBottom:3}}>
          Demo 2 — Clasificador de documentos normativos (Ecuador)
        </div>
        <div style={{fontSize:10.5,color:C.textDim,lineHeight:1.5}}>
          Pega el texto de una norma, resolución o procedimiento ecuatoriano. El sistema lo clasifica por tipo, área, organismo competente, requisitos, plazos y riesgos de incumplimiento.
        </div>
      </div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
        <span style={{fontSize:10,color:C.textDim,alignSelf:"center"}}>Ejemplos:</span>
        {EJEMPLOS.map((e,i)=>(
          <button key={i} onClick={()=>{setTexto(e.texto);setEj(i);}}
            style={{background:ej===i?C.navy:C.panel,color:ej===i?"#fff":C.textDim,
              border:`1px solid ${ej===i?C.navy:C.border}`,borderRadius:20,
              padding:"4px 12px",fontSize:9.5,cursor:"pointer",fontFamily:"inherit"}}>
            {e.label}
          </button>
        ))}
      </div>
      <div style={{background:C.panel,borderRadius:10,padding:"14px",border:`1px solid ${C.border}`}}>
        <textarea value={texto} onChange={e=>setTexto(e.target.value)}
          placeholder="Pega aquí el texto de la norma, resolución, procedimiento o requisito…"
          rows={5} style={{width:"100%",background:C.bg,border:`1px solid ${C.border2}`,
            borderRadius:7,padding:"10px",color:C.text,fontSize:11,
            resize:"vertical",lineHeight:1.5,fontFamily:"inherit",boxSizing:"border-box"}}/>
        <button onClick={()=>clasificar()} disabled={loading||!texto.trim()}
          style={{marginTop:10,background:loading||!texto.trim()?C.border:C.navy,
            border:"none",borderRadius:7,padding:"8px 20px",
            color:loading||!texto.trim()?C.textFaint:"#fff",
            fontSize:11,fontWeight:700,cursor:loading||!texto.trim()?"not-allowed":"pointer",
            fontFamily:"inherit"}}>
          {loading?"Clasificando…":"▶ Clasificar"}
        </button>
      </div>
      {res&&!res.error&&(
        <div style={{background:C.panel,borderRadius:10,padding:"16px",border:`1px solid ${C.green}40`}}>
          <div style={{fontSize:10.5,fontWeight:700,color:C.green,marginBottom:8}}>✅ Clasificación completada</div>
          <div style={{fontSize:12.5,fontWeight:700,color:C.navy,marginBottom:12}}>{res.resumen}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:8}}>
            {[["Tipo",res.tipo_norma,C.blue],["Área",res.area,C.teal],
              ["Norma probable",res.norma_probable,C.navy],["Nivel jerárquico",res.nivel,C.slate]].map(([k,v,c])=>(
              <div key={k} style={{background:C.card,borderRadius:6,padding:"7px 10px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:8,color:C.textFaint,marginBottom:2}}>{k}</div>
                <div style={{fontSize:10.5,color:c,fontWeight:600}}>{v||"—"}</div>
              </div>
            ))}
          </div>
          {[["Organismos",res.organismo_competente,C.navy],["Requisitos",res.requisitos,C.blue],
            ["Plazos",res.plazos,C.amber],["Obligaciones",res.obligaciones,C.teal],
            ["Riesgos",res.riesgos,C.red]].map(([k,v,c])=>
            v?.length>0&&(
              <div key={k} style={{marginBottom:7,background:C.card,borderRadius:6,
                padding:"7px 10px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:8,color:C.textFaint,marginBottom:4}}>{k}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                  {v.map((x,i)=><Pill key={i} text={x} color={c} xs/>)}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

// ── ALERTAS ───────────────────────────────────────────────────────────────────
const Alertas=()=>(
  <div style={{display:"flex",flexDirection:"column",gap:8}}>
    {ALERTAS.map(a=>{
      const ns=nStyle[a.nivel];
      const ac=aStyle[a.area]||C.slate;
      return (
        <div key={a.id} style={{background:C.panel,border:`1px solid ${ns.color}30`,
          borderRadius:10,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
          <div style={{background:ns.bg,padding:"7px 14px",
            display:"flex",alignItems:"center",gap:7}}>
            <Pill text={a.nivel.toUpperCase()} color={ns.color} bg={ns.bg} xs/>
            <Tag text={a.area} color={ac}/>
            <span style={{marginLeft:"auto",fontSize:9.5,color:ns.color,fontWeight:600}}>
              {a.fecha.slice(0,7)}
            </span>
          </div>
          <div style={{padding:"10px 14px"}}>
            <div style={{fontSize:12.5,fontWeight:700,color:C.navy,marginBottom:4}}>{a.titulo}</div>
            <div style={{fontSize:10.5,color:C.textDim,lineHeight:1.55,marginBottom:7}}>{a.desc}</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              <Tag text={a.norma} color={C.blue}/>
              <Pill text={`Impacto ${a.impacto}`} color={ns.color} bg={ns.bg} xs/>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

// ── FUENTES ───────────────────────────────────────────────────────────────────
const Fuentes=()=>{
  const [fuentes,setFuentes]=useState(FUENTES);
  const [showAdd,setShowAdd]=useState(false);
  const [nueva,setNueva]=useState({nombre:"",url:"",tipo:"Portal institucional",desc:""});
  const [adding,setAdding]=useState(false);

  const agregar=()=>{
    if(!nueva.nombre||!nueva.url) return;
    setAdding(true);
    setTimeout(()=>{
      setFuentes(p=>[...p,{id:`F${String(p.length+1).padStart(3,"0")}`,
        ...nueva,estado:"configurando",ultima_rev:"—",frecuencia:"Diaria",n_indexadas:0,pais:"EC"}]);
      setNueva({nombre:"",url:"",tipo:"Portal institucional",desc:""});
      setShowAdd(false); setAdding(false);
    },800);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:12,fontWeight:700,color:C.navy}}>Fuentes de monitoreo — Ecuador</div>
          <div style={{fontSize:10,color:C.textDim}}>
            {fuentes.filter(f=>f.estado==="activa").length} activas · {fuentes.length} configuradas
          </div>
        </div>
        <button onClick={()=>setShowAdd(!showAdd)}
          style={{background:C.navy,border:"none",borderRadius:7,
            padding:"7px 14px",color:"#fff",fontSize:11,fontWeight:700,
            cursor:"pointer",fontFamily:"inherit"}}>
          {showAdd?"Cancelar":"+ Agregar fuente"}
        </button>
      </div>
      {showAdd&&(
        <div style={{background:C.blueL,borderRadius:10,padding:"16px",border:`1px solid ${C.blue}30`}}>
          <div style={{fontSize:11,fontWeight:700,color:C.blue,marginBottom:12}}>Nueva fuente en línea</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
            {[["Nombre","nombre","text"],["URL","url","url"]].map(([l,f,t])=>(
              <div key={f}>
                <div style={{fontSize:9.5,color:C.textDim,marginBottom:4}}>{l}</div>
                <input type={t} value={nueva[f]}
                  onChange={e=>setNueva(p=>({...p,[f]:e.target.value}))}
                  placeholder={f==="url"?"https://…":""}
                  style={{width:"100%",background:C.panel,border:`1px solid ${C.border2}`,
                    borderRadius:6,padding:"7px 10px",color:C.text,fontSize:11,
                    fontFamily:"inherit",boxSizing:"border-box"}}/>
              </div>
            ))}
          </div>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:9.5,color:C.textDim,marginBottom:4}}>Tipo</div>
            <select value={nueva.tipo} onChange={e=>setNueva(p=>({...p,tipo:e.target.value}))}
              style={{background:C.panel,border:`1px solid ${C.border2}`,borderRadius:6,
                padding:"7px 10px",color:C.text,fontSize:11,fontFamily:"inherit",width:"100%"}}>
              {["Portal institucional","Diario oficial","Organismo técnico","Organismo fiscalizador",
                "Base de datos","API","Repositorio jurídico"].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:9.5,color:C.textDim,marginBottom:4}}>Descripción</div>
            <input value={nueva.desc} onChange={e=>setNueva(p=>({...p,desc:e.target.value}))}
              placeholder="Qué contiene esta fuente"
              style={{width:"100%",background:C.panel,border:`1px solid ${C.border2}`,
                borderRadius:6,padding:"7px 10px",color:C.text,fontSize:11,
                fontFamily:"inherit",boxSizing:"border-box"}}/>
          </div>
          <button onClick={agregar} disabled={adding||!nueva.nombre||!nueva.url}
            style={{background:adding||!nueva.nombre||!nueva.url?C.border:C.teal,
              border:"none",borderRadius:7,padding:"8px 18px",
              color:adding||!nueva.nombre||!nueva.url?C.textFaint:"#fff",
              fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
            {adding?"Agregando…":"✓ Agregar fuente"}
          </button>
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {fuentes.map(f=>{
          const es=eStyle[f.estado]||eStyle.activa;
          return (
            <div key={f.id} style={{background:C.panel,borderRadius:10,
              padding:"12px 14px",border:`1px solid ${C.border}`,
              boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:6,marginBottom:4,flexWrap:"wrap",alignItems:"center"}}>
                    <Pill text={es.label} color={es.color} bg={es.bg} xs/>
                    <Tag text={f.tipo} color={C.slate}/>
                    {f.n_indexadas>0&&(
                      <span style={{fontSize:9,color:C.green,fontWeight:600}}>
                        📋 {f.n_indexadas} normas
                      </span>
                    )}
                  </div>
                  <div style={{fontSize:12,fontWeight:700,color:C.navy,marginBottom:2}}>{f.nombre}</div>
                  <div style={{marginBottom:4}}>
                    <a href={f.url} target="_blank" rel="noreferrer"
                      style={{fontSize:10,color:C.blue,textDecoration:"none"}}>{f.url} ↗</a>
                  </div>
                  {f.desc&&<div style={{fontSize:10,color:C.textDim,lineHeight:1.4}}>{f.desc}</div>}
                  {f.ultima_rev!=="—"&&(
                    <div style={{fontSize:9,color:C.textFaint,marginTop:4}}>
                      Última revisión: {f.ultima_rev} · Frecuencia: {f.frecuencia}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{background:C.amberL,borderRadius:8,padding:"10px 14px",border:`1px solid ${C.amber}30`}}>
        <div style={{fontSize:10,fontWeight:600,color:C.amber,marginBottom:3}}>
          Nota de piloto
        </div>
        <div style={{fontSize:9.5,color:C.textDim,lineHeight:1.5}}>
          En la etapa de diagnóstico del piloto, Titania trabajaría con el MEF para definir cuáles fuentes priorizar, cómo acceder a ellas y qué taxonomía aplicar para el corpus inicial. El primer paso formal es la firma del NDA.
        </div>
      </div>
    </div>
  );
};

// ── CHAT ──────────────────────────────────────────────────────────────────────
const SUGGS=[
  "¿Qué norma regula las transferencias a los GADs?",
  "¿Qué cambió en la LOSNCP con la reforma 2024?",
  "¿Qué requisitos exige el CODA para un proyecto de inversión pública?",
  "¿Cómo aplica el catálogo SERCOP a la contratación de servicios de IA?",
  "¿Qué haría Titania en las primeras 4 semanas del piloto?",
  "¿Qué normas afectan la liquidación presupuestaria mensual?",
];
const SRCS={
  "COOTAD":["COOTAD reforma 2025","MEF","CONGOPE"],
  "LOSNCP":["LOSNCP reforma 2024","Regl. DE 588","SERCOP"],
  "COPYFP":["COPYFP 2010","MEF — SINFIP"],
  "CODA":["CODA 2017","TULSMA","MAATE"],
  "SERCOP":["Catálogo SERCOP oct.2024","RE-SERCOP-2024-0046"],
  "piloto":["Metodología Titania","Levantamiento MEF Ecuador"],
  "presupuest":["COPYFP","Clasificador Presupuestario AM 067"],
  "GAD":["COOTAD reforma 2025","MEF"],
};
const inferSources=(q,a)=>{
  const combined=(q+" "+a).toLowerCase();
  const found=new Set();
  Object.entries(SRCS).forEach(([k,v])=>{
    if(combined.includes(k.toLowerCase())) v.forEach(s=>found.add(s));
  });
  return found.size>0?[...found].slice(0,4):null;
};

const Msg=({msg,isLatest})=>{
  const u=msg.role==="user";
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:u?"flex-end":"flex-start",
      marginBottom:6,animation:isLatest?"fadeUp 0.2s ease":"none"}}>
      {!u&&(
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
          <div style={{width:22,height:22,borderRadius:5,background:C.navy,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:9,fontWeight:900,color:C.amber}}>⚡</div>
          <span style={{fontSize:9,color:C.navy,fontWeight:700}}>Asistente RegWatch · Ecuador</span>
        </div>
      )}
      <div style={{maxWidth:"90%",background:u?C.navy:C.panel,
        border:`1px solid ${u?"transparent":C.border}`,
        borderRadius:u?"14px 14px 4px 14px":"4px 14px 14px 14px",
        padding:"10px 13px",fontSize:11.5,color:u?"#fff":C.text,lineHeight:1.65,
        whiteSpace:"pre-wrap",boxShadow:u?"none":"0 1px 4px rgba(0,0,0,0.06)"}}>
        {msg.content}
      </div>
      {msg.sources&&(
        <div style={{maxWidth:"90%",marginTop:3,padding:"4px 8px",
          background:C.blueL,border:`1px solid ${C.blue}20`,borderRadius:6,
          display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:8,color:C.blue,fontWeight:700}}>📎 Fuentes:</span>
          {msg.sources.map((s,i)=><Tag key={i} text={s} color={C.blue}/>)}
        </div>
      )}
    </div>
  );
};
const Dots=()=>(
  <div style={{display:"flex",alignItems:"center",gap:6,paddingBottom:8}}>
    <div style={{width:22,height:22,borderRadius:5,background:C.navy,
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:9,fontWeight:900,color:C.amber}}>⚡</div>
    <div style={{display:"flex",gap:4,padding:"8px 12px",background:C.panel,
      border:`1px solid ${C.border}`,borderRadius:"4px 14px 14px 14px"}}>
      {[0,1,2].map(i=>(
        <div key={i} style={{width:6,height:6,borderRadius:"50%",background:C.navy,
          animation:`bounce 1.2s ease ${i*0.15}s infinite`}}/>
      ))}
    </div>
  </div>
);

const TABS=[["dashboard","Dashboard"],["registro","Registro"],
  ["clasificador","Clasificador"],["alertas","Alertas"],["fuentes","Fuentes"]];

export default function App(){
  const [activeTab,setActiveTab]=useState("dashboard");
  const [showOb,setShowOb]=useState(true);
  const [msgs,setMsgs]=useState([{role:"assistant",
    content:`Hola. Soy el Asistente de Inteligencia Regulatoria de RegWatch Ecuador.

Tengo acceso al corpus normativo relevante para el Ministerio de Economía y Finanzas: ${NORMAS.length} normas indexadas desde el Registro Oficial, MEF, SERCOP, Contraloría y MAATE.

**Alertas activas:**
🔴 Reforma COOTAD ene.2025: nuevo modelo de transferencias a GADs
🔴 Reforma LOSNCP 2024: nuevos umbrales — reglamento actualizado pendiente
⚠️ Catálogo SERCOP oct.2024: servicios de IA y GovTech ya son contratables

Puedo ayudarte a buscar qué norma aplica a un trámite, interpretar cambios recientes y comparar procedimientos. ¿Qué necesitas consultar?`}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  const inputRef=useRef(null);

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"})},[msgs,loading]);

  const send=async(text)=>{
    const m=text||input.trim(); if(!m||loading) return;
    setInput("");
    const nm=[...msgs,{role:"user",content:m}];
    setMsgs(nm); setLoading(true);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:900,
          system:SYS,messages:nm.map(x=>({role:x.role,content:x.content}))})
      });
      const d=await r.json();
      const reply=d.content?.[0]?.text||"Error.";
      setMsgs(p=>[...p,{role:"assistant",content:reply,sources:inferSources(m,reply)}]);
    }catch{setMsgs(p=>[...p,{role:"assistant",content:"Error de conexión."}]);}
    setLoading(false); inputRef.current?.focus();
  };

  return (
    <div style={{display:"flex",height:"100vh",background:C.bg,
      fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",color:C.text,overflow:"hidden"}}>
      {/* ONBOARDING MODAL — renders over any tab */}
      {showOb && <Onboarding onClose={()=>setShowOb(false)}/>}
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${C.border2};border-radius:3px}
        textarea:focus,button:focus,select:focus,input:focus{outline:none}*{box-sizing:border-box}
      `}</style>

      {/* SIDEBAR */}
      <div style={{width:235,flexShrink:0,background:C.navy,
        display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"18px 16px 14px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
          <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:5}}>
            <div style={{width:32,height:32,borderRadius:8,background:C.amber,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:15,fontWeight:900,color:"#fff"}}>⚡</div>
            <div>
              <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>RegWatch</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.4)"}}>Inteligencia Regulatoria IA</div>
            </div>
          </div>
          <div style={{background:"rgba(255,255,255,0.06)",borderRadius:6,padding:"6px 10px",marginTop:6}}>
            <div style={{fontSize:9.5,fontWeight:700,color:"rgba(255,255,255,0.7)"}}>
              🇪🇨 Ecuador — MEF
            </div>
            <div style={{fontSize:8.5,color:"rgba(255,255,255,0.35)"}}>
              Ministerio de Economía y Finanzas
            </div>
          </div>
        </div>
        <div style={{padding:"10px 10px 0"}}>
          {TABS.map(([k,l])=>(
            <button key={k} onClick={()=>setActiveTab(k)} style={{
              display:"block",width:"100%",textAlign:"left",
              padding:"8px 12px",borderRadius:7,marginBottom:2,
              background:activeTab===k?"rgba(255,255,255,0.12)":"transparent",
              border:activeTab===k?"1px solid rgba(255,255,255,0.14)":"1px solid transparent",
              color:activeTab===k?"#fff":"rgba(255,255,255,0.45)",
              fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",
            }}>
              {{"dashboard":"📊","registro":"📋","clasificador":"🗂","alertas":"🔔","fuentes":"🔗"}[k]} {l}
            </button>
          ))}
        </div>
        <div style={{margin:"14px 10px",background:"rgba(201,113,10,0.15)",
          border:"1px solid rgba(201,113,10,0.3)",borderRadius:7,padding:"9px 12px"}}>
          <div style={{fontSize:9,color:C.amber,fontWeight:700,marginBottom:4}}>
            🔴 {ALERTAS.filter(a=>a.nivel==="crítico").length} crítica ·
            ⚠️ {ALERTAS.filter(a=>a.nivel==="alto").length} altas
          </div>
          {ALERTAS.filter(a=>a.nivel==="crítico").map(a=>(
            <div key={a.id} style={{fontSize:8.5,color:"rgba(255,255,255,0.5)",
              lineHeight:1.3,marginBottom:2}}>• {a.titulo.slice(0,42)}…</div>
          ))}
        </div>
        <div style={{marginTop:"auto",padding:"10px 14px",
          borderTop:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{fontSize:8.5,color:"rgba(255,255,255,0.2)",lineHeight:1.5}}>
            Piloto Titania × MEF Ecuador<br/>
            {NORMAS.length} normas · {FUENTES.filter(f=>f.estado==="activa").length} fuentes activas<br/>
            Titania SpA · titan-ia.com
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"12px 18px",background:C.panel,
          borderBottom:`1px solid ${C.border}`,
          display:"flex",alignItems:"center",gap:12,flexShrink:0,
          boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
          <div>
            <div style={{fontSize:14,fontWeight:800,color:C.navy}}>
              {{"dashboard":"Dashboard","registro":"Registro Normativo",
                "clasificador":"Clasificador de Documentos","alertas":"Alertas",
                "fuentes":"Gestión de Fuentes"}[activeTab]}
            </div>
            <div style={{fontSize:9.5,color:C.textFaint}}>
              Marco normativo MEF Ecuador · {NORMAS.length} normas · {ALERTAS.length} alertas
            </div>
          </div>
          <div style={{marginLeft:"auto",display:"flex",gap:6,alignItems:"center"}}>
            <button onClick={()=>setShowOb(true)}
              style={{background:C.slateL,border:`1px solid ${C.border}`,
                borderRadius:20,padding:"3px 12px",color:C.slate,
                fontSize:9.5,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
              ¿Cómo funciona?
            </button>
            <div style={{background:C.greenL,border:`1px solid ${C.green}30`,
              borderRadius:20,padding:"3px 10px",fontSize:10,color:C.green,
              fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:C.green}}/>
              En línea
            </div>
          </div>
        </div>

        <div style={{flex:1,display:"flex",overflow:"hidden"}}>
          <div style={{flex:1,overflowY:"auto",padding:"18px 20px"}}>
            {activeTab==="dashboard"    && <Dashboard/>}
            {activeTab==="registro"     && <Registro/>}
            {activeTab==="clasificador" && <Clasificador/>}
            {activeTab==="alertas"      && <Alertas/>}
            {activeTab==="fuentes"      && <Fuentes/>}
          </div>

          {/* CHAT */}
          <div style={{width:330,flexShrink:0,borderLeft:`1px solid ${C.border}`,
            background:C.bg,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <div style={{padding:"12px 14px",background:C.panel,
              borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
              <div style={{fontSize:11.5,fontWeight:700,color:C.navy}}>Asistente Normativo IA</div>
              <div style={{fontSize:9,color:C.textFaint}}>Respuestas trazadas a fuente · Marco MEF Ecuador</div>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"12px 12px 6px"}}>
              {msgs.map((m,i)=><Msg key={i} msg={m} isLatest={i===msgs.length-1}/>)}
              {loading&&<Dots/>}
              <div ref={bottomRef}/>
            </div>
            {msgs.length<=2&&!loading&&(
              <div style={{padding:"0 10px 8px",display:"flex",gap:4,flexWrap:"wrap"}}>
                {SUGGS.map((s,i)=>(
                  <button key={i} onClick={()=>send(s)} style={{
                    background:C.panel,border:`1px solid ${C.border}`,color:C.textDim,
                    borderRadius:14,padding:"3px 9px",fontSize:9,cursor:"pointer",fontFamily:"inherit"}}
                    onMouseEnter={e=>{e.target.style.borderColor=C.navy;e.target.style.color=C.navy;}}
                    onMouseLeave={e=>{e.target.style.borderColor=C.border;e.target.style.color=C.textDim;}}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div style={{padding:"6px 10px 10px",borderTop:`1px solid ${C.border}`,
              background:C.panel,flexShrink:0}}>
              <div style={{display:"flex",gap:6,alignItems:"flex-end",
                background:C.bg,border:`2px solid ${C.border2}`,borderRadius:9,padding:"7px 9px"}}>
                <textarea ref={inputRef} value={input}
                  onChange={e=>setInput(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
                  placeholder="Consulta sobre normativa MEF Ecuador…"
                  rows={1} disabled={loading}
                  style={{flex:1,background:"transparent",border:"none",color:C.text,
                    fontSize:11,resize:"none",lineHeight:1.5,fontFamily:"inherit",
                    maxHeight:80,overflow:"auto"}}/>
                <button onClick={()=>send()} disabled={loading||!input.trim()}
                  style={{background:loading||!input.trim()?C.border:C.navy,
                    border:"none",borderRadius:6,width:28,height:28,cursor:"pointer",
                    color:loading||!input.trim()?C.textFaint:"#fff",
                    fontSize:13,fontWeight:800,flexShrink:0,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>↑</button>
              </div>
              <div style={{fontSize:8.5,color:C.textFaint,marginTop:4}}>
                Respuestas con trazabilidad · Enter enviar
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
