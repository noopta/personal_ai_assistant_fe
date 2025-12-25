import { useState } from 'react';
import styles from './MockDemoPage.module.css';

const mockEmails = {
  email1: {
    id: 'email1',
    subject: 'Q4 Budget Review - Action Required',
    from: { name: 'Sarah Chen', email: 'sarah.chen@company.com' },
    to: [{ name: 'You', email: 'you@company.com' }],
    cc: [{ name: 'Michael Torres', email: 'm.torres@company.com' }],
    date: 'Dec 23, 2025 at 2:34 PM',
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

const mockConversation = [
  {
    type: 'user',
    content: 'Can you check my recent emails and summarize anything urgent?'
  },
  {
    type: 'assistant',
    content: `I found 3 emails that might need your attention:

1. **Q4 Budget Review** from Sarah Chen - She's flagging some budget items that need review before end of week and wants to schedule a call tomorrow.`,
    emailRef: 'email1',
    emailLabel: 'View email'
  },
  {
    type: 'assistant',
    content: `2. **Project Atlas Launch Timeline** from David Kim - The launch has been pushed back 5 days to February 1st due to additional security audit requirements.`,
    emailRef: 'email2',
    emailLabel: 'View email'
  },
  {
    type: 'assistant',
    content: `3. **Team Offsite Results** from Lisa Patel - Lake Tahoe won the vote! The offsite is scheduled for March 14-16th.`,
    emailRef: 'email3',
    emailLabel: 'View email'
  },
  {
    type: 'assistant',
    content: `The most urgent is probably the budget review from Sarah - she needs a response before end of week. Would you like me to draft a reply or schedule a meeting with her?`
  },
  {
    type: 'user',
    content: 'Yes, can you draft a reply to Sarah saying I\'m available at 10:30am tomorrow?'
  },
  {
    type: 'assistant',
    content: `Here's a draft reply to Sarah:

---

**To:** sarah.chen@company.com  
**Subject:** Re: Q4 Budget Review - Action Required

Hi Sarah,

Thanks for the thorough review. I'm available tomorrow at 10:30am - does that work for you?

Looking forward to discussing the budget items.

Best regards

---

Would you like me to send this, or would you like to make any changes?`
  }
];

function MockDemoPage() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [composeMode, setComposeMode] = useState(null);
  const [composeData, setComposeData] = useState({ to: '', cc: '', subject: '', body: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleInputChange = (field, value) => {
    setComposeData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.demoPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Email Integration Demo</h1>
        <p className={styles.subtitle}>Click "View email" links to see inline email viewing</p>
      </div>

      {showSuccess && (
        <div className={styles.successToast}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {successMessage} successfully (demo mode)
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
          </div>
          
          <div className={styles.messages}>
            {mockConversation.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${styles[msg.type]}`}>
                <div className={styles.messageContent}>
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                  {msg.emailRef && (
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
                <h2 className={styles.emailSubject}>{selectedEmail.subject}</h2>
                
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

export default MockDemoPage;
