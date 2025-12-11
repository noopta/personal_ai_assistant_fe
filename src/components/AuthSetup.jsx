import { useState, useEffect, useRef } from 'react';
import styles from './AuthSetup.module.css';
import { secureLog, loggedFetch } from '../utils/securityUtils';
import GoogleSignInButton from './GoogleSignInButton';
import { GmailIcon, GoogleCalendarIcon } from './icons';

function AuthSetup({ onAuthComplete, initialGmailAuth = false, initialCalendarAuth = false, forceRecheck = false }) {
  const [isGmailAuthenticated, setIsGmailAuthenticated] = useState(initialGmailAuth);
  const [isCalendarAuthenticated, setIsCalendarAuthenticated] = useState(initialCalendarAuth);
  const [isGmailLoading, setIsGmailLoading] = useState(false);
  const [isCalendarLoading, setIsCalendarLoading] = useState(false);
  const [authMessages, setAuthMessages] = useState([]);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [oauthWindowOpen, setOauthWindowOpen] = useState(false);
  
  // Track if initial auth check has been done to avoid redundant checks
  const hasInitialCheckDone = useRef(false);
  const lastForceRecheck = useRef(forceRecheck);

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

    // Only check auth status on:
    // 1. Initial mount (first time)
    // 2. When forceRecheck changes (OAuth return)
    // NOT when auth props change (to avoid "Checking authentication status" flash)
    const shouldCheck = !hasInitialCheckDone.current || forceRecheck !== lastForceRecheck.current;
    
    if (shouldCheck) {
      hasInitialCheckDone.current = true;
      lastForceRecheck.current = forceRecheck;
      checkAuthenticationStatus();
    } else {
      // Skip the check, just mark as done
      setIsCheckingStatus(false);
    }
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
    // Note: gmailHashID is stored as HTTP-only cookie, so we can't read it with JS
    // Backend will use the cookie sent with credentials: 'include'
    try {
      secureLog('Checking Gmail status');
      const gmailHashID = getCookieValue('gmailHashID'); // May be null if HTTP-only
      
      const gmailResponse = await loggedFetch('https://api.airthreads.ai:4008/checkGmailStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Backend uses HTTP-only cookies for auth
        body: JSON.stringify({ gmailHashID: gmailHashID || undefined })
      });

      secureLog('Gmail status response received');

      if (gmailResponse.ok) {
        const gmailData = await gmailResponse.json();
        secureLog('Gmail status data received');

        // Check authentication indicator
        const isAuthenticated = gmailData.authenticated === true;

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
    // Note: userIDHash is stored as HTTP-only cookie, so we can't read it with JS
    // Backend will use the cookie sent with credentials: 'include'
    try {
      secureLog('Checking Calendar status');
      const userIDHash = getCookieValue('userIDHash'); // May be null if HTTP-only
      
      const calendarResponse = await loggedFetch('https://api.airthreads.ai:4010/checkCalendarStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Backend uses HTTP-only cookies for auth
        body: JSON.stringify({ userIDHash: userIDHash || undefined })
      });

      secureLog('Calendar status response received');

      if (calendarResponse.ok) {
        const calendarData = await calendarResponse.json();
        secureLog('Calendar status data received');

        // Check authentication indicator - Calendar uses 'status' field per API guide
        // Response format: { status: true, expired: false, expiryDate: "...", timeUntilExpiry: ... }
        const isAuthenticated = calendarData.status === true && calendarData.expired !== true;

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
      // Direct endpoint for Gmail auth (per Integration Guide)
      const gmailHashID = getCookieValue('gmailHashID');
      const authResponse = await loggedFetch('https://api.airthreads.ai:4008/initiate-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ gmailHashID: gmailHashID || undefined })
      });

      const authData = await authResponse.json();
      secureLog('Gmail auth response received', { status: authData.status });

      // Handle response per Integration Guide format:
      // - status: "already_authenticated" - user already has valid tokens
      // - status: "auth_required" with authUrl - user needs to authenticate
      
      if (authData.status === 'already_authenticated') {
        // User already authenticated - no action needed
        secureLog('Gmail already authenticated');
        setAuthMessages(prev => [...prev, `✅ ${authData.message || 'Gmail is already authenticated!'}`]);
        setIsGmailAuthenticated(true);
      } else if (authData.status === 'auth_required' && authData.authUrl) {
        // Open OAuth URL in new tab
        secureLog('Opening Gmail auth URL');
        setAuthMessages(prev => [...prev, '🔐 Opening Gmail authentication page...']);
        
        // Set flag to indicate OAuth window was opened
        setOauthWindowOpen(true);
        
        // Open in a new tab
        window.open(authData.authUrl, '_blank');
        
        setAuthMessages(prev => [...prev, '📋 Please complete the Gmail authentication in the new tab']);
      } else if (authData.authUrl || authData.auth_url) {
        // Fallback: authUrl provided without status field
        const authUrl = authData.authUrl || authData.auth_url;
        secureLog('Opening Gmail auth URL (fallback)');
        setAuthMessages(prev => [...prev, '🔐 Opening Gmail authentication page...']);
        setOauthWindowOpen(true);
        window.open(authUrl, '_blank');
        setAuthMessages(prev => [...prev, '📋 Please complete the Gmail authentication in the new tab']);
      } else if (authData.success === true) {
        // Legacy success response
        secureLog('Gmail authentication successful');
        setAuthMessages(prev => [...prev, `✅ ${authData.message || 'Gmail authentication completed successfully!'}`]);
        setIsGmailAuthenticated(true);
      } else if (authData.timeout) {
        secureLog('Gmail authentication timed out');
        setAuthMessages(prev => [...prev, `⏱️ ${authData.message || 'Gmail authentication timed out. Please try again.'}`]);
      } else if (authData.status === 'error' || authData.error) {
        // Error response
        let errorMessage = authData.message || authData.error || 'Gmail authentication failed';
        
        // Check for port conflict error
        if (errorMessage?.includes('EADDRINUSE') || errorMessage?.includes('address already in use')) {
          errorMessage = 'Gmail OAuth server port conflict detected. Please contact support or try again in a few minutes.';
        }
        
        setAuthMessages(prev => [...prev, `❌ ${errorMessage}`]);
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
      // Direct endpoint for Calendar auth (per Integration Guide)
      const userIDHash = getCookieValue('userIDHash');
      const authResponse = await loggedFetch('https://api.airthreads.ai:4010/initiate-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userIDHash: userIDHash || undefined })
      });

      const authData = await authResponse.json();
      secureLog('Calendar auth response received', { status: authData.status });

      // Handle response per Integration Guide format:
      // - status: "already_authenticated" - user already has valid tokens
      // - status: "auth_required" with authUrl - user needs to authenticate
      
      if (authData.status === 'already_authenticated') {
        // User already authenticated - no action needed
        secureLog('Calendar already authenticated');
        setAuthMessages(prev => [...prev, `✅ ${authData.message || 'Google Calendar is already authenticated!'}`]);
        setIsCalendarAuthenticated(true);
      } else if (authData.status === 'auth_required' && authData.authUrl) {
        // Open OAuth URL in new tab
        secureLog('Opening Calendar auth URL');
        setAuthMessages(prev => [...prev, '🔐 Opening Google Calendar authentication page...']);
        
        // Set flag to indicate OAuth window was opened
        setOauthWindowOpen(true);
        
        // Open in a new tab
        window.open(authData.authUrl, '_blank');
        
        setAuthMessages(prev => [...prev, '📋 Please complete the Google Calendar authentication in the new tab']);
      } else if (authData.authUrl) {
        // Fallback: authUrl provided without status field
        secureLog('Opening Calendar auth URL (fallback)');
        setAuthMessages(prev => [...prev, '🔐 Opening Google Calendar authentication page...']);
        setOauthWindowOpen(true);
        window.open(authData.authUrl, '_blank');
        setAuthMessages(prev => [...prev, '📋 Please complete the Google Calendar authentication in the new tab']);
      } else if (authData.status === 'error' || authData.error) {
        // Error response
        setAuthMessages(prev => [...prev, `❌ ${authData.message || authData.error || 'Calendar authentication failed'}`]);
      }
    } catch (error) {
      setAuthMessages(prev => [...prev, `❌ Google Calendar authentication failed: ${error.message}`]);
    } finally {
      setIsCalendarLoading(false);
    }
  };

  // Allow proceeding only if at least one service is authenticated AND check is complete
  const canProceed = !isCheckingStatus && (isGmailAuthenticated || isCalendarAuthenticated);

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
            <div className={styles.serviceIcon}><GmailIcon size={32} /></div>
            <div className={styles.serviceContent}>
              <h3>Gmail</h3>
              <p>Connect your Gmail account to manage emails and get email-related assistance</p>
              <div className={styles.serviceStatus}>
                <GoogleSignInButton
                  onClick={handleGmailAuth}
                  disabled={isGmailLoading}
                  loading={isGmailLoading}
                  connected={isGmailAuthenticated}
                  service="Gmail"
                />
              </div>
            </div>
          </div>

          <div className={`${styles.serviceCard} ${isCalendarAuthenticated ? styles.authenticated : ''}`}>
            <div className={styles.serviceIcon}><GoogleCalendarIcon size={32} /></div>
            <div className={styles.serviceContent}>
              <h3>Google Calendar</h3>
              <p>Connect your Google Calendar to manage events, meetings, and scheduling</p>
              <div className={styles.serviceStatus}>
                <GoogleSignInButton
                  onClick={handleCalendarAuth}
                  disabled={isCalendarLoading}
                  loading={isCalendarLoading}
                  connected={isCalendarAuthenticated}
                  service="Calendar"
                />
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
            {isCheckingStatus ? 'Checking authentication status...' : canProceed ? 'Continue to Mode Selection' : 'Please connect at least one service to continue'}
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