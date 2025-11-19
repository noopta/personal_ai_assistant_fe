import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './LandingPage.module.css';
import CyberBackground from '../components/CyberBackground';

function LandingPage() {
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = 'INITIALIZING AIRTHREADS_';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTerminalText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <div className={styles.landingPage}>
      <CyberBackground />
      
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.terminalContainer}>
            <div className={styles.terminalHeader}>
              <span className={styles.terminalDot}></span>
              <span className={styles.terminalDot}></span>
              <span className={styles.terminalDot}></span>
              <span className={styles.terminalTitle}>system_boot.exe</span>
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.terminalLine}>
                <span className={styles.prompt}>root@airthreads:~$</span>
                <span className={styles.command}> {terminalText}</span>
                {showCursor && <span className={styles.cursor}>█</span>}
              </div>
            </div>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.glitchWrapper} data-text="AI-POWERED">
              AI-POWERED
            </span>
            <br />
            <span className={styles.neonText}>PRODUCTIVITY</span>
            <br />
            <span className={styles.glitchWrapper} data-text="INTERFACE">
              INTERFACE
            </span>
          </h1>

          <p className={styles.heroSubtitle}>
            <span className={styles.bracket}>{'['}</span>
            <span className={styles.status}>ONLINE</span>
            <span className={styles.bracket}>{']'}</span>
            {' '}NEURAL NETWORK INTEGRATION FOR GMAIL + CALENDAR MANAGEMENT
          </p>

          <div className={styles.heroActions}>
            <Link to="/product" className={styles.primaryCta}>
              <span className={styles.ctaText}>INITIALIZE SYSTEM</span>
              <span className={styles.ctaArrow}>{'>>>'}</span>
            </Link>
            <Link to="/integrations" className={styles.secondaryCta}>
              <span>VIEW PROTOCOLS</span>
            </Link>
          </div>

          <div className={styles.systemStatus}>
            <div className={styles.statusItem}>
              <span className={styles.statusDot} style={{backgroundColor: '#00FF00'}}></span>
              <span>SYSTEMS: OPERATIONAL</span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusDot} style={{backgroundColor: '#00FFFF'}}></span>
              <span>UPTIME: 99.9%</span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusDot} style={{backgroundColor: '#FF00FF'}}></span>
              <span>LATENCY: &lt;50MS</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.integrations}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>{'<AVAILABLE_INTEGRATIONS>'}</span>
            <h2 className={styles.sectionTitle}>NEURAL LINK PROTOCOLS</h2>
          </div>

          <div className={styles.integrationsGrid}>
            <div className={styles.integrationCard}>
              <div className={styles.cardCorner}></div>
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  <span className={styles.icon}>📧</span>
                </div>
                <div className={styles.cardBadge}>ACTIVE</div>
              </div>
              <h3 className={styles.cardTitle}>GMAIL_PROTOCOL</h3>
              <p className={styles.cardDesc}>
                Full neural integration with email systems. Send, receive, analyze with AI assistance.
              </p>
              <div className={styles.cardStats}>
                <span>LATENCY: 12MS</span>
                <span>STATUS: {'///'} CONNECTED</span>
              </div>
              <Link to="/integrations" className={styles.cardLink}>
                ACCESS MODULE {'>'}
              </Link>
            </div>

            <div className={styles.integrationCard}>
              <div className={styles.cardCorner}></div>
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  <span className={styles.icon}>📅</span>
                </div>
                <div className={styles.cardBadge}>ACTIVE</div>
              </div>
              <h3 className={styles.cardTitle}>CALENDAR_SYNC</h3>
              <p className={styles.cardDesc}>
                Temporal management system. Schedule events, set reminders through neural commands.
              </p>
              <div className={styles.cardStats}>
                <span>LATENCY: 8MS</span>
                <span>STATUS: {'///'} CONNECTED</span>
              </div>
              <Link to="/integrations" className={styles.cardLink}>
                ACCESS MODULE {'>'}
              </Link>
            </div>

            <div className={`${styles.integrationCard} ${styles.comingSoon}`}>
              <div className={styles.cardCorner}></div>
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  <span className={styles.icon}>📝</span>
                </div>
                <div className={styles.cardBadge} style={{backgroundColor: '#FF00FF'}}>INCOMING</div>
              </div>
              <h3 className={styles.cardTitle}>NOTION_LINK</h3>
              <p className={styles.cardDesc}>
                Knowledge base integration. Organize data, manage projects through AI interface.
              </p>
              <div className={styles.cardStats}>
                <span>LATENCY: --MS</span>
                <span>STATUS: {'///'} PENDING</span>
              </div>
              <div className={styles.cardLink} style={{opacity: 0.5}}>
                LOCKED {'>'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>{'<SYSTEM_CAPABILITIES>'}</span>
            <h2 className={styles.sectionTitle}>CORE FUNCTIONS</h2>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featurePanel}>
              <div className={styles.panelNumber}>01</div>
              <div className={styles.panelContent}>
                <h3>AI NEURAL PROCESSING</h3>
                <p>Advanced language models process natural commands into actionable tasks across all integrations.</p>
              </div>
              <div className={styles.panelGlow}></div>
            </div>

            <div className={styles.featurePanel}>
              <div className={styles.panelNumber}>02</div>
              <div className={styles.panelContent}>
                <h3>REAL-TIME SYNC</h3>
                <p>Instant synchronization across all connected services with sub-50ms latency.</p>
              </div>
              <div className={styles.panelGlow}></div>
            </div>

            <div className={styles.featurePanel}>
              <div className={styles.panelNumber}>03</div>
              <div className={styles.panelContent}>
                <h3>VOICE INTERFACE</h3>
                <p>Neural voice commands for hands-free productivity management.</p>
              </div>
              <div className={styles.panelGlow}></div>
            </div>

            <div className={styles.featurePanel}>
              <div className={styles.panelNumber}>04</div>
              <div className={styles.panelContent}>
                <h3>AUTOMATED WORKFLOWS</h3>
                <p>AI-driven automation eliminates repetitive tasks and optimizes your workflow.</p>
              </div>
              <div className={styles.panelGlow}></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaPanel}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                <span className={styles.glitchWrapper} data-text="READY">READY</span> TO CONNECT?
              </h2>
              <p className={styles.ctaSubtitle}>
                Initialize your neural productivity interface now
              </p>
              <Link to="/product" className={styles.ctaButton}>
                <span>START SYSTEM</span>
                <span className={styles.ctaButtonArrow}>{'>>>'}</span>
              </Link>
            </div>
            <div className={styles.ctaVisual}>
              <div className={styles.dataStream}>
                <div className={styles.dataLine}></div>
                <div className={styles.dataLine}></div>
                <div className={styles.dataLine}></div>
                <div className={styles.dataLine}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
