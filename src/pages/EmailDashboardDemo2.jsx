import { useState, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { mockEmails, emailCategories } from '../data/mockEmailData';
import styles from './EmailDashboardDemo2.module.css';

function EmailDashboardDemo2() {
  const { isDark } = useTheme();
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [viewMode, setViewMode] = useState('urgency');
  const [expandedColumns, setExpandedColumns] = useState({});

  const urgencyConfig = {
    high: { label: 'Urgent', color: '#dc2626', icon: '🔴', description: 'Needs immediate attention' },
    medium: { label: 'Important', color: '#f59e0b', icon: '🟡', description: 'Should address soon' },
    low: { label: 'Low Priority', color: '#22c55e', icon: '🟢', description: 'Can wait' },
  };

  const groupedEmails = useMemo(() => {
    if (viewMode === 'urgency') {
      return {
        high: mockEmails.filter(e => e.urgency === 'high').slice(0, 50),
        medium: mockEmails.filter(e => e.urgency === 'medium').slice(0, 50),
        low: mockEmails.filter(e => e.urgency === 'low').slice(0, 50),
      };
    } else {
      const grouped = {};
      Object.keys(emailCategories).forEach(cat => {
        grouped[cat] = mockEmails.filter(e => e.category === cat).slice(0, 30);
      });
      return grouped;
    }
  }, [viewMode]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const toggleColumn = (key) => {
    setExpandedColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const columnConfig = viewMode === 'urgency' ? urgencyConfig : emailCategories;

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            <span className={styles.titleIcon}>📊</span>
            Priority Board
          </h1>
          <span className={styles.badge}>Demo 2: Kanban View</span>
        </div>
        <div className={styles.headerControls}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.toggleBtn} ${viewMode === 'urgency' ? styles.active : ''}`}
              onClick={() => setViewMode('urgency')}
            >
              <span>🎯</span> By Urgency
            </button>
            <button
              className={`${styles.toggleBtn} ${viewMode === 'category' ? styles.active : ''}`}
              onClick={() => setViewMode('category')}
            >
              <span>📁</span> By Category
            </button>
          </div>
        </div>
      </header>

      <div className={styles.boardContainer}>
        <div className={styles.board}>
          {Object.entries(groupedEmails).map(([key, emails]) => {
            const config = columnConfig[key];
            const isExpanded = expandedColumns[key];
            const displayEmails = isExpanded ? emails : emails.slice(0, 5);
            const unreadCount = emails.filter(e => !e.isRead).length;

            return (
              <div key={key} className={styles.column} style={{ '--column-color': config.color }}>
                <div className={styles.columnHeader}>
                  <div className={styles.columnTitle}>
                    <span className={styles.columnIcon}>{config.icon}</span>
                    <span>{config.label}</span>
                    <span className={styles.columnCount}>{emails.length}</span>
                    {unreadCount > 0 && (
                      <span className={styles.unreadBadge}>{unreadCount} new</span>
                    )}
                  </div>
                  <p className={styles.columnDescription}>{config.description}</p>
                </div>

                <div className={styles.columnContent}>
                  {displayEmails.map(email => (
                    <button
                      key={email.id}
                      className={`${styles.emailCard} ${!email.isRead ? styles.unread : ''} ${selectedEmail?.id === email.id ? styles.selected : ''}`}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className={styles.cardTop}>
                        <span className={styles.cardFrom}>{email.from.split('@')[0]}</span>
                        <span className={styles.cardDate}>{formatDate(email.receivedAt)}</span>
                      </div>
                      <div className={styles.cardSubject}>{email.subject}</div>
                      <div className={styles.cardSnippet}>{email.snippet}</div>
                      <div className={styles.cardFooter}>
                        {viewMode === 'urgency' && (
                          <span className={styles.categoryTag} style={{ background: emailCategories[email.category].color }}>
                            {emailCategories[email.category].icon}
                          </span>
                        )}
                        {viewMode === 'category' && (
                          <span className={styles.urgencyTag} data-urgency={email.urgency}>
                            {email.urgency === 'high' ? '🔴' : email.urgency === 'medium' ? '🟡' : '🟢'}
                          </span>
                        )}
                        <div className={styles.cardIcons}>
                          {email.isStarred && <span>⭐</span>}
                          {email.hasAttachment && <span>📎</span>}
                        </div>
                      </div>
                    </button>
                  ))}

                  {emails.length > 5 && (
                    <button
                      className={styles.showMoreBtn}
                      onClick={() => toggleColumn(key)}
                    >
                      {isExpanded ? (
                        <>Show Less <span>↑</span></>
                      ) : (
                        <>Show {emails.length - 5} More <span>↓</span></>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedEmail && (
        <div className={styles.modal} onClick={() => setSelectedEmail(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedEmail(null)}>×</button>
            
            <div className={styles.modalHeader}>
              <div className={styles.modalTags}>
                <span className={styles.modalCategoryTag} style={{ background: emailCategories[selectedEmail.category].color }}>
                  {emailCategories[selectedEmail.category].icon} {emailCategories[selectedEmail.category].label}
                </span>
                <span className={styles.modalUrgencyTag} data-urgency={selectedEmail.urgency}>
                  {selectedEmail.urgency === 'high' ? '🔴 Urgent' : selectedEmail.urgency === 'medium' ? '🟡 Important' : '🟢 Low Priority'}
                </span>
              </div>
              <h2 className={styles.modalSubject}>{selectedEmail.subject}</h2>
              <div className={styles.modalMeta}>
                <div className={styles.avatar}>
                  {selectedEmail.from.charAt(0).toUpperCase()}
                </div>
                <div className={styles.metaInfo}>
                  <span className={styles.modalFrom}>{selectedEmail.from}</span>
                  <span className={styles.modalDate}>{new Date(selectedEmail.receivedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className={styles.modalBody}>
              <p>{selectedEmail.snippet}</p>
              <div className={styles.placeholderContent}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.primaryAction}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Reply
              </button>
              <button className={styles.secondaryAction}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h6" />
                  <path d="M21 21l-6-6m6 0v6h-6" />
                </svg>
                Forward
              </button>
              <button className={styles.secondaryAction}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Create Event
              </button>
              <button className={styles.dangerAction}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
                Archive
              </button>
            </div>

            {selectedEmail.category === 'meetings' && (
              <div className={styles.aiSuggestion}>
                <div className={styles.suggestionHeader}>
                  <span className={styles.aiIcon}>✨</span>
                  <span>AI Suggestion</span>
                </div>
                <p>This appears to be a meeting request. Would you like to:</p>
                <div className={styles.suggestionActions}>
                  <button className={styles.suggestionBtn}>📅 Add to Calendar</button>
                  <button className={styles.suggestionBtn}>✉️ Send Availability</button>
                  <button className={styles.suggestionBtn}>🔄 Suggest Reschedule</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles.floatingStats}>
        <div className={styles.statItem}>
          <span className={styles.statIcon}>📥</span>
          <span className={styles.statValue}>{mockEmails.length}</span>
          <span className={styles.statLabel}>Total</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statIcon}>📩</span>
          <span className={styles.statValue}>{mockEmails.filter(e => !e.isRead).length}</span>
          <span className={styles.statLabel}>Unread</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statIcon}>🔴</span>
          <span className={styles.statValue}>{mockEmails.filter(e => e.urgency === 'high').length}</span>
          <span className={styles.statLabel}>Urgent</span>
        </div>
      </div>
    </div>
  );
}

export default EmailDashboardDemo2;
