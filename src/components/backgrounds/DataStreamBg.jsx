import { motion } from "framer-motion";

export function DataStreamBg() {
  const streams = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--background)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.9)' }} />
      
      {streams.map((stream) => (
        <div key={stream.id} style={{ position: 'absolute', top: 0, width: '1px', height: '100%', left: `${stream.x}%` }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'linear-gradient(to bottom, transparent, var(--primary), transparent)',
            opacity: 0.5
          }} />
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '100px',
              background: 'var(--accent)',
              filter: 'blur(2px)'
            }}
            initial={{ y: "-100%" }}
            animate={{ y: "100vh" }}
            transition={{
              duration: stream.duration,
              repeat: Infinity,
              ease: "linear",
              delay: stream.delay,
            }}
          />
        </div>
      ))}
      
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(var(--background-rgb), 0.2), var(--background))'
      }} />
    </div>
  );
}
