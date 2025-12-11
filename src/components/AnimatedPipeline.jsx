import { useEffect, useRef, useState } from 'react';
import styles from './AnimatedPipeline.module.css';
import { GmailIcon, GoogleCalendarIcon, NotionIcon } from './icons';

const AnimatedPipeline = ({ direction = 'vertical' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const pipelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (pipelineRef.current) {
        const rect = pipelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate progress based on element visibility
        let progress = 0;
        if (elementTop < windowHeight && elementTop + elementHeight > 0) {
          progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
        }
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHorizontal = direction === 'horizontal';

  return (
    <div className={`${styles.pipelineContainer} ${isHorizontal ? styles.horizontal : ''}`} ref={pipelineRef}>
      <div className={`${styles.pipelineTrack} ${isHorizontal ? styles.horizontalTrack : ''}`}>
        {/* Pipeline line with gradient */}
        <svg 
          className={styles.pipelineSvg} 
          viewBox={isHorizontal ? "0 0 400 100" : "0 0 100 400"} 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient 
              id="pipelineGradient" 
              x1={isHorizontal ? "0%" : "0%"} 
              y1={isHorizontal ? "0%" : "0%"} 
              x2={isHorizontal ? "100%" : "0%"} 
              y2={isHorizontal ? "0%" : "100%"}
            >
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="var(--accent-secondary)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main pipeline path */}
          <path
            d={isHorizontal ? "M 20 50 L 380 50" : "M 50 20 L 50 380"}
            stroke="url(#pipelineGradient)"
            strokeWidth="4"
            fill="none"
            filter="url(#glow)"
            className={styles.pipelinePath}
          />
          
          {/* Connection nodes */}
          {isHorizontal ? (
            <>
              <circle cx="80" cy="50" r="8" fill="var(--accent-primary)" className={styles.connectionNode} />
              <circle cx="200" cy="50" r="8" fill="var(--accent-secondary)" className={styles.connectionNode} />
              <circle cx="320" cy="50" r="8" fill="var(--accent-primary)" className={styles.connectionNode} />
            </>
          ) : (
            <>
              <circle cx="50" cy="80" r="8" fill="var(--accent-primary)" className={styles.connectionNode} />
              <circle cx="50" cy="200" r="8" fill="var(--accent-secondary)" className={styles.connectionNode} />
              <circle cx="50" cy="320" r="8" fill="var(--accent-primary)" className={styles.connectionNode} />
            </>
          )}
        </svg>

        {/* Animated data packet */}
        <div 
          className={styles.dataPacket}
          style={{ 
            transform: isHorizontal 
              ? `translateX(${scrollProgress * 300}px)` 
              : `translateY(${scrollProgress * 300}px)`,
            opacity: scrollProgress > 0.1 ? 1 : 0
          }}
        >
          <div className={styles.packetIcon}>📦</div>
          <div className={`${styles.packetTrail} ${isHorizontal ? styles.horizontalTrail : ''}`}></div>
        </div>

        {/* Integration icons positioned along the pipeline */}
        <div className={`${styles.integrationIcons} ${isHorizontal ? styles.horizontalIcons : ''}`}>
          <div 
            className={`${styles.integrationIcon} ${styles.gmailIcon} ${isHorizontal ? styles.horizontalGmail : ''}`}
            style={{ 
              opacity: scrollProgress > 0.2 ? 1 : 0.3,
              transform: `scale(${scrollProgress > 0.2 ? 1.1 : 1})`
            }}
          >
            <div className={styles.iconBackground}><GmailIcon size={28} /></div>
            <div className={styles.iconLabel}>Gmail</div>
          </div>
          
          <div 
            className={`${styles.integrationIcon} ${styles.calendarIcon} ${isHorizontal ? styles.horizontalCalendar : ''}`}
            style={{ 
              opacity: scrollProgress > 0.5 ? 1 : 0.3,
              transform: `scale(${scrollProgress > 0.5 ? 1.1 : 1})`
            }}
          >
            <div className={styles.iconBackground}><GoogleCalendarIcon size={28} /></div>
            <div className={styles.iconLabel}>Calendar</div>
          </div>
          
          <div 
            className={`${styles.integrationIcon} ${styles.notionIcon} ${isHorizontal ? styles.horizontalNotion : ''}`}
            style={{ 
              opacity: scrollProgress > 0.8 ? 1 : 0.3,
              transform: `scale(${scrollProgress > 0.8 ? 1.1 : 1})`
            }}
          >
            <div className={styles.iconBackground}><NotionIcon size={28} /></div>
            <div className={styles.iconLabel}>Notion</div>
          </div>
        </div>

        {/* Data flow particles */}
        <div className={`${styles.dataFlow} ${isHorizontal ? styles.horizontalFlow : ''}`}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`${styles.flowParticle} ${isHorizontal ? styles.horizontalParticle : ''}`}
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedPipeline; 