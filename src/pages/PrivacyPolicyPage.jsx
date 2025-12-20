import ReactMarkdown from 'react-markdown';
import styles from './PrivacyPolicyPage.module.css';

const privacyPolicyContent = `
# Privacy Policy for AirThreads

**Last Updated:** December 20, 2025  
**Effective Date:** December 20, 2025  
**Version:** 2.0

**Domain:** [https://airthreads.ai](https://airthreads.ai/)  
**Application Name:** AirThreads  
**Contact:** anuptaislam33@gmail.com

---

## 1. Introduction

AirThreads ("we", "our", "us", or "the Service") is an AI-powered productivity assistant that enables users to securely connect and interact with third-party applications such as **Gmail** and **Google Calendar** through an intelligent interface powered by the **Model Context Protocol (MCP)** and **Claude AI** (Anthropic).

Users can interact with their connected applications using:
- **Text Mode:** Web-based interface via browser
- **Voice Mode:** Voice-enabled interface through integrated AI services

We are committed to protecting your privacy, maintaining the security of your data, and handling all information with transparency and responsibility. This Privacy Policy explains:
- What data we collect and why
- How we use, store, and protect your information
- Your rights and choices regarding your data
- Our compliance with applicable privacy regulations

**By using AirThreads, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.**

---

## 2. Information We Collect

### 2.1 Google Account Information

When you authorize AirThreads through **Google OAuth 2.0**, we receive access tokens that allow the Service to access limited Google data based exclusively on the scopes you explicitly approve during the authorization process.

#### Google API Scopes We Request:

**Gmail API:**
- \`https://www.googleapis.com/auth/gmail.readonly\` - Read email messages and settings
- \`https://www.googleapis.com/auth/gmail.send\` - Send email on your behalf
- \`https://www.googleapis.com/auth/gmail.modify\` - Manage email (excluding deletion)
- \`https://www.googleapis.com/auth/gmail.labels\` - Manage mailbox labels

**Google Calendar API:**
- \`https://www.googleapis.com/auth/calendar\` - View and manage calendar events
- \`https://www.googleapis.com/auth/calendar.events\` - View and edit calendar events

#### What We Access:
- Email messages **only when explicitly requested** by you through a specific command (e.g., "Search for emails from John", "Send an email to Jane")
- Calendar events **only when explicitly requested** by you (e.g., "Create a meeting tomorrow at 2pm", "Show my events this week")

#### What We Do NOT Do:
- ❌ Access Gmail or Calendar data without explicit user commands
- ❌ Read emails or calendar events in the background
- ❌ Store email bodies, attachments, or message content beyond temporary processing required to fulfill your request
- ❌ Scan your inbox or calendar for advertising purposes
- ❌ Share your Google data with third parties for marketing or advertising
- ❌ Use your Google data to build user profiles for purposes other than providing the Service

### 2.2 Authentication & Session Data

To maintain secure access to your Google accounts, we collect and store:

**OAuth Tokens:**
- **Refresh Tokens:** Encrypted tokens that allow the Service to maintain access to your Google account without requiring re-authentication
- **Access Tokens:** Short-lived tokens (typically 1 hour) used for API requests (not stored long-term)
- **Storage:** All tokens are encrypted using **AES-256-GCM** encryption before storage
- **Location:** Stored on secure servers with restricted access
- **Retention:** Tokens are immediately deleted when you revoke access or delete your account

**Session Identifiers:**
- **Unique User IDs:** We assign each user a unique identifier (similar to an account number) to keep your data separate and secure
- **Session Tokens:** Secure, temporary tokens (valid for 1 hour) that authenticate your requests
- **Purpose:** These identifiers ensure your conversations, emails, and calendar data remain private and isolated from other users
- **Technical Details:** Identifiers use cryptographic hashing (HMAC-SHA256) and cannot be reverse-engineered to reveal personal information

### 2.3 User Conversations & Interaction Data

AirThreads stores **user conversations and commands** for the following legitimate purposes:

**What We Store:**
- Text queries you submit to the AI assistant
- Voice transcriptions (if using voice mode)
- AI-generated responses
- Tool execution logs (e.g., "User requested email search", "Calendar event created")
- Timestamps of interactions

**What We Do NOT Store:**
- The actual content of your emails or calendar events (beyond temporary processing)
- Email attachments
- Contact information from your Google account (unless you explicitly share it in a conversation)

**Purpose of Storage:**
- Provide contextual, multi-turn conversations
- Improve task execution accuracy and reliability
- Maintain conversation history for your reference
- Debug service issues and improve performance
- Enhance AI model performance over time

**Retention Period:**
- Conversation data is retained for **90 days** by default
- You may request earlier deletion at any time (see Section 7)

### 2.4 Feedback & Analytics Data

**User Feedback:**
- We collect **anonymous feedback** submitted through our feedback form
- Feedback may include bug reports, feature requests, and general thoughts
- **Storage:** Redis database, maximum 50 most recent entries (FIFO)
- **Anonymization:** Feedback is not linked to your user account or identity

**Activity Logs:**
- We maintain activity logs for security, debugging, and service improvement
- Logs include: timestamps, action types (e.g., "email_sent", "event_created"), success/failure status
- Logs do **not** include the content of your emails or calendar events
- **Retention:** Activity logs are retained for **30 days**

### 2.5 Technical & Diagnostic Data

For security, performance monitoring, and service reliability, we automatically collect:

**Network & Device Information:**
- IP address (used for rate limiting and security)
- Browser type and version
- Operating system
- Device type (desktop, mobile, tablet)

**Usage Metrics:**
- API request counts
- Response times and performance metrics
- Error logs and stack traces
- Service uptime and availability metrics

**Purpose:**
- Detect and prevent abuse, fraud, and security threats
- Monitor service performance and identify bottlenecks
- Diagnose and fix technical issues
- Ensure compliance with rate limits

**Retention:** Technical logs are retained for **14 days**

---

## 3. How We Use Your Information

We use your information **only** for the following purposes:

### 3.1 Core Service Functionality

1. **Execute User-Requested Actions:**
   - Send emails, search emails, manage labels (Gmail)
   - Create, view, modify, or delete calendar events (Google Calendar)
   - Process natural language commands through AI (Claude AI via Anthropic)

2. **Provide Conversational Interface:**
   - Maintain context across multi-turn conversations
   - Generate intelligent, contextual responses
   - Understand and execute complex, multi-step tasks

3. **Authentication & Security:**
   - Verify your identity using OAuth 2.0
   - Maintain secure sessions (text and voice modes)
   - Prevent unauthorized access to your data

### 3.2 Service Improvement & Development

4. **Improve AI Performance:**
   - Refine natural language understanding
   - Enhance task execution accuracy
   - Develop new features based on usage patterns

5. **Debug & Troubleshoot:**
   - Diagnose technical issues and errors
   - Monitor service reliability
   - Identify and fix bugs

### 3.3 Security & Compliance

6. **Protect Against Misuse:**
   - Detect and prevent abuse, spam, or fraudulent activity
   - Implement rate limiting to prevent service disruption
   - Monitor for suspicious activity

7. **Legal Compliance:**
   - Respond to legal requests (subpoenas, court orders) when legally required
   - Comply with applicable privacy laws and regulations

### 3.4 What We Do NOT Do

We **do NOT**:
- ❌ Sell, rent, or share your personal data with third parties for marketing purposes
- ❌ Use your Google data (emails, calendar events) to train AI models without explicit consent
- ❌ Display advertisements based on your email or calendar content
- ❌ Transfer your data to third parties except as necessary to provide the Service (see Section 8)
- ❌ Use your data for purposes other than those described in this Privacy Policy

---

## 4. Data Storage, Security & Retention

### 4.1 Data Storage Architecture

**Storage Locations:**
- **Primary Servers:** Secure cloud infrastructure (AWS EC2, US region)
- **Database:** Redis (in-memory, encrypted at rest)
- **OAuth Tokens:** Encrypted file storage on isolated servers
- **Backups:** Encrypted daily backups retained for 7 days

**Geographic Location:**
- All data is stored in **United States** data centers
- Data is **not** transferred outside the United States without explicit disclosure

### 4.2 Security Measures

We implement industry-leading security practices to protect your data:

#### Encryption:

**In Transit (Network Security):**
- **TLS 1.2+** for all external communication
- **HTTPS-only** connections (enforced via HSTS headers)
- Let's Encrypt SSL/TLS certificates
- Secure cipher suites (HIGH priority)

**At Rest (Storage Security):**
- **AES-256-GCM** encryption for OAuth refresh tokens
- 256-bit encryption keys with random 128-bit IVs
- File permissions: 600 (owner read/write only)
- Database encryption for sensitive session data

**Session Security:**
- **JWT tokens** signed with HMAC-SHA256
- Tokens expire after 1 hour (configurable)
- Timing-safe signature verification (prevents timing attacks)
- HTTP-only cookies (prevents XSS attacks)
- Secure cookie flag (HTTPS-only transmission)
- SameSite cookie attribute (CSRF protection)

#### Access Controls:

- **Role-Based Access Control (RBAC):** Internal team access is strictly limited
- **Principle of Least Privilege:** Systems have minimal necessary permissions
- **Multi-Factor Authentication (MFA):** Required for all administrative access
- **Audit Logs:** All administrative actions are logged and monitored

#### Application Security:

- **Input Validation:** All user inputs are sanitized to prevent injection attacks
- **Rate Limiting:** Prevents abuse and DDoS attacks (configurable per endpoint)
- **CSRF Protection:** State parameters in OAuth flow, CSRF tokens for state-changing operations
- **XSS Protection:** HTTP-only cookies, HTML entity encoding, Content-Security-Policy headers
- **SQL Injection Prevention:** Parameterized queries, no direct SQL execution
- **Dependency Security:** Regular security audits and dependency updates

#### Network Security:

- **Reverse Proxy (Nginx):** SSL termination, request filtering, rate limiting
- **Firewall:** Internal services not exposed to public internet
- **Port Isolation:** 500+ port separation between services to prevent conflicts
- **Service Isolation:** Each service runs in isolated process with dedicated event loops

#### Monitoring & Incident Response:

- **24/7 Monitoring:** Automated alerts for suspicious activity
- **Error Tracking:** Real-time error monitoring and logging
- **Security Audits:** Regular security reviews and penetration testing
- **Incident Response Plan:** Documented procedures for security breaches
- **Breach Notification:** Users will be notified within 72 hours of any confirmed data breach

### 4.3 Data Retention Policies

We retain data only as long as necessary to provide the Service:

| Data Type | Retention Period | Deletion Method |
|-----------|------------------|-----------------|
| **OAuth Tokens** | Until revoked or account deleted | Immediate secure deletion (overwrite) |
| **Conversation History** | 90 days | Automated deletion |
| **Activity Logs** | 30 days | Automated deletion |
| **Technical Logs (errors, requests)** | 14 days | Automated deletion |
| **Feedback Data** | Indefinite (max 50 entries, FIFO) | Oldest entries automatically purged |
| **User Accounts** | Until user requests deletion | 30 days after deletion request |

**Extended Retention:**
- Data may be retained longer if required by law (e.g., legal hold, investigation)
- Anonymized, aggregated data may be retained indefinitely for analytics

**User-Initiated Deletion:**
- You may request immediate deletion of all your data at any time (see Section 7)

---

## 5. How We Handle Your Google Data

To comply with **Google API Services User Data Policy**, we adhere to strict requirements:

### 5.1 Limited Use Compliance

AirThreads' use and transfer to any other app of information received from Google APIs will adhere to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the **Limited Use requirements**.

**Specifically:**

1. ✅ We access Gmail and Calendar data **only when explicitly requested** by you through a specific command
2. ✅ We use Google data **only** to provide the Service functionality you requested
3. ✅ We **do not** use Google data for advertising purposes
4. ✅ We **do not** transfer Google user data to third parties (except as necessary to provide the Service, e.g., Claude AI for processing)
5. ✅ We request **minimal scopes** necessary for functionality
6. ✅ All use of data strictly adheres to the purpose described on the OAuth consent screen

### 5.2 Transparency & User Control

- You explicitly authorize each scope during Google OAuth
- You can revoke access at any time via [Google Account Permissions](https://myaccount.google.com/permissions)
- Revoking access **immediately** prevents AirThreads from accessing your Google data
- We provide clear, understandable descriptions of what each permission enables

### 5.3 No Background Access

- We **never** access your Gmail or Calendar data unless you trigger an action
- We do **not** run background scans or automated processes on your Google data
- All access is **user-initiated** and **time-limited** to the execution of your request

---

## 6. Third-Party Services & Data Sharing

### 6.1 Third-Party Services We Use

AirThreads integrates with the following third-party services to provide functionality:

#### AI Processing:
- **Anthropic (Claude AI):**
  - **Purpose:** Process natural language queries, generate responses, execute tool calls
  - **Data Shared:** User queries, conversation context (NOT raw email/calendar content unless explicitly included in your query)
  - **Privacy Policy:** [Anthropic Privacy Policy](https://www.anthropic.com/legal/privacy)
  - **Data Processing Agreement:** Anthropic acts as a data processor under our instructions
  - **Retention:** Anthropic may retain data according to their own policies (see their privacy policy)

#### Cloud Infrastructure:
- **Amazon Web Services (AWS):**
  - **Purpose:** Server hosting, compute resources
  - **Data Stored:** Application data, logs, encrypted OAuth tokens
  - **Privacy Policy:** [AWS Privacy Notice](https://aws.amazon.com/privacy/)
  - **Compliance:** AWS SOC 2, ISO 27001 certified

#### Google APIs:
- **Google Gmail API & Google Calendar API:**
  - **Purpose:** Access your Gmail and Calendar data per your authorization
  - **Data Shared:** API requests initiated by your commands
  - **Privacy Policy:** [Google Privacy Policy](https://policies.google.com/privacy)

### 6.2 When We Share Your Data

We share your data only in the following limited circumstances:

**Service Providers (Data Processors):**
- We may share data with trusted third-party vendors who assist in providing the Service (e.g., hosting, analytics, customer support)
- All vendors are contractually obligated to protect your data and use it only for specified purposes
- Vendors are subject to strict confidentiality and security requirements

**Legal Requirements:**
- We may disclose your information if required by law, regulation, legal process, or governmental request
- We will notify you of legal requests unless prohibited by law

**Business Transfers:**
- If AirThreads is involved in a merger, acquisition, or sale of assets, your data may be transferred
- You will be notified via email and/or prominent notice on our website
- You will have the opportunity to delete your data before transfer

**With Your Consent:**
- We may share your data for purposes not described in this policy if you give explicit consent

### 6.3 Data Processing for AI

**Important Note on AI Processing:**

When you submit queries to AirThreads, your **user queries and conversation context** are sent to **Claude AI (Anthropic)** for processing.

**What Claude AI Receives:**
- Your natural language commands (e.g., "Find emails from John about the project")
- Conversation history (to maintain context)
- Tool execution results (e.g., "Found 3 emails matching your criteria")

**What Claude AI Does NOT Receive:**
- Your raw email inbox or calendar (unless you explicitly ask about specific content)
- OAuth tokens or authentication credentials
- User identifiers (replaced with anonymous session tokens)

**Anthropic's Data Usage:**
- Anthropic may use interactions to improve AI models (per their privacy policy)
- You can review Anthropic's data practices at [https://www.anthropic.com/legal/privacy](https://www.anthropic.com/legal/privacy)

### 6.4 No Third-Party Advertising

- We **do not** share your data with advertisers or marketing companies
- We **do not** use your Google data (emails, calendar events) for targeted advertising
- We **do not** sell your personal information to third parties

---

## 7. Your Rights & Choices

We respect your privacy rights and provide you with meaningful control over your data.

### 7.1 Access & Portability

**Right to Access:**
- You have the right to request a copy of the personal data we hold about you
- We will provide the data in a structured, machine-readable format (JSON or CSV)
- **Request Method:** Email anuptaislam33@gmail.com with "Data Access Request" in subject line
- **Response Time:** Within 30 days of verified request

**Right to Data Portability:**
- You can export your conversation history and activity logs
- Data will be provided in a portable format that can be transferred to another service

### 7.2 Correction & Update

**Right to Correction:**
- You have the right to request correction of inaccurate personal data
- **Request Method:** Email anuptaislam33@gmail.com with corrections
- **Response Time:** Within 14 days of verified request

### 7.3 Deletion & Revocation

**Right to Deletion (Right to be Forgotten):**
- You may request deletion of all your data at any time
- **Request Method:** Email anuptaislam33@gmail.com with "Data Deletion Request" in subject line
- **Scope:** We will delete:
  - All conversation history and activity logs
  - OAuth tokens and session data
  - User account information
  - Cached data across all services
- **Timeline:** Deletion completed within **30 days** of verified request
- **Exceptions:** Data may be retained if required by law or for legitimate business purposes (e.g., fraud prevention)

**Revoke Google OAuth Access:**
- You can immediately revoke AirThreads' access to your Google account at any time
- **Method:** Visit [Google Account Permissions](https://myaccount.google.com/permissions) and remove AirThreads
- **Effect:** Immediate termination of access; we cannot access your Gmail or Calendar after revocation
- **Data Deletion:** Revoking access does **not** automatically delete your conversation history; request deletion separately if desired

### 7.4 Opt-Out of Data Processing

**Conversation History:**
- You may request that we do not store your conversation history
- **Impact:** This may limit the quality of AI responses (no conversation context)
- **Request Method:** Email anuptaislam33@gmail.com with "Opt-Out Conversation Storage" in subject line

**Analytics & Improvement:**
- You may opt out of having your data used for service improvement
- **Request Method:** Email anuptaislam33@gmail.com with "Opt-Out Analytics" in subject line

### 7.5 Right to Object

- You have the right to object to certain types of data processing (e.g., for marketing purposes)
- **Note:** We do not currently use your data for marketing, so this right may be limited in scope

### 7.6 Complaint to Authorities

- If you believe we have violated your privacy rights, you have the right to lodge a complaint with a data protection authority
- **EU Users:** Contact your local Data Protection Authority
- **California Users:** Contact the California Attorney General's Office

---

## 8. International Data Transfers

**Primary Data Location:**
- All data is stored and processed in the **United States** (AWS US region)

**International Users:**
- If you are accessing AirThreads from outside the United States, your data will be transferred to and processed in the United States
- By using the Service, you consent to the transfer of your data to the United States

**EU/UK Users (GDPR Compliance):**
- We rely on Standard Contractual Clauses (SCCs) for data transfers from the EU/UK to the United States
- We implement appropriate safeguards to ensure your data is protected to GDPR standards

---

## 9. Children's Privacy

AirThreads is **not intended** for use by children under the age of **13** (or the applicable age of digital consent in your jurisdiction).

- We do **not** knowingly collect personal information from children under 13
- If we learn that we have collected personal information from a child under 13, we will delete it immediately
- **Parents/Guardians:** If you believe your child has provided us with personal information, please contact us at anuptaislam33@gmail.com

---

## 10. Privacy by Design & Default

We build privacy into the core of our Service:

**Minimal Data Collection:**
- We collect only the data necessary to provide the Service
- We do not collect data "just in case" it might be useful later

**User Control:**
- You control what Google data we can access (via OAuth scopes)
- You control when we access your data (via explicit commands)
- You control how long we retain your data (via deletion requests)

**Transparency:**
- We provide clear explanations of what data we collect and why
- We maintain detailed documentation of our security practices
- We notify you of any changes to this Privacy Policy

**Security First:**
- All data encrypted in transit and at rest
- Regular security audits and penetration testing
- Incident response plan for data breaches

---

## 11. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect:
- Changes in our practices or services
- Legal, regulatory, or industry developments
- User feedback and suggestions

**Notification of Changes:**
- **Effective Date:** Changes become effective 30 days after posting (unless required sooner by law)
- **Notification Method:**
  - Updated "Last Updated" date at the top of this policy
  - Email notification to all active users (for material changes)
  - Prominent notice on our website
- **Material Changes:** For significant changes that affect your rights, we will seek your consent before implementing

**Your Responsibility:**
- Review this Privacy Policy periodically to stay informed
- Continued use of the Service after changes constitutes acceptance

**Version History:**
- Version 2.0 (December 20, 2025): Comprehensive update reflecting current architecture and security practices
- Version 1.0 (November 19, 2025): Initial privacy policy

---

## 12. Contact Us

If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**Email:** anuptaislam33@gmail.com  
**Subject Line:** Include "Privacy" for fastest response  
**Response Time:** We aim to respond within **5 business days**

---

## 13. Jurisdiction-Specific Information

### 13.1 California Residents (CCPA/CPRA)

If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):

**Right to Know:**
- Categories of personal information collected
- Categories of sources from which information is collected
- Business or commercial purpose for collecting information
- Categories of third parties with whom we share information
- Specific pieces of personal information we have collected about you

**Right to Delete:**
- Request deletion of personal information we have collected from you

**Right to Opt-Out:**
- We do **not** sell your personal information, so there is no opt-out mechanism required

**Right to Non-Discrimination:**
- We will not discriminate against you for exercising your CCPA/CPRA rights

**How to Exercise Your Rights:**
- Email anuptaislam33@gmail.com with "CCPA Request" in subject line
- We may request verification of your identity to process your request

**Response Time:** Within **45 days** of verified request (may extend up to 90 days with notice)

### 13.2 European Economic Area (EEA) & UK Residents (GDPR)

If you are located in the EEA or UK, you have rights under the General Data Protection Regulation (GDPR):

**Legal Basis for Processing:**
- **Consent:** Processing based on your explicit consent (e.g., OAuth authorization)
- **Contract:** Processing necessary to perform our contract with you (provide the Service)
- **Legitimate Interests:** Processing for service improvement, security, fraud prevention

**Your GDPR Rights:**
- Right to access, rectify, erase, restrict processing, data portability, object to processing
- Right to withdraw consent at any time
- Right to lodge a complaint with your supervisory authority

**Data Controller:**
- AirThreads acts as the data controller for your personal data

**Cross-Border Transfers:**
- We use Standard Contractual Clauses (SCCs) for transfers outside the EEA/UK

---

## 14. Security Breach Notification

In the unlikely event of a data breach that affects your personal information:

**Notification Timeline:**
- We will notify affected users within **72 hours** of discovering the breach
- We will notify relevant authorities as required by law

**Notification Method:**
- Email to your registered email address
- Prominent notice on our website

**Information Provided:**
- Nature of the breach (what data was affected)
- Potential consequences
- Measures taken to address the breach
- Steps you can take to protect yourself

---

## 15. Compliance & Certifications

We are committed to maintaining the highest standards of data protection and privacy:

**Current Compliance:**
- ✅ Google API Services User Data Policy (including Limited Use requirements)
- ✅ CCPA/CPRA (California Consumer Privacy Act)
- ✅ GDPR (General Data Protection Regulation) - best effort compliance
- ✅ AWS SOC 2 Type II (via AWS infrastructure)

**Planned Certifications:**
- SOC 2 Type II certification (in progress)
- ISO 27001 certification (planned for 2026)

**Security Audits:**
- Annual third-party security audits
- Quarterly internal security reviews
- Continuous vulnerability scanning and penetration testing

---

## 16. Glossary

For clarity, we define the following terms as used in this Privacy Policy:

- **Personal Data/Personal Information:** Any information relating to an identified or identifiable individual
- **Processing:** Any operation performed on personal data (collection, storage, use, disclosure, deletion)
- **Data Controller:** The entity that determines the purposes and means of processing personal data (AirThreads)
- **Data Processor:** The entity that processes personal data on behalf of the data controller (e.g., Anthropic, AWS)
- **OAuth:** An open standard for access delegation commonly used for token-based authentication
- **Encryption:** The process of encoding information so that only authorized parties can access it
- **Anonymization:** The process of removing personally identifiable information from data
- **Session:** A period of authenticated access to the Service
- **MCP (Model Context Protocol):** A protocol for enabling AI agents to interact with external tools and services

---

## 17. Acknowledgment & Consent

By using AirThreads, you acknowledge that:

1. You have read and understood this Privacy Policy
2. You consent to the collection, use, and processing of your information as described
3. You understand your rights and how to exercise them
4. You understand that your use of Google APIs is also subject to Google's Terms of Service and Privacy Policy

**If you do not agree with this Privacy Policy, please do not use AirThreads.**

---

**End of Privacy Policy**

---

**Document Control:**
- **Policy Owner:** AirThreads Development Team
- **Last Reviewed:** December 20, 2025
- **Next Review:** June 20, 2026 (or sooner if material changes occur)
- **Version:** 2.0
`;

