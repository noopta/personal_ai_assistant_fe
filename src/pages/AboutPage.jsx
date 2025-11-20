import { motion } from "framer-motion";
import { Target, Rocket, Lock, Star, Zap, HandHeart } from "lucide-react";
import founderPhoto from '../assets/founder-photo.png';

function AboutPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--background)',
      color: 'var(--foreground)',
      paddingTop: '120px',
      paddingBottom: '96px'
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            marginBottom: '96px'
          }}
        >
          <div style={{
            width: '100px',
            height: '3px',
            background: 'var(--primary)',
            marginBottom: '32px',
            opacity: 0.8
          }}></div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '300',
            marginBottom: '16px',
            letterSpacing: '-0.03em',
            color: 'var(--foreground)',
            lineHeight: 1.1
          }}>About AirThreads</h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--muted-foreground)',
            lineHeight: 1.6,
            fontWeight: '300',
            maxWidth: '700px'
          }}>
            Revolutionizing productivity through intelligent task management and seamless integrations
          </p>
        </motion.section>

        {/* Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '96px' }}
        >
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '400',
            marginBottom: '32px',
            color: 'var(--foreground)',
            letterSpacing: '-0.01em',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border)'
          }}>Our Story</h2>
          <div className="glass-panel" style={{
            background: 'color-mix(in srgb, var(--background) 50%, transparent)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid color-mix(in srgb, var(--foreground) 8%, transparent)',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <p style={{
              fontSize: '1.0625rem',
              lineHeight: 1.8,
              color: 'var(--muted-foreground)',
              fontWeight: '300',
              margin: 0
            }}>
              AirThreads was founded in 2025 with a simple yet powerful vision: to transform how people 
              engage with their productivity tools. As an engineer balancing work, multiple projects, and 
              self-care, I naturally gravitated toward apps to manage my routines—Calendar for event 
              planning, Gmail for business communications, and Notion for note-taking and thought dumps.
            </p>
            <p style={{
              fontSize: '1.0625rem',
              lineHeight: 1.8,
              color: 'var(--muted-foreground)',
              fontWeight: '300',
              margin: 0
            }}>
              However, in a world with countless productivity tools, I found myself spread thin across 
              different platforms. Notes scattered between iPhone Notes and Notion, duplicate calendar 
              entries across Google Calendar and my phone—it became overwhelming. The most frustrating 
              part? These apps had zero cross-sync capabilities, and interacting with them required 
              constant manual effort.
            </p>
            <p style={{
              fontSize: '1.0625rem',
              lineHeight: 1.8,
              color: 'var(--muted-foreground)',
              fontWeight: '300',
              margin: 0
            }}>
              In our increasingly competitive world, I needed a way to use my platforms asynchronously 
              and share data between them seamlessly. Imagine sifting through Gmail for job opportunities 
              and instantly blocking calendar time to prepare, while the postings are saved to Notion for 
              later review. Or creating a to-do list and allocating calendar blocks with a single sentence. 
              Picture being on a business trip with an unexpected layover—traditionally, you'd manually 
              email every team member and update your calendar. But what if an app could read that email, 
              notify your team automatically, and find the next available time slots to reschedule your 
              meetings? That's the game changer I envisioned.
            </p>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '96px' }}
        >
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '400',
            marginBottom: '32px',
            color: 'var(--foreground)',
            letterSpacing: '-0.01em',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border)'
          }}>Mission & Vision</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '24px'
          }} className="mission-vision-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card mission-card"
              style={{
                background: 'color-mix(in srgb, var(--background) 50%, transparent)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid color-mix(in srgb, var(--foreground) 8%, transparent)',
                borderRadius: '16px',
                padding: '32px',
                transition: 'all 0.3s',
                cursor: 'default'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                transition: 'all 0.3s'
              }} className="card-icon-container">
                <Target style={{ width: '24px', height: '24px', color: 'var(--foreground)' }} />
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '500',
                marginBottom: '12px',
                color: 'var(--foreground)'
              }}>Mission</h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--muted-foreground)',
                fontWeight: '300',
                margin: 0
              }}>
                To empower individuals with AI-driven task management that eliminates friction, 
                reduces cognitive load, and amplifies human potential. I believe technology should work 
                for you, not against you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card vision-card"
              style={{
                background: 'color-mix(in srgb, var(--background) 50%, transparent)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid color-mix(in srgb, var(--foreground) 8%, transparent)',
                borderRadius: '16px',
                padding: '32px',
                transition: 'all 0.3s',
                cursor: 'default'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                transition: 'all 0.3s'
              }} className="card-icon-container">
                <Rocket style={{ width: '24px', height: '24px', color: 'var(--foreground)' }} />
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '500',
                marginBottom: '12px',
                color: 'var(--foreground)'
              }}>Vision</h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--muted-foreground)',
                fontWeight: '300',
                margin: 0
              }}>
                A world where everyone can focus on meaningful work while AI handles the routine. I 
                envision seamless productivity ecosystems that understand context, anticipate needs, 
                and deliver results effortlessly.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Founder Profile */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '96px' }}
        >
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '400',
            marginBottom: '32px',
            color: 'var(--foreground)',
            letterSpacing: '-0.01em',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border)'
          }}>Founder</h2>
          <div className="glass-panel founder-profile" style={{
            background: 'color-mix(in srgb, var(--background) 50%, transparent)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid color-mix(in srgb, var(--foreground) 8%, transparent)',
            borderRadius: '16px',
            padding: '32px',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px',
            alignItems: 'start'
          }}>
            <div style={{ position: 'relative' }} className="photo-container">
              <img 
                src={founderPhoto} 
                alt="Anu I." 
                style={{
                  width: '100%',
                  maxWidth: '250px',
                  height: 'auto',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  objectFit: 'cover',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '500',
                color: 'var(--foreground)',
                margin: 0,
                letterSpacing: '-0.01em'
              }}>Anu I.</h3>
              <span style={{
                fontSize: '0.9375rem',
                color: 'var(--muted-foreground)',
                fontWeight: '400'
              }}>Founder & Engineer</span>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginTop: '16px'
              }}>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-foreground)',
                  margin: 0,
                  paddingLeft: '16px',
                  borderLeft: '2px solid var(--border)'
                }}>Software engineer with a passion for building AI-powered productivity solutions.</p>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-foreground)',
                  margin: 0,
                  paddingLeft: '16px',
                  borderLeft: '2px solid var(--border)'
                }}>Experience in full-stack development and system architecture.</p>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-foreground)',
                  margin: 0,
                  paddingLeft: '16px',
                  borderLeft: '2px solid var(--border)'
                }}>Focus on creating seamless user experiences that solve real workflow challenges.</p>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-foreground)',
                  margin: 0,
                  paddingLeft: '16px',
                  borderLeft: '2px solid var(--border)'
                }}>Based in Toronto, Canada.</p>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-foreground)',
                  margin: 0,
                  paddingLeft: '16px',
                  borderLeft: '2px solid var(--border)'
                }}>Built AirThreads to bridge the gap between fragmented productivity tools.</p>
              </div>
              
              <div style={{
                background: 'color-mix(in srgb, var(--muted) 50%, transparent)',
                border: '1px solid var(--border)',
                padding: '16px',
                marginTop: '16px',
                borderRadius: '8px'
              }}>
                <p style={{
                  fontSize: '0.9375rem',
                  fontStyle: 'italic',
                  color: 'var(--muted-foreground)',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  And yes, that is a film photo of me holding a Modelo in a random Mexican spot on Mission Street, 
                  because I barely have any photos of myself, let alone any formal pictures.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Core Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '96px' }}
        >
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '400',
            marginBottom: '32px',
            color: 'var(--foreground)',
            letterSpacing: '-0.01em',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border)'
          }}>Core Values</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '20px'
          }} className="values-grid">
            {[
              { icon: Lock, title: 'Privacy First', text: 'Your data belongs to you. AirThreads implements enterprise-grade security measures and transparent privacy practices to protect your information at every step.' },
              { icon: Star, title: 'User Centric', text: 'Every feature starts with understanding real user needs. AirThreads prioritizes intuitive experiences and meaningful functionality over flashy features.' },
              { icon: Zap, title: 'Innovation', text: "Technology evolves rapidly, and so does AirThreads. I'm committed to staying at the forefront of AI and productivity tools to deliver cutting-edge solutions." },
              { icon: HandHeart, title: 'Empowerment', text: "Great products solve real problems. AirThreads is built to empower users with tools that integrate seamlessly into their workflows and adapt to their unique needs." }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card value-card"
                style={{
                  background: 'color-mix(in srgb, var(--background) 50%, transparent)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid color-mix(in srgb, var(--foreground) 8%, transparent)',
                  borderRadius: '12px',
                  padding: '24px',
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
                }} className="value-icon-container">
                  <value.icon style={{ width: '20px', height: '20px', color: 'var(--foreground)', transition: 'all 0.3s' }} />
                </div>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  marginBottom: '8px',
                  color: 'var(--foreground)'
                }}>{value.title}</h4>
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: 'var(--muted-foreground)',
                  fontWeight: '300',
                  margin: 0
                }}>{value.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            paddingTop: '64px',
            marginTop: '64px',
            borderTop: '1px solid var(--border)'
          }}
        >
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '400',
            marginBottom: '24px',
            color: 'var(--foreground)',
            letterSpacing: '-0.01em'
          }}>Get in Touch</h2>
          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.7,
            color: 'var(--muted-foreground)',
            margin: '24px auto',
            fontWeight: '300',
            maxWidth: '600px'
          }}>
            I'm always excited to hear from users and potential partners. Whether you have 
            questions, feedback, or collaboration ideas, don't hesitate to reach out.
          </p>
          <a 
            href="mailto:support@airthreads.ai" 
            className="contact-link"
            style={{
              fontSize: '1.125rem',
              color: 'var(--primary)',
              textDecoration: 'none',
              fontWeight: '500',
              borderBottom: '2px solid transparent',
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
          >
            support@airthreads.ai
          </a>
        </motion.section>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mission-vision-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .founder-profile {
            grid-template-columns: 250px 1fr !important;
          }
          .photo-container img {
            margin: 0 !important;
          }
        }
        
        .glass-card:hover {
          background: color-mix(in srgb, var(--background) 70%, transparent) !important;
          border-color: color-mix(in srgb, var(--foreground) 15%, transparent) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .glass-card:hover .card-icon-container {
          background: color-mix(in srgb, var(--primary) 20%, transparent) !important;
        }
        
        .glass-card:hover .card-icon-container svg {
          color: var(--primary) !important;
        }
        
        .value-card:hover .value-icon-container {
          background: color-mix(in srgb, var(--primary) 20%, transparent) !important;
        }
        
        .value-card:hover .value-icon-container svg {
          color: var(--primary) !important;
        }
        
        .contact-link:hover {
          border-bottom-color: var(--primary) !important;
        }
        
        .dark .glass-panel,
        .dark .glass-card {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37) !important;
        }
      `}</style>
    </div>
  );
}

export default AboutPage;
