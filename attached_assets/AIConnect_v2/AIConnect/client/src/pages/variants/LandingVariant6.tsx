import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Terminal, Cpu, Wifi } from "lucide-react";
import img from "@assets/generated_images/Dark_cyberpunk_neon_city_interface_01407ec3.png";

export default function LandingVariant6() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-black overflow-hidden">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-[#00ff41]/10 pointer-events-none" />

      <nav className="fixed top-0 w-full border-b border-[#00ff41]/30 bg-black/80 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-widest animate-pulse">SYNAPSE_CORE</div>
        <div className="flex gap-2 text-xs">
          <span className="text-[#00ff41]">SYS.ONLINE</span>
          <span className="text-white/50">|</span>
          <span className="text-[#00ff41]">NET.SECURE</span>
        </div>
      </nav>

      <main className="pt-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <motion.div 
               initial={{ x: -100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="text-sm border border-[#00ff41] inline-block px-2 py-1 text-[#00ff41] bg-[#00ff41]/10"
             >
               // ACCESSING_MAINFRAME...
             </motion.div>

             <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter glitch-text" style={{ textShadow: '2px 2px 0px #ff00ff, -2px -2px 0px #00ff41' }}>
               Override <br/>
               The System.
             </h1>

             <p className="text-gray-400 max-w-md border-l-2 border-[#00ff41] pl-4">
               Advanced AI augmentation for biological operators. 
               Bypass manual protocols. Direct neural link to Google Workspace established.
             </p>

             <div className="flex gap-4 pt-4">
               <Button className="rounded-none bg-[#00ff41] text-black hover:bg-[#00ff41] hover:shadow-[0_0_20px_#00ff41] transition-all font-bold px-8 h-12 clip-path-polygon">
                 JACK IN
               </Button>
               <Button variant="outline" className="rounded-none border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/20 h-12 px-8">
                 <Terminal className="mr-2 w-4 h-4" />
                 RUN DIAGNOSTICS
               </Button>
             </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ff41] to-[#ff00ff] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative border border-[#00ff41]/50 bg-black/50 p-2">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ff41]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ff41]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ff41]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ff41]" />
              
              <img src={img} alt="Cyberpunk" className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity mix-blend-luminosity hover:mix-blend-normal" />
              
              {/* HUD Elements */}
              <div className="absolute bottom-4 left-4 flex gap-4 font-xs text-[#00ff41]">
                <div className="flex items-center gap-1"><Cpu className="w-3 h-3" /> 98%</div>
                <div className="flex items-center gap-1"><Wifi className="w-3 h-3" /> 5G</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
