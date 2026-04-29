"use client";

import { useState, useEffect, useRef } from "react";
import { PROJECT, FASES, MCA, SYSTEM_PROMPT } from "../data/mca";
import { SYSTEM_PROMPT_DESALADORAS } from "../data/desaladorasData";
import { Search, Sparkles as MessageSquare, Layers as Folder, SlidersHorizontal as Settings, Mic, SendHorizontal as Send, ChevronDown, ShieldCheck as CheckCircle2, TriangleAlert as AlertTriangle, BookOpen as FileText, Activity, BadgeAlert as ShieldAlert, Menu, X, UploadCloud } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DesaladorasDashboard from "../components/DesaladorasDashboard";

const INITIAL_BIBLIOTECA_DOCS = [
  { id: 1, tipo: "RCA", titulo: "Resolución de Calificación Ambiental (RCA)", fecha: "12/08/2023", autor: "SEA", estado: "Firmado digitalmente", file: "RCA_N_202510001198__Brisas_de_Mirasur___003__firmada.pdf" },
  { id: 2, tipo: "ICE", titulo: "Informe Consolidado de Evaluación (ICE)", fecha: "25/07/2023", autor: "SEA", estado: "Aprobado", file: "Documento - 2025_09_30_cc95-c9d7-46d8-ad29-746266234343.pdf" },
  { id: 3, tipo: "Adenda", titulo: "Adenda Complementaria", fecha: "10/06/2023", autor: "Titular", estado: "Revisada - 4 Anexos", file: "Documento - 2025_07_31_dd73-f244-4fb8-8bbc-f6138d26d275.pdf" },
  { id: 4, tipo: "Adenda", titulo: "Adenda N°1", fecha: "15/04/2023", autor: "Titular", estado: "Entregada - 17 Anexos", file: "Documento - 2025_01_06_e924-8f91-46a1-b6af-59a0d5e8c99f.pdf" },
  { id: 5, tipo: "ICSARA", titulo: "Informe Consolidado de Solicitud de Aclaraciones", fecha: "20/03/2023", autor: "SEA", estado: "Emitido", file: "icsara_1.pdf" },
  { id: 6, tipo: "Oficio", titulo: "Oficio pronunciamiento con observaciones", fecha: "05/03/2023", autor: "SISS", estado: "Con observaciones", file: "oficio_siss_obs.pdf" },
  { id: 7, tipo: "Oficio", titulo: "Oficio pronunciamiento conforme con condición", fecha: "02/03/2023", autor: "CMN", estado: "Conforme", file: "oficio_cmn_cond.pdf" },
  { id: 8, tipo: "DIA", titulo: "Declaración de Impacto Ambiental (DIA)", fecha: "10/01/2023", autor: "Titular", estado: "Ingresada - 43 Anexos", file: "1761338287_2166686677.pdf" }
];

const INITIAL_BIBLIOTECA_DOCS_DESALADORAS = [
  { id: 1, tipo: "EIA", titulo: "Estudio de Impacto Ambiental (EIA) - Ampliación Norte", fecha: "15/10/2024", autor: "Titular", estado: "Ingresado - 120 Anexos", file: "EIA_Ampliacion_Norte_2024.pdf" },
  { id: 2, tipo: "ICSARA", titulo: "ICSARA N°1 - Proyecto Huaquén", fecha: "05/08/2024", autor: "SEA", estado: "Emitido - 450 Observaciones", file: "ICSARA_1_Huaquen.pdf" },
  { id: 3, tipo: "Adenda", titulo: "Adenda N°1 - Aguas de Aconcagua", fecha: "12/05/2024", autor: "Titular", estado: "Revisión en curso", file: "Adenda_1_Aconcagua_v2.pdf" },
  { id: 4, tipo: "Oficio", titulo: "Oficio SUBPESCA - Cambio de área de descarte", fecha: "28/03/2024", autor: "SUBPESCA", estado: "Con observaciones críticas", file: "Oficio_Subpesca_0112_2024.pdf" },
  { id: 5, tipo: "RCA", titulo: "Resolución de Calificación Ambiental (RCA) - Coquimbo", fecha: "10/01/2024", autor: "SEA", estado: "Aprobada con condiciones", file: "RCA_Coquimbo_Aprobada.pdf" },
  { id: 6, tipo: "Oficio", titulo: "Oficio DGA - Modelo hidrogeológico", fecha: "15/11/2023", autor: "DGA", estado: "Rechazado", file: "Oficio_DGA_Rechazo_Modelo.pdf" },
];

