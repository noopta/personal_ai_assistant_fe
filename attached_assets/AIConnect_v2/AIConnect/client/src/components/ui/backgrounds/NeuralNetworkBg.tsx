import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function NeuralNetworkBg() {
  // Create a static set of nodes for the background
  const nodes = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-black/90" />
      
      <svg className="absolute inset-0 w-full h-full opacity-30">
        {nodes.map((node, i) => (
          nodes.slice(i + 1, i + 4).map((target, j) => (
            <g key={`${i}-${j}`}>
              <motion.line
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 2, delay: i * 0.1 }}
              />
              {/* Data Packet */}
              <motion.circle
                r="2"
                fill="currentColor"
                className="text-accent"
              >
                <animateMotion
                  dur={`${2 + Math.random() * 3}s`}
                  repeatCount="indefinite"
                  path={`M${node.x * 10},${node.y * 10} L${target.x * 10},${target.y * 10}`} // Simplified path logic for SVG scaling is tricky, using simpler CSS approach below for packets might be better, but let's try absolute positioning for nodes first.
                />
              </motion.circle>
              {/* Alternative Packet Implementation using Framer Motion along line coordinates */}
              <motion.circle
                r="3"
                className="fill-accent"
                initial={{ cx: `${node.x}%`, cy: `${node.y}%` }}
                animate={{ cx: `${target.x}%`, cy: `${target.y}%` }}
                transition={{
                  duration: 1 + Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                  ease: "linear"
                }}
              />
            </g>
          ))
        ))}
        
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="4"
            className="fill-primary"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </svg>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  );
}
