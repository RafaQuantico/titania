// ── PALETTE ─────────────────────────────────────────────────────────────────
export const T_PALETTE = {
  bg:        "#07090F",
  panel:     "#0C0F18",
  surface:   "#111620",
  card:      "#161D2C",
  border:    "#1C2438",
  border2:   "#243050",
  teal:      "#00D4D4",
  tealDim:   "#003A3A80",
  tealGlow:  "#00D4D420",
  blue:      "#4A9FFF",
  blueDim:   "#0A1E3A",
  green:     "#2ECC71",
  greenDim:  "#0A2A1A",
  red:       "#FF4040",
  redDim:    "#2A0A0A",
  orange:    "#FF8C00",
  orangeDim: "#2A1800",
  yellow:    "#FFD700",
  yellowDim: "#2A2200",
  purple:    "#9B59B6",
  purpleDim: "#1A0A2A",
  text:      "#D0DCF0",
  textDim:   "#6A82A8",
  textFaint: "#2E3A50",
};

export const riesgoStyle = {
  "crítico": { color:T_PALETTE.red, bg:T_PALETTE.redDim },
  "alto":    { color:T_PALETTE.orange, bg:T_PALETTE.orangeDim },
  "medio":   { color:T_PALETTE.yellow, bg:T_PALETTE.yellowDim },
  "referencia":{ color:T_PALETTE.green, bg:T_PALETTE.greenDim },
};

export const gravStyle = {
  "crítica":  { color:T_PALETTE.red, bg:T_PALETTE.redDim },
  "crítica en Valparaíso/Coquimbo": { color:T_PALETTE.orange, bg:T_PALETTE.orangeDim },
  "alta":  { color:T_PALETTE.orange, bg:T_PALETTE.orangeDim },
  "media": { color:T_PALETTE.yellow, bg:T_PALETTE.yellowDim },
};

// ── CORPUS DATA ──────────────────────────────────────────────────────────────
export const PROYECTOS = [
  {
    id:"P-HUQ", nombre:"Sistema Huaquén", short:"Huaquén",
    titular:"GW La Ligua SpA", instrumento:"EIA", region:"Valparaíso",
    sector:"Agua Industrial/APR", inversion:119, capacidad:240,
    estado:"En evaluación", ingreso:"Jun 2024",
    icsara1:79, icsara2:null, persistencia:null,
    riesgo:"alto",
    flag_especial:"🔴 GHPPI Diaguita Araya Araya — Cerro Sisilly y ruta trashumancia",
    color: T_PALETTE.orange,
  },
  {
    id:"P-ACO", nombre:"Planta Desaladora Aconcagua", short:"Aconcagua",
    titular:"Aguas Pacífico S.A.", instrumento:"EIA", region:"Valparaíso",
    sector:"Agua Potable", inversion:220, capacidad:1000,
    estado:"En evaluación", ingreso:"2023",
    icsara1:187, icsara2:67, persistencia:36,
    riesgo:"alto",
    flag_especial:"⚠ Efectos acumulativos con Ventanas N°3 en Bahía Quintero",
    color: T_PALETTE.orange,
  },
  {
    id:"P-COQ", nombre:"Desaladora de Coquimbo", short:"Coquimbo",
    titular:"MOP / Sacyr Agua", instrumento:"EIA", region:"Coquimbo",
    sector:"Agua Potable", inversion:200, capacidad:1200,
    estado:"En evaluación — CONCESIÓN SIN RCA", ingreso:"2022",
    icsara1:155, icsara2:111, persistencia:72,
    riesgo:"crítico",
    flag_especial:"🔴 CRÍTICO: Concesión MOP adjudicada a Sacyr sin RCA vigente",
    color: T_PALETTE.red,
  },
  {
    id:"P-ARI", nombre:"Desaladora Arica", short:"Arica",
    titular:"Aguas del Altiplano S.A.", instrumento:"EIA", region:"Arica y Parinacota",
    sector:"Agua Potable", inversion:65, capacidad:300,
    estado:"En evaluación", ingreso:"Abr 2024",
    icsara1:15, icsara2:15, persistencia:100,
    riesgo:"medio",
    flag_especial:"⚠ Persistencia 100%: mismas observaciones sin resolver entre ICSARA 1 y 2",
    color: T_PALETTE.yellow,
  },
  {
    id:"P-APN", nombre:"Ampliación Planta Desaladora Norte", short:"Amp. Norte (benchmark)",
    titular:"Aguas Antofagasta S.A.", instrumento:"DIA", region:"Antofagasta",
    sector:"Agua Potable", inversion:85, capacity:450,
    capacidad:450,
    estado:"APROBADA — nov. 2021", ingreso:"2019",
    icsara1:4, icsara2:null, persistencia:0,
    riesgo:"referencia",
    flag_especial:"✅ Único proyecto aprobado del corpus — referencia de estándar alcanzable",
    color: T_PALETTE.green,
  },
  {
    id:"P-CRB", nombre:"Planta Desaladora Cerro Blanco", short:"Cerro Blanco",
    titular:"Atacama Sur SpA", instrumento:"EIA", region:"Atacama",
    sector:"Agua Industrial", inversion:140, capacidad:580,
    estado:"RECHAZADA — dic. 2020", ingreso:"2018",
    icsara1:null, icsara2:null, persistencia:null,
    riesgo:"referencia",
    flag_especial:"🔴 Rechazado: biota marina + medio humano no resueltos + GHPPI Diaguita Chipasse",
    color: T_PALETTE.red,
  },
];

