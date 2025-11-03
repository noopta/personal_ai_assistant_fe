import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>About AirThreads</h1>
          <p className={styles.heroSubtitle}>
            Revolutionizing productivity through intelligent task management and seamless integrations
          </p>
        </section>

        {/* Company Story */}
        <section className={styles.section}>
          <div className={styles.content}>
            <h2>Our Story</h2>
            <p>
              AirThreads was founded in 2024 with a simple yet powerful vision: to transform how people 
              manage their daily tasks and workflows. Our founders, experienced software engineers and 
              productivity enthusiasts, recognized the growing complexity of modern work environments and 
              the need for intelligent solutions.
            </p>
            <p>
              After years of switching between multiple apps, struggling with disconnected tools, and 
              losing valuable time on repetitive tasks, we decided to build something better. AirThreads 
              represents our commitment to creating a unified, intelligent workspace that adapts to your 
              needs and grows with your workflow.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className={styles.section}>
          <div className={styles.missionVision}>
            <div className={styles.missionCard}>
              <div className={styles.cardIcon}>🎯</div>
              <h3>Our Mission</h3>
              <p>
                To empower individuals and teams with AI-driven task management that eliminates friction, 
                reduces cognitive load, and amplifies human potential. We believe technology should work 
                for you, not against you.
              </p>
            </div>
            <div className={styles.visionCard}>
              <div className={styles.cardIcon}>🚀</div>
              <h3>Our Vision</h3>
              <p>
                A world where everyone can focus on meaningful work while AI handles the routine. We 
                envision seamless productivity ecosystems that understand context, anticipate needs, 
                and deliver results effortlessly.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={styles.section}>
          <h2>Our Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🔒</div>
              <h4>Privacy First</h4>
              <p>
                Your data belongs to you. We implement enterprise-grade security measures and 
                transparent privacy practices to protect your information at every step.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌟</div>
              <h4>User-Centric Design</h4>
              <p>
                Every feature we build starts with understanding real user needs. We prioritize 
                intuitive experiences and meaningful functionality over flashy features.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>⚡</div>
              <h4>Continuous Innovation</h4>
              <p>
                Technology evolves rapidly, and so do we. We're committed to staying at the forefront 
                of AI and productivity tools to deliver cutting-edge solutions.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h4>Collaboration</h4>
              <p>
                Great products are built by great teams. We foster open communication, diverse 
                perspectives, and collaborative problem-solving in everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.section}>
          <h2>Meet Our Team</h2>
          <p className={styles.teamIntro}>
            Our diverse team of engineers, designers, and product experts share a passion for 
            building tools that make a real difference in people's daily lives.
          </p>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>👨‍💻</div>
              <h4>Alex Chen</h4>
              <p className={styles.memberRole}>Co-Founder & CEO</p>
              <p>
                Former senior engineer at Google with 8+ years in AI and productivity tools. 
                Passionate about user experience and scalable systems.
              </p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>👩‍🔬</div>
              <h4>Sarah Rodriguez</h4>
              <p className={styles.memberRole}>Co-Founder & CTO</p>
              <p>
                AI researcher and full-stack developer with expertise in natural language processing 
                and machine learning applications.
              </p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>👨‍🎨</div>
              <h4>Michael Kim</h4>
              <p className={styles.memberRole}>Head of Design</p>
              <p>
                Award-winning UX designer focused on creating intuitive interfaces for complex 
                productivity workflows and AI-powered tools.
              </p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>👩‍💼</div>
              <h4>Emma Thompson</h4>
              <p className={styles.memberRole}>Head of Product</p>
              <p>
                Product strategist with a background in enterprise software and deep understanding 
                of workplace productivity challenges.
              </p>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className={styles.section}>
          <h2>Our Technology</h2>
          <div className={styles.technologyContent}>
            <p>
              AirThreads is built on cutting-edge technology stack designed for scalability, 
              security, and performance. Our platform leverages advanced natural language processing, 
              machine learning algorithms, and robust API integrations to deliver seamless experiences.
            </p>
            <div className={styles.techHighlights}>
              <div className={styles.techItem}>
                <strong>AI-Powered Intelligence:</strong> Advanced language models for understanding 
                context and intent in natural language commands.
              </div>
              <div className={styles.techItem}>
                <strong>Secure Integration Framework:</strong> OAuth 2.0 and enterprise-grade security 
                for all third-party service connections.
              </div>
              <div className={styles.techItem}>
                <strong>Real-time Processing:</strong> Low-latency response system for immediate 
                task execution and feedback.
              </div>
              <div className={styles.techItem}>
                <strong>Scalable Architecture:</strong> Cloud-native infrastructure that grows 
                with your needs and usage patterns.
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className={styles.contactSection}>
          <h2>Get in Touch</h2>
          <p>
            We're always excited to hear from our users and potential partners. Whether you have 
            questions, feedback, or collaboration ideas, don't hesitate to reach out.
          </p>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <strong>Email:</strong> hello@taskflowai.com
            </div>
            <div className={styles.contactItem}>
              <strong>Support:</strong> support@taskflowai.com
            </div>
            <div className={styles.contactItem}>
              <strong>Partnership:</strong> partners@taskflowai.com
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage; 