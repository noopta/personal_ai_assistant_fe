import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Mail, Sparkles, Activity, Users, Tornado, Brain, Hexagon, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

// Backgrounds
import heroBg1 from "@assets/generated_images/Abstract_deep_tech_background_with_glowing_nodes_2d45bed3.png";
import { DataStreamBg } from "@/components/ui/backgrounds/DataStreamBg";
import { SwarmBg } from "@/components/ui/backgrounds/SwarmBg";
import { SocialClustersBg } from "@/components/ui/backgrounds/SocialClustersBg";
import { GoldenSpiralBg } from "@/components/ui/backgrounds/GoldenSpiralBg";
import { NeuroGrowthBg } from "@/components/ui/backgrounds/NeuroGrowthBg";
import { HexMeshBg } from "@/components/ui/backgrounds/HexMeshBg";

const backgrounds = [
  { id: 1, type: 'image', src: heroBg1, name: "Deep Tech", icon: <ImageIcon className="w-3 h-3" /> },
  { id: 2, type: 'component', component: <DataStreamBg />, name: "Data Stream", icon: <Activity className="w-3 h-3" /> },
  { id: 3, type: 'component', component: <SwarmBg />, name: "Swarm Flow", icon: <Tornado className="w-3 h-3" /> },
  { id: 4, type: 'component', component: <SocialClustersBg />, name: "Social Graph", icon: <Users className="w-3 h-3" /> },
  { id: 5, type: 'component', component: <GoldenSpiralBg />, name: "Golden Ratio", icon: <Tornado className="w-3 h-3" /> }, // Reusing tornado for spiral
  { id: 6, type: 'component', component: <NeuroGrowthBg />, name: "Neural Path", icon: <Brain className="w-3 h-3" /> },
  { id: 7, type: 'component', component: <HexMeshBg />, name: "Hive Mind", icon: <Hexagon className="w-3 h-3" /> },
];

export function Hero() {
  const [currentBg, setCurrentBg] = useState(0);

  const nextBackground = () => {
    setCurrentBg((prev) => (prev + 1) % backgrounds.length);
  };

  const currentBackground = backgrounds[currentBg];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {currentBackground.type === 'image' ? (
            <motion.img 
              key={currentBackground.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }} // 40% opacity for dark mode visibility
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              src={currentBackground.src} 
              alt="Background" 
              className="w-full h-full object-cover absolute inset-0 dark:opacity-40 opacity-20"
            />
          ) : (
            <motion.div
              key={currentBackground.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {currentBackground.component}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Gradient Overlay (Only for images, live bg handles its own) */}
        {currentBackground.type === 'image' && (
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-10" />
        )}
      </div>

      {/* Background Switcher Control */}
      <div className="absolute top-24 right-4 z-30">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={nextBackground}
          className="glass-button rounded-full text-xs gap-2 bg-background/20 backdrop-blur-md border-white/10 hover:bg-background/40 min-w-[140px] justify-start"
        >
          {currentBackground.icon}
          <span>{currentBackground.name}</span>
        </Button>
      </div>

      <div className="container relative z-20 px-4 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-button text-sm text-primary mb-8"
        >
          <Sparkles className="w-3 h-3" />
          <span className="tracking-wide uppercase text-[10px] font-semibold">Now in Public Beta</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6 leading-[1.1]"
        >
          <span className="text-gradient block">Your Life,</span>
          <span className="text-gradient-primary block">Autopilot.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Connect your Gmail and Calendar to a hyper-intelligent AI agent. 
          Delegate scheduling, drafting, and organization via simple voice commands.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="rounded-full px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium glow-effect w-full sm:w-auto">
            Start Automating
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8 h-12 glass-button text-foreground w-full sm:w-auto">
            View Demo
          </Button>
        </motion.div>

        {/* Floating Elements Simulation */}
        <div className="absolute top-1/2 left-10 hidden lg:block animate-float">
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 w-64 bg-background/50 backdrop-blur-md">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Gmail Integration</div>
              <div className="text-sm font-medium text-foreground">Inbox Zero Reached</div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/3 right-10 hidden lg:block animate-float-delayed">
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 w-64 bg-background/50 backdrop-blur-md">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-500 dark:text-purple-400" />
            </div>
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Calendar Agent</div>
              <div className="text-sm font-medium text-foreground">Meeting Scheduled</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
