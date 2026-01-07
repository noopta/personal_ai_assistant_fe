import { useState, useEffect } from 'react';
import styles from './FeedbackDashboard.module.css';
import logger from '../utils/logger';

const PYTHON_SERVER_URL = 'https://api.airthreads.ai:5001';

const FEEDBACK_CATEGORIES = [
  { key: 'bugs', label: 'Bug Reports', icon: '🐛', description: 'Issues and problems reported by users' },
  { key: 'improvements', label: 'Improvement Suggestions', icon: '💡', description: 'Feature requests and enhancements' },
  { key: 'enjoyedFeatures', label: 'Enjoyed Features', icon: '❤️', description: 'What users love about the product' },
  { key: 'solvesIssue', label: 'Problem Solving', icon: '✅', description: 'How the product helps users' },
  { key: 'willingness', label: 'Pricing Feedback', icon: '💰', description: 'Willingness to pay and pricing thoughts' },
  { key: 'paymentFactors', label: 'Payment Factors', icon: '📊', description: 'What influences payment decisions' },
  { key: 'convenience', label: 'Convenience', icon: '⚡', description: 'Ease of use feedback' },
  { key: 'removeFeatures', label: 'Features to Remove', icon: '🗑️', description: 'What users think should go' },
  { key: 'confusingParts', label: 'Confusing Parts', icon: '❓', description: 'Areas needing clarity' },
  { key: 'additionalThoughts', label: 'Additional Thoughts', icon: '💭', description: 'General feedback and ideas' },
];

const PAGE_FEEDBACK_CATEGORIES = [
  { key: 'landing', label: 'Landing Page', icon: '🏠' },
  { key: 'product', label: 'Product Page', icon: '💻' },
  { key: 'integrations', label: 'Integrations Page', icon: '🔗' },
  { key: 'about', label: 'About Page', icon: '📖' },
];

function FeedbackDashboard() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${PYTHON_SERVER_URL}/api/feedback/data`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch feedback (${response.status})`);
      }

      const data = await response.json();
      setFeedback(data.feedback || []);
      setLastUpdated(new Date());
    } catch (err) {
      logger.error('Failed to fetch feedback:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (key) => {
    setExpandedCategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const getFeedbackForCategory = (categoryKey) => {
    return feedback
      .filter(item => item[categoryKey] && item[categoryKey].trim() !== '')
      .map(item => ({
        text: item[categoryKey],
        timestamp: item.timestamp
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const getPageFeedback = (pageKey) => {
    return feedback
      .filter(item => item.pageFeedback && item.pageFeedback[pageKey] && item.pageFeedback[pageKey].trim() !== '')
      .map(item => ({
        text: item.pageFeedback[pageKey],
        timestamp: item.timestamp
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const getTotalResponses = () => {
    return feedback.length;
  };

  if (loading) {
    return (
      <div className={styles.dashboardPage}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading feedback...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Feedback Dashboard</h1>
            <p className={styles.subtitle}>
              Beta tester feedback organized by category
            </p>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{getTotalResponses()}</span>
              <span className={styles.statLabel}>Total Responses</span>
            </div>
            <button className={styles.refreshButton} onClick={fetchFeedback}>
              <svg viewBox="0 0 24 24" className={styles.refreshIcon}>
                <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
              Refresh
            </button>
          </div>
        </header>

        {error && (
          <div className={styles.errorBanner}>
            <span>⚠️ {error}</span>
            <button onClick={fetchFeedback}>Try Again</button>
          </div>
        )}

        {lastUpdated && (
          <p className={styles.lastUpdated}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}

        <section className={styles.categoriesSection}>
          <h2>General Feedback</h2>
          <div className={styles.categoriesGrid}>
            {FEEDBACK_CATEGORIES.map(category => {
              const items = getFeedbackForCategory(category.key);
              const isExpanded = expandedCategories[category.key];
              
              return (
                <div key={category.key} className={styles.categoryCard}>
                  <button 
                    className={styles.categoryHeader}
                    onClick={() => toggleCategory(category.key)}
                  >
                    <div className={styles.categoryInfo}>
                      <span className={styles.categoryIcon}>{category.icon}</span>
                      <div>
                        <h3>{category.label}</h3>
                        <p className={styles.categoryDescription}>{category.description}</p>
                      </div>
                    </div>
                    <div className={styles.categoryMeta}>
                      <span className={styles.responseCount}>
                        {items.length} response{items.length !== 1 ? 's' : ''}
                      </span>
                      <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
                        ▼
                      </span>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className={styles.categoryContent}>
                      {items.length === 0 ? (
                        <p className={styles.emptyState}>No feedback yet</p>
                      ) : (
                        <ul className={styles.feedbackList}>
                          {items.map((item, idx) => (
                            <li key={idx} className={styles.feedbackItem}>
                              <p className={styles.feedbackText}>{item.text}</p>
                              <span className={styles.feedbackTime}>
                                {getRelativeTime(item.timestamp)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.categoriesSection}>
          <h2>Page-Specific Feedback</h2>
          <div className={styles.categoriesGrid}>
            {PAGE_FEEDBACK_CATEGORIES.map(page => {
              const items = getPageFeedback(page.key);
              const isExpanded = expandedCategories[`page_${page.key}`];
              
              return (
                <div key={page.key} className={styles.categoryCard}>
                  <button 
                    className={styles.categoryHeader}
                    onClick={() => toggleCategory(`page_${page.key}`)}
                  >
                    <div className={styles.categoryInfo}>
                      <span className={styles.categoryIcon}>{page.icon}</span>
                      <div>
                        <h3>{page.label}</h3>
                        <p className={styles.categoryDescription}>Feedback specific to this page</p>
                      </div>
                    </div>
                    <div className={styles.categoryMeta}>
                      <span className={styles.responseCount}>
                        {items.length} response{items.length !== 1 ? 's' : ''}
                      </span>
                      <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
                        ▼
                      </span>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className={styles.categoryContent}>
                      {items.length === 0 ? (
                        <p className={styles.emptyState}>No feedback yet</p>
                      ) : (
                        <ul className={styles.feedbackList}>
                          {items.map((item, idx) => (
                            <li key={idx} className={styles.feedbackItem}>
                              <p className={styles.feedbackText}>{item.text}</p>
                              <span className={styles.feedbackTime}>
                                {getRelativeTime(item.timestamp)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FeedbackDashboard;
