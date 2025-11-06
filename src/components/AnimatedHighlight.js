import React, { useEffect, useRef, useState } from 'react';
import styles from './AnimatedHighlight.module.css';

const AnimatedHighlight = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay]);

  return (
    <span 
      ref={elementRef}
      className={`${styles.highlightWrapper} ${isVisible ? styles.visible : ''}`}
    >
      {children}
    </span>
  );
};

export default AnimatedHighlight;
