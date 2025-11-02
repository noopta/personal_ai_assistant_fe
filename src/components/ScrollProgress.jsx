import { useState, useEffect } from 'react';
import styles from './ScrollProgress.module.css';

function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Handle case where page content fits within viewport
      const scrollableHeight = documentHeight - windowHeight;
      if (scrollableHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      
      const scrollPercent = (scrollTop / scrollableHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.scrollProgress}>
      <div className={styles.rail}>
        <div 
          className={styles.indicator}
          style={{ top: `${scrollProgress}%` }}
        />
        <div 
          className={styles.progressLine}
          style={{ height: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
}

export default ScrollProgress;