export const OAECAS = [
  {
    id:"SUBPESCA", nombre:"SUBPESCA / SERNAPESCA", cobertura:94,
    criterios:[
      { req:"Captación ≥ 20 m profundidad", obs:"Proyectos proponen 10–14 m", impacto:"crítico", brecha:"Rediseño obra de toma → +US$2–5M CAPEX" },
      { req:"Cortina de microburbujas en captación", obs:"No contemplada en DIA/EIA base", impacto:"crítico", brecha:"+US$1–3M CAPEX; persiste en ICSARA 2 en 78% de proyectos" },
      { req:"Velocidad filtración ≤ 0.1 m/s", obs:"Proponen 0.3–0.5 m/s", impacto:"alto", brecha:"Incompatible con larvas de peces y huevos pelágicos" },
      { req:"Modelo dispersión pluma salmuera validado en terreno", obs:"Solo modelos numéricos sin campaña in situ", impacto:"alto", brecha:"Exige campaña oceanográfica adicional — 6–12 meses" },
      { req:"Plan de monitoreo AMERB en área de influencia", obs:"Ausente o genérico en 70% de EIAs", impacto:"medio", brecha:"Coordinación obligatoria con sindicatos AMERB" },
    ],
    riesgo_plazo:"18–36 meses adicionales si no se subsana en Adenda 1",
    color: T_PALETTE.blue,
  },
  {
    id:"CONAF", nombre:"CONAF", cobertura:78,
    criterios:[
      { req:"Delimitación correcta de Bosque Nativo Protegido (BNP)", obs:"Separación artificial de parches continuos", impacto:"crítico", brecha:"610 menciones en corpus; puede exigir rediseño de trazados" },
      { req:"Modelo de afectación de raíces (túneles y zanjeo)", obs:"Ausente o superficial en 65% de DIA/EIA", impacto:"alto", brecha:"Exige estudio dendrocronológico específico" },
      { req:"Temporada correcta de muestreo florístico", obs:"Muestreos en época de sequía sin herbáceas", impacto:"alto", brecha:"Muestreo primaveral obligatorio → retraso 6–12 meses" },
      { req:"Plan de manejo de vegetación nativa en fajas de servidumbre", obs:"Solo se habla de revegetación post-obra", impacto:"medio", brecha:"CONAF exige aprobación previa, no solo compromiso" },
    ],
    riesgo_plazo:"Puede obligar rediseño de trazado de aducción o emisario",
    color: T_PALETTE.green,
  },
  {
    id:"CMN", nombre:"CMN", cobertura:75,
    criterios:[
      { req:"Programa de Monitoreo Arqueológico (PMA) antes de obras", obs:"Solo se compromete PMA sin diseño aprobado previo", impacto:"crítico", brecha:"300+ menciones en corpus; CMN exige aprobación del PMA antes de inicio de obras" },
      { req:"Arqueólogo permanente en obra", obs:"Solo supervisor a demanda", impacto:"alto", brecha:"+US$500k–1M costo adicional; persiste en ICSARA 2 en 60% de proyectos" },
      { req:"Prospección submarina en trazado emisario", obs:"Solo prospección terrestre", impacto:"alto", brecha:"Requiere buzo arqueólogo certificado — metodología escasa en Chile" },
      { req:"Consulta a comunidades sobre bienes culturales", obs:"CMN actúa de oficio sin coordinación con titular", impacto:"medio", brecha:"26 observaciones CMN solo en ICSARA 1 Coquimbo" },
    ],
    riesgo_plazo:"+US$500k–1M y 6–18 meses adicionales",
    color: T_PALETTE.purple,
  },
  {
    id:"CONADI", nombre:"CONADI", cobertura:45,
    criterios:[
      { req:"Identificación de grupos humanos pertenecientes a pueblos indígenas (GHPPI) en área de influencia directa e indirecta", obs:"Área de influencia subdimensionada para comunidades Diaguita y Chango", impacto:"crítico", brecha:"Activación Consulta Indígena Art. 85 RSEIA — agrega 12–24 meses al proceso" },
      { req:"Análisis de afectación de sitios de significancia cultural indígena", obs:"Prospección etnográfica ausente o genérica", impacto:"crítico", brecha:"Huaquén: Cerro Sisilly y ruta trashumancia sagrada; Coquimbo: comunidades Diaguita" },
      { req:"Proceso de Consulta Previa bajo Convenio 169 OIT", obs:"No se activa en proyectos donde debería", impacto:"crítico", brecha:"El fallo CS Rol 5295-2022 (Pichidangui) reconoce derecho humano al agua — precedente aplicable" },
    ],
    riesgo_plazo:"Mayor riesgo regulatorio 2025–2026; puede paralizar proyectos en Valparaíso–Coquimbo",
    color: T_PALETTE.orange,
  },
  {
    id:"DGA", nombre:"DGA", cobertura:80,
    criterios:[
      { req:"Derecho de aprovechamiento de agua de mar — tramitación DGA costera", obs:"Titulares asumen libre disponibilidad del recurso", impacto:"alto", brecha:"Regulación difusa pre-LMAS N°21.770 (sept. 2025); reglamentos pendientes" },
      { req:"Modelación hidrogeológica de interacción agua marina–agua subterránea (captación por pozo de playa)", obs:"Solo en proyectos con pozo de playa; ausente en captación directa", impacto:"medio", brecha:"DGA exige demostrar no afectación de acuíferos costeros" },
      { req:"Balance hídrico que integre caudal captado y descarga de salmuera en columna de agua costera", obs:"Balance parcial sin modelación de gradiente salino", impacto:"medio", brecha:"Nueva Ley N°21.770 activa exigencias aún sin reglamentos definitivos" },
    ],
    riesgo_plazo:"Marco regulatorio en transición — LMAS 2025 crea incertidumbre nueva",
    color: T_PALETTE.teal,
  },
];

