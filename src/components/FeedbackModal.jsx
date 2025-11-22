import { useState, useEffect, useRef } from 'react';
import styles from './FeedbackModal.module.css';

function FeedbackModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    bugs: '',
    improvements: '',
    enjoyedFeatures: '',
    solvesIssue: '',
    willingness: '',
    paymentFactors: '',
    convenience: '',
    removeFeatures: '',
    confusingParts: '',
    additionalThoughts: ''
  });
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const savedData = localStorage.getItem('airthreads_beta_feedback');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved feedback:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = isMinimized ? 'auto' : 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isMinimized]);

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    localStorage.setItem('airthreads_beta_feedback', JSON.stringify(newData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Beta Feedback Submitted:', {
      timestamp: new Date().toISOString(),
      ...formData
    });

    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        bugs: '',
        improvements: '',
        enjoyedFeatures: '',
        solvesIssue: '',
        willingness: '',
        paymentFactors: '',
        convenience: '',
        removeFeatures: '',
        confusingParts: '',
        additionalThoughts: ''
      });
      localStorage.removeItem('airthreads_beta_feedback');
      onClose();
    }, 2500);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <div className={styles.minimizedBar} onClick={toggleMinimize}>
        <span className={styles.minimizedText}>📝 Beta Feedback Form (Click to expand)</span>
      </div>
    );
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.titleGroup}>
              <h2 className={styles.title}>Beta Testing Feedback</h2>
              <span className={styles.badge}>Your Input Shapes AirThreads</span>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.minimizeButton}
              onClick={toggleMinimize}
              aria-label="Minimize"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.intro}>
            Thank you for being part of our beta! Your honest feedback helps us build a better product. 
            Feel free to fill this out as you explore—your progress is automatically saved, so you can 
            minimize this form and come back to it anytime.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>
                  🐛 Bugs & Issues
                  <span className={styles.optional}>Optional</span>
                </span>
                <span className={styles.hint}>
                  Have you encountered any bugs, glitches, or unexpected behavior? Please describe them in detail, 
                  including what you were doing when it occurred.
                </span>
                <textarea
                  className={styles.textarea}
                  value={formData.bugs}
                  onChange={(e) => handleChange('bugs', e.target.value)}
                  placeholder="Example: The calendar integration doesn't refresh after adding a new event..."
                  rows={3}
                />
              </label>
            </div>

            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>
                  ✨ What Features Do You Enjoy Most?
                  <span className={styles.optional}>Optional</span>
                </span>
                <span className={styles.hint}>
                  Which parts of AirThreads do you find most useful or delightful? What keeps you coming back?
                </span>
                <textarea
                  className={styles.textarea}
                  value={formData.enjoyedFeatures}
                  onChange={(e) => handleChange('enjoyedFeatures', e.target.value)}
                  placeholder="Example: I love how quickly I can schedule meetings just by chatting..."
                  rows={3}
                />
              </label>
            </div>

            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>
                  💡 Improvements & New Features
                  <span className={styles.optional}>Optional</span>
                </span>
                <span className={styles.hint}>
                  What could we improve? Are there features you'd like to see added? How can we make AirThreads 
                  more powerful for your workflow?
                </span>
                <textarea
                  className={styles.textarea}
                  value={formData.improvements}
                  onChange={(e) => handleChange('improvements', e.target.value)}
                  placeholder="Example: It would be great if I could filter emails by date range..."
                  rows={4}
                />
              </label>
            </div>

            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>
                  🎯 Does AirThreads Solve a Real Problem for You?
                  <span className={styles.optional}>Optional</span>
                </span>
                <span className={styles.hint}>
                  Tell us about the problem you're trying to solve. How well does AirThreads address it? 
                  What was your workflow before?
                </span>
                <textarea
                  className={styles.textarea}
                  value={formData.solvesIssue}
                  onChange={(e) => handleChange('solvesIssue', e.target.value)}
                  placeholder="Example: I used to spend 20 minutes daily checking emails and updating my calendar..."
                  rows={4}
                />
              </label>
            </div>

            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>
                  💰 Would You Pay for AirThreads?
                  <span className={styles.optional}>Optional</span>
                </span>
                <span className={styles.hint}>
                  Honest feedback helps us understand value. If yes, what would you expect to pay? 
                  If no, what would need to change?
                </span>
                <textarea
                  className={styles.textarea}
                  value={formData.willingness}
                  onChange={(e) => handleChange('willingness', e.target.value)}
                  placeholder="Example: Yes, I'd pay $10-15/month if it had Slack integration..."
                  rows={3}
                />
              </label>
            </div>

            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>
                  🔑 What Would Make You Pay for It?
                  <span className={styles.optional}>Optional</span>
                </span>
                <span className={styles.hint}>
                  What features, integrations, or improvements would make AirThreads a must-have paid tool for you?
                </span>
                <textarea
                  className={styles.textarea}
                  value={formData.paymentFactors}
                  onChange={(e) => handleChange('paymentFactors', e.target.value)}
                  placeholder="Example: Advanced automation rules, team collaboration features, or enterprise integrations..."
                  rows={3}
                />
              </label>
            </div>

            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>
                  ⚡ Convenience vs. Current Workflow
                  <span className={styles.optional}>Optional</span>
                </span>
                <span className={styles.hint}>
                  Is AirThreads more convenient than your current manual process? If not, what would make it faster 
                  or easier to use?
                </span>
                <textarea
                  className={styles.textarea}
                  value={formData.convenience}
                  onChange={(e) => handleChange('convenience', e.target.value)}
                  placeholder="Example: It's faster for simple tasks, but for complex email searches I still use Gmail directly..."
                  rows={3}
                />
              </label>
            </div>

            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>
                  ✂️ What Should We Remove or Simplify?
                  <span className={styles.optional}>Optional</span>
                </span>
                <span className={styles.hint}>
                  Are there features or UI elements that feel unnecessary, confusing, or in the way? What could be simpler?
                </span>
                <textarea
                  className={styles.textarea}
                  value={formData.removeFeatures}
                  onChange={(e) => handleChange('removeFeatures', e.target.value)}
                  placeholder="Example: The voice mode button is confusing, I thought it was a settings menu..."
                  rows={3}
                />
              </label>
            </div>

            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>
                  🤔 Confusing or Unclear Parts
                  <span className={styles.optional}>Optional</span>
                </span>
                <span className={styles.hint}>
                  Was anything hard to understand or figure out? Where did you get stuck or confused?
                </span>
                <textarea
                  className={styles.textarea}
                  value={formData.confusingParts}
                  onChange={(e) => handleChange('confusingParts', e.target.value)}
                  placeholder="Example: I wasn't sure how to disconnect an integration once I connected it..."
                  rows={3}
                />
              </label>
            </div>

            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>
                  💭 Additional Thoughts
                  <span className={styles.optional}>Optional</span>
                </span>
                <span className={styles.hint}>
                  Anything else you'd like to share? Ideas, concerns, compliments—we want to hear it all!
                </span>
                <textarea
                  className={styles.textarea}
                  value={formData.additionalThoughts}
                  onChange={(e) => handleChange('additionalThoughts', e.target.value)}
                  placeholder="Share any other thoughts, ideas, or feedback..."
                  rows={4}
                />
              </label>
            </div>

            <div className={styles.footer}>
              <button type="submit" className={styles.submitButton}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Send Feedback
              </button>
            </div>
          </form>
        </div>

        {showSuccess && (
          <div className={styles.successNotification}>
            <div className={styles.successContent}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <div className={styles.successTitle}>Feedback Sent!</div>
                <div className={styles.successMessage}>Thank you for helping us improve AirThreads</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FeedbackModal;
