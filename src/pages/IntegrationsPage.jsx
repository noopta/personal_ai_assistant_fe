import { motion } from "framer-motion";
import { Mail, Calendar, FileText, ArrowRight } from "lucide-react";
import { GlassNav } from '../components/GlassNav';
import MadeInCanada from '../components/MadeInCanada';

function Step({ number, title, desc }) {
  return (
    <div className="glass-panel" style={{
      padding: '1rem',
      borderRadius: '0.5rem',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid var(--border)',
      transition: 'all 0.3s ease',
      cursor: 'default'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
    }}
    >
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: 'var(--primary)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        marginBottom: '0.75rem',
        boxShadow: '0 0 10px rgba(99, 91, 255, 0.5)'
      }}>
        {number}
      </div>
      <h3 style={{
        fontWeight: 'bold',
        fontSize: '0.875rem',
        color: 'var(--foreground)',
        marginBottom: '0.5rem',
        margin: '0 0 0.5rem 0'
      }}>{title}</h3>
      <p style={{
        fontSize: '0.75rem',
        color: 'var(--muted-foreground)',
        lineHeight: 1.6,
        margin: 0
      }}>{desc}</p>
    </div>
  );
}

function ScopeBadge({ children }) {
  return (
    <code style={{
      fontSize: '0.625rem',
      background: 'var(--muted)',
      border: '1px solid var(--border)',
      borderRadius: '0.25rem',
      padding: '0.25rem 0.5rem',
      fontFamily: 'monospace',
      color: 'var(--primary)'
    }}>
      {children}
    </code>
  );
}

function IntegrationCard({ icon, title, description, delay, children }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-panel"
      style={{
        borderRadius: '1rem',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s ease',
        background: 'rgba(255, 255, 255, 0.02)'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '2rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '0.75rem',
          background: 'rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: 'var(--foreground)',
            margin: 0
          }}>{title}</h2>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--muted-foreground)',
            margin: 0
          }}>{description}</p>
        </div>
      </div>
      <div style={{
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.01)'
      }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function IntegrationsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--background)',
      color: 'var(--foreground)',
      overflowX: 'hidden'
    }}>
      <main style={{
        position: 'relative',
        padding: 'clamp(2rem, 4vw, 3rem) 1rem',
        maxWidth: '64rem',
        margin: '0 auto'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}
        >
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 'bold',
            letterSpacing: '-0.02em',
            color: 'var(--foreground)',
            margin: '0 0 1rem 0'
          }}>
            Integrations
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--muted-foreground)',
            margin: 0,
            lineHeight: 1.6
          }}>
            Connect AirThreads with your favorite tools to maximize productivity
          </p>
        </motion.div>

        {/* Integration Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {/* Gmail Integration */}
          <IntegrationCard 
            icon="📧"
            title="Gmail"
            description="Manage your emails and send messages through AI assistance"
            delay={0.2}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 'bold',
                color: 'var(--primary)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textAlign: 'center'
              }}>Quick Setup</div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem'
              }}>
                <Step number="1" title="Enable Gmail API" desc="Go to Google Cloud Console, create or select a project, and enable the Gmail API" />
                <Step number="2" title="Create OAuth Credentials" desc='Navigate to Credentials, create OAuth 2.0 Client ID, and set application type to "Desktop"' />
                <Step number="3" title="Configure & Authenticate" desc="Download credentials.json, place in backend directory, then authenticate via the app" />
              </div>
              
              <div className="glass-panel" style={{
                padding: '1rem',
                borderRadius: '0.5rem',
                background: 'rgba(var(--primary-rgb, 99, 91, 255), 0.05)',
                border: '1px solid rgba(var(--primary-rgb, 99, 91, 255), 0.2)'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: 'var(--primary)',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase'
                }}>Required Scopes</div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <ScopeBadge>gmail.readonly</ScopeBadge>
                  <ScopeBadge>gmail.send</ScopeBadge>
                  <ScopeBadge>gmail.modify</ScopeBadge>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button style={{
                  background: '#635BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 0 20px rgba(99, 91, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#5249FF';
                  e.target.style.boxShadow = '0 0 30px rgba(99, 91, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#635BFF';
                  e.target.style.boxShadow = '0 0 20px rgba(99, 91, 255, 0.2)';
                }}
                >
                  Start Setup <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            </div>
          </IntegrationCard>

          {/* Calendar Integration */}
          <IntegrationCard 
            icon="📅"
            title="Google Calendar"
            description="Schedule meetings and manage events through natural language"
            delay={0.3}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 'bold',
                color: 'var(--primary)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textAlign: 'center'
              }}>Quick Setup</div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem'
              }}>
                <Step number="1" title="Enable Calendar API" desc="Visit Google Cloud Console and enable the Google Calendar API in your project" />
                <Step number="2" title="Use OAuth Credentials" desc="Reuse Gmail credentials or create new OAuth 2.0 credentials following the same process" />
                <Step number="3" title="Authorize & Connect" desc='Click "Authenticate Calendar" in the app and grant calendar permissions' />
              </div>
              
              <div className="glass-panel" style={{
                padding: '1rem',
                borderRadius: '0.5rem',
                background: 'rgba(var(--primary-rgb, 99, 91, 255), 0.05)',
                border: '1px solid rgba(var(--primary-rgb, 99, 91, 255), 0.2)'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: 'var(--primary)',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase'
                }}>Permissions</div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <ScopeBadge>calendar</ScopeBadge>
                  <ScopeBadge>calendar.events</ScopeBadge>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button style={{
                  background: '#635BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 0 20px rgba(99, 91, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#5249FF';
                  e.target.style.boxShadow = '0 0 30px rgba(99, 91, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#635BFF';
                  e.target.style.boxShadow = '0 0 20px rgba(99, 91, 255, 0.2)';
                }}
                >
                  Start Setup <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            </div>
          </IntegrationCard>

          {/* Notion Integration (Coming Soon) */}
          <IntegrationCard 
            icon="📝"
            title="Notion"
            description="Create notes, manage projects, and organize knowledge seamlessly"
            delay={0.4}
          >
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              opacity: 0.7
            }}>
              <p style={{
                color: 'var(--muted-foreground)',
                marginBottom: '1rem',
                fontSize: '1rem',
                lineHeight: 1.6
              }}>
                This integration is coming soon. We're working hard to bring you Notion support alongside Gmail and Google Calendar.
              </p>
              <div style={{
                display: 'inline-block',
                background: 'rgba(var(--primary-rgb, 99, 91, 255), 0.2)',
                color: 'var(--primary)',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Coming Soon
              </div>
            </div>
          </IntegrationCard>
        </div>
      </main>

      <GlassNav />
      <MadeInCanada />
    </div>
  );
}
