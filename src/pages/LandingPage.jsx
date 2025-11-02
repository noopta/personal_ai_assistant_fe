import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {
  // No longer need to create hash IDs - backend handles cookies automatically

  // Template companies for the moving logos section
  const companies = [
    'TechCorp', 'InnovateLab', 'DataFlow', 'CloudSync', 'SmartWorks',
    'FutureTech', 'DigitalEdge', 'ProFlow', 'NextGen', 'EliteSoft',
    'TechCorp', 'InnovateLab', 'DataFlow', 'CloudSync', 'SmartWorks',
    'FutureTech', 'DigitalEdge', 'ProFlow', 'NextGen', 'EliteSoft'
  ];

  return (
    <div className={styles.landingPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Your AI-Powered <span className={styles.highlight}>Task Manager</span>
            </h1>
            <p className={styles.heroDescription}>
              Streamline your workflow with intelligent task management. Connect your Gmail, 
              Google Calendar, and Notion to get more done with less effort.
            </p>
            <div className={styles.heroActions}>
              <Link to="/product" className={styles.primaryCta}>
                Try Lucius AI
              </Link>
              <Link to="/integrations" className={styles.secondaryCta}>
                View Integrations
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.mockup}>
              <div className={styles.chatWindow}>
                <div className={styles.chatHeader}>Lucius AI Assistant</div>
                <div className={styles.chatMessage}>
                  <div className={styles.userMessage}>
                    Schedule a meeting with the team for tomorrow at 2 PM
                  </div>
                  <div className={styles.aiMessage}>
                    ✅ I've scheduled "Team Meeting" for tomorrow at 2:00 PM and sent calendar invites to all team members via Gmail.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Customer Logos Section */}
      <section className={styles.customersSection}>
        <div className={styles.container}>
          <h3 className={styles.customersTitle}>Trusted by leading companies worldwide</h3>
          <div className={styles.customersContainer}>
            <div className={styles.customersTrack}>
              {companies.map((company, index) => (
                <div key={index} className={styles.customerLogo}>
                  <span className={styles.customerLogoText}>{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Powerful Integrations</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📧</div>
              <h3>Gmail Integration</h3>
              <p>Automatically manage your emails, send messages, and organize your inbox with AI assistance.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📅</div>
              <h3>Google Calendar</h3>
              <p>Schedule meetings, set reminders, and manage your calendar seamlessly through natural language.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📝</div>
              <h3>Notion Workspace</h3>
              <p>Create notes, manage projects, and organize your knowledge base directly from the chat interface.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.benefitsContent}>
            <h2 className={styles.sectionTitle}>Why Choose Lucius AI?</h2>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>⚡</div>
                <div>
                  <h4>Save Time</h4>
                  <p>Automate repetitive tasks and focus on what matters most</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🔗</div>
                <div>
                  <h4>Seamless Integration</h4>
                  <p>Works with your existing tools and workflows</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🤖</div>
                <div>
                  <h4>AI-Powered</h4>
                  <p>Smart assistance that learns and adapts to your needs</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🔒</div>
                <div>
                  <h4>Secure & Private</h4>
                  <p>Your data is protected with enterprise-grade security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Transform Your Productivity?</h2>
            <p>Join thousands of users who have streamlined their workflow with Lucius AI.</p>
            <Link to="/product" className={styles.ctaButton}>
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage; 