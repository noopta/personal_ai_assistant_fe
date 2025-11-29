import { useState, useEffect, useRef } from 'react';
import styles from './RecentActivity.module.css';

function RecentActivity() {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [userIDHash, setUserIDHash] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const heartbeatTimeoutRef = useRef(null);
  const hashIDRef = useRef(null);
  const reconnectAttempts = useRef(0);
  // Python server on port 5001
  const PYTHON_SERVER_URL = 'https://api.airthreads.ai:5001';

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

  // Fetch user session and hash ID from backend
  // Backend now aggregates activities from all linked services automatically
  const fetchActivityHashID = async () => {
    try {
      const response = await fetch(`${PYTHON_SERVER_URL}/user/session`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();

        // Check authentication status
        if (!data.authenticated) {
          return null;
        }

        // Use primary userIDHash - backend aggregates from all linked services
        const hashID = data.userIDHash;
        
        if (hashID) {
          setUserIDHash(hashID);
          return hashID;
        }
      }
      return null;
    } catch (error) {
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
  const fetchActivities = async (hashID) => {
    try {
      // If we have a hashID, use POST with body (limit in body); otherwise use GET with cookies only
      const requestOptions = hashID ? {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ userIDHash: hashID, limit: 20 })
      } : {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      };

      const response = await fetch(`${PYTHON_SERVER_URL}/activity/recent`, requestOptions);

      if (!response.ok) {
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      
      // Transform activities to match component structure
      const transformedActivities = (data.activities || []).map((activity, index) => ({
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
      setIsLoading(false);
    }
  };

  // Reset heartbeat timeout - if no heartbeat for 60s, reconnect
  const resetHeartbeatTimeout = () => {
    if (heartbeatTimeoutRef.current) {
      clearTimeout(heartbeatTimeoutRef.current);
    }
    
    heartbeatTimeoutRef.current = setTimeout(() => {
      reconnectStream();
    }, 60000); // 60 seconds
  };

  // Reconnect with exponential backoff
  const reconnectStream = () => {
    if (!hashIDRef.current) {
      return;
    }

    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    // Clear any existing reconnect timer to prevent multiple connections
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Clear heartbeat timeout since we're reconnecting
    if (heartbeatTimeoutRef.current) {
      clearTimeout(heartbeatTimeoutRef.current);
      heartbeatTimeoutRef.current = null;
    }

    setIsConnected(false);

    // Calculate backoff delay (max 30 seconds)
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);

    reconnectTimeoutRef.current = setTimeout(() => {
      reconnectAttempts.current += 1;
      setupEventSource(hashIDRef.current);
    }, delay);
  };

  // Set up real-time EventSource stream with reconnection logic
  const setupEventSource = (hashID) => {
    if (!hashID) {
      return;
    }

    // Store hashID for reconnection
    hashIDRef.current = hashID;

    // Close any existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      const eventSource = new EventSource(
        `${PYTHON_SERVER_URL}/activity/stream?userIDHash=${hashID}`,
        { withCredentials: true }
      );

      eventSource.onopen = () => {
        setIsConnected(true);
        reconnectAttempts.current = 0; // Reset reconnect counter on success
        
        // Clear any pending reconnect timers since we're now connected
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
        
        // Start heartbeat monitoring
        resetHeartbeatTimeout();
      };

      eventSource.onmessage = (event) => {
        try {
          // Reset heartbeat timeout on any message
          resetHeartbeatTimeout();

          // Ignore heartbeat messages (empty or whitespace-only payloads)
          if (!event.data || event.data.trim() === '' || event.data.includes('heartbeat')) {
            return;
          }
          
          const activity = JSON.parse(event.data);
          
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
            
            if (isDuplicate) {
              return prev;
            }
            
            // Prepend new activity and limit to 50 items
            return [newActivity, ...prev].slice(0, 50);
          });
        } catch (parseError) {
          // Silently fail on parse error
        }
      };

      eventSource.onerror = (error) => {
        setIsConnected(false);

        // EventSource readyState: 0 = CONNECTING, 1 = OPEN, 2 = CLOSED
        if (eventSource.readyState === 2) {
          reconnectStream();
        }
      };

      eventSourceRef.current = eventSource;
    } catch (error) {
      setIsConnected(false);
      reconnectStream();
    }
  };

  // Initialize and setup connections
  useEffect(() => {
    const initializeActivity = async () => {
      // Fetch session data to get primary userIDHash
      // Backend now aggregates activities from all linked services
      let hashID = await fetchActivityHashID();
      
      if (!hashID) {
        hashID = getUserIDHashFromCookie();
        if (hashID) {
          setUserIDHash(hashID);
        }
      }

      if (!hashID) {
        setIsLoading(false);
        return;
      }

      // Fetch initial activities with primary userIDHash
      await fetchActivities(hashID);
      
      // Setup real-time stream
      setupEventSource(hashID);
    };

    initializeActivity();

    // Cleanup on unmount
    return () => {
      
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (heartbeatTimeoutRef.current) {
        clearTimeout(heartbeatTimeoutRef.current);
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
          <span 
            className={styles.connectionStatus}
            title={isConnected ? 'Stream connected' : 'Stream disconnected'}
          >
            {isConnected ? '🟢' : '🔴'}
          </span>
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
