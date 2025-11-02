import React from 'react';
import styles from './AILoadingAnimation.module.css';

const AILoadingAnimation = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.aiBrain}>
        <div className={styles.brainCore}>
          <div className={styles.neuron}></div>
          <div className={styles.neuron}></div>
          <div className={styles.neuron}></div>
          <div className={styles.neuron}></div>
          <div className={styles.neuron}></div>
          <div className={styles.neuron}></div>
        </div>
        <div className={styles.brainWaves}>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
        </div>
      </div>
      
      <div className={styles.loadingText}>
        <div className={styles.thinking}>
          <span className={styles.dot}>Thinking</span>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
        </div>
        <div className={styles.status}>
          <div className={styles.statusItem}>
            <div className={styles.statusIcon}>🧠</div>
            <span>Processing your request</span>
          </div>
          <div className={styles.statusItem}>
            <div className={styles.statusIcon}>⚡</div>
            <span>Analyzing context</span>
          </div>
          <div className={styles.statusItem}>
            <div className={styles.statusIcon}>🎯</div>
            <span>Generating response</span>
          </div>
        </div>
      </div>
      
      <div className={styles.particles}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className={styles.particle} style={{ '--delay': `${i * 0.1}s` }}></div>
        ))}
      </div>
    </div>
  );
};

export default AILoadingAnimation; 