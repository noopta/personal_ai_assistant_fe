import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      {/* Abstract Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <div className={styles.eyebrow}>AI Assistant</div>
            <h1 className={styles.heroTitle}>
              Delegate
              <br />
              your inbox.
              <br />
              <span className={styles.titleAccent}>Own your day.</span>
            </h1>
          </div>
          
          <div className={styles.abstractShapes}>
            <div className={styles.shape1}></div>
            <div className={styles.shape2}></div>
            <div className={styles.shape3}></div>
          </div>
        </div>

        <div className={styles.heroFooter}>
          <p className={styles.heroDescription}>
            Transform email chaos into clarity.
            <br />
            Automate responses. Schedule intelligently.
          </p>
          <div className={styles.heroActions}>
            <Link to="/product" className={styles.primaryBtn}>
              Experience AirThreads
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className={styles.stat}>
          <div className={styles.statNumber}>15</div>
          <div className={styles.statLabel}>Hours saved weekly</div>
        </div>
        <div className={styles.statDivider}></div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>98%</div>
          <div className={styles.statLabel}>Satisfaction rate</div>
        </div>
        <div className={styles.statDivider}></div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>50K</div>
          <div className={styles.statLabel}>Emails managed</div>
        </div>
      </section>

      {/* Capabilities - Asymmetric Grid */}
      <section className={styles.capabilities}>
        <div className={styles.capabilitiesHeader}>
          <h2 className={styles.sectionTitle}>Capabilities</h2>
          <div className={styles.sectionNumber}>01</div>
        </div>

        <div className={styles.capGrid}>
          <div className={styles.capCard} data-size="large">
            <div className={styles.capNumber}>01</div>
            <h3 className={styles.capTitle}>Intelligent Triage</h3>
            <p className={styles.capDescription}>
              AI categorizes and prioritizes every message. 
              Focus on what matters. Ignore the noise.
            </p>
            <div className={styles.capMetric}>-87% clutter</div>
          </div>

          <div className={styles.capCard} data-size="small">
            <div className={styles.capNumber}>02</div>
            <h3 className={styles.capTitle}>Smart Scheduling</h3>
            <p className={styles.capDescription}>
              Find perfect meeting times instantly.
            </p>
            <div className={styles.capMetric}>5 min avg</div>
          </div>

          <div className={styles.capCard} data-size="small">
            <div className={styles.capNumber}>03</div>
            <h3 className={styles.capTitle}>Auto Follow-ups</h3>
            <p className={styles.capDescription}>
              Contextual reminders. Never miss a reply.
            </p>
            <div className={styles.capMetric}>+43% response</div>
          </div>

          <div className={styles.capCard} data-size="medium">
            <div className={styles.capNumber}>04</div>
            <h3 className={styles.capTitle}>Focus Protection</h3>
            <p className={styles.capDescription}>
              Automated time blocking preserves deep work sessions. 
              Your calendar defends your productivity.
            </p>
            <div className={styles.capMetric}>12 hrs focus/week</div>
          </div>
        </div>
      </section>

      {/* Trust - Minimal */}
      <section className={styles.trust}>
        <div className={styles.trustHeader}>
          <h2 className={styles.sectionTitle}>Security</h2>
          <div className={styles.sectionNumber}>02</div>
        </div>

        <div className={styles.trustGrid}>
          <div className={styles.trustItem}>
            <div className={styles.trustLabel}>SOC 2 Type II</div>
            <div className={styles.trustLine}></div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustLabel}>End-to-End Encryption</div>
            <div className={styles.trustLine}></div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustLabel}>OAuth 2.0 Secure Auth</div>
            <div className={styles.trustLine}></div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustLabel}>Full Audit Logs</div>
            <div className={styles.trustLine}></div>
          </div>
        </div>
      </section>

      {/* Final CTA - Artistic */}
      <section className={styles.finalCta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to begin?</h2>
          <Link to="/product" className={styles.ctaButton}>
            Start Your Trial
            <div className={styles.ctaArrow}>→</div>
          </Link>
          <p className={styles.ctaNote}>14 days free · No card required</p>
        </div>
        
        <div className={styles.ctaShape}></div>
      </section>
    </div>
  );
}

export default LandingPage;
