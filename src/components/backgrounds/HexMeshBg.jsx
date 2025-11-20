import { motion } from "framer-motion";

export function HexMeshBg() {
  // Create a hex grid pattern
  const hexes = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    // Roughly position them in a grid
    x: (i % 6) * 16 + (Math.floor(i / 6) % 2) * 8,
    y: Math.floor(i / 6) * 18,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden bg-background flex items-center justify-center">
      <div className="absolute inset-0 bg-black/90" />
      
      <div className="absolute inset-0 flex flex-wrap items-center justify-center opacity-30 scale-150">
        {hexes.map((hex) => (
          <motion.div
            key={hex.id}
            className="absolute w-16 h-16"
            style={{ 
              left: `${hex.x}%`, 
              top: `${hex.y}%`,
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          >
            <div className="w-full h-full bg-primary/20 border border-primary/50" />
            
            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 bg-accent/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Organic Ripple Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%] skew-x-12 animate-pulse" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}
