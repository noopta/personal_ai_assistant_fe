import React, { useState, useMemo, useRef, useEffect } from 'react';
import { mockEmails, emailCategories } from '../data/mockEmailData';
import styles from './EmailDashboardDemo5.module.css';

const VIEW_MODES = [
  { id: 'classic', label: 'Classic', icon: '☰' },
  { id: 'clusters', label: 'Clusters', icon: '○' },
  { id: 'timeline', label: 'Timeline', icon: '📅' },
  { id: 'matrix', label: 'Matrix', icon: '▦' },
  { id: 'orbit', label: 'Orbit', icon: '◎' },
  { id: 'cards', label: 'Cards', icon: '▢' },
];

const SIDEBAR_CATEGORIES = [
  { id: 'all', label: 'All Mail', icon: '📥' },
  { id: 'work', label: 'Work', icon: '💼' },
  { id: 'personal', label: 'Personal', icon: '👤' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'urgent', label: 'Urgent', icon: '🔴' },
  { id: 'social', label: 'Social', icon: '👥' },
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
  const [viewMode, setViewMode] = useState('classic');
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
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>✦</div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Lumina</span>
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
              <span className={styles.navIcon}>{cat.icon}</span>
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
          <div className={styles.viewModes}>
            {VIEW_MODES.map(mode => (
              <button
                key={mode.id}
                className={`${styles.viewMode} ${viewMode === mode.id ? styles.active : ''}`}
                onClick={() => setViewMode(mode.id)}
              >
                <span className={styles.viewIcon}>{mode.icon}</span>
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
          <div className={styles.headerRight}>
            <span className={styles.unreadBadge}>{unreadCount} unread</span>
            <div className={styles.avatar}>A</div>
          </div>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.toolbarActions}>
            <button className={styles.toolbarBtn}>⚙️</button>
            <button className={styles.toolbarBtn}>🔄</button>
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
                <button className={styles.backBtn} onClick={() => setSelectedEmail(null)}>←</button>
                <h2 className={styles.detailSubject}>{selectedEmail.subject}</h2>
              </div>
              <div className={styles.detailMeta}>
                <div 
                  className={styles.detailAvatar}
                  style={{ background: getAvatarColor(getSenderName(selectedEmail)) }}
                >
                  {getInitials(getSenderName(selectedEmail))}
                </div>
                <div className={styles.detailSenderInfo}>
                  <span className={styles.detailSender}>{getSenderName(selectedEmail)}</span>
                  <span className={styles.detailEmail}>{selectedEmail.from}</span>
                </div>
                <span className={styles.detailTime}>{formatTime(selectedEmail.receivedAt)}</span>
              </div>
              <div className={styles.detailBody}>
                <p>{selectedEmail.snippet}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                <p>Best regards,<br/>{getSenderName(selectedEmail).split(' ')[0]}</p>
              </div>
              <div className={styles.detailActions}>
                <button className={styles.actionBtn}>
                  <span>↩️</span> Reply
                </button>
                <button className={styles.actionBtn}>
                  <span>↪️</span> Forward
                </button>
                <button className={styles.actionBtn} onClick={(e) => archiveEmail(e, selectedEmail.id)}>
                  <span>📦</span> Archive
                </button>
                <button className={styles.actionBtn}>
                  <span>🗑️</span> Delete
                </button>
                <button 
                  className={`${styles.actionBtn} ${starredEmails.has(selectedEmail.id) ? styles.starred : ''}`}
                  onClick={(e) => toggleStar(e, selectedEmail.id)}
                >
                  <span>{starredEmails.has(selectedEmail.id) ? '★' : '☆'}</span> Star
                </button>
                <button className={styles.actionBtn}>
                  <span>🏷️</span> Label
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <aside className={`${styles.aiPanel} ${aiPanelOpen ? styles.open : ''}`}>
        <button 
          className={styles.aiToggle}
          onClick={() => setAiPanelOpen(!aiPanelOpen)}
        >
          {aiPanelOpen ? '→' : '←'}
          <span className={styles.aiToggleLabel}>AI Assistant</span>
          <span className={styles.aiToggleIcon}>✨</span>
        </button>

        {aiPanelOpen && (
          <div className={styles.aiContent}>
            <div className={styles.aiHeader}>
              <div className={styles.aiHeaderIcon}>✨</div>
              <div>
                <div className={styles.aiTitle}>AI Assistant</div>
                <div className={styles.aiSubtitle}>Command your inbox</div>
              </div>
            </div>

            <div className={styles.aiMessages}>
              {aiMessages.map((msg, i) => (
                <div key={i} className={`${styles.aiMessage} ${styles[msg.role]}`}>
                  {msg.role === 'assistant' && (
                    <div className={styles.aiMessageAvatar}>✨</div>
                  )}
                  <div className={styles.aiMessageContent}>{msg.content}</div>
                </div>
              ))}
              {aiLoading && (
                <div className={`${styles.aiMessage} ${styles.assistant}`}>
                  <div className={styles.aiMessageAvatar}>✨</div>
                  <div className={styles.aiMessageContent}>
                    <span className={styles.typingIndicator}>
                      <span></span><span></span><span></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form className={styles.aiInputForm} onSubmit={handleAiSubmit}>
              <input
                type="text"
                placeholder="Ask AI to help..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className={styles.aiInput}
              />
              <button type="submit" className={styles.aiSendBtn} disabled={aiLoading}>
                ➤
              </button>
            </form>

            <div className={styles.aiSuggestions}>
              Try: "Show urgent emails" or "Summarize inbox"
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
