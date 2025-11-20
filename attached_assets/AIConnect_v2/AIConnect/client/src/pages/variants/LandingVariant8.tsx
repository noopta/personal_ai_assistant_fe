import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Diamond } from "lucide-react";
import img from "@assets/generated_images/High_fashion_monochrome_luxury_abstract_f682c406.png";

export default function LandingVariant8() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-serif selection:bg-white selection:text-black">
      <nav className="px-8 py-6 flex justify-between items-center border-b border-white/10">
        <div className="text-sm tracking-[0.3em] uppercase font-sans">Maison Synapse</div>
        <div className="hidden md:flex gap-12 text-xs tracking-[0.2em] uppercase font-sans text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Collection</a>
          <a href="#" className="hover:text-white transition-colors">Atelier</a>
          <a href="#" className="hover:text-white transition-colors">Concierge</a>
        </div>
        <Button variant="ghost" className="text-xs tracking-[0.2em] uppercase font-sans hover:bg-white hover:text-black transition-colors rounded-none">
          Member Access
        </Button>
      </nav>

      <main>
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img src={img} alt="Luxury" className="w-full h-full object-cover opacity-60 grayscale contrast-125" />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          <div className="relative z-10 text-center space-y-8 px-4">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-6xl md:text-9xl font-medium tracking-tight mb-2 italic">
                The Art of
              </h1>
              <h1 className="text-6xl md:text-9xl font-medium tracking-tight">
                Automation
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-300 font-sans tracking-widest uppercase text-xs md:text-sm max-w-md mx-auto border-t border-b border-white/20 py-4"
            >
              Bespoke AI solutions curated for the uncompromising executive.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Button className="bg-white text-black hover:bg-gray-200 rounded-none px-10 h-12 font-sans text-xs tracking-[0.2em] uppercase transition-all">
                Inquire Now
              </Button>
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-8 text-[10px] font-sans tracking-widest text-gray-500">
            EST. 2025 — PARIS
          </div>
          <div className="absolute bottom-8 right-8 text-[10px] font-sans tracking-widest text-gray-500 flex items-center gap-2">
             SCROLL <div className="h-[1px] w-8 bg-gray-500" />
          </div>
        </section>
      </main>
    </div>
  );
}
