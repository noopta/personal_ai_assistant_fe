import { motion } from "framer-motion";

export function SocialClustersBg() {
  const clusters = [
    { x: 20, y: 30, color: "var(--primary)" },
    { x: 80, y: 20, color: "var(--accent)" },
    { x: 50, y: 70, color: "#a855f7" },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--background)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'color-mix(in srgb, var(--background) 90%, black)' }} />
      
      {clusters.map((cluster, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '256px',
          height: '256px',
          left: `${cluster.x}%`,
          top: `${cluster.y}%`,
          transform: 'translate(-50%, -50%)'
        }}>
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: cluster.color,
              filter: 'blur(4px)'
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, delay: i }}
          />
          
          {Array.from({ length: 6 }).map((_, j) => (
            <motion.div
              key={j}
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: cluster.color,
                opacity: 0.5,
                left: '50%',
                top: '50%'
              }}
              animate={{
                x: Math.cos(j * 60 * (Math.PI / 180)) * 60,
                y: Math.sin(j * 60 * (Math.PI / 180)) * 60,
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: j * 0.2,
              }}
            />
          ))}

          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            {Array.from({ length: 6 }).map((_, j) => (
              <motion.line
                key={j}
                x1="50%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke={cluster.color}
                strokeWidth="1"
                strokeOpacity="0.2"
                animate={{
                  x2: `${50 + (Math.cos(j * 60 * (Math.PI / 180)) * 25)}%`,
                  y2: `${50 + (Math.sin(j * 60 * (Math.PI / 180)) * 25)}%`,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: j * 0.2,
                }}
              />
            ))}
          </svg>
        </div>
      ))}

      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}>
        <motion.path
          d={`M ${clusters[0].x}% ${clusters[0].y}% L ${clusters[1].x}% ${clusters[1].y}% L ${clusters[2].x}% ${clusters[2].y}% Z`}
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, 100] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(var(--background-rgb), 0.2), var(--background))'
      }} />
    </div>
  );
}
