import React from 'react';
import styles from './MadeInCanada.module.css';

const MadeInCanada = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerMain}>
        <div className={styles.footerBrand}>
          <h3 className={styles.brandName}>AirThreads</h3>
          <p className={styles.brandTagline}>AI-powered assistant to grow your productivity</p>
        </div>
        
        <div className={styles.footerLinks}>
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Product</h4>
            <a href="/product" className={styles.footerLink}>Chat Interface</a>
            <a href="/integrations" className={styles.footerLink}>Integrations</a>
          </div>
          
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Company</h4>
            <a href="/about" className={styles.footerLink}>About</a>
          </div>
          
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Integrations</h4>
            <span className={styles.footerLink}>Gmail</span>
            <span className={styles.footerLink}>Google Calendar</span>
            <span className={styles.footerLink}>Notion (Coming Soon)</span>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className={styles.footerCopyright}>
          <span className={styles.copyrightText}>© {new Date().getFullYear()} AirThreads. All rights reserved.</span>
        </div>
        <div className={styles.footerMade}>
          <span role="img" aria-label="heart">❤️</span>
          <span>Proudly built in Toronto, Ontario</span>
          <span role="img" aria-label="Canada flag">🇨🇦</span>
        </div>
      </div>
    </div>
  </footer>
);

export default MadeInCanada; 