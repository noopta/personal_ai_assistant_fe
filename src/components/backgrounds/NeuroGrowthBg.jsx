import { motion } from "framer-motion";

export function NeuroGrowthBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--background)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'color-mix(in srgb, var(--background) 90%, black)' }} />
      
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', color: 'var(--primary)' }}>
        <motion.path
          d="M 50% 100% Q 50% 50% 50% 20%"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <motion.path
          d="M 50% 60% Q 30% 50% 10% 40%"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        />
        <motion.path
          d="M 30% 50% Q 20% 30% 15% 10%"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
        />

        <motion.path
          d="M 50% 70% Q 70% 60% 90% 30%"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 2, delay: 0.7, ease: "easeOut" }}
        />
        
        <motion.circle
          r="3"
          fill="white"
          filter="url(#glow)"
        >
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 50% 100% Q 50% 50% 50% 20%"
          />
        </motion.circle>
        
        <motion.circle
          r="2"
          fill="white"
          filter="url(#glow)"
        >
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            begin="1s"
            path="M 50% 60% Q 30% 50% 10% 40%"
          />
        </motion.circle>

        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(var(--background-rgb), 0.2), var(--background))'
      }} />
    </div>
  );
}
