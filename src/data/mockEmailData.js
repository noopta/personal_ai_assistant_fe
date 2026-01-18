const generateMockEmails = () => {
  const categories = {
    urgent: { label: 'Urgent', color: '#dc2626', icon: '🔴' },
    meetings: { label: 'Meetings', color: '#7c3aed', icon: '📅' },
    bills: { label: 'Bills & Payments', color: '#059669', icon: '💳' },
    interviews: { label: 'Interviews', color: '#2563eb', icon: '💼' },
    newsletters: { label: 'Newsletters', color: '#0891b2', icon: '📰' },
    promotional: { label: 'Promotional', color: '#d97706', icon: '🏷️' },
    social: { label: 'Social', color: '#ec4899', icon: '👥' },
    updates: { label: 'Updates', color: '#6366f1', icon: '🔔' },
    receipts: { label: 'Receipts', color: '#10b981', icon: '🧾' },
    personal: { label: 'Personal', color: '#8b5cf6', icon: '💬' },
  };

  const urgencyLevels = ['high', 'medium', 'low'];

  // Thread reply templates for generating conversations
  const replyTemplates = {
    meetings: [
      { body: 'That time works perfectly for me! Looking forward to it.' },
      { body: 'Just confirming - is this in-person or virtual?' },
      { body: 'Can we push this back by 30 minutes? Running a bit behind.' },
    ],
    personal: [
      { body: 'Sounds great! Count me in.' },
      { body: 'Thanks for thinking of me! Let me check my schedule.' },
      { body: 'Absolutely! What time works best for you?' },
    ],
    interviews: [
      { body: 'Thank you for the opportunity! I\'m excited to speak with the team.' },
      { body: 'I\'ve reviewed the materials. Looking forward to our conversation.' },
      { body: 'Quick question - should I prepare anything specific for this interview?' },
    ],
  };

  const emailTemplates = [
    { category: 'urgent', subject: 'ACTION REQUIRED: Your account security', from: 'security@bank.com', urgency: 'high', snippet: 'We detected unusual activity on your account. Please verify your identity immediately to prevent...' },
    { category: 'urgent', subject: 'Payment Failed - Immediate Action Needed', from: 'billing@netflix.com', urgency: 'high', snippet: 'Your payment method was declined. Update your billing information to continue your subscription...' },
    { category: 'urgent', subject: 'Deadline Tomorrow: Project Submission', from: 'manager@company.com', urgency: 'high', snippet: 'Reminder that the quarterly report is due tomorrow by 5 PM EST. Please ensure all sections are...' },
    { category: 'urgent', subject: 'Flight Confirmation Change', from: 'noreply@airline.com', urgency: 'high', snippet: 'Your flight UA 2847 has been rescheduled. New departure time: 3:45 PM. Please confirm...' },
    
    { category: 'meetings', subject: 'Coffee Chat Request', from: 'alex.chen@gmail.com', urgency: 'medium', snippet: 'Hi! I saw your LinkedIn profile and would love to connect over a 15-minute coffee chat...' },
    { category: 'meetings', subject: 'Team Sync - Tomorrow 2PM', from: 'calendar@company.com', urgency: 'medium', snippet: 'You have been invited to Team Sync meeting. Agenda: Q1 planning, resource allocation...' },
    { category: 'meetings', subject: '1:1 with Sarah - Rescheduled', from: 'sarah.johnson@company.com', urgency: 'low', snippet: 'I need to reschedule our 1:1 from Thursday to Friday. Does 3 PM work for you?' },
    { category: 'meetings', subject: 'Investor Call - Next Week', from: 'vc@fundpartners.com', urgency: 'high', snippet: 'Following up on our conversation. Would love to schedule a call to discuss Series A...' },
    { category: 'meetings', subject: 'Book Club Meeting', from: 'bookclub@community.org', urgency: 'low', snippet: 'This months book is "Atomic Habits". We will meet at the usual spot on Saturday...' },
    
    { category: 'bills', subject: 'Your electricity bill is ready', from: 'noreply@hydro.com', urgency: 'medium', snippet: 'Your bill for December is $147.82. Due date: January 15th. View your detailed usage...' },
    { category: 'bills', subject: 'Credit Card Statement', from: 'statements@chase.com', urgency: 'medium', snippet: 'Your statement is ready. Current balance: $2,341.56. Minimum payment due: $35.00...' },
    { category: 'bills', subject: 'Internet Bill - Auto-Pay Scheduled', from: 'billing@isp.com', urgency: 'low', snippet: 'Your monthly internet bill of $79.99 will be automatically charged on January 10th...' },
    { category: 'bills', subject: 'Rent Payment Reminder', from: 'manager@apartments.com', urgency: 'high', snippet: 'Friendly reminder that rent of $1,850 is due on the 1st. Please ensure funds are available...' },
    
    { category: 'interviews', subject: 'Interview Confirmation - Software Engineer', from: 'recruiting@techcorp.com', urgency: 'high', snippet: 'We are pleased to confirm your interview for January 12th at 10 AM. Please join via Zoom...' },
    { category: 'interviews', subject: 'Next Steps: Product Manager Role', from: 'hr@startup.io', urgency: 'high', snippet: 'Thank you for your application. We would like to invite you to the next round of interviews...' },
    { category: 'interviews', subject: 'Reference Check Request', from: 'background@hireright.com', urgency: 'medium', snippet: 'A potential employer has requested a reference check. Please complete the form within 48 hours...' },
    { category: 'interviews', subject: 'Offer Letter - Congratulations!', from: 'offers@dreamcompany.com', urgency: 'high', snippet: 'We are thrilled to extend an offer for the position of Senior Developer. Please review...' },
    
    { category: 'newsletters', subject: 'This Week in Tech', from: 'newsletter@techcrunch.com', urgency: 'low', snippet: 'Top stories: Apple announces new chip, AI breakthrough at OpenAI, startup funding roundup...' },
    { category: 'newsletters', subject: 'Morning Brew ☕', from: 'crew@morningbrew.com', urgency: 'low', snippet: 'Good morning! Markets are up, Bitcoin hits new high, and why remote work is here to stay...' },
    { category: 'newsletters', subject: 'Product Hunt Daily', from: 'hello@producthunt.com', urgency: 'low', snippet: 'Todays top products: AI writing assistant, productivity app, and more innovative tools...' },
    { category: 'newsletters', subject: 'Hacker News Digest', from: 'digest@hn.com', urgency: 'low', snippet: 'Top discussions: Programming languages debate, startup advice, and technical deep dives...' },
    
    { category: 'promotional', subject: '🎉 50% OFF Everything!', from: 'deals@retailstore.com', urgency: 'low', snippet: 'Limited time offer! Use code SAVE50 at checkout. Shop now before the sale ends...' },
    { category: 'promotional', subject: 'Your Exclusive Member Rewards', from: 'rewards@airline.com', urgency: 'low', snippet: 'You have 45,000 points! Redeem for free flights, upgrades, and more. Dont let them expire...' },
    { category: 'promotional', subject: 'New Arrivals Just for You', from: 'style@fashion.com', urgency: 'low', snippet: 'Based on your preferences, we think youll love these new arrivals. Shop the latest trends...' },
    { category: 'promotional', subject: 'Last Chance: Sale Ends Tonight', from: 'shop@electronics.com', urgency: 'low', snippet: 'Dont miss out on amazing deals on laptops, phones, and accessories. Free shipping over $50...' },
    
    { category: 'social', subject: 'John commented on your post', from: 'notifications@linkedin.com', urgency: 'low', snippet: 'John Smith commented: "Great insights! I completely agree with your perspective on..."' },
    { category: 'social', subject: 'New connection request', from: 'invitations@linkedin.com', urgency: 'low', snippet: 'Sarah Chen wants to connect with you. She is a Product Manager at Google...' },
    { category: 'social', subject: 'Your friend posted a photo', from: 'notify@instagram.com', urgency: 'low', snippet: 'Mike shared a new photo. Check it out and leave a comment!' },
    { category: 'social', subject: 'Event Invitation: Tech Meetup', from: 'events@meetup.com', urgency: 'medium', snippet: 'You are invited to Toronto Tech Meetup on January 20th. RSVP now to secure your spot...' },
    
    { category: 'updates', subject: 'Your order has shipped', from: 'shipping@amazon.com', urgency: 'medium', snippet: 'Great news! Your order #123-456 is on its way. Expected delivery: January 8th...' },
    { category: 'updates', subject: 'Password changed successfully', from: 'security@google.com', urgency: 'low', snippet: 'Your password was recently changed. If this wasnt you, please secure your account immediately...' },
    { category: 'updates', subject: 'App Update Available', from: 'updates@spotify.com', urgency: 'low', snippet: 'Spotify 2.0 is here! New features include enhanced playlists, better recommendations...' },
    { category: 'updates', subject: 'Subscription Renewed', from: 'billing@figma.com', urgency: 'low', snippet: 'Your Figma Pro subscription has been renewed for another year. Thank you for being a member...' },
    
    { category: 'receipts', subject: 'Receipt: Coffee Shop', from: 'receipt@square.com', urgency: 'low', snippet: 'Thank you for your purchase! Total: $6.50. View your itemized receipt...' },
    { category: 'receipts', subject: 'Uber Trip Receipt', from: 'receipts@uber.com', urgency: 'low', snippet: 'Your trip on January 5th. From: Downtown to Airport. Total: $34.50...' },
    { category: 'receipts', subject: 'Apple Receipt', from: 'noreply@apple.com', urgency: 'low', snippet: 'Thank you for your App Store purchase. Item: Productivity App Pro. Amount: $9.99...' },
    { category: 'receipts', subject: 'Restaurant Receipt', from: 'receipt@restaurant.com', urgency: 'low', snippet: 'Thank you for dining with us! Total: $67.80. We hope to see you again soon...' },
    
    { category: 'personal', subject: 'Happy Birthday! 🎂', from: 'mom@family.com', urgency: 'medium', snippet: 'Wishing you the happiest birthday! Cant wait to celebrate with you this weekend...' },
    { category: 'personal', subject: 'Photos from the trip', from: 'friend@gmail.com', urgency: 'low', snippet: 'Hey! Finally got around to uploading the photos from our trip. Check out the album...' },
    { category: 'personal', subject: 'Dinner plans?', from: 'bestfriend@gmail.com', urgency: 'medium', snippet: 'Are you free Saturday? Thinking of trying that new Italian place downtown...' },
    { category: 'personal', subject: 'Wedding Save the Date', from: 'couple@wedding.com', urgency: 'medium', snippet: 'We are getting married! Save the date: June 15th, 2026. Formal invitation to follow...' },
  ];

  const emails = [];
  const now = new Date();

  // Add a test thread at the top for easy testing
  const testThreadId = 'test-thread-1';
  const testThread = [
    {
      id: 'test-email-1',
      threadId: testThreadId,
      category: 'meetings',
      subject: 'Project Kickoff Meeting - Next Tuesday',
      from: 'sarah.johnson@company.com',
      urgency: 'high',
      snippet: 'Hi team! I wanted to schedule our project kickoff meeting for next Tuesday at 2 PM. Please let me know if this works for everyone.',
      body: 'Hi team!\n\nI wanted to schedule our project kickoff meeting for next Tuesday at 2 PM. We\'ll be discussing:\n\n- Project timeline and milestones\n- Team roles and responsibilities\n- Initial requirements gathering\n\nPlease let me know if this works for everyone. The meeting will be in Conference Room B.\n\nBest regards,\nSarah',
      receivedAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      categoryMeta: categories.meetings,
      replies: [
        {
          id: 'test-email-2',
          from: 'alex.chen@company.com',
          body: 'Perfect timing! I\'ll be there. Looking forward to getting started on this project.',
          receivedAt: new Date(now - 1.5 * 60 * 60 * 1000).toISOString(),
          isRead: true,
        },
        {
          id: 'test-email-3',
          from: 'mike.rodriguez@company.com',
          body: 'Tuesday at 2 PM works for me. Should I prepare anything beforehand?',
          receivedAt: new Date(now - 1 * 60 * 60 * 1000).toISOString(),
          isRead: true,
        },
        {
          id: 'test-email-4',
          from: 'sarah.johnson@company.com',
          body: 'Great! @Mike - just review the project brief I sent last week. See you all on Tuesday!',
          receivedAt: new Date(now - 0.5 * 60 * 60 * 1000).toISOString(),
          isRead: false,
        }
      ],
      replyCount: 3
    }
  ];
  
  emails.push(...testThread);

  for (let i = 0; i < 300; i++) {
    const template = emailTemplates[i % emailTemplates.length];
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const date = new Date(now - (daysAgo * 24 + hoursAgo) * 60 * 60 * 1000);
    
    // Determine if this email is part of a thread (30% chance)
    const hasThread = Math.random() > 0.7;
    const threadId = hasThread ? `thread-${Math.floor(i / 3)}` : `thread-${i}`;
    
    // Generate full email body based on snippet
    // Generate sender name for email body
    const senderName = template.from.split('@')[0]
      .split('.')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    
    const bodyLines = [
      template.snippet,
      '',
      'Best regards,',
      senderName
    ];
    
    // Convert from string to object to match backend format
    const fromEmail = template.from;
    const fromName = fromEmail.split('@')[0]
      .split('.')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    
    const email = {
      id: `email-${i}`,
      threadId,
      ...template,
      from: {
        email: fromEmail,
        name: fromName
      },
      body: bodyLines.join('\n'),
      receivedAt: date.toISOString(),
      isRead: Math.random() > 0.3,
      isStarred: Math.random() > 0.85,
      hasAttachment: Math.random() > 0.8,
      categoryMeta: categories[template.category],
      replies: [], // Will be populated later
    };
    
    emails.push(email);
  }

  // Create thread relationships - add replies to some emails
  const emailsByThread = {};
  emails.forEach(email => {
    if (!emailsByThread[email.threadId]) {
      emailsByThread[email.threadId] = [];
    }
    emailsByThread[email.threadId].push(email);
  });

  // For threads with multiple emails, create reply relationships
  Object.keys(emailsByThread).forEach(threadId => {
    const threadEmails = emailsByThread[threadId].sort((a, b) => 
      new Date(a.receivedAt) - new Date(b.receivedAt)
    );
    
    if (threadEmails.length > 1) {
      // First email is the original, rest are replies
      for (let i = 1; i < threadEmails.length; i++) {
        const replyEmail = threadEmails[i];
        const originalEmail = threadEmails[0];
        
        // Get appropriate reply template
        const replies = replyTemplates[originalEmail.category] || replyTemplates.personal;
        const replyTemplate = replies[Math.floor(Math.random() * replies.length)];
        
        // Add this as a reply to the original email
        const reply = {
          id: replyEmail.id,
          from: replyEmail.from, // Already an object from above
          body: replyTemplate.body,
          receivedAt: replyEmail.receivedAt,
          isRead: replyEmail.isRead,
        };
        
        originalEmail.replies.push(reply);
      }
      
      // Update reply count for original email
      threadEmails[0].replyCount = threadEmails.length - 1;
    }
  });

  return emails.sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));
};

