import { motion } from "framer-motion";

export function GoldenSpiralBg() {
  const particles = Array.from({ length: 50 }).map((_, i) => {
    const angle = i * 0.5;
    const radius = 5 * Math.sqrt(i);
    return { id: i, angle, radius };
  });

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: 'var(--background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'color-mix(in srgb, var(--background) 90%, black)' }} />
      
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'var(--primary)',
              boxShadow: '0 0 5px currentColor'
            }}
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

        <svg style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1,
          animation: 'spin 60s linear infinite'
        }}>
           <circle cx="50%" cy="50%" r="10%" fill="none" stroke="var(--accent)" strokeWidth="1" />
           <circle cx="50%" cy="50%" r="20%" fill="none" stroke="var(--accent)" strokeWidth="1" />
           <circle cx="50%" cy="50%" r="35%" fill="none" stroke="var(--accent)" strokeWidth="1" />
           <circle cx="50%" cy="50%" r="55%" fill="none" stroke="var(--accent)" strokeWidth="1" />
        </svg>
        
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(var(--background-rgb), 0.2), var(--background))'
      }} />
    </div>
  );
}
