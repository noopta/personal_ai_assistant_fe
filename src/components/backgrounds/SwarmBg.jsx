import { motion } from "framer-motion";
import { useMemo } from "react";

export function SwarmBg() {
  const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: 10 + Math.random() * 10,
    delay: Math.random() * -20
  })), []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--background)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'color-mix(in srgb, var(--background) 90%, black)' }} />
      
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            background: 'var(--primary)',
            width: p.size * 1.5,
            height: p.size * 1.5
          }}
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

      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2 }}>
        {particles.slice(0, 15).map((p, i) => (
           <motion.path
             key={i}
             d={`M ${p.x}% ${p.y}% Q ${(p.x + 50)/2}% ${(p.y + 50)/2}% 50% 50%`}
             stroke="var(--accent)"
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

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(var(--background-rgb), 0.2), var(--background))'
      }} />
    </div>
  );
}
