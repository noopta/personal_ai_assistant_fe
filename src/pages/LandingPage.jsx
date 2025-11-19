import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      {/* Premium Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Delegate your inbox.
              <br />
              Own your day.
            </h1>
            <p className={styles.heroSubtitle}>
              AI-powered assistant that transforms how you manage Gmail and Calendar.
              Automate responses, schedule smarter, and reclaim hours every week.
            </p>
            <div className={styles.heroActions}>
              <Link to="/product" className={styles.primaryCta}>
                Book a Live Demo
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/product" className={styles.secondaryCta}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM8 14L8 6L14 10L8 14Z"/>
                </svg>
                Watch 90s Tour
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className={styles.socialProof}>
        <div className={styles.container}>
          <p className={styles.socialProofLabel}>Trusted by teams at</p>
          <div className={styles.logoGrid}>
            <div className={styles.companyLogo}>Stripe</div>
            <div className={styles.companyLogo}>Notion</div>
            <div className={styles.companyLogo}>Figma</div>
            <div className={styles.companyLogo}>Linear</div>
            <div className={styles.companyLogo}>Vercel</div>
          </div>
          <div className={styles.metricsRow}>
            <div className={styles.metric}>
              <div className={styles.metricValue}>98%</div>
              <div className={styles.metricLabel}>Customer Satisfaction</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>15hrs</div>
              <div className={styles.metricLabel}>Saved Per Week</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>50K+</div>
              <div className={styles.metricLabel}>Emails Managed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid - Automation Playbooks */}
      <section className={styles.bentoSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Automation Playbooks</h2>
            <p className={styles.sectionSubtitle}>
              Your AI assistant handles the work while you focus on what matters
            </p>
          </div>
          
          <div className={styles.bentoGrid}>
            <div className={styles.bentoCard}>
              <div className={styles.bentoIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="url(#gradient1)"/>
                  <path d="M8 12H24M8 16H24M8 20H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient1" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stopColor="#3F7CFF"/>
                      <stop offset="100%" stopColor="#7C3AED"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className={styles.bentoTitle}>Inbox Triage</h3>
              <p className={styles.bentoDescription}>
                Automatically prioritize, categorize, and surface urgent emails
              </p>
              <div className={styles.bentoMetric}>
                <span className={styles.bentoMetricValue}>-87%</span> email clutter
              </div>
            </div>

            <div className={styles.bentoCard}>
              <div className={styles.bentoIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="url(#gradient2)"/>
                  <circle cx="16" cy="16" r="6" stroke="white" strokeWidth="2"/>
                  <path d="M16 10V16L20 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient2" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stopColor="#65FBD2"/>
                      <stop offset="100%" stopColor="#3F7CFF"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className={styles.bentoTitle}>Smart Scheduling</h3>
              <p className={styles.bentoDescription}>
                AI finds the perfect meeting times based on everyone's calendar
              </p>
              <div className={styles.bentoMetric}>
                <span className={styles.bentoMetricValue}>5min</span> avg. scheduling time
              </div>
            </div>

            <div className={styles.bentoCard}>
              <div className={styles.bentoIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="url(#gradient3)"/>
                  <path d="M16 8V24M8 16H24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient3" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stopColor="#F6C76E"/>
                      <stop offset="100%" stopColor="#7C3AED"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className={styles.bentoTitle}>Follow-up Sequences</h3>
              <p className={styles.bentoDescription}>
                Never miss a reply with intelligent, contextual follow-ups
              </p>
              <div className={styles.bentoMetric}>
                <span className={styles.bentoMetricValue}>+43%</span> response rate
              </div>
            </div>

            <div className={styles.bentoCard}>
              <div className={styles.bentoIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="url(#gradient4)"/>
                  <rect x="10" y="10" width="12" height="12" rx="2" stroke="white" strokeWidth="2"/>
                  <path d="M10 14H22" stroke="white" strokeWidth="2"/>
                  <defs>
                    <linearGradient id="gradient4" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stopColor="#7C3AED"/>
                      <stop offset="100%" stopColor="#3F7CFF"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className={styles.bentoTitle}>Time Blocking</h3>
              <p className={styles.bentoDescription}>
                Automatically protect focus time and deep work sessions
              </p>
              <div className={styles.bentoMetric}>
                <span className={styles.bentoMetricValue}>12hrs</span> focus time/week
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className={styles.trustSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Enterprise-Grade Security</h2>
            <p className={styles.sectionSubtitle}>
              Your data is encrypted, private, and never used for training
            </p>
          </div>

          <div className={styles.trustGrid}>
            <div className={styles.trustCard}>
              <div className={styles.trustIcon}>🔒</div>
              <h4 className={styles.trustTitle}>SOC 2 Type II</h4>
              <p className={styles.trustDescription}>Independently audited security controls</p>
            </div>
            <div className={styles.trustCard}>
              <div className={styles.trustIcon}>🛡️</div>
              <h4 className={styles.trustTitle}>End-to-End Encryption</h4>
              <p className={styles.trustDescription}>Data encrypted at rest and in transit</p>
            </div>
            <div className={styles.trustCard}>
              <div className={styles.trustIcon}>✓</div>
              <h4 className={styles.trustTitle}>OAuth 2.0</h4>
              <p className={styles.trustDescription}>Secure authentication, never store passwords</p>
            </div>
            <div className={styles.trustCard}>
              <div className={styles.trustIcon}>📋</div>
              <h4 className={styles.trustTitle}>Audit Logs</h4>
              <p className={styles.trustDescription}>Complete visibility into all AI actions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Ready to transform your productivity?</h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of professionals saving 15+ hours every week
            </p>
            <div className={styles.ctaActions}>
              <Link to="/product" className={styles.primaryCta}>
                Start Free Trial
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <p className={styles.ctaNote}>No credit card required • 14-day free trial</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
