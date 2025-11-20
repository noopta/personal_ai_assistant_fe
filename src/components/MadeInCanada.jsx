import React from 'react';
import { Link } from 'react-router-dom';

const MadeInCanada = () => {
  const glassFooterStyles = {
    footer: {
      marginTop: '120px',
      borderTop: '1px solid var(--border)',
      background: 'transparent',
      position: 'relative'
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '60px 40px 40px'
    },
    footerMain: {
      display: 'grid',
      gridTemplateColumns: '2fr 3fr',
      gap: '60px',
      marginBottom: '50px'
    },
    footerBrand: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'flex-start'
    },
    brandName: {
      fontSize: '24px',
      fontWeight: '700',
      color: 'var(--foreground)',
      margin: 0,
      letterSpacing: '-0.02em'
    },
    brandTagline: {
      fontSize: '15px',
      color: 'var(--muted-foreground)',
      lineHeight: 1.6,
      margin: 0,
      maxWidth: '280px',
      textAlign: 'left'
    },
    footerLinks: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '40px'
    },
    footerColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      alignItems: 'flex-start'
    },
    columnTitle: {
      fontSize: '13px',
      fontWeight: '600',
      color: 'var(--muted-foreground)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      margin: 0,
      padding: '8px 0'
    },
    footerLink: {
      fontSize: '15px',
      color: 'var(--muted-foreground)',
      textDecoration: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      minHeight: '44px',
      padding: '8px 0',
      position: 'relative'
    },
    footerBottom: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '30px',
      borderTop: '1px solid var(--border)',
      position: 'relative'
    },
    copyrightText: {
      fontSize: '14px',
      color: 'var(--muted-foreground)'
    },
    footerMade: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: 'var(--muted-foreground)'
    }
  };

  return (
    <>
      <footer style={glassFooterStyles.footer}>
        <div style={glassFooterStyles.footerContent}>
          <div style={glassFooterStyles.footerMain} className="footer-main">
            <div style={glassFooterStyles.footerBrand}>
              <h3 style={glassFooterStyles.brandName}>AirThreads</h3>
              <p style={glassFooterStyles.brandTagline}>AI-powered assistant to grow your productivity</p>
            </div>
            
            <div style={glassFooterStyles.footerLinks} className="footer-links">
              <div style={glassFooterStyles.footerColumn}>
                <h4 style={glassFooterStyles.columnTitle}>Product</h4>
                <Link to="/product" style={glassFooterStyles.footerLink} className="footer-link">Chat Interface</Link>
                <Link to="/integrations" style={glassFooterStyles.footerLink} className="footer-link">Integrations</Link>
              </div>
              
              <div style={glassFooterStyles.footerColumn}>
                <h4 style={glassFooterStyles.columnTitle}>Company</h4>
                <Link to="/about" style={glassFooterStyles.footerLink} className="footer-link">About</Link>
              </div>
              
              <div style={glassFooterStyles.footerColumn}>
                <h4 style={glassFooterStyles.columnTitle}>Integrations</h4>
                <span style={glassFooterStyles.footerLink}>Gmail</span>
                <span style={glassFooterStyles.footerLink}>Google Calendar</span>
                <span style={glassFooterStyles.footerLink}>Notion (Coming Soon)</span>
              </div>
            </div>
          </div>
          
          <div style={glassFooterStyles.footerBottom} className="footer-bottom">
            <div>
              <span style={glassFooterStyles.copyrightText}>© {new Date().getFullYear()} AirThreads. All rights reserved.</span>
            </div>
            <div style={glassFooterStyles.footerMade}>
              <span role="img" aria-label="heart">❤️</span>
              <span>Proudly built in Toronto, Ontario</span>
              <span role="img" aria-label="Canada flag">🇨🇦</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .footer-link:hover {
          color: var(--primary) !important;
          transform: translateX(2px);
        }
        
        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          .footer-links {
            grid-template-columns: 1fr !important;
          }
          
          .footer-bottom {
            flex-direction: column !important;
            gap: 20px !important;
            text-align: center !important;
          }
        }
      `}</style>
    </>
  );
};

export default MadeInCanada;
