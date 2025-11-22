import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--background)',
      color: 'var(--foreground)',
      overflowX: 'hidden'
    }}>
      <main style={{
        position: 'relative',
        padding: 'clamp(2rem, 3vw, 3rem) 1rem clamp(2rem, 4vw, 3rem)',
        maxWidth: '64rem',
        margin: '0 auto'
      }}>
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: '5rem'
          }}
        >
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 'bold',
            letterSpacing: '-0.02em',
            color: 'var(--foreground)',
            margin: '0 0 1.5rem 0'
          }}>
            About AirThreads
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--muted-foreground)',
            maxWidth: '48rem',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Revolutionizing productivity through intelligent task management and seamless integrations
          </p>
        </motion.div>

        {/* Our Story Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginBottom: '6rem'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2rem)',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'var(--foreground)'
          }}>Our Story</h2>
          <div className="glass-panel" style={{
            padding: 'clamp(2rem, 4vw, 3rem)',
            borderRadius: '1.5rem',
            background: 'rgba(var(--primary-rgb, 99, 91, 255), 0.05)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <p style={{
              fontSize: '1.0625rem',
              lineHeight: 1.8,
              color: 'var(--muted-foreground)',
              fontWeight: '300',
              margin: 0
            }}>
              AirThreads was founded in 2025 with a simple yet powerful vision: to transform how people engage with their productivity tools. As an engineer balancing work, multiple projects, and self-care, I naturally gravitated toward apps to manage my routines—Calendar for event planning, Gmail for business communications, and Notion for note-taking and thought dumps.
            </p>
            <p style={{
              fontSize: '1.0625rem',
              lineHeight: 1.8,
              color: 'var(--muted-foreground)',
              fontWeight: '300',
              margin: 0
            }}>
              However, in a world with countless productivity tools, I found myself spread thin across different platforms. Notes scattered between iPhone Notes and Notion, duplicate calendar entries across Google Calendar and my phone—it became overwhelming. The most frustrating part? These apps had zero cross-sync capabilities, and interacting with them required constant manual effort.
            </p>
            <p style={{
              fontSize: '1.0625rem',
              lineHeight: 1.8,
              color: 'var(--muted-foreground)',
              fontWeight: '300',
              margin: 0
            }}>
              In our increasingly competitive world, I needed a way to use my platforms asynchronously and share data between them seamlessly. Imagine sifting through Gmail for job opportunities and instantly blocking calendar time to prepare, while the postings are saved to Notion for later review. Or creating a to-do list and allocating calendar blocks with a single sentence.
            </p>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '6rem'
        }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: '0.75rem',
              borderLeft: '4px solid var(--primary)',
              border: '1px solid var(--border)',
              borderLeftWidth: '4px',
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(var(--primary-rgb, 99, 91, 255), 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>🎯</div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--foreground)',
              marginBottom: '0.75rem',
              margin: '0 0 0.75rem 0'
            }}>My Mission</h3>
            <p style={{
              color: 'var(--muted-foreground)',
              lineHeight: 1.6,
              margin: 0
            }}>
              To empower individuals with AI-driven task management that eliminates friction, reduces cognitive load, and amplifies human potential. I believe technology should work for you, not against you.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{
              padding: '2rem',
              borderLeft: '4px solid var(--accent)',
              border: '1px solid var(--border)',
              borderLeftWidth: '4px',
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              borderRadius: '0.75rem'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 100, 50, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>🚀</div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--foreground)',
              marginBottom: '0.75rem',
              margin: '0 0 0.75rem 0'
            }}>My Vision</h3>
            <p style={{
              color: 'var(--muted-foreground)',
              lineHeight: 1.6,
              margin: 0
            }}>
              To become the operating system for personal productivity—a unified AI assistant that understands your workflows, anticipates your needs, and seamlessly orchestrates your digital tools.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginBottom: '6rem'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2rem)',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'var(--foreground)'
          }}>Our Core Values</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { icon: '🔒', title: 'Privacy First', desc: 'Your data is yours. We implement enterprise-grade encryption and never train models on your information.' },
              { icon: '⚡', title: 'Efficiency', desc: 'Every feature is designed to save you time and eliminate unnecessary friction in your workflow.' },
              { icon: '💡', title: 'Innovation', desc: 'We continuously push boundaries to bring cutting-edge AI capabilities to productivity tools.' },
              { icon: '❤️', title: 'User-Centric', desc: 'Every decision is guided by user feedback and a deep understanding of real productivity challenges.' }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(var(--primary-rgb, 99, 91, 255), 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '0.5rem',
                    background: 'rgba(var(--primary-rgb, 99, 91, 255), 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    {value.icon}
                  </div>
                  <h3 style={{
                    fontWeight: 'bold',
                    color: 'var(--foreground)',
                    fontSize: '1rem',
                    margin: 0
                  }}>{value.title}</h3>
                </div>
                <p style={{
                  color: 'var(--muted-foreground)',
                  lineHeight: 1.5,
                  fontSize: '0.9375rem',
                  margin: 0
                }}>
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Get in Touch */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel"
          style={{
            textAlign: 'center',
            padding: '3rem',
            borderRadius: '1.5rem',
            border: '1px solid var(--border)',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: 'var(--foreground)',
            marginBottom: '1rem',
            margin: '0 0 1rem 0'
          }}>Get in Touch</h2>
          <p style={{
            color: 'var(--muted-foreground)',
            marginBottom: '2rem',
            maxWidth: '40rem',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            I'm always excited to hear from users and potential partners. Whether you have questions, feedback, or collaboration ideas, don't hesitate to reach out.
          </p>
          <a href="mailto:support@airthreads.ai" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--primary)',
            textDecoration: 'none',
            fontSize: '1.125rem',
            fontWeight: '500',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = 'var(--foreground)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = 'var(--primary)';
          }}
          >
            <Mail style={{ width: '20px', height: '20px' }} />
            support@airthreads.ai
          </a>
        </motion.div>
      </main>
    </div>
  );
}
