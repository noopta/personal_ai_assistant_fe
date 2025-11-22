import { useEffect, useRef } from 'react';
import { Gradient } from '../utils/gradient';
import styles from './StripeGradient.module.css';

function StripeGradient() {
  const canvasRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !gradientRef.current) {
      gradientRef.current = new Gradient();
      gradientRef.current.initGradient('#gradient-canvas');
    }

    return () => {
      if (gradientRef.current) {
        gradientRef.current.disconnect();
      }
    };
  }, []);

  return (
    <canvas
      id="gradient-canvas"
      ref={canvasRef}
      className={styles.gradientCanvas}
      style={{
        '--gradient-color-1': 'var(--gradient-1)',
        '--gradient-color-2': 'var(--gradient-2)',
        '--gradient-color-3': 'var(--gradient-3)',
        '--gradient-color-4': 'var(--gradient-4)'
      }}
    />
  );
}

export default StripeGradient;
