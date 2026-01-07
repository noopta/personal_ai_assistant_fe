import { useState, useRef, useEffect } from 'react';
import styles from './RAGDemoPage.module.css';
import { useTheme } from '../contexts/ThemeContext';
import ReactMarkdown from 'react-markdown';

function DemosPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [timing, setTiming] = useState(null);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [replyModal, setReplyModal] = useState({ open: false, email: null, mode: 'reply' });
  const [eventModal, setEventModal] = useState({ open: false, email: null });
  const [notification, setNotification] = useState(null);
  const [replyContent, setReplyContent] = useState({ to: '', subject: '', message: '' });
  const [eventContent, setEventContent] = useState({ title: '', attendees: '', date: '', time: '10:00', duration: '30', notes: '' });
  const [emailDisplayMode, setEmailDisplayMode] = useState('inline'); // 'inline' or 'sidepanel'
  const [expandedMessageIdx, setExpandedMessageIdx] = useState(null);
  const [sidePanelEmails, setSidePanelEmails] = useState(null);

  const getEmailId = (email, index) => email.id || email.messageId || `email-${index}`;
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { isDark } = useTheme();

  const messagesAreaRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesAreaRef.current) {
      messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user' || (lastMessage?.role === 'assistant' && !lastMessage?.isStreaming)) {
      scrollToBottom();
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const query = input;
    setInput('');
    setIsStreaming(true);
    setMetadata(null);
    setTiming(null);

    try {
      const response = await fetch('https://api.airthreads.ai:5001/agent-rag-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantContent = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '', isStreaming: true }]);

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('event: metadata')) {
            continue;
          } else if (line.startsWith('event: complete')) {
            continue;
          } else if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.token) {
                assistantContent += data.token;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { 
                    role: 'assistant', 
                    content: assistantContent,
                    isStreaming: true 
                  };
                  return updated;
                });
              } else if (data.query || data.intent) {
                setMetadata(data);
              } else if (data.status === 'complete') {
                console.log('Complete event received:', data);
                setTiming(data.timing);
                const emails = data.relevant_emails || data.meeting_emails;
                if (emails?.length > 0) {
                  console.log('Setting relevant emails:', emails.length);
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { 
                      ...updated[updated.length - 1],
                      relevantEmails: emails
                    };
                    return updated;
                  });
                }
              }
            } catch (e) {
              console.log('Parse error for line:', line);
            }
          } else if (line.trim().startsWith('{')) {
            try {
              const data = JSON.parse(line.trim());
              const emails = data.relevant_emails || data.meeting_emails;
              if (data.status === 'complete' && emails?.length > 0) {
                console.log('Complete event (raw JSON):', data);
                setTiming(data.timing);
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { 
                    ...updated[updated.length - 1],
                    relevantEmails: emails
                  };
                  return updated;
                });
              }
            } catch (e) {
            }
          }
        }
      }

      if (buffer.trim()) {
        const line = buffer.trim();
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            const emails = data.relevant_emails || data.meeting_emails;
            if (data.status === 'complete' && emails?.length > 0) {
              console.log('Complete event (from buffer):', data);
              setTiming(data.timing);
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { 
                  ...updated[updated.length - 1],
                  relevantEmails: emails
                };
                return updated;
              });
            }
          } catch (e) {}
        } else if (line.startsWith('{')) {
          try {
            const data = JSON.parse(line);
            const emails = data.relevant_emails || data.meeting_emails;
            if (data.status === 'complete' && emails?.length > 0) {
              console.log('Complete event (raw from buffer):', data);
              setTiming(data.timing);
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { 
                  ...updated[updated.length - 1],
                  relevantEmails: emails
                };
                return updated;
              });
            }
          } catch (e) {}
        }
      }

      setMessages(prev => {
        const updated = [...prev];
        const lastMsg = updated[updated.length - 1];
        updated[updated.length - 1] = { 
          ...lastMsg,
          content: assistantContent,
          isStreaming: false 
        };
        return updated;
      });

    } catch (error) {
      console.error('Stream error:', error);
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.role === 'assistant' && lastMessage?.isStreaming) {
          return [
            ...prev.slice(0, -1),
            { role: 'assistant', content: `Error: ${error.message}`, isStreaming: false }
          ];
        }
        return [
          ...prev,
          { role: 'assistant', content: `Error: ${error.message}`, isStreaming: false }
        ];
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleViewEmail = (emailId) => {
    setSelectedEmailId(selectedEmailId === emailId ? null : emailId);
  };

  const handleExpandEmails = (idx, emails) => {
    if (emailDisplayMode === 'inline') {
      setExpandedMessageIdx(expandedMessageIdx === idx ? null : idx);
    } else {
      if (sidePanelEmails && expandedMessageIdx === idx) {
        setSidePanelEmails(null);
        setExpandedMessageIdx(null);
      } else {
        setSidePanelEmails(emails);
        setExpandedMessageIdx(idx);
      }
    }
  };

  const closeSidePanel = () => {
    setSidePanelEmails(null);
    setExpandedMessageIdx(null);
  };

  const handleReply = (email) => {
    setReplyContent({
      to: email.from?.email || '',
      subject: `Re: ${email.subject || ''}`,
      message: ''
    });
    setReplyModal({ open: true, email, mode: 'reply' });
    setSelectedEmailId(null);
  };

  const handleForward = (email) => {
    setReplyContent({
      to: '',
      subject: `Fwd: ${email.subject || ''}`,
      message: `\n\n---------- Forwarded message ----------\n${email.snippet || ''}`
    });
    setReplyModal({ open: true, email, mode: 'forward' });
    setSelectedEmailId(null);
  };

  const handleCreateEvent = (email) => {
    setEventContent({
      title: email.subject || '',
      attendees: email.from?.email || '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      duration: '30',
      notes: email.snippet || ''
    });
    setEventModal({ open: true, email });
    setSelectedEmailId(null);
  };

  const handleCloseReplyModal = () => {
    setReplyModal({ open: false, email: null, mode: 'reply' });
    setReplyContent({ to: '', subject: '', message: '' });
  };

  const handleCloseEventModal = () => {
    setEventModal({ open: false, email: null });
    setEventContent({ title: '', attendees: '', date: '', time: '10:00', duration: '30', notes: '' });
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    const mode = replyModal.mode === 'reply' ? 'Reply' : 'Forward';
    showNotification(`${mode} sent successfully! (Demo)`, 'success');
    handleCloseReplyModal();
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    showNotification('Calendar event created successfully! (Demo)', 'success');
    handleCloseEventModal();
  };

  const exampleQueries = [
    "whats my oldest email",
    "show me recent meetings",
    "coffee chats this week",
    "whats the total count of my emails"
  ];

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.badge}>Developer Preview</div>
          <h1 className={styles.title}>Demo</h1>
          <p className={styles.subtitle}>Real-time streaming chat with semantic search</p>
        </div>
        <div className={styles.viewModeToggle}>
          <span className={styles.viewModeLabel}>Email View:</span>
          <button 
            className={`${styles.viewModeBtn} ${emailDisplayMode === 'inline' ? styles.active : ''}`}
            onClick={() => { 
              setEmailDisplayMode('inline'); 
              setSidePanelEmails(null); 
              setExpandedMessageIdx(null);
            }}
            title="Expand emails inline within the chat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            Inline
          </button>
          <button 
            className={`${styles.viewModeBtn} ${emailDisplayMode === 'sidepanel' ? styles.active : ''}`}
            onClick={() => { 
              setEmailDisplayMode('sidepanel'); 
              setExpandedMessageIdx(null);
            }}
            title="Open emails in a side panel"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="15" y1="3" x2="15" y2="21"></line>
            </svg>
            Side Panel
          </button>
        </div>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.messagesArea} ref={messagesAreaRef}>
          {messages.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3>Start a conversation</h3>
              <p>Try one of these example queries:</p>
              <div className={styles.examples}>
                {exampleQueries.map((query, idx) => (
                  <button 
                    key={idx}
                    className={styles.exampleBtn}
                    onClick={() => setInput(query)}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={styles.messageWrapper}>
              <div className={`${styles.message} ${styles[msg.role]}`}>
                {msg.role === 'assistant' && (
                  <div className={styles.avatar}>
                    <svg viewBox="0 0 24 24" className={styles.avatarIcon}>
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM17 12V15H20V17H17V20H15V17H12V15H15V12H17Z" fill="currentColor"/>
                    </svg>
                  </div>
                )}
                <div className={styles.messageContent}>
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                  {msg.isStreaming && <span className={styles.cursor}>▋</span>}
                </div>
              </div>

              {msg.relevantEmails && msg.relevantEmails.length > 0 && (
                <div className={styles.emailResultsContainer}>
                  <button 
                    className={`${styles.emailSummaryBtn} ${expandedMessageIdx === idx ? styles.expanded : ''}`}
                    onClick={() => handleExpandEmails(idx, msg.relevantEmails)}
                  >
                    <div className={styles.summaryLeft}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span className={styles.emailCount}>{msg.relevantEmails.length} email{msg.relevantEmails.length !== 1 ? 's' : ''} found</span>
                      {msg.relevantEmails.filter(e => e.eventRelated).length > 0 && (
                        <span className={styles.meetingCount}>
                          {msg.relevantEmails.filter(e => e.eventRelated).length} meeting{msg.relevantEmails.filter(e => e.eventRelated).length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <svg 
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className={`${styles.chevron} ${expandedMessageIdx === idx ? styles.chevronUp : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  {emailDisplayMode === 'inline' && expandedMessageIdx === idx && (
                    <div className={styles.emailCards}>
                      {msg.relevantEmails.map((email, i) => {
                        const emailId = getEmailId(email, i);
                        const isSelected = selectedEmailId === emailId;
                        const isMeeting = email.eventRelated === true;
                        return (
                          <div key={emailId} className={`${styles.emailCard} ${isSelected ? styles.emailCardSelected : ''}`}>
                            {isMeeting && (
                              <div className={styles.cardHeader}>
                                <span className={styles.eventBadge}>
                                  {email.eventType?.replace(/_/g, ' ') || 'meeting'}
                                </span>
                                <span className={styles.confidence}>
                                  {Math.round((email.confidence || 0.8) * 100)}%
                                </span>
                              </div>
                            )}
                            <h4 className={styles.cardSubject}>{email.subject}</h4>
                            <p className={styles.cardFrom}>
                              From: {email.from?.name || email.from?.email || 'Unknown'}
                            </p>
                            <p className={styles.cardDate}>
                              {email.date ? new Date(email.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              }) : ''}
                            </p>
                            {email.snippet && (
                              <p className={styles.cardSnippet}>{email.snippet}</p>
                            )}
                            <div className={styles.cardActions}>
                              <button 
                                className={styles.cardActionBtn}
                                onClick={() => handleViewEmail(emailId)}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                View
                              </button>
                              <button 
                                className={styles.cardActionBtn}
                                onClick={() => handleReply(email)}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="9 17 4 12 9 7"></polyline>
                                  <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                                </svg>
                                Reply
                              </button>
                              <button 
                                className={styles.cardActionBtn}
                                onClick={() => handleForward(email)}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="15 17 20 12 15 7"></polyline>
                                  <path d="M4 18v-2a4 4 0 0 1 4-4h12"></path>
                                </svg>
                                Forward
                              </button>
                              {isMeeting && (
                                <button 
                                  className={`${styles.cardActionBtn} ${styles.cardActionBtnPrimary}`}
                                  onClick={() => handleCreateEvent(email)}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                    <line x1="12" y1="14" x2="12" y2="18"></line>
                                    <line x1="10" y1="16" x2="14" y2="16"></line>
                                  </svg>
                                  Create Event
                                </button>
                              )}
                            </div>

                            {isSelected && (
                              <div className={styles.emailPanel}>
                                <div className={styles.emailPanelHeader}>
                                  <h3>{email.subject}</h3>
                                  <button className={styles.closeBtn} onClick={() => setSelectedEmailId(null)}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <line x1="18" y1="6" x2="6" y2="18"></line>
                                      <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                  </button>
                                </div>
                                <div className={styles.emailPanelMeta}>
                                  <p><strong>From:</strong> {email.from?.name || 'Unknown'} &lt;{email.from?.email}&gt;</p>
                                  <p><strong>Date:</strong> {email.date ? new Date(email.date).toLocaleString() : 'Unknown'}</p>
                                </div>
                                <div className={styles.emailPanelBody}>
                                  {email.snippet?.split('\n').map((line, lineIdx) => (
                                    <p key={lineIdx}>{line || <br />}</p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {metadata && (
          <div className={styles.metadataBar}>
            <span>Found {metadata.result_count || 0} results</span>
            {metadata.intent?.query_type && (
              <span className={styles.metaTag}>{metadata.intent.query_type}</span>
            )}
            {timing && timing.total < 0.1 && (
              <span className={styles.fastBadge}>⚡ Instant ({(timing.total * 1000).toFixed(0)}ms)</span>
            )}
            {timing && timing.total >= 0.1 && (
              <span className={styles.timingBadge}>{timing.total.toFixed(2)}s</span>
            )}
          </div>
        )}

        <div className={styles.inputArea}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Try: 'whats my oldest email' or 'show me recent meetings'"
            disabled={isStreaming}
            className={styles.input}
          />
          <button 
            onClick={sendMessage} 
            disabled={isStreaming || !input.trim()}
            className={styles.sendBtn}
          >
            {isStreaming ? (
              <span className={styles.streamingDot}></span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <p>Sample data • 1000 emails • Developer testing only</p>
      </div>

      {emailDisplayMode === 'sidepanel' && sidePanelEmails && (
        <div className={styles.sidePanel}>
          <div className={styles.sidePanelHeader}>
            <h3>{sidePanelEmails.length} Email{sidePanelEmails.length !== 1 ? 's' : ''}</h3>
            <button className={styles.closeBtn} onClick={closeSidePanel}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className={styles.sidePanelContent}>
            {sidePanelEmails.map((email, i) => {
              const emailId = getEmailId(email, i);
              const isSelected = selectedEmailId === emailId;
              const isMeeting = email.eventRelated === true;
              return (
                <div key={emailId} className={`${styles.sidePanelCard} ${isSelected ? styles.sidePanelCardSelected : ''}`}>
                  {isMeeting && (
                    <div className={styles.cardHeader}>
                      <span className={styles.eventBadge}>
                        {email.eventType?.replace(/_/g, ' ') || 'meeting'}
                      </span>
                      <span className={styles.confidence}>
                        {Math.round((email.confidence || 0.8) * 100)}%
                      </span>
                    </div>
                  )}
                  <h4 className={styles.cardSubject}>{email.subject}</h4>
                  <p className={styles.cardFrom}>
                    From: {email.from?.name || email.from?.email || 'Unknown'}
                  </p>
                  <p className={styles.cardDate}>
                    {email.date ? new Date(email.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }) : ''}
                  </p>
                  {email.snippet && (
                    <p className={styles.cardSnippet}>{email.snippet}</p>
                  )}
                  <div className={styles.cardActions}>
                    <button 
                      className={styles.cardActionBtn}
                      onClick={() => handleViewEmail(emailId)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      View
                    </button>
                    <button 
                      className={styles.cardActionBtn}
                      onClick={() => handleReply(email)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 17 4 12 9 7"></polyline>
                        <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                      </svg>
                      Reply
                    </button>
                    <button 
                      className={styles.cardActionBtn}
                      onClick={() => handleForward(email)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 17 20 12 15 7"></polyline>
                        <path d="M4 18v-2a4 4 0 0 1 4-4h12"></path>
                      </svg>
                      Forward
                    </button>
                    {isMeeting && (
                      <button 
                        className={`${styles.cardActionBtn} ${styles.cardActionBtnPrimary}`}
                        onClick={() => handleCreateEvent(email)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                          <line x1="12" y1="14" x2="12" y2="18"></line>
                          <line x1="10" y1="16" x2="14" y2="16"></line>
                        </svg>
                        Create Event
                      </button>
                    )}
                  </div>
                  {isSelected && (
                    <div className={styles.emailPanel}>
                      <div className={styles.emailPanelHeader}>
                        <h3>{email.subject}</h3>
                        <button className={styles.closeBtn} onClick={() => setSelectedEmailId(null)}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                      <div className={styles.emailPanelMeta}>
                        <p><strong>From:</strong> {email.from?.name || 'Unknown'} &lt;{email.from?.email}&gt;</p>
                        <p><strong>Date:</strong> {email.date ? new Date(email.date).toLocaleString() : 'Unknown'}</p>
                      </div>
                      <div className={styles.emailPanelBody}>
                        {email.snippet?.split('\n').map((line, lineIdx) => (
                          <p key={lineIdx}>{line || <br />}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {replyModal.open && (
        <div className={styles.modalOverlay} onClick={handleCloseReplyModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{replyModal.mode === 'reply' ? 'Reply' : 'Forward'}</h3>
              <button className={styles.closeBtn} onClick={handleCloseReplyModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleReplySubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>To:</label>
                  <input 
                    type="email" 
                    value={replyContent.to}
                    onChange={(e) => setReplyContent(prev => ({ ...prev, to: e.target.value }))}
                    placeholder={replyModal.mode === 'forward' ? 'Enter recipient email' : ''}
                    className={styles.modalInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Subject:</label>
                  <input 
                    type="text" 
                    value={replyContent.subject}
                    onChange={(e) => setReplyContent(prev => ({ ...prev, subject: e.target.value }))}
                    className={styles.modalInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Message:</label>
                  <textarea 
                    rows={6}
                    value={replyContent.message}
                    onChange={(e) => setReplyContent(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Type your message..."
                    className={styles.modalTextarea}
                  />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.modalCancelBtn} onClick={handleCloseReplyModal}>
                  Cancel
                </button>
                <button type="submit" className={styles.modalSubmitBtn}>
                  Send {replyModal.mode === 'reply' ? 'Reply' : 'Forward'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {eventModal.open && (
        <div className={styles.modalOverlay} onClick={handleCloseEventModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Create Calendar Event</h3>
              <button className={styles.closeBtn} onClick={handleCloseEventModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleEventSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>Event Title:</label>
                  <input 
                    type="text" 
                    value={eventContent.title}
                    onChange={(e) => setEventContent(prev => ({ ...prev, title: e.target.value }))}
                    className={styles.modalInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Attendees:</label>
                  <input 
                    type="text" 
                    value={eventContent.attendees}
                    onChange={(e) => setEventContent(prev => ({ ...prev, attendees: e.target.value }))}
                    className={styles.modalInput}
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Date:</label>
                    <input 
                      type="date" 
                      value={eventContent.date}
                      onChange={(e) => setEventContent(prev => ({ ...prev, date: e.target.value }))}
                      className={styles.modalInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Time:</label>
                    <input 
                      type="time" 
                      value={eventContent.time}
                      onChange={(e) => setEventContent(prev => ({ ...prev, time: e.target.value }))}
                      className={styles.modalInput}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Duration:</label>
                  <select 
                    value={eventContent.duration}
                    onChange={(e) => setEventContent(prev => ({ ...prev, duration: e.target.value }))}
                    className={styles.modalInput}
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Notes:</label>
                  <textarea 
                    rows={3}
                    value={eventContent.notes}
                    onChange={(e) => setEventContent(prev => ({ ...prev, notes: e.target.value }))}
                    className={styles.modalTextarea}
                  />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.modalCancelBtn} onClick={handleCloseEventModal}>
                  Cancel
                </button>
                <button type="submit" className={styles.modalSubmitBtn}>
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default DemosPage;
