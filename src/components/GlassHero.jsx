import { motion } from "framer-motion";
import { ArrowRight, Calendar, Mail, Sparkles } from "lucide-react";

const heroBg = "/images/Abstract_deep_tech_background_with_glowing_nodes_2d45bed3.png";

export function GlassHero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingTop: '80px'
    }}>
      {/* Background Image with Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img 
          src={heroBg} 
          alt="Background" 
          className="hero-bg-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div className="hero-overlay" />
      </div>

      <style>{`
        .hero-bg-img {
          opacity: 0.2;
          transition: opacity 0.5s;
        }
        
        .dark .hero-bg-img {
          opacity: 0.4;
        }
        
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, var(--background) 0%, transparent 40%, var(--background) 100%);
          opacity: 0.8;
          z-index: 10;
        }
        
        .dark .hero-overlay {
          opacity: 0.5;
        }
      `}</style>

      <div style={{
        position: 'relative',
        zIndex: 20,
        padding: '0 16px',
        textAlign: 'center',
        maxWidth: '896px',
        margin: '0 auto',
        width: '100%'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            color: 'var(--primary)',
            marginBottom: '32px'
          }}
        >
          <Sparkles style={{ width: '12px', height: '12px' }} />
          <span style={{ letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '10px', fontWeight: '600' }}>
            Now in Public Beta
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 'bold',
            letterSpacing: '-0.04em',
            marginBottom: '24px',
            lineHeight: 1.1
          }}
        >
          <span className="text-gradient" style={{ display: 'block' }}>Your Life,</span>
          <span className="text-gradient-primary" style={{ display: 'block' }}>Autopilot.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--muted-foreground)',
            maxWidth: '672px',
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}
        >
          Connect your Gmail and Google Calendar to a hyper-intelligent AI assistant. 
          Delegate scheduling, email drafting, and task management via simple voice commands.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px'
          }}
          className="button-group"
        >
          <button className="glow-effect" style={{
            borderRadius: '9999px',
            padding: '14px 32px',
            height: '48px',
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
            fontSize: '18px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            maxWidth: '280px',
            justifyContent: 'center',
            transition: 'all 0.3s'
          }}>
            Start Automating
            <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
          </button>
          <button className="glass-button" style={{
            borderRadius: '9999px',
            padding: '14px 32px',
            height: '48px',
            fontSize: '18px',
            fontWeight: '500',
            background: 'transparent',
            color: 'var(--foreground)',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            maxWidth: '280px'
          }}>
            View Demo
          </button>
        </motion.div>

        {/* Floating Gmail Card */}
        <div className="animate-float floating-card-left" style={{
          position: 'absolute',
          top: '50%',
          left: '40px',
          display: 'none'
        }}>
          <div className="glass-panel" style={{
            padding: '16px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '256px',
            background: 'rgba(var(--background), 0.5)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Mail style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Gmail Integration</div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--foreground)' }}>Inbox Zero Reached</div>
            </div>
          </div>
        </div>

        {/* Floating Calendar Card */}
        <div className="animate-float-delayed floating-card-right" style={{
          position: 'absolute',
          top: '33.333%',
          right: '40px',
          display: 'none'
        }}>
          <div className="glass-panel" style={{
            padding: '16px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '256px',
            background: 'rgba(var(--background), 0.5)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(168, 85, 247, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar style={{ width: '20px', height: '20px', color: '#a855f7' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Calendar Agent</div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--foreground)' }}>Meeting Scheduled</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .button-group {
            flex-direction: row !important;
          }
        }
        
        @media (min-width: 1024px) {
          .floating-card-left,
          .floating-card-right {
            display: block !important;
          }
        }
        
        button:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
