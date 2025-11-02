import { useState } from 'react';
import styles from './ChatInput.module.css';

function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send)"
            className={styles.input}
            disabled={disabled}
          />
          <button 
            type="submit" 
            className={`${styles.sendButton} ${disabled ? styles.disabled : ''}`}
            disabled={disabled || !message.trim()}
          >
            <svg viewBox="0 0 24 24" className={styles.sendIcon}>
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
            </svg>
            <span className={styles.sendText}>Send</span>
          </button>
        </div>
        <div className={styles.inputHint}>
          <span className={styles.hintText}>Press Enter to send • Shift+Enter for new line</span>
        </div>
      </form>
    </div>
  );
}

export default ChatInput; 