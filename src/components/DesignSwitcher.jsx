import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Palette } from "lucide-react";

const colorVariants = [
  { name: "Original", theme: null },
  { name: "Crimson", theme: "crimson", color: "rgb(239, 68, 68)" },
  { name: "Tangerine", theme: "tangerine", color: "rgb(249, 115, 22)" },
  { name: "Canary", theme: "canary", color: "rgb(234, 179, 8)" },
  { name: "Emerald", theme: "emerald", color: "rgb(34, 197, 94)" },
  { name: "Teal", theme: "teal", color: "rgb(20, 184, 166)" },
  { name: "Azure", theme: "azure", color: "rgb(59, 130, 246)" },
  { name: "Indigo", theme: "indigo", color: "rgb(99, 102, 241)" },
  { name: "Violet", theme: "violet", color: "rgb(168, 85, 247)" },
  { name: "Magenta", theme: "magenta", color: "rgb(236, 72, 153)" },
];

export function DesignSwitcher() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(null);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    const root = document.documentElement;
    colorVariants.forEach(v => {
      if (v.theme) root.classList.remove(`theme-${v.theme}`);
    });
    if (theme) root.classList.add(`theme-${theme}`);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      alignItems: 'flex-end'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          background: 'var(--background)',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? (
          <ChevronDown style={{ width: '16px', height: '16px', color: 'var(--foreground)' }} />
        ) : (
          <Palette style={{ width: '16px', height: '16px', color: 'var(--foreground)' }} />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              background: 'rgba(var(--background), 0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              padding: '0.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              maxHeight: '60vh',
              overflowY: 'auto',
              width: '14rem'
            }}
          >
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              color: 'var(--muted-foreground)',
              padding: '0.5rem',
              position: 'sticky',
              top: 0,
              background: 'rgba(var(--background), 0.9)',
              backdropFilter: 'blur(12px)',
              zIndex: 10
            }}>
              Color Variants
            </div>
            {colorVariants.map((variant) => (
              <button
                key={variant.name}
                onClick={() => handleThemeChange(variant.theme)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  background: currentTheme === variant.theme ? 'var(--primary)' : 'transparent',
                  color: currentTheme === variant.theme ? 'var(--primary-foreground)' : 'var(--foreground)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  textAlign: 'left',
                  width: '100%',
                  height: '2rem',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (currentTheme !== variant.theme) {
                    e.currentTarget.style.background = 'var(--muted)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentTheme !== variant.theme) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {variant.color && (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: variant.color,
                    flexShrink: 0
                  }} />
                )}
                {variant.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
