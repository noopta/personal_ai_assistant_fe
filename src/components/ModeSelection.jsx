import styles from './ModeSelection.module.css';

function ModeSelection({ onModeSelect }) {
  return (
    <div className={styles.modeSelection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Choose Your Interaction Mode</h2>
          <p>How would you like to interact with Lucius AI today?</p>
        </div>
        
        <div className={styles.modeOptions}>
          <div 
            className={styles.modeCard}
            onClick={() => onModeSelect('text')}
          >
            <div className={styles.modeIcon}>💬</div>
            <h3>Text Chat</h3>
            <p>Type your messages and get text responses from the AI assistant</p>
            <div className={styles.features}>
              <div className={styles.feature}>✓ Quick typing interface</div>
              <div className={styles.feature}>✓ Easy copy/paste support</div>
              <div className={styles.feature}>✓ Full message history</div>
            </div>
            <button className={styles.selectButton}>
              Select Text Mode
            </button>
          </div>
          
          <div 
            className={styles.modeCard}
            onClick={() => onModeSelect('voice')}
          >
            <div className={styles.modeIcon}>🎤</div>
            <h3>Voice Chat</h3>
            <p>Speak naturally and have voice conversations with the AI assistant</p>
            <div className={styles.features}>
              <div className={styles.feature}>✓ Natural voice interaction</div>
              <div className={styles.feature}>✓ Hands-free operation</div>
              <div className={styles.feature}>✓ Real-time voice responses</div>
            </div>
            <button className={styles.selectButton}>
              Select Voice Mode
            </button>
          </div>
        </div>
        
        <div className={styles.footer}>
          <p>You can always switch between modes later in the settings</p>
        </div>
      </div>
    </div>
  );
}

export default ModeSelection;