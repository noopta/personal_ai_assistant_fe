import { useState, useEffect, useRef } from 'react';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import AILoadingAnimation from '../components/AILoadingAnimation';
import AuthStatusIndicator from '../components/AuthStatusIndicator';
import AuthSetup from '../components/AuthSetup';
import ModeSelection from '../components/ModeSelection';
import VoiceMode from '../components/VoiceMode';
import styles from './ProductPage.module.css';
import ReactMarkdown from 'react-markdown';
import Vapi from '@vapi-ai/web';
import VapiWidget from './VapiWidget.tsx';
import { generateSecureRandomId, sanitizeInput, validateUrlParam, secureLog, getEnvVar } from '../utils/securityUtils';

function ProductPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Hash IDs are required in request body per backend API spec
  const [userIDHash] = useState(() => generateSecureRandomId());
  const [gmailHashID] = useState(() => generateSecureRandomId());
  const [calendarHashID] = useState(() => generateSecureRandomId());
  const [isGmailAuthenticated, setIsGmailAuthenticated] = useState(false);
  const [isCalendarAuthenticated, setIsCalendarAuthenticated] = useState(false);
  const [currentMode, setCurrentMode] = useState('auth'); // 'auth', 'selection', 'text', 'voice'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [vapiMessage, setVapiMessage] = useState('');
  const [oauthWindowOpen, setOauthWindowOpen] = useState(false);
  const [forceAuthRecheck, setForceAuthRecheck] = useState(0); // Counter to trigger rechecks

  // Get API configuration from environment variables
  // TODO: SECURITY - Move these to .env.local and rotate these keys!
  const VAPI_API_KEY = getEnvVar('REACT_APP_VAPI_API_KEY', 'cf04b093-6837-4059-8fc0-7996040ab866');
  const VAPI_ASSISTANT_ID = getEnvVar('REACT_APP_VAPI_ASSISTANT_ID', '607939c5-79e1-4de7-bbfa-4e3f0671edef');
  const GMAIL_API_URL = getEnvVar('REACT_APP_GMAIL_API_URL', 'https://api.airthreads.ai:4007');
  const CALENDAR_API_URL = getEnvVar('REACT_APP_CALENDAR_API_URL', 'https://api.airthreads.ai:4009');
  const AGENT_API_URL = getEnvVar('REACT_APP_AGENT_API_URL', 'https://api.airthreads.ai:5000');


  // ok so basicalyl we are getting back a series of 
  // "conversation-update" events in the json 
  // each one contains a messages array 
  // we are concerned with the final conversation-update, and the last 'assistant' message in the messages array 
  // so question then becomes how do we determine the final conversation-update, and also, how do we store the data to determine this

  const vapiRef = useRef();

  // Initialize Vapi when voice mode is selected
  const initializeVapi = () => {
    if (!vapiRef.current) {
      if (!VAPI_API_KEY) {
        console.error('VAPI_API_KEY not configured - please add to .env.local');
        return;
      }
      vapiRef.current = new Vapi(VAPI_API_KEY);
      
      vapiRef.current.on('message', (message) => {
        if (message.role === 'assistant' && message.type === 'add-message') {
          // This is the finalized assistant response
          console.log('Finalized assistant response:', message.content);
        }
        console.log('Message event:', message);
      });

      vapiRef.current.on('transcript', (event) => {
        // event.transcript contains the recognized speech text
        console.log('Transcript:', event.transcript);
      });

      vapiRef.current.on('conversation-update', (event) => {
        // event.messages contains the conversation history
        const lastConversation = event.conversation[event.conversation.length - 1];
        if (lastConversation.role === 'assistant') {
          console.log('Final assistant message from conversation-update:', lastConversation.content);
          setVapiMessage(lastConversation.content);
          setMessages(prev => [...prev, {
            type: 'assistant',
            content: lastConversation.content
          }]);
          setIsLoading(false);
        }
        console.log('Conversation messages:', event.messages);
      });

      secureLog('VAPI initialization');

      // Start the call when voice mode is initialized
      if (!VAPI_ASSISTANT_ID) {
        console.error('VAPI_ASSISTANT_ID not configured');
        return;
      }

      // Cookies are sent automatically with requests - no need to pass hashes
      vapiRef.current.start(VAPI_ASSISTANT_ID, {
        recordingEnabled: false
      });
    }
  };

  // Clean up Vapi call
  const cleanupVapi = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
      vapiRef.current = null;
    }
  };

  useEffect(() => {
    // Cookies are now handled automatically by the backend - no localStorage needed
    secureLog('ProductPage loaded');

    // Check if user just returned from OAuth authentication
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = validateUrlParam(urlParams.get('auth_success'));
    const authService = validateUrlParam(urlParams.get('service'));
    const returnToAuth = validateUrlParam(urlParams.get('return_to_auth'));

    if (authSuccess === 'true') {
      secureLog('User returned from OAuth authentication', { service: authService });

      // Update authentication status based on service
      if (authService === 'calendar' || authService === 'googlecalendar') {
        setIsCalendarAuthenticated(true);
        if (!returnToAuth) {
          setMessages(prev => [...prev, {
            type: 'assistant',
            content: '✅ Google Calendar authentication completed successfully! You can now ask me to manage your calendar events.'
          }]);
        }
      } else if (authService === 'gmail') {
        setIsGmailAuthenticated(true);
        if (!returnToAuth) {
          setMessages(prev => [...prev, {
            type: 'assistant',
            content: '✅ Gmail authentication completed successfully! You can now ask me to help with your emails.'
          }]);
        }
      }

      // If returning to auth setup, set mode to auth and trigger recheck
      if (returnToAuth === 'true') {
        setCurrentMode('auth');
        // Trigger auth status recheck by incrementing counter
        setForceAuthRecheck(prev => prev + 1);
      }

      // Clear the URL parameters to clean up the browser history
      window.history.replaceState({}, document.title, window.location.pathname);

      // Ensure loading state is reset
      setIsLoading(false);
    } else {
      // Do NOT check authentication status on page load
      // Just assume user is not authenticated
      setIsGmailAuthenticated(false);
      setIsCalendarAuthenticated(false);
    }

    // Cleanup Vapi on component unmount
    return () => {
      cleanupVapi();
    };
  }, []);

  // Add window focus listener to detect when user returns from OAuth
  useEffect(() => {
    const handleWindowFocus = () => {
      if (oauthWindowOpen) {
        console.log('Window focused after OAuth, checking authentication status...');
        setOauthWindowOpen(false);

        // Check both Gmail and Calendar status after OAuth
        setTimeout(async () => {
          try {
            // Check Gmail status - cookies sent automatically
            const gmailResponse = await fetch(`${GMAIL_API_URL}/checkGmailStatus`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',  // Send cookies with request
              body: JSON.stringify({
                userIDHash,
                gmailHashID
              })
            });

            if (gmailResponse.ok) {
              const gmailData = await gmailResponse.json();
              const isGmailAuth = gmailData.needs_auth === false ||
                                 gmailData.authenticated === true ||
                                 gmailData.status === true;
              setIsGmailAuthenticated(isGmailAuth);

              if (isGmailAuth) {
                setMessages(prev => [...prev, {
                  type: 'assistant',
                  content: '✅ Gmail authentication completed successfully!'
                }]);
              }
            }

            // Check Calendar status - cookies sent automatically
            const calendarResponse = await fetch(`${CALENDAR_API_URL}/checkCalendarStatus`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',  // Send cookies with request
              body: JSON.stringify({
                userIDHash,
                calendarHashID
              })
            });

            if (calendarResponse.ok) {
              const calendarData = await calendarResponse.json();
              const isCalendarAuth = calendarData.needs_auth === false ||
                                    calendarData.authenticated === true ||
                                    calendarData.status === true;
              setIsCalendarAuthenticated(isCalendarAuth);

              if (isCalendarAuth) {
                setMessages(prev => [...prev, {
                  type: 'assistant',
                  content: '✅ Google Calendar authentication completed successfully!'
                }]);
              }
            }
          } catch (error) {
            console.error('Error checking authentication status after OAuth:', error);

            // Check if this is a CORS error and inform the user
            if (error.message?.includes('CORS') || error.name === 'TypeError') {
              setMessages(prev => [...prev, {
                type: 'assistant',
                content: '⚠️ Calendar service temporarily unavailable due to CORS configuration. Gmail authentication may still work.'
              }]);
            }
          }
        }, 1000);
      }
    };

    window.addEventListener('focus', handleWindowFocus);
    return () => window.removeEventListener('focus', handleWindowFocus);
  }, [oauthWindowOpen]);

  // Helper function to check if query needs Gmail auth
  const needsGmailAuth = (message) => {
    return message.toLowerCase().includes('gmail') || 
           message.toLowerCase().includes('email') || 
           message.toLowerCase().includes('mail');
  };

  // Helper function to check if query needs Calendar auth
  const needsCalendarAuth = (message) => {
    const calendarKeywords = ['calendar', 'event', 'meeting', 'appointment', 'schedule'];
    return calendarKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  // Handle Gmail authentication
  const handleGmailAuth = async () => {
    // Don't re-authenticate if already authenticated
    if (isGmailAuthenticated) {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: '✅ Gmail is already connected and ready to use!'
      }]);
      return true;
    }

    setMessages(prev => [...prev, {
      type: 'assistant',
      content: 'Gmail authentication is required for this request. Starting authentication process...'
    }]);

    try {
      secureLog('Starting Gmail authentication');

      // Backend requires hash IDs in request body
      const authResponse = await fetch(`${GMAIL_API_URL}/initiateGmailAuth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Send cookies with request
        body: JSON.stringify({
          userIDHash,
          gmailHashID
        })
      });

      const authData = await authResponse.json();

      secureLog('Gmail auth response received', { success: authData.success, hasAuthUrl: !!(authData.authUrl || authData.auth_url) });

      // Check if we received an auth URL to open
      if (authData.authUrl || authData.auth_url) {
        const authUrl = authData.authUrl || authData.auth_url;
        secureLog('Opening Gmail auth URL');

        setMessages(prev => [...prev, {
          type: 'assistant',
          content: '🔐 Opening Gmail authentication page in new tab...'
        }]);

        // Open in a new tab instead of replacing current page
        window.open(authUrl, '_blank');
      }

      if (authData.success === true) {
        secureLog('Gmail authentication successful');
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: `✅ ${authData.message || 'Gmail authentication completed successfully!'}`
        }]);
        setIsGmailAuthenticated(true);
        return true;
      } else if (authData.timeout) {
        secureLog('Gmail authentication timed out');
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: `⏱️ ${authData.message || 'Gmail authentication timed out. Please try again.'}`
        }]);
        return false;
      } else if (!authData.success && (authData.error || authData.message)) {
        secureLog('Gmail authentication failed');
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: `❌ ${authData.message || authData.error || 'Gmail authentication failed'}`
        }]);
        return false;
      }

      return false;
    } catch (authError) {
      console.error('Error during Gmail authentication:', authError);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `❌ Gmail authentication failed: ${authError.message}`
      }]);
      return false;
    }
  };

  // Handle Calendar authentication
  const handleCalendarAuth = async () => {
    // Don't re-authenticate if already authenticated
    if (isCalendarAuthenticated) {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: '✅ Google Calendar is already connected and ready to use!'
      }]);
      return true;
    }

    setMessages(prev => [...prev, {
      type: 'assistant',
      content: 'Google Calendar authentication is required for this request. Starting authentication process...'
    }]);

    try {
      secureLog('Starting Calendar authentication');

      // Backend requires hash IDs in request body
      const authResponse = await fetch(`${CALENDAR_API_URL}/initiateCalendarAuth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Send cookies with request
        body: JSON.stringify({
          userIDHash,
          calendarHashID
        })
      });

      const authData = await authResponse.json();
      secureLog('Calendar auth response received', { success: authData.success });

      // Check if we received an auth URL to open
      if (authData.auth_url || authData.authUrl || authData.generatedAuthUrl) {
        const authUrl = authData.auth_url || authData.authUrl || authData.generatedAuthUrl;
        console.log('Opening Calendar auth URL:', authUrl);

        setMessages(prev => [...prev, {
          type: 'assistant',
          content: '🔐 Opening Google Calendar authentication page in new tab...'
        }]);

        // Open in a new tab instead of replacing current page
        console.log('Attempting to open Calendar auth URL in new tab...');
        window.open(authUrl, '_blank');
      }

      if (authData.success === true) {
        // Authentication completed successfully
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: `✅ ${authData.message || 'Google Calendar authentication completed successfully!'}`
        }]);
        setIsCalendarAuthenticated(true);
        return true;
      } else if (authData.timeout) {
        // Authentication timed out
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: `⏱️ ${authData.message || 'Calendar authentication timed out. Please try again.'}`
        }]);
        return false;
      } else if (!authData.success && authData.message) {
        // Authentication failed with message
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: `❌ ${authData.message}`
        }]);
        return false;
      }

      return false;
    } catch (authError) {
      console.error('Error during Calendar authentication:', authError);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `❌ Google Calendar authentication failed: ${authError.message}`
      }]);
      return false;
    }
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Sanitize user input before processing
    const sanitizedMessage = sanitizeInput(message.trim());

    // Add user message (use original message for display, sanitized for backend)
    setMessages(prev => [...prev, {
      type: 'user',
      content: message.trim()
    }]);



    setIsLoading(true);

    try {
      // Check authentication needs using sanitized message
      const needsGmail = needsGmailAuth(sanitizedMessage);
      const needsCalendar = needsCalendarAuth(sanitizedMessage);

      // vapi.start('607939c5-79e1-4de7-bbfa-4e3f0671edef');
      // vapiRef.current.send({
      //   type: 'add-message',
      //   message: {
      //     role: 'user',
      //     content: message,
      //   },
      // });

      // Handle Gmail authentication if needed (only if not already authenticated)
      if (needsGmail && !isGmailAuthenticated) {
        try {
          // Backend requires hash IDs per API spec
          const gmailStatusResponse = await fetch(`${GMAIL_API_URL}/checkGmailStatus`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',  // Send cookies with request
            body: JSON.stringify({
              userIDHash,
              gmailHashID
            })
          });
          const gmailStatusData = await gmailStatusResponse.json();
          
          // Check multiple possible authentication indicators
          const needsAuth = gmailStatusData.needs_auth ||
                           (!gmailStatusData.authenticated && gmailStatusData.status !== true);

          if (needsAuth) {
            const gmailAuthSuccess = await handleGmailAuth();
            if (!gmailAuthSuccess) {
              setIsLoading(false);
              return; // Don't proceed if Gmail auth failed
            }
          } else {
            // Already authenticated on server, update our local state
            secureLog('Gmail already authenticated, updating UI state');
            setIsGmailAuthenticated(true);
          }
        } catch (authError) {
          console.error('Error checking Gmail auth:', authError);
          setMessages(prev => [...prev, {
            type: 'assistant',
            content: `⚠️ Warning: Could not check Gmail authentication status. Proceeding anyway... (${authError.message})`
          }]);
        }
      }

      // Handle Calendar authentication if needed (only if not already authenticated)
      if (needsCalendar && !isCalendarAuthenticated) {
        secureLog('Calendar authentication needed');
        try {
          // Backend requires hash IDs per API spec
          const calendarStatusResponse = await fetch(`${CALENDAR_API_URL}/checkCalendarStatus`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',  // Send cookies with request
            body: JSON.stringify({
              userIDHash,
              calendarHashID
            })
          });
          const calendarStatusData = await calendarStatusResponse.json();
          secureLog('Calendar status data received');

          // Check multiple possible authentication indicators
          const needsAuth = calendarStatusData.needs_auth ||
                           (!calendarStatusData.authenticated && calendarStatusData.status !== true);

          if (needsAuth) {
            secureLog('Calendar needs auth');
            const calendarAuthSuccess = await handleCalendarAuth();
            if (!calendarAuthSuccess) {
              setIsLoading(false);
              return; // Don't proceed if Calendar auth failed
            }
          } else {
            // Already authenticated on server, update our local state
            secureLog('Calendar already authenticated, updating UI state');
            setIsCalendarAuthenticated(true);
          }
        } catch (authError) {
          console.error('Error checking Calendar auth:', authError);

          let errorMessage = `⚠️ Warning: Could not check Google Calendar authentication status.`;

          // Check if this is a CORS error
          if (authError.message?.includes('CORS') || authError.name === 'TypeError') {
            errorMessage += ` This appears to be a CORS configuration issue on the Calendar service (port 3005).`;

            // Check for specific multiple origin error
            if (authError.message?.includes('multiple values') || authError.message?.includes('only one is allowed')) {
              errorMessage += ` The server is sending duplicate CORS origin headers - this needs to be fixed server-side.`;
            } else {
              errorMessage += ` Please contact the server administrator to configure CORS headers properly.`;
            }
          } else {
            errorMessage += ` Proceeding anyway... (${authError.message})`;
          }

          setMessages(prev => [...prev, {
            type: 'assistant',
            content: errorMessage
          }]);
        }
      }

      // Now proceed with the original query - cookies sent automatically
      secureLog('Sending request to agent endpoint');

      // Send query to backend - backend requires hash IDs per API spec
      const response = await fetch(`${AGENT_API_URL}/agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Send cookies with request
        body: JSON.stringify({
          userIDHash,
          gmailHashID,
          calendarHashID,
          query: message
        })
      });

      // console.log('Response received:', response.status, response.statusText);

      if (!response.ok) {
        // Check if it's an authentication error
        console.log('response.status', response.status);
        console.log("response wasn't ok triggering auth")
        if (response.status === 401) {
          const errorData = await response.json();
          
          // Handle specific service authentication requirements
          if (errorData.service === 'gmail') {
            const gmailAuthSuccess = await handleGmailAuth();
            if (gmailAuthSuccess) {
              // Retry the original request after successful auth
              setIsLoading(false);
              return handleSendMessage(message);
            }
            setIsLoading(false);
            return;
          } else if (errorData.service === 'calendar') {
            const calendarAuthSuccess = await handleCalendarAuth();
            if (calendarAuthSuccess) {
              // Retry the original request after successful auth
              setIsLoading(false);
              return handleSendMessage(message);
            }
            setIsLoading(false);
            return;
          } else {
            throw new Error(`Authentication required: ${errorData.message || 'Please authenticate first'}`);
          }
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      secureLog('Response data received');

      if (data.error) {
        throw new Error(data.error);
      }

      // Extract the text directly from results field
      const aiMessage = data.result || 'No response received';

      // Add AI response
      setMessages(prev => [...prev, {
        type: 'assistant',
        // content: "This is a placeholder response from the AI assistant. The backend server is currently unreachable."
        content: aiMessage
      }]);

    } catch (error) {
      console.error('Error fetching response:', error);
      
      let errorMessage = `Error: ${error.message || 'Failed to process your request'}`;
      
      // Provide helpful suggestions based on error type
      if (error.message.includes('Authentication required') || error.message.includes('authenticate')) {
        errorMessage += '\n\n💡 Try sending a message that includes "gmail", "email", "calendar", or "event" to trigger automatic authentication.';
      }
      
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Manual authentication functions for UI buttons (optional)
  const handleManualGmailAuth = async () => {
    setIsLoading(true);
    try {
      await handleGmailAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualCalendarAuth = async () => {
    setIsLoading(true);
    try {
      await handleCalendarAuth();
    } finally {
      setIsLoading(false);
    }
  };

  // Check status functions (optional)
  const handleCheckGmailStatus = async () => {
    try {
      secureLog('Checking Gmail status');

      // Backend requires hash IDs per API spec
      const response = await fetch(`${GMAIL_API_URL}/checkGmailStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Send cookies with request
        body: JSON.stringify({
          userIDHash,
          gmailHashID
        })
      });
      const data = await response.json();
      secureLog('Gmail status response received');
      
      const statusMessage = data.authenticated 
        ? '✅ Gmail is authenticated and ready to use!'
        : '❌ Gmail authentication is required.';
      
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `${statusMessage}\n\nStatus: ${data.message}`
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `Error checking Gmail status: ${error.message}`
      }]);
    }
  };

  const handleCheckCalendarStatus = async () => {
    try {
      // Backend requires hash IDs per API spec
      const response = await fetch(`${CALENDAR_API_URL}/checkCalendarStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Send cookies with request
        body: JSON.stringify({
          userIDHash,
          calendarHashID
        })
      });
      const data = await response.json();
      
      const statusMessage = data.authenticated 
        ? '✅ Google Calendar is authenticated and ready to use!'
        : '❌ Google Calendar authentication is required.';
      
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `${statusMessage}\n\nStatus: ${data.message}`
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `Error checking Calendar status: ${error.message}`
      }]);
    }
  };

  const handleModeSelect = (mode) => {
    setIsTransitioning(true);
    setTimeout(() => {
      // Initialize Vapi when voice mode is selected
      if (mode === 'voice') {
        initializeVapi();
      } else {
        // Clean up Vapi when switching away from voice mode
        cleanupVapi();
      }
      setCurrentMode(mode);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSwitchMode = (mode) => {
    setIsTransitioning(true);
    setTimeout(() => {
      // Initialize Vapi when voice mode is selected
      if (mode === 'voice') {
        initializeVapi();
      } else {
        // Clean up Vapi when switching away from voice mode
        cleanupVapi();
      }
      setCurrentMode(mode);
      setIsTransitioning(false);
    }, 300);
  };

  const handleAuthComplete = (authStatus) => {
    setIsGmailAuthenticated(authStatus.isGmailAuthenticated);
    setIsCalendarAuthenticated(authStatus.isCalendarAuthenticated);
    setCurrentMode('selection');
  };

  // Show transition overlay
  if (isTransitioning) {
    return (
      <div className={styles.transitionOverlay}>
        <div className={styles.transitionSpinner}></div>
        <p>Switching modes...</p>
      </div>
    );
  }

  // Show authentication setup first
  if (currentMode === 'auth') {
    return (
      <div className={styles.fadeIn}>
        <AuthSetup
          onAuthComplete={handleAuthComplete}
          initialGmailAuth={isGmailAuthenticated}
          initialCalendarAuth={isCalendarAuthenticated}
          forceRecheck={forceAuthRecheck}
        />
      </div>
    );
  }

  // Show mode selection after authentication
  if (currentMode === 'selection') {
    return (
      <div className={styles.fadeIn}>
        <ModeSelection onModeSelect={handleModeSelect} />
      </div>
    );
  }

  // Show voice mode
  if (currentMode === 'voice') {
    return (
      <div className={styles.fadeIn}>
        <VoiceMode 
          onSwitchMode={handleSwitchMode}
          vapiRef={vapiRef}
          messages={messages}
          setMessages={setMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    );
  }

  // Show text mode (original chat interface)
  return (
    <div className={`${styles.productPage} ${styles.fadeIn}`}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>AirThreads Assistant</h1>
          <p>Try our AI-powered task manager. Connect your tools and let AI handle the rest.</p>
        </div>
        <button
          className={styles.switchModeButton}
          onClick={() => setCurrentMode('selection')}
        >
          Switch Mode
        </button>
      </div>
      
      {/* Authentication Status Indicator */}
      <div className={styles.centeredContainer}>
        <AuthStatusIndicator 
          isGmailAuthenticated={isGmailAuthenticated}
          isCalendarAuthenticated={isCalendarAuthenticated}
        />
      </div>
      
      <div className={styles.chatContainer}>
        <div className={styles.messageList}>
          {messages.map((message, index) => (
            <ChatMessage 
              key={index}
              type={message.type}
              content={message.content}
            />
          ))}
          {isLoading && <AILoadingAnimation />}
        </div>
        
        {/* Optional: Add manual authentication buttons */}
        <div className={styles.authButtons}>
          <button 
            onClick={handleManualGmailAuth} 
            disabled={isLoading || isGmailAuthenticated}
            className={`${styles.authButton} ${isGmailAuthenticated ? styles.connectedButton : ''}`}
          >
            {isGmailAuthenticated ? '✅ Gmail Connected' : '🔐 Authenticate Gmail'}
          </button>
          <button 
            onClick={handleManualCalendarAuth} 
            disabled={isLoading || isCalendarAuthenticated}
            className={`${styles.authButton} ${isCalendarAuthenticated ? styles.connectedButton : ''}`}
          >
            {isCalendarAuthenticated ? '✅ Calendar Connected' : '📅 Authenticate Calendar'}
          </button>
          <button 
            onClick={handleCheckGmailStatus} 
            disabled={isLoading}
            className={styles.authButton}
          >
            ✅ Check Gmail Status
          </button>
          <button 
            onClick={handleCheckCalendarStatus} 
            disabled={isLoading}
            className={styles.authButton}
          >
            📊 Check Calendar Status
          </button>
        </div>
        
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isLoading}
        />

      </div>
      {VAPI_ASSISTANT_ID && VAPI_API_KEY && (
        <VapiWidget assistantId={VAPI_ASSISTANT_ID} apiKey={VAPI_API_KEY} />
      )}
    </div>
  );
}

export default ProductPage; 