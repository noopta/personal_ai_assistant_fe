import { useEffect, useRef } from 'react';
import styles from './CyberBackground.module.css';

function CyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let matrix = [];
    let columns = 0;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / 20) + 1;
      matrix = Array(columns).fill(0);
    };

    resize();
    window.addEventListener('resize', resize);

    const matrixChars = '01';
    const fontSize = 16;
    ctx.font = `${fontSize}px monospace`;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FFFF';
      
      matrix.forEach((y, index) => {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        const x = index * 20;

        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00FFFF';
        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          matrix[index] = 0;
        } else {
          matrix[index] = y + fontSize;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.cyberBackground}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.gridOverlay} />
      <div className={styles.hexagonPattern} />
    </div>
  );
}

export default CyberBackground;
