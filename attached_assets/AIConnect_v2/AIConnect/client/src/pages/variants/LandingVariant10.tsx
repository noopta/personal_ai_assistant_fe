import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import img from "@assets/generated_images/Hand_drawn_sketchy_wireframe_UI_afebc1cc.png";

export default function LandingVariant10() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-hidden relative">
      {/* Paper Texture */}
      <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/notebook.png")` }} />

      <nav className="relative z-10 px-8 py-6 flex justify-between items-center border-b-2 border-black border-dashed">
        <div className="font-display text-2xl font-bold rotate-[-2deg]">Synapse AI</div>
        <div className="hidden md:flex gap-8 font-handwriting text-lg">
          <a href="#" className="hover:underline decoration-wavy decoration-2 underline-offset-4">How it works</a>
          <a href="#" className="hover:underline decoration-wavy decoration-2 underline-offset-4">Pricing</a>
        </div>
        <Button variant="outline" className="border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors font-bold">
          Login -&gt;
        </Button>
      </nav>

      <main className="relative z-10 container mx-auto px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
             <div className="inline-block px-4 py-2 border-2 border-black rounded-tl-2xl rounded-br-2xl text-sm font-bold bg-yellow-200 rotate-2 shadow-[4px_4px_0px_black]">
               ✏️ Sketching the future
             </div>
             
             <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
               DRAW YOUR <br/>
               <span className="text-transparent text-stroke-black decoration-wavy underline decoration-blue-400">DREAM</span> <br/>
               WORKFLOW
             </h1>

             <p className="text-xl font-medium text-gray-600 font-handwriting leading-loose rotate-[-1deg]">
               "It's like having a really smart doodles come to life. 
               Automate your messy tasks with clean logic."
             </p>

             <div className="flex gap-4 pt-4">
               <Button className="h-14 px-8 rounded-full border-2 border-black bg-black text-white hover:bg-white hover:text-black text-xl font-bold shadow-[4px_4px_0px_black] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                 Start Drawing
               </Button>
             </div>
          </div>

          <div className="relative">
             {/* Doodle Decorations */}
             <svg className="absolute -top-10 -right-10 w-20 h-20 animate-pulse" viewBox="0 0 100 100">
               <path d="M10,50 Q50,10 90,50 T10,50" fill="none" stroke="black" strokeWidth="2" />
               <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
             </svg>
             
             <div className="border-4 border-black rounded-3xl p-4 bg-white rotate-2 shadow-[8px_8px_0px_black]">
               <img src={img} alt="Sketch" className="w-full h-auto filter contrast-125" />
             </div>
             
             <div className="absolute -bottom-8 -left-4 bg-white border-2 border-black p-4 rounded-xl rotate-[-3deg] shadow-[4px_4px_0px_black] max-w-xs">
               <div className="flex items-start gap-2">
                 <Pencil className="w-5 h-5 mt-1" />
                 <p className="font-handwriting text-lg leading-tight">Note to self: This AI actually works!</p>
               </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
