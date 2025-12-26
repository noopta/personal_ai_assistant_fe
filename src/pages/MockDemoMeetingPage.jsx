import { useState } from 'react';
import styles from './MockDemoMeetingPage.module.css';

const mockEmails = {
  email1: {
    id: 'email1',
    subject: 'Coffee Chat Request - Summer Intern',
    from: { name: 'Alex Rivera', email: 'alex.rivera@company.com' },
    to: [{ name: 'You', email: 'you@company.com' }],
    cc: [],
    date: 'Dec 24, 2025 at 10:15 AM',
    body: `Hi!

I'm Alex, one of the summer interns on the product team. I've been really impressed with the AI features you've been building and would love to learn more about your work.

Would you be open to a quick 15-minute coffee chat sometime this week?

I'm particularly interested in:
- How you approach AI/ML product decisions
- Your journey to becoming a founder
- Any advice for someone early in their career

Thanks,
Alex`,
    hasMeeting: true,
    meetingInfo: {
      title: 'Coffee Chat with Alex Rivera',
      duration: 15,
      type: 'Coffee Chat',
      flexibility: 'Flexible this week'
    }
  },
  email2: {
    id: 'email2',
    subject: 'Re: Q1 Planning - Let\'s sync',
    from: { name: 'Jordan Lee', email: 'jordan.lee@company.com' },
    to: [{ name: 'You', email: 'you@company.com' }],
    cc: [{ name: 'Product Team', email: 'product@company.com' }],
    date: 'Dec 24, 2025 at 9:30 AM',
    body: `Hey,

Following up on last week's discussion about Q1 priorities. I think we need to align on a few things before the break.

Can we do a quick 30-minute sync tomorrow or Thursday? I want to make sure we're on the same page about:
1. The roadmap timeline
2. Resource allocation for the new features
3. Dependencies with the design team

Let me know what works for you.

Thanks,
Jordan`,
    hasMeeting: true,
    meetingInfo: {
      title: 'Q1 Planning Sync with Jordan Lee',
      duration: 30,
      type: 'Planning Sync',
      flexibility: 'Tomorrow or Thursday'
    }
  },
  email3: {
    id: 'email3',
    subject: 'Your AWS bill is ready',
    from: { name: 'AWS Billing', email: 'no-reply@aws.amazon.com' },
    to: [{ name: 'You', email: 'you@company.com' }],
    cc: [],
    date: 'Dec 23, 2025 at 8:00 AM',
    body: `Hello,

Your AWS bill for December 2025 is now available. 

Total charges: $847.23

To view your complete bill, please visit the AWS Billing Console.

Thank you for using Amazon Web Services.

- The AWS Team`,
    hasMeeting: false
  }
};

const mockConversation = [
  {
    type: 'user',
    content: 'Check my emails and let me know if anyone wants to meet'
  },
  {
    type: 'assistant',
    content: `I found 3 recent emails. **2 of them contain meeting requests** that I've highlighted for you:`
  },
  {
    type: 'assistant',
    content: `**Alex Rivera** wants a 15-minute coffee chat this week to learn about your AI work and get career advice.`,
    emailRef: 'email1',
    emailLabel: 'View email',
    hasMeeting: true
  },
  {
    type: 'assistant',
    content: `**Jordan Lee** wants a 30-minute Q1 planning sync tomorrow or Thursday to align on roadmap and resources.`,
    emailRef: 'email2',
    emailLabel: 'View email',
    hasMeeting: true
  },
  {
    type: 'assistant',
    content: `The third email is just your AWS bill notification - no action needed there.`,
    emailRef: 'email3',
    emailLabel: 'View email',
    hasMeeting: false
  },
  {
    type: 'assistant',
    content: `Would you like me to help schedule either of these meetings?`
  }
];