export const PERSISTENCIA_DATA = [
  { proyecto:"Aconcagua", eje:"Captación/descarga", i1:47, i2:17, pct:36 },
  { proyecto:"Aconcagua", eje:"Flora/BNP", i1:38, i2:14, pct:37 },
  { proyecto:"Aconcagua", eje:"Patrimonio CMN", i1:31, i2:12, pct:39 },
  { proyecto:"Aconcagua", eje:"PAS y permisos", i1:28, i2:8, pct:29 },
  { proyecto:"Aconcagua", eje:"Medio humano", i1:20, i2:6, pct:30 },
  { proyecto:"Aconcagua", eje:"Compatibilidad territorial", i1:23, i2:10, pct:43 },
  { proyecto:"Coquimbo", eje:"Flora/BNP", i1:48, i2:40, pct:83 },
  { proyecto:"Coquimbo", eje:"Patrimonio Diaguita", i1:42, i2:35, pct:83 },
  { proyecto:"Coquimbo", eje:"Captación/descarga", i1:30, i2:18, pct:60 },
  { proyecto:"Coquimbo", eje:"Medio humano", i1:22, i2:14, pct:64 },
  { proyecto:"Coquimbo", eje:"PAS y permisos", i1:13, i2:4, pct:31 },
  { proyecto:"Arica", eje:"Captación submarina", i1:7, i2:7, pct:100 },
  { proyecto:"Arica", eje:"PAS art. 101", i1:5, i2:5, pct:100 },
  { proyecto:"Arica", eje:"Permisos sectoriales", i1:3, i2:3, pct:100 },
];

