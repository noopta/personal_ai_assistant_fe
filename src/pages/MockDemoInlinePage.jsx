import React, { useState } from 'react';
import styles from './MockDemoInlinePage.module.css';

const mockEmails = [
  {
    id: 1,
    from: 'Alex Rivera',
    email: 'alex.rivera@techstartup.io',
    subject: 'Coffee Chat Request - Summer Intern',
    timestamp: '2:34 PM',
    aiSummary: 'Alex is requesting a 15-minute coffee chat to discuss your AI work and get career advice.',
    aiReason: 'This email needs action because it contains a meeting request with flexible timing.',
    decisionPoints: [
      { type: 'request', text: '15-minute coffee chat' },
      { type: 'timing', text: 'This week or next' },
      { type: 'topic', text: 'Career advice for AI/ML' }
    ],
    hasMeeting: true,
    meetingDetails: {
      duration: 15,
      type: 'Coffee chat',
      flexibility: 'This week or next week'
    },
    body: `Hi there,

I hope this email finds you well! My name is Alex Rivera, and I'm currently a summer intern at TechStartup.io working on their ML platform team.

I came across your work on AI productivity tools and found it incredibly inspiring. I'm particularly interested in how you approach user experience in AI-first applications.

Would you be open to a quick 15-minute coffee chat sometime this week or next? I'd love to learn more about your journey and get any advice you might have for someone just starting out in the AI/ML space.

I'm flexible on timing and happy to work around your schedule.

Best regards,
Alex`
  },
  {
    id: 2,
    from: 'Jordan Lee',
    email: 'jordan.lee@company.com',
    subject: 'Re: Q1 Planning - Let\'s sync',
    timestamp: '11:15 AM',
    aiSummary: 'Jordan wants a 30-minute planning sync to align on Q1 roadmap and resources.',
    aiReason: 'This email needs action because it proposes specific meeting times with a deadline.',
    decisionPoints: [
      { type: 'request', text: '30-minute planning sync' },
      { type: 'timing', text: 'Tomorrow or Thursday' },
      { type: 'deadline', text: 'Before Friday EOD' }
    ],
    hasMeeting: true,
    meetingDetails: {
      duration: 30,
      type: 'Planning sync',
      flexibility: 'Tomorrow or Thursday, before Friday EOD'
    },
    body: `Hey,

Following up on our Q1 planning discussion. I think we should sync before the end of the week to align on priorities and resource allocation.

Can we do a 30-minute call tomorrow or Thursday? I want to make sure we're on the same page before the Friday deadline.

Let me know what works!

Jordan`
  },
  {
    id: 3,
    from: 'Newsletter',
    email: 'updates@techweekly.com',
    subject: 'This Week in AI: Top Stories',
    timestamp: '9:00 AM',
    aiSummary: 'Weekly newsletter with AI industry news. No action needed.',
    aiReason: null,
    decisionPoints: [],
    hasMeeting: false,
    body: `This week's top stories in AI...`
  }
];

