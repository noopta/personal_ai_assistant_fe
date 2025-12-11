import styles from './IntegrationsPage.module.css';
import { GmailIcon, GoogleCalendarIcon, NotionIcon, AirbnbIcon } from '../components/icons';

function IntegrationsPage() {
  const integrations = [
    {
      id: 'gmail',
      icon: <GmailIcon size={28} />,
      name: 'Gmail',
      description: 'Manage your emails and send messages through AI assistance',
      steps: [
        {
          title: 'Navigate to Product',
          description: 'Go to the Product page to start connecting your services'
        },
        {
          title: 'Select Connect to Gmail',
          description: 'Click the "Connect to Gmail" button to begin authentication'
        },
        {
          title: 'Sign in with Gmail',
          description: 'Sign in with your Gmail account and you\'re all set!'
        }
      ],
      capabilities: [
        'Read and manage emails',
        'Send emails',
        'Delete and archive emails'
      ],
      link: '/product'
    },
    {
      id: 'calendar',
      icon: <GoogleCalendarIcon size={28} />,
      name: 'Google Calendar',
      description: 'Schedule meetings and manage events through natural language',
      steps: [
        {
          title: 'Navigate to Product',
          description: 'Go to the Product page to start connecting your services'
        },
        {
          title: 'Select Connect to Calendar',
          description: 'Click the "Connect to Calendar" button to begin authentication'
        },
        {
          title: 'Sign in with Google',
          description: 'Sign in with your Google account and you\'re all set!'
        }
      ],
      capabilities: [
        'View all your calendars',
        'Create and update events',
        'Delete and reschedule events'
      ],
      link: '/product'
    },
    {
      id: 'notion',
      icon: <NotionIcon size={28} />,
      name: 'Notion',
      comingSoon: true,
      description: 'Create notes, manage projects, and organize knowledge seamlessly (Coming Soon)',
      steps: [
        {
          title: 'Create Integration',
          description: 'Go to Notion Integrations, create a new integration, and name it (e.g., "AirThreads")'
        },
        {
          title: 'Get Integration Token',
          description: 'Copy the Internal Integration Token and store it securely in your environment variables'
        },
        {
          title: 'Share & Configure',
          description: 'Share Notion pages with your integration and configure backend with the token'
        }
      ],
      capabilities: [
        'Read and write page content',
        'Create new pages and databases',
        'Search across workspace',
        'Update properties and metadata'
      ],
      link: 'https://www.notion.so/my-integrations'
    },
    {
      id: 'airbnb',
      icon: <AirbnbIcon size={28} />,
      name: 'Airbnb',
      comingSoon: true,
      description: 'Manage your Airbnb listings, bookings, and guest communications with AI assistance (Coming Soon)',
      steps: [
        {
          title: 'Connect Account',
          description: 'Link your Airbnb host account to AirThreads securely'
        },
        {
          title: 'Authorize Access',
          description: 'Grant permissions to manage listings and communicate with guests'
        },
        {
          title: 'Start Managing',
          description: 'Use natural language to handle bookings, respond to guests, and update listings'
        }
      ],
      capabilities: [
        'View and manage listings',
        'Respond to guest messages',
        'Update availability and pricing',
        'Track booking requests'
      ],
      link: '#'
    }
  ];

  return (
    <div className={styles.integrationsPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Integrations</h1>
          <p>Connect AirThreads with your favorite tools to maximize productivity</p>
        </header>

        <div className={styles.integrationsGrid}>
          {integrations.map((integration) => (
            <section key={integration.id} className={styles.integrationCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>{integration.icon}</span>
                </div>
                <div className={styles.headerContent}>
                  <h2>
                    {integration.name}
                    {integration.comingSoon && <span className={styles.comingSoonBadge}>Coming Soon</span>}
                  </h2>
                  <p>{integration.description}</p>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.stepsSection}>
                  <h3>Quick Setup</h3>
                  <div className={styles.stepsGrid}>
                    {integration.steps.map((step, index) => (
                      <div key={index} className={styles.stepCard}>
                        <div className={styles.stepNumber}>{index + 1}</div>
                        <div className={styles.stepContent}>
                          <h4>{step.title}</h4>
                          <p>{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.metaSection}>
                  {integration.scopes && (
                    <div className={styles.scopesBox}>
                      <h4>Required Scopes</h4>
                      <div className={styles.scopesList}>
                        {integration.scopes.map((scope, index) => (
                          <code key={index} className={styles.scopeTag}>{scope}</code>
                        ))}
                      </div>
                    </div>
                  )}

                  {integration.capabilities && (
                    <div className={styles.scopesBox}>
                      <h4>Capabilities</h4>
                      <div className={styles.capabilitiesList}>
                        {integration.capabilities.map((capability, index) => (
                          <div key={index} className={styles.capabilityItem}>
                            <span className={styles.checkmark}>✓</span>
                            <span>{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <a
                  href={integration.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.setupButton}
                >
                  Start Setup →
                </a>
              </div>
            </section>
          ))}
        </div>

        <div className={styles.helpSection}>
          <div className={styles.helpGrid}>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>⚡</div>
              <h3>Quick Tips</h3>
              <p>Connect at least Gmail or Calendar to unlock the AI assistant. You can add more integrations anytime.</p>
            </div>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>🔒</div>
              <h3>Your Data is Safe</h3>
              <p>We use secure OAuth authentication. Your password is never shared with us, and you can disconnect anytime.</p>
            </div>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>💡</div>
              <h3>Need Help?</h3>
              <p>Having trouble connecting? Try signing out and back in, or use the feedback button to reach our support team.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntegrationsPage; 