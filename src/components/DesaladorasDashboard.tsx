"use client";

import React, { useState } from "react";
import { 
  riesgoStyle, 
  gravStyle, 
  PROYECTOS, 
  OAECAS, 
  PERSISTENCIA_DATA, 
  BRECHAS_TECNICAS, 
  RIESGOS 
} from "../data/desaladorasData";
import { ShieldAlert, CheckCircle2, TrendingUp, AlertTriangle, Activity, FileText, UploadCloud } from "lucide-react";

// ── HELPERS ──────────────────────────────────────────────────────────────────
const Chip = ({ text, color, bg, small }: { text: string, color?: string, bg?: string, small?: boolean }) => (
  <span 
    className={`inline-flex items-center font-semibold rounded-full ${small ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'}`}
    style={color && bg ? { color, backgroundColor: bg } : undefined}
  >
    {text}
  </span>
);

const Bar = ({ value, max, color, height = 6 }: { value: number, max: number, color: string, height?: number }) => (
  <div className="flex-1 bg-slate-100 rounded-full overflow-hidden" style={{ height }}>
    <div style={{
      width: `${Math.round((value / max) * 100)}%`, height: "100%",
      backgroundColor: color, transition: "width 0.8s ease"
    }} className="rounded-full" />
  </div>
);

// ── TABS DATA ─────────────────────────────────────────────────────────────────
const TABS = [
  ["proyectos", "Proyectos"],
  ["oaecas", "Criterios Evaluador"],
  ["persistencia", "Persistencia"],
  ["brechas", "Brechas Técnicas"],
  ["riesgos", "Riesgos"],
  ["reportes", "Estado & Reportes"],
];

// ── PANEL COMPONENTS ──────────────────────────────────────────────────────────

