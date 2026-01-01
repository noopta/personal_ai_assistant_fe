import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './ChatMessage.module.css';
import { useTheme } from '../contexts/ThemeContext';
import Typewriter from './Typewriter';
import EmailCard from './EmailCard';
import CreateEventModal from './CreateEventModal';
import { getInitials, parseFromField, getMeetingTypeLabel } from '../utils/meetingParser';

function ChatMessage({ type, content, relevantEmails }) {
  const { isDark } = useTheme();
  const [selectedEmailForEvent, setSelectedEmailForEvent] = useState(null);
  const [sidePanelEmail, setSidePanelEmail] = useState(null);

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={isDark ? vscDarkPlus : vs}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: '1rem 0',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={styles.inlineCode} {...props}>
          {children}
        </code>
      );
    },
    p({ children }) {
      return <p className={styles.paragraph}>{children}</p>;
    },
    ul({ children }) {
      return <ul className={styles.unorderedList}>{children}</ul>;
    },
    ol({ children }) {
      return <ol className={styles.orderedList}>{children}</ol>;
    },
    li({ children }) {
      return <li className={styles.listItem}>{children}</li>;
    },
    h1({ children }) {
      return <h1 className={styles.heading1}>{children}</h1>;
    },
    h2({ children }) {
      return <h2 className={styles.heading2}>{children}</h2>;
    },
    h3({ children }) {
      return <h3 className={styles.heading3}>{children}</h3>;
    },
    blockquote({ children }) {
      return <blockquote className={styles.blockquote}>{children}</blockquote>;
    },
    a({ href, children }) {
      return (
        <a 
          href={href} 
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
    strong({ children }) {
      return <strong className={styles.strong}>{children}</strong>;
    },
    em({ children }) {
      return <em className={styles.emphasis}>{children}</em>;
    }
  };

  const handleCreateEvent = (email) => {
    setSelectedEmailForEvent(email);
  };

  const handleViewFullEmail = (email) => {
    setSidePanelEmail(email);
  };

  const handleReply = (email) => {
    console.log('📧 Reply to:', email.from?.email || email.from, 'Subject:', email.subject);
    // TODO: Connect to backend reply endpoint
  };

  const handleForward = (email) => {
    console.log('📤 Forward email:', email.subject);
    // TODO: Connect to backend forward endpoint
  };

  const handleCloseModal = () => {
    setSelectedEmailForEvent(null);
  };

  const handleCloseSidePanel = () => {
    setSidePanelEmail(null);
  };

  const handleEventSubmit = (eventData) => {
    console.log('📅 Create Event Payload:', JSON.stringify(eventData, null, 2));
    console.log('Event Details:', {
      title: eventData.title,
      date: eventData.date,
      time: eventData.time,
      duration: eventData.duration,
      location: eventData.location,
      notes: eventData.notes,
      sourceEmail: eventData.sourceEmail
    });
    setSelectedEmailForEvent(null);
  };

  const handleCreateEventFromPanel = (email) => {
    setSidePanelEmail(null);
    setSelectedEmailForEvent(email);
  };

  const hasEmails = relevantEmails?.length > 0;
  const meetingsDetected = relevantEmails?.filter(e => e.eventRelated && e.detectedMeeting)?.length || 0;

  if (type === 'assistant') {
    const fromInfo = sidePanelEmail ? parseFromField(sidePanelEmail.from) : null;
    const hasMeeting = sidePanelEmail?.eventRelated && sidePanelEmail?.detectedMeeting;

    return (
      <>
        <div className={`${styles.message} ${styles[type]}`}>
          <div className={styles.avatar}>
            <svg viewBox="0 0 24 24" className={styles.avatarIcon}>
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM17 12V15H20V17H17V20H15V17H12V15H15V12H17Z"/>
            </svg>
          </div>
          <div className={styles.content}>
            <Typewriter 
              markdownText={content}
              components={components}
              speed={15}
            />
            
            {hasEmails && (
              <div className={styles.emailCards}>
                {meetingsDetected > 0 && (
                  <div className={styles.meetingSummary}>
                    Found {meetingsDetected} meeting request{meetingsDetected > 1 ? 's' : ''} in {relevantEmails.length} email{relevantEmails.length > 1 ? 's' : ''}
                  </div>
                )}
                {relevantEmails.map((email, idx) => (
                  <EmailCard 
                    key={email.id || idx}
                    email={email}
                    onCreateEvent={handleCreateEvent}
                    onViewFullEmail={handleViewFullEmail}
                    onReply={handleReply}
                    onForward={handleForward}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Side Panel for Full Email View */}
        {sidePanelEmail && (
          <div className={styles.sidePanelOverlay} onClick={handleCloseSidePanel}>
            <div className={styles.sidePanel} onClick={(e) => e.stopPropagation()}>
              <div className={styles.sidePanelHeader}>
                <h3 className={styles.sidePanelTitle}>Email Details</h3>
                <button className={styles.sidePanelClose} onClick={handleCloseSidePanel}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className={styles.sidePanelContent}>
                <div className={styles.panelMeta}>
                  <div className={styles.panelAvatar}>
                    {getInitials(fromInfo?.name || '')}
                  </div>
                  <div className={styles.panelMetaInfo}>
                    <div className={styles.panelFrom}>{fromInfo?.name}</div>
                    <div className={styles.panelEmail}>{fromInfo?.email}</div>
                  </div>
                </div>

                <div className={styles.panelSubjectRow}>
                  <h4 className={styles.panelSubject}>{sidePanelEmail.subject}</h4>
                  {hasMeeting && (
                    <div className={styles.meetingBadgeLarge}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {getMeetingTypeLabel(sidePanelEmail.detectedMeeting?.type)}
                    </div>
                  )}
                </div>

                <div className={styles.panelBody}>
                  {sidePanelEmail.body?.split('\n').map((line, i) => (
                    <p key={i}>{line || <br />}</p>
                  ))}
                </div>

                <div className={styles.panelActions}>
                  <div className={styles.panelActionRow}>
                    <button className={styles.panelActionBtn} onClick={() => { handleReply(sidePanelEmail); handleCloseSidePanel(); }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 17 4 12 9 7"></polyline>
                        <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                      </svg>
                      Reply
                    </button>
                    <button className={styles.panelActionBtn} onClick={() => { handleForward(sidePanelEmail); handleCloseSidePanel(); }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 17 20 12 15 7"></polyline>
                        <path d="M4 18v-2a4 4 0 0 1 4-4h12"></path>
                      </svg>
                      Forward
                    </button>
                  </div>
                  {hasMeeting && (
                    <button 
                      className={styles.panelCreateEventBtn} 
                      onClick={() => handleCreateEventFromPanel(sidePanelEmail)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                        <line x1="12" y1="14" x2="12" y2="18"></line>
                        <line x1="10" y1="16" x2="14" y2="16"></line>
                      </svg>
                      Create Calendar Event
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Event Modal */}
        <CreateEventModal
          email={selectedEmailForEvent}
          isOpen={!!selectedEmailForEvent}
          onClose={handleCloseModal}
          onSubmit={handleEventSubmit}
        />
      </>
    );
  }

  return (
    <div className={`${styles.message} ${styles[type]}`}>
      <div className={styles.avatar}>
        <svg viewBox="0 0 24 24" className={styles.avatarIcon}>
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
        </svg>
      </div>
      <div className={styles.content}>
        <div className={styles.userText}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
