"use client";

import { useState, useEffect, useRef } from "react";
import { PROJECT, FASES, MCA, SYSTEM_PROMPT } from "../data/mca";
import { Search, MessageSquare, Folder, Settings, Mic, Send, ChevronDown, CheckCircle2, AlertTriangle, FileText, Activity, ShieldAlert } from "lucide-react";

export default function TitaniaApp() {
  // ── STATES ──
  const [activeTab, setActiveTab] = useState("mca"); // "mca", "brechas", "reporte"
  const [faseFilter, setFaseFilter] = useState("Todas");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Compliance tracking (simulated DB)
  const [estado, setEstado] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    MCA.forEach(c => {
      init[c.id] = c.brecha ? "Incumplido" : "Pendiente";
    });
    return init;
  });

  // Chat
  const [messages, setMessages] = useState([
    {
      role: "assistant", 
      content: `Hola. Soy TitanIA, el asistente de análisis regulatorio del **${PROJECT.nombre}**.\n\nHe procesado la Matriz de Compromisos Ambientales (MCA). De los 47 compromisos, detecto **8 brechas** entre los compromisos evaluados y los recogidos en la RCA. ¿En qué te puedo ayudar hoy?` 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendChat = async (text?: string) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    setInput("");
    
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const promptContext = SYSTEM_PROMPT + "\n\nESTADO ACTUAL DE COMPROMISOS:\n" + 
        JSON.stringify(estado) + "\n\nMCA COMPLETA:\n" + JSON.stringify(MCA);
      
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: promptContext,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "No se pudo procesar la respuesta.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      // Fallback for demo without real API key
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "Este es un entorno de demostración. La conexión con la API requiere configuración de variables de entorno, pero puedo confirmar que he registrado tu consulta sobre la matriz ambiental." 
        }]);
        setLoading(false);
      }, 1500);
      return;
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChat();
    }
  };

  // Helper Stats
  const filtrado = MCA.filter(c => 
    (faseFilter === "Todas" || c.fase === faseFilter) &&
    (activeTab !== "brechas" || c.brecha !== null)
  );

  const stats = {
    total: filtrado.length,
    cumplidos: filtrado.filter(c => estado[c.id] === "Cumplido").length,
    pendientes: filtrado.filter(c => estado[c.id] === "Pendiente").length,
    incumplidos: filtrado.filter(c => estado[c.id] === "Incumplido").length,
  };

  // ── RENDER ──
  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-800 overflow-hidden">
      
      {/* ── LEFT SIDEBAR (BRANDING & NAV) ── */}
      <nav className="w-[18rem] flex-shrink-0 bg-[#2c4c3b] relative flex flex-col text-white z-10 shadow-xl overflow-hidden">
        {/* Subtle background pattern/texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 h40 M20 0 v40" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.3"/>
                <circle cx="20" cy="20" r="2" fill="#ffffff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
          {/* Faint green glow */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8ebc9b] rounded-full blur-[100px] opacity-20"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full p-6">
          {/* Logo Top (optional, following the mockup where logo is at bottom) */}
          <div className="flex items-center gap-3 mb-10 opacity-0">...</div>
          
          {/* Search Bar */}
          <div className="relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-800" />
            <input 
              type="text" 
              placeholder="Buscar" 
              className="w-full bg-white rounded-full py-2.5 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 font-medium border-0 focus:ring-2 focus:ring-[#8ebc9b] transition-all"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-5 flex-1 pl-2">
            <button className="flex items-center gap-4 text-white hover:text-[#8ebc9b] transition-colors font-medium text-sm text-left group">
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              TitanIA Chat
            </button>
            <button className="flex items-center gap-4 text-white hover:text-[#8ebc9b] transition-colors font-medium text-sm text-left group">
              <Folder className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Ver Mis Proyectos
            </button>
            <button className="flex items-center gap-4 text-white hover:text-[#8ebc9b] transition-colors font-medium text-sm text-left group">
              <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Configuración
            </button>
          </div>

          {/* Logo Bottom */}
          <div className="mt-auto flex flex-col items-center justify-center opacity-90 border-t border-emerald-800/50 pt-8 pb-4">
            {/* 3D-like Cube Logo Representation */}
            <div className="relative w-14 h-16 mb-4 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                <polygon points="50,10 90,30 50,55 10,30" fill="#f0fdff" />
                <polygon points="10,30 50,55 50,95 10,75" fill="#e2f5f6" />
                <polygon points="90,30 90,75 50,95 50,55" fill="#c4eff1" />
                {/* Y Shape Inner cut */}
                <polyline points="25,40 50,55 50,85" stroke="#ffffff" strokeWidth="4" fill="none" className="opacity-50" />
                <polyline points="75,40 50,55" stroke="#ffffff" strokeWidth="4" fill="none" className="opacity-50" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-[0.3em] font-sans text-white uppercase ml-2">
              Titania
            </span>
          </div>
        </div>
      </nav>

      {/* ── CENTER PANEL (MAIN DASHBOARD) ── */}
      <main className="flex-1 flex flex-col min-w-0 bg-white border-r border-slate-200 shadow-sm z-0">
        
        {/* Header Title */}
        <div className="pt-10 px-10 pb-6">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-wide uppercase mb-8">
            Detalle de Permisos y Fuentes Normativas
          </h1>
          
          {/* Project Selector / Subtitle */}
          <div className="flex items-center gap-3 text-emerald-600 font-semibold text-lg pb-4 border-b border-slate-100">
            <ChevronDown className="w-6 h-6" />
            Proyecto de Inversión {PROJECT.nombre}
          </div>
        </div>

        {/* Action Tabs & Filters (Minimalist approach to match the clean UI) */}
        <div className="px-10 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-6 border-b border-slate-200">
            {[
              { id: "mca", label: "Todos los Permisos", icon: FileText },
              { id: "brechas", label: "Brechas Detectadas", icon: ShieldAlert },
              { id: "reporte", label: "Estado & Reportes", icon: Activity }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 flex items-center gap-2 text-sm font-semibold transition-all border-b-2 
                  ${activeTab === tab.id ? 'border-[#8ebc9b] text-[#8ebc9b]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Fase Filter Pills */}
          {activeTab !== "reporte" && (
            <div className="flex bg-slate-50 p-1 rounded-full border border-slate-200">
              {["Todas", ...FASES].map(f => (
                <button 
                  key={f}
                  onClick={() => setFaseFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    faseFilter === f 
                    ? 'bg-white text-emerald-700 shadow-sm border border-emerald-100' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-10 pb-12">
          
          {activeTab !== "reporte" ? (
            <div className="flex flex-col gap-6">
              {filtrado.map((c, i) => {
                const isSelected = selectedId === c.id;
                const reqAttn = c.brecha || estado[c.id] === "Incumplido";
                return (
                  <div 
                    key={c.id} 
                    onClick={() => setSelectedId(isSelected ? null : c.id)}
                    className={`bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow cursor-pointer animate-fade-up ${
                      isSelected ? 'ring-2 ring-emerald-100' : ''
                    }`}
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    {/* Number block (Left accent) */}
                    <div className="w-20 hidden sm:flex flex-col items-center pt-8 bg-emerald-50/50 border-r border-slate-50">
                      <span className="text-[#8ebc9b] font-bold tracking-widest text-sm">
                        {c.id.replace('C-','')}
                      </span>
                    </div>

                    {/* Main content block */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col gap-6">
                      
                      {/* Top Row: Title & Badges */}
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-slate-800 font-bold text-sm leading-relaxed max-w-3xl pr-4">
                            {c.texto}
                          </h3>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          {/* Compliance Selector Dropdown */}
                          <select 
                            value={estado[c.id]}
                            onChange={e => setEstado(prev => ({...prev, [c.id]: e.target.value}))}
                            onClick={e => e.stopPropagation()}
                            className={`text-xs font-bold rounded-md px-3 py-1.5 border appearance-none cursor-pointer pr-8 bg-no-repeat bg-[right_0.5rem_center] bg-[length:12px_12px]
                              ${estado[c.id] === 'Cumplido' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                                estado[c.id] === 'Pendiente' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                                'bg-red-50 text-red-700 border-red-200'}`}
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")` }}
                          >
                            <option value="Cumplido">✅ Cumplido</option>
                            <option value="Pendiente">⚠ Pendiente</option>
                            <option value="Incumplido">🔴 Incumplido</option>
                            <option value="No aplica">⚪ No aplica</option>
                          </select>
                          
                          {/* Brecha Warning Badge */}
                          {c.brecha && (
                            <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-md px-2 py-1 text-[10px] font-bold">
                              <AlertTriangle className="w-3 h-3" />
                              BRECHA RCA
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Info Grid (Mimicking the table layout in the image) */}
                      <div className="flex flex-col lg:flex-row gap-6">
                        
                        {/* Status/Origen Block */}
                        <div className="flex flex-col gap-2 w-full lg:w-48 flex-shrink-0">
                          <div className="bg-[#518b62] text-white text-xs font-medium px-4 py-3 rounded-md shadow-sm">
                            <div className="uppercase tracking-wider text-[10px] text-emerald-100 mb-1 opacity-80">Fuente normativa</div>
                            <div>{c.origen} {c.rca_art !== "—" ? `→ ${c.rca_art}` : ""}</div>
                          </div>
                          
                          <div className="bg-slate-50 border border-slate-100 text-xs text-slate-600 px-4 py-2.5 rounded-md">
                            <div className="uppercase tracking-wider text-[9px] text-slate-400 mb-0.5">Fase</div>
                            <div className="font-semibold text-slate-700">{c.fase}</div>
                          </div>
                        </div>

                        {/* Metadata Data Grid */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 p-4 bg-slate-50/50 rounded-lg border border-slate-100 align-start self-start text-xs text-slate-600">
                          <div className="flex justify-between border-b border-slate-200/60 pb-2">
                            <span className="text-slate-400">Organismo</span>
                            <span className="font-semibold text-slate-800 text-right">{c.organismo}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-200/60 pb-2">
                            <span className="text-slate-400">Responsable</span>
                            <span className="font-semibold text-slate-800 text-right">{c.responsable.split('—')[0].trim()}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-200/60 pb-2">
                            <span className="text-slate-400">Tipo de compromiso</span>
                            <span className="font-semibold text-slate-800 text-right">{c.tipo}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-200/60 pb-2">
                            <span className="text-slate-400">Frecuencia / Plazo</span>
                            <span className="font-semibold text-slate-800 text-right">{c.frecuencia.split('(')[0]}</span>
                          </div>
                          <div className="flex justify-between col-span-1 sm:col-span-2 pt-1">
                            <span className="text-slate-400">Indicador</span>
                            <span className="font-medium text-slate-700 text-right max-w-md">{c.indicador}</span>
                          </div>
                        </div>
                      </div>

                      {/* Expanded View for Trazabilidad & Brecha Details */}
                      {isSelected && (
                        <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-up">
                          {/* Trazabilidad Steps */}
                          <div className="mb-6">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Ruta de Evaluación</div>
                            <div className="flex flex-wrap items-center gap-3">
                              {c.traza.map((step, idx) => (
                                <div key={idx} className="flex items-center">
                                  {idx > 0 && <span className="text-slate-300 px-2">›</span>}
                                  <span className={`text-xs px-3 py-1 rounded-full ${
                                    step.includes('RCA') 
                                    ? 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-200' 
                                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                                  }`}>
                                    {step.replace('→', '').trim()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Detail Brecha Analysis */}
                          {c.brecha && (
                            <div className="bg-rose-50 border-[1.5px] border-rose-200 rounded-lg p-5 flex gap-4">
                              <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <h4 className="text-sm font-bold text-rose-800 mb-1">Análisis de Brecha Normativa</h4>
                                <p className="text-xs text-rose-700 leading-relaxed mb-3">{c.brecha}</p>
                                <div className="inline-flex items-center gap-1.5 bg-white border border-rose-200 px-3 py-1.5 rounded-md text-[10px] text-rose-600 font-bold shadow-sm">
                                  <span>⚖</span> Evaluar requerimiento a la autoridad según Art. 20 Ley 19.300
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
              
              {filtrado.length === 0 && (
                <div className="text-center py-20 px-6 bg-slate-50 border border-slate-200 border-dashed rounded-xl">
                  <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-slate-600 font-medium">No se encontraron compromisos.</h3>
                </div>
              )}
            </div>
          ) : (
            /* REPORTE PANEL */
            <div className="max-w-2xl mx-auto flex flex-col gap-8 animate-fade-up">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <Activity className="text-emerald-600" /> Stats de Cumplimiento Ambiental
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-black text-slate-700">{stats.total}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">Total</div>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-black text-emerald-600">{stats.cumplidos}</div>
                    <div className="text-xs text-emerald-600 uppercase tracking-wide mt-1">Cumplidos</div>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-black text-amber-600">{stats.pendientes}</div>
                    <div className="text-xs text-amber-600 uppercase tracking-wide mt-1">Pendientes</div>
                  </div>
                  <div className="bg-rose-50 border border-rose-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-black text-rose-600">{stats.incumplidos}</div>
                    <div className="text-xs text-rose-600 uppercase tracking-wide mt-1">Incumplidos</div>
                  </div>
                </div>

                <div className="w-full h-8 bg-slate-100 rounded-full overflow-hidden flex">
                  {stats.total > 0 && (
                    <>
                      <div style={{ width: `${(stats.cumplidos/stats.total)*100}%` }} className="bg-emerald-500 h-full transition-all"></div>
                      <div style={{ width: `${(stats.pendientes/stats.total)*100}%` }} className="bg-amber-400 h-full transition-all"></div>
                      <div style={{ width: `${(stats.incumplidos/stats.total)*100}%` }} className="bg-rose-500 h-full transition-all"></div>
                    </>
                  )}
                </div>
                <div className="text-center mt-4 text-sm font-bold text-slate-600">
                  {Math.round((stats.cumplidos/stats.total)*100) || 0}% de Tasa de Cumplimiento
                </div>
                
                <button className="mt-8 w-full py-4 bg-[#8ebc9b] hover:bg-[#7ba3a0] text-white rounded-lg font-bold transition-colors shadow-sm flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" /> 
                  Exportar Informe PDF Consolidado
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── RIGHT CHAT PANEL (ASSISTANT) ── */}
      <aside className="w-[20rem] xl:w-[26rem] flex-shrink-0 bg-white border-l border-slate-200 flex flex-col relative shadow-[-4px_0_20px_rgba(0,0,0,0.02)] z-10">
        
        {/* Chat Header */}
        <div className="py-6 px-6 border-b border-slate-100">
          <h2 className="text-[1.1rem] font-medium text-slate-400 tracking-wider">
            Chat Asistente Titan<span className="font-black text-[#518b62]">IA</span><span className="text-[#8ebc9b] ml-1">⋮</span>
          </h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scroll-smooth bg-slate-50/30">
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            return (
              <div key={i} className={`flex flex-col max-w-[90%] animate-fade-up ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
                {/* Avatar */}
                {!isUser && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black">!</div>
                    <span className="text-[10px] font-bold text-emerald-700 tracking-wide uppercase">TitanIA</span>
                  </div>
                )}
                {/* Bubble */}
                <div className={`p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                  isUser 
                  ? 'bg-slate-800 text-white rounded-2xl rounded-tr-sm shadow-sm' 
                  : 'bg-white text-slate-600 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            );
          })}
          
          {loading && (
            <div className="flex items-center gap-2 mb-2 self-start animate-fade-up">
              <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black">!</div>
              <div className="bg-white border md:min-w-16 border-slate-200 p-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce-custom" style={{ animationDelay: `${i * 0.15}s` }}></div>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} className="h-2 flex-shrink-0" />
        </div>

        {/* Suggestion Chips */}
        {messages.length <= 2 && !loading && (
          <div className="px-6 pb-2 pt-4 flex flex-wrap gap-2 bg-slate-50/30">
            {["¿Qué brechas encontraste?", "Resumen de permisos", "Generar reporte"].map((s, i) => (
              <button 
                key={i} 
                onClick={() => sendChat(s)}
                className="text-[11px] bg-white border border-emerald-100 text-emerald-600 px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Chat Input Area */}
        <div className="p-6 bg-white border-t border-slate-100">
          <p className="text-xs text-slate-500 leading-relaxed mb-4 text-center px-4">
            Ingresa los antecedentes técnicos de tu proyecto de inversión para avanzar.<br/><br/>
            Si tienes alguna duda acerca de la información requerida, siempre puedes pedirme ayuda.
          </p>
          
          <div className="relative flex items-center">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Enviar mensaje"
              disabled={loading}
              rows={1}
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-4 pl-6 pr-20 text-sm text-slate-700 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#8ebc9b] focus:border-transparent transition-all resize-none overflow-hidden max-h-32"
            />
            <div className="absolute right-3 flex items-center gap-1">
              <button className="text-slate-400 p-2 hover:text-[#8ebc9b] transition-colors bg-white rounded-full">
                <Mic className="w-5 h-5" />
              </button>
              <button 
                onClick={() => sendChat()}
                disabled={!input.trim() || loading}
                className="text-slate-400 p-2 hover:text-slate-800 disabled:opacity-50 disabled:hover:text-slate-400 focus:bg-white rounded-full bg-white transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

    </div>
  );
}