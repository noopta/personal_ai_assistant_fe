import { useState, useEffect } from 'react';
import styles from './AuthSetup.module.css';
import { secureLog, loggedFetch } from '../utils/securityUtils';

function AuthSetup({ onAuthComplete, initialGmailAuth = false, initialCalendarAuth = false, forceRecheck = false }) {
  const [isGmailAuthenticated, setIsGmailAuthenticated] = useState(initialGmailAuth);
  const [isCalendarAuthenticated, setIsCalendarAuthenticated] = useState(initialCalendarAuth);
  const [isGmailLoading, setIsGmailLoading] = useState(false);
  const [isCalendarLoading, setIsCalendarLoading] = useState(false);
  const [authMessages, setAuthMessages] = useState([]);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [oauthWindowOpen, setOauthWindowOpen] = useState(false);

  // Get cookie values
  const getCookieValue = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, value] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  useEffect(() => {
    // Sync internal state with initial auth props
    setIsGmailAuthenticated(initialGmailAuth);
    setIsCalendarAuthenticated(initialCalendarAuth);

    // Add success messages for initial auth states if they're true
    if (initialGmailAuth) {
      setAuthMessages(prev => [...prev, '✅ Gmail authentication completed successfully!']);
    }
    if (initialCalendarAuth) {
      setAuthMessages(prev => [...prev, '✅ Google Calendar authentication completed successfully!']);
    }

    // Check authentication status - cookies handled automatically
    checkAuthenticationStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGmailAuth, initialCalendarAuth, forceRecheck]);

  // Add window focus listener to detect when user returns from OAuth
  useEffect(() => {
    const handleWindowFocus = () => {
      // Check status if OAuth window was opened
      if (oauthWindowOpen) {
        secureLog('Window focused after OAuth, checking authentication status');
        setOauthWindowOpen(false); // Reset the flag

        // Add a small delay to ensure OAuth processing is complete
        setTimeout(() => {
          checkAuthenticationStatus();
        }, 1000);
      }
    };

    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oauthWindowOpen]);

  const checkAuthenticationStatus = async () => {
    setIsCheckingStatus(true);

    // Only clear previous messages if we don't have initial auth states
    // (to preserve OAuth success messages)
    if (!initialGmailAuth && !initialCalendarAuth) {
      setAuthMessages([]);
    }

    // Check Gmail status - direct endpoint
    try {
      secureLog('Checking Gmail status');
      const gmailHashID = getCookieValue('gmailHashID');
      const gmailResponse = await loggedFetch('https://api.airthreads.ai:4008/checkGmailStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ gmailHashID })
      });

      secureLog('Gmail status response received');

      if (gmailResponse.ok) {
        const gmailData = await gmailResponse.json();
        secureLog('Gmail status data received');

        // Check multiple possible authentication indicators
        const isAuthenticated = gmailData.needs_auth === false ||
                               gmailData.authenticated === true ||
                               gmailData.status === true;

        secureLog('Gmail authentication status determined', { isAuthenticated });

        // Update authentication state (merge with initial state)
        const finalGmailAuth = isAuthenticated || initialGmailAuth;
        setIsGmailAuthenticated(finalGmailAuth);

        // Add success message if authenticated and no initial auth was provided
        if (isAuthenticated && !initialGmailAuth) {
          setAuthMessages(prev => [...prev, '✅ Gmail is already connected and ready to use!']);
        }
      } else {
        // Preserve initial auth state if there was an error checking status
        setIsGmailAuthenticated(initialGmailAuth || false);
      }
    } catch (gmailError) {
      // Preserve initial auth state if there was an error
      setIsGmailAuthenticated(initialGmailAuth || false);
    }

    // Check Calendar status - direct endpoint
    try {
      secureLog('Checking Calendar status');
      const userIDHash = getCookieValue('userIDHash');
      const calendarResponse = await loggedFetch('https://api.airthreads.ai:4010/checkCalendarStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userIDHash })
      });

      secureLog('Calendar status response received');

      if (calendarResponse.ok) {
        const calendarData = await calendarResponse.json();
        secureLog('Calendar status data received');

        // Check multiple possible authentication indicators
        const isAuthenticated = calendarData.needs_auth === false ||
                               calendarData.authenticated === true ||
                               calendarData.status === true;

        secureLog('Calendar authentication status determined', { isAuthenticated });

        // Don't merge with initial state - only use server response
        setIsCalendarAuthenticated(isAuthenticated);

        // Add success message if authenticated and no initial auth was provided
        if (isAuthenticated && !initialCalendarAuth) {
          setAuthMessages(prev => [...prev, '✅ Google Calendar is already connected and ready to use!']);
        }
      } else {
        // Preserve initial auth state if there was an error checking status
        setIsCalendarAuthenticated(initialCalendarAuth || false);
      }
    } catch (calendarError) {
      // Check if this is a CORS error
      if (calendarError.message?.includes('CORS') || calendarError.name === 'TypeError') {

        let corsMessage = '⚠️ Calendar service temporarily unavailable due to CORS configuration.';

        // Check for specific multiple origin error
        if (calendarError.message?.includes('multiple values') || calendarError.message?.includes('only one is allowed')) {
          corsMessage += ' The server is sending duplicate Access-Control-Allow-Origin headers.';
        }

        corsMessage += ' Please contact support.';
        setAuthMessages(prev => [...prev, corsMessage]);
      }

      // Preserve initial auth state if there was an error
      setIsCalendarAuthenticated(initialCalendarAuth || false);
    }

    // Always reset loading status
    setIsCheckingStatus(false);
  };

  const handleGmailAuth = async () => {
    setIsGmailLoading(true);
    setAuthMessages(prev => [...prev, 'Starting Gmail authentication...']);

    try {
      // Direct endpoint for Gmail auth
      const gmailHashID = getCookieValue('gmailHashID');
      const authResponse = await loggedFetch('https://api.airthreads.ai:4008/initiate-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ gmailHashID })
      });

      const authData = await authResponse.json();

      secureLog('Gmail auth response received', { success: authData.success });

      // Check if we received an auth URL to open
      if (authData.authUrl || authData.auth_url) {
        const authUrl = authData.authUrl || authData.auth_url;

        secureLog('Opening Gmail auth URL');
        setAuthMessages(prev => [...prev, '🔐 Opening Gmail authentication page...']);

        // Set flag to indicate OAuth window was opened
        setOauthWindowOpen(true);

        // Open in a new tab instead of replacing current page
        window.open(authUrl, '_blank');
      }

      if (authData.success === true) {
        secureLog('Gmail authentication successful');
        setAuthMessages(prev => [...prev, `✅ ${authData.message || 'Gmail authentication completed successfully!'}`]);
        setIsGmailAuthenticated(true);
      } else if (authData.timeout) {
        secureLog('Gmail authentication timed out');
        setAuthMessages(prev => [...prev, `⏱️ ${authData.message || 'Gmail authentication timed out. Please try again.'}`]);
        setIsGmailAuthenticated(false);
      } else if (!authData.success && authData.error) {
        secureLog('Gmail authentication failed');
        let errorMessage = `❌ Gmail authentication failed: ${authData.error}`;

        // Check for port conflict error
        if (authData.error?.includes('EADDRINUSE') || authData.error?.includes('address already in use')) {
          errorMessage = '❌ Gmail OAuth server port conflict detected. Please contact support or try again in a few minutes.';
        }

        setAuthMessages(prev => [...prev, errorMessage]);
        setIsGmailAuthenticated(false);
      }
    } catch (error) {
      setAuthMessages(prev => [...prev, `❌ Gmail authentication failed: ${error.message}`]);
    } finally {
      setIsGmailLoading(false);
    }
  };

  const handleCalendarAuth = async () => {
    setIsCalendarLoading(true);
    setAuthMessages(prev => [...prev, 'Starting Google Calendar authentication...']);

    try {
      // Direct endpoint for Calendar auth
      const userIDHash = getCookieValue('userIDHash');
      const authResponse = await loggedFetch('https://api.airthreads.ai:4010/initiate-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userIDHash })
      });

      const authData = await authResponse.json();
      secureLog('Calendar auth response received', { success: authData.success });

      // Check if we received an auth URL to open
      if (authData.authUrl) {
        secureLog('Opening Calendar auth URL');
        setAuthMessages(prev => [...prev, '🔐 Opening Google Calendar authentication page...']);

        // Set flag to indicate OAuth window was opened
        setOauthWindowOpen(true);

        // Open in a new tab instead of replacing current page
        window.open(authData.authUrl, '_blank');
      }

      if (authData.status === 'auth_required' || authData.authUrl) {
        // Authentication URL provided - user needs to authenticate
        setAuthMessages(prev => [...prev, '📋 Please complete the Google Calendar authentication in the new tab']);
      }
    } catch (error) {
      setAuthMessages(prev => [...prev, `❌ Google Calendar authentication failed: ${error.message}`]);
    } finally {
      setIsCalendarLoading(false);
    }
  };

  const canProceed = isGmailAuthenticated || isCalendarAuthenticated; // Allow proceeding with at least one service

  const handleProceed = () => {
    if (canProceed) {
      onAuthComplete({
        isGmailAuthenticated,
        isCalendarAuthenticated
      });
    }
  };

  if (isCheckingStatus) {
    return (
      <div className={styles.authSetup}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>Checking Authentication Status</h2>
            <div className={styles.spinner}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authSetup}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Connect Your Accounts</h2>
          <p>To provide you with the best experience, please authenticate with Gmail and Google Calendar before proceeding.</p>
        </div>

        <div className={styles.authServices}>
          <div className={`${styles.serviceCard} ${isGmailAuthenticated ? styles.authenticated : ''}`}>
            <div className={styles.serviceIcon}>📧</div>
            <div className={styles.serviceContent}>
              <h3>Gmail</h3>
              <p>Connect your Gmail account to manage emails and get email-related assistance</p>
              <div className={styles.serviceStatus}>
                {isGmailAuthenticated ? (
                  <span className={styles.statusConnected}>✅ Connected</span>
                ) : (
                  <button
                    className={styles.authButton}
                    onClick={handleGmailAuth}
                    disabled={isGmailLoading}
                  >
                    {isGmailLoading ? 'Connecting...' : 'Connect Gmail'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={`${styles.serviceCard} ${isCalendarAuthenticated ? styles.authenticated : ''}`}>
            <div className={styles.serviceIcon}>📅</div>
            <div className={styles.serviceContent}>
              <h3>Google Calendar</h3>
              <p>Connect your Google Calendar to manage events, meetings, and scheduling</p>
              <div className={styles.serviceStatus}>
                {isCalendarAuthenticated ? (
                  <span className={styles.statusConnected}>✅ Connected</span>
                ) : (
                  <button
                    className={styles.authButton}
                    onClick={handleCalendarAuth}
                    disabled={isCalendarLoading}
                  >
                    {isCalendarLoading ? 'Connecting...' : 'Connect Calendar'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {authMessages.length > 0 && (
          <div className={styles.messages}>
            <h4>Authentication Status:</h4>
            {authMessages.map((message, index) => (
              <div key={index} className={styles.message}>
                {message}
              </div>
            ))}
          </div>
        )}

        <div className={styles.actions}>
          <button
            className={styles.refreshButton}
            onClick={checkAuthenticationStatus}
            disabled={isGmailLoading || isCalendarLoading}
          >
            🔄 Refresh Status
          </button>

          <button
            className={`${styles.proceedButton} ${canProceed ? styles.enabled : styles.disabled}`}
            onClick={handleProceed}
            disabled={!canProceed}
          >
            {canProceed ? 'Continue to Mode Selection' : 'Please connect at least one service to continue'}
          </button>
        </div>

        <div className={styles.footer}>
          <p><strong>Why do we need these permissions?</strong></p>
          <ul>
            <li>Gmail: To read, compose, and manage your emails</li>
            <li>Google Calendar: To create, update, and manage your calendar events</li>
          </ul>
          <p>Your data is secure and we only access what's necessary for the AI assistant to help you.</p>
        </div>
      </div>
    </div>
  );
}

export default AuthSetup;