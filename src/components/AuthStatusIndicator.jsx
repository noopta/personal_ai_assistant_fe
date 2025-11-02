import React from 'react';
import styles from './AuthStatusIndicator.module.css';

const AuthStatusIndicator = ({ isGmailAuthenticated, isCalendarAuthenticated }) => {
  return (
    <div className={styles.authStatusContainer}>
      <div className={styles.statusTitle}>
        <span className={styles.statusIcon}>🔗</span>
        Connected Services
      </div>
      
      <div className={styles.statusGrid}>
        <div className={`${styles.statusItem} ${isGmailAuthenticated ? styles.connected : styles.disconnected}`}>
          <div className={styles.serviceIcon}>
            {isGmailAuthenticated ? '📧' : '📧'}
          </div>
          <div className={styles.serviceInfo}>
            <div className={styles.serviceName}>Gmail</div>
            <div className={styles.serviceStatus}>
              {isGmailAuthenticated ? 'Connected' : 'Not Connected'}
            </div>
          </div>
          <div className={styles.statusIndicator}>
            <div className={`${styles.indicator} ${isGmailAuthenticated ? styles.active : styles.inactive}`}></div>
          </div>
        </div>
        
        <div className={`${styles.statusItem} ${isCalendarAuthenticated ? styles.connected : styles.disconnected}`}>
          <div className={styles.serviceIcon}>
            {isCalendarAuthenticated ? '📅' : '📅'}
          </div>
          <div className={styles.serviceInfo}>
            <div className={styles.serviceName}>Google Calendar</div>
            <div className={styles.serviceStatus}>
              {isCalendarAuthenticated ? 'Connected' : 'Not Connected'}
            </div>
          </div>
          <div className={styles.statusIndicator}>
            <div className={`${styles.indicator} ${isCalendarAuthenticated ? styles.active : styles.inactive}`}></div>
          </div>
        </div>
      </div>
      
      {isGmailAuthenticated && isCalendarAuthenticated && (
        <div className={styles.allConnected}>
          <span className={styles.checkmark}>✅</span>
          All services connected and ready!
        </div>
      )}
    </div>
  );
};

export default AuthStatusIndicator; 