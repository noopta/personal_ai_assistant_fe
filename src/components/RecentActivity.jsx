import { useState, useEffect } from 'react';
import styles from './RecentActivity.module.css';

function RecentActivity() {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);

  // Demo activity data
  const demoActivities = [
    {
      id: 1,
      description: 'Scheduled team meeting',
      timestamp: '2 minutes ago',
      type: 'calendar'
    },
    {
      id: 2,
      description: 'Sent project update email',
      timestamp: '5 minutes ago',
      type: 'gmail'
    },
    {
      id: 3,
      description: 'Organized calendar events',
      timestamp: '12 minutes ago',
      type: 'calendar'
    },
    {
      id: 4,
      description: 'Replied to client inquiry',
      timestamp: '28 minutes ago',
      type: 'gmail'
    }
  ];

  // Simulate loading with staggered animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setActivities(demoActivities);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <button 
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className={styles.titleBadge}>
          <span className={styles.title}>RECENT ACTIVITY</span>
          <span className={styles.activityCount}>{activities.length || 4}</span>
        </div>
        <svg 
          className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none"
        >
          <path 
            d="M5 7.5L10 12.5L15 7.5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      <div className={`${styles.activityList} ${isExpanded ? styles.expanded : styles.collapsed}`}>
        {isLoading ? (
          // Loading skeleton
          <>
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index} 
                className={styles.activityItemSkeleton}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.skeletonIcon}></div>
                <div className={styles.skeletonContent}>
                  <div className={styles.skeletonTitle}></div>
                  <div className={styles.skeletonTime}></div>
                </div>
              </div>
            ))}
          </>
        ) : (
          // Actual activity items
          activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className={styles.activityItem}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.checkmark}>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M13.3334 4L6.00002 11.3333L2.66669 8" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityDescription}>{activity.description}</p>
                <p className={styles.activityTimestamp}>{activity.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentActivity;
