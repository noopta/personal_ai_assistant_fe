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
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [replyModal, setReplyModal] = useState({ open: false, email: null, mode: 'reply' });
  const [eventModal, setEventModal] = useState({ open: false, email: null });
  const [notification, setNotification] = useState(null);
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
                if (data.meeting_emails?.length > 0) {
                  console.log('Setting meeting emails:', data.meeting_emails.length);
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { 
                      ...updated[updated.length - 1],
                      meetingEmails: data.meeting_emails
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
              if (data.status === 'complete' && data.meeting_emails?.length > 0) {
                console.log('Complete event (raw JSON):', data);
                setTiming(data.timing);
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { 
                    ...updated[updated.length - 1],
                    meetingEmails: data.meeting_emails
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
            if (data.status === 'complete' && data.meeting_emails?.length > 0) {
              console.log('Complete event (from buffer):', data);
              setTiming(data.timing);
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { 
                  ...updated[updated.length - 1],
                  meetingEmails: data.meeting_emails
                };
                return updated;
              });
            }
          } catch (e) {}
        } else if (line.startsWith('{')) {
          try {
            const data = JSON.parse(line);
            if (data.status === 'complete' && data.meeting_emails?.length > 0) {
              console.log('Complete event (raw from buffer):', data);
              setTiming(data.timing);
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { 
                  ...updated[updated.length - 1],
                  meetingEmails: data.meeting_emails
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

  const handleViewEmail = (email) => {
    setSelectedEmail(selectedEmail?.id === email.id ? null : email);
  };

  const handleReply = (email) => {
    setReplyModal({ open: true, email, mode: 'reply' });
    setSelectedEmail(null);
  };

  const handleForward = (email) => {
    setReplyModal({ open: true, email, mode: 'forward' });
    setSelectedEmail(null);
  };

  const handleCreateEvent = (email) => {
    setEventModal({ open: true, email });
    setSelectedEmail(null);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    const mode = replyModal.mode === 'reply' ? 'Reply' : 'Forward';
    showNotification(`${mode} sent successfully! (Demo)`, 'success');
    setReplyModal({ open: false, email: null, mode: 'reply' });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    showNotification('Calendar event created successfully! (Demo)', 'success');
    setEventModal({ open: false, email: null });
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

              {msg.meetingEmails && msg.meetingEmails.length > 0 && (
                <div className={styles.emailCards}>
                  {msg.meetingEmails.map((email, i) => (
                    <div key={i} className={`${styles.emailCard} ${selectedEmail?.id === email.id ? styles.emailCardSelected : ''}`}>
                      <div className={styles.cardHeader}>
                        <span className={styles.eventBadge}>
                          {email.eventType?.replace(/_/g, ' ') || 'meeting'}
                        </span>
                        <span className={styles.confidence}>
                          {Math.round((email.confidence || 0.8) * 100)}%
                        </span>
                      </div>
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
                          onClick={() => handleViewEmail(email)}
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
                      </div>

                      {selectedEmail?.id === email.id && (
                        <div className={styles.emailPanel}>
                          <div className={styles.emailPanelHeader}>
                            <h3>{email.subject}</h3>
                            <button className={styles.closeBtn} onClick={() => setSelectedEmail(null)}>
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
                            {email.snippet?.split('\n').map((line, idx) => (
                              <p key={idx}>{line || <br />}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
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

      {replyModal.open && (
        <div className={styles.modalOverlay} onClick={() => setReplyModal({ open: false, email: null, mode: 'reply' })}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{replyModal.mode === 'reply' ? 'Reply' : 'Forward'}</h3>
              <button className={styles.closeBtn} onClick={() => setReplyModal({ open: false, email: null, mode: 'reply' })}>
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
                    defaultValue={replyModal.mode === 'reply' ? replyModal.email?.from?.email : ''} 
                    placeholder={replyModal.mode === 'forward' ? 'Enter recipient email' : ''}
                    className={styles.modalInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Subject:</label>
                  <input 
                    type="text" 
                    defaultValue={`${replyModal.mode === 'reply' ? 'Re' : 'Fwd'}: ${replyModal.email?.subject || ''}`}
                    className={styles.modalInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Message:</label>
                  <textarea 
                    rows={6}
                    defaultValue={replyModal.mode === 'reply' ? '' : `\n\n---------- Forwarded message ----------\n${replyModal.email?.snippet || ''}`}
                    placeholder="Type your message..."
                    className={styles.modalTextarea}
                  />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.modalCancelBtn} onClick={() => setReplyModal({ open: false, email: null, mode: 'reply' })}>
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
        <div className={styles.modalOverlay} onClick={() => setEventModal({ open: false, email: null })}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Create Calendar Event</h3>
              <button className={styles.closeBtn} onClick={() => setEventModal({ open: false, email: null })}>
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
                    defaultValue={eventModal.email?.subject || ''}
                    className={styles.modalInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Attendees:</label>
                  <input 
                    type="text" 
                    defaultValue={eventModal.email?.from?.email || ''}
                    className={styles.modalInput}
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Date:</label>
                    <input 
                      type="date" 
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className={styles.modalInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Time:</label>
                    <input 
                      type="time" 
                      defaultValue="10:00"
                      className={styles.modalInput}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Duration:</label>
                  <select defaultValue="30" className={styles.modalInput}>
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
                    defaultValue={eventModal.email?.snippet || ''}
                    className={styles.modalTextarea}
                  />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.modalCancelBtn} onClick={() => setEventModal({ open: false, email: null })}>
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
