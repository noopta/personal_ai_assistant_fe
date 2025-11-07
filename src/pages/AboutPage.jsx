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
              AirThreads was founded in 2025 with a simple yet powerful vision: to transform how people 
              engage with their productivity tools. As an engineer balancing work, multiple projects, and 
              self-care, I naturally gravitated toward apps to manage my routines—Calendar for event 
              planning, Gmail for business communications, and Notion for note-taking and thought dumps.
            </p>
            <p>
              However, in a world with countless productivity tools, I found myself spread thin across 
              different platforms. Notes scattered between iPhone Notes and Notion, duplicate calendar 
              entries across Google Calendar and my phone—it became overwhelming. The most frustrating 
              part? These apps had zero cross-sync capabilities, and interacting with them required 
              constant manual effort.
            </p>
            <p>
              In our increasingly competitive world, I needed a way to use my platforms asynchronously 
              and share data between them seamlessly. Imagine sifting through Gmail for job opportunities 
              and instantly blocking calendar time to prepare, while the postings are saved to Notion for 
              later review. Or creating a to-do list and allocating calendar blocks with a single sentence. 
              Picture being on a business trip with an unexpected layover—traditionally, you'd manually 
              email every team member and update your calendar. But what if an app could read that email, 
              notify your team automatically, and find the next available time slots to reschedule your 
              meetings? That's the game changer we envisioned.
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
          <h2>Meet the Founder</h2>
          <p className={styles.teamIntro}>
            AirThreads was built by an engineer who experienced firsthand the frustration of 
            juggling multiple productivity tools and saw an opportunity to create something better.
          </p>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>👨‍💻</div>
              <h4>Anu I.</h4>
              <p className={styles.memberRole}>Founder</p>
              <p>
                I'm a software engineer with a passion for building AI-powered productivity solutions. 
                With experience in full-stack development and system architecture, I focus on creating 
                seamless user experiences that solve real workflow challenges. Based in Toronto, Canada, 
                I built AirThreads to bridge the gap between our fragmented productivity tools and create 
                the unified, intelligent workspace I always wished existed.
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
              <strong>Email:</strong> support@airthreads.ai
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage; 