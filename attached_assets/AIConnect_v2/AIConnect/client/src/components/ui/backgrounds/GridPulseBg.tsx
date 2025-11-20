import { motion } from "framer-motion";

export function GridPulseBg() {
  const cells = Array.from({ length: 40 }).map((_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden bg-background perspective-[1000px]">
      <div className="absolute inset-0 bg-black/90" />
      
      {/* Tilted Grid */}
      <div className="absolute inset-0 flex flex-wrap opacity-20 transform rotate-x-60 scale-150 origin-bottom">
         {cells.map((i) => (
           <motion.div
             key={i}
             className="w-[10vw] h-[10vw] border border-primary/30 relative"
           >
             <motion.div
               className="absolute inset-0 bg-accent/50"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 0.5, 0] }}
               transition={{
                 duration: 2,
                 repeat: Infinity,
                 delay: Math.random() * 5,
                 repeatDelay: Math.random() * 5
               }}
             />
           </motion.div>
         ))}
      </div>

      {/* Data Lines traveling across grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
        <motion.path
          d="M0 80 Q 50 10 100 80"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}