export const RIESGOS = [
  { id:"R-001", categoria:"Legal/Contractual", nivel:"crítico",
    titulo:"Concesión MOP Coquimbo adjudicada sin RCA",
    descripcion:"El proyecto Desaladora de Coquimbo fue adjudicado en concesión a Sacyr Agua sin contar con RCA vigente. Si la evaluación arroja rechazo o modificaciones sustantivas, el contrato de concesión queda en el vacío regulatorio.",
    proyectos:["P-COQ"],
    accion:"Estructurar cláusula resolutoria de la concesión condicionada a RCA favorable; evaluar renegociación de términos.",
    jurisprudencia:"No existe precedente directo, pero el riesgo fiscal es de primer orden para el MOP.",
  },
  { id:"R-002", categoria:"Judicial", nivel:"crítico",
    titulo:"Revocación judicial post-RCA (doctrina Ventanas N°3)",
    descripcion:"La CS (Rol N°22.356-2021) revocó la RCA del proyecto Ventanas N°3 por calificación incorrecta como DIA en vez de EIA. La doctrina aplica como riesgo retroactivo a proyectos similares aprobados como DIA.",
    proyectos:["P-APN","P-COQ"],
    accion:"Verificar que proyectos DIA no superen los umbrales de generación de RCAS que los reclasifican como EIA obligatorio.",
    jurisprudencia:"CS Rol N°22.356-2021, agosto 2021. Aplicable a proyectos termoeléctricos y desaladoras de mediana escala.",
  },
  { id:"R-003", categoria:"Indígena", nivel:"crítico",
    titulo:"Consulta Indígena no activada en área Diaguita (Huaquén)",
    descripcion:"El proyecto Huaquén tiene impacto directo confirmado sobre la Comunidad Indígena Diaguita Araya Araya: aducción cruza el Cerro Sisilly (cerro sagrado) y ruta de trashumancia usada en ceremonias de agua. El proceso de consulta Art. 86 fue iniciado pero los compromisos no han sido resueltos.",
    proyectos:["P-HUQ"],
    accion:"Rediseño del trazado de la aducción para evitar el Cerro Sisilly; activar Mesa de Diálogo con comunidad antes de continuar tramitación.",
    jurisprudencia:"CS Rol N°5295-2022 (Pichidangui): reconoce derecho humano al agua y exige consulta previa efectiva.",
  },
  { id:"R-004", categoria:"Técnico", nivel:"alto",
    titulo:"Modelos de dispersión de salmuera sin validación empírica",
    descripcion:"El 100% de los proyectos con emisario submarino presenta modelos numéricos de dispersión sin campaña oceanográfica in situ para validación. SUBPESCA rechaza sistemáticamente estos modelos en todos los ICSARAs del corpus.",
    proyectos:["P-HUQ","P-ACO","P-COQ","P-ARI"],
    accion:"Campaña oceanográfica de línea de base estacional (mínimo 4 puntos × 4 campañas) antes de ingresar EIA o como compromiso Adenda 1.",
    jurisprudencia:"Criterio SUBPESCA consistente en 94% de pronunciamientos del corpus.",
  },
  { id:"R-005", categoria:"Técnico", nivel:"alto",
    titulo:"BNP subdimensionado — separación artificial de parches continuos",
    descripcion:"CONAF rechaza sistemáticamente la delimitación de Bosque Nativo Protegido en proyectos de Valparaíso y Coquimbo. Los titulares separan parches continuos para reducir la superficie afectada. Esta brecha es la más frecuente del corpus: 610 menciones.",
    proyectos:["P-HUQ","P-ACO","P-COQ"],
    accion:"Contratar profesional CONAF habilitado para delimitación de BNP antes del ingreso al SEIA; incluir modelo de raíces en el EIA base.",
    jurisprudencia:"No hay jurisprudencia específica pero el criterio CONAF es sostenido y consistente desde 2019.",
  },
  { id:"R-006", categoria:"Ambiental sistémico", nivel:"alto",
    titulo:"Efectos acumulativos de descargas en Bahía Quintero no evaluados",
    descripcion:"Los proyectos Ventanas N°3 y Aconcagua descargan en la misma masa de agua (Bahía Quintero). Ningún ICE del corpus evalúa la acumulación de descargas de salmuera de los 8+ proyectos activos en Antofagasta ni los efectos sinérgicos en Bahía Quintero.",
    proyectos:["P-ACO"],
    accion:"Evaluación ambiental estratégica del borde costero de Quintero-Puchuncaví como paso previo a cualquier nueva aprobación.",
    jurisprudencia:"NSCA Quintero-Puchuncaví (2019): zona de sacrificio ambiental declarada. SEA debe evaluar acumulación.",
  },
  { id:"R-007", categoria:"Regulatorio", nivel:"medio",
    titulo:"LMAS N°21.770 — reglamentos pendientes generan incertidumbre",
    descripcion:"La Ley de Marco de Autorizaciones Sectoriales publicada en septiembre 2025 afecta la tramitación de permisos sectoriales para desaladoras. Los reglamentos aún no están publicados, creando incertidumbre sobre qué permisos pueden obtenerse en paralelo con la RCA.",
    proyectos:["P-HUQ","P-ACO","P-COQ","P-ARI"],
    accion:"Monitoreo activo de publicación de reglamentos LMAS; estructurar cronograma de permisos sectoriales con holgura.",
    jurisprudencia:"Ley N°21.770, sept. 2025. Reglamentos estimados: Q2–Q3 2026.",
  },
];

