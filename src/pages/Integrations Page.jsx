import styles from './IntegrationsPage.module.css';

function IntegrationsPage() {
  const integrations = [
    {
      id: 'gmail',
      icon: '📧',
      name: 'Gmail',
      status: 'ACTIVE',
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
      status: 'ACTIVE',
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
      status: 'COMING_SOON',
      description: 'Create notes, manage projects, and organize knowledge seamlessly',
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
    }
  ];

  return (
    <div className={styles.integrationsPage}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.accentLine}></div>
          <h1 className={styles.title}>Integrations</h1>
          <p className={styles.subtitle}>
            Connect AirThreads with your favorite tools to maximize productivity
          </p>
        </header>

        {/* Integration Cards */}
        <div className={styles.integrationsGrid}>
          {integrations.map((integration) => (
            <div 
              key={integration.id} 
              className={`${styles.integrationCard} ${integration.status === 'COMING_SOON' ? styles.comingSoon : ''}`}
            >
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  <span className={styles.icon}>{integration.icon}</span>
                </div>
                <div className={styles.cardInfo}>
                  <h2 className={styles.integrationName}>{integration.name}</h2>
                  <span className={styles.status}>
                    {integration.status === 'ACTIVE' ? 'Active' : 'Coming Soon'}
                  </span>
                </div>
              </div>

              <p className={styles.description}>{integration.description}</p>

              {/* Setup Steps */}
              <div className={styles.steps}>
                <h3 className={styles.stepsTitle}>Setup</h3>
                {integration.steps.map((step, index) => (
                  <div key={index} className={styles.step}>
                    <div className={styles.stepNumber}>{index + 1}</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>{step.title}</h4>
                      <p className={styles.stepDescription}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scopes or Capabilities */}
              {integration.scopes && (
                <div className={styles.metaSection}>
                  <h4 className={styles.metaTitle}>Required Scopes</h4>
                  <div className={styles.scopes}>
                    {integration.scopes.map((scope, i) => (
                      <code key={i} className={styles.scopeTag}>{scope}</code>
                    ))}
                  </div>
                </div>
              )}

              {integration.capabilities && (
                <div className={styles.metaSection}>
                  <h4 className={styles.metaTitle}>Capabilities</h4>
                  <ul className={styles.capabilities}>
                    {integration.capabilities.map((capability, i) => (
                      <li key={i} className={styles.capability}>{capability}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Button */}
              <a
                href={integration.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                {integration.status === 'COMING_SOON' ? 'Stay Informed' : 'Get Started'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IntegrationsPage;
