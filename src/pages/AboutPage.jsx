import styles from './AboutPage.module.css';
import founderPhoto from '../assets/founder-photo.png';

function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.accentLine}></div>
          <h1 className={styles.title}>About AirThreads</h1>
          <p className={styles.subtitle}>
            Revolutionizing productivity through intelligent task management and seamless integrations
          </p>
        </section>

        {/* Story */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <div className={styles.storyContent}>
            <p className={styles.paragraph}>
              AirThreads was founded in 2025 with a simple yet powerful vision: to transform how people 
              engage with their productivity tools. As an engineer balancing work, multiple projects, and 
              self-care, I naturally gravitated toward apps to manage my routines—Calendar for event 
              planning, Gmail for business communications, and Notion for note-taking and thought dumps.
            </p>
            <p className={styles.paragraph}>
              However, in a world with countless productivity tools, I found myself spread thin across 
              different platforms. Notes scattered between iPhone Notes and Notion, duplicate calendar 
              entries across Google Calendar and my phone—it became overwhelming. The most frustrating 
              part? These apps had zero cross-sync capabilities, and interacting with them required 
              constant manual effort.
            </p>
            <p className={styles.paragraph}>
              In our increasingly competitive world, I needed a way to use my platforms asynchronously 
              and share data between them seamlessly. Imagine sifting through Gmail for job opportunities 
              and instantly blocking calendar time to prepare, while the postings are saved to Notion for 
              later review. Or creating a to-do list and allocating calendar blocks with a single sentence. 
              Picture being on a business trip with an unexpected layover—traditionally, you'd manually 
              email every team member and update your calendar. But what if an app could read that email, 
              notify your team automatically, and find the next available time slots to reschedule your 
              meetings? That's the game changer I envisioned.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Mission & Vision</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🎯</div>
              <h3 className={styles.cardTitle}>Mission</h3>
              <p className={styles.cardText}>
                To empower individuals with AI-driven task management that eliminates friction, 
                reduces cognitive load, and amplifies human potential. I believe technology should work 
                for you, not against you.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>🚀</div>
              <h3 className={styles.cardTitle}>Vision</h3>
              <p className={styles.cardText}>
                A world where everyone can focus on meaningful work while AI handles the routine. I 
                envision seamless productivity ecosystems that understand context, anticipate needs, 
                and deliver results effortlessly.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Profile */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Founder</h2>
          <div className={styles.founderProfile}>
            <div className={styles.photoContainer}>
              <img src={founderPhoto} alt="Anu I." className={styles.founderPhoto} />
            </div>
            
            <div className={styles.founderInfo}>
              <h3 className={styles.founderName}>Anu I.</h3>
              <span className={styles.founderRole}>Founder & Engineer</span>
              
              <div className={styles.founderBio}>
                <p>Software engineer with a passion for building AI-powered productivity solutions.</p>
                <p>Experience in full-stack development and system architecture.</p>
                <p>Focus on creating seamless user experiences that solve real workflow challenges.</p>
                <p>Based in Toronto, Canada.</p>
                <p>Built AirThreads to bridge the gap between fragmented productivity tools.</p>
              </div>
              
              <div className={styles.founderNote}>
                <p>And yes, that is a film photo of me holding a Modelo in a random Mexican spot on Mission Street, 
                because I barely have any photos of myself, let alone any formal pictures.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Core Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🔒</div>
              <h4 className={styles.valueTitle}>Privacy First</h4>
              <p className={styles.valueText}>
                Your data belongs to you. AirThreads implements enterprise-grade security measures and transparent 
                privacy practices to protect your information at every step.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌟</div>
              <h4 className={styles.valueTitle}>User Centric</h4>
              <p className={styles.valueText}>
                Every feature starts with understanding real user needs. AirThreads prioritizes intuitive experiences 
                and meaningful functionality over flashy features.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>⚡</div>
              <h4 className={styles.valueTitle}>Innovation</h4>
              <p className={styles.valueText}>
                Technology evolves rapidly, and so does AirThreads. I'm committed to staying at the forefront of AI 
                and productivity tools to deliver cutting-edge solutions.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h4 className={styles.valueTitle}>Empowerment</h4>
              <p className={styles.valueText}>
                Great products solve real problems. AirThreads is built to empower users with tools that integrate 
                seamlessly into their workflows and adapt to their unique needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className={styles.contactSection}>
          <h2 className={styles.sectionTitle}>Get in Touch</h2>
          <p className={styles.contactText}>
            I'm always excited to hear from users and potential partners. Whether you have 
            questions, feedback, or collaboration ideas, don't hesitate to reach out.
          </p>
          <a href="mailto:support@airthreads.ai" className={styles.contactLink}>
            support@airthreads.ai
          </a>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
