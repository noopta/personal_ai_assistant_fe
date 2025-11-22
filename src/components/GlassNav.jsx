import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export function GlassNav() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: '24px',
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px'
      }}
    >
      <div className="glass-panel" style={{
        borderRadius: '9999px',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(var(--primary), 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(var(--primary), 0.3)'
          }}>
            <Zap style={{ width: '16px', height: '16px', color: 'var(--primary)' }} />
          </div>
          <span style={{
            fontWeight: 'bold',
            fontSize: '18px',
            letterSpacing: '-0.02em',
            color: 'var(--foreground)'
          }}>AirThreads</span>
        </Link>

        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '32px',
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--muted-foreground)'
        }} className="nav-links">
          <Link to="/product" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>
            Product
          </Link>
          <Link to="/integrations" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>
            Integrations
          </Link>
          <Link to="/about" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>
            About
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ThemeToggle />
          <button style={{
            borderRadius: '9999px',
            background: 'var(--foreground)',
            color: 'var(--background)',
            fontWeight: '500',
            padding: '8px 24px',
            height: '36px',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            Try Now
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .nav-links {
            display: flex !important;
          }
        }
        
        .nav-links a:hover {
          color: var(--foreground) !important;
        }
        
        button:hover {
          background: var(--foreground);
          opacity: 0.9;
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </motion.nav>
  );
}
