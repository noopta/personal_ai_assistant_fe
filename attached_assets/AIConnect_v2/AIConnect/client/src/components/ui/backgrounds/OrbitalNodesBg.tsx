import { motion } from "framer-motion";

export function OrbitalNodesBg() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background flex items-center justify-center">
      <div className="absolute inset-0 bg-black/90" />

      {/* Central Core */}
      <div className="relative z-10">
        <motion.div
          className="w-32 h-32 rounded-full bg-primary/20 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <div className="w-16 h-16 rounded-full border border-primary/50 bg-background relative flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-accent/80 shadow-[0_0_20px_currentColor] text-accent animate-pulse" />
        </div>
      </div>

      {/* Orbits */}
      {[1, 2, 3].map((orbit, i) => (
        <motion.div
          key={i}
          className="absolute border border-white/5 rounded-full"
          style={{
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_currentColor]"
            style={{ marginTop: "-8px" }}
          />
          {/* Data Beam to Center */}
          <motion.div 
            className="absolute top-0 left-1/2 w-[1px] bg-gradient-to-b from-accent to-transparent origin-top"
            style={{ height: '50%', marginTop: '-8px' }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 2, repeatDelay: 3 }}
          />
        </motion.div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}
