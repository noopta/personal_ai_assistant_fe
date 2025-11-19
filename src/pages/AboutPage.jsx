import styles from './AboutPage.module.css';
import founderPhoto from '../assets/founder-photo.png';
import CyberBackground from '../components/CyberBackground';

function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <CyberBackground />
      
      <div className={styles.scanlineOverlay} />
      <div className={styles.gridOverlay} />
      
      <div className={styles.container}>
        {/* Terminal Hero Header */}
        <section className={styles.hero}>
          <div className={styles.terminalWindow}>
            <div className={styles.terminalBar}>
              <div className={styles.terminalButtons}>
                <span className={styles.terminalButton} style={{background: 'var(--neon-magenta)'}} />
                <span className={styles.terminalButton} style={{background: 'var(--neon-yellow)'}} />
                <span className={styles.terminalButton} style={{background: 'var(--neon-green)'}} />
              </div>
              <span className={styles.terminalTitle}>ABOUT_AIRTHREADS.exe</span>
            </div>
            <div className={styles.terminalContent}>
              <div className={styles.terminalLine}>
                <span className={styles.prompt}>root@airthreads:~$</span>
                <span className={styles.command}>cat ./about.txt</span>
              </div>
              <h1 className={styles.title} data-text="ABOUT AIRTHREADS">
                ABOUT AIRTHREADS
              </h1>
              <p className={styles.heroSubtitle}>
                <span className={styles.cursor}>▶</span> Revolutionizing productivity through intelligent task management and seamless integrations
              </p>
            </div>
          </div>
        </section>

        {/* Company Story - Terminal Style */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} data-text="OUR_STORY">
              <span className={styles.titleIcon}>◆</span> OUR_STORY
            </h2>
            <div className={styles.titleLine} />
          </div>
          
          <div className={styles.terminalBlock}>
            <div className={styles.terminalBlockHeader}>
              <span className={styles.blockPrompt}>{'>'} SYSTEM_NARRATIVE.log</span>
            </div>
            <div className={styles.content}>
              <p className={styles.logEntry}>
                <span className={styles.timestamp}>[2025-01-01]</span> AirThreads was founded in 2025 with a simple yet powerful vision: to transform how people 
                engage with their productivity tools. As an engineer balancing work, multiple projects, and 
                self-care, I naturally gravitated toward apps to manage my routines—Calendar for event 
                planning, Gmail for business communications, and Notion for note-taking and thought dumps.
              </p>
              <p className={styles.logEntry}>
                <span className={styles.timestamp}>[PROBLEM]</span> However, in a world with countless productivity tools, I found myself spread thin across 
                different platforms. Notes scattered between iPhone Notes and Notion, duplicate calendar 
                entries across Google Calendar and my phone—it became overwhelming. The most frustrating 
                part? These apps had zero cross-sync capabilities, and interacting with them required 
                constant manual effort.
              </p>
              <p className={styles.logEntry}>
                <span className={styles.timestamp}>[SOLUTION]</span> In our increasingly competitive world, I needed a way to use my platforms asynchronously 
                and share data between them seamlessly. Imagine sifting through Gmail for job opportunities 
                and instantly blocking calendar time to prepare, while the postings are saved to Notion for 
                later review. Or creating a to-do list and allocating calendar blocks with a single sentence. 
                Picture being on a business trip with an unexpected layover—traditionally, you'd manually 
                email every team member and update your calendar. But what if an app could read that email, 
                notify your team automatically, and find the next available time slots to reschedule your 
                meetings? That's the game changer I envisioned.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision - Cyber Cards */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} data-text="CORE_DIRECTIVES">
              <span className={styles.titleIcon}>◆</span> CORE_DIRECTIVES
            </h2>
            <div className={styles.titleLine} />
          </div>
          
          <div className={styles.directivesGrid}>
            <div className={styles.directiveCard}>
              <div className={styles.cardCorners}>
                <span className={styles.cornerTL} />
                <span className={styles.cornerTR} />
                <span className={styles.cornerBL} />
                <span className={styles.cornerBR} />
              </div>
              <div className={styles.cardGlow} />
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>🎯</div>
                <h3 className={styles.cardTitle}>MISSION</h3>
              </div>
              <div className={styles.cardBody}>
                <p>
                  To empower individuals with AI-driven task management that eliminates friction, 
                  reduces cognitive load, and amplifies human potential. I believe technology should work 
                  for you, not against you.
                </p>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.statusIndicator}>STATUS: ACTIVE</span>
              </div>
            </div>

            <div className={styles.directiveCard}>
              <div className={styles.cardCorners}>
                <span className={styles.cornerTL} />
                <span className={styles.cornerTR} />
                <span className={styles.cornerBL} />
                <span className={styles.cornerBR} />
              </div>
              <div className={styles.cardGlow} />
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>🚀</div>
                <h3 className={styles.cardTitle}>VISION</h3>
              </div>
              <div className={styles.cardBody}>
                <p>
                  A world where everyone can focus on meaningful work while AI handles the routine. I 
                  envision seamless productivity ecosystems that understand context, anticipate needs, 
                  and deliver results effortlessly.
                </p>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.statusIndicator}>STATUS: IN_PROGRESS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Holographic Founder Profile */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} data-text="FOUNDER_PROFILE">
              <span className={styles.titleIcon}>◆</span> FOUNDER_PROFILE
            </h2>
            <div className={styles.titleLine} />
          </div>

          <div className={styles.founderHolo}>
            <div className={styles.holoFrame}>
              <div className={styles.holoCorners}>
                <span className={styles.holoCornerTL} />
                <span className={styles.holoCornerTR} />
                <span className={styles.holoCornerBL} />
                <span className={styles.holoCornerBR} />
              </div>
              
              <div className={styles.holoContent}>
                <div className={styles.photoContainer}>
                  <div className={styles.photoGlow} />
                  <img src={founderPhoto} alt="Anu I." className={styles.founderPhoto} />
                  <div className={styles.photoScanline} />
                </div>
                
                <div className={styles.founderInfo}>
                  <div className={styles.founderHeader}>
                    <h3 className={styles.founderName}>ANU_I.</h3>
                    <span className={styles.founderRole}>{'// FOUNDER & ENGINEER'}</span>
                  </div>
                  
                  <div className={styles.founderBio}>
                    <p className={styles.bioLine}>
                      <span className={styles.bioBullet}>{'>'}</span> Software engineer with a passion for building AI-powered productivity solutions.
                    </p>
                    <p className={styles.bioLine}>
                      <span className={styles.bioBullet}>{'>'}</span> Experience in full-stack development and system architecture.
                    </p>
                    <p className={styles.bioLine}>
                      <span className={styles.bioBullet}>{'>'}</span> Focus on creating seamless user experiences that solve real workflow challenges.
                    </p>
                    <p className={styles.bioLine}>
                      <span className={styles.bioBullet}>{'>'}</span> Based in Toronto, Canada.
                    </p>
                    <p className={styles.bioLine}>
                      <span className={styles.bioBullet}>{'>'}</span> Built AirThreads to bridge the gap between fragmented productivity tools.
                    </p>
                  </div>
                  
                  <div className={styles.founderNote}>
                    <span className={styles.noteIcon}>※</span>
                    <p>And yes, that is a film photo of me holding a Modelo in a random Mexican spot on Mission Street, 
                    because I barely have any photos of myself, let alone any formal pictures.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values - Cyber Grid */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} data-text="CORE_VALUES">
              <span className={styles.titleIcon}>◆</span> CORE_VALUES
            </h2>
            <div className={styles.titleLine} />
          </div>

          <div className={styles.valuesGrid}>
            {[
              { icon: '🔒', title: 'PRIVACY_FIRST', text: 'Your data belongs to you. AirThreads implements enterprise-grade security measures and transparent privacy practices to protect your information at every step.' },
              { icon: '🌟', title: 'USER_CENTRIC', text: 'Every feature starts with understanding real user needs. AirThreads prioritizes intuitive experiences and meaningful functionality over flashy features.' },
              { icon: '⚡', title: 'INNOVATION', text: 'Technology evolves rapidly, and so does AirThreads. I\'m committed to staying at the forefront of AI and productivity tools to deliver cutting-edge solutions.' },
              { icon: '🤝', title: 'EMPOWERMENT', text: 'Great products solve real problems. AirThreads is built to empower users with tools that integrate seamlessly into their workflows and adapt to their unique needs.' }
            ].map((value, index) => (
              <div key={index} className={styles.valueChip}>
                <div className={styles.chipGlow} />
                <div className={styles.chipIcon}>{value.icon}</div>
                <h4 className={styles.chipTitle}>{value.title}</h4>
                <p className={styles.chipText}>{value.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} data-text="TECH_STACK">
              <span className={styles.titleIcon}>◆</span> TECH_STACK
            </h2>
            <div className={styles.titleLine} />
          </div>

          <div className={styles.techContainer}>
            <p className={styles.techIntro}>
              AirThreads is built on a cutting-edge technology stack designed for scalability, 
              security, and performance. The platform leverages advanced natural language processing, 
              machine learning algorithms, and robust API integrations to deliver seamless experiences.
            </p>

            <div className={styles.techGrid}>
              {[
                { label: 'AI_INTELLIGENCE', text: 'Advanced language models for understanding context and intent in natural language commands.' },
                { label: 'SECURE_INTEGRATION', text: 'OAuth 2.0 and enterprise-grade security for all third-party service connections.' },
                { label: 'REALTIME_PROCESSING', text: 'Low-latency response system for immediate task execution and feedback.' },
                { label: 'SCALABLE_ARCH', text: 'Cloud-native infrastructure that grows with your needs and usage patterns.' }
              ].map((tech, index) => (
                <div key={index} className={styles.techItem}>
                  <div className={styles.techLabel}>{tech.label}</div>
                  <div className={styles.techText}>{tech.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <div className={styles.contactTerminal}>
            <div className={styles.contactHeader}>
              <span className={styles.contactPrompt}>{'>'} INITIATE_CONTACT.sh</span>
            </div>
            <div className={styles.contactBody}>
              <h3 className={styles.contactTitle}>GET_IN_TOUCH</h3>
              <p className={styles.contactText}>
                I'm always excited to hear from users and potential partners. Whether you have 
                questions, feedback, or collaboration ideas, don't hesitate to reach out.
              </p>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>EMAIL:</span>
                  <a href="mailto:support@airthreads.ai" className={styles.contactLink}>
                    support@airthreads.ai
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
