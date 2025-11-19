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
      {/* Custom Cursor */}
      <div 
        className={styles.customCursor}
        style={{
          transform: `translate(calc(${mousePos.x * 10}px), calc(${mousePos.y * 10}px))`
        }}
      />

      {/* Experimental Hero */}
      <section className={styles.hero}>
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

        {/* Mid Layer - Geometric shapes with parallax */}
        <div 
          className={styles.midLayer}
          style={{
            transform: `translate3d(${mousePos.x * -20}px, ${scrollY * 0.3 + mousePos.y * -20}px, -50px)`
          }}
        >
          <div className={styles.floatingGrid}>
            <div className={styles.gridLine} style={{ '--delay': '0s' }}></div>
            <div className={styles.gridLine} style={{ '--delay': '0.5s' }}></div>
            <div className={styles.gridLine} style={{ '--delay': '1s' }}></div>
          </div>
          
          <div className={styles.geometricCluster}>
            <div className={styles.circle1}></div>
            <div className={styles.square1}></div>
            <div className={styles.triangle1}></div>
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
          <h2 className={styles.ctaTitle}>
            Ready to begin?
          </h2>
          <Link to="/product" className={styles.ctaLink}>
            <span>Start Trial</span>
            <div className={styles.ctaLinkLine}></div>
          </Link>
          <p className={styles.ctaNote}>14 days · No card required</p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
