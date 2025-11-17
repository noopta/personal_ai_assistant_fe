import { useState, useEffect, useRef } from 'react';
import styles from './RecentActivity.module.css';
import { getEnvVar } from '../utils/securityUtils';

function RecentActivity() {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [userIDHash, setUserIDHash] = useState(null);
  const eventSourceRef = useRef(null);
  const API_BASE_URL = getEnvVar('REACT_APP_API_BASE_URL', 'https://api.airthreads.ai');

  // Get userIDHash from cookies
  const getUserIDHashFromCookie = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'userIDHash') {
        return value;
      }
    }
    return null;
  };

  // Fetch userIDHash from backend if not in cookies
  const fetchUserIDHash = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/session`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.userIDHash) {
          setUserIDHash(data.userIDHash);
          return data.userIDHash;
        }
      }
      console.warn('Could not fetch userIDHash from backend');
      return null;
    } catch (error) {
      console.error('Error fetching userIDHash:', error);
      return null;
    }
  };

  // Convert Unix timestamp to relative time
  const getRelativeTime = (unixTimestamp) => {
    const now = Math.floor(Date.now() / 1000);
    const diffSeconds = now - unixTimestamp;
    
    if (diffSeconds < 60) return 'just now';
    if (diffSeconds < 3600) {
      const minutes = Math.floor(diffSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    if (diffSeconds < 86400) {
      const hours = Math.floor(diffSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    const days = Math.floor(diffSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  // Fetch initial activities
  const fetchActivities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/activity/recent?limit=20`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        console.warn('Failed to fetch activities:', response.status);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      
      // Transform activities to match component structure
      const transformedActivities = data.activities.map((activity, index) => ({
        id: `${activity.timestamp}-${index}`,
        description: activity.summary,
        timestamp: getRelativeTime(activity.timestamp),
        type: activity.source,
        rawTimestamp: activity.timestamp,
        metadata: activity.metadata
      }));

      setActivities(transformedActivities);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setIsLoading(false);
    }
  };

  // Set up real-time EventSource stream
  const setupEventSource = (hashID) => {
    if (!hashID) {
      console.warn('No userIDHash available for activity stream');
      return;
    }

    try {
      // Include userIDHash as URL parameter as required by backend
      const eventSource = new EventSource(
        `${API_BASE_URL}/api/activity/stream?userIDHash=${hashID}`,
        { withCredentials: true }
      );

      eventSource.onmessage = (event) => {
        try {
          // Ignore heartbeat messages (empty or whitespace-only payloads)
          if (!event.data || event.data.trim() === '') {
            console.log('💓 Activity stream heartbeat');
            return;
          }
          
          const activity = JSON.parse(event.data);
          console.log('📧 New activity received:', activity.summary);
          
          // Transform and prepend new activity
          const newActivity = {
            id: `${activity.timestamp}-${Date.now()}`,
            description: activity.summary,
            timestamp: getRelativeTime(activity.timestamp),
            type: activity.source,
            rawTimestamp: activity.timestamp,
            metadata: activity.metadata
          };

          setActivities(prev => {
            // De-duplicate: check if activity already exists
            const isDuplicate = prev.some(item => 
              item.description === newActivity.description && 
              item.rawTimestamp === newActivity.rawTimestamp
            );
            
            if (isDuplicate) return prev;
            
            // Prepend new activity and limit to 50 items
            return [newActivity, ...prev].slice(0, 50);
          });
        } catch (parseError) {
          console.error('Error parsing activity event:', parseError);
        }
      };

      eventSource.onerror = (error) => {
        console.error('❌ EventSource connection error (will auto-reconnect):', error);
        console.error('Stream URL was:', `${API_BASE_URL}/api/activity/stream?userIDHash=${hashID.substring(0, 8)}...`);
        // EventSource automatically reconnects
      };

      eventSource.onopen = () => {
        console.log('✅ Activity stream connected successfully');
      };

      eventSourceRef.current = eventSource;
    } catch (error) {
      console.error('Error setting up EventSource:', error);
    }
  };

  // Initialize userIDHash and setup connections
  useEffect(() => {
    const initializeActivity = async () => {
      console.log('🔍 Initializing Recent Activity component...');
      
      // First, try to get userIDHash from cookies
      let hashID = getUserIDHashFromCookie();
      
      if (hashID) {
        console.log('✅ Found userIDHash in cookies:', hashID.substring(0, 8) + '...');
        setUserIDHash(hashID);
      } else {
        console.log('⚠️ No userIDHash in cookies, attempting to fetch from backend...');
        hashID = await fetchUserIDHash();
        if (hashID) {
          console.log('✅ Retrieved userIDHash from backend:', hashID.substring(0, 8) + '...');
        }
      }

      // Fetch initial activities
      await fetchActivities();
      
      // Setup real-time stream with userIDHash
      if (hashID) {
        console.log('🔌 Setting up EventSource stream with userIDHash...');
        setupEventSource(hashID);
      } else {
        console.error('❌ Cannot setup activity stream: No userIDHash available');
        console.error('Please ensure you are authenticated and the backend is properly setting cookies');
        setIsLoading(false);
      }
    };

    initializeActivity();

    // Cleanup on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  // Update relative timestamps every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => prev.map(activity => ({
        ...activity,
        timestamp: getRelativeTime(activity.rawTimestamp)
      })));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
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
          {activities.length > 0 && (
            <span className={styles.activityCount}>{activities.length}</span>
          )}
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
          // Actual activity items or empty state
          activities.length > 0 ? (
            activities.map((activity, index) => (
              <div 
                key={activity.id} 
                className={styles.activityItem}
                style={{ animationDelay: `${index * 0.05}s` }}
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
          ) : (
            <div className={styles.emptyState}>
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                className={styles.emptyIcon}
              >
                <path 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <p className={styles.emptyText}>No recent activity yet</p>
              <p className={styles.emptySubtext}>Your Gmail and Calendar actions will appear here</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default RecentActivity;
