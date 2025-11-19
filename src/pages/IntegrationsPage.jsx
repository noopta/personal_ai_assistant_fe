import styles from './IntegrationsPage.module.css';
import CyberBackground from '../components/CyberBackground';

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
          command: '$ gcloud services enable gmail.googleapis.com',
          description: 'Go to Google Cloud Console, create or select a project, and enable the Gmail API'
        },
        {
          title: 'Create OAuth Credentials',
          command: '$ gcloud auth configure-oauth2',
          description: 'Navigate to Credentials, create OAuth 2.0 Client ID, and set application type to "Desktop"'
        },
        {
          title: 'Configure & Authenticate',
          command: '$ airthreads auth gmail --credentials=./credentials.json',
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
          command: '$ gcloud services enable calendar-json.googleapis.com',
          description: 'Visit Google Cloud Console and enable the Google Calendar API in your project'
        },
        {
          title: 'Use OAuth Credentials',
          command: '$ gcloud auth reuse --service=calendar',
          description: 'Reuse Gmail credentials or create new OAuth 2.0 credentials following the same process'
        },
        {
          title: 'Authorize & Connect',
          command: '$ airthreads connect calendar --auto-sync',
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
          command: '$ notion-cli init --name="AirThreads"',
          description: 'Go to Notion Integrations, create a new integration, and name it (e.g., "AirThreads")'
        },
        {
          title: 'Get Integration Token',
          command: '$ notion-cli token --export=.env',
          description: 'Copy the Internal Integration Token and store it securely in your environment variables'
        },
        {
          title: 'Share & Configure',
          command: '$ airthreads setup notion --token=$NOTION_TOKEN',
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
      <CyberBackground />
      
      <div className={styles.scanlineOverlay} />
      <div className={styles.gridOverlay} />
      
      <div className={styles.container}>
        {/* Cyberpunk Header */}
        <header className={styles.header}>
          <div className={styles.headerGlitch}>
            <h1 className={styles.title} data-text="INTEGRATIONS">
              INTEGRATIONS
            </h1>
            <div className={styles.titleUnderline} />
          </div>
          <p className={styles.subtitle}>
            <span className={styles.terminalPrompt}>&gt;_</span> 
            Connect AirThreads with your favorite tools to maximize productivity
          </p>
          <div className={styles.statusBar}>
            <span className={styles.statusItem}>
              <span className={styles.statusDot} /> SYSTEM ONLINE
            </span>
            <span className={styles.statusItem}>
              <span className={styles.statusDot} style={{background: 'var(--neon-cyan)'}} /> {integrations.filter(i => i.status === 'ACTIVE').length} ACTIVE
            </span>
            <span className={styles.statusItem}>
              <span className={styles.statusDot} style={{background: 'var(--neon-magenta)'}} /> {integrations.filter(i => i.status === 'COMING_SOON').length} INCOMING
            </span>
          </div>
        </header>

        {/* Integration Cards */}
        <div className={styles.integrationsGrid}>
          {integrations.map((integration, index) => (
            <div 
              key={integration.id} 
              className={`${styles.integrationCard} ${integration.status === 'COMING_SOON' ? styles.comingSoon : ''}`}
              style={{'--card-index': index}}
            >
              {/* Card Corner Accents */}
              <div className={styles.cardCornerTL} />
              <div className={styles.cardCornerTR} />
              <div className={styles.cardCornerBL} />
              <div className={styles.cardCornerBR} />
              
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  <div className={styles.iconHolo}>
                    <span className={styles.icon}>{integration.icon}</span>
                    <div className={styles.iconGlow} />
                  </div>
                  <div className={styles.headerInfo}>
                    <h2 className={styles.integrationName}>
                      {integration.name}
                      {integration.status === 'COMING_SOON' && (
                        <span className={styles.badge}>COMING_SOON</span>
                      )}
                      {integration.status === 'ACTIVE' && (
                        <span className={styles.badgeActive}>ONLINE</span>
                      )}
                    </h2>
                    <p className={styles.description}>{integration.description}</p>
                  </div>
                </div>
              </div>

              {/* Terminal Setup Section */}
              <div className={styles.terminalSection}>
                <div className={styles.terminalHeader}>
                  <span className={styles.terminalTitle}>
                    <span className={styles.terminalIcon}>▶</span> QUICK_SETUP.sh
                  </span>
                  <div className={styles.terminalControls}>
                    <span className={styles.terminalDot} style={{background: 'var(--neon-green)'}} />
                    <span className={styles.terminalDot} style={{background: 'var(--neon-yellow)'}} />
                    <span className={styles.terminalDot} style={{background: 'var(--neon-magenta)'}} />
                  </div>
                </div>
                
                <div className={styles.stepsContainer}>
                  {integration.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className={styles.stepItem}>
                      <div className={styles.stepHeader}>
                        <span className={styles.stepNumber}>[{stepIndex + 1}]</span>
                        <span className={styles.stepTitle}>{step.title}</span>
                      </div>
                      <div className={styles.stepCommand}>
                        <span className={styles.commandPrompt}>$</span>
                        <code className={styles.commandText}>{step.command}</code>
                      </div>
                      <p className={styles.stepDescription}>{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta Info */}
              <div className={styles.metaSection}>
                {integration.scopes && (
                  <div className={styles.scopesPanel}>
                    <h4 className={styles.panelTitle}>
                      <span className={styles.panelIcon}>◆</span> REQUIRED_SCOPES
                    </h4>
                    <div className={styles.scopesGrid}>
                      {integration.scopes.map((scope, i) => (
                        <code key={i} className={styles.scopeChip}>
                          <span className={styles.scopeDot} />
                          {scope}
                        </code>
                      ))}
                    </div>
                  </div>
                )}

                {integration.capabilities && (
                  <div className={styles.capabilitiesPanel}>
                    <h4 className={styles.panelTitle}>
                      <span className={styles.panelIcon}>◆</span> CAPABILITIES
                    </h4>
                    <div className={styles.capabilitiesList}>
                      {integration.capabilities.map((capability, i) => (
                        <div key={i} className={styles.capabilityItem}>
                          <span className={styles.capabilityCheck}>✓</span>
                          <span>{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <a
                href={integration.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                <span className={styles.buttonText}>
                  {integration.status === 'COMING_SOON' ? 'NOTIFY_ME' : 'INITIALIZE_SETUP'}
                </span>
                <span className={styles.buttonArrow}>→</span>
              </a>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className={styles.helpSection}>
          <div className={styles.helpHeader}>
            <h3 className={styles.helpTitle} data-text="SUPPORT_PROTOCOLS">
              SUPPORT_PROTOCOLS
            </h3>
          </div>
          <div className={styles.helpGrid}>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>⚡</div>
              <h4>QUICK_TIPS</h4>
              <p>Ensure all required APIs are enabled in your Google Cloud Console before attempting authentication.</p>
            </div>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>🔒</div>
              <h4>SECURITY_PROTOCOL</h4>
              <p>Never share your credentials or tokens publicly. Store them securely in environment variables.</p>
            </div>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>💡</div>
              <h4>TROUBLESHOOT</h4>
              <p>Having trouble? Check that your OAuth consent screen is properly configured with test users.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntegrationsPage;