function MockDemoMeetingPage() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [composeMode, setComposeMode] = useState(null);
  const [composeData, setComposeData] = useState({ to: '', cc: '', subject: '', body: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [calendarData, setCalendarData] = useState({ title: '', date: '', time: '10:00', duration: 15, attendee: '' });

  const handleViewEmail = (emailId) => {
    setSelectedEmail(mockEmails[emailId]);
    setComposeMode(null);
  };

  const handleCloseEmail = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedEmail(null);
      setIsClosing(false);
      setComposeMode(null);
    }, 250);
  };

  const handleReply = () => {
    setComposeData({
      to: selectedEmail.from.email,
      cc: '',
      subject: `Re: ${selectedEmail.subject}`,
      body: `\n\n---\nOn ${selectedEmail.date}, ${selectedEmail.from.name} wrote:\n\n${selectedEmail.body}`
    });
    setComposeMode('reply');
  };

  const handleForward = () => {
    setComposeData({
      to: '',
      cc: '',
      subject: `Fwd: ${selectedEmail.subject}`,
      body: `\n\n---\nForwarded message:\nFrom: ${selectedEmail.from.name} <${selectedEmail.from.email}>\nDate: ${selectedEmail.date}\nSubject: ${selectedEmail.subject}\nTo: ${selectedEmail.to.map(r => r.email).join(', ')}\n\n${selectedEmail.body}`
    });
    setComposeMode('forward');
  };

  const handleAddToCalendar = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCalendarData({
      title: selectedEmail.meetingInfo.title,
      date: tomorrow.toISOString().split('T')[0],
      time: '10:00',
      duration: selectedEmail.meetingInfo.duration,
      attendee: selectedEmail.from.email
    });
    setShowCalendarModal(true);
  };

  const handleCreateEvent = () => {
    setSuccessMessage('Calendar event created');
    setShowSuccess(true);
    setShowCalendarModal(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancelCompose = () => {
    setComposeMode(null);
    setComposeData({ to: '', cc: '', subject: '', body: '' });
  };

  const handleSend = () => {
    const action = composeMode === 'reply' ? 'Reply sent' : 'Email forwarded';
    setSuccessMessage(action);
    setShowSuccess(true);
    setComposeMode(null);
    setComposeData({ to: '', cc: '', subject: '', body: '' });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (field, value) => {
    setComposeData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.demoPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Email + Calendar Demo</h1>
        <p className={styles.subtitle}>Side panel view with smart meeting detection</p>
      </div>

      {showSuccess && (
        <div className={styles.successToast}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {successMessage} (demo mode)
        </div>
      )}

      {showCalendarModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCalendarModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h2>Create Calendar Event</h2>
              <button className={styles.modalClose} onClick={() => setShowCalendarModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input type="text" value={calendarData.title} onChange={(e) => setCalendarData({...calendarData, title: e.target.value})} />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Date</label>
                  <input type="date" value={calendarData.date} onChange={(e) => setCalendarData({...calendarData, date: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Time</label>
                  <input type="time" value={calendarData.time} onChange={(e) => setCalendarData({...calendarData, time: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Duration</label>
                  <select value={calendarData.duration} onChange={(e) => setCalendarData({...calendarData, duration: parseInt(e.target.value)})}>
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={60}>1 hour</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Attendee</label>
                <input type="email" value={calendarData.attendee} onChange={(e) => setCalendarData({...calendarData, attendee: e.target.value})} />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowCalendarModal(false)}>Cancel</button>
              <button className={styles.saveBtn} onClick={handleCreateEvent}>Create Event</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={`${styles.chatPanel} ${selectedEmail ? styles.chatPanelWithEmail : ''}`}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <span>AirThreads Chat</span>
            <div className={styles.integrationBadges}>
              <span className={styles.integrationBadge}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Gmail
              </span>
              <span className={styles.integrationBadge}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                </svg>
                Calendar
              </span>
            </div>
          </div>
          
          <div className={styles.messages}>
            {mockConversation.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${styles[msg.type]}`}>
                <div className={styles.messageContent}>
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                  {msg.emailRef && (
                    <div className={styles.emailRefRow}>
                      <button 
                        className={styles.viewEmailBtn}
                        onClick={() => handleViewEmail(msg.emailRef)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        {msg.emailLabel}
                      </button>
                      {msg.hasMeeting && (
                        <span className={styles.meetingBadge}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                          </svg>
                          Meeting detected
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.inputArea}>
            <input 
              type="text" 
              placeholder="Ask about your emails..." 
              className={styles.input}
              disabled
            />
            <button className={styles.sendBtn} disabled>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

        {selectedEmail && (
          <div className={`${styles.emailPanel} ${isClosing ? styles.emailPanelClosing : ''}`}>
            <div className={styles.emailHeader}>
              <h3 className={styles.emailTitle}>
                {composeMode === 'reply' ? 'Reply' : composeMode === 'forward' ? 'Forward' : 'Email'}
              </h3>
              <button className={styles.closeBtn} onClick={handleCloseEmail}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {!composeMode ? (
              <div className={styles.emailContent}>
                <div className={styles.subjectRow}>
                  <h2 className={styles.emailSubject}>{selectedEmail.subject}</h2>
                  {selectedEmail.hasMeeting && (
                    <span className={styles.meetingBadgeLarge}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                      </svg>
                      Meeting detected
                    </span>
                  )}
                </div>
                
                <div className={styles.emailMeta}>
                  <div className={styles.emailFrom}>
                    <div className={styles.avatar}>
                      {selectedEmail.from.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={styles.emailFromDetails}>
                      <span className={styles.fromName}>{selectedEmail.from.name}</span>
                      <span className={styles.fromEmail}>&lt;{selectedEmail.from.email}&gt;</span>
                    </div>
                  </div>
                  <div className={styles.emailDate}>{selectedEmail.date}</div>
                </div>

                <div className={styles.emailRecipients}>
                  <span className={styles.recipientLabel}>To:</span>
                  <span className={styles.recipientList}>
                    {selectedEmail.to.map(r => r.name).join(', ')}
                  </span>
                  {selectedEmail.cc.length > 0 && (
                    <>
                      <span className={styles.recipientLabel}>Cc:</span>
                      <span className={styles.recipientList}>
                        {selectedEmail.cc.map(r => r.name).join(', ')}
                      </span>
                    </>
                  )}
                </div>

                {selectedEmail.hasMeeting && (
                  <div className={styles.smartAction}>
                    <div className={styles.smartActionIcon}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div className={styles.smartActionContent}>
                      <span className={styles.smartActionTitle}>{selectedEmail.meetingInfo.duration}-min {selectedEmail.meetingInfo.type}</span>
                      <span className={styles.smartActionDetails}>{selectedEmail.meetingInfo.flexibility}</span>
                    </div>
                    <button className={styles.addToCalendarBtn} onClick={handleAddToCalendar}>
                      Add to Calendar
                    </button>
                  </div>
                )}

                <div className={styles.emailBody}>
                  {selectedEmail.body.split('\n').map((line, i) => (
                    <p key={i}>{line || <br />}</p>
                  ))}
                </div>

                <div className={styles.emailActions}>
                  <button className={styles.emailActionBtn} onClick={handleReply}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 17 4 12 9 7"></polyline>
                      <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                    </svg>
                    Reply
                  </button>
                  <button className={styles.emailActionBtn} onClick={handleForward}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 17 20 12 15 7"></polyline>
                      <path d="M4 18v-2a4 4 0 0 1 4-4h12"></path>
                    </svg>
                    Forward
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.composeContent}>
                <div className={styles.composeForm}>
                  <div className={styles.composeField}>
                    <label className={styles.composeLabel}>To</label>
                    <input
                      type="text"
                      className={styles.composeInput}
                      value={composeData.to}
                      onChange={(e) => handleInputChange('to', e.target.value)}
                      placeholder="recipient@example.com"
                    />
                  </div>
                  
                  <div className={styles.composeField}>
                    <label className={styles.composeLabel}>Cc</label>
                    <input
                      type="text"
                      className={styles.composeInput}
                      value={composeData.cc}
                      onChange={(e) => handleInputChange('cc', e.target.value)}
                      placeholder="cc@example.com (optional)"
                    />
                  </div>

                  <div className={styles.composeField}>
                    <label className={styles.composeLabel}>Subject</label>
                    <input
                      type="text"
                      className={styles.composeInput}
                      value={composeData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                    />
                  </div>

                  <div className={styles.composeFieldBody}>
                    <label className={styles.composeLabel}>Message</label>
                    <textarea
                      className={styles.composeTextarea}
                      value={composeData.body}
                      onChange={(e) => handleInputChange('body', e.target.value)}
                      placeholder="Write your message..."
                    />
                  </div>
                </div>

                <div className={styles.composeActions}>
                  <button className={styles.cancelBtn} onClick={handleCancelCompose}>
                    Cancel
                  </button>
                  <button 
                    className={styles.sendEmailBtn} 
                    onClick={handleSend}
                    disabled={!composeData.to.trim()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    {composeMode === 'reply' ? 'Send Reply' : 'Forward'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MockDemoMeetingPage;
