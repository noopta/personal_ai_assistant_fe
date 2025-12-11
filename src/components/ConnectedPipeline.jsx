import { useRef, useState, useEffect } from 'react';
import styles from './AnimatedPipeline.module.css';
import { GmailIcon, GoogleCalendarIcon, NotionIcon } from './icons';

const NODES = [
  { label: 'Gmail', icon: <GmailIcon size={24} /> },
  { label: 'Calendar', icon: <GoogleCalendarIcon size={24} /> },
  { label: 'Notion', icon: <NotionIcon size={24} /> },
];

const NODE_POSITIONS = [0.1, 0.5, 0.9]; // As a percentage of rail length

export default function ConnectedPipeline() {
  const pipelineRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [packetPos, setPacketPos] = useState(NODE_POSITIONS[0]);
  const animRef = useRef();

  // SVG dimensions
  const width = 700;
  const height = 120;
  const railY = height / 2;
  const nodeY = railY;
  const nodeRadius = 32;

  // Target position for the packet
  const packetIdx = hoveredIdx === null ? 0 : hoveredIdx;
  const targetPos = NODE_POSITIONS[packetIdx];

  // Animate packet position smoothly
  useEffect(() => {
    function animate() {
      setPacketPos(prev => {
        const diff = targetPos - prev;
        if (Math.abs(diff) < 0.001) return targetPos;
        return prev + diff * 0.18; // Easing factor
      });
      if (Math.abs(packetPos - targetPos) > 0.001) {
        animRef.current = requestAnimationFrame(animate);
      }
    }
    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
    // eslint-disable-next-line
  }, [targetPos]);

  const packetX = width * packetPos;

  return (
    <div className={styles.pipelineContainer} ref={pipelineRef} style={{height: height, border: '2px solid red'}}>
      <svg width={width} height={height} className={styles.pipelineSvg} style={{display: 'block', margin: '0 auto'}}>
        {/* DEBUG: Pure white, thick rail, no filter */}
        <line
          x1={width * NODE_POSITIONS[0]}
          y1={railY}
          x2={width * NODE_POSITIONS[NODE_POSITIONS.length - 1]}
          y2={railY}
          stroke="#fff"
          strokeWidth="40"
        />
        {/* Data packet */}
        <g>
          <circle
            cx={packetX}
            cy={railY}
            r={20}
            fill="#3B82F6"
            style={{
              opacity: 1,
              transition: 'filter 0.3s',
            }}
          />
        </g>
        {/* Integration nodes */}
        {NODES.map(({ label, icon }, i) => {
          const x = width * NODE_POSITIONS[i];
          const isActive = i === packetIdx;
          return (
            <g key={label} style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Node background */}
              <circle
                cx={x}
                cy={nodeY}
                r={nodeRadius}
                fill="#121826"
                stroke={isActive ? '#3B82F6' : '#06B6D4'}
                strokeWidth={isActive ? 4 : 2}
                style={{ transition: 'stroke 0.3s, r 0.3s' }}
              />
              {/* Emoji Icon */}
              <text
                x={x}
                y={nodeY + 10}
                textAnchor="middle"
                fontSize={32}
                dominantBaseline="middle"
                style={{ pointerEvents: 'none' }}
              >
                {icon}
              </text>
              {/* Label */}
              <text
                x={x}
                y={nodeY + nodeRadius + 24}
                textAnchor="middle"
                fill={isActive ? '#3B82F6' : '#A1A8C4'}
                fontSize={isActive ? 20 : 16}
                fontWeight={isActive ? 700 : 500}
                style={{
                  filter: isActive ? 'drop-shadow(0 0 8px #3B82F6)' : 'none',
                  transition: 'fill 0.3s, font-size 0.3s',
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
} 