export const mockEmails = generateMockEmails();

export const emailCategories = {
  urgent: { label: 'Urgent', color: '#dc2626', icon: '🔴', description: 'Requires immediate attention' },
  meetings: { label: 'Meetings', color: '#7c3aed', icon: '📅', description: 'Calendar invites and meeting requests' },
  bills: { label: 'Bills & Payments', color: '#059669', icon: '💳', description: 'Invoices, statements, and payment reminders' },
  interviews: { label: 'Interviews', color: '#2563eb', icon: '💼', description: 'Job applications and interview scheduling' },
  newsletters: { label: 'Newsletters', color: '#0891b2', icon: '📰', description: 'Subscribed newsletters and digests' },
  promotional: { label: 'Promotional', color: '#d97706', icon: '🏷️', description: 'Sales, offers, and marketing emails' },
  social: { label: 'Social', color: '#ec4899', icon: '👥', description: 'Social network notifications' },
  updates: { label: 'Updates', color: '#6366f1', icon: '🔔', description: 'Service updates and notifications' },
  receipts: { label: 'Receipts', color: '#10b981', icon: '🧾', description: 'Purchase confirmations and receipts' },
  personal: { label: 'Personal', color: '#8b5cf6', icon: '💬', description: 'Messages from friends and family' },
};

export const getEmailsByCategory = (emails, category) => {
  return emails.filter(email => email.category === category);
};

export const getEmailsByUrgency = (emails, urgency) => {
  return emails.filter(email => email.urgency === urgency);
};

export const getCategoryCounts = (emails) => {
  const counts = {};
  Object.keys(emailCategories).forEach(cat => {
    counts[cat] = {
      total: emails.filter(e => e.category === cat).length,
      unread: emails.filter(e => e.category === cat && !e.isRead).length,
    };
  });
  return counts;
};

export const getUrgencyCounts = (emails) => {
  return {
    high: emails.filter(e => e.urgency === 'high').length,
    medium: emails.filter(e => e.urgency === 'medium').length,
    low: emails.filter(e => e.urgency === 'low').length,
  };
};
