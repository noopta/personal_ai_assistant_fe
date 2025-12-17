import { useState, useRef } from 'react';
import styles from './DemosPage.module.css';
import demoVideo from '../assets/demo-getting-started.mp4';

function DemosPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

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
          <div className={styles.singleVideoContainer}>
            <div className={styles.videoCard}>
              <div className={styles.videoWrapper}>
                <video
                  ref={videoRef}
                  src={demoVideo}
                  className={styles.video}
                  controls={isPlaying}
                  onEnded={handleVideoEnd}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                {!isPlaying && (
                  <div className={styles.playOverlay} onClick={handlePlayClick}>
                    <div className={styles.playButton}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.videoInfo}>
                <span className={styles.category}>Getting Started</span>
                <h3>Getting Started with AirThreads</h3>
                <p>Learn how to set up your account, connect your integrations, and start managing tasks with AI assistance.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DemosPage;
