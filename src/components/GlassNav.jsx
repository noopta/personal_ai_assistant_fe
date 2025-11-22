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
        borderRadius: '16px',
        padding: '14px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        border: '1px solid rgba(240, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)'
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemeToggle />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '8px' }}>
            <a href="#" style={{
              display: 'none',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--muted-foreground)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }} className="sign-in-link">Sign In</a>
            <button style={{
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              color: 'var(--primary-foreground)',
              fontWeight: '600',
              padding: '10px 28px',
              height: '40px',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 6px 20px rgba(240, 0, 0, 0.15)'
            }}>
              Get Early Access
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .nav-links {
            display: flex !important;
          }
          .sign-in-link {
            display: block !important;
          }
        }
        
        .nav-links a:hover,
        .sign-in-link:hover {
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
