import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import heroImg from "@assets/generated_images/Clean_isometric_technical_blueprint_of_AI_data_flow_bfa7d8ea.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#f0f0f0] pt-20 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0" 
        style={{ 
          backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`, 
          backgroundSize: '40px 40px', 
          opacity: 0.05 
        }} 
      />

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest">System Operational v2.4</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-black uppercase leading-[0.9] tracking-tighter text-black">
            Automate <br/>
            <span className="text-blue-600 bg-black/5 px-2 -ml-2">Reality</span>
          </h1>

          <p className="text-xl font-mono text-black/70 max-w-lg leading-relaxed border-l-4 border-blue-600 pl-6">
            Connect your neural pathways to Google Workspace. 
            Execute complex workflows via natural language protocol.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="h-14 px-8 rounded-none border-2 border-black bg-black text-white text-lg font-bold uppercase hover:bg-neutral-800 hover:shadow-[6px_6px_0px_0px_#3b82f6] shadow-[4px_4px_0px_0px_#3b82f6] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              Start Sequence
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button variant="outline" className="h-14 px-8 rounded-none border-2 border-black bg-white text-black text-lg font-bold uppercase hover:bg-neutral-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Terminal className="mr-2 w-5 h-5" />
              Read Docs
            </Button>
          </div>

          <div className="pt-8 flex items-center gap-6 opacity-60">
             <div className="font-mono text-xs uppercase font-bold">Compatible with:</div>
             <div className="flex gap-4 grayscale">
               {/* Simple text placeholders for logos to fit the brutalist vibe */}
               <span className="font-black">G-SUITE</span>
               <span className="font-black">SLACK</span>
               <span className="font-black">NOTION</span>
             </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-blue-600 translate-x-4 translate-y-4 border-2 border-black" />
          <div className="relative bg-white border-2 border-black p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <img 
              src={heroImg} 
              alt="System Architecture" 
              className="w-full h-auto border-2 border-black grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
            />
            
            {/* Brutalist Badge */}
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="font-mono text-xs font-bold uppercase">Processing Speed</div>
              <div className="font-display font-black text-3xl">0.02ms</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
