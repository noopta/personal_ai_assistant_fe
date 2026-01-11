import { useState, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { mockEmails, emailCategories } from '../data/mockEmailData';
import styles from './EmailDashboardDemo3.module.css';

function EmailDashboardDemo3() {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [expandedEmail, setExpandedEmail] = useState(null);

  const filteredEmails = useMemo(() => {
    if (selectedCategory === 'all') return mockEmails.slice(0, 100);
    return mockEmails.filter(e => e.category === selectedCategory).slice(0, 100);
  }, [selectedCategory]);

  const currentEmail = filteredEmails[currentIndex];
  const totalEmails = filteredEmails.length;

  const handleNext = () => {
    if (currentIndex < totalEmails - 1) {
      setSwipeDirection('left');
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setSwipeDirection(null);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSwipeDirection('right');
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setSwipeDirection(null);
      }, 300);
    }
  };

  const handleAction = (action) => {
    setSwipeDirection(action === 'archive' ? 'left' : action === 'star' ? 'up' : 'right');
    setTimeout(() => {
      if (currentIndex < totalEmails - 1) {
        setCurrentIndex(prev => prev + 1);
      }
      setSwipeDirection(null);
    }, 400);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const categories = [
    { key: 'all', label: 'All', count: mockEmails.length },
    ...Object.entries(emailCategories).map(([key, val]) => ({
      key,
      label: val.icon,
      count: mockEmails.filter(e => e.category === key).length
    }))
  ];

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
      <div className={styles.ambient} />
      
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◉</span>
          <span className={styles.logoText}>Focus</span>
        </div>
        <div className={styles.progress}>
          <span className={styles.current}>{currentIndex + 1}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.total}>{totalEmails}</span>
        </div>
      </header>

      <nav className={styles.categoryNav}>
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`${styles.categoryPill} ${selectedCategory === cat.key ? styles.active : ''}`}
            onClick={() => { setSelectedCategory(cat.key); setCurrentIndex(0); }}
          >
            {cat.key === 'all' ? 'All' : cat.label}
            <span className={styles.pillCount}>{cat.count}</span>
          </button>
        ))}
      </nav>

      <div className={styles.cardStack}>
        {[2, 1, 0].map(offset => {
          const email = filteredEmails[currentIndex + offset];
          if (!email) return null;
          
          const isActive = offset === 0;
          const scale = 1 - offset * 0.05;
          const translateY = offset * 12;
          const opacity = 1 - offset * 0.3;
          
          return (
            <div
              key={email.id}
              className={`${styles.card} ${isActive ? styles.activeCard : ''} ${isActive && swipeDirection ? styles[`swipe${swipeDirection.charAt(0).toUpperCase() + swipeDirection.slice(1)}`] : ''}`}
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                opacity,
                zIndex: 10 - offset,
              }}
              onClick={() => isActive && setExpandedEmail(email)}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <div 
                    className={styles.categoryDot} 
                    style={{ background: emailCategories[email.category]?.color }}
                  />
                  <span className={styles.cardDate}>{formatDate(email.receivedAt)}</span>
                </div>
                
                <div className={styles.senderRow}>
                  <div className={styles.avatar}>
                    {email.from.charAt(0).toUpperCase()}
                  </div>
                  <span className={styles.sender}>{email.from.split('@')[0]}</span>
                </div>
                
                <h2 className={styles.subject}>{email.subject}</h2>
                <p className={styles.snippet}>{email.snippet}</p>
                
                <div className={styles.cardFooter}>
                  <span className={`${styles.urgencyPill} ${styles[email.urgency]}`}>
                    {email.urgency === 'high' ? 'Urgent' : email.urgency === 'medium' ? 'Soon' : 'Later'}
                  </span>
                  {email.hasAttachment && <span className={styles.attachmentIcon}>◎</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.actions}>
        <button 
          className={`${styles.actionBtn} ${styles.archiveBtn}`}
          onClick={() => handleAction('archive')}
          disabled={currentIndex >= totalEmails - 1}
        >
          <span className={styles.actionIcon}>↙</span>
          <span className={styles.actionLabel}>Archive</span>
        </button>
        
        <button 
          className={`${styles.actionBtn} ${styles.starBtn}`}
          onClick={() => handleAction('star')}
        >
          <span className={styles.actionIcon}>★</span>
          <span className={styles.actionLabel}>Save</span>
        </button>
        
        <button 
          className={`${styles.actionBtn} ${styles.replyBtn}`}
          onClick={() => handleAction('reply')}
        >
          <span className={styles.actionIcon}>↗</span>
          <span className={styles.actionLabel}>Reply</span>
        </button>
      </div>

      <div className={styles.navigation}>
        <button 
          className={styles.navBtn} 
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          ←
        </button>
        <div className={styles.navDots}>
          {[...Array(Math.min(5, totalEmails))].map((_, i) => {
            const dotIndex = Math.max(0, Math.min(currentIndex - 2, totalEmails - 5)) + i;
            return (
              <span 
                key={i} 
                className={`${styles.navDot} ${dotIndex === currentIndex ? styles.activeDot : ''}`}
              />
            );
          })}
        </div>
        <button 
          className={styles.navBtn} 
          onClick={handleNext}
          disabled={currentIndex >= totalEmails - 1}
        >
          →
        </button>
      </div>

      {expandedEmail && (
        <div className={styles.overlay} onClick={() => setExpandedEmail(null)}>
          <div className={styles.expandedCard} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setExpandedEmail(null)}>×</button>
            
            <div className={styles.expandedHeader}>
              <div 
                className={styles.expandedCategory}
                style={{ background: emailCategories[expandedEmail.category]?.color }}
              >
                {emailCategories[expandedEmail.category]?.icon} {emailCategories[expandedEmail.category]?.label}
              </div>
              <span className={styles.expandedDate}>
                {new Date(expandedEmail.receivedAt).toLocaleString()}
              </span>
            </div>
            
            <div className={styles.expandedSender}>
              <div className={styles.expandedAvatar}>
                {expandedEmail.from.charAt(0).toUpperCase()}
              </div>
              <span>{expandedEmail.from}</span>
            </div>
            
            <h1 className={styles.expandedSubject}>{expandedEmail.subject}</h1>
            
            <div className={styles.expandedBody}>
              <p>{expandedEmail.snippet}</p>
              <p className={styles.placeholder}>
                Full email content would appear here with rich formatting, 
                inline images, and interactive elements.
              </p>
            </div>
            
            <div className={styles.expandedActions}>
              <button className={styles.primaryBtn}>Reply</button>
              <button className={styles.secondaryBtn}>Forward</button>
              <button className={styles.secondaryBtn}>Archive</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailDashboardDemo3;
