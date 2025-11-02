import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../contexts/ThemeContext';

const Typewriter = ({ markdownText, speed = 15, components, ...markdownProps }) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const intervalRef = useRef();
  const { isDark } = useTheme();

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    intervalRef.current = setInterval(() => {
      setDisplayed(markdownText.slice(0, i + 1));
      i++;
      if (i === markdownText.length) {
        clearInterval(intervalRef.current);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [markdownText, speed]);

  const cursorColor = isDark ? 'var(--accent-secondary)' : 'var(--accent-primary)';

  return (
    <div style={{ position: 'relative', minHeight: '1.5em' }}>
      <ReactMarkdown components={components} {...markdownProps}>
        {displayed}
      </ReactMarkdown>
      {!done && (
        <span style={{
          color: cursorColor,
          fontWeight: 600,
          fontSize: '1.1em',
          animation: 'typewriter-blink 1s ease-in-out infinite',
          pointerEvents: 'none',
          marginLeft: '2px',
          display: 'inline-block',
          textShadow: `0 0 10px ${cursorColor}`,
        }}>
          |
        </span>
      )}
      <style>{`
        @keyframes typewriter-blink {
          0%, 45% { opacity: 1; }
          55%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Typewriter; 