export default function MockDemoInlinePage() {
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [sidePanelEmail, setSidePanelEmail] = useState(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [calendarData, setCalendarData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleViewFull = (email) => {
    setSidePanelEmail(email);
  };

  const closeSidePanel = () => {
    setSidePanelEmail(null);
  };

  const handleScheduleMeeting = (email) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    
    setCalendarData({
      title: `${email.meetingDetails.type} with ${email.from}`,
      date: dateStr,
      time: '10:00',
      duration: email.meetingDetails.duration,
      attendee: email.email,
      notes: email.aiSummary
    });
    setShowCalendarModal(true);
  };

  const handleCreateEvent = () => {
    setShowCalendarModal(false);
    setSidePanelEmail(null);
    setSuccessMessage('Event created');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleMarkHandled = (email) => {
    setSidePanelEmail(null);
    setSuccessMessage(`"${email.subject}" marked as handled`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReply = (email) => {
    setSidePanelEmail(null);
    setSuccessMessage('Reply draft created');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const EmailCard = ({ email }) => {
    const isExpanded = expandedEmail === email.id;

    return (
      <div className={styles.emailCard}>
        <div className={styles.cardHeader}>
          <div className={styles.avatar}>
            {email.from.split(' ').map(n => n[0]).join('')}
          </div>
          <div className={styles.senderInfo}>
            <span className={styles.senderName}>{email.from}</span>
            <span className={styles.timestamp}>{email.timestamp}</span>
          </div>
          {email.hasMeeting && (
            <div className={styles.meetingBadge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Meeting detected
            </div>
          )}
        </div>

        <div className={styles.aiInterpretation}>
          <div className={styles.aiIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
              <path d="M12 2a10 10 0 0 1 10 10"></path>
            </svg>
          </div>
          <div className={styles.aiContent}>
            <p className={styles.aiSummary}>{email.aiSummary}</p>
            {email.aiReason && (
              <p className={styles.aiReason}>{email.aiReason}</p>
            )}
          </div>
        </div>

        {email.decisionPoints.length > 0 && (
          <div className={styles.decisionPoints}>
            {email.decisionPoints.map((point, idx) => (
              <div key={idx} className={styles.decisionPoint}>
                <span className={`${styles.pointType} ${styles[point.type]}`}>
                  {point.type === 'request' && '📋'}
                  {point.type === 'timing' && '🕐'}
                  {point.type === 'deadline' && '⚡'}
                  {point.type === 'topic' && '💬'}
                </span>
                <span className={styles.pointText}>{point.text}</span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.actionButtons}>
          {email.hasMeeting && (
            <button className={styles.primaryAction} onClick={() => handleScheduleMeeting(email)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <line x1="12" y1="14" x2="12" y2="18"></line>
                <line x1="10" y1="16" x2="14" y2="16"></line>
              </svg>
              Schedule meeting
            </button>
          )}
          <button className={styles.secondaryAction} onClick={() => handleReply(email)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 17 4 12 9 7"></polyline>
              <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
            </svg>
            Reply with suggestion
          </button>
          <button className={styles.secondaryAction} onClick={() => handleMarkHandled(email)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Mark handled
          </button>
        </div>

        <button 
          className={styles.viewFullBtn}
          onClick={() => handleViewFull(email)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          View full email
        </button>
      </div>
    );
  };

  return (
    <div className={styles.demoPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Inline-First Demo</h1>
        <p className={styles.subtitle}>AI interpretation first, actions before content</p>
        <div className={styles.uiNote}>Inline → Expand → Return pattern</div>
      </div>

      {showSuccess && (
        <div className={styles.successToast}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {successMessage}
        </div>
      )}

      <div className={`${styles.mainContainer} ${sidePanelEmail ? styles.withPanel : ''}`}>
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <div className={styles.chatIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <span>AirThreads Chat</span>
            <div className={styles.integrationPills}>
              <span className={styles.pill}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Gmail
              </span>
              <span className={styles.pill}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Calendar
              </span>
            </div>
          </div>

          <div className={styles.chatMessages}>
            <div className={styles.userMessage}>
              Check my emails and let me know if anyone wants to meet
            </div>

            <div className={styles.aiResponse}>
              <p>I found <strong>3 recent emails</strong>. <strong>2 of them contain meeting requests</strong> that I've highlighted for you:</p>
            </div>

            {mockEmails.map(email => (
              <EmailCard key={email.id} email={email} />
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

        {sidePanelEmail && (
          <div className={styles.sidePanel}>
            <div className={styles.panelHeader}>
              <h3>Full Email</h3>
              <button className={styles.closePanel} onClick={closeSidePanel}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className={styles.panelContent}>
              <div className={styles.emailHeader}>
                <div className={styles.emailMeta}>
                  <div className={styles.avatar}>
                    {sidePanelEmail.from.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className={styles.emailFrom}>{sidePanelEmail.from}</div>
                    <div className={styles.emailAddress}>{sidePanelEmail.email}</div>
                  </div>
                </div>
                <div className={styles.emailTimestamp}>{sidePanelEmail.timestamp}</div>
              </div>

              <div className={styles.emailSubjectRow}>
                <h4 className={styles.emailSubject}>{sidePanelEmail.subject}</h4>
                {sidePanelEmail.hasMeeting && (
                  <div className={styles.meetingBadgeLarge}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Meeting detected
                  </div>
                )}
              </div>

              <div className={styles.panelActions}>
                {sidePanelEmail.hasMeeting && (
                  <button className={styles.primaryAction} onClick={() => handleScheduleMeeting(sidePanelEmail)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                      <line x1="12" y1="14" x2="12" y2="18"></line>
                      <line x1="10" y1="16" x2="14" y2="16"></line>
                    </svg>
                    Schedule meeting
                  </button>
                )}
                <button className={styles.secondaryAction} onClick={() => handleReply(sidePanelEmail)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 17 4 12 9 7"></polyline>
                    <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                  </svg>
                  Reply
                </button>
                <button className={styles.secondaryAction} onClick={() => handleMarkHandled(sidePanelEmail)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Mark handled
                </button>
              </div>

              <div className={styles.emailBody}>
                {sidePanelEmail.body.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showCalendarModal && calendarData && (
        <div className={styles.modalOverlay} onClick={() => setShowCalendarModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <label>Event Title</label>
                <input 
                  type="text" 
                  value={calendarData.title}
                  onChange={(e) => setCalendarData({...calendarData, title: e.target.value})}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Date</label>
                  <input 
                    type="date" 
                    value={calendarData.date}
                    onChange={(e) => setCalendarData({...calendarData, date: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Time</label>
                  <input 
                    type="time" 
                    value={calendarData.time}
                    onChange={(e) => setCalendarData({...calendarData, time: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Duration</label>
                  <select 
                    value={calendarData.duration}
                    onChange={(e) => setCalendarData({...calendarData, duration: parseInt(e.target.value)})}
                  >
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={45}>45 min</option>
                    <option value={60}>1 hour</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Attendee</label>
                <input 
                  type="email" 
                  value={calendarData.attendee}
                  onChange={(e) => setCalendarData({...calendarData, attendee: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Notes</label>
                <textarea 
                  value={calendarData.notes}
                  onChange={(e) => setCalendarData({...calendarData, notes: e.target.value})}
                  rows={3}
                />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowCalendarModal(false)}>
                Cancel
              </button>
              <button className={styles.createBtn} onClick={handleCreateEvent}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
