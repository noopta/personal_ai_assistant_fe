import { motion } from "framer-motion";

export function SocialClustersBg() {
  const clusters = [
    { x: 20, y: 30, color: "text-primary" },
    { x: 80, y: 20, color: "text-accent" },
    { x: 50, y: 70, color: "text-purple-500" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-black/90" />
      
      {clusters.map((cluster, i) => (
        <div key={i} className="absolute w-64 h-64" style={{ left: `${cluster.x}%`, top: `${cluster.y}%`, transform: 'translate(-50%, -50%)' }}>
          {/* Central Hub */}
          <motion.div
            className={`absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-current ${cluster.color} blur-sm`}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, delay: i }}
          />
          
          {/* Satellite Nodes */}
          {Array.from({ length: 6 }).map((_, j) => (
            <motion.div
              key={j}
              className={`absolute w-2 h-2 rounded-full bg-current ${cluster.color} opacity-50`}
              style={{ left: '50%', top: '50%' }}
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

          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            {Array.from({ length: 6 }).map((_, j) => (
              <motion.line
                key={j}
                x1="50%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke="currentColor"
                className={cluster.color}
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

      {/* Bridges between clusters */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
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

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}
