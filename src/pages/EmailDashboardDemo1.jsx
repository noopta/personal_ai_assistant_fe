import { useState, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { mockEmails, emailCategories, getCategoryCounts, getUrgencyCounts } from '../data/mockEmailData';
import styles from './EmailDashboardDemo1.module.css';

function EmailDashboardDemo1() {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryCounts = useMemo(() => getCategoryCounts(mockEmails), []);
  const urgencyCounts = useMemo(() => getUrgencyCounts(mockEmails), []);

  const filteredEmails = useMemo(() => {
    let emails = mockEmails;
    
    if (selectedCategory) {
      emails = emails.filter(e => e.category === selectedCategory);
    }
    
    if (filter === 'unread') {
      emails = emails.filter(e => !e.isRead);
    } else if (filter === 'starred') {
      emails = emails.filter(e => e.isStarred);
    } else if (filter === 'urgent') {
      emails = emails.filter(e => e.urgency === 'high');
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      emails = emails.filter(e => 
        e.subject.toLowerCase().includes(query) ||
        e.from.toLowerCase().includes(query) ||
        e.snippet.toLowerCase().includes(query)
      );
    }
    
    return emails;
  }, [selectedCategory, filter, searchQuery]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const totalUnread = mockEmails.filter(e => !e.isRead).length;

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            <span className={styles.titleIcon}>📬</span>
            Smart Inbox
          </h1>
          <span className={styles.badge}>Demo 1: Category Cards</span>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{mockEmails.length}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{totalUnread}</span>
            <span className={styles.statLabel}>Unread</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{urgencyCounts.high}</span>
            <span className={styles.statLabel}>Urgent</span>
          </div>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filters}>
          {['all', 'unread', 'starred', 'urgent'].map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' && '📥'}
              {f === 'unread' && '📩'}
              {f === 'starred' && '⭐'}
              {f === 'urgent' && '🔴'}
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {!selectedCategory ? (
        <div className={styles.categoryGrid}>
          {Object.entries(emailCategories).map(([key, cat]) => {
            const count = categoryCounts[key];
            return (
              <button
                key={key}
                className={styles.categoryCard}
                onClick={() => setSelectedCategory(key)}
                style={{ '--cat-color': cat.color }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>{cat.icon}</span>
                  <div className={styles.cardBadges}>
                    {count.unread > 0 && (
                      <span className={styles.unreadBadge}>{count.unread}</span>
                    )}
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{cat.label}</h3>
                <p className={styles.cardDescription}>{cat.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.emailCount}>{count.total} emails</span>
                  <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className={styles.emailListView}>
          <div className={styles.listHeader}>
            <button className={styles.backBtn} onClick={() => { setSelectedCategory(null); setSelectedEmail(null); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back to Categories
            </button>
            <div className={styles.categoryBanner} style={{ '--cat-color': emailCategories[selectedCategory].color }}>
              <span className={styles.bannerIcon}>{emailCategories[selectedCategory].icon}</span>
              <span className={styles.bannerTitle}>{emailCategories[selectedCategory].label}</span>
              <span className={styles.bannerCount}>{filteredEmails.length} emails</span>
            </div>
          </div>

          <div className={styles.splitView}>
            <div className={styles.emailList}>
              {filteredEmails.map(email => (
                <button
                  key={email.id}
                  className={`${styles.emailItem} ${!email.isRead ? styles.unread : ''} ${selectedEmail?.id === email.id ? styles.selected : ''}`}
                  onClick={() => setSelectedEmail(email)}
                >
                  <div className={styles.emailLeft}>
                    <div className={styles.urgencyDot} data-urgency={email.urgency} />
                    <div className={styles.emailContent}>
                      <div className={styles.emailTop}>
                        <span className={styles.emailFrom}>{email.from.split('@')[0]}</span>
                        <span className={styles.emailDate}>{formatDate(email.receivedAt)}</span>
                      </div>
                      <div className={styles.emailSubject}>{email.subject}</div>
                      <div className={styles.emailSnippet}>{email.snippet}</div>
                    </div>
                  </div>
                  <div className={styles.emailRight}>
                    {email.isStarred && <span className={styles.star}>⭐</span>}
                    {email.hasAttachment && <span className={styles.attachment}>📎</span>}
                  </div>
                </button>
              ))}
            </div>

            {selectedEmail && (
              <div className={styles.emailPreview}>
                <div className={styles.previewHeader}>
                  <h2 className={styles.previewSubject}>{selectedEmail.subject}</h2>
                  <div className={styles.previewMeta}>
                    <span className={styles.previewFrom}>From: {selectedEmail.from}</span>
                    <span className={styles.previewDate}>{new Date(selectedEmail.receivedAt).toLocaleString()}</span>
                  </div>
                  <div className={styles.previewTags}>
                    <span className={styles.tag} style={{ background: emailCategories[selectedEmail.category].color }}>
                      {emailCategories[selectedEmail.category].icon} {emailCategories[selectedEmail.category].label}
                    </span>
                    <span className={styles.urgencyTag} data-urgency={selectedEmail.urgency}>
                      {selectedEmail.urgency === 'high' ? '🔴 Urgent' : selectedEmail.urgency === 'medium' ? '🟡 Medium' : '🟢 Low'}
                    </span>
                  </div>
                </div>
                <div className={styles.previewBody}>
                  <p>{selectedEmail.snippet}</p>
                  <p className={styles.previewPlaceholder}>
                    [Full email content would be displayed here in the real implementation]
                  </p>
                </div>
                <div className={styles.previewActions}>
                  <button className={styles.actionBtn}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Reply
                  </button>
                  <button className={styles.actionBtn}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h6" />
                      <path d="M21 21l-6-6m6 0v6h-6" />
                    </svg>
                    Forward
                  </button>
                  <button className={styles.actionBtn}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Create Event
                  </button>
                  <button className={`${styles.actionBtn} ${styles.archiveBtn}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                    Archive
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailDashboardDemo1;
