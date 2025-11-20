import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, Wind, Sun } from "lucide-react";
import img from "@assets/generated_images/Organic_nature_inspired_abstract_shapes_0580e012.png";

export default function LandingVariant7() {
  return (
    <div className="min-h-screen bg-[#f7f9f5] text-[#2c4c3b] font-sans selection:bg-[#8ba888] selection:text-white">
      <nav className="absolute top-0 left-0 right-0 p-8 flex justify-center">
        <div className="bg-white/80 backdrop-blur-md px-8 py-4 rounded-full shadow-sm flex items-center gap-8">
          <a href="#" className="font-medium hover:text-[#5a7c65] transition-colors">Mission</a>
          <div className="text-2xl font-serif font-bold tracking-tight text-[#2c4c3b] flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            Synapse
          </div>
          <a href="#" className="font-medium hover:text-[#5a7c65] transition-colors">Harmony</a>
        </div>
      </nav>

      <main className="pt-40 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative">
          {/* Organic Background Blob */}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#e6efe6] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
          <div className="absolute top-40 -left-40 w-[400px] h-[400px] bg-[#dcebdc] rounded-full mix-blend-multiply filter blur-3xl opacity-70" />

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
                <img src={img} alt="Organic" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c4c3b]/30 to-transparent" />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-serif font-medium text-[#1a2f23] leading-tight"
              >
                Grow your <br/>
                <span className="italic text-[#5a7c65]">productivity</span> naturally.
              </motion.h1>
              
              <p className="text-xl text-[#4a6b56] leading-relaxed font-light">
                A calm, adaptive AI that nurtures your schedule rather than forcing it. 
                Let your workflow bloom with organic automation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="h-14 px-8 rounded-full bg-[#2c4c3b] text-[#f7f9f5] hover:bg-[#1a2f23] text-lg font-normal transition-all hover:scale-105">
                  Begin Growth
                </Button>
                <Button variant="outline" className="h-14 px-8 rounded-full border-[#2c4c3b] text-[#2c4c3b] hover:bg-[#2c4c3b]/5 text-lg font-normal">
                  Explore Ecosystem
                </Button>
              </div>

              <div className="flex gap-8 pt-8 text-[#4a6b56]/60">
                <div className="flex items-center gap-2"><Wind className="w-5 h-5" /> Fluid Workflow</div>
                <div className="flex items-center gap-2"><Sun className="w-5 h-5" /> Natural NLP</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
