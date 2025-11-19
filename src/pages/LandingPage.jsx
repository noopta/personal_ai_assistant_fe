import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './LandingPage.module.css';

function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.landingPage}>

      {/* Experimental Hero */}
      <section className={styles.hero}>
        {/* Kinetic Typography Background */}
        <div className={styles.kineticLayer}>
          <div className={styles.kineticText} data-text="AI">AI</div>
        </div>

        {/* Background Layer - Deep parallax */}
        <div 
          className={styles.bgLayer}
          style={{
            transform: `translate3d(0, ${scrollY * 0.5}px, -200px)`
          }}
        >
          <svg className={styles.morphingSvg} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" />
                <feDisplacementMap in="SourceGraphic" scale="50" />
              </filter>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#666666" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            
            {/* Morphing blob */}
            <path className={styles.blob} fill="url(#gradient1)" filter="url(#noise)">
              <animate attributeName="d" dur="20s" repeatCount="indefinite"
                values="M 0,500 C 0,300 200,100 500,100 C 800,100 1000,300 1000,500 C 1000,700 800,900 500,900 C 200,900 0,700 0,500 Z;
                        M 0,600 C 0,350 150,50 500,50 C 850,50 1000,350 1000,600 C 1000,800 850,950 500,950 C 150,950 0,800 0,600 Z;
                        M 0,500 C 0,300 200,100 500,100 C 800,100 1000,300 1000,500 C 1000,700 800,900 500,900 C 200,900 0,700 0,500 Z" />
            </path>
          </svg>
        </div>

        {/* Vertical Label */}
        <div className={styles.verticalLabel}>AIRTHREADS — 2025</div>

        {/* Mid Layer - Email/Data themed elements with parallax */}
        <div 
          className={styles.midLayer}
          style={{
            transform: `translate3d(${mousePos.x * -20}px, ${scrollY * 0.3 + mousePos.y * -20}px, -50px)`
          }}
        >
          {/* Email envelope icons */}
          <div className={styles.emailCluster}>
            <svg className={styles.emailIcon1} viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="80" height="50" fill="none" stroke="rgba(10,10,10,0.08)" strokeWidth="1.5"/>
              <path d="M 10 15 L 50 45 L 90 15" fill="none" stroke="rgba(10,10,10,0.08)" strokeWidth="1.5"/>
            </svg>
            
            <svg className={styles.emailIcon2} viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="80" height="50" fill="none" stroke="rgba(10,10,10,0.06)" strokeWidth="1.5"/>
              <path d="M 10 15 L 50 45 L 90 15" fill="none" stroke="rgba(10,10,10,0.06)" strokeWidth="1.5"/>
            </svg>

            <svg className={styles.emailIcon3} viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="80" height="50" fill="none" stroke="rgba(10,10,10,0.05)" strokeWidth="1.5"/>
              <path d="M 10 15 L 50 45 L 90 15" fill="none" stroke="rgba(10,10,10,0.05)" strokeWidth="1.5"/>
            </svg>
          </div>

          {/* Data flow lines */}
          <div className={styles.dataFlowLines}>
            <div className={styles.flowLine1}></div>
            <div className={styles.flowLine2}></div>
            <div className={styles.flowLine3}></div>
          </div>
          
          {/* Notification dots */}
          <div className={styles.notificationDots}>
            <div className={styles.dot1}></div>
            <div className={styles.dot2}></div>
            <div className={styles.dot3}></div>
          </div>
        </div>

        {/* Foreground - Typography */}
        <div className={styles.heroStage}>
          <div className={styles.heroMeta}>
            <span className={styles.metaTag}>CONCEPT STUDY</span>
            <span className={styles.metaNumber}>01</span>
            <span className={styles.metaYear}>2025</span>
          </div>

          <div 
            className={styles.heroContent}
            style={{
              transform: `translate3d(${mousePos.x * 5}px, ${mousePos.y * 5}px, 20px)`
            }}
          >
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>Delegate</span>
              <span className={styles.titleLine}>your inbox<span className={styles.period}>.</span></span>
              <span className={styles.titleAccent}>Own your day.</span>
            </h1>
          </div>

          <div className={styles.heroCaption}>
            <p className={styles.caption}>
              AI-powered email management
              <br />
              for modern professionals
            </p>
            <div className={styles.captionLine}></div>
          </div>

          <Link to="/product" className={styles.heroBtn}>
            <span className={styles.btnText}>Experience</span>
            <div className={styles.btnArrow}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </div>
          </Link>
        </div>

        {/* Annotation lines */}
        <div className={styles.annotations}>
          <div className={styles.annotationLine1}></div>
          <div className={styles.annotationLine2}></div>
        </div>
      </section>

      {/* Diagonal Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsDiagonal}>
          <div className={styles.statBlock}>
            <div className={styles.statValue}>15</div>
            <div className={styles.statUnit}>hrs/week</div>
            <div className={styles.statLabel}>Time saved</div>
          </div>
          
          <div className={styles.statBlock}>
            <div className={styles.statValue}>98</div>
            <div className={styles.statUnit}>%</div>
            <div className={styles.statLabel}>Satisfaction</div>
          </div>
          
          <div className={styles.statBlock}>
            <div className={styles.statValue}>50K</div>
            <div className={styles.statUnit}>+</div>
            <div className={styles.statLabel}>Emails managed</div>
          </div>
        </div>
      </section>

      {/* Experimental Capabilities Grid */}
      <section className={styles.capabilities}>
        <div className={styles.capHeader}>
          <div className={styles.capLabel}>
            <span className={styles.labelNumber}>02</span>
            <span className={styles.labelText}>Capabilities</span>
          </div>
        </div>

        <div className={styles.capExperimentalGrid}>
          {/* Large feature card */}
          <div className={styles.capCard} data-size="hero">
            <div className={styles.capOverlay}></div>
            <div className={styles.capContent}>
              <div className={styles.capIndex}>01</div>
              <h3 className={styles.capTitle}>Intelligent<br />Triage</h3>
              <p className={styles.capDesc}>
                AI automatically categorizes, prioritizes, and surfaces 
                what demands your attention. Everything else fades away.
              </p>
              <div className={styles.capMetric}>
                <span className={styles.metricValue}>-87%</span>
                <span className={styles.metricLabel}>inbox clutter</span>
              </div>
            </div>
          </div>

          {/* Vertical card */}
          <div className={styles.capCard} data-size="vertical">
            <div className={styles.capContent}>
              <div className={styles.capIndex}>02</div>
              <h3 className={styles.capTitle}>Smart<br />Scheduling</h3>
              <p className={styles.capDesc}>Perfect meeting times, instantly.</p>
              <div className={styles.capMetric}>
                <span className={styles.metricValue}>5min</span>
              </div>
            </div>
          </div>

          {/* Square card */}
          <div className={styles.capCard} data-size="square">
            <div className={styles.capContent}>
              <div className={styles.capIndex}>03</div>
              <h3 className={styles.capTitle}>Follow-ups</h3>
              <p className={styles.capDesc}>Contextual reminders.</p>
              <div className={styles.capMetric}>
                <span className={styles.metricValue}>+43%</span>
              </div>
            </div>
          </div>

          {/* Wide card */}
          <div className={styles.capCard} data-size="wide">
            <div className={styles.capContent}>
              <div className={styles.capIndex}>04</div>
              <h3 className={styles.capTitle}>Focus Protection</h3>
              <p className={styles.capDesc}>
                Automated time blocking preserves your deep work sessions.
              </p>
              <div className={styles.capMetric}>
                <span className={styles.metricValue}>12hrs</span>
                <span className={styles.metricLabel}>focus time weekly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Security */}
      <section className={styles.security}>
        <div className={styles.securityGrid}>
          <div className={styles.securityLabel}>
            <span className={styles.labelNumber}>03</span>
            <span className={styles.labelText}>Security</span>
          </div>
          
          <div className={styles.securityList}>
            <div className={styles.secItem}>SOC 2 Type II</div>
            <div className={styles.secItem}>End-to-End Encryption</div>
            <div className={styles.secItem}>OAuth 2.0</div>
            <div className={styles.secItem}>Audit Logs</div>
          </div>
        </div>
      </section>

      {/* Artistic CTA */}
      <section className={styles.finalSection}>
        <div className={styles.ctaExperimental}>
          <div className={styles.ctaFrame}></div>
          <div className={styles.ctaNumber}>04</div>
          <h2 className={styles.ctaTitle}>
            Ready to<br />begin?
          </h2>
          <Link to="/product" className={styles.ctaLink}>
            <span>Start Trial</span>
            <div className={styles.ctaLinkLine}></div>
          </Link>
          <p className={styles.ctaNote}>14 days · No card required</p>
        </div>
      </section>

      {/* Experimental Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>AirThreads</div>
            <p className={styles.footerTagline}>
              AI-powered productivity
              <br />
              for modern professionals
            </p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <div className={styles.footerLabel}>Product</div>
              <Link to="/product" className={styles.footerLink}>Features</Link>
              <Link to="/product" className={styles.footerLink}>Pricing</Link>
              <Link to="/integrations" className={styles.footerLink}>Integrations</Link>
            </div>

            <div className={styles.footerColumn}>
              <div className={styles.footerLabel}>Company</div>
              <Link to="/about" className={styles.footerLink}>About</Link>
              <Link to="/about" className={styles.footerLink}>Contact</Link>
              <Link to="/about" className={styles.footerLink}>Careers</Link>
            </div>

            <div className={styles.footerColumn}>
              <div className={styles.footerLabel}>Legal</div>
              <a href="#" className={styles.footerLink}>Privacy</a>
              <a href="#" className={styles.footerLink}>Terms</a>
              <a href="#" className={styles.footerLink}>Security</a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerCopyright}>
            © 2025 AirThreads. All rights reserved.
          </div>
          <div className={styles.footerMeta}>
            Designed by concept art studio
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
