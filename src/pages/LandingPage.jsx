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
            <div className={styles.betaBadge}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className={styles.betaIcon}>
                <path d="M8 1L9.5 5.5L14 7L9.5 8.5L8 13L6.5 8.5L2 7L6.5 5.5L8 1Z" fill="currentColor"/>
                <path d="M12 3L12.5 4.5L14 5L12.5 5.5L12 7L11.5 5.5L10 5L11.5 4.5L12 3Z" fill="currentColor"/>
              </svg>
              <span>NOW IN PUBLIC BETA</span>
            </div>
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

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4L6 10v12l10 6 10-6V10L16 4z" stroke="var(--accent-primary)" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M6 10l10 6 10-6M16 16v12" stroke="var(--accent-primary)" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Airbnb <span className={styles.comingSoonBadge}>Coming Soon</span></h3>
              <p>Manage your listings, respond to guests, and track bookings through intelligent AI assistance.</p>
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

      <section 
        className={styles.security}
        id="security"
        ref={el => sectionRefs.current.security = el}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.securityBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>ENTERPRISE-GRADE SECURITY</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Your data privacy is our priority
            </h2>
            <p className={styles.sectionSubtitle}>
              We understand you're trusting us with sensitive emails and calendar data. That's why we've built AirThreads with industry-leading security standards and compliance frameworks.
            </p>
          </div>

          <div className={`${styles.securityGrid} ${isVisible.security ? styles.fadeInUp : ''}`}>
            <div className={styles.securityCard}>
              <div className={styles.securityIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke="var(--accent-primary)" strokeWidth="2"/>
                  <path d="M9 12l2 2 4-4" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>OAuth 2.0 Secure Authentication</h3>
              <p>We never see or store your Google password. Authentication happens directly with Google using OAuth 2.0 with PKCE, the industry standard for secure authorization.</p>
            </div>

            <div className={styles.securityCard}>
              <div className={styles.securityIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="var(--accent-primary)" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1" fill="var(--accent-primary)"/>
                </svg>
              </div>
              <h3>AES-256-GCM Encryption</h3>
              <p>All data is encrypted at rest using military-grade AES-256-GCM encryption and in transit with TLS 1.2+. Your tokens are stored with secure file permissions.</p>
            </div>

            <div className={styles.securityCard}>
              <div className={styles.securityIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="var(--accent-primary)" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Minimal Data Retention</h3>
              <p>We don't store your emails or calendar content. Activity logs are automatically deleted after 24 hours to protect your privacy.</p>
            </div>

            <div className={styles.securityCard}>
              <div className={styles.securityIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="var(--accent-primary)" strokeWidth="2"/>
                  <path d="M14 2v6h6M9 15l2 2 4-4" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>GDPR & CCPA Compliant</h3>
              <p>Full compliance with data protection regulations. You have the right to access, export, and delete your data at any time through our privacy controls.</p>
            </div>
          </div>

          <div className={`${styles.complianceSection} ${isVisible.security ? styles.fadeInUp : ''}`}>
            <h3 className={styles.complianceTitle}>Powered by trusted partners</h3>
            <div className={styles.complianceBadges}>
              <div className={styles.badgeWrapper}>
                <a href="https://trust.openai.com/" target="_blank" rel="noopener noreferrer" className={styles.complianceBadge}>
                  <div className={styles.badgeIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className={styles.badgeContent}>
                    <span className={styles.badgeName}>OpenAI</span>
                    <span className={styles.badgeDesc}>SOC 2 Type II Certified</span>
                  </div>
                </a>
                <div className={styles.badgeTooltip}>
                  <strong>SOC 2 Type II</strong> is an auditing standard that verifies a company's security controls are properly designed and operating effectively over time. OpenAI has been independently audited to ensure data security, availability, and confidentiality.
                </div>
              </div>

              <div className={styles.badgeWrapper}>
                <a href="https://openai.com/en-GB/policies/row-privacy-policy/" target="_blank" rel="noopener noreferrer" className={styles.complianceBadge}>
                  <div className={styles.badgeIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className={styles.badgeContent}>
                    <span className={styles.badgeName}>Privacy First</span>
                    <span className={styles.badgeDesc}>OpenAI Data Protection</span>
                  </div>
                </a>
                <div className={styles.badgeTooltip}>
                  <strong>OpenAI's Privacy Policy</strong> ensures your data is not used for training AI models. API requests are processed securely and not stored beyond what's needed for the service.
                </div>
              </div>

              <div className={styles.badgeWrapper}>
                <div className={styles.complianceBadge}>
                  <div className={styles.badgeIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles.badgeContent}>
                    <span className={styles.badgeName}>Vapi Voice</span>
                    <span className={styles.badgeDesc}>HIPAA Compliant</span>
                  </div>
                </div>
                <div className={styles.badgeTooltip}>
                  <strong>HIPAA Compliance</strong> means Vapi meets the strict security and privacy requirements for handling protected health information. Voice conversations are processed with healthcare-grade security standards.
                </div>
              </div>

              <div className={styles.badgeWrapper}>
                <div className={styles.complianceBadge}>
                  <div className={styles.badgeIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className={styles.badgeContent}>
                    <span className={styles.badgeName}>Google APIs</span>
                    <span className={styles.badgeDesc}>OAuth 2.0 Verified</span>
                  </div>
                </div>
                <div className={styles.badgeTooltip}>
                  <strong>OAuth 2.0 Verified</strong> means our Google integration has been reviewed by Google. We use secure authentication without ever seeing your password, and you can revoke access anytime.
                </div>
              </div>
            </div>

            <div className={styles.securityNote}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p>We never share, sell, or use your data for training AI models. Your emails and calendar events are processed in real-time and never stored on our servers.</p>
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
