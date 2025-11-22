import { useState } from 'react';

function IntegrationsPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

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

  // Styles
  const pageStyle = {
    minHeight: '100vh',
    background: 'var(--background)',
    padding: 'clamp(6rem, 8vw, 8rem) 0',
    color: 'var(--foreground)',
  };

  const containerStyle = {
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '0 16px',
  };

  const headerStyle = {
    marginBottom: 'clamp(4rem, 10vw, 6rem)',
    animation: 'fadeIn 0.8s ease-out',
  };

  const accentLineStyle = {
    width: '80px',
    height: '2px',
    background: 'var(--primary)',
    marginBottom: '32px',
    opacity: 0.8,
  };

  const titleStyle = {
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: '300',
    marginBottom: '16px',
    letterSpacing: '-0.03em',
    color: 'var(--foreground)',
    margin: '0 0 16px 0',
    lineHeight: 1.1
  };

  const subtitleStyle = {
    fontSize: '1.125rem',
    color: 'var(--muted-foreground)',
    maxWidth: '600px',
    lineHeight: '1.6',
    fontWeight: '300',
    margin: 0,
  };

  const gridStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  };

  const getCardStyle = (integrationId, isComingSoon) => ({
    background: 'color-mix(in srgb, var(--background) 40%, transparent)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${hoveredCard === integrationId ? 'color-mix(in srgb, var(--primary) 40%, transparent)' : 'color-mix(in srgb, var(--foreground) 8%, transparent)'}`,
    borderRadius: '16px',
    padding: '2rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: hoveredCard === integrationId ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: hoveredCard === integrationId 
      ? '0 20px 40px color-mix(in srgb, var(--foreground) 15%, transparent)' 
      : '0 8px 24px color-mix(in srgb, var(--foreground) 5%, transparent)',
    opacity: isComingSoon ? 0.7 : 1,
    cursor: hoveredCard === integrationId ? 'default' : 'default',
  });

  const cardHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid color-mix(in srgb, var(--foreground) 8%, transparent)',
  };

  const iconContainerStyle = {
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'color-mix(in srgb, var(--foreground) 3%, transparent)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid color-mix(in srgb, var(--foreground) 10%, transparent)',
    borderRadius: '12px',
    flexShrink: 0,
  };

  const iconStyle = {
    fontSize: '2rem',
  };

  const cardInfoStyle = {
    flex: 1,
  };

  const integrationNameStyle = {
    fontSize: '1.75rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    color: 'var(--foreground)',
    letterSpacing: '-0.01em',
    margin: '0 0 0.5rem 0',
  };

  const getStatusStyle = (status) => ({
    display: 'inline-block',
    fontSize: '0.875rem',
    fontWeight: '500',
    padding: '0.375rem 0.875rem',
    borderRadius: '20px',
    background: status === 'ACTIVE' 
      ? 'color-mix(in srgb, hsl(142 71% 45%) 15%, transparent)'
      : 'color-mix(in srgb, var(--foreground) 8%, transparent)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: status === 'ACTIVE'
      ? '1px solid color-mix(in srgb, hsl(142 71% 45%) 30%, transparent)'
      : '1px solid color-mix(in srgb, var(--foreground) 10%, transparent)',
    color: status === 'ACTIVE' ? 'hsl(142 71% 45%)' : 'var(--muted-foreground)',
  });

  const descriptionStyle = {
    fontSize: '1rem',
    color: 'var(--muted-foreground)',
    lineHeight: '1.7',
    marginBottom: '2rem',
    margin: '0 0 2rem 0',
  };

  const stepsStyle = {
    marginBottom: '2rem',
  };

  const stepsTitleStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--muted-foreground)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
    margin: '0 0 1rem 0',
  };

  const stepStyle = (index, totalSteps) => ({
    display: 'flex',
    gap: '1rem',
    marginBottom: index < totalSteps - 1 ? '1.5rem' : '0',
    paddingBottom: index < totalSteps - 1 ? '1.5rem' : '0',
    borderBottom: index < totalSteps - 1 ? '1px solid color-mix(in srgb, var(--foreground) 5%, transparent)' : 'none',
    background: 'color-mix(in srgb, var(--foreground) 2%, transparent)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid color-mix(in srgb, var(--foreground) 5%, transparent)',
  });

  const stepNumberStyle = {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'color-mix(in srgb, var(--primary) 15%, transparent)',
    color: 'var(--primary)',
    borderRadius: '50%',
    fontWeight: '600',
    fontSize: '0.875rem',
    flexShrink: 0,
  };

  const stepContentStyle = {
    flex: 1,
  };

  const stepTitleStyle = {
    fontSize: '1rem',
    fontWeight: '500',
    color: 'var(--foreground)',
    marginBottom: '0.5rem',
    margin: '0 0 0.5rem 0',
  };

  const stepDescriptionStyle = {
    fontSize: '0.9375rem',
    color: 'var(--muted-foreground)',
    lineHeight: '1.6',
    margin: 0,
  };

  const metaSectionStyle = {
    marginBottom: '1.5rem',
    background: 'color-mix(in srgb, var(--foreground) 2%, transparent)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid color-mix(in srgb, var(--foreground) 5%, transparent)',
  };

  const metaTitleStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--muted-foreground)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.75rem',
    margin: '0 0 0.75rem 0',
  };

  const scopesStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  };

  const scopeTagStyle = {
    fontFamily: '"Courier New", monospace',
    fontSize: '0.8125rem',
    padding: '0.375rem 0.625rem',
    background: 'color-mix(in srgb, var(--foreground) 5%, transparent)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid color-mix(in srgb, var(--foreground) 10%, transparent)',
    borderRadius: '6px',
    color: 'var(--foreground)',
  };

  const capabilitiesStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const capabilityStyle = {
    fontSize: '0.9375rem',
    color: 'var(--muted-foreground)',
    lineHeight: '1.7',
    paddingLeft: '1rem',
    position: 'relative',
    marginBottom: '0.5rem',
  };

  const capabilityBulletStyle = {
    position: 'absolute',
    left: 0,
    color: 'var(--primary)',
  };

  const getButtonStyle = (integrationId, isComingSoon) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 2rem',
    background: isComingSoon 
      ? (hoveredButton === integrationId 
        ? 'color-mix(in srgb, var(--foreground) 8%, transparent)'
        : 'transparent')
      : (hoveredButton === integrationId
        ? 'color-mix(in srgb, var(--primary) 90%, transparent)'
        : 'var(--primary)'),
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    color: isComingSoon ? 'var(--foreground)' : '#000',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.9375rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '8px',
    marginTop: '1rem',
    border: isComingSoon 
      ? `1px solid ${hoveredButton === integrationId ? 'color-mix(in srgb, var(--foreground) 15%, transparent)' : 'color-mix(in srgb, var(--foreground) 10%, transparent)'}`
      : '1px solid transparent',
    transform: hoveredButton === integrationId ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredButton === integrationId && !isComingSoon
      ? '0 8px 20px color-mix(in srgb, var(--primary) 30%, transparent)'
      : 'none',
  });

  return (
    <div style={pageStyle}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @media (max-width: 768px) {
            .card-header-responsive {
              flex-direction: column !important;
              align-items: flex-start !important;
            }
            .step-responsive {
              flex-direction: column !important;
            }
          }

          @media (max-width: 480px) {
            .container-responsive {
              padding: 0 1rem !important;
            }
            .card-responsive {
              padding: 1rem !important;
            }
          }
        `}
      </style>
      
      <div style={containerStyle} className="container-responsive">
        {/* Header */}
        <header style={headerStyle}>
          <div style={accentLineStyle}></div>
          <h1 style={titleStyle}>Integrations</h1>
          <p style={subtitleStyle}>
            Connect AirThreads with your favorite tools to maximize productivity
          </p>
        </header>

        {/* Integration Cards */}
        <div style={gridStyle}>
          {integrations.map((integration) => (
            <div 
              key={integration.id}
              style={getCardStyle(integration.id, integration.status === 'COMING_SOON')}
              className="card-responsive"
              onMouseEnter={() => setHoveredCard(integration.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Header */}
              <div style={cardHeaderStyle} className="card-header-responsive">
                <div style={iconContainerStyle}>
                  <span style={iconStyle}>{integration.icon}</span>
                </div>
                <div style={cardInfoStyle}>
                  <h2 style={integrationNameStyle}>{integration.name}</h2>
                  <span style={getStatusStyle(integration.status)}>
                    {integration.status === 'ACTIVE' ? 'Active' : 'Coming Soon'}
                  </span>
                </div>
              </div>

              <p style={descriptionStyle}>{integration.description}</p>

              {/* Setup Steps */}
              <div style={stepsStyle}>
                <h3 style={stepsTitleStyle}>Setup</h3>
                {integration.steps.map((step, index) => (
                  <div 
                    key={index} 
                    style={stepStyle(index, integration.steps.length)}
                    className="step-responsive"
                  >
                    <div style={stepNumberStyle}>{index + 1}</div>
                    <div style={stepContentStyle}>
                      <h4 style={stepTitleStyle}>{step.title}</h4>
                      <p style={stepDescriptionStyle}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scopes or Capabilities */}
              {integration.scopes && (
                <div style={metaSectionStyle}>
                  <h4 style={metaTitleStyle}>Required Scopes</h4>
                  <div style={scopesStyle}>
                    {integration.scopes.map((scope, i) => (
                      <code key={i} style={scopeTagStyle}>{scope}</code>
                    ))}
                  </div>
                </div>
              )}

              {integration.capabilities && (
                <div style={metaSectionStyle}>
                  <h4 style={metaTitleStyle}>Capabilities</h4>
                  <ul style={capabilitiesStyle}>
                    {integration.capabilities.map((capability, i) => (
                      <li key={i} style={capabilityStyle}>
                        <span style={capabilityBulletStyle}>•</span>
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Button */}
              <a
                href={integration.link}
                target="_blank"
                rel="noopener noreferrer"
                style={getButtonStyle(integration.id, integration.status === 'COMING_SOON')}
                onMouseEnter={() => setHoveredButton(integration.id)}
                onMouseLeave={() => setHoveredButton(null)}
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
