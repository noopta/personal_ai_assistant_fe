import { motion } from "framer-motion";
import { Calendar, Mail, MessageSquare, Mic, Shield } from "lucide-react";

const featureArt = "/images/3D_floating_abstract_AI_core_connecting_to_calendar_icons_d1fa25ad.png";

const features = [
  {
    icon: Mic,
    title: "Voice Command",
    description: "Just speak. \"Clear my afternoon\" or \"Draft a reply to Sarah\" - done instantly."
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "The AI negotiates times, finds slots, and handles timezones automatically."
  },
  {
    icon: Mail,
    title: "Inbox Triage",
    description: "Prioritizes what matters. Drafts responses in your unique tone of voice."
  },
  {
    icon: Shield,
    title: "Private by Design",
    description: "Your data never trains our models. Enterprise-grade security encryption."
  }
];

export function GlassFeatures() {
  return (
    <section id="features" className="features-section" style={{
      padding: '96px 0',
      position: 'relative',
      zIndex: 20
    }}>
      <div style={{
        maxWidth: '1280px',
        padding: '0 16px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '64px'
        }} className="features-container">
          
          <div style={{ width: '100%' }} className="features-content">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 'bold',
                marginBottom: '24px',
                color: 'var(--foreground)',
                lineHeight: 1.2
              }}>
                The Operating System <br/>
                <span className="text-gradient-primary">for your work life.</span>
              </h2>
              <p style={{
                fontSize: '18px',
                color: 'var(--muted-foreground)',
                marginBottom: '48px',
                lineHeight: 1.6,
                maxWidth: '600px'
              }}>
                Stop playing secretary. Our AI assistant integrates deeply with your Google ecosystem to handle the busywork, so you can focus on the deep work.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '24px'
              }} className="features-grid">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-panel feature-card"
                    style={{
                      padding: '32px',
                      borderRadius: '16px',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      border: '1px solid rgba(240, 0, 0, 0.1)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(16px)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.borderColor = 'rgba(240, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                      e.currentTarget.style.borderColor = 'rgba(240, 0, 0, 0.1)';
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(240, 0, 0, 0.2), rgba(100, 0, 200, 0.2))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      transition: 'all 0.3s',
                      border: '1px solid rgba(240, 0, 0, 0.2)'
                    }} className="feature-icon">
                      <feature.icon style={{
                        width: '24px',
                        height: '24px',
                        color: 'var(--primary)',
                        transition: 'all 0.3s'
                      }} />
                    </div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      marginBottom: '12px',
                      color: 'var(--foreground)'
                    }}>{feature.title}</h3>
                    <p style={{
                      fontSize: '15px',
                      color: 'var(--muted-foreground)',
                      lineHeight: 1.6,
                      flex: 1
                    }}>{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div style={{ width: '100%', position: 'relative' }} className="features-image">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative', zIndex: 10 }}
            >
              <div style={{
                position: 'relative',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 50px rgba(var(--primary), 0.2)'
              }}>
                <div className="feature-color-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  mixBlendMode: 'overlay',
                  zIndex: 20,
                  pointerEvents: 'none'
                }} />
                
                <style>{`
                  .feature-color-overlay {
                    background: linear-gradient(to top right, color-mix(in srgb, var(--primary) 20%, transparent), transparent);
                  }
                `}</style>
                <img 
                  src={featureArt} 
                  alt="AI Core" 
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    transition: 'transform 0.7s'
                  }}
                  className="feature-art-img"
                />
              </div>
              
              <div className="glass-panel animate-float feature-overlay-card" style={{
                position: 'absolute',
                bottom: '-2.5rem',
                left: '-2.5rem',
                padding: '1rem',
                borderRadius: '0.75rem',
                maxWidth: '384px',
                display: 'none',
                background: 'rgba(var(--background), 0.8)',
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(34, 197, 94, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MessageSquare style={{ width: '16px', height: '16px', color: 'rgb(34, 197, 94)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgb(34, 197, 94)', fontWeight: '500' }}>
                      Task Completed
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--foreground)', opacity: 0.9, marginTop: '4px' }}>
                      "I've rescheduled the strategy sync to Tuesday at 2pm as requested."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .features-section {
          background: hsl(240 4.8% 95.9% / 0.3);
        }
        
        .dark .features-section {
          background: hsl(240 3.7% 15.9% / 0.3);
        }
        
        @media (min-width: 640px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (min-width: 1024px) {
          .features-container {
            flex-direction: row !important;
          }
          .features-content {
            width: 50% !important;
          }
          .features-image {
            width: 50% !important;
          }
          .feature-overlay-card {
            display: flex !important;
          }
        }
        
        .feature-art-img:hover {
          transform: scale(1.05);
        }
        
        .feature-card:hover {
          background: rgba(var(--muted), 0.5);
        }
        
        .feature-card:hover .feature-icon {
          background: rgba(var(--primary), 0.2);
        }
        
        .feature-card:hover .feature-icon svg {
          color: var(--primary);
        }
      `}</style>
    </section>
  );
}
