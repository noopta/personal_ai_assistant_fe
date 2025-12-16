import styles from './DemosPage.module.css';
import thumbnail1 from '../assets/demo-thumbnail-1.jpg';
import thumbnail2 from '../assets/demo-thumbnail-2.jpg';
import thumbnail3 from '../assets/demo-thumbnail-3.jpg';

const demos = [
  {
    id: 1,
    title: 'Getting Started with AirThreads',
    description: 'Learn how to set up your account, connect your integrations, and start managing tasks with AI assistance.',
    duration: '3:45',
    thumbnail: thumbnail1,
    category: 'Getting Started'
  },
  {
    id: 2,
    title: 'Gmail Integration Deep Dive',
    description: 'See how AirThreads helps you manage emails, draft responses, and organize your inbox effortlessly.',
    duration: '5:20',
    thumbnail: thumbnail2,
    category: 'Integrations'
  },
  {
    id: 3,
    title: 'Smart Calendar Management',
    description: 'Discover how to schedule meetings, block focus time, and sync events across platforms with natural language.',
    duration: '4:15',
    thumbnail: thumbnail3,
    category: 'Integrations'
  }
];

function DemosPage() {
  return (
    <div className={styles.demosPage}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1>Product Demos</h1>
          <p className={styles.heroSubtitle}>
            See AirThreads in action and learn how to maximize your productivity
          </p>
        </section>

        <section className={styles.videosSection}>
          <div className={styles.videosGrid}>
            {demos.map((demo, index) => (
              <div 
                key={demo.id} 
                className={styles.videoCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.thumbnailWrapper}>
                  <img 
                    src={demo.thumbnail} 
                    alt={demo.title}
                    className={styles.thumbnail}
                  />
                  <div className={styles.playOverlay}>
                    <div className={styles.playButton}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <span className={styles.duration}>{demo.duration}</span>
                  <span className={styles.comingSoon}>Coming Soon</span>
                </div>
                <div className={styles.videoInfo}>
                  <span className={styles.category}>{demo.category}</span>
                  <h3>{demo.title}</h3>
                  <p>{demo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>Ready to try it yourself?</h2>
            <p>Experience the power of AI-driven productivity firsthand</p>
            <a href="/product" className={styles.ctaButton}>
              Get Started Free
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DemosPage;
