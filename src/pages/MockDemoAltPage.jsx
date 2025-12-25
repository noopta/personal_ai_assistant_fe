import { useState } from 'react';
import styles from './MockDemoAltPage.module.css';

const mockEmails = {
  email1: {
    id: 'email1',
    subject: 'Q4 Budget Review - Action Required',
    from: { name: 'Sarah Chen', email: 'sarah.chen@company.com' },
    to: [{ name: 'You', email: 'you@company.com' }],
    cc: [{ name: 'Michael Torres', email: 'm.torres@company.com' }],
    date: 'Dec 23, 2025 at 2:34 PM',
    preview: "I've completed the initial review of our Q4 budget allocation...",
    body: `Hi,

I've completed the initial review of our Q4 budget allocation and wanted to flag a few items that need your attention before the end of week.

Key findings:
1. Marketing spend is currently 12% over projected due to the November campaign extension
2. Engineering team has $45K remaining in their training budget that expires Dec 31
3. The new vendor contract savings offset some of our overages

Can we schedule a quick 15-minute call tomorrow to discuss? I'm free between 10-11am or after 3pm.

Thanks,
Sarah`
  },
  email2: {
    id: 'email2',
    subject: 'Re: Project Atlas Launch Timeline',
    from: { name: 'David Kim', email: 'david.kim@company.com' },
    to: [{ name: 'You', email: 'you@company.com' }, { name: 'Engineering Team', email: 'eng-team@company.com' }],
    cc: [],
    date: 'Dec 23, 2025 at 11:02 AM',
    preview: "Following up on our discussion yesterday - I've updated the launch timeline...",
    body: `Team,

Following up on our discussion yesterday - I've updated the launch timeline based on the QA feedback.

New proposed dates:
- Beta release: January 15th (was Jan 10th)
- Internal review: January 20-24th
- Public launch: February 1st

The 5-day delay accounts for the additional security audit requirements from compliance. I think this is the right call given the sensitivity of the user data we're handling.

Let me know if you have any concerns with this timeline.

Best,
David`
  },
  email3: {
    id: 'email3',
    subject: 'Team Offsite - Location Vote Results',
    from: { name: 'Lisa Patel', email: 'lisa.patel@company.com' },
    to: [{ name: 'All Hands', email: 'all@company.com' }],
    cc: [],
    date: 'Dec 22, 2025 at 4:45 PM',
    preview: "The votes are in for our Q1 team offsite location...",
    body: `Hey everyone!

The votes are in for our Q1 team offsite location. Here are the results:

1. Lake Tahoe retreat center - 42%
2. San Diego beach resort - 35%  
3. Portland team building venue - 23%

Lake Tahoe it is! I'll start working on logistics and send out calendar invites for March 14-16th.

If you have any dietary restrictions or accessibility needs, please reply to this email by January 10th so I can coordinate with the venue.

Excited for this one!
Lisa`
  }
};

