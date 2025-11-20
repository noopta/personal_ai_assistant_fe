import { motion } from "framer-motion";

export function DataStreamBg() {
  const streams = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-black/90" />
      
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute top-0 w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent opacity-50"
          style={{ left: `${stream.x}%`, height: "100%" }}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-[100px] bg-accent blur-[2px]"
            initial={{ y: "-100%" }}
            animate={{ y: "100vh" }}
            transition={{
              duration: stream.duration,
              repeat: Infinity,
              ease: "linear",
              delay: stream.delay,
            }}
          />
        </motion.div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}
