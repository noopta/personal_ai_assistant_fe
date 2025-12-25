import { useState } from 'react';
import styles from './MockDemoFullPage.module.css';

const mockEmails = {
  email1: {
    id: 'email1',
    subject: 'Coffee Chat Request - Summer Intern',
    from: { name: 'Alex Rivera', email: 'alex.rivera@company.com' },
    date: 'Dec 24, 2025 at 9:15 AM',
    body: `Hi!

I'm Alex, one of the summer interns on the product team. I've been really impressed with the AI features you've been building and would love to learn more about your work.

Would you be open to a quick 15-minute coffee chat sometime this week? I'm flexible and can work around your schedule. 

I'm particularly interested in:
- How you approach AI/ML product decisions
- Your journey to becoming a founder
- Any advice for someone early in their career

No pressure at all if you're too busy!

Thanks,
Alex`,
    smartActions: {
      calendar: {
        detected: true,
        type: 'Coffee Chat',
        duration: 15,
        requestor: 'Alex Rivera',
        suggestedTitle: 'Coffee Chat with Alex Rivera'
      },
      notion: {
        detected: true,
        type: 'Key Points',
        highlights: [
          'Intern interested in AI/ML product decisions',
          'Wants career advice and founder journey insights',
          'Flexible schedule, open this week'
        ]
      }
    }
  },
  email2: {
    id: 'email2',
    subject: 'Partnership Proposal - DataFlow AI',
    from: { name: 'Sarah Mitchell', email: 'sarah@dataflow.ai' },
    date: 'Dec 24, 2025 at 8:02 AM',
    body: `Hi,

I'm the Head of Partnerships at DataFlow AI. We've been following AirThreads' progress and are impressed by your Gmail and Calendar integrations.

We'd love to explore a potential partnership:

Key proposal points:
1. API integration between our platforms
2. Co-marketing opportunities for Q1 launch
3. Revenue share model (we're thinking 70/30 in your favor)
4. Technical support from our team during integration

Our platform processes 2M+ emails daily for enterprise clients, and we think there's strong synergy.

Would you be available for a 30-minute call next week to discuss? I'm free Tuesday or Thursday afternoon.

Best,
Sarah Mitchell
Head of Partnerships, DataFlow AI`,
    smartActions: {
      calendar: {
        detected: true,
        type: 'Partnership Call',
        duration: 30,
        requestor: 'Sarah Mitchell',
        suggestedTitle: 'Partnership Discussion - DataFlow AI'
      },
      notion: {
        detected: true,
        type: 'Business Opportunity',
        highlights: [
          'DataFlow AI - 2M+ emails/day enterprise platform',
          'Partnership: API integration + co-marketing',
          'Revenue share: 70/30 in our favor',
          'Contact: Sarah Mitchell, Head of Partnerships'
        ]
      }
    }
  },
  email3: {
    id: 'email3',
    subject: 'Your AWS bill is ready',
    from: { name: 'AWS Billing', email: 'no-reply@aws.amazon.com' },
    date: 'Dec 23, 2025 at 6:00 AM',
    body: `Your AWS bill for December 2025 is ready.

Total: $847.32

View your bill in the AWS Console.

Thank you for using AWS.`,
    smartActions: {
      calendar: { detected: false },
      notion: { detected: false }
    }
  }
};

