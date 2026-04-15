export const PROJECT = {
  nombre: "Proyecto Inmobiliario",
  tipo: "Declaración de Impacto Ambiental",
  titular: "Inmobiliaria Mirasur S.A.",
  region: "Región de Valparaíso — Quilpué",
  rca: "RCA N°142/2024",
  rca_fecha: "18 noviembre 2024",
  descripcion: "Conjunto habitacional 480 viviendas, 12 ha, con obras de urbanización, vialidad y espacios públicos.",
};

export const FASES = ["Preconstrucción", "Construcción", "Operación", "Cierre"];

export const MCA = [
  // ── PRECONSTRUCCIÓN
  {
    id: "C-001", fase: "Preconstrucción", tipo: "Técnico-Ambiental", organismo: "SAG V Región",
    texto: "Realizar prospección de flora y fauna en el área de intervención con metodología aprobada por el SAG, previa al inicio de cualquier actividad en terreno.",
    origen: "DIA", plazo: "60 días antes inicio obras", flag: "✅ En RCA", rca_art: "Art. 2.1", brecha: null,
    indicador: "Informe de prospección visado por SAG — inventario de especies con estado de conservación", frecuencia: "Única (previa a obras)", responsable: "Biólogo habilitado — visado SAG V Región",
    traza: ["DIA § 3.1.1", "→ RCA Art. 2.1"]
  },
  {
    id: "C-002", fase: "Preconstrucción", tipo: "Técnico-Ambiental", organismo: "CMN V Región",
    texto: "Ejecutar prospección arqueológica del área de intervención conforme a la Ley 17.288, con informe entregado al CMN antes del inicio de obras.",
    origen: "DIA", plazo: "90 días antes inicio obras", flag: "✅ En RCA", rca_art: "Art. 2.2", brecha: null,
    indicador: "Informe arqueológico aprobado por CMN — sin hallazgos que impidan inicio de obras o con protocolo de rescate aprobado", frecuencia: "Única (previa a obras)", responsable: "Arqueólogo habilitado — visado CMN V Región",
    traza: ["DIA § 3.2.1", "→ ICE § 4.1", "→ RCA Art. 2.2"]
  },
  {
    id: "C-003", fase: "Preconstrucción", tipo: "Técnico-Ambiental", organismo: "SAG V Región",
    texto: "Rescate y relocalización de individuos de Quillaja saponaria y Cryptocarya alba detectados en el área de intervención, previa a inicio de obras de limpieza.",
    origen: "Adenda 1", plazo: "Previo a limpieza de terreno", flag: "✅ En RCA", rca_art: "Art. 2.3", brecha: null,
    indicador: "N° individuos rescatados vs. inventario SAG — tasa de supervivencia ≥ 90% a 90 días post-traslado", frecuencia: "Única + seguimiento 90 días", responsable: "Biólogo habilitado — visado SAG V Región",
    traza: ["ICSARA Obs. SAG §2.3", "→ Adenda 1 § 3.4", "→ ICE § 6.1", "→ RCA Art. 2.3"]
  },
  {
    id: "C-004", fase: "Preconstrucción", tipo: "Técnico-Ambiental", organismo: "SERNAGEOMIN",
    texto: "Presentar estudio de mecánica de suelos con análisis de estabilidad de taludes para excavaciones mayores a 3 m, con aprobación previa de SERNAGEOMIN.",
    origen: "ICE", plazo: "Antes inicio obras de excavación", flag: "✅ En RCA", rca_art: "Art. 2.4", brecha: null,
    indicador: "Informe mecánica de suelos aprobado por SERNAGEOMIN antes inicio excavaciones", frecuencia: "Única (aprobación previa)", responsable: "Ing. Geotécnico — visado SERNAGEOMIN",
    traza: ["ICE § 7.4", "→ RCA Art. 2.4"]
  },
  {
    id: "C-005", fase: "Preconstrucción", tipo: "Técnico-Ambiental", organismo: "Dirección de Vialidad MOP",
    texto: "Elaborar Plan de Manejo de Tránsito (PMT) con aprobación previa de Vialidad, incluyendo señalética y desvíos en Ruta F-30.",
    origen: "DIA", plazo: "60 días antes inicio obras", flag: "✅ En RCA", rca_art: "Art. 2.5", brecha: null,
    indicador: "PMT aprobado por Dir. Vialidad — registro mensual de incidentes viales durante obras", frecuencia: "Aprobación única + reporte mensual", responsable: "Ing. de Tránsito — visado Dir. Vialidad MOP V Región",
    traza: ["DIA § 4.5.2", "→ ICE § 9.1", "→ RCA Art. 2.5"]
  },
  {
    id: "C-006", fase: "Preconstrucción", tipo: "Medio Humano", organismo: "I. Municipalidad de Quilpué",
    texto: "Informar a vecinos colindantes sobre inicio de obras, cronograma y canales de reclamos mediante carta certificada y aviso en sitio web municipal.",
    origen: "PAC", plazo: "30 días antes inicio obras", flag: "✅ En RCA", rca_art: "Art. 2.6", brecha: null,
    indicador: "Registro de envío de cartas certificadas — captura de publicación web municipal", frecuencia: "Única (previa a obras)", responsable: "Encargado de Relacionamiento Comunitario — Inmobiliaria Mirasur S.A.",
    traza: ["PAC Acta N°1 (10/04/2023)", "→ Adenda 1 § 7.1", "→ RCA Art. 2.6"]
  },

  // ── CONSTRUCCIÓN — AIRE Y RUIDO
  {
    id: "C-007", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SEREMI MMA V",
    texto: "Implementar plan de manejo de polvo mediante humectación de caminos de acceso a obra con frecuencia mínima diaria durante la etapa de construcción.",
    origen: "DIA", plazo: "Inicio obras", flag: "✅ En RCA", rca_art: "Art. 3.1", brecha: null,
    indicador: "Registro diario de humectación con fotografía y hora — bitácora de obra", frecuencia: "Diaria", responsable: "Jefe de Obra — Contratista Principal",
    traza: ["DIA § 4.2.1", "→ RCA Art. 3.1"]
  },
  {
    id: "C-008", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SEREMI MMA V",
    texto: "Instalar estación de monitoreo continuo de MP10 y MP2.5 en el punto receptor más crítico durante toda la etapa de construcción.",
    origen: "Adenda 1", plazo: "Inicio obras", flag: "✅ En RCA", rca_art: "Art. 3.2", brecha: null,
    indicador: "MP10 ≤ 150 µg/m³ (24h) / MP2.5 ≤ 50 µg/m³ (24h) — normas vigentes", frecuencia: "Continua (datos horarios) — reporte mensual SEREMI MMA", responsable: "Laboratorio acreditado — Supervisión ambiental de obra",
    traza: ["ICSARA Obs. SEREMI MMA §1.4", "→ Adenda 1 § 4.3", "→ ICE § 5.2", "→ RCA Art. 3.2"]
  },
  {
    id: "C-009", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SEREMI MMA V",
    texto: "Cubrir con mallas de contención o humedecer los materiales áridos acopiados en obra para evitar emisión de polvo por acción del viento.",
    origen: "DIA", plazo: "Durante toda la construcción", flag: "✅ En RCA", rca_art: "Art. 3.3", brecha: null,
    indicador: "Inspección visual diaria — fotografía de acopios cubiertos en bitácora de obra", frecuencia: "Diaria", responsable: "Capataz de Obra — Contratista Principal",
    traza: ["DIA § 4.2.3", "→ RCA Art. 3.3"]
  },
  {
    id: "C-010", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SEREMI Salud V",
    texto: "Instalar barreras acústicas temporales de 3 m de altura en el perímetro norte y poniente del proyecto durante fases de demolición y movimiento de tierra.",
    origen: "Adenda 1", plazo: "Inicio obras", flag: "⚠ Parcial", rca_art: "Art. 3.5",
    brecha: "La Adenda 1 comprometía barrera de 3 m en todo el perímetro. La RCA acota al norte y poniente, omitiendo el sector sur donde existe una escuela básica a 180 m.",
    indicador: "Nivel de presión sonora ≤ 65 dB(A) en receptor más expuesto — sonómetro clase 1", frecuencia: "Mensual durante demolición y movimiento de tierra", responsable: "Prevencionista de Riesgos — Contratista Principal",
    traza: ["ICSARA Obs. SEREMI Salud §1.1", "→ Adenda 1 § 4.1 (perímetro completo)", "→ RCA Art. 3.5 (perímetro parcial)"]
  },
  {
    id: "C-011", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SEREMI Salud V",
    texto: "Restringir actividades de mayor generación de ruido (demolición, piling, compactación) al horario 8:00–18:00 h en días hábiles.",
    origen: "DIA", plazo: "Durante toda la construcción", flag: "✅ En RCA", rca_art: "Art. 3.6", brecha: null,
    indicador: "Registro horario de actividades ruidosas en bitácora — sin registro de actividad fuera de horario", frecuencia: "Diaria", responsable: "Jefe de Obra — Contratista Principal",
    traza: ["DIA § 4.3.1", "→ RCA Art. 3.6"]
  },

  // ── CONSTRUCCIÓN — AGUA
  {
    id: "C-012", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "DGA V Región",
    texto: "Presentar programa de monitoreo de calidad de aguas del estero Las Palmas con parámetros físico-químicos y entrega de informes a la DGA.",
    origen: "DIA", plazo: "Antes inicio obras", flag: "⚠ Parcial", rca_art: "Art. 3.7",
    brecha: "La DIA comprometía monitoreo mensual en época estival. La RCA establece frecuencia trimestral. El ICE había validado la frecuencia mensual sin observaciones.",
    indicador: "pH, turbiedad, coliformes fecales, metales disueltos (Cu, Fe, Mn) — comparación vs. línea base DIA", frecuencia: "Trimestral (RCA) / Mensual estival (DIA — versión debilitada)", responsable: "Laboratorio acreditado — Supervisión ambiental de obra",
    traza: ["DIA § 5.1.3", "ICE § 8.2 (valida mensual)", "→ RCA Art. 3.7 (reduce a trimestral)"]
  },
  {
    id: "C-013", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "DGA V Región",
    texto: "Implementar sistema de sedimentación de aguas de escorrentía provenientes de la plataforma de construcción antes de su descarga al drenaje público.",
    origen: "DIA", plazo: "Inicio obras de movimiento de tierra", flag: "✅ En RCA", rca_art: "Art. 3.8", brecha: null,
    indicador: "Sólidos suspendidos totales ≤ 80 mg/L en punto de descarga — análisis mensual", frecuencia: "Mensual", responsable: "Supervisor ambiental de obra — Inmobiliaria Mirasur S.A.",
    traza: ["DIA § 5.2.1", "→ Adenda 1 § 5.1", "→ RCA Art. 3.8"]
  },
  {
    id: "C-014", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SISS V Región",
    texto: "Gestionar las aguas residuales del campamento de obra mediante baños químicos certificados con retiro por empresa autorizada.",
    origen: "DIA", plazo: "Inicio obras", flag: "✅ En RCA", rca_art: "Art. 3.9", brecha: null,
    indicador: "Contrato con empresa autorizada por SISS — manifiestos de retiro mensual", frecuencia: "Mensual (retiro)", responsable: "Administrador de Obra — Contratista Principal",
    traza: ["DIA § 5.3.1", "→ RCA Art. 3.9"]
  },

  // ── CONSTRUCCIÓN — SUELOS Y RESIDUOS
  {
    id: "C-015", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SEREMI Salud V",
    texto: "Gestionar residuos sólidos de construcción y demolición (RCD) mediante empresa autorizada, con manifiestos de traslado y disposición final en sitio habilitado.",
    origen: "DIA", plazo: "Durante toda la construcción", flag: "✅ En RCA", rca_art: "Art. 3.10", brecha: null,
    indicador: "Volumen RCD generado vs. dispuesto — manifiestos con empresa autorizada", frecuencia: "Mensual", responsable: "Supervisor ambiental — Contratista Principal",
    traza: ["DIA § 6.1.1", "→ RCA Art. 3.10"]
  },
  {
    id: "C-016", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SEREMI Salud V",
    texto: "Segregar en obra los residuos peligrosos (aceites, combustibles, pinturas) en bodega habilitada con piso impermeabilizado y contención de derrames.",
    origen: "DIA", plazo: "Inicio obras", flag: "✅ En RCA", rca_art: "Art. 3.11", brecha: null,
    indicador: "Bodega habilitada — registros de retiro por empresa autorizada para RESPEL", frecuencia: "Trimestral (inspección) / cada retiro (registro)", responsable: "Prevencionista de Riesgos — Contratista Principal",
    traza: ["DIA § 6.1.3", "→ RCA Art. 3.11"]
  },
  {
    id: "C-017", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SEREMI MMA V",
    texto: "Realizar monitoreo de calidad de suelos en el perímetro del proyecto al inicio y término de la etapa de construcción para verificar ausencia de contaminación.",
    origen: "Adenda 1", plazo: "Inicio y término de construcción", flag: "✅ En RCA", rca_art: "Art. 3.12", brecha: null,
    indicador: "Análisis de TPH y metales pesados — comparación vs. línea base DIA", frecuencia: "Dos veces (inicio y término)", responsable: "Laboratorio acreditado — Supervisión ambiental",
    traza: ["ICSARA Obs. SEREMI MMA §2.1", "→ Adenda 1 § 4.5", "→ RCA Art. 3.12"]
  },

  // ── CONSTRUCCIÓN — FLORA Y FAUNA
  {
    id: "C-018", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SAG V Región",
    texto: "Mantener brigada de rescate de fauna silvestre activa durante toda la etapa de construcción para atención de individuos afectados por las obras.",
    origen: "Adenda 1", plazo: "Durante toda la construcción", flag: "✅ En RCA", rca_art: "Art. 3.13", brecha: null,
    indicador: "Registro de individuos rescatados y derivados a centro de rehabilitación — reporte semestral SAG", frecuencia: "Semestral (reporte)", responsable: "Biólogo habilitado — coordinación SAG V Región",
    traza: ["ICSARA Obs. SAG §3.1", "→ Adenda 1 § 3.5", "→ RCA Art. 3.13"]
  },
  {
    id: "C-019", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SAG V Región",
    texto: "Instalar cercos de exclusión de fauna silvestre en el perímetro de la zona de obras.",
    origen: "DIA", plazo: "Previo a obras de limpieza", flag: "✅ En RCA", rca_art: "Art. 3.14", brecha: null,
    indicador: "Longitud de cerco instalado vs. perímetro requerido — inspección mensual de integridad", frecuencia: "Mensual (inspección)", responsable: "Capataz de Obra — Contratista Principal",
    traza: ["DIA § 3.3.2", "→ RCA Art. 3.14"]
  },
  {
    id: "C-020", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "CONAF V Región",
    texto: "Prohibir la quema de vegetación durante toda la etapa de construcción. Toda la biomasa removida deberá chipearse o retirarse por empresa autorizada.",
    origen: "DIA", plazo: "Durante toda la construcción", flag: "✅ En RCA", rca_art: "Art. 3.15", brecha: null,
    indicador: "Sin registros de quema — bitácora de obra y declaración diaria del jefe de obra", frecuencia: "Diaria (declaración)", responsable: "Jefe de Obra — supervisión CONAF V Región",
    traza: ["DIA § 3.4.1", "→ RCA Art. 3.15"]
  },

  // ── CONSTRUCCIÓN — TRÁNSITO Y VIALIDAD
  {
    id: "C-021", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "Dirección de Vialidad MOP",
    texto: "Ejecutar el Plan de Manejo de Tránsito aprobado, manteniendo señalética y desvíos habilitados en Ruta F-30 durante toda la construcción.",
    origen: "DIA", plazo: "Inicio obras — vigente durante toda la construcción", flag: "✅ En RCA", rca_art: "Art. 3.16", brecha: null,
    indicador: "Registro mensual de incidentes viales — inspección semanal de señalética y desvíos", frecuencia: "Semanal (inspección) / mensual (reporte)", responsable: "Ing. de Tránsito — Contratista Principal",
    traza: ["DIA § 4.5.3", "→ RCA Art. 3.16"]
  },
  {
    id: "C-022", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "I. Municipalidad de Quilpué",
    texto: "Limpiar diariamente la calzada pública en el frente de obra para evitar acumulación de barro, áridos y residuos provenientes de los vehículos de construcción.",
    origen: "PAC", plazo: "Durante toda la construcción", flag: "✅ En RCA", rca_art: "Art. 3.17", brecha: null,
    indicador: "Registro diario de limpieza con fotografía — sin reclamos documentados a la municipalidad", frecuencia: "Diaria", responsable: "Capataz de Obra — Contratista Principal",
    traza: ["PAC Acta N°2 (22/05/2023)", "→ Adenda 1 § 7.3", "→ RCA Art. 3.17"]
  },
  {
    id: "C-023", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "Dirección de Vialidad MOP",
    texto: "Instalar lavaderos de ruedas a la salida de los accesos de obra para evitar arrastre de barro a la vía pública.",
    origen: "Adenda 1", plazo: "Inicio obras", flag: "✅ En RCA", rca_art: "Art. 3.18", brecha: null,
    indicador: "Lavadero operativo en cada acceso — inspección diaria de funcionamiento", frecuencia: "Diaria", responsable: "Capataz de Obra — Contratista Principal",
    traza: ["ICSARA Obs. Vialidad §1.2", "→ Adenda 1 § 5.3", "→ RCA Art. 3.18"]
  },

  // ── CONSTRUCCIÓN — PATRIMONIO CULTURAL
  {
    id: "C-024", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "CMN V Región",
    texto: "Implementar protocolo de hallazgo fortuito de patrimonio arqueológico: paralizar obras en el sector y notificar al CMN en un plazo máximo de 48 horas.",
    origen: "DIA", plazo: "Durante toda la construcción", flag: "✅ En RCA", rca_art: "Art. 3.19", brecha: null,
    indicador: "Procedimiento escrito validado por CMN — registro de capacitación de todo el personal de obra", frecuencia: "Única (capacitación inicio) / activación ante hallazgo", responsable: "Jefe de Obra — coordinación CMN V Región",
    traza: ["DIA § 3.2.3", "→ RCA Art. 3.19"]
  },

  // ── CONSTRUCCIÓN — MEDIO HUMANO
  {
    id: "C-025", fase: "Construcción", tipo: "Medio Humano", organismo: "I. Municipalidad de Quilpué",
    texto: "Constituir y mantener una mesa de diálogo mensual con la Junta de Vecinos Brisas del Sol durante toda la etapa de construcción, con registro de acuerdos en acta.",
    origen: "PAC", plazo: "Durante toda la construcción", flag: "🔴 Ausente", rca_art: "—",
    brecha: "Compromiso asumido en PAC Acta N°4 (agosto 2023) y reiterado en Adenda 1. No fue incorporado en la RCA. Tiene carácter vinculante por provenir de acuerdo formal en proceso de evaluación.",
    indicador: "Acta firmada por J.V. Brisas del Sol y contraparte titular — registro de acuerdos y estado de cumplimiento", frecuencia: "Mensual", responsable: "Encargado de Relacionamiento Comunitario — Inmobiliaria Mirasur S.A.",
    traza: ["PAC Acta N°4 (14/08/2023)", "→ Adenda 1 § 7.2", "→ ICE § 12.1 (referenciado)", "→ RCA: NO INCORPORADO 🔴"]
  },
  {
    id: "C-026", fase: "Construcción", tipo: "Medio Humano", organismo: "I. Municipalidad de Quilpué",
    texto: "Habilitar línea de atención de reclamos de vecinos (teléfono y correo) durante toda la etapa de construcción con tiempo de respuesta máximo de 72 horas.",
    origen: "PAC", plazo: "Inicio obras", flag: "✅ En RCA", rca_art: "Art. 3.20", brecha: null,
    indicador: "N° reclamos recibidos — N° respondidos en plazo — registro mensual de gestión", frecuencia: "Mensual (reporte)", responsable: "Encargado de Relacionamiento Comunitario — Inmobiliaria Mirasur S.A.",
    traza: ["PAC Acta N°1", "→ Adenda 1 § 7.4", "→ RCA Art. 3.20"]
  },
  {
    id: "C-027", fase: "Construcción", tipo: "Medio Humano", organismo: "SEREMI MINVU V",
    texto: "Establecer franja de amortiguación visual de 15 m con arborización nativa entre el proyecto y el sector residencial del Pasaje Los Aromos.",
    origen: "PAC", plazo: "Antes recepción municipal", flag: "✅ En RCA", rca_art: "Art. 3.21", brecha: null,
    indicador: "Franja plantada ≥ 15 m con especies nativas certificadas — informe verificación SEREMI MINVU", frecuencia: "Única (verificación al término de obras)", responsable: "Área de Paisajismo — Inmobiliaria Mirasur S.A.",
    traza: ["PAC Acta N°3 (12/06/2023)", "→ Adenda 1 § 6.1", "→ ICE § 11.3", "→ RCA Art. 3.21"]
  },
  {
    id: "C-028", fase: "Construcción", tipo: "Medio Humano", organismo: "I. Municipalidad de Quilpué",
    texto: "Publicar mensualmente en el sitio web del proyecto y en cartelería en el frente de obra el avance de obras, cronograma proyectado y estado de compromisos ambientales.",
    origen: "PAC", plazo: "Durante toda la construcción", flag: "🔴 Ausente", rca_art: "—",
    brecha: "Compromiso de transparencia asumido en PAC Acta N°2 y refrendado en Adenda 1 § 7.5. No fue recogido en la RCA. La ausencia debilita la trazabilidad pública del cumplimiento.",
    indicador: "URL activo con actualización mensual verificable — fotografía de cartelería en obra", frecuencia: "Mensual", responsable: "Encargado de Comunicaciones — Inmobiliaria Mirasur S.A.",
    traza: ["PAC Acta N°2 (22/05/2023)", "→ Adenda 1 § 7.5", "→ RCA: NO INCORPORADO 🔴"]
  },

  // ── CONSTRUCCIÓN — SEGURIDAD Y EMERGENCIAS
  {
    id: "C-029", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SEREMI Salud V",
    texto: "Contar con Plan de Emergencias y Contingencias de obra visado por la SEREMI de Salud, disponible para todo el personal desde el primer día de obras.",
    origen: "DIA", plazo: "Inicio obras", flag: "✅ En RCA", rca_art: "Art. 3.22", brecha: null,
    indicador: "Plan visado por SEREMI Salud — constancia de capacitación de todo el personal", frecuencia: "Única (elaboración) / semestral (simulacro)", responsable: "Prevencionista de Riesgos — Contratista Principal",
    traza: ["DIA § 7.1.1", "→ RCA Art. 3.22"]
  },
  {
    id: "C-030", fase: "Construcción", tipo: "Técnico-Ambiental", organismo: "SEREMI Salud V",
    texto: "Implementar plan de manejo de materiales peligrosos con hojas SDS disponibles en obra y bodega habilitada.",
    origen: "DIA", plazo: "Inicio obras", flag: "✅ En RCA", rca_art: "Art. 3.23", brecha: null,
    indicador: "Inventario de materiales peligrosos actualizado — SDS disponibles — inspección trimestral de bodega", frecuencia: "Trimestral (inspección)", responsable: "Prevencionista de Riesgos — Contratista Principal",
    traza: ["DIA § 7.2.1", "→ RCA Art. 3.23"]
  },

  // ── OPERACIÓN — ÁREAS VERDES
  {
    id: "C-031", fase: "Operación", tipo: "Técnico-Ambiental", organismo: "CONAF V Región",
    texto: "Mantener las áreas verdes del conjunto con especies nativas o naturalizadas de bajo consumo hídrico, conforme al plan de paisajismo aprobado.",
    origen: "DIA", plazo: "Primer año de operación — vigente", flag: "✅ En RCA", rca_art: "Art. 4.1", brecha: null,
    indicador: "Superficie de áreas verdes mantenida (m²) — porcentaje de especies nativas vs. total — reporte anual", frecuencia: "Anual", responsable: "Administración del Condominio — supervisión CONAF V Región",
    traza: ["DIA § 8.1.1", "→ ICE § 13.1", "→ RCA Art. 4.1"]
  },
  {
    id: "C-032", fase: "Operación", tipo: "Técnico-Ambiental", organismo: "CONAF V Región",
    texto: "Implementar programa de educación ambiental dirigido a residentes sobre manejo de vegetación nativa en áreas verdes del conjunto.",
    origen: "RCA", plazo: "Año 1 de operación", flag: "➕ Sin origen", rca_art: "Art. 4.2",
    brecha: "Condición incorporada en la RCA que no fue comprometida en el proceso de evaluación ni solicitada por CONAF. Posible error de redacción.",
    indicador: "N° talleres realizados — N° participantes — material educativo distribuido — informe a CONAF", frecuencia: "Anual (año 1)", responsable: "Administración del Condominio — supervisión CONAF V Región",
    traza: ["RCA Art. 4.2 (origen no trazado) ➕"]
  },
  {
    id: "C-033", fase: "Operación", tipo: "Técnico-Ambiental", organismo: "SEREMI MINVU V",
    texto: "Mantener la franja de amortiguación visual de 15 m con arborización nativa durante toda la vida útil del proyecto, con reposición de ejemplares que mueran.",
    origen: "PAC", plazo: "Vigente durante toda la operación", flag: "✅ En RCA", rca_art: "Art. 4.3", brecha: null,
    indicador: "Inspección anual de la franja — tasa de supervivencia ≥ 85% de ejemplares — reposición de faltantes", frecuencia: "Anual", responsable: "Administración del Condominio — verificación SEREMI MINVU V",
    traza: ["PAC Acta N°3", "→ Adenda 1 § 6.1", "→ RCA Art. 4.3"]
  },

  // ── OPERACIÓN — AGUA Y SANEAMIENTO
  {
    id: "C-034", fase: "Operación", tipo: "Técnico-Ambiental", organismo: "SISS V Región",
    texto: "Conectar el conjunto habitacional a la red de agua potable y alcantarillado sanitario antes de la recepción definitiva de las viviendas.",
    origen: "DIA", plazo: "Antes recepción definitiva", flag: "✅ En RCA", rca_art: "Art. 4.4", brecha: null,
    indicador: "Certificado de factibilidad de servicios sanitarios — resolución de conexión SISS", frecuencia: "Única (conexión definitiva)", responsable: "Ing. Sanitario — Inmobiliaria Mirasur S.A.",
    traza: ["DIA § 5.4.1", "→ RCA Art. 4.4"]
  },
  {
    id: "C-035", fase: "Operación", tipo: "Técnico-Ambiental", organismo: "DGA V Región",
    texto: "Continuar el monitoreo de calidad de aguas del estero Las Palmas durante los primeros años de operación del conjunto habitacional.",
    origen: "Adenda 1", plazo: "Años iniciales de operación", flag: "⚠ Parcial", rca_art: "Art. 4.5",
    brecha: "La Adenda 1 comprometía monitoreo durante 3 años de operación. La RCA lo reduce a 2 años sin justificación técnica en el ICE.",
    indicador: "pH, turbiedad, coliformes fecales, metales disueltos — informe semestral a DGA", frecuencia: "Semestral (durante período de operación)", responsable: "Laboratorio acreditado — Administración del Condominio",
    traza: ["ICSARA Obs. DGA §2.1", "→ Adenda 1 § 5.2 (3 años)", "→ RCA Art. 4.5 (2 años)"]
  },

  // ── OPERACIÓN — RESIDUOS
  {
    id: "C-036", fase: "Operación", tipo: "Técnico-Ambiental", organismo: "SEREMI Salud V",
    texto: "Implementar sistema de gestión de residuos sólidos domiciliarios con separación en origen (reciclables / no reciclables) y retiro por empresa autorizada.",
    origen: "DIA", plazo: "Inicio operación", flag: "✅ En RCA", rca_art: "Art. 4.6", brecha: null,
    indicador: "Toneladas de residuos generados — porcentaje valorizado — reporte anual SEREMI Salud", frecuencia: "Anual", responsable: "Administración del Condominio",
    traza: ["DIA § 6.2.1", "→ RCA Art. 4.6"]
  },
  {
    id: "C-037", fase: "Operación", tipo: "Técnico-Ambiental", organismo: "SEREMI Salud V",
    texto: "Gestionar los residuos de poda y mantención de áreas verdes mediante compostaje en sitio o retiro por empresa autorizada.",
    origen: "DIA", plazo: "Inicio operación", flag: "✅ En RCA", rca_art: "Art. 4.7", brecha: null,
    indicador: "Registro de disposición de residuos verdes — manifiestos de retiro o evidencia de compostaje", frecuencia: "Semestral (registro)", responsable: "Administración del Condominio",
    traza: ["DIA § 6.2.3", "→ RCA Art. 4.7"]
  },

  // ── OPERACIÓN — SEGURIDAD VIAL
  {
    id: "C-038", fase: "Operación", tipo: "Técnico-Ambiental", organismo: "Dirección de Vialidad MOP",
    texto: "Mantener en buen estado la señalética vial instalada en el acceso al conjunto en Ruta F-30, con reposición inmediata ante daños.",
    origen: "DIA", plazo: "Vigente durante toda la operación", flag: "✅ En RCA", rca_art: "Art. 4.8", brecha: null,
    indicador: "Inspección semestral de señalética — sin observaciones de Vialidad pendientes", frecuencia: "Semestral", responsable: "Administración del Condominio — verificación Dir. Vialidad MOP",
    traza: ["DIA § 4.5.4", "→ RCA Art. 4.8"]
  },

  // ── OPERACIÓN — MEDIO HUMANO
  {
    id: "C-039", fase: "Operación", tipo: "Medio Humano", organismo: "I. Municipalidad de Quilpué",
    texto: "Mantener la franja verde de amortiguación como espacio de uso público accesible para los vecinos del sector, con mantención a cargo del condominio.",
    origen: "PAC", plazo: "Inicio operación — vigente", flag: "✅ En RCA", rca_art: "Art. 4.9", brecha: null,
    indicador: "Franja accesible y mantenida — sin registro de cierre o restricción de acceso por parte del condominio", frecuencia: "Semestral (verificación)", responsable: "Administración del Condominio — Municipalidad de Quilpué",
    traza: ["PAC Acta N°3", "→ Adenda 1 § 6.2", "→ RCA Art. 4.9"]
  },
  {
    id: "C-040", fase: "Operación", tipo: "Medio Humano", organismo: "I. Municipalidad de Quilpué",
    texto: "Donar a la Municipalidad de Quilpué una multicancha deportiva en terreno cedido al interior del proyecto, con mantención a cargo del condominio por 5 años.",
    origen: "PAC", plazo: "Antes recepción definitiva", flag: "⚠ Parcial", rca_art: "Art. 4.10",
    brecha: "La PAC comprometía multicancha techada. La RCA establece solo multicancha sin techo. El ICE no registra debate sobre esta modificación.",
    indicador: "Multicancha construida y entregada con escritura de cesión a Municipalidad — contrato de mantención 5 años", frecuencia: "Única (entrega) + mantención anual", responsable: "Inmobiliaria Mirasur S.A. — Municipalidad de Quilpué",
    traza: ["PAC Acta N°5 (20/09/2023)", "→ ICE § 12.3 (sin debate)", "→ RCA Art. 4.10 (sin techo)"]
  },
  {
    id: "C-041", fase: "Operación", tipo: "Medio Humano", organismo: "SEREMI Salud V",
    texto: "Entregar a los nuevos residentes un manual de convivencia que incluya las medidas ambientales del proyecto y los canales de contacto con la empresa y las autoridades.",
    origen: "RCA", plazo: "Entrega de viviendas", flag: "➕ Sin origen", rca_art: "Art. 4.11",
    brecha: "Condición incorporada en la RCA sin respaldo en el expediente. No fue comprometida por el titular ni solicitada por SEREMI Salud. Posible error de sistematización.",
    indicador: "Manual entregado a cada propietario — constancia de recepción firmada", frecuencia: "Única (entrega de viviendas)", responsable: "Inmobiliaria Mirasur S.A.",
    traza: ["RCA Art. 4.11 (origen no trazado) ➕"]
  },

  // ── OPERACIÓN — SEGUIMIENTO Y REPORTABILIDAD
  {
    id: "C-042", fase: "Operación", tipo: "Técnico-Ambiental", organismo: "SMA — Región de Valparaíso",
    texto: "Elaborar y presentar Informes de Cumplimiento Ambiental (ICA) anuales a la SMA durante los 5 primeros años de operación.",
    origen: "DIA", plazo: "Anual — años 1 a 5 de operación", flag: "✅ En RCA", rca_art: "Art. 4.12", brecha: null,
    indicador: "ICA presentado en plazo — sin observaciones SMA pendientes de respuesta", frecuencia: "Anual (5 años)", responsable: "Coordinador Ambiental — Inmobiliaria Mirasur S.A. / Administración Condominio",
    traza: ["DIA § 9.1.1", "→ ICE § 14.1", "→ RCA Art. 4.12"]
  },
  {
    id: "C-043", fase: "Operación", tipo: "Técnico-Ambiental", organismo: "SEA V Región",
    texto: "Notificar al SEA el inicio de la etapa de operación del proyecto dentro de los 30 días hábiles siguientes a la recepción definitiva municipal.",
    origen: "DIA", plazo: "30 días hábiles desde recepción definitiva", flag: "✅ En RCA", rca_art: "Art. 4.13", brecha: null,
    indicador: "Carta de notificación al SEA con acuse de recibo", frecuencia: "Única", responsable: "Coordinador Ambiental — Inmobiliaria Mirasur S.A.",
    traza: ["DIA § 9.1.2", "→ RCA Art. 4.13"]
  },
  {
    id: "C-044", fase: "Operación", tipo: "Técnico-Ambiental", organismo: "SMA — Región de Valparaíso",
    texto: "Notificar a la SMA cualquier modificación al proyecto que pueda implicar un cambio en las condiciones de la RCA, antes de implementar la modificación.",
    origen: "ICE", plazo: "Ante modificación de proyecto", flag: "✅ En RCA", rca_art: "Art. 4.14", brecha: null,
    indicador: "Comunicación formal a SMA con descripción de modificación y evaluación de impacto en condiciones RCA", frecuencia: "Ante cada modificación relevante", responsable: "Coordinador Ambiental — Inmobiliaria Mirasur S.A.",
    traza: ["ICE § 14.2", "→ RCA Art. 4.14"]
  },

  // ── CIERRE
  {
    id: "C-045", fase: "Cierre", tipo: "Técnico-Ambiental", organismo: "SEREMI MMA V",
    texto: "Elaborar Plan de Cierre y Abandono del proyecto en caso de que el conjunto habitacional no complete su desarrollo, con restauración de las áreas intervenidas.",
    origen: "DIA", plazo: "Ante decisión de cierre anticipado", flag: "✅ En RCA", rca_art: "Art. 5.1", brecha: null,
    indicador: "Plan de cierre aprobado por SEREMI MMA — ejecución verificada por inspector ambiental", frecuencia: "Ante cierre (aplicación contingente)", responsable: "Gerencia de Proyectos — Inmobiliaria Mirasur S.A.",
    traza: ["DIA § 10.1.1", "→ RCA Art. 5.1"]
  },
  {
    id: "C-046", fase: "Cierre", tipo: "Técnico-Ambiental", organismo: "SAG V Región",
    texto: "Ejecutar programa de revegetación con especies nativas en las áreas no construidas ante cierre del proyecto, con seguimiento por dos temporadas.",
    origen: "DIA", plazo: "Dentro de los 6 meses siguientes al cierre", flag: "✅ En RCA", rca_art: "Art. 5.2", brecha: null,
    indicador: "Superficie revegetada (m²) — cobertura lograda a 2 temporadas — informe a SAG", frecuencia: "Dos temporadas (seguimiento)", responsable: "Biólogo habilitado — supervisión SAG V Región",
    traza: ["DIA § 10.1.3", "→ Adenda 1 § 8.1", "→ RCA Art. 5.2"]
  },
  {
    id: "C-047", fase: "Cierre", tipo: "Técnico-Ambiental", organismo: "SMA — Región de Valparaíso",
    texto: "Presentar informe final de cumplimiento de compromisos ambientales de la RCA a la SMA al término del proyecto, con sistematización de todos los registros generados.",
    origen: "ICE", plazo: "6 meses después del cierre del proyecto", flag: "✅ En RCA", rca_art: "Art. 5.3", brecha: null,
    indicador: "Informe final presentado a SMA con anexos de registros completos — acuse de recibo SMA", frecuencia: "Única (al cierre)", responsable: "Coordinador Ambiental — Inmobiliaria Mirasur S.A.",
    traza: ["ICE § 14.3", "→ RCA Art. 5.3"]
  },
];

