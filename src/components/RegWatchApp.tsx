"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HelpCircle, X, FileText, Zap, Search, LayoutDashboard } from "lucide-react";
import RegWatchInfographicModal from "./RegWatchInfographicModal";
import {
  RW_NORMAS, RW_ALERTAS, RW_FUENTES, RW_EJEMPLOS,
  SYSTEM_PROMPT_REGWATCH, RW_SUGGS,
} from "../data/regwatchData";

// ── Colores de área ──────────────────────────────────────────────────────────
const AREA_COLOR: Record<string, string> = {
  "Finanzas Públicas":       "#0F2D4A",
  "Contratación Pública":    "#1D6FA4",
  "Gobierno Territorial":    "#0B6E6E",
  "Control Interno":         "#5A6D80",
  "Ambiente":                "#0A7C5C",
  "Ambiente / Inversión":    "#0A7C5C",
  "Inversión y Fomento":     "#C9710A",
  "Empresas Públicas":       "#0F2D4A",
  "Presupuesto":             "#1D6FA4",
};

const NIVEL_STYLE: Record<string, { text: string; bg: string; border: string }> = {
  "crítico": { text: "text-red-700",   bg: "bg-red-50",   border: "border-red-200" },
  "alto":    { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  "medio":   { text: "text-yellow-700",bg: "bg-yellow-50",border: "border-yellow-200" },
  "bajo":    { text: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" },
};

const ESTADO_STYLE: Record<string, { label: string; text: string; bg: string }> = {
  "vigente":            { label: "Vigente",               text: "text-emerald-700", bg: "bg-emerald-50" },
  "vigente_modificado": { label: "Vigente — modificado",  text: "text-blue-700",    bg: "bg-blue-50" },
  "configurando":       { label: "En configuración",      text: "text-slate-600",   bg: "bg-slate-100" },
  "activa":             { label: "Activa",                text: "text-emerald-700", bg: "bg-emerald-50" },
};

// ── Small helpers ────────────────────────────────────────────────────────────
function Pill({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${className}`}>
      {text}
    </span>
  );
}

function AreaTag({ area }: { area: string }) {
  const color = AREA_COLOR[area] || "#5A6D80";
  return (
    <span className="inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold border"
      style={{ background: `${color}10`, color, borderColor: `${color}30` }}>
      {area}
    </span>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function RWDashboard() {
  const criticas = RW_ALERTAS.filter(a => a.nivel === "crítico").length;
  const pendientesTotal = RW_NORMAS.reduce((s, n) => s + (n.pendientes?.length || 0), 0);
  const fuentesActivas = RW_FUENTES.filter(f => f.estado === "activa").length;

  return (
    <div className="flex flex-col gap-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { v: RW_NORMAS.length,    l: "Normas indexadas",   sub: "Marco normativo MEF Ecuador", color: "text-blue-700" },
          { v: RW_ALERTAS.length,   l: "Alertas activas",   sub: `${criticas} críticas`,         color: "text-amber-700" },
          { v: pendientesTotal,     l: "Actos pendientes",  sub: "Reglamentos / instructivos",   color: "text-red-600" },
          { v: fuentesActivas,      l: "Fuentes activas",   sub: `de ${RW_FUENTES.length} configuradas`, color: "text-emerald-700" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className={`text-3xl font-black ${s.color}`}>{s.v}</div>
            <div className="text-xs font-semibold text-slate-700 mt-0.5">{s.l}</div>
            <div className="text-[10px] text-slate-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Módulos demo */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="text-sm font-bold text-slate-800 mb-4">3 módulos demostrativos — piloto Titania × MEF Ecuador</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { n:"Demo 1", t:"Consulta regulatoria", desc:"Asistente que responde qué norma aplica a un trámite o procedimiento del MEF, con cita a la fuente y organismo responsable.", icon:"💬", color:"text-teal-700", border:"border-teal-200", bg:"bg-teal-50" },
            { n:"Demo 2", t:"Clasificador de documentos", desc:"Toma texto de una norma o resolución y lo clasifica automáticamente: tipo, materia, organismo, requisitos, plazos y riesgos.", icon:"🗂", color:"text-blue-700", border:"border-blue-200", bg:"bg-blue-50" },
            { n:"Demo 3", t:"Vigilancia y alertas", desc:"Dashboard que detecta cambios normativos relevantes para el MEF, materias afectadas y procesos que deben revisarse.", icon:"🔔", color:"text-amber-700", border:"border-amber-200", bg:"bg-amber-50" },
          ].map((d, i) => (
            <div key={i} className={`rounded-lg p-4 border ${d.border} ${d.bg}`}>
              <div className="text-2xl mb-2">{d.icon}</div>
              <div className={`text-[10px] font-bold ${d.color} mb-1`}>{d.n}</div>
              <div className="text-xs font-bold text-slate-800 mb-1.5">{d.t}</div>
              <div className="text-[10px] text-slate-500 leading-relaxed">{d.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cambios recientes */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="text-sm font-bold text-slate-800 mb-4">Cambios regulatorios recientes — Ecuador</div>
        <div className="flex flex-col divide-y divide-slate-100">
          {[
            { f:"Ene 2025", a:"Gobierno Territorial", n:"COOTAD reforma",   d:"Nuevo modelo distribución transferencias GADs",          niv:"crítico" },
            { f:"Oct 2024", a:"Contratación Pública",  n:"Catálogo SERCOP", d:"Servicios IA y GovTech incorporados al catálogo normalizado", niv:"alto" },
            { f:"Mar 2024", a:"Contratación Pública",  n:"LOSNCP reforma",  d:"Nuevos umbrales contratación directa",                   niv:"crítico" },
            { f:"Nov 2023", a:"Ambiente / Inversión",  n:"AM 063/2023 MAATE",d:"Reglamento CC y NDC Ecuador",                          niv:"medio" },
            { f:"Jul 2021", a:"Finanzas Públicas",     n:"COPYFP reforma",  d:"Nuevas reglas fiscales post-COVID",                      niv:"medio" },
          ].map((r, i) => {
            const ns = NIVEL_STYLE[r.niv];
            return (
              <div key={i} className="flex items-center gap-3 py-2.5">
                <span className="text-[10px] font-semibold text-blue-600 min-w-[52px]">{r.f}</span>
                <AreaTag area={r.a} />
                <span className="text-[10px] font-bold text-slate-800 min-w-[120px]">{r.n}</span>
                <span className="text-[10px] text-slate-500 flex-1 hidden md:block">{r.d}</span>
                <Pill text={r.niv} className={`${ns.text} ${ns.bg} ${ns.border}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── REGISTRO NORMATIVO ─────────────────────────────────────────────────────────
function RWRegistro() {
  const [sel, setSel] = useState<string | null>(null);
  const [filtro, setFiltro] = useState("Todas");
  const areas = ["Todas", ...Array.from(new Set(RW_NORMAS.map(n => n.area)))];
  const data = filtro === "Todas" ? RW_NORMAS : RW_NORMAS.filter(n => n.area === filtro);

  return (
    <div className="flex flex-col gap-4">
      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {areas.map(a => (
          <button key={a} onClick={() => setFiltro(a)}
            className={`rounded-full px-3 py-1 text-[10px] font-semibold border transition-colors ${
              filtro === a
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
            }`}>
            {a}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-3">
        {data.map(n => {
          const es = ESTADO_STYLE[n.estado] || ESTADO_STYLE.vigente;
          const isOpen = sel === n.id;
          return (
            <div key={n.id} onClick={() => setSel(isOpen ? null : n.id)}
              className={`bg-white rounded-xl border transition-all cursor-pointer shadow-sm ${
                isOpen ? "border-slate-400 shadow-md" : "border-slate-200 hover:border-slate-300"
              }`}>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-2 items-center">
                      <span className="text-[9px] font-bold text-slate-500 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">{n.tipo}</span>
                      <AreaTag area={n.area} />
                      <Pill text={es.label} className={`${es.text} ${es.bg} border-transparent`} />
                      {n.alerta && <Pill text="⚠ Alerta" className="text-amber-700 bg-amber-50 border-amber-200" />}
                    </div>
                    <div className="text-sm font-bold text-slate-800">{n.numero}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{n.nombre}</div>
                  </div>
                  <span className="text-[10px] text-slate-400 flex-shrink-0">{n.ultima_mod.slice(0,7)}</span>
                </div>
                <div className="flex gap-1.5 flex-wrap mt-2">
                  {n.organismos.map((o, i) => (
                    <span key={i} className="text-[9px] bg-slate-100 text-slate-500 rounded px-1.5 py-0.5">{o}</span>
                  ))}
                </div>
              </div>

              {isOpen && (
                <div className="px-4 pb-4 pt-0 border-t border-slate-100">
                  <p className="text-xs text-slate-500 leading-relaxed mt-3 mb-3">{n.desc}</p>
                  {n.alerta && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                      <p className="text-xs font-semibold text-amber-700">{n.alerta}</p>
                    </div>
                  )}
                  {n.cambios && n.cambios.length > 0 && (
                    <div className="mb-3">
                      <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2">Historial</div>
                      {n.cambios.map((c, i) => (
                        <div key={i} className="flex gap-3 bg-slate-50 rounded-lg px-3 py-2 mb-1.5">
                          <span className="text-[10px] font-semibold text-blue-600 min-w-[42px]">{c.fecha}</span>
                          <span className="text-[10px] text-slate-700">{c.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {n.pendientes && n.pendientes.length > 0 && (
                    <div>
                      <div className="text-[9px] font-bold text-amber-700 uppercase tracking-widest mb-2">Pendientes</div>
                      {n.pendientes.map((p, i) => (
                        <div key={i} className="flex gap-2 bg-amber-50 rounded-lg px-3 py-2 mb-1.5">
                          <span>⏳</span>
                          <span className="text-[10px] text-slate-700">{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-[9px] text-slate-400 mt-3">Fuente: {n.fuente}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── CLASIFICADOR ──────────────────────────────────────────────────────────────
type ClasificadorResult = {
  tipo_norma?: string;
  area?: string;
  organismo_competente?: string[];
  procedimiento_afectado?: string;
  requisitos?: string[];
  plazos?: string[];
  obligaciones?: string[];
  riesgos?: string[];
  norma_probable?: string;
  nivel?: string;
  resumen?: string;
  error?: boolean;
};

function RWClasificador() {
  const [texto, setTexto] = useState("");
  const [res, setRes] = useState<ClasificadorResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [ejSel, setEjSel] = useState<number | null>(null);

  const clasificar = async () => {
    if (!texto.trim() || loading) return;
    setLoading(true);
    setRes(null);
    try {
      const prompt = `Eres un clasificador de documentos normativos y administrativos para Ecuador. Contexto: corpus MEF Ecuador (COPYFP, LOSNCP, COOTAD, LOEP, COPCI, CODA, TULSMA, normas CGE).
Devuelve SOLO un JSON con este esquema:
{"tipo_norma":"Ley / Reglamento / Acuerdo Ministerial / Resolución / Procedimiento / Requisito / Otro","area":"Finanzas Públicas / Contratación Pública / Gobierno Territorial / Ambiente / Control Interno / Otro","organismo_competente":["array"],"procedimiento_afectado":"texto","requisitos":["array"],"plazos":["array"],"obligaciones":["array"],"riesgos":["array"],"norma_probable":"texto","nivel":"Constitucional / Legal / Reglamentario / Administrativo / Técnico","resumen":"una línea"}
Solo JSON, sin markdown ni texto adicional.

Texto a clasificar:
${texto}`;

      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: "Eres un clasificador de documentos normativos para Ecuador (MEF). Devuelve SOLO JSON válido, sin markdown.",
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const d = await r.json();
      const raw = d.text || "";
      // Strip markdown code fences if present
      const clean = raw.replace(/```json?\n?/gi, "").replace(/```/g, "").trim();
      try {
        setRes(JSON.parse(clean));
      } catch {
        setRes({ resumen: raw, error: true });
      }
    } catch {
      setRes({ error: true, resumen: "Error de conexión." });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="text-xs font-bold text-blue-700 mb-1">Demo 2 — Clasificador de documentos normativos (Ecuador)</div>
        <div className="text-[11px] text-slate-500 leading-relaxed">
          Pega el texto de una norma, resolución o procedimiento ecuatoriano. El sistema lo clasifica por tipo, área, organismo competente, requisitos, plazos y riesgos de incumplimiento.
        </div>
      </div>

      {/* Ejemplos */}
      <div className="flex gap-2 flex-wrap items-center">
        <span className="text-[10px] text-slate-400">Ejemplos:</span>
        {RW_EJEMPLOS.map((e, i) => (
          <button key={i} onClick={() => { setTexto(e.texto); setEjSel(i); }}
            className={`rounded-full px-3 py-1 text-[10px] font-semibold border transition-colors ${
              ejSel === i
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            }`}>
            {e.label}
          </button>
        ))}
      </div>

      {/* Textarea + botón */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <textarea
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="Pega aquí el texto de la norma, resolución, procedimiento o requisito…"
          rows={5}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 resize-y leading-relaxed"
        />
        <button
          onClick={clasificar}
          disabled={loading || !texto.trim()}
          className="mt-3 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-lg transition-colors">
          {loading ? "Clasificando…" : "▶ Clasificar"}
        </button>
      </div>

      {/* Resultado */}
      {res && !res.error && (
        <div className="bg-white rounded-xl border border-emerald-200 p-5 shadow-sm">
          <div className="text-xs font-bold text-emerald-700 mb-3">✅ Clasificación completada</div>
          <div className="text-sm font-bold text-slate-800 mb-4">{res.resumen}</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              ["Tipo",              res.tipo_norma,    "text-blue-700"],
              ["Área",             res.area,          "text-teal-700"],
              ["Norma probable",   res.norma_probable,"text-slate-800"],
              ["Nivel jerárquico", res.nivel,         "text-slate-600"],
            ].map(([k, v, c]) => (
              <div key={k as string} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="text-[9px] text-slate-400 mb-1">{k}</div>
                <div className={`text-xs font-semibold ${c}`}>{v || "—"}</div>
              </div>
            ))}
          </div>
          {[
            ["Organismos",    res.organismo_competente, "text-slate-700",   "bg-slate-100",   "border-slate-200"],
            ["Requisitos",    res.requisitos,           "text-blue-700",    "bg-blue-50",     "border-blue-200"],
            ["Plazos",        res.plazos,               "text-amber-700",   "bg-amber-50",    "border-amber-200"],
            ["Obligaciones",  res.obligaciones,         "text-teal-700",    "bg-teal-50",     "border-teal-200"],
            ["Riesgos",       res.riesgos,              "text-red-700",     "bg-red-50",      "border-red-200"],
          ].map(([k, v, text, bg, border]) =>
            Array.isArray(v) && v.length > 0 ? (
              <div key={k as string} className={`rounded-lg p-3 border ${border} ${bg} mb-2`}>
                <div className="text-[9px] text-slate-400 mb-2">{k}</div>
                <div className="flex gap-1.5 flex-wrap">
                  {(v as string[]).map((x, i) => (
                    <span key={i} className={`text-[10px] font-semibold rounded-full px-2.5 py-0.5 border ${text} ${bg} ${border}`}>{x}</span>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
      {res?.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-700 font-semibold">
          {res.resumen || "Error al clasificar. Intenta de nuevo."}
        </div>
      )}
    </div>
  );
}

// ── ALERTAS ───────────────────────────────────────────────────────────────────
function RWAlertas() {
  return (
    <div className="flex flex-col gap-3">
      {RW_ALERTAS.map(a => {
        const ns = NIVEL_STYLE[a.nivel];
        return (
          <div key={a.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden`}>
            <div className={`${ns.bg} px-4 py-2 flex items-center gap-3 border-b ${ns.border}`}>
              <Pill text={a.nivel.toUpperCase()} className={`${ns.text} ${ns.bg} ${ns.border}`} />
              <AreaTag area={a.area} />
              <span className={`ml-auto text-[10px] font-semibold ${ns.text}`}>{a.fecha.slice(0, 7)}</span>
            </div>
            <div className="p-4">
              <div className="text-sm font-bold text-slate-800 mb-1.5">{a.titulo}</div>
              <div className="text-xs text-slate-500 leading-relaxed mb-3">{a.desc}</div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[9px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5">{a.norma}</span>
                <Pill text={`Impacto ${a.impacto}`} className={`${ns.text} ${ns.bg} ${ns.border}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── FUENTES ───────────────────────────────────────────────────────────────────
function RWFuentes() {
  const [fuentes, setFuentes] = useState(RW_FUENTES);
  const [showAdd, setShowAdd] = useState(false);
  const [nueva, setNueva] = useState({ nombre: "", url: "", tipo: "Portal institucional", desc: "" });
  const [adding, setAdding] = useState(false);

  const agregar = () => {
    if (!nueva.nombre || !nueva.url) return;
    setAdding(true);
    setTimeout(() => {
      setFuentes(p => [...p, {
        id: `F${String(p.length + 1).padStart(3, "0")}`,
        ...nueva, estado: "configurando", ultima_rev: "—", frecuencia: "Diaria", n_indexadas: 0, pais: "EC",
      }]);
      setNueva({ nombre: "", url: "", tipo: "Portal institucional", desc: "" });
      setShowAdd(false);
      setAdding(false);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm font-bold text-slate-800">Fuentes de monitoreo — Ecuador</div>
          <div className="text-[10px] text-slate-400">{fuentes.filter(f => f.estado === "activa").length} activas · {fuentes.length} configuradas</div>
        </div>
        <button onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors">
          {showAdd ? "Cancelar" : "+ Agregar fuente"}
        </button>
      </div>

      {showAdd && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="text-xs font-bold text-blue-700 mb-4">Nueva fuente en línea</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[["Nombre", "nombre"], ["URL", "url"]].map(([l, f]) => (
              <div key={f}>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{l}</label>
                <input type={f === "url" ? "url" : "text"} value={(nueva as Record<string, string>)[f]}
                  onChange={e => setNueva(p => ({ ...p, [f]: e.target.value }))}
                  placeholder={f === "url" ? "https://…" : ""}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300" />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Tipo</label>
            <select value={nueva.tipo} onChange={e => setNueva(p => ({ ...p, tipo: e.target.value }))}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none">
              {["Portal institucional","Diario oficial","Organismo técnico","Organismo fiscalizador","Base de datos","API","Repositorio académico"].map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Descripción</label>
            <textarea value={nueva.desc} onChange={e => setNueva(p => ({ ...p, desc: e.target.value }))}
              rows={2} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none resize-none" />
          </div>
          <button onClick={agregar} disabled={!nueva.nombre || !nueva.url || adding}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-200 text-white text-xs font-bold rounded-lg transition-colors">
            {adding ? "Agregando…" : "Agregar fuente"}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {fuentes.map(f => {
          const es = ESTADO_STYLE[f.estado] || ESTADO_STYLE.configurando;
          return (
            <div key={f.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    <span className="text-[9px] font-bold text-slate-500 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">{f.tipo}</span>
                    <Pill text={es.label} className={`${es.text} ${es.bg} border-transparent`} />
                  </div>
                  <div className="text-xs font-bold text-slate-800">{f.nombre}</div>
                  <a href={f.url} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] text-blue-500 hover:underline">{f.url}</a>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-black text-slate-800">{f.n_indexadas}</div>
                  <div className="text-[9px] text-slate-400">normas analizadas</div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-2">{f.desc}</p>
              <div className="flex gap-2 text-[9px] text-slate-400">
                <span>Última rev: <span className="font-semibold text-slate-500">{f.ultima_rev}</span></span>
                <span>·</span>
                <span>Frecuencia: <span className="font-semibold text-slate-500">{f.frecuencia}</span></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── CHAT REGWATCH EXPORTED TO PAGE.TSX ─────────────────────────────────────────

// ── TAB NAVIGATION ────────────────────────────────────────────────────────────
const RW_TABS = [
  { key: "rw_dashboard",    label: "Dashboard",             icon: "📊" },
  { key: "rw_registro",     label: "Registro Normativo",    icon: "📋" },
  { key: "rw_clasificador", label: "Clasificador IA",       icon: "🗂" },
  { key: "rw_alertas",      label: "Alertas",               icon: "🔔" },
];

type RWTab = "rw_dashboard" | "rw_registro" | "rw_clasificador" | "rw_alertas";

const TAB_LABEL: Record<RWTab, string> = {
  rw_dashboard:    "Dashboard · Centinela Regulatorio MEF",
  rw_registro:     "Registro Normativo",
  rw_clasificador: "Clasificador de Documentos",
  rw_alertas:      "Alertas Regulatorias",
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function RegWatchApp({ view = "default" }: { view?: "default" | "fuentes" }) {
  const [activeTab, setActiveTab] = useState<RWTab>("rw_dashboard");
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showInfographic, setShowInfographic] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (view === "fuentes") {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-slate-50 p-5 overflow-y-auto animate-fade-in">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Biblioteca de fuentes</div>
        <RWFuentes />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Top tab bar ── */}
      <div className="flex-shrink-0 flex items-center gap-1 px-4 pt-4 pb-0 bg-white border-b border-slate-200 overflow-x-auto">
        {RW_TABS.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key as RWTab)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-[11px] font-semibold whitespace-nowrap transition-all border-b-2 ${
              activeTab === t.key
                ? "border-slate-800 text-slate-800"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}>
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 pb-2 flex-shrink-0">
          <button
            onClick={() => setShowInfographic(true)}
            className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold text-white bg-[#0a1e32] hover:bg-[#12304c] rounded-full transition-colors uppercase tracking-widest shadow-md"
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> Resumen Ejecutivo
          </button>
          <button
            onClick={() => setShowHowItWorks(true)}
            className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors mr-2 uppercase tracking-widest"
          >
            <HelpCircle className="w-3.5 h-3.5" /> ¿Cómo funciona?
          </button>
          <span className="text-[10px] text-slate-400">{RW_NORMAS.length} normas · {RW_ALERTAS.length} alertas</span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block"></span>En línea
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main content area */}
        <div className="flex-1 overflow-y-auto p-5 bg-slate-50">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{TAB_LABEL[activeTab]}</div>
          {activeTab === "rw_dashboard"    && <RWDashboard />}
          {activeTab === "rw_registro"     && <RWRegistro />}
          {activeTab === "rw_clasificador" && <RWClasificador />}
          {activeTab === "rw_alertas"      && <RWAlertas />}
        </div>
      </div>

      {/* ── Modal: ¿Cómo funciona? ── */}
      {showHowItWorks && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowHowItWorks(false)}></div>
          <div className="relative bg-[#0F2D4A] border border-[#1D6FA4] rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-fade-up">
            
            {/* Header */}
            <div className="px-8 pt-8 pb-6 relative">
              <button 
                onClick={() => setShowHowItWorks(false)}
                className="absolute top-6 right-6 p-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <h4 className="text-[#38bdf8] text-[10px] font-bold uppercase tracking-widest mb-2">¿Cómo funciona Centinela Regulatorio MEF?</h4>
              <h2 className="text-2xl font-black text-white tracking-tight">Tres pasos para convertir normativa dispersa en conocimiento accionable</h2>
            </div>

            {/* Cards */}
            <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#1e3a5f] border border-[#2b4c7e] rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#0F2D4A] border border-[#1D6FA4] flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-[#fcd34d]" />
                </div>
                <h3 className="text-[#34d399] font-bold text-lg mb-3">1. Corpus</h3>
                <p className="text-blue-100/80 text-sm leading-relaxed">
                  El sistema indexa normas, resoluciones, acuerdos ministeriales e instructivos desde fuentes oficiales. Cada norma queda con trazabilidad documental y alerta de cambios.
                </p>
              </div>

              <div className="bg-[#1e3a5f] border border-[#2b4c7e] rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#0F2D4A] border border-[#1D6FA4] flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-[#fb923c]" />
                </div>
                <h3 className="text-[#34d399] font-bold text-lg mb-3">2. Procesamiento IA</h3>
                <p className="text-blue-100/80 text-sm leading-relaxed">
                  Al hacer una consulta, el motor busca en el corpus, identifica normas relevantes, mapea requisitos y plazos, y cita la fuente oficial.
                </p>
              </div>

              <div className="bg-[#1e3a5f] border border-[#2b4c7e] rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#0F2D4A] border border-[#1D6FA4] flex items-center justify-center mb-4">
                  <Search className="w-5 h-5 text-[#a78bfa]" />
                </div>
                <h3 className="text-[#34d399] font-bold text-lg mb-3">3. Respuesta trazable</h3>
                <p className="text-blue-100/80 text-sm leading-relaxed">
                  Recibes la respuesta con cita a la norma, organismo responsable y advertencia sobre límites de interpretación. Apoya el criterio del funcionario; no lo reemplaza.
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-[#0b2239] px-8 py-4 border-t border-[#1D6FA4]/30">
              <p className="text-center text-blue-200/50 text-[11px]">
                ⚠️ Centinela Regulatorio MEF no automatiza decisiones públicas ni reemplaza el criterio legal o técnico de los funcionarios. · Haz clic fuera para cerrar.
              </p>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* ── Modal: Infografía (Resumen Ejecutivo) ── */}
      {showInfographic && <RegWatchInfographicModal onClose={() => setShowInfographic(false)} />}
    </div>
  );
}

// Named re-exports for page.tsx usage
export { RW_NORMAS, RW_ALERTAS, RW_FUENTES };
