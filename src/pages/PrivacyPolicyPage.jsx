import styles from './PrivacyPolicyPage.module.css';

function PrivacyPolicyPage() {
  return (
    <div className={styles.privacyPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last updated: December 2024</p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Introduction</h2>
            <p>
              Welcome to AirThreads ("we," "our," or "us"). We are committed to protecting your 
              privacy and ensuring the security of your personal information. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use 
              our AI-powered productivity assistant service.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <ul>
              <li>Account information (email address, name)</li>
              <li>Authentication data when connecting third-party services (Gmail, Google Calendar)</li>
              <li>Messages and commands you send through our chat interface</li>
              <li>Feedback and correspondence you send to us</li>
            </ul>
            
            <h3>2.2 Information Collected Automatically</h3>
            <ul>
              <li>Usage data and analytics</li>
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process your requests and commands</li>
              <li>Connect and interact with your authorized third-party services</li>
              <li>Send you updates, security alerts, and support messages</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Protect against fraud and unauthorized access</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Third-Party Services</h2>
            <p>
              AirThreads integrates with third-party services including Google Gmail and Google Calendar. 
              When you connect these services, we access only the data necessary to provide our 
              functionality. We do not sell or share your data with third parties for advertising purposes.
            </p>
            <p>
              Our use of information received from Google APIs adheres to the 
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer"> Google API Services User Data Policy</a>, 
              including the Limited Use requirements.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information, including:
            </p>
            <ul>
              <li>AES-256-GCM encryption for data at rest</li>
              <li>TLS encryption for data in transit</li>
              <li>OAuth 2.0 for secure authentication</li>
              <li>Regular security audits and monitoring</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to provide our services 
              and fulfill the purposes outlined in this policy. You may request deletion of your data 
              at any time by contacting us.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>8. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please 
              contact us at:
            </p>
            <p className={styles.contactInfo}>
              <strong>AirThreads</strong><br />
              Toronto, Ontario, Canada<br />
              Email: privacy@airthreads.ai
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
