import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import img from "@assets/generated_images/Vibrant_glassmorphism_gradient_orbs_5fdca2e2.png";

export default function LandingVariant9() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white overflow-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={img} alt="Glass" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[80px]" />
      </div>

      <nav className="relative z-20 px-8 py-6 flex justify-between items-center">
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
          Synapse
        </div>
        <div className="glass-nav px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-pink-300 transition-colors">Product</a>
          <a href="#" className="hover:text-pink-300 transition-colors">About</a>
          <a href="#" className="hover:text-pink-300 transition-colors">Pricing</a>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-4 pt-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 rounded-[3rem] bg-white/5 border border-white/20 backdrop-blur-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)] max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-8 text-pink-200">
            <Sparkles className="w-3 h-3" />
            <span>The future is transparent</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
            Crystal Clear <br/> Intelligence
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10 font-light">
            An interface so clean, it feels like it's not even there. 
            Seamlessly integrates with your digital life.
          </p>

          <div className="flex justify-center gap-4">
            <Button className="h-14 px-8 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md text-lg transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Get Started
            </Button>
          </div>

          {/* Floating Glass Elements */}
          <div className="absolute top-10 -left-20 w-32 h-32 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md rotate-12 animate-float" />
          <div className="absolute bottom-10 -right-20 w-40 h-40 rounded-full bg-white/5 border border-white/10 backdrop-blur-md -rotate-6 animate-float-delayed" />
        </motion.div>
      </main>
    </div>
  );
}
