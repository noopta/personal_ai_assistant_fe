import { useState } from 'react';
import styles from './MockDemoCalendarPage.module.css';

const mockEmails = {
  email1: {
    id: 'email1',
    subject: 'Coffee Chat Request - Summer Intern',
    from: { name: 'Alex Rivera', email: 'alex.rivera@company.com' },
    to: [{ name: 'You', email: 'you@company.com' }],
    date: 'Dec 24, 2025 at 9:15 AM',
    body: `Hi!

I'm Alex, one of the summer interns on the product team. I've been really impressed with the AI features you've been building and would love to learn more about your work.

Would you be open to a quick 15-minute coffee chat sometime this week? I'm flexible and can work around your schedule. 

I'm particularly interested in:
- How you approach AI/ML product decisions
- Your journey to becoming a founder
- Any advice for someone early in their career

No pressure at all if you're too busy - I know everyone has a lot on their plate!

Thanks,
Alex`,
    detectedMeeting: {
      type: 'coffee_chat',
      duration: 15,
      requestor: 'Alex Rivera',
      flexibility: 'this week',
      suggestedTitle: 'Coffee Chat with Alex Rivera'
    }
  },
  email2: {
    id: 'email2',
    subject: 'Re: Q1 Planning - Let\'s sync',
    from: { name: 'Jordan Lee', email: 'jordan.lee@company.com' },
    to: [{ name: 'You', email: 'you@company.com' }],
    date: 'Dec 24, 2025 at 8:30 AM',
    body: `Hey,

Following up on the Q1 planning doc I shared. I think we need to align on the roadmap priorities before the holidays.

Can we do a 30-minute sync on Thursday afternoon? I'm free 2-4pm.

Thanks,
Jordan`,
    detectedMeeting: {
      type: 'sync',
      duration: 30,
      requestor: 'Jordan Lee',
      flexibility: 'Thursday 2-4pm',
      suggestedTitle: 'Q1 Planning Sync with Jordan'
    }
  },
  email3: {
    id: 'email3',
    subject: 'Team lunch next week?',
    from: { name: 'Priya Sharma', email: 'priya.sharma@company.com' },
    to: [{ name: 'Product Team', email: 'product@company.com' }],
    date: 'Dec 23, 2025 at 4:12 PM',
    body: `Hey team!

Since we'll all be back in office next Tuesday, want to do a team lunch? I was thinking that new Thai place on King St.

Let me know if you're interested!

Priya`,
    detectedMeeting: null
  }
};

function MockDemoCalendarPage() {
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [calendarData, setCalendarData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const toggleEmail = (emailId) => {
    setExpandedEmail(expandedEmail === emailId ? null : emailId);
  };

  const handleCreateEvent = (email) => {
    const meeting = email.detectedMeeting;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setCalendarData({
      title: meeting.suggestedTitle,
      date: tomorrow.toISOString().split('T')[0],
      time: '10:00',
      duration: meeting.duration,
      attendee: email.from.email,
      location: meeting.type === 'coffee_chat' ? 'Coffee Bar - 2nd Floor' : 'Conference Room A',
      notes: `Re: ${email.subject}`
    });
    setShowCalendarModal(true);
  };

  const handleSaveEvent = () => {
    setSuccessMessage('Calendar event created');
    setShowSuccess(true);
    setShowCalendarModal(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const renderEmailCard = (emailId) => {
    const email = mockEmails[emailId];
    const isExpanded = expandedEmail === emailId;
    const hasMeeting = email.detectedMeeting !== null;

    return (
      <div className={`${styles.emailCard} ${isExpanded ? styles.expanded : ''} ${hasMeeting ? styles.hasMeeting : ''}`}>
        <div className={styles.emailCardHeader} onClick={() => toggleEmail(emailId)}>
          <div className={styles.emailCardAvatar}>
            {email.from.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className={styles.emailCardInfo}>
            <div className={styles.emailCardTop}>
              <span className={styles.emailCardFrom}>{email.from.name}</span>
              {hasMeeting && (
                <span className={styles.meetingBadge}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Meeting detected
                </span>
              )}
            </div>
            <div className={styles.emailCardSubject}>{email.subject}</div>
          </div>
          <div className={styles.emailCardChevron}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isExpanded ? (
                <polyline points="18 15 12 9 6 15"></polyline>
              ) : (
                <polyline points="6 9 12 15 18 9"></polyline>
              )}
            </svg>
          </div>
        </div>

        {isExpanded && (
          <div className={styles.emailCardBody}>
            <div className={styles.emailFullContent}>
              {email.body.split('\n').map((line, i) => (
                <p key={i}>{line || <br />}</p>
              ))}
            </div>

            {hasMeeting && (
              <div className={styles.smartAction}>
                <div className={styles.smartActionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className={styles.smartActionContent}>
                  <div className={styles.smartActionTitle}>Meeting Request Detected</div>
                  <div className={styles.smartActionDetails}>
                    <span>{email.detectedMeeting.requestor} is requesting a {email.detectedMeeting.duration}-minute {email.detectedMeeting.type.replace('_', ' ')}</span>
                    <span className={styles.flexibility}>Available: {email.detectedMeeting.flexibility}</span>
                  </div>
                </div>
                <button className={styles.createEventBtn} onClick={() => handleCreateEvent(email)}>
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
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.demoPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Email + Calendar Demo</h1>
        <p className={styles.subtitle}>Smart meeting detection with calendar integration</p>
        <div className={styles.uiNote}>AI detects meeting requests and offers to create calendar events</div>
      </div>

      {showSuccess && (
        <div className={styles.successToast}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {successMessage} successfully (demo mode)
        </div>
      )}

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
                <label>Location</label>
                <input 
                  type="text" 
                  value={calendarData.location}
                  onChange={(e) => setCalendarData({...calendarData, location: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Notes</label>
                <textarea 
                  value={calendarData.notes}
                  onChange={(e) => setCalendarData({...calendarData, notes: e.target.value})}
                  rows={2}
                />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowCalendarModal(false)}>
                Cancel
              </button>
              <button className={styles.saveBtn} onClick={handleSaveEvent}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.chatContainer}>
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
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Calendar
            </span>
          </div>
        </div>

        <div className={styles.messages}>
          <div className={`${styles.message} ${styles.user}`}>
            <div className={styles.messageContent}>
              Check my emails and let me know if anyone wants to meet
            </div>
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.messageContent}>
              <p>I found 3 recent emails. <strong>2 of them contain meeting requests</strong> that I've highlighted for you:</p>
            </div>
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            {renderEmailCard('email1')}
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            {renderEmailCard('email2')}
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            {renderEmailCard('email3')}
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.messageContent}>
              <p>Alex's coffee chat request seems like a good opportunity - they're an intern interested in your AI work. Would you like me to suggest some available time slots from your calendar?</p>
            </div>
          </div>
        </div>

        <div className={styles.inputArea}>
          <input 
            type="text" 
            placeholder="Ask about your emails or calendar..." 
            className={styles.input}
            disabled
          />
          <button className={styles.inputSendBtn} disabled>
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

export default MockDemoCalendarPage;