function MockDemoAltPage() {
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [composeMode, setComposeMode] = useState(null);
  const [composeData, setComposeData] = useState({ to: '', cc: '', subject: '', body: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const toggleEmail = (emailId) => {
    if (expandedEmail === emailId) {
      setExpandedEmail(null);
      setComposeMode(null);
    } else {
      setExpandedEmail(emailId);
      setComposeMode(null);
    }
  };

  const handleReply = (email) => {
    setComposeData({
      to: email.from.email,
      cc: '',
      subject: `Re: ${email.subject}`,
      body: ''
    });
    setComposeMode('reply');
  };

  const handleForward = (email) => {
    setComposeData({
      to: '',
      cc: '',
      subject: `Fwd: ${email.subject}`,
      body: `\n\n---\nForwarded message:\nFrom: ${email.from.name} <${email.from.email}>\nDate: ${email.date}\nSubject: ${email.subject}\n\n${email.body}`
    });
    setComposeMode('forward');
  };

  const handleCancelCompose = () => {
    setComposeMode(null);
  };

  const handleSend = () => {
    const action = composeMode === 'reply' ? 'Reply sent' : 'Email forwarded';
    setSuccessMessage(action);
    setShowSuccess(true);
    setComposeMode(null);
    setComposeData({ to: '', cc: '', subject: '', body: '' });
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const renderEmailCard = (emailId, summary) => {
    const email = mockEmails[emailId];
    const isExpanded = expandedEmail === emailId;

    return (
      <div className={`${styles.emailCard} ${isExpanded ? styles.expanded : ''}`}>
        <div className={styles.emailCardHeader} onClick={() => toggleEmail(emailId)}>
          <div className={styles.emailCardAvatar}>
            {email.from.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className={styles.emailCardInfo}>
            <div className={styles.emailCardTop}>
              <span className={styles.emailCardFrom}>{email.from.name}</span>
              <span className={styles.emailCardDate}>{email.date.split(' at')[0]}</span>
            </div>
            <div className={styles.emailCardSubject}>{email.subject}</div>
            <div className={styles.emailCardPreview}>{summary}</div>
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
            {!composeMode ? (
              <>
                <div className={styles.emailFullContent}>
                  {email.body.split('\n').map((line, i) => (
                    <p key={i}>{line || <br />}</p>
                  ))}
                </div>
                <div className={styles.emailCardActions}>
                  <button className={styles.actionBtn} onClick={() => handleReply(email)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 17 4 12 9 7"></polyline>
                      <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                    </svg>
                    Reply
                  </button>
                  <button className={styles.actionBtn} onClick={() => handleForward(email)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 17 20 12 15 7"></polyline>
                      <path d="M4 18v-2a4 4 0 0 1 4-4h12"></path>
                    </svg>
                    Forward
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.inlineCompose}>
                <div className={styles.composeHeader}>
                  {composeMode === 'reply' ? 'Reply to ' + email.from.name : 'Forward email'}
                </div>
                <div className={styles.composeFields}>
                  <div className={styles.composeRow}>
                    <label>To:</label>
                    <input 
                      type="text" 
                      value={composeData.to}
                      onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                      placeholder="recipient@example.com"
                    />
                  </div>
                  <textarea
                    className={styles.composeBody}
                    value={composeData.body}
                    onChange={(e) => setComposeData({...composeData, body: e.target.value})}
                    placeholder="Write your message..."
                    rows={4}
                  />
                </div>
                <div className={styles.composeButtons}>
                  <button className={styles.cancelBtn} onClick={handleCancelCompose}>Cancel</button>
                  <button 
                    className={styles.sendBtn} 
                    onClick={handleSend}
                    disabled={!composeData.to.trim()}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Send
                  </button>
                </div>
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
        <h1 className={styles.title}>Email Integration Demo</h1>
        <p className={styles.subtitle}>Alternative UI: Expandable inline cards</p>
        <div className={styles.uiNote}>Click on any email card to expand and view full content</div>
      </div>

      {showSuccess && (
        <div className={styles.successToast}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {successMessage} successfully (demo mode)
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
        </div>

        <div className={styles.messages}>
          <div className={`${styles.message} ${styles.user}`}>
            <div className={styles.messageContent}>
              Can you check my recent emails and summarize anything urgent?
            </div>
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.messageContent}>
              <p>I found 3 emails that might need your attention:</p>
            </div>
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            {renderEmailCard('email1', "She's flagging budget items that need review before end of week")}
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            {renderEmailCard('email2', "Launch pushed back 5 days to Feb 1st for security audit")}
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            {renderEmailCard('email3', "Lake Tahoe won! Offsite scheduled for March 14-16th")}
          </div>

          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.messageContent}>
              <p>The most urgent is probably the budget review from Sarah - she needs a response before end of week. Would you like me to draft a reply?</p>
            </div>
          </div>
        </div>

        <div className={styles.inputArea}>
          <input 
            type="text" 
            placeholder="Ask about your emails..." 
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

export default MockDemoAltPage;
