import { Rocket, Shield, Zap, Code, Globe, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Titania</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</a>
          <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Examples</a>
          <a href="#" className="px-4 py-2 bg-white text-slate-950 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors">
            Get Started
          </a>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          Ready for Vercel Deployment
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          Scale your ideas <br /> at the speed of light.
        </h1>
        
        <p className="max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed">
          The ultimate Next.js starter kit configured with Tailwind CSS, TypeScript, and Lucide React. 
          Built for developers who demand performance and aesthetics.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25">
            <Terminal className="w-5 h-5" />
            Deploy to Vercel
          </button>
          <button className="px-8 py-4 bg-slate-900 text-white border border-slate-800 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
            <Code className="w-5 h-5" />
            View Source
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-yellow-400" />}
            title="Blazing Fast"
            description="Powered by Next.js 15+ App Router and optimized for the edge."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-green-400" />}
            title="Type Safe"
            description="Full TypeScript configuration for robust development experience."
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6 text-blue-400" />}
            title="Vercel Optimized"
            description="Out-of-the-box support for Vercel's global infrastructure."
          />
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">© 2024 Titania Project. Built with Next.js & Tailwind.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Twitter</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">GitHub</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl text-left hover:border-indigo-500/50 transition-colors group">
      <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
