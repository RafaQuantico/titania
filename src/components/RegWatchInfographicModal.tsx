import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Zap, AlertTriangle, FileText, Search, Bell, ShieldCheck } from "lucide-react";

export default function RegWatchInfographicModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-[#f8fafc] rounded-2xl shadow-2xl w-full max-w-6xl flex flex-col my-auto border border-slate-200 overflow-hidden animate-fade-up max-h-full">
        
        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 hover:scale-105 transition-all backdrop-blur-md shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto w-full h-full custom-scrollbar">
          {/* Header Section (Dark Blue) */}
          <div className="bg-gradient-to-br from-[#0a1e32] to-[#12304c] text-white p-8 md:p-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a4066] rounded-full blur-3xl opacity-30 -mr-20 -mt-20"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-8">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight leading-none">Sentinela Regulatorio MEF</h2>
                    <p className="text-blue-200/70 text-[11px] uppercase tracking-widest mt-1">Powered by Titania · Inteligencia Regulatoria IA</p>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4 tracking-tight">
                  Convierte normativa dispersa <br/>
                  <span className="text-orange-400">en conocimiento accionable</span>
                </h1>
                
                <p className="text-blue-100/80 text-base max-w-2xl leading-relaxed">
                  Plataforma de monitoreo e inteligencia regulatoria para el Ministerio de Economía y Finanzas de Ecuador. Monitoreo automático de fuentes oficiales, clasificación IA de documentos y alertas en tiempo real sobre cambios normativos que afectan la gestión del MEF.
                </p>
              </div>

              {/* Stats Column */}
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center w-full md:w-32 shadow-xl shadow-black/10">
                  <span className="text-3xl font-black text-orange-400">16+</span>
                  <span className="text-[10px] text-blue-200 uppercase tracking-wider text-center mt-1">Normas MEF<br/>indexadas</span>
                </div>
                <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center w-full md:w-32 shadow-xl shadow-black/10">
                  <span className="text-3xl font-black text-sky-400">7</span>
                  <span className="text-[10px] text-blue-200 uppercase tracking-wider text-center mt-1">Fuentes<br/>monitoreadas</span>
                </div>
                <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center w-full md:w-32 shadow-xl shadow-black/10">
                  <span className="text-3xl font-black text-emerald-400">6</span>
                  <span className="text-[10px] text-blue-200 uppercase tracking-wider text-center mt-1">Alertas<br/>activas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid Content */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-12">
                
                {/* El desafío */}
                <section>
                  <h4 className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-3">El Desafío Institucional</h4>
                  <h3 className="text-2xl font-bold text-slate-800 mb-5">Normativa abundante, acceso fragmentado</h3>
                  
                  <div className="bg-orange-50/50 border border-orange-200/60 rounded-2xl p-6 shadow-sm">
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">
                      El MEF trabaja con un marco normativo extenso y en permanente evolución: COPYFP, LOSNCP, COOTAD, LOEP, CODA y decenas de acuerdos ministeriales, resoluciones SERCOP y criterios CGE. La información existe, pero está dispersa entre múltiples fuentes, en formatos distintos y sin alertas automáticas cuando algo cambia.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                        <span className="text-slate-600 text-sm">¿Qué reforma de la LOSNCP aplica hoy al proceso que estoy iniciando?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                        <span className="text-slate-600 text-sm">¿Cambió el modelo de transferencias a los GADs con la reforma de enero?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                        <span className="text-slate-600 text-sm">¿El catálogo SERCOP ya permite contratar servicios de IA directamente?</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Cómo funciona */}
                <section>
                  <h4 className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-3">Cómo Funciona</h4>
                  <h3 className="text-2xl font-bold text-slate-800 mb-5">Tres pasos, respuesta trazable</h3>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#0a1e32] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">1</div>
                      <div>
                        <h5 className="font-bold text-slate-800 mb-1">Corpus indexado</h5>
                        <p className="text-slate-600 text-sm leading-relaxed">El sistema ingiere normas, decretos, resoluciones e instructivos desde el Registro Oficial, MEF, SERCOP, Contraloría y MAATE. Cada norma queda con historial de cambios y alertas de modificación.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#0a1e32] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">2</div>
                      <div>
                        <h5 className="font-bold text-slate-800 mb-1">Procesamiento IA</h5>
                        <p className="text-slate-600 text-sm leading-relaxed">Cuando el funcionario hace una consulta, el motor busca en el corpus, identifica las normas relevantes, mapea requisitos, plazos y organismos competentes, y cita la fuente oficial.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#0a1e32] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">3</div>
                      <div>
                        <h5 className="font-bold text-slate-800 mb-1">Respuesta trazable</h5>
                        <p className="text-slate-600 text-sm leading-relaxed">La respuesta incluye: (1) norma que sustenta, (2) organismo responsable, (3) límites de interpretación. El sistema apoya el criterio del funcionario; no lo reemplaza.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Corpus Piloto */}
                <section>
                  <h4 className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">Corpus Piloto — Marco MEF Ecuador</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-emerald-300 transition-colors">
                      <div className="font-bold text-slate-800 text-sm">COPYFP</div>
                      <div className="text-slate-500 text-[10px] mt-0.5">Planificación y Finanzas Públicas</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-emerald-300 transition-colors">
                      <div className="font-bold text-slate-800 text-sm">LOSNCP</div>
                      <div className="text-slate-500 text-[10px] mt-0.5">Contratación Pública (ref. 2024)</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-emerald-300 transition-colors">
                      <div className="font-bold text-slate-800 text-sm">COOTAD</div>
                      <div className="text-slate-500 text-[10px] mt-0.5">Territorial y transferencias GADs</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-emerald-300 transition-colors">
                      <div className="font-bold text-slate-800 text-sm">LOEP</div>
                      <div className="text-slate-500 text-[10px] mt-0.5">Empresas Públicas</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-emerald-300 transition-colors">
                      <div className="font-bold text-slate-800 text-sm">COPCI</div>
                      <div className="text-slate-500 text-[10px] mt-0.5">Inversión y Fomento Productivo</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-emerald-300 transition-colors">
                      <div className="font-bold text-slate-800 text-sm">Normas CGE</div>
                      <div className="text-slate-500 text-[10px] mt-0.5">Control Interno Sector Público</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-emerald-300 transition-colors">
                      <div className="font-bold text-slate-800 text-sm">CODA / TULSMA</div>
                      <div className="text-slate-500 text-[10px] mt-0.5">Ambiente — proyectos inversión</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-emerald-300 transition-colors">
                      <div className="font-bold text-slate-800 text-sm">Resol. SERCOP</div>
                      <div className="text-slate-500 text-[10px] mt-0.5">Catálogo + contratación directa IA</div>
                    </div>
                  </div>
                </section>

              </div>

              {/* Divider for Desktop */}
              <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-6 space-y-12">
                
                {/* Módulos */}
                <section>
                  <h4 className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-3">Tres módulos demostrativos</h4>
                  <h3 className="text-2xl font-bold text-slate-800 mb-5">Piloto funcional — alcance controlado</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Demo 1</span>
                        <Search className="w-4 h-4 text-emerald-600" />
                        <h5 className="font-bold text-slate-800">Consulta regulatoria trazable</h5>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Asistente IA que responde qué norma aplica a un trámite del MEF, con cita a la fuente, organismo responsable y advertencia sobre límites de interpretación. Útil para consultas internas, análisis de viabilidad y resolución de dudas normativas.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Demo 2</span>
                        <FileText className="w-4 h-4 text-sky-600" />
                        <h5 className="font-bold text-slate-800">Clasificador de documentos</h5>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Toma el texto de una norma, resolución o procedimiento y lo clasifica automáticamente: tipo de norma, materia, organismo competente, procedimiento afectado, requisitos, plazos, obligaciones y riesgos de incumplimiento.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Demo 3</span>
                        <Bell className="w-4 h-4 text-orange-500" />
                        <h5 className="font-bold text-slate-800">Vigilancia y alertas</h5>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Dashboard que detecta cambios normativos en tiempo real, identifica materias afectadas y genera alertas sobre procesos del MEF que deben revisarse ante una modificación regulatoria.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Alertas Activas */}
                <section>
                  <h4 className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">Alertas Activas Hoy — Ecuador</h4>
                  
                  <div className="space-y-3">
                    <div className="bg-red-50/50 border border-red-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse"></div>
                      <div>
                        <h5 className="font-bold text-slate-800 text-sm mb-1">Reforma COOTAD ene.2025 — nuevo modelo transferencias GADs</h5>
                        <p className="text-slate-600 text-xs leading-relaxed">Afecta directamente la liquidación presupuestaria del MEF hacia GADs. Revisar fórmulas de distribución actualizadas.</p>
                      </div>
                    </div>
                    
                    <div className="bg-red-50/50 border border-red-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse"></div>
                      <div>
                        <h5 className="font-bold text-slate-800 text-sm mb-1">Reglamento LOSNCP post-reforma 2024 pendiente</h5>
                        <p className="text-slate-600 text-xs leading-relaxed">Los nuevos umbrales de contratación directa están vigentes pero el reglamento actualizado no ha sido publicado. Riesgo de observaciones CGE.</p>
                      </div>
                    </div>

                    <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                      <div>
                        <h5 className="font-bold text-slate-800 text-sm mb-1">Catálogo SERCOP oct.2024 — servicios IA incorporados</h5>
                        <p className="text-slate-600 text-xs leading-relaxed">Los servicios de inteligencia artificial y GovTech ya están en el catálogo normalizado. Abre la puerta a contratación directa de pilotos tecnológicos.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Próximos pasos */}
                <section className="bg-[#0a1e32] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                  
                  <h4 className="text-white text-lg font-bold mb-5 relative z-10">Próximos pasos — Piloto Titania × MEF</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
                    <div className="bg-white/10 border border-white/10 rounded-xl p-4">
                      <div className="text-sky-400 font-black text-2xl mb-1">1</div>
                      <h5 className="text-white font-bold text-sm mb-2">Firma NDA</h5>
                      <p className="text-blue-100/70 text-xs leading-relaxed">Habilita intercambio de información y define reglas de confidencialidad.</p>
                    </div>
                    <div className="bg-white/10 border border-white/10 rounded-xl p-4">
                      <div className="text-sky-400 font-black text-2xl mb-1">2</div>
                      <h5 className="text-white font-bold text-sm mb-2">Diagnóstico</h5>
                      <p className="text-blue-100/70 text-xs leading-relaxed">Semanas 1-3: Identificar el caso de uso prioritario y el corpus inicial con el equipo MEF.</p>
                    </div>
                    <div className="bg-emerald-900/50 border border-emerald-500/30 rounded-xl p-4">
                      <div className="text-emerald-400 font-black text-2xl mb-1">3</div>
                      <h5 className="text-white font-bold text-sm mb-2">Piloto funcional</h5>
                      <p className="text-emerald-100/70 text-xs leading-relaxed">8-12 semanas. USD 30.000-50.000. Entregable: PV validado + roadmap de escalamiento.</p>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-white border-t border-slate-200 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-start gap-2 max-w-2xl">
              <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <p className="text-slate-500 text-[10px] leading-relaxed">
                ⚠️ Sentinela Regulatorio MEF no automatiza decisiones públicas ni reemplaza el criterio legal o técnico de los funcionarios. <br className="hidden sm:block"/>
                La plataforma apoya la búsqueda, análisis y estructuración de información regulatoria, manteniendo intacta la responsabilidad institucional del MEF.
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-bold text-slate-800 text-sm">Titania SpA</div>
              <div className="text-slate-500 text-xs mt-0.5">titania-ia.com · nicolas@quantico.cl</div>
              <div className="text-slate-400 text-[10px] mt-0.5 uppercase tracking-wider">Junio 2026</div>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
