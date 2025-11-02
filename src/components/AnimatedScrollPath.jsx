import { useState, useEffect, useRef } from 'react';
import styles from './AnimatedScrollPath.module.css';

function AnimatedScrollPath({ targetRefs }) {
  const [pathData, setPathData] = useState('');
  const [pathLength, setPathLength] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const pathRef = useRef(null);
  const svgRef = useRef(null);

  // Calculate positions and generate path
  const updatePath = () => {
    if (!targetRefs || targetRefs.length === 0) return;

    const points = [];
    const margin = 60; // Distance from edge of viewport for the path
    const viewportWidth = window.innerWidth;
    
    // Determine which side to use (left for now, stays on one edge)
    const side = 'left';
    const xPos = side === 'left' ? margin : viewportWidth - margin;
    
    targetRefs.forEach((ref) => {
      if (ref && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        
        // Keep all points on the SAME edge (left side)
        // Position vertically at the element's vertical center
        const y = rect.top + scrollY + rect.height / 2;
        
        points.push({ x: xPos, y });
      }
    });

    if (points.length < 2) return;

    // Generate smooth curved path that flows along the LEFT edge only
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      const dy = next.y - current.y;
      
      // Create S-curves that stay within the left margin
      // Offset alternates to create a gentle wave along the edge
      const offset = (i % 2 === 0 ? 30 : -30);
      
      // Control points create curves that stay on the left side
      const cp1x = current.x + offset;
      const cp1y = current.y + dy * 0.4;
      const cp2x = next.x - offset;
      const cp2y = next.y - dy * 0.4;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }

    setPathData(path);
  };

  // Update path length and dot position after path is set
  useEffect(() => {
    if (pathRef.current && pathData) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
      
      // Update dot position based on scroll
      const updateDotPosition = () => {
        if (pathRef.current && pathLength > 0) {
          const distance = (scrollProgress / 100) * pathLength;
          const point = pathRef.current.getPointAtLength(distance);
          setDotPosition({ x: point.x, y: point.y });
        }
      };
      
      updateDotPosition();
    }
  }, [pathData, scrollProgress, pathLength]);

  // Handle scroll to update progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const scrollableHeight = documentHeight - windowHeight;
      if (scrollableHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      
      const progress = Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update path on mount and resize
  useEffect(() => {
    updatePath();
    
    const handleResize = () => {
      updatePath();
    };

    window.addEventListener('resize', handleResize);
    
    // Delay initial calculation to ensure elements are rendered
    const timer = setTimeout(updatePath, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRefs]);

  if (!pathData) return null;

  // Calculate SVG dimensions to cover entire document
  const svgWidth = window.innerWidth;
  const svgHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    window.innerHeight
  );

  return (
    <svg 
      ref={svgRef} 
      className={styles.scrollPath}
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.8" />
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background path (full path, dimmed) */}
      <path
        d={pathData}
        fill="none"
        stroke="#635BFF"
        strokeWidth="3"
        opacity="0.15"
      />
      
      {/* Animated path (reveals as you scroll) */}
      <path
        ref={pathRef}
        d={pathData}
        fill="none"
        stroke="#635BFF"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#glow)"
        opacity="0.8"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength - (scrollProgress / 100) * pathLength,
          transition: 'stroke-dashoffset 0.1s ease-out'
        }}
      />
      
      {/* Animated dot at the current position on the path */}
      {scrollProgress > 0 && pathLength > 0 && (
        <g>
          <circle
            cx={dotPosition.x}
            cy={dotPosition.y}
            r="8"
            fill="var(--accent-primary)"
            opacity="0.3"
          >
            <animate
              attributeName="r"
              values="8;16;8"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0;0.3"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx={dotPosition.x}
            cy={dotPosition.y}
            r="6"
            fill="var(--accent-primary)"
            filter="url(#glow)"
          />
        </g>
      )}
    </svg>
  );
}

export default AnimatedScrollPath;
