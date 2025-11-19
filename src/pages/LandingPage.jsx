import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styles from './LandingPage.module.css';
import SpaceBackground from '../components/SpaceBackground';

function LandingPage() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    // Set hero as visible immediately since it's above the fold
    setIsVisible({ hero: true });

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const companies = [
    'OpenAI', 'Amazon', 'Google', 'Anthropic', 'Shopify', 'Airbnb',
    'OpenAI', 'Amazon', 'Google', 'Anthropic', 'Shopify', 'Airbnb'
  ];

  return (
    <div className={styles.landingPage}>
      <SpaceBackground />
      <section className={styles.hero} id="hero" ref={el => sectionRefs.current.hero = el}>
        <div className={styles.container}>
          <div className={`${styles.heroContent} ${isVisible.hero ? styles.fadeInUp : ''}`}>
            <h1 className={styles.heroTitle}>
              AI-powered assistant<br/>
              to grow <span className={styles.highlight}>your productivity</span>
            </h1>
            <p className={styles.heroDescription}>
              Join thousands of users managing Gmail and Google Calendar through intelligent AI assistance. 
              Streamline your workflow, automate repetitive tasks, and build a more productive day.
            </p>
            <div className={styles.heroActions}>
              <Link to="/product" className={styles.primaryCta}>
                <span>Start now</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/integrations" className={styles.secondaryCta}>
                View integrations
              </Link>
            </div>
          </div>
          <div className={`${styles.heroVisual} ${isVisible.hero ? styles.fadeInUp : ''}`}>
            <div className={styles.floatingCards}>
              <div className={`${styles.integrationCard} ${styles.gmailCard}`}>
                <div className={styles.cardIcon}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" rx="12" fill="url(#gmailGradient)"/>
                    <path d="M12 16L24 25L36 16V14L24 23L12 14V16Z" fill="white"/>
                    <path d="M36 14H12C10.9 14 10 14.9 10 16V32C10 33.1 10.9 34 12 34H36C37.1 34 38 33.1 38 32V16C38 14.9 37.1 14 36 14Z" fill="white" fillOpacity="0.9"/>
                    <defs>
                      <linearGradient id="gmailGradient" x1="0" y1="0" x2="48" y2="48">
                        <stop stopColor="#EA4335"/>
                        <stop offset="1" stopColor="#C5221F"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>Gmail</h3>
                  <p className={styles.cardSubtitle}>Integrations</p>
                </div>
              </div>
              
              <div className={`${styles.integrationCard} ${styles.calendarCard}`}>
                <div className={styles.cardIcon}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" rx="12" fill="url(#calendarGradient)"/>
                    <rect x="14" y="16" width="20" height="18" rx="2" fill="white" fillOpacity="0.9"/>
                    <path d="M18 14V18M30 14V18M14 22H34M16 26H20M16 30H20M24 26H28M24 30H28" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="calendarGradient" x1="0" y1="0" x2="48" y2="48">
                        <stop stopColor="#4285F4"/>
                        <stop offset="1" stopColor="#1A73E8"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>Calendar</h3>
                  <p className={styles.cardSubtitle}>Integrations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.logosSection}>
        <div className={styles.container}>
          <p className={styles.logosTitle}>Trusted by innovative companies</p>
          <div className={styles.logosContainer}>
            <div className={styles.logosTrack}>
              {companies.map((company, index) => (
                <div key={index} className={styles.logoItem}>{company}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section 
        className={styles.features} 
        id="features" 
        ref={el => sectionRefs.current.features = el}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Unified platform for your productivity
            </h2>
            <p className={styles.sectionSubtitle}>
              Handle all of your task management needs, manage workflows, and automate processes with AI-powered assistance.
            </p>
          </div>
          
          <div className={`${styles.featuresGrid} ${isVisible.features ? styles.fadeInUp : ''}`}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M4 8h24M4 16h24M4 24h16" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Gmail</h3>
              <p>Manage your emails, send messages, and organize your inbox with AI assistance. Never miss an important email again.</p>
              <Link to="/integrations" className={styles.featureLink}>
                Learn more →
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="6" width="24" height="20" rx="2" stroke="var(--accent-primary)" strokeWidth="2"/>
                  <path d="M4 12h24" stroke="var(--accent-primary)" strokeWidth="2"/>
                  <circle cx="10" cy="18" r="1.5" fill="var(--accent-primary)"/>
                  <circle cx="16" cy="18" r="1.5" fill="var(--accent-primary)"/>
                </svg>
              </div>
              <h3>Calendar</h3>
              <p>Schedule meetings, set reminders, and manage your calendar seamlessly through natural language commands.</p>
              <Link to="/integrations" className={styles.featureLink}>
                Learn more →
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M8 4h16a2 2 0 012 2v20a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="var(--accent-primary)" strokeWidth="2"/>
                  <path d="M11 11h10M11 17h10M11 23h6" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Notion <span className={styles.comingSoonBadge}>Coming Soon</span></h3>
              <p>Create notes, manage projects, and organize your knowledge base directly from our chat interface.</p>
              <Link to="/integrations" className={styles.featureLink}>
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section 
        className={styles.benefits}
        id="benefits"
        ref={el => sectionRefs.current.benefits = el}
      >
        <div className={styles.container}>
          <div className={styles.benefitsLayout}>
            <div className={`${styles.benefitsContent} ${isVisible.benefits ? styles.fadeInUp : ''}`}>
              <h2 className={styles.sectionTitle}>Built for productivity</h2>
              <p className={styles.benefitsDescription}>
                AirThreads helps you focus on what matters most by automating repetitive tasks and 
                providing intelligent assistance across all your productivity tools.
              </p>
              
              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10l3 3 7-7" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>AI-powered automation</h4>
                    <p>Smart assistance that learns and adapts to your workflow</p>
                  </div>
                </div>

                <div className={styles.benefitItem}>
                  <div className={styles.benefitIconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10l3 3 7-7" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Seamless integrations</h4>
                    <p>Works with your existing tools without disruption</p>
                  </div>
                </div>

                <div className={styles.benefitItem}>
                  <div className={styles.benefitIconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10l3 3 7-7" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Enterprise-grade security</h4>
                    <p>Your data is protected with industry-leading encryption</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.benefitsVisual} ${isVisible.benefits ? styles.fadeInUp : ''}`}>
              <div className={styles.benefitsCard}>
                <div className={styles.taskPreview}>
                  <div className={styles.taskHeader}>Recent Activity</div>
                  <div className={styles.taskItem}>
                    <div className={styles.taskIcon}>✓</div>
                    <div className={styles.taskContent}>
                      <div className={styles.taskTitle}>Scheduled team meeting</div>
                      <div className={styles.taskTime}>2 minutes ago</div>
                    </div>
                  </div>
                  <div className={styles.taskItem}>
                    <div className={styles.taskIcon}>✓</div>
                    <div className={styles.taskContent}>
                      <div className={styles.taskTitle}>Sent project update email</div>
                      <div className={styles.taskTime}>5 minutes ago</div>
                    </div>
                  </div>
                  <div className={styles.taskItem}>
                    <div className={styles.taskIcon}>✓</div>
                    <div className={styles.taskContent}>
                      <div className={styles.taskTitle}>Organized calendar events</div>
                      <div className={styles.taskTime}>12 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to transform your workflow?</h2>
            <p>Get started with AirThreads today and experience the future of productivity management.</p>
            <Link to="/product" className={styles.ctaButton}>
              <span>Get started</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