export const BRECHAS_TECNICAS = [
  { id:"BT-001", componente:"Captación de agua de mar", gravedad:"crítica",
    descripcion:"Profundidad insuficiente en diseño de obra de toma (10–14 m propuesto vs. ≥20 m exigido por SUBPESCA)",
    frecuencia:"100% proyectos con captación directa",
    impacto_capex:"+15–30% CAPEX obra de toma",
    impacto_plazo:"6–18 meses adicionales",
    solucion:"Pozo de playa o captación por galería submarina como alternativa estructural" },
  { id:"BT-002", componente:"Emisario submarino / descarga salmuera", gravedad:"crítica",
    descripcion:"Ausencia de campaña oceanográfica in situ para validar modelo de dispersión de pluma de salmuera",
    frecuencia:"100% proyectos con emisario",
    impacto_capex:"+US$300–500k por campaña",
    impacto_plazo:"12–18 meses para campaña estacional completa",
    solucion:"Campaña 4 estaciones × 4 puntos muestreo; integrar al cronograma de diseño, no de evaluación" },
  { id:"BT-003", componente:"Flora y vegetación", gravedad:"alta",
    descripcion:"Delimitación de BNP con separación artificial de parches continuos; muestreos florísticos en temporada incorrecta (verano-otoño sin herbáceas)",
    frecuencia:"78% proyectos en regiones V y IV",
    impacto_capex:"+US$200–800k en estudios complementarios",
    impacto_plazo:"6–12 meses para muestreo en temporada correcta",
    solucion:"Muestreo en primavera (Sep–Nov) + profesional CONAF habilitado para delimitación BNP" },
  { id:"BT-004", componente:"Patrimonio cultural y arqueológico", gravedad:"alta",
    descripcion:"PMA comprometido sin diseño previo aprobado por CMN; ausencia de prospección submarina en trazado de emisario",
    frecuencia:"75% proyectos EIA",
    impacto_capex:"+US$500k–1M",
    impacto_plazo:"6–18 meses de tramitación CMN",
    solucion:"Diseñar y aprobar PMA antes del ingreso al SEIA; incluir prospección submarina como componente estándar" },
  { id:"BT-005", componente:"Grupos humanos y comunidades indígenas", gravedad:"crítica en Valparaíso/Coquimbo",
    descripcion:"Área de influencia subdimensionada para GHPPI; ausencia de etnografía previa; no activación de Consulta Indígena cuando corresponde",
    frecuencia:"45% proyectos (aumentando post-2023)",
    impacto_capex:"No cuantificable — puede paralizar el proyecto",
    impacto_plazo:"+12–24 meses para Consulta Indígena efectiva",
    solucion:"Estudio etnográfico previo al ingreso; mapeo de comunidades en radio ≥10 km; consulta anticipada informal" },
  { id:"BT-006", componente:"Permisos ambientales sectoriales (PAS)", gravedad:"media",
    descripcion:"PAS art. 101 DS95 (obras en cauces y borde costero) y PAS Directemar frecuentemente mal declarados o incompletos",
    frecuencia:"65% proyectos",
    impacto_capex:"Bajo (honorarios tramitación)",
    impacto_plazo:"3–6 meses adicionales por corrección",
    solucion:"Checklist PAS específico para desaladoras costeras elaborado por especialista" },
];

