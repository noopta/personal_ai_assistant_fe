import { useState, useEffect } from 'react';
import styles from './VoiceMode.module.css';
import RecentActivity from './RecentActivity';

function VoiceMode({ onSwitchMode, vapiRef, messages, setMessages, isLoading, setIsLoading, vapiSessionToken }) {
  const [isListening, setIsListening] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);

  // Set up Vapi event listeners for real-time updates
  useEffect(() => {
    if (vapiRef.current) {
      const handleTranscript = (event) => {
        // User is speaking
        setCurrentTranscript(event.transcript);
        setIsListening(true);
        setIsAISpeaking(false);
      };

      const handleMessage = (message) => {
        if (message.role === 'user' && message.type === 'transcript') {
          // User finished speaking
          setCurrentTranscript('');
          setIsListening(false);
          setIsLoading(true);
        } else if (message.role === 'assistant') {
          // AI is responding
          setIsLoading(false);
          setIsAISpeaking(true);
        }
      };

      const handleSpeechStart = () => {
        setIsAISpeaking(true);
        setIsLoading(false);
        setIsListening(false);
      };

      const handleSpeechEnd = () => {
        setIsAISpeaking(false);
      };

      const handleCallStart = () => {
        setIsCallActive(true);
        setIsListening(false);
        setIsAISpeaking(false);
      };

      const handleCallEnd = () => {
        setIsCallActive(false);
        setIsListening(false);
        setIsLoading(false);
        setIsAISpeaking(false);
        setCurrentTranscript('');
      };

      // Add event listeners
      vapiRef.current.on('transcript', handleTranscript);
      vapiRef.current.on('message', handleMessage);
      vapiRef.current.on('speech-start', handleSpeechStart);
      vapiRef.current.on('speech-end', handleSpeechEnd);
      vapiRef.current.on('call-start', handleCallStart);
      vapiRef.current.on('call-end', handleCallEnd);

      // Cleanup listeners on unmount
      return () => {
        if (vapiRef.current) {
          vapiRef.current.off('transcript', handleTranscript);
          vapiRef.current.off('message', handleMessage);
          vapiRef.current.off('speech-start', handleSpeechStart);
          vapiRef.current.off('speech-end', handleSpeechEnd);
          vapiRef.current.off('call-start', handleCallStart);
          vapiRef.current.off('call-end', handleCallEnd);
        }
      };
    }
  }, [vapiRef, setMessages, setIsLoading]);

  const handleStartListening = () => {
    if (vapiRef.current) {
      // Check if call is active; if not, restart it
      if (!isCallActive) {
        // Pass session token for user identification
        const assistantOverrides = {
          recordingEnabled: false
        };

        if (vapiSessionToken) {
          assistantOverrides.variableValues = {
            session_token: vapiSessionToken
          };
        }

        vapiRef.current.start('607939c5-79e1-4de7-bbfa-4e3f0671edef', assistantOverrides);
        // The call-start event will set isCallActive to true
      }
    }
  };

  const handleStopListening = () => {
    if (vapiRef.current) {
      // Stop the current call
      vapiRef.current.stop();
    }
    setIsListening(false);
    setCurrentTranscript('');
  };

  return (
    <div className={styles.voiceMode}>
      <div className={styles.header}>
        <h1>AirThreads - Voice Mode</h1>
        <p>Speak naturally with your AI assistant</p>
        <button 
          className={styles.switchModeButton}
          onClick={() => onSwitchMode('text')}
        >
          Switch to Text Mode
        </button>
      </div>

      <div className={styles.voiceInterface}>
        <div className={styles.visualizer}>
          {/* Persistent AI Avatar */}
          <div className={styles.avatarContainer}>
            <div className={`${styles.avatar} ${isListening ? styles.listening : ''} ${isAISpeaking ? styles.speaking : ''} ${isLoading ? styles.processing : ''}`}>
              <div className={styles.avatarOrb}>
                <div className={styles.orbCore}></div>
                <div className={styles.orbRing}></div>
                <div className={styles.orbRing} style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Status indicator inside avatar area */}
            <div className={styles.statusIndicator}>
              <div className={styles.statusDot}></div>
              <span className={styles.statusText}>
                {isListening ? 'Listening...' : isAISpeaking ? 'Speaking...' : isLoading ? 'Thinking...' : 'Ready'}
              </span>
            </div>
          </div>

          {/* Waveform visualizer */}
          <div className={`${styles.waveformContainer} ${(isListening || isAISpeaking) ? styles.active : ''}`}>
            <div className={styles.waveform}>
              <div className={styles.wave}></div>
              <div className={styles.wave}></div>
              <div className={styles.wave}></div>
              <div className={styles.wave}></div>
              <div className={styles.wave}></div>
            </div>
          </div>

          {/* Transcript display */}
          {currentTranscript && (
            <div className={styles.transcriptDisplay}>
              <p>"{currentTranscript}"</p>
            </div>
          )}
        </div>

        <div className={styles.controls}>
          {!isCallActive ? (
            <button
              className={styles.startButton}
              onClick={handleStartListening}
            >
              <span className={styles.buttonIcon}>🎤</span>
              Start Conversation
            </button>
          ) : (
            <button
              className={styles.stopButton}
              onClick={handleStopListening}
            >
              <span className={styles.buttonIcon}>✕</span>
              End Call
            </button>
          )}
        </div>

        <div className={styles.infoPanel}>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>🔊</div>
            <div className={styles.infoContent}>
              <div className={styles.infoLabel}>Voice Activity</div>
              <div className={styles.infoValue}>
                {isListening ? 'You are speaking' : isAISpeaking ? 'AI is responding' : isLoading ? 'Processing...' : 'Waiting'}
              </div>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>🌐</div>
            <div className={styles.infoContent}>
              <div className={styles.infoLabel}>Connection</div>
              <div className={styles.infoValue}>Vapi Active</div>
            </div>
          </div>
        </div>

        {/* Recent Activity Drawer - Integrated below info panel */}
        <div className={styles.activityDrawer}>
          <RecentActivity />
        </div>
      </div>

      {/* Conversation history commented out until proper parsing is implemented */}
      {/* {messages.length > 0 && (
        <div className={styles.conversationHistory}>
          <h3>Conversation History</h3>
          <div className={styles.messages}>
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                type={message.type}
                content={message.content}
              />
            ))}
            {isLoading && (
              <div className={styles.loadingIndicator}>
                <div className={styles.spinner}></div>
                <p>AI is responding...</p>
              </div>
            )}
          </div>
        </div>
      )} */}

    </div>
  );
}

export default VoiceMode;