function MockDemoFullPage() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [activeTab, setActiveTab] = useState('email');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showNotionModal, setShowNotionModal] = useState(false);
  const [calendarData, setCalendarData] = useState(null);
  const [notionData, setNotionData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSelectEmail = (emailId) => {
    setSelectedEmail(mockEmails[emailId]);
    setActiveTab('email');
  };

  const handleCreateCalendarEvent = () => {
    const meeting = selectedEmail.smartActions.calendar;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setCalendarData({
      title: meeting.suggestedTitle,
      date: tomorrow.toISOString().split('T')[0],
      time: '10:00',
      duration: meeting.duration,
      attendee: selectedEmail.from.email,
      notes: `Re: ${selectedEmail.subject}`
    });
    setShowCalendarModal(true);
  };

  const handleSaveToNotion = () => {
    const notion = selectedEmail.smartActions.notion;
    setNotionData({
      title: selectedEmail.subject,
      database: 'Email Notes',
      tags: [notion.type],
      highlights: notion.highlights,
      source: `Email from ${selectedEmail.from.name}`,
      date: selectedEmail.date
    });
    setShowNotionModal(true);
  };

  const handleSaveCalendar = () => {
    setSuccessMessage('Calendar event created');
    setShowSuccess(true);
    setShowCalendarModal(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSaveNotion = () => {
    setSuccessMessage('Saved to Notion');
    setShowSuccess(true);
    setShowNotionModal(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const emails = Object.values(mockEmails);

  return (
    <div className={styles.demoPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Full Integration Demo</h1>
        <p className={styles.subtitle}>Email + Calendar + Notion in one view</p>
      </div>

      {showSuccess && (
        <div className={styles.successToast}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {successMessage} (demo mode)
        </div>
      )}

      {showCalendarModal && calendarData && (
        <div className={styles.modalOverlay} onClick={() => setShowCalendarModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={`${styles.modalIcon} ${styles.calendarIcon}`}>
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
              <button className={`${styles.saveBtn} ${styles.calendarSave}`} onClick={handleSaveCalendar}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}

      {showNotionModal && notionData && (
        <div className={styles.modalOverlay} onClick={() => setShowNotionModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={`${styles.modalIcon} ${styles.notionIcon}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z"></path>
                  <path d="M9 9h6"></path>
                  <path d="M9 13h6"></path>
                  <path d="M9 17h4"></path>
                </svg>
              </div>
              <h2>Save to Notion</h2>
              <button className={styles.modalClose} onClick={() => setShowNotionModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Page Title</label>
                <input type="text" value={notionData.title} onChange={(e) => setNotionData({...notionData, title: e.target.value})} />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Database</label>
                  <select value={notionData.database} onChange={(e) => setNotionData({...notionData, database: e.target.value})}>
                    <option>Email Notes</option>
                    <option>Meeting Notes</option>
                    <option>Business Leads</option>
                    <option>Tasks</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Tag</label>
                  <input type="text" value={notionData.tags[0]} onChange={(e) => setNotionData({...notionData, tags: [e.target.value]})} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Key Highlights</label>
                <div className={styles.highlightsList}>
                  {notionData.highlights.map((h, i) => (
                    <div key={i} className={styles.highlightItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Additional Notes</label>
                <textarea placeholder="Add any additional notes..." rows={3}></textarea>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowNotionModal(false)}>Cancel</button>
              <button className={`${styles.saveBtn} ${styles.notionSave}`} onClick={handleSaveNotion}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Save to Notion
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h3>Inbox</h3>
            <span className={styles.emailCount}>{emails.length}</span>
          </div>
          <div className={styles.emailList}>
            {emails.map((email) => {
              const hasActions = email.smartActions.calendar.detected || email.smartActions.notion.detected;
              return (
                <div
                  key={email.id}
                  className={`${styles.emailItem} ${selectedEmail?.id === email.id ? styles.selected : ''}`}
                  onClick={() => handleSelectEmail(email.id)}
                >
                  <div className={styles.emailItemAvatar}>
                    {email.from.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={styles.emailItemContent}>
                    <div className={styles.emailItemFrom}>{email.from.name}</div>
                    <div className={styles.emailItemSubject}>{email.subject}</div>
                  </div>
                  {hasActions && (
                    <div className={styles.smartDot}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.mainContent}>
          {selectedEmail ? (
            <>
              <div className={styles.emailViewHeader}>
                <div className={styles.emailViewMeta}>
                  <div className={styles.emailViewAvatar}>
                    {selectedEmail.from.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className={styles.emailViewFrom}>{selectedEmail.from.name}</div>
                    <div className={styles.emailViewEmail}>{selectedEmail.from.email}</div>
                  </div>
                </div>
                <div className={styles.emailViewDate}>{selectedEmail.date}</div>
              </div>

              <h2 className={styles.emailViewSubject}>{selectedEmail.subject}</h2>

              <div className={styles.tabBar}>
                <button 
                  className={`${styles.tab} ${activeTab === 'email' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('email')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Email
                </button>
                <button 
                  className={`${styles.tab} ${activeTab === 'actions' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('actions')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  Smart Actions
                  {(selectedEmail.smartActions.calendar.detected || selectedEmail.smartActions.notion.detected) && (
                    <span className={styles.actionBadge}>
                      {(selectedEmail.smartActions.calendar.detected ? 1 : 0) + (selectedEmail.smartActions.notion.detected ? 1 : 0)}
                    </span>
                  )}
                </button>
              </div>

              {activeTab === 'email' && (
                <div className={styles.emailBody}>
                  {selectedEmail.body.split('\n').map((line, i) => (
                    <p key={i}>{line || <br />}</p>
                  ))}
                </div>
              )}

              {activeTab === 'actions' && (
                <div className={styles.actionsPanel}>
                  {selectedEmail.smartActions.calendar.detected && (
                    <div className={`${styles.actionCard} ${styles.calendarAction}`}>
                      <div className={styles.actionCardIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <div className={styles.actionCardContent}>
                        <h4>Meeting Request Detected</h4>
                        <p>{selectedEmail.smartActions.calendar.requestor} wants a {selectedEmail.smartActions.calendar.duration}-minute {selectedEmail.smartActions.calendar.type.toLowerCase()}</p>
                      </div>
                      <button className={`${styles.actionButton} ${styles.calendarBtn}`} onClick={handleCreateCalendarEvent}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add to Calendar
                      </button>
                    </div>
                  )}

                  {selectedEmail.smartActions.notion.detected && (
                    <div className={`${styles.actionCard} ${styles.notionAction}`}>
                      <div className={styles.actionCardIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16v16H4z"></path>
                          <path d="M9 9h6"></path>
                          <path d="M9 13h6"></path>
                          <path d="M9 17h4"></path>
                        </svg>
                      </div>
                      <div className={styles.actionCardContent}>
                        <h4>{selectedEmail.smartActions.notion.type} Detected</h4>
                        <ul className={styles.highlightPreview}>
                          {selectedEmail.smartActions.notion.highlights.slice(0, 2).map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                          {selectedEmail.smartActions.notion.highlights.length > 2 && (
                            <li className={styles.moreHighlights}>+{selectedEmail.smartActions.notion.highlights.length - 2} more</li>
                          )}
                        </ul>
                      </div>
                      <button className={`${styles.actionButton} ${styles.notionBtn}`} onClick={handleSaveToNotion}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                          <polyline points="17 21 17 13 7 13 7 21"></polyline>
                          <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        Save to Notion
                      </button>
                    </div>
                  )}

                  {!selectedEmail.smartActions.calendar.detected && !selectedEmail.smartActions.notion.detected && (
                    <div className={styles.noActions}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <p>No smart actions detected for this email</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <p>Select an email to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MockDemoFullPage;
