import { motion } from "framer-motion";

export function HexMeshBg() {
  const hexes = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: (i % 6) * 16 + (Math.floor(i / 6) % 2) * 8,
    y: Math.floor(i / 6) * 18,
  }));

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
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.3,
        transform: 'scale(1.5)'
      }}>
        {hexes.map((hex) => (
          <div
            key={hex.id}
            style={{
              position: 'absolute',
              width: '64px',
              height: '64px',
              left: `${hex.x}%`,
              top: `${hex.y}%`,
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              background: 'color-mix(in srgb, var(--primary) 20%, transparent)',
              border: '1px solid color-mix(in srgb, var(--primary) 50%, transparent)'
            }} />
            
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'color-mix(in srgb, var(--accent) 40%, transparent)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          </div>
        ))}
      </div>
      
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05), transparent)',
        width: '200%',
        transform: 'skewX(-12deg)',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(var(--background-rgb), 0.2), var(--background))'
      }} />
    </div>
  );
}
