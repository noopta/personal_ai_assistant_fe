import { motion } from "framer-motion";
import { Calendar, Mail, Mic, Shield } from "lucide-react";

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
    <section id="features" style={{
      padding: '96px 0',
      position: 'relative',
      zIndex: 20,
      background: 'rgba(var(--muted), 0.3)'
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
                      padding: '24px',
                      borderRadius: '16px',
                      transition: 'all 0.3s',
                      cursor: 'default'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: 'var(--muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      transition: 'all 0.3s'
                    }} className="feature-icon">
                      <feature.icon style={{
                        width: '20px',
                        height: '20px',
                        color: 'var(--foreground)',
                        transition: 'all 0.3s'
                      }} />
                    </div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: 'var(--foreground)'
                    }}>{feature.title}</h3>
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--muted-foreground)',
                      lineHeight: 1.5
                    }}>{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
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
