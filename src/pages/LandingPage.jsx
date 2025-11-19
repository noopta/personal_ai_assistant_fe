import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {

  return (
    <div className={styles.landingPage}>
      {/* Glassmorphic floating elements */}
      <div className={styles.floatingShape1}></div>
      <div className={styles.floatingShape2}></div>
      <div className={styles.floatingShape3}></div>
      
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              AI-Powered
              <br />
              Productivity
              <br />
              Assistant
            </h1>

            <p className={styles.heroSubtitle}>
              Intelligent task management and seamless integrations for Gmail and Calendar
            </p>

            <div className={styles.heroActions}>
              <Link to="/product" className={styles.primaryCta}>
                Get Started
              </Link>
              <Link to="/integrations" className={styles.secondaryCta}>
                View Integrations
              </Link>
            </div>
          </div>

          {/* Glassmorphic feature preview cards */}
          <div className={styles.previewCards}>
            <div className={`${styles.glassCard} ${styles.card1}`}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>AI Automation</h3>
              <p className={styles.cardDescription}>
                Smart task management that adapts to your workflow
              </p>
            </div>

            <div className={`${styles.glassCard} ${styles.card2}`}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Unified Calendar</h3>
              <p className={styles.cardDescription}>
                Seamless Google Calendar integration
              </p>
            </div>

            <div className={`${styles.glassCard} ${styles.card3}`}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Email Management</h3>
              <p className={styles.cardDescription}>
                Effortless Gmail integration and control
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Powerful Features</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to streamline your productivity
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Natural Language</h3>
              <p className={styles.featureDescription}>
                Interact using conversational commands, no complex interfaces needed.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Privacy First</h3>
              <p className={styles.featureDescription}>
                Enterprise-grade encryption and privacy controls keep your data secure.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Real-Time Sync</h3>
              <p className={styles.featureDescription}>
                Instant updates across all your devices and integrated services.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Smart Insights</h3>
              <p className={styles.featureDescription}>
                AI-powered analytics help you understand and optimize your workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Ready to boost your productivity?</h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of professionals streamlining their workflow with AirThreads
            </p>
            <Link to="/product" className={styles.ctaButton}>
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
