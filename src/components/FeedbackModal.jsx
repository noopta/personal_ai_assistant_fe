import { useState, useEffect, useRef } from 'react';
import styles from './FeedbackModal.module.css';

function FeedbackModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('general');
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
    additionalThoughts: '',
    pageFeedback: {
      landing: '',
      product: '',
      integrations: '',
      about: ''
    }
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const savedData = localStorage.getItem('airthreads_beta_feedback');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData({
          ...parsed,
          pageFeedback: parsed.pageFeedback || {
            landing: '',
            product: '',
            integrations: '',
            about: ''
          }
        });
      } catch (e) {
        // Silently fail - localStorage data may be corrupted
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    localStorage.setItem('airthreads_beta_feedback', JSON.stringify(newData));
  };

  const handlePageFeedbackChange = (page, value) => {
    const newData = {
      ...formData,
      pageFeedback: {
        ...formData.pageFeedback,
        [page]: value
      }
    };
    setFormData(newData);
    localStorage.setItem('airthreads_beta_feedback', JSON.stringify(newData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const feedbackData = {
      timestamp: new Date().toISOString(),
      ...formData
    };

    try {
      const response = await fetch('https://api.airthreads.ai:5001/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(feedbackData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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
          additionalThoughts: '',
          pageFeedback: {
            landing: '',
            product: '',
            integrations: '',
            about: ''
          }
        });
        localStorage.removeItem('airthreads_beta_feedback');
        onClose();
      }, 2500);
    } catch (error) {
      if (error.message?.includes('429') || error.message?.includes('rate_limit')) {
        alert('Please wait a moment before submitting feedback again.');
      } else {
        alert('Failed to submit feedback. Please try again or contact support@airthreads.ai');
      }
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', label: 'General Feedback', icon: FeedbackIcon },
    { id: 'landing', label: 'Landing Page', icon: HomeIcon },
    { id: 'product', label: 'Product', icon: ProductIcon },
    { id: 'integrations', label: 'Integrations', icon: IntegrationsIcon },
    { id: 'about', label: 'About', icon: AboutIcon }
  ];

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

        <div className={styles.tabs}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon />
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {activeTab !== 'general' ? (
            <div className={styles.pageSpecificContent}>
              <div className={styles.pageHeader}>
                <h3 className={styles.pageTitle}>
                  {tabs.find(t => t.id === activeTab)?.label} Feedback
                </h3>
                <p className={styles.pageDescription}>
                  Share your thoughts, suggestions, or issues specific to this page. What works well? 
                  What could be improved? Any bugs or confusing elements?
                </p>
              </div>
              <textarea
                className={styles.pageTextarea}
                value={formData.pageFeedback[activeTab] || ''}
                onChange={(e) => handlePageFeedbackChange(activeTab, e.target.value)}
                placeholder={`Share your feedback about the ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...\n\nExamples:\n• Layout or design issues\n• Missing features or information\n• Confusing navigation or copy\n• Performance or loading problems\n• Any other thoughts specific to this page`}
                rows={12}
              />
            </div>
          ) : (
            <>
              <p className={styles.intro}>
                Thank you for being part of our beta! Your honest feedback helps us build a better product. 
                Your progress is automatically saved—feel free to close this and come back anytime!
                <br/><br/>
                <strong>💡 Tip:</strong> Click through the other tabs above (Landing Page, Product, Integrations, About) 
                to provide page-specific feedback if you have thoughts on any particular page!
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.section}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      <BugIcon className={styles.icon} />
                      Bugs & Issues
                      <span className={styles.optional}>Optional</span>
                    </span>
                    <span className={styles.hint}>
                      Have you encountered any bugs, glitches, or unexpected behavior? Please describe them in detail.
                    </span>
                    <textarea
                      className={styles.textarea}
                      value={formData.bugs}
                      onChange={(e) => handleChange('bugs', e.target.value)}
                      placeholder="Describe any bugs or technical issues you've encountered..."
                      rows={3}
                    />
                  </label>
                </div>

                <div className={styles.section}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      <HeartIcon className={styles.icon} />
                      What Features Do You Enjoy Most?
                      <span className={styles.optional}>Optional</span>
                    </span>
                    <span className={styles.hint}>
                      Which parts of AirThreads do you find most useful or delightful? What keeps you coming back?
                    </span>
                    <textarea
                      className={styles.textarea}
                      value={formData.enjoyedFeatures}
                      onChange={(e) => handleChange('enjoyedFeatures', e.target.value)}
                      placeholder="Share what you love about AirThreads..."
                      rows={3}
                    />
                  </label>
                </div>

                <div className={styles.section}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      <LightbulbIcon className={styles.icon} />
                      Improvements & New Features
                      <span className={styles.optional}>Optional</span>
                    </span>
                    <span className={styles.hint}>
                      What could we improve? Are there features you'd like to see added?
                    </span>
                    <textarea
                      className={styles.textarea}
                      value={formData.improvements}
                      onChange={(e) => handleChange('improvements', e.target.value)}
                      placeholder="Suggest improvements or new features..."
                      rows={4}
                    />
                  </label>
                </div>

                <div className={styles.section}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      <TargetIcon className={styles.icon} />
                      Does AirThreads Solve a Real Problem?
                      <span className={styles.optional}>Optional</span>
                    </span>
                    <span className={styles.hint}>
                      Tell us about the problem you're trying to solve. How well does AirThreads address it?
                    </span>
                    <textarea
                      className={styles.textarea}
                      value={formData.solvesIssue}
                      onChange={(e) => handleChange('solvesIssue', e.target.value)}
                      placeholder="Describe the problem and how well we solve it..."
                      rows={4}
                    />
                  </label>
                </div>

                <div className={styles.section}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      <DollarIcon className={styles.icon} />
                      Would You Pay for AirThreads?
                      <span className={styles.optional}>Optional</span>
                    </span>
                    <span className={styles.hint}>
                      Honest feedback helps us understand value. If yes, what would you expect to pay?
                    </span>
                    <textarea
                      className={styles.textarea}
                      value={formData.willingness}
                      onChange={(e) => handleChange('willingness', e.target.value)}
                      placeholder="Share your thoughts on pricing..."
                      rows={3}
                    />
                  </label>
                </div>

                <div className={styles.section}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      <KeyIcon className={styles.icon} />
                      What Would Make You Pay for It?
                      <span className={styles.optional}>Optional</span>
                    </span>
                    <span className={styles.hint}>
                      What features or improvements would make AirThreads a must-have paid tool?
                    </span>
                    <textarea
                      className={styles.textarea}
                      value={formData.paymentFactors}
                      onChange={(e) => handleChange('paymentFactors', e.target.value)}
                      placeholder="What would justify payment for you..."
                      rows={3}
                    />
                  </label>
                </div>

                <div className={styles.section}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      <ZapIcon className={styles.icon} />
                      Convenience vs. Current Workflow
                      <span className={styles.optional}>Optional</span>
                    </span>
                    <span className={styles.hint}>
                      Is AirThreads more convenient than your current manual process?
                    </span>
                    <textarea
                      className={styles.textarea}
                      value={formData.convenience}
                      onChange={(e) => handleChange('convenience', e.target.value)}
                      placeholder="Compare to your current workflow..."
                      rows={3}
                    />
                  </label>
                </div>

                <div className={styles.section}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      <TrashIcon className={styles.icon} />
                      What Should We Remove or Simplify?
                      <span className={styles.optional}>Optional</span>
                    </span>
                    <span className={styles.hint}>
                      Are there features or UI elements that feel unnecessary or confusing?
                    </span>
                    <textarea
                      className={styles.textarea}
                      value={formData.removeFeatures}
                      onChange={(e) => handleChange('removeFeatures', e.target.value)}
                      placeholder="Suggest what to remove or simplify..."
                      rows={3}
                    />
                  </label>
                </div>

                <div className={styles.section}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      <AlertIcon className={styles.icon} />
                      Confusing or Unclear Parts
                      <span className={styles.optional}>Optional</span>
                    </span>
                    <span className={styles.hint}>
                      Was anything hard to understand or figure out? Where did you get stuck?
                    </span>
                    <textarea
                      className={styles.textarea}
                      value={formData.confusingParts}
                      onChange={(e) => handleChange('confusingParts', e.target.value)}
                      placeholder="Share what confused you..."
                      rows={3}
                    />
                  </label>
                </div>

                <div className={styles.section}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      <MessageIcon className={styles.icon} />
                      Additional Thoughts
                      <span className={styles.optional}>Optional</span>
                    </span>
                    <span className={styles.hint}>
                      Anything else you'd like to share? Ideas, concerns, compliments—we want to hear it all!
                    </span>
                    <textarea
                      className={styles.textarea}
                      value={formData.additionalThoughts}
                      onChange={(e) => handleChange('additionalThoughts', e.target.value)}
                      placeholder="Share any other thoughts..."
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
            </>
          )}
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

// Minimalist SVG Icons
const BugIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M8 2V5M16 2V5M7 13H17M3 18H21M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V18C18 19.1046 17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.12084 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LightbulbIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M9 18H15M10 22H14M12 2C8.68629 2 6 4.68629 6 8C6 10.5 7 12.5 9 14V16C9 17.1046 9.89543 18 11 18H13C14.1046 18 15 17.1046 15 16V14C17 12.5 18 10.5 18 8C18 4.68629 15.3137 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TargetIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DollarIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const KeyIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 2L19 4M15.5 7.5L11 12M11 12L8 9L2 15L9 22L15 16L12 13M11 12L15 16L22 9C22.5523 8.44772 22.5523 7.55228 22 7L17 2C16.4477 1.44772 15.5523 1.44772 15 2L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ZapIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M3 6H5H21M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AlertIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86V3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 9V13M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MessageIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProductIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.27 6.96L12 12.01L20.73 6.96M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IntegrationsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AboutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FeedbackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default FeedbackModal;
