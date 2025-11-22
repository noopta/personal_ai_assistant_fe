import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  const toggleTheme = (event) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Check if View Transitions API is supported for smooth animation
    if (document.startViewTransition && event) {
      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        
        document.documentElement.animate(
          { clipPath },
          {
            duration: 600,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
    } else {
      // Fallback for browsers without View Transitions API
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  };

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 