import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, Calendar, Play } from "lucide-react";
import img from "@assets/generated_images/Soft_3D_claymorphism_UI_elements_bd7374d5.png";

export default function LandingVariant5() {
  return (
    <div className="min-h-screen bg-[#eef2f5] text-[#4a5568] font-sans selection:bg-[#ffb6c1] selection:text-white overflow-hidden">
      <nav className="p-8 flex justify-between items-center">
        <div className="text-2xl font-black text-[#2d3748] tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl bg-[#63b3ed] shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]" />
          Synapse
        </div>
        <Button className="rounded-2xl bg-[#eef2f5] text-[#4a5568] shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff] border-none transition-all transform active:scale-95">
          Sign In
        </Button>
      </nav>

      <main className="container mx-auto px-4 pt-10 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-block px-4 py-2 rounded-xl bg-[#eef2f5] shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff] text-sm font-bold text-[#63b3ed]"
            >
              ✨ Your friendly AI helper
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-[#2d3748] leading-tight"
            >
              Work feels <br/>
              <span className="text-[#63b3ed]">playful</span> again.
            </motion.h1>
            
            <p className="text-xl leading-relaxed max-w-lg">
              Let our soft & squishy AI agents handle your hard & rigid schedule. 
              Automate emails and calendar invites with a smile.
            </p>
            
            <div className="flex gap-6">
              <Button className="h-14 px-8 rounded-2xl bg-[#63b3ed] text-white text-lg font-bold shadow-[8px_8px_16px_#bbeeef,-8px_-8px_16px_#ffffff] hover:translate-y-[-2px] transition-transform border-none">
                Get Started
              </Button>
              <Button variant="ghost" className="h-14 w-14 rounded-full bg-[#eef2f5] shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff] flex items-center justify-center p-0">
                <Play className="w-6 h-6 text-[#2d3748] fill-current ml-1" />
              </Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-[#63b3ed] opacity-20 blur-[100px] rounded-full" />
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              src={img} 
              alt="Clay UI" 
              className="relative z-10 w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
            
            {/* Floating Cards */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 p-4 rounded-3xl bg-[#eef2f5] shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] z-20 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ed64a6] flex items-center justify-center shadow-inner text-white">
                <Mic />
              </div>
              <div>
                <div className="font-bold text-[#2d3748]">Voice Note</div>
                <div className="text-xs text-gray-500">Processing...</div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
