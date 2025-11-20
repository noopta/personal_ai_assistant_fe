import { motion } from "framer-motion";

export function GoldenSpiralBg() {
  // Approximating a spiral with particles
  const particles = Array.from({ length: 50 }).map((_, i) => {
    const angle = i * 0.5; // Golden angle approximation
    const radius = 5 * Math.sqrt(i); // Growth factor
    return { id: i, angle, radius };
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-background flex items-center justify-center">
      <div className="absolute inset-0 bg-black/90" />
      
      <div className="relative w-full h-full max-w-[100vh] max-h-[100vh] flex items-center justify-center">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 rounded-full bg-primary shadow-[0_0_5px_currentColor]"
            initial={{
              x: Math.cos(p.angle) * p.radius * 5,
              y: Math.sin(p.angle) * p.radius * 5,
              opacity: 0,
            }}
            animate={{
              rotate: 360,
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              rotate: {
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: {
                duration: 3,
                repeat: Infinity,
                delay: p.id * 0.1,
              },
              scale: {
                duration: 3,
                repeat: Infinity,
                delay: p.id * 0.1,
              }
            }}
          />
        ))}

        {/* Spiral Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10 animate-spin-slow" style={{ animationDuration: '60s' }}>
           <circle cx="50%" cy="50%" r="10%" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1" />
           <circle cx="50%" cy="50%" r="20%" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1" />
           <circle cx="50%" cy="50%" r="35%" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1" />
           <circle cx="50%" cy="50%" r="55%" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}
