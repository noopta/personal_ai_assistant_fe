import { motion } from "framer-motion";

export function ConstellationBg() {
  // Generate random points
  const points = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-black/90" />
      
      <svg className="absolute inset-0 w-full h-full">
        {points.map((p, i) => (
          <g key={p.id}>
             {/* Connections to nearest neighbors (simplified by just connecting to next in array if close) */}
             {points.slice(i + 1, i + 3).map((neighbor, j) => (
               <motion.line
                 key={j}
                 x1={`${p.x}%`}
                 y1={`${p.y}%`}
                 x2={`${neighbor.x}%`}
                 y2={`${neighbor.y}%`}
                 stroke="currentColor"
                 className="text-primary/20"
                 strokeWidth="1"
                 animate={{
                   opacity: [0.1, 0.3, 0.1],
                 }}
                 transition={{
                   duration: 3 + Math.random(),
                   repeat: Infinity,
                 }}
               />
             ))}
             
             {/* The Point */}
             <motion.circle
               cx={`${p.x}%`}
               cy={`${p.y}%`}
               r={p.size}
               className="fill-white/80"
               animate={{
                 y: [0, -10, 0],
                 opacity: [0.5, 1, 0.5],
               }}
               transition={{
                 duration: 4 + Math.random() * 2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: Math.random() * 2,
               }}
             />
          </g>
        ))}
      </svg>
      
      {/* Digital Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }} 
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}