export default function TitaniaApp() {
  // ── STATES ──
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [unregisteredError, setUnregisteredError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const [showRequestAccess, setShowRequestAccess] = useState(false);
  const [requestForm, setRequestForm] = useState({ name: "", company: "", email: "" });
  const [requestStatus, setRequestStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthChecked(true);
    }
  }, []);

  const [activeTab, setActiveTab] = useState("mca"); // "mca", "brechas", "reporte"
  const [activeProjectKey, setActiveProjectKey] = useState<'mirasur' | 'desaladoras'>('mirasur');
  const [faseFilter, setFaseFilter] = useState("Todas");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [bibliotecaDocs, setBibliotecaDocs] = useState(INITIAL_BIBLIOTECA_DOCS);

  useEffect(() => {
    if (activeProjectKey === 'mirasur') {
      setBibliotecaDocs(INITIAL_BIBLIOTECA_DOCS);
    } else {
      setBibliotecaDocs(INITIAL_BIBLIOTECA_DOCS_DESALADORAS);
    }
  }, [activeProjectKey]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [tourStep, setTourStep] = useState(0); // 0=off, 1=sidebar, 2=chat, 3=dashboard
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pdfReportData, setPdfReportData] = useState<{ title: string, content: string } | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const requestPdfReport = async (tipo: 'consolidado' | 'brechas') => {
    setIsGeneratingPdf(true);
    setPdfReportData(null);
    try {
      const promptContext = SYSTEM_PROMPT + "\n\nESTADO ACTUAL DE LA MCA:\n" +
        JSON.stringify(estado) + "\n\nMCA COMPLETA:\n" + JSON.stringify(MCA);

      const instruction = tipo === 'consolidado'
        ? "Redacta un Informe Consolidado de Cumplimiento Ambiental extenso, detallado y exhaustivo para el proyecto, cubriendo sin omisiones todo el índice de contenidos que propongas. Resume el estado general de los compromisos e identifica tendencias profunda y analíticamente. Usa un tono oficial y técnico. Formatea minuciosamente con Markdown. REGLA ESTRICTA: NO escribas 'Brisas de Mirasur' ni 'Mirasur'. Debes usar 'Proyecto Inmobiliario (DEMO)' en todos los lugares."
        : "Redacta un Reporte Oficial de Brechas Normativas largo, extenso y detallado, enfocado estrictamente en desarrollar ampliamente las discrepancias. Elabora una síntesis ejecutiva profunda del riesgo que representan cada una. Usa lenguaje formal con Markdown. REGLA ESTRICTA: NO escribas 'Brisas de Mirasur' ni 'Mirasur'. Debes usar 'Proyecto Inmobiliario (DEMO)' en todos los lugares.";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: promptContext,
          messages: [{ role: "user", content: instruction }],
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const reportTitle = tipo === 'consolidado'
        ? 'Informe Consolidado - Proyecto Inmobiliario (DEMO)'
        : 'Reporte de Brechas - Proyecto Inmobiliario (DEMO)';

      setPdfReportData({
        title: reportTitle,
        content: data.text
      });

      setTimeout(() => {
        const originalTitle = document.title;
        document.title = reportTitle;
        window.print();
        setTimeout(() => {
          document.title = originalTitle;
          setPdfReportData(null);
        }, 1000); // Cleanup after closing print dialog
      }, 500);
    } catch (e) {
      console.error(e);
      alert("Hubo un error al generar el reporte con TitanIA.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const lowerName = file.name.toLowerCase();
    let tipo = "Carpeta";
    let titulo = "Documento SEIA Añadido";
    let autor = "Usuario Titular";

    if (lowerName.includes("rca")) { tipo = "RCA"; titulo = "Resolución de Calificación Ambiental"; autor = "SEA"; }
    else if (lowerName.includes("adenda")) { tipo = "Adenda"; titulo = "Adenda del Titular"; autor = "Titular"; }
    else if (lowerName.includes("ice")) { tipo = "ICE"; titulo = "Informe Consolidado de Evaluación"; autor = "SEA"; }
    else if (lowerName.includes("oficio")) { tipo = "Oficio"; titulo = "Oficio pronunciamiento"; autor = "OAECA"; }
    else if (lowerName.includes("dia")) { tipo = "DIA"; titulo = "Declaración de Impacto Ambiental"; autor = "Titular"; }
    else {
      tipo = "Anexo";
      titulo = file.name.replace('.pdf', '').substring(0, 40);
      autor = "Titular";
    }

    const newDoc = {
      id: Date.now(),
      tipo,
      titulo,
      fecha: new Date().toLocaleDateString('es-CL'),
      autor,
      estado: "Cargado al sistema",
      file: file.name,
      url: "#"
    };

    setBibliotecaDocs([newDoc, ...bibliotecaDocs]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
      content: `__WELCOME__`
    }
  ]);

  useEffect(() => {
    if (activeProjectKey === 'mirasur') {
      setMessages([
        {
          role: "assistant",
          content: `__WELCOME__`
        }
      ]);
    } else {
      setMessages([
        {
          role: "assistant",
          content: `__WELCOME_DESALADORAS__`
        }
      ]);
    }
  }, [activeProjectKey]);
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
      let promptContext = SYSTEM_PROMPT + "\n\nESTADO ACTUAL DE COMPROMISOS:\n" +
        JSON.stringify(estado) + "\n\nMCA COMPLETA:\n" + JSON.stringify(MCA);
      
      if (activeProjectKey === 'desaladoras') {
        promptContext = SYSTEM_PROMPT_DESALADORAS;
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: promptContext,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error de conexión");
      }

      const reply = data.text || "No se pudo procesar la respuesta.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Error desconocido";
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `Hmm, hubo un problema al conectarme al motor de razonamiento: ${errorMessage}`
      }]);
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

  // ── AUTH RENDERING ──
  if (!isAuthChecked) return null;

  if (!isAuthenticated) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[100dvh] overflow-hidden font-sans">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img
            src="/fotos/IA-5.png"
            alt="background"
            className="w-full h-full object-cover object-center"
          />
          {/* Light overlay to improve text contrast */}
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-10 px-6 w-full">

          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <img
              src="/fotos/logo-completoi.png"
              alt="Titania"
              className="h-28 md:h-36 w-auto drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.18))" }}
            />
          </div>

          {/* Login form — horizontal layout like the reference */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (passwordInput === "DemoTitania1122!" && emailInput.includes("@")) {
                
                setIsVerifying(true);
                setPasswordError(false);
                setUnregisteredError(false);

                try {
                  const res = await fetch("/api/log-sheet", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tipoAccion: "Verificar", correo: emailInput })
                  });
                  
                  const data = await res.json();
                  
                  if (data.existe === true) {
                    setIsAuthenticated(true);
                    setShowWelcome(true);
                    
                    // Guardar log de Ingreso exitoso en Google Sheets
                    fetch("/api/log-sheet", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ tipoAccion: "Ingreso", correo: emailInput })
                    }).catch(console.error);
                  } else {
                    setUnregisteredError(true);
                  }
                } catch (error) {
                  console.error("Error validando el correo:", error);
                  // En caso de caída de API, por seguridad no lo dejamos pasar.
                  setUnregisteredError(true);
                } finally {
                  setIsVerifying(false);
                }

              } else {
                setPasswordError(true);
                setUnregisteredError(false);
              }
            }}
            className="flex flex-col items-center gap-3 w-full max-w-3xl"
          >
            <div className="flex w-full shadow-xl flex-col sm:flex-row rounded-xl overflow-hidden border border-white/20">
              {/* Email label+input */}
              <div className="flex flex-1 bg-white/95 backdrop-blur-sm border-b sm:border-b-0 sm:border-r border-slate-200">
                <span className="flex items-center pl-5 pr-3 text-xs font-bold tracking-widest text-slate-500 uppercase whitespace-nowrap select-none">
                  Correo:
                </span>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  disabled={isVerifying}
                  required
                  className="flex-1 w-full bg-transparent py-4 pr-4 text-slate-800 text-sm focus:outline-none placeholder-slate-400 disabled:opacity-50"
                  placeholder="tu@correo.com"
                />
              </div>
              {/* Password label+input */}
              <div className="flex flex-1 bg-white/95 backdrop-blur-sm">
                <span className="flex items-center pl-5 pr-3 text-xs font-bold tracking-widest text-slate-500 uppercase whitespace-nowrap select-none">
                  Contraseña:
                </span>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  disabled={isVerifying}
                  required
                  className="flex-1 w-full bg-transparent py-4 pr-4 text-slate-800 text-sm focus:outline-none placeholder-slate-400 disabled:opacity-50"
                  placeholder="••••••••••••"
                />
              </div>
              {/* Submit button */}
              <button
                type="submit"
                disabled={isVerifying}
                className="px-8 py-4 bg-[#5a9e6f] hover:bg-[#4a8a5f] active:bg-[#3a7a4f] text-white text-sm font-bold tracking-widest uppercase transition-colors whitespace-nowrap disabled:opacity-70 flex justify-center min-w-[140px]"
              >
                {isVerifying ? "Verificando..." : "Ingresar >"}
              </button>
            </div>

            {/* Error messages */}
            {passwordError && (
              <p className="text-red-200 text-xs font-semibold tracking-wide drop-shadow bg-red-900/40 px-4 py-1.5 rounded-full backdrop-blur-sm border border-red-500/20">
                Contraseña incorrecta. Intenta de nuevo.
              </p>
            )}
            
            {unregisteredError && (
              <p className="text-amber-300 text-xs font-semibold tracking-wide drop-shadow bg-amber-900/60 px-4 py-1.5 rounded-full backdrop-blur-sm border border-amber-500/30 text-center">
                Este correo no tiene autorización. Solicita tu acceso primero haciendo clic en el enlace de abajo.
              </p>
            )}

            <div className="mt-4 text-slate-200/90 text-[13px] drop-shadow-md font-medium tracking-wide bg-slate-900/30 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              Si no tienes contraseña, solicítala <button type="button" onClick={() => setShowRequestAccess(true)} className="text-[#8ebc9b] hover:text-emerald-200 underline underline-offset-4 decoration-[#8ebc9b]/50 hover:decoration-emerald-300 font-bold transition-all">aquí</button>
            </div>
          </form>
        </div>

        {/* Request Access Modal */}
        {showRequestAccess && (
           <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fade-in p-4">
             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-up">
               <div className="bg-[#1a2f24] p-6 text-center relative border-b-4 border-[#518b62]">
                 <button onClick={() => setShowRequestAccess(false)} className="absolute top-4 right-4 text-emerald-100 hover:text-white transition-colors">
                   <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                 </button>
                 <div className="mx-auto mb-4 mt-2 flex items-center justify-center bg-white/10 p-2 rounded-xl backdrop-blur-sm w-fit border border-white/20">
                   <img src="/titania-logo.png" alt="Titania Sync Logo" className="h-9 object-contain" />
                 </div>
                 <h3 className="text-white font-bold text-xl tracking-wide">Solicitar Acceso</h3>
                 <p className="text-emerald-100/70 text-xs mt-1">Plataforma Demo Titania Sync</p>
               </div>
               
               <div className="p-7">
                 {requestStatus === "success" ? (
                   <div className="text-center py-6 animate-fade-in">
                     <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-4">
                       <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                     </div>
                     <h4 className="text-slate-800 font-bold text-lg mb-2">Solicitud Enviada</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">Gracias por conectarte con nosotros. Responderemos muy pronto a tu solicitud.</p>
                     <button onClick={() => {setShowRequestAccess(false); setRequestStatus("idle"); setRequestForm({name:"", company:"", email:""});}} className="mt-8 w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">Cerrar</button>
                   </div>
                 ) : (
                   <form onSubmit={async (e) => {
                     e.preventDefault();
                     setRequestStatus("loading");
                     try {
                       const res = await fetch("/api/request-access", {
                         method: "POST",
                         headers: { "Content-Type": "application/json" },
                         body: JSON.stringify(requestForm)
                       });
                       if(!res.ok) throw new Error("Error API Correo");
                       
                       // Guardar log de Solicitud en Google Sheets
                       await fetch("/api/log-sheet", {
                         method: "POST",
                         headers: { "Content-Type": "application/json" },
                         body: JSON.stringify({ 
                           tipoAccion: "Solicitud", 
                           nombre: requestForm.name, 
                           institucion: requestForm.company, 
                           correo: requestForm.email 
                         })
                       }).catch(console.error);

                       setRequestStatus("success");
                     } catch(e) {
                       console.error(e);
                       setRequestStatus("error");
                     }
                   }} className="flex flex-col gap-5">
                     <div>
                       <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nombre Completo</label>
                       <input type="text" required value={requestForm.name} onChange={e => setRequestForm({...requestForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#518b62]/50 focus:border-[#518b62] transition-all" placeholder="Ej. Juan Pérez" />
                     </div>
                     <div>
                       <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Institución / Empresa</label>
                       <input type="text" required value={requestForm.company} onChange={e => setRequestForm({...requestForm, company: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#518b62]/50 focus:border-[#518b62] transition-all" placeholder="Ej. Ministerio de Medio Ambiente" />
                     </div>
                     <div>
                       <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Correo Electrónico</label>
                       <input type="email" required value={requestForm.email} onChange={e => setRequestForm({...requestForm, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#518b62]/50 focus:border-[#518b62] transition-all" placeholder="tu@correo.com" />
                     </div>
                     {requestStatus === "error" && <p className="text-red-500 text-xs font-bold text-center bg-red-50 p-2 rounded-lg">Ocurrió un error. Intenta de nuevo.</p>}
                     <button type="submit" disabled={requestStatus === "loading"} className="mt-4 w-full py-4 bg-[#1a2f24] hover:bg-[#2c4c3b] disabled:opacity-70 text-white font-bold tracking-wide rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">
                       {requestStatus === "loading" ? "Enviando..." : "Enviar Solicitud"}
                     </button>
                   </form>
                 )}
               </div>
             </div>
           </div>
         )}
      </div>
    );
  }

  // ── RENDER ──
  return (
    <>
      <div className={`flex flex-col md:flex-row h-[100dvh] w-full bg-[#f8fafc] font-sans text-slate-800 overflow-hidden relative ${isGeneratingPdf || pdfReportData ? 'print:hidden' : ''}`}>

        {/* ── WELCOME POPUP ── */}
        {showWelcome && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(26,47,36,0.65)' }}>
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl">

              {/* Background image inside modal */}
              <div className="absolute inset-0">
                <img src="/fotos/fondo_panel.png" alt="" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-[#0e1f17]/80" />
              </div>

              {/* Content */}
              <div className="relative z-10 px-8 py-10">

                {/* Header */}
                <div className="flex items-center gap-4 mb-7 border-b border-white/10 pb-6">
                  <img src="/fotos/logo-completoi.png" alt="Titania" className="h-12 w-auto opacity-90" />
                  <div>
                    <h2 className="text-white text-xl font-bold tracking-wide">Bienvenido a Titania Sync</h2>
                    <p className="text-emerald-400 text-xs font-semibold tracking-widest uppercase mt-0.5">Versión Demo</p>
                  </div>
                </div>

                {/* Body */}
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Estás explorando una versión demostrativa de <span className="text-white font-semibold">Titania Sync</span>, la plataforma de Titania para el monitoreo y gestión de compromisos ambientales.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                  <p className="text-emerald-400 text-[11px] font-bold uppercase tracking-widest mb-1">Proyecto en demo</p>
                  <p className="text-white font-semibold text-sm mb-1">Proyecto Inmobiliario</p>
                  <p className="text-white/65 text-xs leading-relaxed">
                    Iniciativa inmobiliaria evaluada mediante Declaración de Impacto Ambiental, con RCA vigente (N°202510001198) que establece <span className="text-white font-semibold">47 compromisos ambientales</span> distribuidos en tres fases: Preconstrucción, Construcción y Operación.
                  </p>
                </div>

                <div className="mb-7">
                  <p className="text-emerald-400 text-[11px] font-bold uppercase tracking-widest mb-3">Funcionalidades disponibles</p>
                  <ul className="flex flex-col gap-2">
                    {[
                      'Visualización y seguimiento de la Matriz de Compromisos Ambientales',
                      'Detección automática de brechas entre la MCA y la RCA',
                      'Biblioteca documental del expediente SEIA',
                      'Asistente IA para consultas en lenguaje natural',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-white/75 text-xs">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => { setShowWelcome(false); setTourStep(1); }}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm tracking-widest uppercase rounded-xl transition-colors shadow-lg"
                >
                  Explorar la plataforma
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── ONBOARDING TOUR ── */}
        {tourStep > 0 && (
          <div className="fixed inset-0 z-[90] pointer-events-none">
            {/* Dimmed backdrop - clickable to skip */}
            <div
              className="absolute inset-0 bg-black/40 pointer-events-auto"
              onClick={() => setTourStep(0)}
            />

            {/* STEP 1: Sidebar */}
            {tourStep === 1 && (
              <div className="absolute pointer-events-auto"
                style={{ top: '5rem', left: 'calc(18rem + 16px)' }}>
                {/* Arrow left */}
                <div className="absolute -left-2.5 top-5 w-0 h-0"
                  style={{ borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: '10px solid #1a2f24' }} />
                <div className="bg-[#1a2f24] border border-emerald-800/50 rounded-xl shadow-2xl p-5 w-72">
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-1">1 / 3</p>
                  <h3 className="text-white font-bold text-sm mb-2">Panel de Navegación</h3>
                  <p className="text-white/70 text-xs leading-relaxed mb-4">
                    Desde aquí accedes a tus proyectos y a la biblioteca documental del expediente SEIA.
                    Usa el botón superior para ocultar o expandir el panel.
                  </p>
                  <div className="flex items-center justify-between">
                    <button onClick={() => setTourStep(0)} className="text-white/30 text-xs hover:text-white/60 transition-colors">Saltar tour</button>
                    <button
                      onClick={() => setTourStep(2)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors"
                    >Entendido →</button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Chat / TitanIA */}
            {tourStep === 2 && (
              <div className="absolute pointer-events-auto"
                style={{ top: '5rem', left: '50%', transform: 'translateX(-50%)' }}>
                {/* Arrow up */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{ borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid #1a2f24' }} />
                <div className="bg-[#1a2f24] border border-emerald-800/50 rounded-xl shadow-2xl p-5 w-72">
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-1">2 / 3</p>
                  <h3 className="text-white font-bold text-sm mb-2">Asistente TitanIA</h3>
                  <p className="text-white/70 text-xs leading-relaxed mb-4">
                    Consulta en lenguaje natural sobre compromisos, brechas, documentos del expediente
                    y cualquier aspecto del proyecto. TitanIA tiene el contexto documental completo del proyecto.
                  </p>
                  <div className="flex items-center justify-between">
                    <button onClick={() => setTourStep(0)} className="text-white/30 text-xs hover:text-white/60 transition-colors">Saltar tour</button>
                    <button
                      onClick={() => setTourStep(3)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors"
                    >Entendido →</button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Dashboard */}
            {tourStep === 3 && (
              <div className="absolute pointer-events-auto"
                style={{ top: '5rem', right: '2rem' }}>
                {/* Arrow right */}
                <div className="absolute -right-2.5 top-5 w-0 h-0"
                  style={{ borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '10px solid #1a2f24' }} />
                <div className="bg-[#1a2f24] border border-emerald-800/50 rounded-xl shadow-2xl p-5 w-72">
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-1">3 / 3</p>
                  <h3 className="text-white font-bold text-sm mb-2">Dashboard MCA & Biblioteca</h3>
                  <p className="text-white/70 text-xs leading-relaxed mb-4">
                    Visualiza la Matriz de Compromisos Ambientales, filtra por fase, revisa el estado
                    de cumplimiento por compromiso y accede a la biblioteca documental completa.
                  </p>
                  <div className="flex items-center justify-between">
                    <button onClick={() => setTourStep(0)} className="text-white/30 text-xs hover:text-white/60 transition-colors">Saltar tour</button>
                    <button
                      onClick={() => setTourStep(0)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors"
                    >¡Listo!</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── MOBILE HEADER ── */}
        <div className="md:hidden flex-shrink-0 flex items-center justify-between bg-[#2c4c3b] p-4 text-white z-20 shadow-md">
          <button onClick={() => setShowMobileSidebar(true)} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold tracking-[0.2em] uppercase text-sm">Titania</span>
          <button onClick={() => setShowMobileChat(true)} className="p-2 -mr-2 hover:bg-white/10 rounded-lg transition-colors relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#8ebc9b] rounded-full border-2 border-[#2c4c3b]"></span>
          </button>
        </div>

        {/* ── MOBILE SIDEBAR OVERLAY ── */}
        {showMobileSidebar && (
          <div
            className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setShowMobileSidebar(false)}
          />
        )}


        {/* ── LEFT SIDEBAR (BRANDING & NAV) ── */}
        <nav className={`${isSidebarCollapsed ? 'md:w-10' : 'md:w-[18rem]'} flex-shrink-0 flex-col text-white z-40 shadow-2xl overflow-hidden transition-all duration-300 md:order-1 md:relative md:flex md:translate-x-0 ${showMobileSidebar ? "fixed inset-y-0 left-0 w-[18rem] flex translate-x-0" : "fixed inset-y-0 left-0 w-[18rem] flex -translate-x-full"
          }`}>
          {/* Background image */}
          <div className="absolute inset-0">
            <img src="/fotos/fondo_panel.png" alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full p-4">

            {/* Top Header: Logo + Toggle button */}
            <div className={`flex items-center mb-6 pl-1 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
              {!isSidebarCollapsed && (
                <div className="opacity-90 cursor-pointer pt-2">
                  <img
                    src="/fotos/logo-completoi.png"
                    alt="Titania Logo"
                    className="w-14 md:w-16 h-auto drop-shadow-md"
                  />
                </div>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden md:flex p-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-white transition-all duration-200"
                title={isSidebarCollapsed ? 'Expandir panel' : 'Ocultar panel'}
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>

            {!isSidebarCollapsed && (<>

              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar"
                  className="w-full bg-white/90 backdrop-blur-sm rounded-full py-2.5 pl-5 pr-10 text-sm text-slate-700 placeholder-slate-400 font-medium border-0 focus:ring-2 focus:ring-white/60 focus:outline-none transition-all"
                />
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-5 pl-1">
                <div>
                  <button
                    onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                    className="w-full flex items-center justify-between text-white hover:text-emerald-300 transition-colors font-medium text-sm text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <Folder className="w-5 h-5 group-hover:scale-110 transition-transform opacity-90" />
                      Ver Mis Proyectos
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isProjectsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProjectsOpen && (
                    <div className="ml-9 mt-4 flex flex-col gap-3 border-l border-white/20 pl-4 animate-fade-up">
                      <div className="text-white/50 text-[10px] uppercase tracking-wider font-bold">Proyecto Inmobiliario (DEMO)</div>
                      <button
                        onClick={() => { setActiveProjectKey('mirasur'); setActiveTab('mca'); }}
                        className={`text-left text-xs transition-colors ${activeProjectKey === 'mirasur' && activeTab !== 'biblioteca' ? 'text-emerald-300 font-bold' : 'text-white/70 hover:text-white'}`}
                      >
                        › Dashboard MCA
                      </button>
                      <button
                        onClick={() => { setActiveProjectKey('mirasur'); setActiveTab('biblioteca'); }}
                        className={`text-left text-xs transition-colors ${activeProjectKey === 'mirasur' && activeTab === 'biblioteca' ? 'text-emerald-300 font-bold' : 'text-white/70 hover:text-white'}`}
                      >
                        › Biblioteca de Documentos
                      </button>
                      <div className="mt-2 text-white/50 text-[10px] uppercase tracking-wider font-bold">Proyecto Desaladoras</div>
                      <button
                        onClick={() => { setActiveProjectKey('desaladoras'); setActiveTab('mca'); }}
                        className={`text-left text-xs transition-colors ${activeProjectKey === 'desaladoras' && activeTab !== 'biblioteca' ? 'text-emerald-300 font-bold' : 'text-white/70 hover:text-white'}`}
                      >
                        › Análisis Desaladoras (SEIA)
                      </button>
                      <button
                        onClick={() => { setActiveProjectKey('desaladoras'); setActiveTab('biblioteca'); }}
                        className={`text-left text-xs transition-colors ${activeProjectKey === 'desaladoras' && activeTab === 'biblioteca' ? 'text-emerald-300 font-bold' : 'text-white/70 hover:text-white'}`}
                      >
                        › Biblioteca Desaladoras
                      </button>
                    </div>
                  )}
                </div>

                <button className="flex items-center gap-4 text-white hover:text-emerald-300 transition-colors font-medium text-sm text-left group">
                  <Settings className="w-5 h-5 group-hover:scale-110 transition-transform opacity-90" />
                  Configuración
                </button>
              </div>

              {/* Spacer to push user info to the bottom */}
              <div className="flex-1"></div>

              {/* Bottom user */}
              <div className="border-t border-white/15 pt-4 pb-1">
                <div className="flex items-center gap-3 px-1">
                  <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    AR
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-white text-sm font-semibold truncate">Alberto Ruiz</span>
                    <span className="text-white/50 text-[10px] truncate">Administrador</span>
                  </div>
                </div>
              </div>

            </>)}
          </div>
        </nav>

        {/* ── RIGHT PANEL (MAIN DASHBOARD) ── */}
        <main className="flex-1 flex flex-col min-w-0 bg-white border-l border-slate-200 shadow-sm z-0 overflow-hidden md:order-3">
          
          {activeTab === 'biblioteca' ? (
            <>
              <div className="pt-6 md:pt-10 px-4 md:px-10 pb-4 md:pb-6 flex-shrink-0">
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-wide uppercase mb-4 md:mb-8">
                  Biblioteca Documental (SEIA)
                </h1>

                {/* Project Selector / Subtitle */}
                <div className="flex items-center gap-3 text-emerald-600 font-semibold text-lg pb-4 border-b border-slate-100">
                  <ChevronDown className="w-6 h-6" />
                  Iniciativa de Inversión {activeProjectKey === 'mirasur' ? PROJECT.nombre : 'Proyecto Desaladoras'}
                </div>
              </div>

              <div className="px-4 md:px-10 pb-12 flex-1 flex flex-col animate-fade-up min-h-0">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0">
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar en el expediente SEIA..."
                    className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#8ebc9b] transition-all"
                  />
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="whitespace-nowrap w-full sm:w-auto px-6 py-2.5 bg-[#2c4c3b] hover:bg-[#1a2f24] text-white font-bold text-sm rounded-lg transition-colors flex justify-center items-center gap-2 shadow-sm cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" /> Cargar Documento
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              {/* Document List */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm flex-1 flex flex-col min-h-0">
                <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 p-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                  <div className="col-span-2 sm:col-span-1 text-center">Tipo</div>
                  <div className="col-span-10 sm:col-span-5 pl-2">Documento del Expediente</div>
                  <div className="hidden sm:flex col-span-2">Autor / OAECA</div>
                  <div className="hidden sm:flex col-span-2">Estado</div>
                  <div className="hidden sm:flex col-span-2 text-right justify-end">Fecha</div>
                </div>
                <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
                  {bibliotecaDocs.map(doc => (
                    <div key={doc.id} className="grid grid-cols-12 items-center p-4 hover:bg-slate-50 transition-colors">
                      <div className="col-span-2 sm:col-span-1 flex justify-center">
                        <div className={`px-2 py-1 rounded text-[10px] font-black tracking-widest text-center ${doc.tipo === 'RCA' || doc.tipo === 'ICE' ? 'bg-emerald-100 text-emerald-800' :
                          doc.tipo.includes('Adenda') || doc.tipo === 'DIA' ? 'bg-blue-100 text-blue-800' :
                            doc.tipo === 'ICSARA' ? 'bg-amber-100 text-amber-800' :
                              'bg-slate-200 text-slate-600'
                          }`}>
                          {doc.tipo}
                        </div>
                      </div>
                      <div className="col-span-10 sm:col-span-5 flex flex-col pr-4 pl-2 sm:pl-4">
                        <span className="text-sm font-semibold text-slate-800">{doc.titulo}</span>
                        <span className="text-[11px] text-slate-400 truncate mt-0.5">{doc.file}</span>
                      </div>
                      <div className="hidden sm:flex col-span-2">
                        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">{doc.autor}</span>
                      </div>
                      <div className="hidden sm:flex col-span-2 items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span className="text-[11px] font-medium text-slate-500 line-clamp-2">{doc.estado}</span>
                      </div>
                      <div className="hidden sm:flex col-span-2 text-right justify-end text-[11px] font-medium text-slate-400">
                        {doc.fecha}
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </>
          ) : activeProjectKey === 'mirasur' ? (
            <>
              {/* Header Title */}
              <div className="pt-6 md:pt-10 px-4 md:px-10 pb-4 md:pb-6 flex-shrink-0">
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-wide uppercase mb-4 md:mb-8">
                  Detalle de Compromisos y Fuente Documental
                </h1>

                {/* Project Selector / Subtitle */}
                <div className="flex items-center gap-3 text-emerald-600 font-semibold text-lg pb-4 border-b border-slate-100">
                  <ChevronDown className="w-6 h-6" />
                  Iniciativa de Inversión {PROJECT.nombre}
                </div>
              </div>

              <div className="flex flex-1 flex-col overflow-hidden px-4 md:px-10 pb-6 md:pb-10 min-h-0 relative animate-fade-up">
              {/* Action Tabs & Filters */}
              <div className="px-4 md:px-6 pb-2 md:pb-4 flex flex-col gap-2">
                {/* Main Tabs Row */}
                <div className="flex gap-3 md:gap-5 border-b border-slate-200 overflow-x-auto scrollbar-hide w-full">
                  {[
                    { id: "mca", label: "Compromisos", icon: FileText },
                    { id: "brechas", label: "Brechas", icon: AlertTriangle },
                    { id: "reporte", label: "Estado & Reportes", icon: Activity },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-3 flex items-center gap-1.5 text-xs font-semibold transition-all border-b-2 whitespace-nowrap flex-shrink-0
                    ${activeTab === tab.id ? 'border-[#8ebc9b] text-[#8ebc9b]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Fase Filter Pills Row */}
                {activeTab !== "reporte" && (
                  <div className="flex bg-slate-50 p-1 rounded-full border border-slate-200 overflow-x-auto scrollbar-hide whitespace-nowrap w-full">
                    {["Todas", ...FASES].map(f => (
                      <button
                        key={f}
                        onClick={() => setFaseFilter(f)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all flex-shrink-0 ${faseFilter === f
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
              <div className="flex-1 overflow-y-auto px-4 md:px-10 pb-16 md:pb-12 scroll-smooth">

                {activeTab !== "reporte" ? (
                  <div className="flex flex-col gap-6">
                    {filtrado.map((c, i) => {
                      const isSelected = selectedId === c.id;
                      const reqAttn = c.brecha || estado[c.id] === "Incumplido";
                      return (
                        <div
                          key={c.id}
                          onClick={() => setSelectedId(isSelected ? null : c.id)}
                          className={`bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow cursor-pointer animate-fade-up ${isSelected ? 'ring-2 ring-emerald-100' : ''
                            }`}
                          style={{ animationDelay: `${i * 0.03}s` }}
                        >
                          {/* Number block (Left accent) */}
                          <div className="w-20 hidden sm:flex flex-col items-center pt-8 bg-emerald-50/50 border-r border-slate-50">
                            <span className="text-[#8ebc9b] font-bold tracking-widest text-sm">
                              {c.id.replace('C-', '')}
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
                                  onChange={e => setEstado(prev => ({ ...prev, [c.id]: e.target.value }))}
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
                                  <div className="uppercase tracking-wider text-[10px] text-emerald-100 mb-1 opacity-80">Fuente documental</div>
                                  <div>{c.origen} {c.rca_art !== "—" ? `→ RCA ${c.rca_art.replace('RCA', '').trim()}` : ""}</div>
                                </div>

                                <div className="bg-slate-50 border border-slate-100 text-xs text-slate-600 px-4 py-2.5 rounded-md">
                                  <div className="uppercase tracking-wider text-[9px] text-slate-400 mb-0.5">Fase</div>
                                  <div className="font-semibold text-slate-700">{c.fase}</div>
                                </div>
                              </div>

                              {/* Metadata Data Grid (Responsive Fix) */}
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 p-4 bg-slate-50/50 rounded-lg border border-slate-100 align-start self-start text-xs text-slate-600">
                                <div className="flex flex-col border-b border-slate-200/60 pb-2 gap-1.5 min-w-0">
                                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Organismo</span>
                                  <span className="font-semibold text-slate-800 break-words">{c.organismo}</span>
                                </div>
                                <div className="flex flex-col border-b border-slate-200/60 pb-2 gap-1.5 min-w-0">
                                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Responsable</span>
                                  <span className="font-semibold text-slate-800 break-words">{c.responsable.split('—')[0].trim()}</span>
                                </div>
                                <div className="flex flex-col border-b border-slate-200/60 pb-2 gap-1.5 min-w-0">
                                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Tipo de compromiso</span>
                                  <span className="font-semibold text-slate-800 break-words">{c.tipo}</span>
                                </div>
                                <div className="flex flex-col border-b border-slate-200/60 pb-2 gap-1.5 min-w-0">
                                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Frecuencia / Plazo</span>
                                  <span className="font-semibold text-slate-800 break-words">{c.frecuencia.split('(')[0]}</span>
                                </div>
                                <div className="flex flex-col col-span-1 md:col-span-2 pt-1 gap-1.5 min-w-0">
                                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Indicador</span>
                                  <span className="font-medium text-slate-700 break-words">{c.indicador}</span>
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
                                        <span className={`text-xs px-3 py-1 rounded-full ${step.includes('RCA')
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
                        <Activity className="text-emerald-600" /> Estadísticas de Cumplimiento Ambiental
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
                            <div style={{ width: `${(stats.cumplidos / stats.total) * 100}%` }} className="bg-emerald-500 h-full transition-all"></div>
                            <div style={{ width: `${(stats.pendientes / stats.total) * 100}%` }} className="bg-amber-400 h-full transition-all"></div>
                            <div style={{ width: `${(stats.incumplidos / stats.total) * 100}%` }} className="bg-rose-500 h-full transition-all"></div>
                          </>
                        )}
                      </div>
                      <div className="text-center mt-4 text-sm font-bold text-slate-600">
                        {Math.round((stats.cumplidos / stats.total) * 100) || 0}% de Tasa de Cumplimiento
                      </div>

                      <div className="mt-8 border-t border-slate-100 pt-6">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Desglose por Fase de Evaluación</div>
                        <div className="flex flex-col gap-4">
                          {FASES.map(fase => {
                            const faseTotal = filtrado.filter(c => c.fase === fase).length;
                            if (!faseTotal) return null;
                            const faseCumplidos = filtrado.filter(c => c.fase === fase && estado[c.id] === "Cumplido").length;
                            const pct = Math.round((faseCumplidos / faseTotal) * 100);
                            return (
                              <div key={fase} className="flex flex-col gap-1.5 mt-1">
                                <div className="flex justify-between text-xs items-center">
                                  <span className="font-semibold text-slate-600">{fase}</span>
                                  <span className="font-bold text-slate-700">{pct}% <span className="font-medium text-slate-400 ml-1">({faseCumplidos}/{faseTotal})</span></span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div style={{ width: `${pct}%` }} className="bg-[#8ebc9b] h-full transition-all"></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <button onClick={() => requestPdfReport('consolidado')} className="mt-8 w-full py-4 bg-[#8ebc9b] hover:bg-[#7ba3a0] text-white rounded-lg font-bold transition-colors shadow-sm flex items-center justify-center gap-2">
                        <FileText className="w-5 h-5" />
                        Exportar Informe PDF Consolidado
                      </button>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3">
                        <ShieldAlert className="text-rose-600" /> Panel de Reporte de Brechas
                      </h3>

                      <div className="flex flex-col gap-4 mb-8">
                        <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-center justify-between">
                          <div>
                            <div className="text-sm font-bold text-rose-800">Total de Brechas Detectadas</div>
                            <div className="text-xs text-rose-600 mt-1">Diferencias entre MCA y RCA</div>
                          </div>
                          <div className="text-2xl font-black text-rose-700">{MCA.filter(c => c.brecha).length}</div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Las brechas detectadas corresponden a inconsistencias entre los compromisos evaluados durante el proceso (DIA, Adendas, ICSARA) y los que finalmente quedaron establecidos en la Resolución de Calificación Ambiental (RCA).
                        </p>
                      </div>

                      <button
                        onClick={() => requestPdfReport('brechas')}
                        className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        Exportar Reporte de Brechas (PDF)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </>
          ) : (
            <DesaladorasDashboard requestPdfReport={requestPdfReport as any} isGeneratingPdf={isGeneratingPdf} />
          )}
        </main>

        {/* ── RESPONSIVE CHAT OVERLAY ── */}
        {showMobileChat && (
          <div
            className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setShowMobileChat(false)}
          />
        )}

        {/* ── LEFT-MIDDLE CHAT PANEL (ASSISTANT) ── */}
        <aside className={`w-[85vw] max-w-[400px] flex-shrink-0 bg-white border-r border-slate-200 flex-col shadow-2xl z-40 transition-transform duration-300 md:order-2 md:relative md:flex md:flex-1 md:max-w-none md:translate-x-0 ${showMobileChat ? "fixed inset-y-0 right-0 flex translate-x-0" : "fixed inset-y-0 right-0 flex translate-x-full"
          }`}>

          {/* Chat Header */}
          <div className="py-6 px-6 border-b border-slate-100 flex items-center justify-center">
            <h2 className="text-[1.1rem] font-medium text-slate-400 tracking-wider flex items-center">
              Titania<span className="font-black text-[#518b62]">Sync</span>
            </h2>
            <button onClick={() => setShowMobileChat(false)} className="md:hidden p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 scroll-smooth bg-slate-50/30">
            {messages.map((m, i) => {
              const isUser = m.role === "user";

              /* ── WELCOME MESSAGE (first message) ── */
              if (i === 0 && (m.content === '__WELCOME__' || m.content === '__WELCOME_DESALADORAS__')) {
                const isDesaladoras = m.content === '__WELCOME_DESALADORAS__';
                return (
                  <div key={0} className="self-start items-start flex flex-col max-w-[92%] animate-fade-up">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black">T</div>
                      <span className="text-[10px] font-bold text-emerald-700 tracking-wide uppercase">TitanIA</span>
                    </div>
                    <div className="bg-white text-slate-700 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm p-4 text-sm leading-relaxed">
                      <p className="mb-3">Hola. Soy <strong className="font-bold text-emerald-800">TitanIA</strong>, el asistente de inteligencia artificial de <strong className="font-bold text-emerald-800">Titania Sync</strong>. Estoy aquí para ayudarte a navegar y analizar la información del <strong className="font-bold text-emerald-800">{isDesaladoras ? 'Proyecto Desaladoras (SEIA)' : 'Proyecto Inmobiliario (DEMO)'}</strong>.</p>
                      <p className="mb-2 text-slate-500 text-[11px] font-semibold uppercase tracking-wider">Puedo asistirte en:</p>
                      <ul className="flex flex-col gap-1.5 mb-3">
                        {(isDesaladoras ? [
                          'Criterios de los evaluadores (SUBPESCA, CONAF, CMN, CONADI, DGA)',
                          'Patrones de persistencia temática ICSARA 1 → ICSARA 2',
                          'Brechas técnicas más frecuentes y su impacto en CAPEX y plazo',
                          'Riesgos regulatorios, jurídicos e indígenas del sector'
                        ] : [
                          'Compromisos ambientales — consultar detalle, estado, fase y organismo responsable',
                          'Brechas normativas — diferencias detectadas entre la MCA y la RCA',
                          'Expediente SEIA — DIA, Adendas, ICSARA, ICE y RCA disponibles en Biblioteca',
                          'Análisis regulatorio — artículos RCA, obligaciones por fase y avance general',
                        ]).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-600 text-xs">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-slate-400 text-xs">¿Por dónde quieres empezar?</p>
                    </div>
                  </div>
                );
              }

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
                  <div className={`p-4 text-sm leading-relaxed ${isUser
                    ? 'bg-slate-800 text-white rounded-2xl rounded-tr-sm shadow-sm whitespace-pre-wrap'
                    : 'bg-white text-slate-700 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm'
                    }`}>
                    {isUser ? (
                      m.content
                    ) : (
                      <div className="markdown-prose">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            strong: ({ node, ...props }) => <strong className="font-bold text-emerald-800" {...props} />,
                            p: ({ node, ...props }) => <p className="mb-3 last:mb-0" {...props} />,
                            table: ({ node, ...props }) => <div className="overflow-x-auto my-4 rounded-lg border border-emerald-100"><table className="min-w-full divide-y divide-emerald-200 text-xs" {...props} /></div>,
                            thead: ({ node, ...props }) => <thead className="bg-emerald-50" {...props} />,
                            th: ({ node, ...props }) => <th className="px-3 py-2 text-left font-semibold text-emerald-800 uppercase tracking-wider" {...props} />,
                            td: ({ node, ...props }) => <td className="px-3 py-2 border-t border-emerald-100/50 text-slate-700" {...props} />,
                          }}
                        >
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    )}
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
          <div className="p-4 md:p-6 bg-white border-t border-slate-100">
            <p className="hidden md:block text-xs text-slate-500 leading-relaxed mb-4 text-center px-4">
              Si tienes alguna duda acerca de la información requerida, siempre puedes pedirme ayuda.<br /><br />
              Recuerda que los datos entregados son un ejercicio de demostración.
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

      {/* ── ALERTS / MODALS ── */}
      {isGeneratingPdf && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm print:hidden">
          <div className="bg-white p-7 rounded-2xl shadow-2xl animate-fade-up w-[400px] max-w-[90vw]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                <span className="text-emerald-700 font-bold text-lg relative z-10">T</span>
                <div className="absolute inset-0 bg-emerald-300/30 animate-pulse"></div>
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">TitanIA está procesando los compromisos...</p>
                <p className="text-xs text-slate-500 mt-0.5">Redactando y maquetando el reporte. Un momento.</p>
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full relative overflow-hidden" style={{ animation: "fillBar 45s cubic-bezier(0.1, 0.8, 0.2, 1) forwards" }}>
                <div className="absolute inset-0 bg-white/30" style={{ animation: "shimmerReflect 2s linear infinite" }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">
              <span>Recopilando datos</span>
              <span className="animate-pulse">Generando PDF</span>
            </div>

            <style>{`
              @keyframes fillBar {
                0% { width: 0%; }
                15% { width: 35%; }
                40% { width: 65%; }
                70% { width: 85%; }
                100% { width: 95%; }
              }
              @keyframes shimmerReflect {
                0% { transform: translateX(-100%) skewX(-20deg); }
                100% { transform: translateX(200%) skewX(-20deg); }
              }
            `}</style>
          </div>
        </div>
      )}

      {/* ── ONSCREEN PRINTABLE PDF PREVIEW ── */}
      {pdfReportData && (
        <div className="hidden print:block bg-white text-black p-8 print-report w-full">
          <div className="max-w-4xl mx-auto markdown-prose">

            {/* ── HEADER MEMBRETE ── */}
            <div className="bg-[#1a2f24] rounded-t-xl p-8 mb-10 flex justify-between items-center border-b-8 border-[#518b62] print:break-inside-avoid shadow-sm print:shadow-none">
              <div className="flex flex-col gap-2">
                <img src="/fotos/logo-completoi.png" alt="Titania Logo" className="w-36 h-auto drop-shadow-md" />
                <p className="text-[10px] font-bold text-[#8ebc9b] tracking-[0.2em] uppercase ml-1 mt-1">Sistema de Inteligencia Regulatoria</p>
              </div>
              <div className="text-right border-l border-[#518b62]/30 pl-6">
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#8ebc9b] mb-1">Emisión Oficial</p>
                <p className="text-sm font-bold text-white">{new Date().toLocaleDateString('es-CL')}</p>
                <p className="text-[9px] text-[#8ebc9b]/70 font-mono mt-1 pt-1 border-t border-[#518b62]/30">DOCID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-2xl font-black mb-6 mt-8 uppercase text-[#1a2f24] tracking-wide border-b border-[#518b62]/30 pb-3" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-4 mt-8 text-[#1a2f24] flex items-center gap-2 before:content-[''] before:inline-block before:w-1.5 before:h-5 before:bg-[#518b62] before:rounded-sm" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-base font-bold mb-3 mt-6 text-[#1a2f24]" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-4 text-[13px] leading-relaxed text-slate-700 text-justify" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-5 text-[13px] text-slate-700 marker:text-[#518b62]" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-5 text-[13px] text-slate-700 marker:font-bold marker:text-[#518b62]" {...props} />,
                  li: ({ node, ...props }) => <li className="mb-2 pl-1" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-[#1a2f24]" {...props} />,
                  table: ({ node, ...props }) => <table className="w-full text-left border-collapse text-[12px] my-6 border-t border-slate-200 print:break-inside-auto" {...props} />,
                  tr: ({ node, ...props }) => <tr className="print:break-inside-avoid print:break-after-auto" {...props} />,
                  thead: ({ node, ...props }) => <thead className="bg-[#f0f5f2] border-b-2 border-[#518b62] table-header-group" {...props} />,
                  th: ({ node, ...props }) => <th className="p-3 font-bold text-[#1a2f24]" {...props} />,
                  td: ({ node, ...props }) => <td className="p-3 border-b border-slate-100 text-slate-700 align-top" {...props} />
                }}
              >
                {pdfReportData.content}
              </ReactMarkdown>
            </div>

            <div className="mt-16 pt-5 border-t border-slate-300 flex justify-between items-start">
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Generado por IA generativa (TitanIA).</div>
                <div className="text-[10px] text-slate-400 font-medium mt-1">La información debe ser verificada según las resoluciones publicadas en el SEIA.</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[11px] text-[#1a2f24] uppercase tracking-wide">{PROJECT.nombre}</div>
                <div className="text-[10px] text-slate-400 mt-1">Región de Valparaíso — Quilpué</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}