export const SYSTEM_PROMPT = `Eres Titania Sync, un asistente de inteligencia regulatoria especializado en análisis de consistencia de compromisos ambientales del SEIA chileno.

Tienes acceso completo a la Matriz de Compromisos Ambientales (MCA) del Proyecto Inmobiliario, DIA aprobada con RCA N°142/2024 del 18 de noviembre de 2024, Región de Valparaíso, Quilpué. Titular: Inmobiliaria Mirasur S.A.

DATOS DE LA MCA (47 compromisos totales):
${MCA.map(c => `[${c.id}] ${c.flag} | Fase: ${c.fase} | Origen: ${c.origen} | Organismo: ${c.organismo} | Plazo: ${c.plazo} | Indicador: ${c.indicador} | Frecuencia: ${c.frecuencia} | Responsable: ${c.responsable} | Compromiso: ${c.texto} | Trazabilidad: ${c.traza.join(" ")}${c.brecha ? ` | BRECHA: ${c.brecha}` : ""}`).join("\n")}

RESUMEN:
- Total compromisos: 47 en 4 fases (Preconstrucción: 6, Construcción: 24, Operación: 14, Cierre: 3)
- Con trazabilidad completa: 39 (83%)
- Brechas detectadas: 8 total — Ausentes en RCA (🔴): C-025, C-028 — Debilitados (⚠): C-010, C-012, C-035, C-040 — Sin origen trazado (➕): C-032, C-041

Responde en español. Cita IDs de compromiso cuando sea relevante. Para preguntas sobre brechas, explica el riesgo regulatorio y menciona Art. 20 Ley 19.300 / Art. 77 Regl. SEIA cuando aplique. Respuestas concisas, máximo 3-4 párrafos salvo análisis detallado solicitado. Para ver la MCA, brechas o trazabilidad, indica que están en los paneles del dashboard.`;