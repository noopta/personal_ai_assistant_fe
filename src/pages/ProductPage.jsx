import { motion } from "framer-motion";
import { Mail, Calendar, RefreshCw, Shield, AlertCircle } from "lucide-react";

export default function ProductPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--background)',
      color: 'var(--foreground)',
      overflowX: 'hidden'
    }}>
      <main style={{
        position: 'relative',
        padding: 'clamp(3.5rem, 6vw, 4rem) 1rem clamp(2rem, 4vw, 3rem)',
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 'bold',
            letterSpacing: '-0.02em',
            color: 'var(--foreground)',
            margin: 0
          }}>
            Connect Your Accounts
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--muted-foreground)',
            maxWidth: '56rem',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            To provide you with the best experience, please authenticate with Gmail and Google Calendar before proceeding.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Gmail Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'default',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '1.5rem',
              background: 'rgba(var(--primary-rgb, 99, 91, 255), 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              transition: 'transform 0.3s ease'
            }}>
              <Mail style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '0.75rem',
              color: 'var(--foreground)'
            }}>Gmail</h2>
            <p style={{
              color: 'var(--muted-foreground)',
              marginBottom: '2rem',
              flex: 1,
              lineHeight: 1.6
            }}>
              Connect your Gmail account to manage emails and get email-related assistance
            </p>
            <button style={{
              width: '100%',
              background: '#635BFF',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.75rem 1.5rem',
              height: '48px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(99, 91, 255, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#5249FF';
              e.target.style.boxShadow = '0 0 30px rgba(99, 91, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#635BFF';
              e.target.style.boxShadow = '0 0 20px rgba(99, 91, 255, 0.3)';
            }}
            >
              Connect Gmail
            </button>
          </motion.div>

          {/* Calendar Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'default',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '1.5rem',
              background: 'rgba(var(--primary-rgb, 99, 91, 255), 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              transition: 'transform 0.3s ease',
              position: 'relative'
            }}>
              <Calendar style={{ width: '32px', height: '32px', color: '#ef4444' }} />
              <div style={{
                position: 'absolute',
                top: '4px',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#ef4444',
                marginTop: '4px'
              }}>17</div>
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '0.75rem',
              color: 'var(--foreground)'
            }}>Google Calendar</h2>
            <p style={{
              color: 'var(--muted-foreground)',
              marginBottom: '2rem',
              flex: 1,
              lineHeight: 1.6
            }}>
              Connect your Google Calendar to manage events, meetings, and scheduling
            </p>
            <button style={{
              width: '100%',
              background: '#635BFF',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.75rem 1.5rem',
              height: '48px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(99, 91, 255, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#5249FF';
              e.target.style.boxShadow = '0 0 30px rgba(99, 91, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#635BFF';
              e.target.style.boxShadow = '0 0 20px rgba(99, 91, 255, 0.3)';
            }}
            >
              Connect Calendar
            </button>
          </motion.div>
        </div>

        {/* Status Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '3rem'
          }}
          className="status-section"
        >
          <button style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
            borderRadius: '0.5rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(var(--primary-rgb, 99, 91, 255), 0.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
          }}
          >
            <RefreshCw style={{ width: '1rem', height: '1rem' }} />
            Refresh Status
          </button>
          <div className="glass-panel" style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--muted-foreground)',
            fontSize: '0.875rem',
            background: 'rgba(var(--primary-rgb, 99, 91, 255), 0.05)',
            border: '1px solid rgba(var(--primary-rgb, 99, 91, 255), 0.2)'
          }}>
            Please connect at least one service to continue
          </div>
        </motion.div>

        {/* Permissions Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel"
          style={{
            padding: '1.5rem',
            borderRadius: '1rem',
            background: 'rgba(var(--primary-rgb, 99, 91, 255), 0.05)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            color: 'var(--foreground)',
            fontWeight: '500'
          }}>
            <AlertCircle style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
            <h3 style={{ margin: 0, fontSize: '1rem' }}>Why do we need these permissions?</h3>
          </div>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            fontSize: '0.875rem',
            color: 'var(--muted-foreground)',
            paddingLeft: '0.5rem'
          }}>
            <li style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--primary)',
                marginTop: '6px',
                flexShrink: 0
              }} />
              <span><strong style={{ color: 'var(--foreground)' }}>Gmail:</strong> To read, compose, and manage your emails</span>
            </li>
            <li style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--primary)',
                marginTop: '6px',
                flexShrink: 0
              }} />
              <span><strong style={{ color: 'var(--foreground)' }}>Google Calendar:</strong> To create, update, and manage your calendar events</span>
            </li>
          </ul>
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--muted-foreground)'
          }}>
            <Shield style={{ width: '12px', height: '12px', color: '#10b981' }} />
            Your data is secure and we only access what's necessary for the AI assistant to help you.
          </div>
        </motion.div>
      </main>
    </div>
  );
}
