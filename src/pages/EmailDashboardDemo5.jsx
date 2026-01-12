import React, { useState, useMemo, useRef, useEffect } from 'react';
import { mockEmails, emailCategories } from '../data/mockEmailData';
import styles from './EmailDashboardDemo5.module.css';

const SIDEBAR_CATEGORIES = [
  { id: 'all', label: 'All Mail' },
  { id: 'work', label: 'Work' },
  { id: 'personal', label: 'Personal' },
  { id: 'finance', label: 'Finance' },
  { id: 'urgent', label: 'Urgent' },
  { id: 'social', label: 'Social' },
];

const CATEGORY_MAPPING = {
  all: null,
  work: ['meetings', 'interviews'],
  personal: ['personal', 'social'],
  finance: ['bills', 'receipts'],
  urgent: ['urgent'],
  social: ['social', 'newsletters', 'promotional'],
};

export default function EmailDashboardDemo5() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiPanelOpen, setAiPanelOpen] = useState(true);
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI email assistant. Ask me to find emails, summarize threads, or help you draft responses. Try: \"Show me urgent emails\" or \"Summarize my work emails\""
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [starredEmails, setStarredEmails] = useState(new Set());
  const [archivedEmails, setArchivedEmails] = useState(new Set());
  const chatEndRef = useRef(null);

  const filteredEmails = useMemo(() => {
    let emails = mockEmails.filter(e => !archivedEmails.has(e.id));
    
    if (selectedCategory !== 'all') {
      const cats = CATEGORY_MAPPING[selectedCategory];
      if (cats) {
        emails = emails.filter(e => cats.includes(e.category));
      }
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      emails = emails.filter(e => 
        e.subject.toLowerCase().includes(q) ||
        (e.from || '').toLowerCase().includes(q) ||
        (e.snippet || '').toLowerCase().includes(q)
      );
    }
    
    return emails.slice(0, 50);
  }, [selectedCategory, searchQuery, archivedEmails]);

  const categoryCounts = useMemo(() => {
    const counts = { all: mockEmails.filter(e => !archivedEmails.has(e.id)).length };
    Object.keys(CATEGORY_MAPPING).forEach(cat => {
      if (cat !== 'all') {
        const cats = CATEGORY_MAPPING[cat];
        counts[cat] = mockEmails.filter(e => !archivedEmails.has(e.id) && cats?.includes(e.category)).length;
      }
    });
    return counts;
  }, [archivedEmails]);

  const unreadCount = useMemo(() => {
    return filteredEmails.filter(e => !e.isRead).length;
  }, [filteredEmails]);

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMins = Math.floor((now - date) / (1000 * 60));
    if (diffMins < 60) return `${diffMins} min`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hr`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  const getSenderName = (email) => {
    const fromField = email.from || '';
    const name = fromField.split('@')[0].replace(/[._-]/g, ' ');
    return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getAvatarColor = (name) => {
    if (!name) return '#6366f1';
    const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getPriorityDots = (email) => {
    const dots = [];
    if (email.urgency === 'high') dots.push({ color: '#ef4444' });
    if (!email.isRead) dots.push({ color: '#3b82f6' });
    if (email.hasAttachment) dots.push({ color: '#f59e0b' });
    return dots;
  };

  const toggleStar = (e, emailId) => {
    e.stopPropagation();
    setStarredEmails(prev => {
      const next = new Set(prev);
      if (next.has(emailId)) next.delete(emailId);
      else next.add(emailId);
      return next;
    });
  };

  const archiveEmail = (e, emailId) => {
    e.stopPropagation();
    setArchivedEmails(prev => new Set([...prev, emailId]));
    if (selectedEmail?.id === emailId) setSelectedEmail(null);
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim() || aiLoading) return;

    const userMessage = aiInput.trim();
    setAiMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setAiInput('');
    setAiLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_AGENT_API_URL || ''}/agent-rag-demo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ query: userMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.response || data.message || "I processed your request."
        }]);
      } else {
        setAiMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I couldn't process that request. Try asking about emails, meetings, or tasks."
        }]);
      }
    } catch {
      setAiMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting. Please try again in a moment."
      }]);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ''}`}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>AirMail</span>
            <span className={styles.logoTag}>AI organized</span>
          </div>
        </div>

        <nav className={styles.nav}>
          {SIDEBAR_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`${styles.navItem} ${selectedCategory === cat.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className={styles.navLabel}>{cat.label}</span>
              {categoryCounts[cat.id] > 0 && (
                <span className={styles.navCount}>{categoryCounts[cat.id]}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.unreadBadge}>{unreadCount} unread</span>
          </div>
          <div className={styles.headerRight}>
            <button 
              className={styles.themeToggle} 
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              )}
            </button>
            <div className={styles.avatar}>A</div>
          </div>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.toolbarActions}>
            <button className={styles.toolbarBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v16H4z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9h6v6H9z"/>
              </svg>
            </button>
            <button className={styles.toolbarBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.emailList}>
            {filteredEmails.map(email => {
              const senderName = getSenderName(email);
              return (
                <button
                  key={email.id}
                  className={`${styles.emailRow} ${selectedEmail?.id === email.id ? styles.selected : ''} ${!email.isRead ? styles.unread : ''}`}
                  onClick={() => setSelectedEmail(email)}
                >
                  <div 
                    className={styles.emailAvatar}
                    style={{ background: getAvatarColor(senderName) }}
                  >
                    {getInitials(senderName)}
                  </div>
                  <div className={styles.emailContent}>
                    <div className={styles.emailHeader}>
                      <span className={styles.emailSender}>
                        {senderName}
                        {getPriorityDots(email).map((dot, i) => (
                          <span key={i} className={styles.priorityDot} style={{ background: dot.color }} />
                        ))}
                      </span>
                      <span className={styles.emailTime}>{formatTime(email.receivedAt)}</span>
                    </div>
                    <div className={styles.emailSubject}>{email.subject}</div>
                    <div className={styles.emailPreview}>{email.snippet}</div>
                  </div>
                  <div className={styles.emailActions}>
                    <span 
                      className={`${styles.starBtn} ${starredEmails.has(email.id) ? styles.starred : ''}`}
                      onClick={(e) => toggleStar(e, email.id)}
                      role="button"
                      tabIndex={0}
                    >
                      {starredEmails.has(email.id) ? '★' : '☆'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedEmail && (
            <div className={styles.emailDetail}>
              <div className={styles.detailHeader}>
                <div className={styles.detailHeaderLeft}>
                  <div 
                    className={styles.detailAvatar}
                    style={{ background: getAvatarColor(getSenderName(selectedEmail)) }}
                  >
                    {getInitials(getSenderName(selectedEmail))}
                  </div>
                  <div className={styles.detailSenderInfo}>
                    <div className={styles.detailSenderRow}>
                      <span className={styles.detailSender}>{getSenderName(selectedEmail)}</span>
                      <span className={styles.detailBadge}>Work</span>
                      {selectedEmail.urgency === 'high' && <span className={styles.detailBadgeUrgent}>Urgent</span>}
                    </div>
                    <span className={styles.detailTime}>{formatTime(selectedEmail.receivedAt)} ago</span>
                  </div>
                </div>
                <div className={styles.detailHeaderRight}>
                  <button className={styles.iconBtn} onClick={(e) => toggleStar(e, selectedEmail.id)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={starredEmails.has(selectedEmail.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </button>
                  <button className={styles.iconBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  </button>
                  <button className={styles.iconBtn} onClick={() => setSelectedEmail(null)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              </div>

              <h2 className={styles.detailSubject}>{selectedEmail.subject}</h2>

              <div className={styles.aiSummary}>
                <div className={styles.aiSummaryIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                  </svg>
                  <span>AI Summary</span>
                </div>
                <p className={styles.aiSummaryText}>This email requires immediate attention. Consider responding soon.</p>
              </div>

              <div className={styles.detailBody}>
                <p>{selectedEmail.snippet}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Best regards,<br/>{getSenderName(selectedEmail).split(' ')[0]}</p>
              </div>

              <div className={styles.detailFooter}>
                <button className={styles.replyBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
                  Reply
                </button>
                <button className={styles.forwardBtn}>Forward</button>
              </div>
            </div>
          )}
        </div>
      </main>

      <button 
        className={`${styles.aiToggleBtn} ${aiPanelOpen ? styles.hidden : ''}`}
        onClick={() => setAiPanelOpen(true)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
        </svg>
        AI Assistant
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M14 9l3 3-3 3"/>
        </svg>
      </button>

      {aiPanelOpen && (
        <aside className={styles.aiPanel}>
          <div className={styles.aiHeader}>
            <div className={styles.aiHeaderIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
              </svg>
            </div>
            <div className={styles.aiHeaderText}>
              <div className={styles.aiTitle}>AI Assistant</div>
              <div className={styles.aiSubtitle}>Command your inbox</div>
            </div>
            <button className={styles.aiCloseBtn} onClick={() => setAiPanelOpen(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>

          <div className={styles.aiContent}>
            <div className={styles.aiMessages}>
              {aiMessages.map((msg, i) => (
                <div key={i} className={`${styles.aiMessage} ${styles[msg.role]}`}>
                  {msg.role === 'assistant' && (
                    <div className={styles.aiMessageAvatar}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                      </svg>
                    </div>
                  )}
                  <div className={styles.aiMessageContent}>{msg.content}</div>
                </div>
              ))}
              {aiLoading && (
                <div className={`${styles.aiMessage} ${styles.assistant}`}>
                  <div className={styles.aiMessageAvatar}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  </div>
                  <div className={styles.aiMessageContent}>
                    <span className={styles.typingIndicator}>
                      <span></span><span></span><span></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          <div className={styles.aiFooter}>
            <form className={styles.aiInputForm} onSubmit={handleAiSubmit}>
              <input
                type="text"
                placeholder="Ask AI to help..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className={styles.aiInput}
              />
              <button type="submit" className={styles.aiSendBtn} disabled={aiLoading}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="m22 2-7 20-4-9-9-4 20-7Z"/>
                </svg>
              </button>
            </form>
            <div className={styles.aiHint}>
              Try: "Show urgent emails" or "Summarize inbox"
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