const ProyectosPanel = () => {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="text-xs text-slate-500 font-medium pb-2 border-b border-slate-200">
        {PROYECTOS.length} proyectos · corpus 89 documentos SEIA
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {PROYECTOS.map(p => {
          const rs = riesgoStyle[p.riesgo as keyof typeof riesgoStyle];
          const isOpen = sel === p.id;
          return (
            <div key={p.id} onClick={() => setSel(isOpen ? null : p.id)}
              className={`bg-white border rounded-xl p-4 md:p-5 cursor-pointer transition-all duration-200 ${isOpen ? 'ring-2 ring-emerald-500/20 shadow-md border-emerald-200' : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'}`}>
              
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{p.id}</span>
                <Chip text={p.instrumento} color="#0369a1" bg="#e0f2fe" small />
                <Chip text={p.riesgo.toUpperCase()} color={rs?.color} bg={rs?.bg} small />
                <span className="ml-auto text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{p.region}</span>
              </div>
              
              <div className="text-sm font-bold text-slate-800 mb-1 leading-tight">{p.nombre}</div>
              <div className="text-xs text-slate-500 font-medium">{p.titular} <span className="opacity-50">·</span> {p.sector}</div>
              
              {isOpen && (
                <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      ["Capacidad", p.capacidad ? `${p.capacidad} L/s` : "N/D"],
                      ["Inversión", p.inversion ? `USD ${p.inversion}M` : "N/D"],
                      ["Ingreso SEIA", p.ingreso],
                      ["Estado", p.estado],
                      ["ICSARA 1", p.icsara1 ? `${p.icsara1} obs.` : "N/D"],
                      ["ICSARA 2", p.icsara2 ? `${p.icsara2} obs.` : p.icsara2 === null && p.instrumento === "DIA" ? "DIA (4 rondas)" : "En curso"],
                      ["Persistencia", p.persistencia !== null ? `${p.persistencia}%` : p.estado.includes("APROBADA") ? "0%" : "N/D"],
                    ].map(([k, v], i) => (
                      <div key={i} className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex flex-col justify-center">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-0.5">{k}</div>
                        <div className="text-xs text-slate-700 font-semibold">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-orange-50 border border-orange-100/50 rounded-lg p-3">
                    <div className="text-xs text-orange-800 leading-relaxed font-medium flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-orange-500" />
                      {p.flag_especial}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OAECAsPanel = () => {
  const [selO, setSelO] = useState("SUBPESCA");
  const oaeca = OAECAS.find(o => o.id === selO);
  return (
    <div className="flex flex-col gap-5 h-full">
      {/* OAECA selector */}
      <div className="flex gap-2 flex-wrap pb-4 border-b border-slate-200">
        {OAECAS.map(o => (
          <button key={o.id} onClick={() => setSelO(o.id)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${selO === o.id ? 'bg-slate-800 text-white border-slate-800 shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'}`}>
            {o.id}
          </button>
        ))}
      </div>
      
      {oaeca && (
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 mb-2">
            <div className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              {oaeca.nombre}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cobertura en corpus:</span>
              <Bar value={oaeca.cobertura} max={100} color="#0d9488" height={8} />
              <span className="text-xs font-bold text-emerald-700">{oaeca.cobertura}%</span>
            </div>
            <div className="text-xs font-bold text-red-600 bg-red-50 inline-flex px-3 py-1.5 rounded-lg border border-red-100">
              {oaeca.riesgo_plazo}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {oaeca.criterios.map((c, i) => {
              const is = ({
                "crítico": riesgoStyle["crítico"], "alto": riesgoStyle["alto"],
                "medio": riesgoStyle["medio"]
              } as any)[c.impacto];
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm animate-fade-in relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: is?.color }}></div>
                  <div className="flex items-start gap-3 mb-3 ml-2">
                    <Chip text={c.impacto.toUpperCase()} color={is?.color} bg={is?.bg} small />
                    <div className="text-sm font-bold text-slate-800 flex-1 leading-snug">{c.req}</div>
                  </div>
                  <div className="text-xs text-slate-600 mb-3 ml-2 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">Observación Típica</span>
                    {c.obs}
                  </div>
                  <div className="text-xs text-emerald-700 font-medium ml-2 flex items-start gap-2 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="leading-relaxed"><strong className="font-bold">Brecha a resolver: </strong>{c.brecha}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const PersistenciaPanel = () => {
  const [selProj, setSelProj] = useState("Coquimbo");
  const proyectos = [...new Set(PERSISTENCIA_DATA.map(d => d.proyecto))];
  const datos = PERSISTENCIA_DATA.filter(d => d.proyecto === selProj);
  const maxObs = Math.max(...datos.flatMap(d => [d.i1, d.i2]));

  return (
    <div className="flex flex-col gap-4">
      <div className="text-xs text-slate-500 font-medium pb-2 border-b border-slate-200 flex items-center justify-between">
        <span>Análisis de persistencia temática ICSARA 1 → ICSARA 2</span>
        <TrendingUp className="w-4 h-4 text-slate-400" />
      </div>
      <div className="flex gap-2 mb-2 flex-wrap">
        {proyectos.map(p => (
          <button key={p} onClick={() => setSelProj(p)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${selProj === p ? 'bg-slate-800 text-white border-slate-800 shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'}`}>
            {p}
          </button>
        ))}
      </div>
      
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {datos.map((d, i) => {
          const isCritical = d.pct >= 70;
          const isWarning = d.pct >= 40 && d.pct < 70;
          const pctColor = isCritical ? "#ef4444" : isWarning ? "#f97316" : "#eab308";
          const bgColor = isCritical ? "bg-red-50" : isWarning ? "bg-orange-50" : "bg-yellow-50";
          const borderColor = isCritical ? "border-red-100" : isWarning ? "border-orange-100" : "border-yellow-100";
          
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-sm font-bold text-slate-800 flex-1">{d.eje}</div>
                <div className={`text-sm font-black px-2 py-1 rounded-md ${bgColor} ${borderColor} border`} style={{ color: pctColor }}>{d.pct}%</div>
              </div>
              <div className="flex gap-3 items-center mb-2.5">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 w-14">ICSARA 1</span>
                <Bar value={d.i1} max={maxObs} color="#94a3b8" />
                <span className="text-xs font-bold text-slate-500 w-6 text-right">{d.i1}</span>
              </div>
              <div className="flex gap-3 items-center mb-4">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 w-14">ICSARA 2</span>
                <Bar value={d.i2} max={maxObs} color={pctColor} />
                <span className="text-xs font-bold w-6 text-right" style={{ color: pctColor }}>{d.i2}</span>
              </div>
              <div className={`flex flex-col gap-1.5 pt-3 border-t border-slate-100`}>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div style={{ width: `${d.pct}%`, backgroundColor: pctColor }} className="h-full rounded-full" />
                </div>
                <span className="text-[10px] font-semibold text-slate-500 text-center uppercase tracking-wider">
                  <span style={{ color: pctColor }}>{d.pct}%</span> persistencia s/resolución
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-white border border-slate-200 rounded-lg p-4 mt-2 shadow-sm text-xs font-medium text-slate-600 leading-relaxed">
        <span className="font-bold text-red-600">🔴 ≥70% persistencia</span>: Adenda técnicamente insuficiente o criterio evaluativo que escapa al alcance del titular.<br/>
        <span className="font-bold text-orange-500">🟠 40–69%</span>: Brecha parcialmente resuelta.<br/>
        <span className="font-bold text-yellow-500">🟡 &lt;40%</span>: Subsanable con Adenda bien diseñada.
      </div>
    </div>
  );
};

const BrecharPanel = () => {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="text-xs text-slate-500 font-medium pb-2 border-b border-slate-200">
        {BRECHAS_TECNICAS.length} brechas técnicas identificadas transversalmente
      </div>
      <div className="grid grid-cols-1 gap-3">
        {BRECHAS_TECNICAS.map((b, i) => {
          const gs = (gravStyle as any)[b.gravedad] || { color: "#64748b", bg: "#f1f5f9" };
          const isOpen = sel === b.id;
          return (
            <div key={b.id} onClick={() => setSel(isOpen ? null : b.id)}
              className={`bg-white border rounded-xl p-4 md:p-5 cursor-pointer transition-all duration-200 ${isOpen ? 'ring-2 ring-emerald-500/20 shadow-md border-emerald-200' : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'}`}>
              
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{b.id}</span>
                <Chip text={b.gravedad.toUpperCase()} color={gs.color} bg={gs.bg} small />
                <span className="ml-auto text-[10px] text-slate-400 uppercase tracking-wider font-semibold bg-slate-50 px-2 py-1 rounded border border-slate-100">{b.frecuencia}</span>
              </div>
              
              <div className="text-sm font-bold text-slate-800 mb-1.5">{b.componente}</div>
              <div className="text-xs text-slate-600 leading-relaxed font-medium">{b.descripcion}</div>
              
              {isOpen && (
                <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in flex flex-col gap-4">
                  <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    <div className="bg-red-50 border border-red-100/50 rounded-lg p-3">
                      <div className="text-[10px] text-red-800/60 uppercase tracking-wider font-bold mb-1">Impacto CAPEX</div>
                      <div className="text-xs font-bold text-red-600">{b.impacto_capex}</div>
                    </div>
                    <div className="bg-orange-50 border border-orange-100/50 rounded-lg p-3">
                      <div className="text-[10px] text-orange-800/60 uppercase tracking-wider font-bold mb-1">Impacto plazo</div>
                      <div className="text-xs font-bold text-orange-600">{b.impacto_plazo}</div>
                    </div>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                    <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Solución Recomendada
                    </div>
                    <div className="text-xs text-emerald-900 leading-relaxed font-medium">{b.solucion}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RiesgosPanel = () => {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="text-xs text-slate-500 font-medium pb-2 border-b border-slate-200">
        {RIESGOS.length} riesgos transversales identificados en corpus · Ordenados por criticidad
      </div>
      <div className="grid grid-cols-1 gap-3">
        {RIESGOS.map((r, i) => {
          const rs = (riesgoStyle as any)[r.nivel];
          const isOpen = sel === r.id;
          return (
            <div key={r.id} onClick={() => setSel(isOpen ? null : r.id)}
              className={`bg-white border rounded-xl p-4 md:p-5 cursor-pointer transition-all duration-200 ${isOpen ? 'ring-2 ring-emerald-500/20 shadow-md border-emerald-200' : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'}`}>
              
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{r.id}</span>
                <Chip text={r.nivel.toUpperCase()} color={rs?.color} bg={rs?.bg} small />
                <Chip text={r.categoria} color="#0369a1" bg="#e0f2fe" small />
              </div>
              
              <div className="text-sm font-bold text-slate-800 mb-1.5 leading-snug">{r.titulo}</div>
              <div className="text-xs text-slate-600 leading-relaxed font-medium">{r.descripcion}</div>
              
              {isOpen && (
                <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in flex flex-col gap-3">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                    <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider mb-2 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" /> Acción Estratégica Recomendada
                    </div>
                    <div className="text-xs text-emerald-900 leading-relaxed font-medium">{r.accion}</div>
                  </div>
                  
                  {r.jurisprudencia && (
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                      <div className="text-[10px] uppercase font-bold text-purple-700 tracking-wider mb-2">
                        ⚖️ Jurisprudencia / Base normativa
                      </div>
                      <div className="text-xs text-purple-900/80 leading-relaxed font-medium">{r.jurisprudencia}</div>
                    </div>
                  )}
                  
                  <div className="mt-2 text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Proyectos Afectados:</div>
                  <div className="flex gap-2 flex-wrap">
                    {r.proyectos.map(pid => {
                      const p = PROYECTOS.find(x => x.id === pid);
                      return p ? (
                        <span key={pid} className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {p.short}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReportesPanel = ({ requestPdfReport, isGeneratingPdf }: { requestPdfReport: (tipo: string) => void, isGeneratingPdf: boolean }) => {
  const aprobados = PROYECTOS.filter(p => p.estado.includes("APROBADA")).length;
  const evaluacion = PROYECTOS.filter(p => !p.estado.includes("APROBADA") && !p.estado.includes("RECHAZADA")).length;
  const rechazados = PROYECTOS.filter(p => p.estado.includes("RECHAZADA")).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Activity className="text-emerald-600 w-5 h-5" /> Estado del Portfolio de Desaladoras
        </h3>

        <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-black text-slate-700">{PROYECTOS.length}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">Total Proyectos</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-black text-emerald-600">{aprobados}</div>
            <div className="text-xs text-emerald-600 uppercase tracking-wide mt-1">RCAs Aprobadas</div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-black text-blue-600">{evaluacion}</div>
            <div className="text-xs text-blue-600 uppercase tracking-wide mt-1">En Evaluación</div>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-black text-rose-600">{rechazados}</div>
            <div className="text-xs text-rose-600 uppercase tracking-wide mt-1">Rechazados</div>
          </div>
        </div>

        <div className="w-full h-8 bg-slate-100 rounded-full overflow-hidden flex">
          {PROYECTOS.length > 0 && (
            <>
              <div style={{ width: `${(aprobados / PROYECTOS.length) * 100}%` }} className="bg-emerald-500 h-full transition-all"></div>
              <div style={{ width: `${(evaluacion / PROYECTOS.length) * 100}%` }} className="bg-blue-400 h-full transition-all"></div>
              <div style={{ width: `${(rechazados / PROYECTOS.length) * 100}%` }} className="bg-rose-500 h-full transition-all"></div>
            </>
          )}
        </div>
        <div className="text-center mt-4 text-sm font-bold text-slate-600">
          {Math.round((aprobados / PROYECTOS.length) * 100) || 0}% Tasa de Aprobación Global
        </div>

        <button 
          onClick={() => requestPdfReport('consolidado_desaladoras')} 
          disabled={isGeneratingPdf}
          className="mt-8 w-full py-4 bg-[#8ebc9b] hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 group"
        >
          {isGeneratingPdf ? (
            'Generando...'
          ) : (
            <>
              <FileText className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              Exportar Informe Documental Consolidado
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3">
          <ShieldAlert className="text-rose-600 w-5 h-5" /> Panel de Riesgos y Brechas Críticas
        </h3>

        <div className="flex flex-col gap-4 mb-8">
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-rose-800">Total de Riesgos Dimensionados</div>
              <div className="text-xs text-rose-600 mt-1">Análisis transversal por componente</div>
            </div>
            <div className="text-2xl font-black text-rose-700">{RIESGOS.length}</div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Se generará un reporte detallando las principales brechas en modelación marina, riesgos con evaluadores sectoriales y persistencia observada en líneas base que afectan el CAPEX o impiden la calificación favorable de iniciativas costeras.
          </p>
        </div>

        <button
          onClick={() => requestPdfReport('riesgos_desaladoras')}
          disabled={isGeneratingPdf}
          className="w-full py-4 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 group"
        >
          {isGeneratingPdf ? (
            'Generando...'
          ) : (
            <>
              <FileText className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              Exportar Reporte de Riesgos Técnicos (PDF)
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ── DASHBOARD COMPONENT EXPORT ───────────────────────────────────────────────────────────
export default function DesaladorasDashboard({ 
  requestPdfReport, 
  isGeneratingPdf 
}: { 
  requestPdfReport: (tipo: string) => void, 
  isGeneratingPdf: boolean 
}) {
  const [activeTab, setActiveTab] = useState("proyectos");
  const criticos = PROYECTOS.filter(p => p.riesgo === "crítico").length;
  const altos = PROYECTOS.filter(p => p.riesgo === "alto").length;
  const aprobados = PROYECTOS.filter(p => p.estado.includes("APROBADA")).length;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50 text-slate-800 animate-fade-in">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn { from { opacity:0; transform:translateY(4px) } to { opacity:1; transform:translateY(0) } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        /* Light scrollbar */
        .light-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .light-scroll::-webkit-scrollbar-track { background: transparent; }
        .light-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .light-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-5 md:p-8 flex-shrink-0 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-60 pointer-events-none"></div>
        <div className="absolute right-40 top-20 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] sm:text-xs text-emerald-700 font-bold tracking-widest uppercase font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              TITANIA SYNC · MÓDULO SANITARIO
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800 mb-1 tracking-tight">
            Análisis Documental SEIA: Desaladoras
          </h1>
          <div className="text-xs sm:text-sm text-slate-500 font-medium">
            89 documentos base <span className="opacity-50 mx-1">·</span> 18 proyectos <span className="opacity-50 mx-1">·</span> 6 jurisdicciones (2013–2026)
          </div>
          
          <div className="grid gap-3 mt-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
            {[
              { v: "89", l: "Docs. Corpus", c: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
              { v: "18", l: "Proyectos SEIA", c: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100" },
              { v: criticos, l: "Riesgo Crítico", c: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
              { v: "84.6%", l: "Tasa Aprobación", c: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
              { v: "139 m", l: "Plazo Promedio", c: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
              { v: "12x", l: "Var. Regional", c: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
            ].map((s, i) => (
              <div key={i} className={`rounded-xl p-3 border ${s.border} ${s.bg} flex flex-col justify-center shadow-sm`}>
                <div className={`text-lg md:text-xl font-black ${s.c} leading-tight`}>{s.v}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-slate-600 tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-white px-2 flex-shrink-0 light-scroll">
        {TABS.map(([k, l]) => (
          <button key={k} onClick={() => setActiveTab(k)} 
            className={`px-4 py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
              activeTab === k 
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300'
            }`}>
            {l}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="light-scroll flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50">
        <div className="max-w-4xl max-w-[1200px] mx-auto w-full">
          {activeTab === "proyectos" && <ProyectosPanel />}
          {activeTab === "oaecas" && <OAECAsPanel />}
          {activeTab === "persistencia" && <PersistenciaPanel />}
          {activeTab === "brechas" && <BrecharPanel />}
          {activeTab === "riesgos" && <RiesgosPanel />}
          {activeTab === "reportes" && <ReportesPanel requestPdfReport={requestPdfReport} isGeneratingPdf={isGeneratingPdf} />}
        </div>
      </div>
    </div>
  );
}
