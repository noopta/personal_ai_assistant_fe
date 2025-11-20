import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export function SwarmBg() {
  // Create particles that will flow in a "field"
  const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: 10 + Math.random() * 10,
    delay: Math.random() * -20
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-black/90" />
      
      {/* Flow Field Simulation */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary blur-[0px]"
          style={{ width: p.size * 1.5, height: p.size * 1.5 }}
          animate={{
            x: [
              `${p.x}%`, 
              `${p.x + 10}%`, 
              `${p.x - 5}%`, 
              `${p.x}%`
            ],
            y: [
              `${p.y}%`, 
              `${p.y - 15}%`, 
              `${p.y - 5}%`, 
              `${p.y}%`
            ],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
        />
      ))}

      {/* Connecting Lines for "Cohesion" effect */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {particles.slice(0, 15).map((p, i) => (
           <motion.path
             key={i}
             d={`M ${p.x}% ${p.y}% Q ${(p.x + 50)/2}% ${(p.y + 50)/2}% 50% 50%`}
             stroke="currentColor"
             className="text-accent"
             strokeWidth="0.5"
             fill="none"
             animate={{
               d: [
                 `M ${p.x}% ${p.y}% Q ${(p.x + 50)/2}% ${(p.y + 50)/2}% 50% 50%`,
                 `M ${p.x + 10}% ${p.y - 10}% Q ${(p.x + 60)/2}% ${(p.y + 40)/2}% 50% 50%`,
                 `M ${p.x}% ${p.y}% Q ${(p.x + 50)/2}% ${(p.y + 50)/2}% 50% 50%`
               ]
             }}
             transition={{
               duration: p.duration,
               repeat: Infinity,
               ease: "easeInOut",
               delay: p.delay
             }}
           />
        ))}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}
