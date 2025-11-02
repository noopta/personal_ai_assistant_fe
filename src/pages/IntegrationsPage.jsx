import styles from './IntegrationsPage.module.css';

function IntegrationsPage() {
  const integrations = [
    {
      id: 'gmail',
      icon: '📧',
      name: 'Gmail',
      description: 'Manage your emails and send messages through AI assistance',
      steps: [
        {
          title: 'Enable Gmail API',
          description: 'Go to Google Cloud Console, create or select a project, and enable the Gmail API'
        },
        {
          title: 'Create OAuth Credentials',
          description: 'Navigate to Credentials, create OAuth 2.0 Client ID, and set application type to "Desktop"'
        },
        {
          title: 'Configure & Authenticate',
          description: 'Download credentials.json, place in backend directory, then authenticate via the app'
        }
      ],
      scopes: [
        'gmail.readonly',
        'gmail.send',
        'gmail.modify'
      ],
      link: 'https://console.cloud.google.com/'
    },
    {
      id: 'calendar',
      icon: '📅',
      name: 'Google Calendar',
      description: 'Schedule meetings and manage events through natural language',
      steps: [
        {
          title: 'Enable Calendar API',
          description: 'Visit Google Cloud Console and enable the Google Calendar API in your project'
        },
        {
          title: 'Use OAuth Credentials',
          description: 'Reuse Gmail credentials or create new OAuth 2.0 credentials following the same process'
        },
        {
          title: 'Authorize & Connect',
          description: 'Click "Authenticate Calendar" in the app and grant calendar permissions'
        }
      ],
      scopes: [
        'calendar',
        'calendar.events'
      ],
      link: 'https://console.cloud.google.com/'
    },
    {
      id: 'notion',
      icon: '📝',
      name: 'Notion',
      comingSoon: true,
      description: 'Create notes, manage projects, and organize knowledge seamlessly (Coming Soon)',
      steps: [
        {
          title: 'Create Integration',
          description: 'Go to Notion Integrations, create a new integration, and name it (e.g., "Lucius AI")'
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
    }
  ];

  return (
    <div className={styles.integrationsPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Integrations</h1>
          <p>Connect Lucius AI with your favorite tools to maximize productivity</p>
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
              <p>Ensure all required APIs are enabled in your Google Cloud Console before attempting authentication.</p>
            </div>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>🔒</div>
              <h3>Security</h3>
              <p>Never share your credentials or tokens publicly. Store them securely in environment variables.</p>
            </div>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>💡</div>
              <h3>Support</h3>
              <p>Having trouble? Check that your OAuth consent screen is properly configured with test users.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntegrationsPage; 