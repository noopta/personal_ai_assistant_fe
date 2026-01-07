import { useState } from 'react';
import styles from './MockDemoCalendarPage.module.css';
import logger from '../utils/logger';

// Mock data matching backend /agent response format
const mockEmails = [
  {
    id: '19b732f1bdd35008',
    threadId: '19b732f1bdd35008',
    subject: 'Coffee Chat',
    snippet: "Hey Anupta,\r\n\r\nMy name is Bob and I am a third year computer science student. I was inspired by your LinkedIn profile and wanted to maybe have a 15 minute coff",
    body: "Hey Anupta,\r\n\r\nMy name is Bob and I am a third year computer science student. I was inspired by your LinkedIn profile and wanted to maybe have a 15 minute coffee chat with you whenever you are available to learn more about your career path, advices, and more.\r\n\r\nThank you,\nBob",
    from: {
      name: 'Anupta Islam',
      email: 'team@airthreads.ai'
    },
    to: ['anuptaislam33@gmail.com'],
    receivedAt: 'Wed, 31 Dec 2025 01:53:34 -0500',
    eventRelated: true,
    detectedMeeting: {
      type: 'coffee_chat',
      confidence: 0.95,
      duration: 15,
      suggestedTitle: 'Coffee Chat with Bob',
      proposedSlots: [],
      location: null,
      platform: null,
      reasoning: 'Email explicitly requests a 15-minute coffee chat to learn about career path',
      flexibility: 'whenever you are available'
    }
  },
  {
    id: '19b731c4bb8acba5',
    threadId: '19b731c4bb8acba5',
    subject: 'Request for coffee chat',
    snippet: "Hi Anupta,\n\nI hope this email finds you well! My name is Nayalash, and I'm reaching out to see if you'd be open to grabbing a coffee chat sometime this week",
    body: "Hi Anupta,\n\nI hope this email finds you well! My name is Nayalash, and I'm reaching out to see if you'd be open to grabbing a coffee chat sometime this week.\n\nI'd love to learn more about your experience and insights in your field. I believe a conversation with you would be incredibly valuable for my professional development, and I'd genuinely appreciate the opportunity to connect.\n\nWould you have any availability for a 20-30 minute coffee chat this week? I'm flexible and can meet Monday through Friday, anytime between 10 AM - 4 PM EST.\n\nLooking forward to hearing from you!\n\nBest regards,\nNayalash",
    from: {
      name: 'anuptaislam33@gmail.com',
      email: 'anuptaislam33@gmail.com'
    },
    to: ['anuptaislam33@gmail.com'],
    receivedAt: 'Tue, 30 Dec 2025 22:33:12 -0800',
    eventRelated: true,
    detectedMeeting: {
      type: 'coffee_chat',
      confidence: 0.92,
      duration: 25,
      suggestedTitle: 'Coffee Chat with Nayalash',
      proposedSlots: [
        { dateTime: '2026-01-06T10:00:00-05:00', confidence: 0.8 },
        { dateTime: '2026-01-06T14:00:00-05:00', confidence: 0.8 },
        { dateTime: '2026-01-07T10:00:00-05:00', confidence: 0.8 },
        { dateTime: '2026-01-07T14:00:00-05:00', confidence: 0.8 }
      ],
      location: null,
      platform: null,
      reasoning: 'Email requests 20-30 minute coffee chat with specific availability windows',
      flexibility: 'Monday through Friday, anytime between 10 AM - 4 PM EST'
    }
  },
  {
    id: '19b730a1cc7def12',
    threadId: '19b730a1cc7def12',
    subject: 'Team lunch next week?',
    snippet: "Hey team!\n\nSince we'll all be back in office next Tuesday, want to do a team lunch? I was thinking that new Thai place on King St.",
    body: "Hey team!\n\nSince we'll all be back in office next Tuesday, want to do a team lunch? I was thinking that new Thai place on King St.\n\nLet me know if you're interested!\n\nPriya",
    from: {
      name: 'Priya Sharma',
      email: 'priya.sharma@company.com'
    },
    to: ['product@company.com'],
    receivedAt: 'Mon, 29 Dec 2025 16:12:00 -0500',
    eventRelated: false,
    detectedMeeting: null
  }
];

