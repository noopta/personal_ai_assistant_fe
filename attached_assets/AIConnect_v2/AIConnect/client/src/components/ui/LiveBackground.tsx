import { motion } from "framer-motion";

export function LiveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-black/90" />

      {/* Moving Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[100px] mix-blend-screen"
      />

      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, -60, 0],
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent/20 blur-[120px] mix-blend-screen"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 50, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-purple-500/20 blur-[90px] mix-blend-screen"
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, 
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }} 
      />
      
      {/* Scanning Line */}
      <motion.div
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"
      />
    </div>
  );
}
