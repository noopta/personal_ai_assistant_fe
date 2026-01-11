import { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { mockEmails, emailCategories } from '../data/mockEmailData';
import styles from './EmailDashboardDemo4.module.css';

function EmailDashboardDemo4() {
  const { isDark } = useTheme();
  const [activeCluster, setActiveCluster] = useState(null);
  const [hoveredBubble, setHoveredBubble] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, []);

  const clusters = useMemo(() => {
    return Object.entries(emailCategories).map(([key, config], index) => {
      const emails = mockEmails.filter(e => e.category === key);
      const unreadCount = emails.filter(e => !e.isRead).length;
      const urgentCount = emails.filter(e => e.urgency === 'high').length;
      
      const angle = (index / Object.keys(emailCategories).length) * Math.PI * 2 - Math.PI / 2;
      const radius = 180;
      const x = 50 + Math.cos(angle) * (radius / 5);
      const y = 50 + Math.sin(angle) * (radius / 5);
      
      return {
        key,
        ...config,
        emails: emails.slice(0, 30),
        total: emails.length,
        unreadCount,
        urgentCount,
        x,
        y,
        size: 60 + emails.length * 0.3,
      };
    });
  }, []);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMins = Math.floor((now - date) / (1000 * 60));
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
      <div className={styles.gradientBg} />
      
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoOrb} />
          <span className={styles.logoText}>Orbit</span>
        </div>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{mockEmails.length}</span>
            <span className={styles.statLabel}>total</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>{mockEmails.filter(e => !e.isRead).length}</span>
            <span className={styles.statLabel}>unread</span>
          </div>
        </div>
      </header>

      {!activeCluster ? (
        <div className={styles.orbitView} key={animationKey}>
          <div className={styles.centerOrb}>
            <span className={styles.centerIcon}>✦</span>
            <span className={styles.centerLabel}>Inbox</span>
          </div>
          
          {clusters.map((cluster, i) => (
            <button
              key={cluster.key}
              className={`${styles.clusterBubble} ${hoveredBubble === cluster.key ? styles.hovered : ''}`}
              style={{
                '--x': `${cluster.x}%`,
                '--y': `${cluster.y}%`,
                '--size': `${cluster.size + 20}px`,
                '--color': cluster.color,
                '--delay': `${i * 0.1}s`,
              }}
              onMouseEnter={() => setHoveredBubble(cluster.key)}
              onMouseLeave={() => setHoveredBubble(null)}
              onClick={() => setActiveCluster(cluster)}
            >
              <span className={styles.bubbleIcon}>{cluster.icon}</span>
              <span className={styles.bubbleLabel}>{cluster.label}</span>
              <span className={styles.bubbleCount}>{cluster.total}</span>
              {cluster.unreadCount > 0 && (
                <span className={styles.bubbleUnread}>{cluster.unreadCount}</span>
              )}
            </button>
          ))}
          
          <div className={styles.orbitRings}>
            <div className={styles.ring} style={{ '--size': '200px' }} />
            <div className={styles.ring} style={{ '--size': '320px' }} />
            <div className={styles.ring} style={{ '--size': '440px' }} />
          </div>
        </div>
      ) : (
        <div className={styles.clusterView}>
          <button className={styles.backBtn} onClick={() => setActiveCluster(null)}>
            <span>←</span> Back to Orbit
          </button>
          
          <div className={styles.clusterHeader} style={{ '--color': activeCluster.color }}>
            <span className={styles.clusterIcon}>{activeCluster.icon}</span>
            <h1 className={styles.clusterTitle}>{activeCluster.label}</h1>
            <span className={styles.clusterCount}>{activeCluster.total} emails</span>
          </div>
          
          <div className={styles.emailGrid}>
            {activeCluster.emails.map((email, i) => (
              <button
                key={email.id}
                className={`${styles.emailBubble} ${!email.isRead ? styles.unread : ''}`}
                style={{ 
                  '--delay': `${i * 0.03}s`,
                  '--color': activeCluster.color
                }}
                onClick={() => setSelectedEmail(email)}
              >
                <div className={styles.bubbleContent}>
                  <div className={styles.bubbleTop}>
                    <span className={styles.bubbleSender}>
                      {email.from.split('@')[0].slice(0, 12)}
                    </span>
                    <span className={styles.bubbleTime}>{formatTimeAgo(email.receivedAt)}</span>
                  </div>
                  <span className={styles.bubbleSubject}>{email.subject}</span>
                  {email.urgency === 'high' && <span className={styles.urgentDot} />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedEmail && (
        <div className={styles.modal} onClick={() => setSelectedEmail(null)}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <div className={styles.modalGlow} style={{ '--color': emailCategories[selectedEmail.category]?.color }} />
            
            <button className={styles.modalClose} onClick={() => setSelectedEmail(null)}>
              <span>×</span>
            </button>
            
            <div className={styles.modalHeader}>
              <div className={styles.modalAvatar} style={{ '--color': emailCategories[selectedEmail.category]?.color }}>
                {selectedEmail.from.charAt(0).toUpperCase()}
              </div>
              <div className={styles.modalMeta}>
                <span className={styles.modalFrom}>{selectedEmail.from}</span>
                <span className={styles.modalTime}>
                  {new Date(selectedEmail.receivedAt).toLocaleString()}
                </span>
              </div>
            </div>
            
            <h1 className={styles.modalSubject}>{selectedEmail.subject}</h1>
            
            <div className={styles.modalTags}>
              <span 
                className={styles.modalTag}
                style={{ '--color': emailCategories[selectedEmail.category]?.color }}
              >
                {emailCategories[selectedEmail.category]?.icon} {emailCategories[selectedEmail.category]?.label}
              </span>
              <span className={`${styles.modalUrgency} ${styles[selectedEmail.urgency]}`}>
                {selectedEmail.urgency}
              </span>
            </div>
            
            <div className={styles.modalBody}>
              <p>{selectedEmail.snippet}</p>
            </div>
            
            <div className={styles.modalActions}>
              <button className={styles.modalPrimary}>
                <span>↩</span> Reply
              </button>
              <button className={styles.modalSecondary}>
                <span>↗</span> Forward
              </button>
              <button className={styles.modalSecondary}>
                <span>◎</span> Archive
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.hint}>
        {!activeCluster 
          ? 'Click a bubble to explore category' 
          : 'Click an email to view details'
        }
      </div>
    </div>
  );
}

export default EmailDashboardDemo4;