function MockDemoCalendarPage() {
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [calendarData, setCalendarData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [sidePanelEmail, setSidePanelEmail] = useState(null);

  const handleViewFullEmail = (e, email) => {
    e.stopPropagation();
    setSidePanelEmail(email);
  };

  const closeSidePanel = () => {
    setSidePanelEmail(null);
  };

  const toggleEmail = (email) => {
    setExpandedEmail(expandedEmail === email.id ? null : email.id);
  };

  const handleCreateEvent = (email) => {
    const meeting = email.detectedMeeting;
    let eventDate, eventTime;
    
    if (meeting.proposedSlots && meeting.proposedSlots.length > 0) {
      const slot = new Date(meeting.proposedSlots[0].dateTime);
      eventDate = slot.toISOString().split('T')[0];
      eventTime = slot.toTimeString().slice(0, 5);
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      eventDate = tomorrow.toISOString().split('T')[0];
      eventTime = '10:00';
    }
    
    setCalendarData({
      title: meeting.suggestedTitle,
      date: eventDate,
      time: eventTime,
      duration: meeting.duration,
      attendee: email.from.email,
      location: meeting.location || (meeting.type === 'coffee_chat' ? 'Coffee Bar - 2nd Floor' : 'Conference Room A'),
      platform: meeting.platform,
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

  const handleReply = (email) => {
    logger.log('📧 Reply to:', email.from.email, 'Subject:', email.subject);
    setSuccessMessage('Reply draft opened');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleForward = (email) => {
    logger.log('📤 Forward email:', email.subject);
    setSuccessMessage('Forward draft opened');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const formatSlotTime = (slot) => {
    if (!slot || !slot.dateTime) return '';
    const date = new Date(slot.dateTime);
    return date.toLocaleString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderEmailCard = (email) => {
    const isExpanded = expandedEmail === email.id;
    const hasMeeting = email.eventRelated && email.detectedMeeting;

    return (
      <div key={email.id} className={`${styles.emailCard} ${isExpanded ? styles.expanded : ''} ${hasMeeting ? styles.hasMeeting : ''}`}>
        <div className={styles.emailCardHeader} onClick={() => toggleEmail(email)}>
          <div className={styles.emailCardAvatar}>
            {email.from.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
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
                  <div className={styles.smartActionTitle}>
                    {email.detectedMeeting.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Request
                    {email.detectedMeeting.confidence && (
                      <span className={styles.confidence}>{Math.round(email.detectedMeeting.confidence * 100)}% confidence</span>
                    )}
                  </div>
                  <div className={styles.smartActionDetails}>
                    <span>{email.detectedMeeting.duration} minutes{email.detectedMeeting.platform && ` via ${email.detectedMeeting.platform}`}</span>
                    {email.detectedMeeting.flexibility && (
                      <span className={styles.flexibility}>Flexibility: {email.detectedMeeting.flexibility}</span>
                    )}
                    {email.detectedMeeting.proposedSlots && email.detectedMeeting.proposedSlots.length > 0 && (
                      <span className={styles.slots}>
                        Suggested: {email.detectedMeeting.proposedSlots.slice(0, 2).map(formatSlotTime).join(', ')}
                      </span>
                    )}
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

            <div className={styles.actionToolbar}>
              <div className={styles.actionGroup}>
                <button 
                  className={styles.actionBtn}
                  onClick={(e) => { e.stopPropagation(); handleReply(email); }}
                  title="Reply"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 17 4 12 9 7"></polyline>
                    <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                  </svg>
                  <span>Reply</span>
                </button>
                <button 
                  className={styles.actionBtn}
                  onClick={(e) => { e.stopPropagation(); handleForward(email); }}
                  title="Forward"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 17 20 12 15 7"></polyline>
                    <path d="M4 18v-2a4 4 0 0 1 4-4h12"></path>
                  </svg>
                  <span>Forward</span>
                </button>
                <div className={styles.actionDivider}></div>
                <button 
                  className={styles.actionBtn}
                  onClick={(e) => handleViewFullEmail(e, email)}
                  title="View full email"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>Expand</span>
                </button>
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

      <div className={`${styles.mainContainer} ${sidePanelEmail ? styles.withPanel : ''}`}>
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
              <p>I found {mockEmails.length} recent emails. <strong>{mockEmails.filter(e => e.eventRelated).length} of them contain meeting requests</strong> that I've highlighted for you:</p>
            </div>
          </div>

          {mockEmails.map(email => (
            <div key={email.id} className={`${styles.message} ${styles.assistant}`}>
              {renderEmailCard(email)}
            </div>
          ))}

          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.messageContent}>
              <p>Bob's coffee chat request seems like a good opportunity - he's a CS student interested in your career path. Would you like me to suggest some available time slots from your calendar?</p>
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
            <div className={styles.panelEmailHeader}>
              <div className={styles.panelEmailMeta}>
                <div className={styles.panelAvatar}>
                  {sidePanelEmail.from.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className={styles.panelFrom}>{sidePanelEmail.from.name}</div>
                  <div className={styles.panelEmail}>{sidePanelEmail.from.email}</div>
                </div>
              </div>
              <div className={styles.panelDate}>{sidePanelEmail.receivedAt}</div>
            </div>

            <div className={styles.panelSubjectRow}>
              <h4 className={styles.panelSubject}>{sidePanelEmail.subject}</h4>
              {sidePanelEmail.eventRelated && sidePanelEmail.detectedMeeting && (
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

            <div className={styles.panelBody}>
              {sidePanelEmail.body.split('\n').map((line, i) => (
                <p key={i}>{line || <br />}</p>
              ))}
            </div>

            <div className={styles.panelActions}>
              <div className={styles.panelActionRow}>
                <button className={styles.panelActionBtn} onClick={() => handleReply(sidePanelEmail)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 17 4 12 9 7"></polyline>
                    <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                  </svg>
                  Reply
                </button>
                <button className={styles.panelActionBtn} onClick={() => handleForward(sidePanelEmail)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 17 20 12 15 7"></polyline>
                    <path d="M4 18v-2a4 4 0 0 1 4-4h12"></path>
                  </svg>
                  Forward
                </button>
              </div>
              {sidePanelEmail.eventRelated && sidePanelEmail.detectedMeeting && (
                <button className={styles.createEventBtn} onClick={() => handleCreateEvent(sidePanelEmail)}>
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
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default MockDemoCalendarPage;
