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
        padding: '1.5rem 1rem clamp(2rem, 4vw, 3rem)',
        maxWidth: '64rem',
        margin: '0 auto'
      }}>
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginBottom: '3rem'
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            marginBottom: '4rem'
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
          marginBottom: '4rem'
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(0, 0, 0, 0.3)',
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-panel"
            style={{
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(0, 0, 0, 0.3)',
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            marginBottom: '4rem'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2rem)',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'var(--foreground)'
          }}>Core Values</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            maxWidth: '56rem',
            margin: '0 auto'
          }}>
            {[
              { icon: '🔒', title: 'Privacy First', desc: 'Your data is yours. We implement enterprise-grade encryption and never train models on your information.' },
              { icon: '👤', title: 'User-Centric Design', desc: 'Every feature starts with understanding real user needs. We prioritize intuitive experiences over flashy features.' },
              { icon: '⚡', title: 'Continuous Innovation', desc: 'Technology evolves rapidly. We\'re committed to staying at the forefront of AI and productivity tools.' },
              { icon: '❤️', title: 'User Empowerment', desc: 'Every decision is guided by user feedback and a deep understanding of real productivity challenges.' }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '0.5rem',
                    background: 'rgba(var(--primary-rgb, 99, 91, 255), 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    {value.icon}
                  </div>
                  <h3 style={{
                    fontWeight: 'bold',
                    color: 'var(--foreground)',
                    fontSize: '1.0625rem',
                    margin: 0,
                    paddingTop: '0.5rem'
                  }}>{value.title}</h3>
                </div>
                <p style={{
                  color: 'var(--muted-foreground)',
                  lineHeight: 1.6,
                  fontSize: '0.875rem',
                  margin: 0,
                  paddingLeft: '0rem'
                }}>
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Anu L. Profile Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="glass-panel"
          style={{
            padding: '2.5rem',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(20px)',
            marginBottom: '4rem'
          }}
        >
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-start',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(100, 100, 100, 0.3)',
              flexShrink: 0,
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}>
              {/* Placeholder for profile image */}
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                color: 'var(--muted-foreground)'
              }}>👤</div>
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: 'var(--foreground)'
              }}>Anu L.</h3>
              <p style={{
                color: 'var(--muted-foreground)',
                lineHeight: 1.7,
                marginBottom: '1rem',
                fontSize: '0.9375rem'
              }}>
                I'm a software engineer with a passion for building AI-powered productivity solutions. With experience in full-stack development and system architecture, I focus on creating seamless user experiences that solve real workflow challenges.
              </p>
              <p style={{
                color: 'var(--muted-foreground)',
                lineHeight: 1.7,
                fontSize: '0.875rem',
                fontStyle: 'italic'
              }}>
                Founder & Creator of AirThreads — on a mission to transform how people engage with their productivity tools in a Canadian tech space.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Get in Touch */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="glass-panel"
          style={{
            textAlign: 'center',
            padding: '2.5rem',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(0, 0, 0, 0.3)',
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