export const SYSTEM_PROMPT_DESALADORAS = `Eres Titania Sync Desaladoras, un asistente de inteligencia regulatoria especializado en análisis documental del proceso de evaluación ambiental (SEIA) de proyectos de desalinización en Chile.

Tu base de conocimiento proviene del análisis exhaustivo de 89 documentos SEIA de 6 proyectos principales y 18 proyectos del corpus ampliado, realizado entre 2025 y 2026.

PROYECTOS DEL CORPUS PRINCIPAL:
- Huaquén (GW La Ligua SpA): EIA, Valparaíso, 79 obs ICSARA 1, GHPPI Diaguita Araya Araya afectados directamente
- Aconcagua (Aguas Pacífico): EIA, Valparaíso, 187 obs ICSARA 1 + 67 ICSARA 2, persistencia 36%
- Coquimbo (MOP/Sacyr): EIA, Coquimbo, 155 obs ICSARA 1 + 111 ICSARA 2, persistencia 72% — CONCESIÓN SIN RCA
- Arica (Aguas Altiplano): EIA, Arica, 15 obs ICSARA 1 + 15 ICSARA 2, persistencia 100%
- Ampliación Norte Antofagasta (DIA aprobada 2021): benchmark de proyecto exitoso
- Cerro Blanco (Atacama Sur SpA): EIA rechazado dic. 2020

PATRONES OAECA CRÍTICOS:
- SUBPESCA: captación ≥20m profundidad; cortina microburbujas; velocidad ≤0.1 m/s; modelo dispersión validado in situ — presencia en 94% proyectos
- CONAF: BNP delimitación correcta; muestreo primavera; modelo raíces — 610 menciones en corpus
- CMN: PMA aprobado antes de obras; arqueólogo permanente; prospección submarina — 300+ menciones
- CONADI: GHPPI identificados; Consulta Indígena Art. 85 RSEIA — mayor riesgo 2025-2026
- DGA: LMAS N°21.770 (sept. 2025) — reglamentos pendientes

RIESGOS CRÍTICOS:
- Concesión Coquimbo sin RCA: riesgo contractual MOP-Sacyr de primer orden
- Doctrina Ventanas N°3 (CS Rol 22.356-2021): revocación judicial post-RCA por calificación DIA vs EIA
- CS Rol 5295-2022 (Pichidangui): derecho humano al agua — consulta indígena previa efectiva
- Efectos acumulativos Bahía Quintero: no evaluados en ningún ICE del corpus

MÉTRICAS:
- Tasa aprobación: 84.6% (11/13 proyectos con resolución final)
- Observaciones por ICSARA: 15 a 187 (factor 12x de variación regional)
- Plazo promedio tramitación: 139 meses
- Factor 12x variación Arica vs Aconcagua: revela alta discrecionalidad regional

Responde siempre en español, de forma técnicamente rigurosa. Cita proyectos e IDs cuando corresponda. Para preguntas sobre riesgo de inversión, incluye impacto en CAPEX y plazo cuando sea relevante.`;