function PrivacyPolicyPage() {
  return (
    <div className={styles.privacyPage}>
      <div className={styles.container}>
        <div className={styles.content}>
          <ReactMarkdown
            components={{
              h1: ({children}) => <h1 className={styles.h1}>{children}</h1>,
              h2: ({children}) => <h2 className={styles.h2}>{children}</h2>,
              h3: ({children}) => <h3 className={styles.h3}>{children}</h3>,
              h4: ({children}) => <h4 className={styles.h4}>{children}</h4>,
              p: ({children}) => <p className={styles.p}>{children}</p>,
              ul: ({children}) => <ul className={styles.ul}>{children}</ul>,
              ol: ({children}) => <ol className={styles.ol}>{children}</ol>,
              li: ({children}) => <li className={styles.li}>{children}</li>,
              a: ({href, children}) => <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">{children}</a>,
              table: ({children}) => <div className={styles.tableWrapper}><table className={styles.table}>{children}</table></div>,
              thead: ({children}) => <thead className={styles.thead}>{children}</thead>,
              tbody: ({children}) => <tbody className={styles.tbody}>{children}</tbody>,
              tr: ({children}) => <tr className={styles.tr}>{children}</tr>,
              th: ({children}) => <th className={styles.th}>{children}</th>,
              td: ({children}) => <td className={styles.td}>{children}</td>,
              hr: () => <hr className={styles.hr} />,
              code: ({children}) => <code className={styles.code}>{children}</code>,
              strong: ({children}) => <strong className={styles.strong}>{children}</strong>,
            }}
          >
            {privacyPolicyContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
