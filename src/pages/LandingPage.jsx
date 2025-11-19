import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {

  return (
    <div className={styles.landingPage}>
      {/* Minimal geometric background elements */}
      <div className={styles.geometricLine1}></div>
      <div className={styles.geometricLine2}></div>
      
      <section className={styles.hero}>
        <div className={styles.container}>
          {/* Accent line */}
          <div className={styles.accentLine}></div>
          
          <h1 className={styles.heroTitle}>
            AI-Powered
            <br />
            Productivity
            <br />
            Interface
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
      </section>

      {/* Features Grid */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>01</div>
              <h3 className={styles.featureTitle}>Intelligent Automation</h3>
              <p className={styles.featureDescription}>
                AI-driven task management that learns from your workflow and adapts to your needs.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>02</div>
              <h3 className={styles.featureTitle}>Seamless Integration</h3>
              <p className={styles.featureDescription}>
                Connect Gmail and Calendar effortlessly for unified productivity management.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>03</div>
              <h3 className={styles.featureTitle}>Natural Language</h3>
              <p className={styles.featureDescription}>
                Interact with your tools using conversational commands, no complex interfaces.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>04</div>
              <h3 className={styles.featureTitle}>Privacy First</h3>
              <p className={styles.featureDescription}>
                Your data stays secure with enterprise-grade encryption and privacy controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>10x</div>
              <div className={styles.statLabel}>Faster task completion</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>100%</div>
              <div className={styles.statLabel}>Secure & private</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>24/7</div>
              <div className={styles.statLabel}>AI assistance</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
