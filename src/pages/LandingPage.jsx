import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {

  return (
    <div className={styles.landingPage}>
      {/* Floating bubbles */}
      <div className={styles.bubble1}></div>
      <div className={styles.bubble2}></div>
      <div className={styles.bubble3}></div>
      <div className={styles.bubble4}></div>
      <div className={styles.bubble5}></div>
      
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              AirThreads
              <br />
              <span className={styles.heroSubtitle}>AI Assistant</span>
            </h1>

            <div className={styles.heroActions}>
              <Link to="/product" className={styles.primaryCta}>
                Get Started
              </Link>
            </div>
          </div>

          {/* Tilted Floating Glass Cards */}
          <div className={styles.floatingCards}>
            {/* Gmail Card 1 */}
            <div className={`${styles.glassCard} ${styles.card1}`}>
              <div className={styles.cardIcon}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="8" fill="#EA4335"/>
                  <path d="M24 26.5l-12-9v18c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-18l-12 9z" fill="white"/>
                  <path d="M24 26.5l12-9V15c0-1.1-.9-2-2-2H14c-1.1 0-2 .9-2 2v2.5l12 9z" fill="white" opacity="0.8"/>
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Gmail</h3>
                <p className={styles.cardDescription}>Email Management & Automation</p>
              </div>
            </div>

            {/* Calendar Card */}
            <div className={`${styles.glassCard} ${styles.card2}`}>
              <div className={styles.cardIcon}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="8" fill="#4285F4"/>
                  <rect x="12" y="14" width="24" height="22" rx="2" fill="white"/>
                  <rect x="12" y="14" width="24" height="6" rx="2" fill="white"/>
                  <text x="24" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#4285F4">14</text>
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Calendar</h3>
                <p className={styles.cardDescription}>Smart Scheduling</p>
              </div>
            </div>

            {/* Gmail Card 2 */}
            <div className={`${styles.glassCard} ${styles.card3}`}>
              <div className={styles.cardIcon}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="8" fill="#34A853"/>
                  <circle cx="24" cy="24" r="8" fill="white"/>
                  <path d="M24 18v6l4 4" stroke="#34A853" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Gmail</h3>
                <p className={styles.cardDescription}>Compose & Send</p>
              </div>
            </div>

            {/* Integration Card */}
            <div className={`${styles.glassCard} ${styles.card4}`}>
              <div className={styles.cardIcon}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="8" fill="#FBBC04"/>
                  <rect x="14" y="18" width="20" height="14" rx="2" fill="white"/>
                  <circle cx="18" cy="22" r="1.5" fill="#FBBC04"/>
                  <circle cx="24" cy="22" r="1.5" fill="#FBBC04"/>
                  <circle cx="30" cy="22" r="1.5" fill="#FBBC04"/>
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Integrations</h3>
                <p className={styles.cardDescription}>Connect Your Tools</p>
              </div>
            </div>

            {/* AI Card */}
            <div className={`${styles.glassCard} ${styles.card5}`}>
              <div className={styles.cardIcon}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="8" fill="url(#gradient1)"/>
                  <defs>
                    <linearGradient id="gradient1" x1="0" y1="0" x2="48" y2="48">
                      <stop offset="0%" stopColor="#667eea"/>
                      <stop offset="100%" stopColor="#764ba2"/>
                    </linearGradient>
                  </defs>
                  <circle cx="24" cy="20" r="4" fill="white"/>
                  <circle cx="16" cy="28" r="3" fill="white" opacity="0.8"/>
                  <circle cx="32" cy="28" r="3" fill="white" opacity="0.8"/>
                  <path d="M24 24l-8 4m8-4l8 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>AI Assistant</h3>
                <p className={styles.cardDescription}>Smart Automation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Everything You Need</h2>
            <p className={styles.sectionSubtitle}>
              Powerful features to streamline your productivity
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Natural Language</h3>
              <p className={styles.featureDescription}>
                Chat naturally with your AI assistant to manage tasks and emails
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
                Instant updates across all your integrated services
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Secure & Private</h3>
              <p className={styles.featureDescription}>
                Enterprise-grade security with full data encryption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Workflow?</h2>
            <p className={styles.ctaSubtitle}>
              Join professionals using AirThreads to boost productivity
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
