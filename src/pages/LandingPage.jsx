import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styles from './LandingPage.module.css';

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
      <section className={styles.hero} id="hero" ref={el => sectionRefs.current.hero = el}>
        <div className={styles.container}>
          <div className={`${styles.heroContent} ${isVisible.hero ? styles.fadeInUp : ''}`}>
            <h1 className={styles.heroTitle}>
              Financial infrastructure<br/>
              to grow <span className={styles.highlight}>your productivity</span>
            </h1>
            <p className={styles.heroDescription}>
              Join thousands of users managing Gmail, Google Calendar, and Notion through intelligent AI assistance. 
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
            <div className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Today</div>
                <div className={styles.cardBadge}>Live</div>
              </div>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Tasks completed</div>
                  <div className={styles.statValue}>23 <span className={styles.statChange}>+18%</span></div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Emails processed</div>
                  <div className={styles.statValue}>156 <span className={styles.statChange}>+24%</span></div>
                </div>
              </div>
              <div className={styles.chartPlaceholder}>
                <svg viewBox="0 0 200 80" className={styles.chart}>
                  <path d="M 0 60 Q 50 40, 100 45 T 200 30" stroke="var(--accent-primary)" strokeWidth="2" fill="none"/>
                  <path d="M 0 60 Q 50 40, 100 45 T 200 30 L 200 80 L 0 80 Z" fill="url(#gradient)" opacity="0.2"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
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
            <h2 className={styles.sectionTitle}>Unified platform for your productivity</h2>
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
              <h3>Notion</h3>
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
                Lucius AI helps you focus on what matters most by automating repetitive tasks and 
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
                      <div className={styles.taskTitle}>Created Notion documentation</div>
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
            <p>Get started with Lucius AI today and experience the future of productivity management.</p>
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
