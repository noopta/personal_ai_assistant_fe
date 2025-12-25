import { useState } from 'react';
import styles from './MockDemoChatFullPage.module.css';

const mockEmails = {
  email1: {
    id: 'email1',
    subject: 'Coffee Chat Request - Summer Intern',
    from: { name: 'Alex Rivera', email: 'alex.rivera@company.com' },
    date: 'Dec 24, 2025',
    body: `Hi!

I'm Alex, one of the summer interns on the product team. I've been really impressed with the AI features you've been building and would love to learn more about your work.

Would you be open to a quick 15-minute coffee chat sometime this week?

I'm particularly interested in:
- How you approach AI/ML product decisions
- Your journey to becoming a founder
- Any advice for someone early in their career

Thanks,
Alex`,
    calendar: { duration: 15, type: 'Coffee Chat', title: 'Coffee Chat with Alex Rivera' },
    notion: {
      type: 'Key Points',
      highlights: ['Intern interested in AI/ML product decisions', 'Wants career advice', 'Flexible schedule this week']
    }
  },
  email2: {
    id: 'email2',
    subject: 'Partnership Proposal - DataFlow AI',
    from: { name: 'Sarah Mitchell', email: 'sarah@dataflow.ai' },
    date: 'Dec 24, 2025',
    body: `Hi,

I'm the Head of Partnerships at DataFlow AI. We'd love to explore a potential partnership:

Key proposal points:
1. API integration between our platforms
2. Co-marketing opportunities for Q1
3. Revenue share model (70/30 in your favor)

Would you be available for a 30-minute call next week?

Best,
Sarah Mitchell`,
    calendar: { duration: 30, type: 'Partnership Call', title: 'Partnership Discussion - DataFlow AI' },
    notion: {
      type: 'Business Opportunity',
      highlights: ['DataFlow AI partnership proposal', 'API integration + co-marketing', 'Revenue share: 70/30 in our favor']
    }
  }
};

