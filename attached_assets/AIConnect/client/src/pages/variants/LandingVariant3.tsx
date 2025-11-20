import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid, Type } from "lucide-react";
import img from "@assets/generated_images/Swiss_style_geometric_poster_design_c78b560e.png";

export default function LandingVariant3() {
  return (
    <div className="min-h-screen bg-[#f4f4f0] text-[#1a1a1a] font-sans selection:bg-[#ff3333] selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white px-8 py-6 flex justify-between items-start">
        <div className="text-2xl font-bold tracking-tighter">SYNAPSE.</div>
        <div className="flex flex-col text-right text-sm font-medium leading-tight">
          <span>EST. 2025</span>
          <span>ZURICH / NY / TOKYO</span>
        </div>
      </nav>

      <main className="pt-32 px-8 pb-20">
        <div className="grid grid-cols-12 gap-4 mb-24">
          <div className="col-span-12 lg:col-span-8">
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] leading-[0.85] font-black tracking-tighter mb-8"
            >
              ORDER <br/>
              FROM <br/>
              <span className="text-[#ff3333]">CHAOS.</span>
            </motion.h1>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-end items-start">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl font-medium leading-tight mb-8 max-w-xs"
            >
              Intelligent automation for the modern grid. Precision scheduling and communication.
            </motion.p>
            <Button className="rounded-none bg-[#1a1a1a] text-white hover:bg-[#ff3333] h-14 px-8 text-lg font-bold tracking-tight transition-colors">
              INITIATE SYSTEM
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[60vh]">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-[#ff3333] p-8 flex flex-col justify-between text-white"
          >
            <Grid className="w-12 h-12" />
            <div>
              <h3 className="text-4xl font-bold mb-4 tracking-tight">MODULAR<br/>INTEGRATION</h3>
              <p className="text-lg opacity-90 max-w-md">Seamlessly connects with existing Google infrastructure. No friction.</p>
            </div>
          </motion.div>
          <div className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img src={img} alt="Swiss Design" className="w-full h-full object-cover" />
          </div>
        </div>
      </main>
    </div>
  );
}