function MockDemoChatFullPage() {
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showNotionModal, setShowNotionModal] = useState(false);
  const [activeEmail, setActiveEmail] = useState(null);
  const [calendarData, setCalendarData] = useState({ title: '', date: '', time: '10:00', duration: 15, attendee: '' });
  const [notionData, setNotionData] = useState({ title: '', database: 'Email Notes', highlights: [], notes: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const toggleEmail = (emailId) => {
    setExpandedEmail(expandedEmail === emailId ? null : emailId);
  };

  const openCalendarModal = (email) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setActiveEmail(email);
    setCalendarData({
      title: email.calendar.title,
      date: tomorrow.toISOString().split('T')[0],
      time: '10:00',
      duration: email.calendar.duration,
      attendee: email.from.email
    });
    setShowCalendarModal(true);
  };

  const openNotionModal = (email) => {
    setActiveEmail(email);
    setNotionData({
      title: email.subject,
      database: 'Email Notes',
      highlights: email.notion.highlights,
      notes: ''
    });
    setShowNotionModal(true);
  };

  const handleSave = (type) => {
    setSuccessMessage(type === 'calendar' ? 'Calendar event created' : 'Saved to Notion');
    setShowSuccess(true);
    setShowCalendarModal(false);
    setShowNotionModal(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const renderEmailCard = (emailId) => {
    const email = mockEmails[emailId];
    const isExpanded = expandedEmail === emailId;

    return (
      <div className={`${styles.emailCard} ${isExpanded ? styles.expanded : ''}`}>
        <div className={styles.emailCardHeader} onClick={() => toggleEmail(emailId)}>
          <div className={styles.avatar}>{email.from.name.split(' ').map(n => n[0]).join('')}</div>
          <div className={styles.emailInfo}>
            <div className={styles.emailTop}>
              <span className={styles.fromName}>{email.from.name}</span>
              <div className={styles.badges}>
                <span className={styles.calendarBadge}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                  </svg>
                </span>
                <span className={styles.notionBadge}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 4h16v16H4z"></path>
                    <path d="M9 9h6"></path>
                    <path d="M9 13h6"></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className={styles.subject}>{email.subject}</div>
          </div>
          <div className={styles.chevron}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isExpanded ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
            </svg>
          </div>
        </div>

        {isExpanded && (
          <div className={styles.emailBody}>
            <div className={styles.emailContent}>
              {email.body.split('\n').map((line, i) => <p key={i}>{line || <br />}</p>)}
            </div>

            <div className={styles.smartActions}>
              <div className={styles.actionRow}>
                <div className={`${styles.actionCard} ${styles.calendarCard}`}>
                  <div className={styles.actionIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div className={styles.actionInfo}>
                    <span className={styles.actionTitle}>{email.calendar.duration}-min {email.calendar.type}</span>
                    <span className={styles.actionSub}>Meeting detected</span>
                  </div>
                  <button className={styles.calendarBtn} onClick={() => openCalendarModal(email)}>
                    Add to Calendar
                  </button>
                </div>

                <div className={`${styles.actionCard} ${styles.notionCard}`}>
                  <div className={styles.actionIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16v16H4z"></path>
                      <path d="M9 9h6"></path>
                      <path d="M9 13h6"></path>
                      <path d="M9 17h4"></path>
                    </svg>
                  </div>
                  <div className={styles.actionInfo}>
                    <span className={styles.actionTitle}>{email.notion.type}</span>
                    <span className={styles.actionSub}>{email.notion.highlights.length} highlights</span>
                  </div>
                  <button className={styles.notionBtn} onClick={() => openNotionModal(email)}>
                    Save to Notion
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.demoPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Smart Actions Demo</h1>
        <p className={styles.subtitle}>Chat interface with Calendar + Notion integration</p>
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
              <div className={`${styles.modalIcon} ${styles.calendarModalIcon}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h2>Create Calendar Event</h2>
              <button className={styles.closeBtn} onClick={() => setShowCalendarModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.field}>
                <label>Title</label>
                <input type="text" value={calendarData.title} onChange={(e) => setCalendarData({...calendarData, title: e.target.value})} />
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>Date</label>
                  <input type="date" value={calendarData.date} onChange={(e) => setCalendarData({...calendarData, date: e.target.value})} />
                </div>
                <div className={styles.field}>
                  <label>Time</label>
                  <input type="time" value={calendarData.time} onChange={(e) => setCalendarData({...calendarData, time: e.target.value})} />
                </div>
                <div className={styles.field}>
                  <label>Duration</label>
                  <select value={calendarData.duration} onChange={(e) => setCalendarData({...calendarData, duration: parseInt(e.target.value)})}>
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={60}>1 hour</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label>Attendee</label>
                <input type="email" value={calendarData.attendee} onChange={(e) => setCalendarData({...calendarData, attendee: e.target.value})} />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowCalendarModal(false)}>Cancel</button>
              <button className={`${styles.saveBtn} ${styles.calendarSaveBtn}`} onClick={() => handleSave('calendar')}>Create Event</button>
            </div>
          </div>
        </div>
      )}

      {showNotionModal && (
        <div className={styles.modalOverlay} onClick={() => setShowNotionModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={`${styles.modalIcon} ${styles.notionModalIcon}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z"></path>
                  <path d="M9 9h6"></path>
                  <path d="M9 13h6"></path>
                  <path d="M9 17h4"></path>
                </svg>
              </div>
              <h2>Save to Notion</h2>
              <button className={styles.closeBtn} onClick={() => setShowNotionModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.field}>
                <label>Page Title</label>
                <input type="text" value={notionData.title} onChange={(e) => setNotionData({...notionData, title: e.target.value})} />
              </div>
              <div className={styles.field}>
                <label>Database</label>
                <select value={notionData.database} onChange={(e) => setNotionData({...notionData, database: e.target.value})}>
                  <option>Email Notes</option>
                  <option>Meeting Notes</option>
                  <option>Business Leads</option>
                  <option>Tasks</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Key Highlights</label>
                <div className={styles.highlights}>
                  {notionData.highlights.map((h, i) => (
                    <div key={i} className={styles.highlightItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {h}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.field}>
                <label>Additional Notes</label>
                <textarea rows={3} placeholder="Add any notes..." value={notionData.notes} onChange={(e) => setNotionData({...notionData, notes: e.target.value})}></textarea>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowNotionModal(false)}>Cancel</button>
              <button className={`${styles.saveBtn} ${styles.notionSaveBtn}`} onClick={() => handleSave('notion')}>Save to Notion</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <div className={styles.chatIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <span>AirThreads Chat</span>
          <div className={styles.integrations}>
            <span className={styles.integrationTag}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>Gmail</span>
            <span className={styles.integrationTag}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>Calendar</span>
            <span className={styles.integrationTag}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z"></path><path d="M9 9h6"></path></svg>Notion</span>
          </div>
        </div>

        <div className={styles.messages}>
          <div className={`${styles.message} ${styles.user}`}>
            <div className={styles.bubble}>Check my emails for any meeting requests or important info</div>
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.bubble}>
              <p>I found <strong>2 emails with actionable items</strong>. Each has smart actions you can use:</p>
            </div>
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            {renderEmailCard('email1')}
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            {renderEmailCard('email2')}
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.bubble}>
              <p>Click on either email to see the full content and use the smart actions to add meetings to your calendar or save key points to Notion.</p>
            </div>
          </div>
        </div>

        <div className={styles.inputArea}>
          <input type="text" placeholder="Ask about your emails..." disabled />
          <button disabled>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MockDemoChatFullPage;
