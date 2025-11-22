import { useState, useEffect, useRef } from 'react';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import AILoadingAnimation from '../components/AILoadingAnimation';
import AuthStatusIndicator from '../components/AuthStatusIndicator';
import AuthSetup from '../components/AuthSetup';
import ModeSelection from '../components/ModeSelection';
import VoiceMode from '../components/VoiceMode';
import { GlassNav } from '../components/GlassNav';
import MadeInCanada from '../components/MadeInCanada';
import Vapi from '@vapi-ai/web';
import VapiWidget from './VapiWidget.tsx';
import { sanitizeInput, validateUrlParam, secureLog, getEnvVar, loggedFetch } from '../utils/securityUtils';

// Glassmorphic inline styles using CSS variables
const glassStyles = {
  productPage: {
    minHeight: '100vh',
    background: 'var(--background)',
    color: 'var(--foreground)',
    display: 'flex',
    flexDirection: 'column'
  },
  modeSelection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(1.5rem, 4vw, 3rem)'
  },
  modeContainer: {
    maxWidth: '1000px',
    width: '100%',
    textAlign: 'center'
  },
  modeTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '300',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
    color: 'var(--foreground)'
  },
  modeSubtitle: {
    fontSize: '1.125rem',
    color: 'var(--muted-foreground)',
    marginBottom: '3rem',
    fontWeight: '300'
  },
  modesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  modeCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '2rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    textAlign: 'left',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
  },
  modeIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    display: 'block'
  },
  modeCardTitle: {
    fontSize: '1.5rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    color: 'var(--foreground)',
    letterSpacing: '-0.01em'
  },
  modeDescription: {
    color: 'var(--muted-foreground)',
    fontSize: '0.9375rem',
    lineHeight: '1.6',
    fontWeight: '300'
  },
  chatInterface: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh'
  },
  topBar: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topBarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: 'var(--muted-foreground)',
    fontSize: '1.25rem',
    cursor: 'pointer',
    padding: '0.5rem',
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center'
  },
  modeIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--foreground)',
    fontWeight: '500'
  },
  topBarRight: {
    display: 'flex',
    gap: '0.5rem'
  },
  authButton: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    color: 'var(--foreground)',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500'
  },
  authButtonAuthenticated: {
    borderColor: 'var(--primary)',
    color: 'var(--primary)',
    background: 'color-mix(in srgb, var(--primary) 10%, transparent)'
  },
  authButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden'
  },
  chatColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
    minWidth: 0
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '2rem'
  },
  emptyStateContent: {
    maxWidth: '500px'
  },
  emptyStateIcon: {
    fontSize: '4rem',
    marginBottom: '1.5rem',
    opacity: 0.3
  },
  emptyStateTitle: {
    fontSize: '1.5rem',
    fontWeight: '400',
    marginBottom: '0.5rem',
    color: 'var(--foreground)'
  },
  emptyStateText: {
    color: 'var(--muted-foreground)',
    fontSize: '0.9375rem',
    lineHeight: '1.6'
  },
  activityPanel: {
    width: '350px',
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  activityHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
  },
  activityTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--muted-foreground)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  activityFeed: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem'
  },
  activityItem: {
    padding: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    fontSize: '0.875rem',
    lineHeight: '1.5'
  },
  activityTime: {
    color: 'var(--muted-foreground)',
    fontSize: '0.75rem',
    display: 'block',
    marginTop: '0.5rem'
  },
  voiceMode: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  },
  voiceContainer: {
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%'
  },
  voiceTitle: {
    fontSize: '2rem',
    fontWeight: '300',
    marginBottom: '1.5rem',
    color: 'var(--foreground)'
  },
  voiceControls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem'
  },
  voiceButton: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '2px solid var(--primary)',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    color: 'var(--primary)',
    fontSize: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  voiceButtonActive: {
    background: 'var(--primary)',
    color: 'var(--background)'
  },
  voiceStatus: {
    fontSize: '1.125rem',
    color: 'var(--muted-foreground)',
    fontWeight: '300'
  },
  transitionOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'var(--background)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  transitionText: {
    fontSize: '1.5rem',
    fontWeight: '300',
    color: 'var(--muted-foreground)'
  },
  loading: {
    textAlign: 'center',
    padding: '1.5rem',
    color: 'var(--muted-foreground)',
    fontStyle: 'italic'
  },
  integrationStatusSummary: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    margin: '1rem 0',
    fontSize: '0.875rem'
  },
  connected: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '500',
    color: 'var(--primary)'
  },
  notConnected: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '500',
    color: 'var(--muted-foreground)'
  },
  header: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '2rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  headerContent: {
    flex: 1,
    minWidth: '250px'
  },
  switchModeButton: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    color: 'var(--foreground)',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9375rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500'
  },
  centeredContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1.5rem'
  },
  chatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px',
    margin: '0 auto',
    width: '100%',
    padding: '0 1rem 2rem'
  },
  messageList: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.01)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  authButtons: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  connectedButton: {
    borderColor: 'var(--primary)',
    color: 'var(--primary)',
    background: 'color-mix(in srgb, var(--primary) 10%, transparent)'
  },
  transitionSpinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255, 255, 255, 0.1)',
    borderTop: '4px solid var(--primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  },
  fadeIn: {
    animation: 'fadeIn 0.6s ease-out'
  }
};

function ProductPage() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Hash IDs managed by backend via HTTP-only cookies
  const [isGmailAuthenticated, setIsGmailAuthenticated] = useState(false);
  const [isCalendarAuthenticated, setIsCalendarAuthenticated] = useState(false);
  const [currentMode, setCurrentMode] = useState('auth'); // 'auth', 'selection', 'text', 'voice'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [vapiMessage, setVapiMessage] = useState('');
  const [oauthWindowOpen, setOauthWindowOpen] = useState(false);
  const [forceAuthRecheck, setForceAuthRecheck] = useState(0); // Counter to trigger rechecks
  const [vapiSessionToken, setVapiSessionToken] = useState(null); // Secure token for Vapi calls

  // Get API configuration from environment variables
  const VAPI_API_KEY = getEnvVar('REACT_APP_VAPI_API_KEY', 'cf04b093-6837-4059-8fc0-7996040ab866');
  const VAPI_ASSISTANT_ID = getEnvVar('REACT_APP_VAPI_ASSISTANT_ID', '607939c5-79e1-4de7-bbfa-4e3f0671edef');
  const API_BASE_URL = getEnvVar('REACT_APP_API_BASE_URL', 'https://api.airthreads.ai');


  // ok so basicalyl we are getting back a series of 
  // "conversation-update" events in the json 
  // each one contains a messages array 
  // we are concerned with the final conversation-update, and the last 'assistant' message in the messages array 
  // so question then becomes how do we determine the final conversation-update, and also, how do we store the data to determine this

  const vapiRef = useRef();

  // Fetch Vapi session token from backend
  const fetchVapiSessionToken = async () => {
    try {
      secureLog('Fetching Vapi session token');
      const response = await loggedFetch(`${API_BASE_URL}/api/vapi-session`, {
        method: 'POST',
        credentials: 'include', // Send HTTP-only cookies for authentication
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) // Empty body as per backend spec
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch Vapi session token: ${response.status}`);
      }

      const data = await response.json();
      secureLog('Vapi session token received', { hasToken: !!data.session_token });
      setVapiSessionToken(data.session_token);
      return data.session_token;
    } catch (error) {
      console.error('Error fetching Vapi session token:', error);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: '⚠️ Failed to initialize voice session. Please try again or contact support.'
      }]);
      return null;
    }
  };

  // Initialize Vapi when voice mode is selected
  const initializeVapi = (sessionToken, gmailAuthStatus, calendarAuthStatus) => {
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

      // Pass session token and authentication status to Vapi
      const assistantOverrides = {
        recordingEnabled: false
      };

      // Use passed token parameter or fall back to state
      const token = sessionToken || vapiSessionToken;
      if (token) {
        assistantOverrides.variableValues = {
          session_token: token,
          gmail_authenticated: gmailAuthStatus ?? isGmailAuthenticated,
          calendar_authenticated: calendarAuthStatus ?? isCalendarAuthenticated
        };
        secureLog('Starting Vapi with session token and auth status', {
          gmail: gmailAuthStatus ?? isGmailAuthenticated,
          calendar: calendarAuthStatus ?? isCalendarAuthenticated
        });
      } else {
        console.warn('No Vapi session token available - voice mode may not work correctly');
      }

      vapiRef.current.start(VAPI_ASSISTANT_ID, assistantOverrides);
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
            // Check Gmail status - backend-issued cookies sent automatically
            const gmailResponse = await loggedFetch(`${API_BASE_URL}/api/gmail-status`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',  // Send cookies with request
              body: JSON.stringify({})  // Empty body to satisfy preflight
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

            // Check Calendar status - backend-issued cookies sent automatically
            const calendarResponse = await loggedFetch(`${API_BASE_URL}/api/calendar-status`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',  // Send cookies with request
              body: JSON.stringify({})  // Empty body to satisfy preflight
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

      // Backend sets HTTP-only cookies during auth flow
      const authResponse = await loggedFetch(`${API_BASE_URL}/api/gmail-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Send cookies with request
        body: JSON.stringify({})  // Empty body to satisfy preflight
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

      // Backend sets HTTP-only cookies during auth flow
      const authResponse = await loggedFetch(`${API_BASE_URL}/api/calendar-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Send cookies with request
        body: JSON.stringify({})  // Empty body to satisfy preflight
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
          // Backend-issued cookies sent automatically
          const gmailStatusResponse = await loggedFetch(`${API_BASE_URL}/api/gmail-status`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',  // Send cookies with request
            body: JSON.stringify({})  // Empty body to satisfy preflight
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
          // Backend-issued cookies sent automatically
          const calendarStatusResponse = await loggedFetch(`${API_BASE_URL}/api/calendar-status`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',  // Send cookies with request
            body: JSON.stringify({})  // Empty body to satisfy preflight
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

      // Ensure we have a session token for the agent endpoint
      const token = vapiSessionToken || await fetchVapiSessionToken();
      
      // Verify we have a valid token before proceeding
      if (!token) {
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: '⚠️ Failed to initialize session. Please refresh the page and try again.'
        }]);
        setIsLoading(false);
        return;
      }

      // Send query to backend - hash IDs sent via cookies and session token
      const response = await loggedFetch(`${API_BASE_URL}/api/agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Send cookies with request
        body: JSON.stringify({
          query: message,
          session_token: token  // Include session token for user identification
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

      // Backend-issued cookies sent automatically
      const response = await loggedFetch(`${API_BASE_URL}/api/gmail-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Send cookies with request
        body: JSON.stringify({})  // Empty body to satisfy preflight
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gmail status check failed (${response.status}): ${errorText}`);
      }
      
      const data = await response.json();
      secureLog('Gmail status response received');
      
      const statusMessage = data.authenticated 
        ? '✅ Gmail is authenticated and ready to use!'
        : '❌ Gmail authentication is required.';
      
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `${statusMessage}\n\nStatus: ${data.message || 'No additional details'}`
      }]);
    } catch (error) {
      console.error('Gmail status check error:', error);
      
      // Check for CORS or network errors
      if (error.name === 'TypeError' || error.message?.includes('Failed to fetch')) {
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: '⚠️ Gmail service is currently unavailable. This may be due to network issues or the backend server not running. Please try again later.'
        }]);
      } else {
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: `Error checking Gmail status: ${error.message}`
        }]);
      }
    }
  };

  const handleCheckCalendarStatus = async () => {
    try {
      // Backend-issued cookies sent automatically
      const response = await loggedFetch(`${API_BASE_URL}/api/calendar-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Send cookies with request
        body: JSON.stringify({})  // Empty body to satisfy preflight
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Calendar status check failed (${response.status}): ${errorText}`);
      }
      
      const data = await response.json();
      
      const statusMessage = data.authenticated 
        ? '✅ Google Calendar is authenticated and ready to use!'
        : '❌ Google Calendar authentication is required.';
      
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `${statusMessage}\n\nStatus: ${data.message || 'No additional details'}`
      }]);
    } catch (error) {
      console.error('Calendar status check error:', error);
      
      // Check for CORS or network errors
      if (error.name === 'TypeError' || error.message?.includes('Failed to fetch')) {
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: '⚠️ Calendar service is currently unavailable. This may be due to the backend server on port 3005 not running or CORS configuration issues. Please ensure the calendar service backend is running.'
        }]);
      } else {
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: `Error checking Calendar status: ${error.message}`
        }]);
      }
    }
  };

  const handleModeSelect = async (mode) => {
    setIsTransitioning(true);
    setTimeout(async () => {
      // Initialize Vapi when voice mode is selected
      if (mode === 'voice') {
        // Ensure we have the token, or fetch it if not available
        const token = vapiSessionToken || await fetchVapiSessionToken();
        // Pass authentication status flags to Vapi
        initializeVapi(token, isGmailAuthenticated, isCalendarAuthenticated);
      } else {
        // Clean up Vapi when switching away from voice mode
        cleanupVapi();
      }
      setCurrentMode(mode);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSwitchMode = async (mode) => {
    setIsTransitioning(true);
    setTimeout(async () => {
      // Initialize Vapi when voice mode is selected
      if (mode === 'voice') {
        // Ensure we have the token, or fetch it if not available
        const token = vapiSessionToken || await fetchVapiSessionToken();
        // Pass authentication status flags to Vapi
        initializeVapi(token, isGmailAuthenticated, isCalendarAuthenticated);
      } else {
        // Clean up Vapi when switching away from voice mode
        cleanupVapi();
      }
      setCurrentMode(mode);
      setIsTransitioning(false);
    }, 300);
  };

  const handleAuthComplete = async (authStatus) => {
    setIsGmailAuthenticated(authStatus.isGmailAuthenticated);
    setIsCalendarAuthenticated(authStatus.isCalendarAuthenticated);
    
    // Fetch Vapi session token for voice mode
    // This token contains the user's hash IDs for multi-user isolation
    await fetchVapiSessionToken();
    
    setCurrentMode('selection');
  };

  // Show transition overlay
  if (isTransitioning) {
    return (
      <div style={glassStyles.transitionOverlay}>
        <div style={glassStyles.transitionSpinner}></div>
        <p>Switching modes...</p>
      </div>
    );
  }

  // Show authentication setup first
  if (currentMode === 'auth') {
    return (
      <>
        <div style={glassStyles.fadeIn}>
          <AuthSetup
            onAuthComplete={handleAuthComplete}
            initialGmailAuth={isGmailAuthenticated}
            initialCalendarAuth={isCalendarAuthenticated}
            forceRecheck={forceAuthRecheck}
          />
        </div>
        <MadeInCanada />
      </>
    );
  }

  // Show mode selection after authentication
  if (currentMode === 'selection') {
    return (
      <>
        <div style={glassStyles.fadeIn}>
          <ModeSelection onModeSelect={handleModeSelect} />
        </div>
        <MadeInCanada />
      </>
    );
  }

  // Show voice mode
  if (currentMode === 'voice') {
    return (
      <>
        <div style={glassStyles.fadeIn}>
          <VoiceMode 
            onSwitchMode={handleSwitchMode}
            vapiRef={vapiRef}
            messages={messages}
            setMessages={setMessages}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            vapiSessionToken={vapiSessionToken}
          />
        </div>
        <MadeInCanada />
      </>
    );
  }

  // Show text mode (original chat interface)
  return (
    <>
      <div style={{...glassStyles.productPage, ...glassStyles.fadeIn}}>
        <div style={glassStyles.header}>
          <div style={glassStyles.headerContent}>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '300' }}>AirThreads Assistant</h1>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--muted-foreground)' }}>
              Try our AI-powered task manager. Connect your tools and let AI handle the rest.
            </p>
          </div>
          <button
            style={{
              ...glassStyles.switchModeButton,
              ...(hoveredButton === 'switch' && {
                borderColor: 'var(--primary)',
                background: 'rgba(255, 255, 255, 0.05)',
                transform: 'translateY(-1px)'
              })
            }}
            onMouseEnter={() => setHoveredButton('switch')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => setCurrentMode('selection')}
          >
            Switch Mode
          </button>
        </div>
        
        {/* Authentication Status Indicator */}
        <div style={glassStyles.centeredContainer}>
          <AuthStatusIndicator 
            isGmailAuthenticated={isGmailAuthenticated}
            isCalendarAuthenticated={isCalendarAuthenticated}
          />
        </div>
        
        <div style={glassStyles.chatContainer}>
          <div style={glassStyles.messageList}>
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
          <div style={glassStyles.authButtons}>
            <button 
              onClick={handleManualGmailAuth} 
              disabled={isLoading || isGmailAuthenticated}
              style={{
                ...glassStyles.authButton,
                ...(isGmailAuthenticated && glassStyles.connectedButton),
                ...((isLoading || isGmailAuthenticated) && glassStyles.authButtonDisabled),
                ...(hoveredButton === 'gmail' && !isGmailAuthenticated && !isLoading && {
                  borderColor: 'var(--primary)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  transform: 'translateY(-1px)'
                })
              }}
              onMouseEnter={() => setHoveredButton('gmail')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {isGmailAuthenticated ? '✅ Gmail Connected' : '🔐 Authenticate Gmail'}
            </button>
            <button 
              onClick={handleManualCalendarAuth} 
              disabled={isLoading || isCalendarAuthenticated}
              style={{
                ...glassStyles.authButton,
                ...(isCalendarAuthenticated && glassStyles.connectedButton),
                ...((isLoading || isCalendarAuthenticated) && glassStyles.authButtonDisabled),
                ...(hoveredButton === 'calendar' && !isCalendarAuthenticated && !isLoading && {
                  borderColor: 'var(--primary)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  transform: 'translateY(-1px)'
                })
              }}
              onMouseEnter={() => setHoveredButton('calendar')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {isCalendarAuthenticated ? '✅ Calendar Connected' : '📅 Authenticate Calendar'}
            </button>
            <button 
              onClick={handleCheckGmailStatus} 
              disabled={isLoading}
              style={{
                ...glassStyles.authButton,
                ...(isLoading && glassStyles.authButtonDisabled),
                ...(hoveredButton === 'checkGmail' && !isLoading && {
                  borderColor: 'var(--primary)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  transform: 'translateY(-1px)'
                })
              }}
              onMouseEnter={() => setHoveredButton('checkGmail')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              ✅ Check Gmail Status
            </button>
            <button 
              onClick={handleCheckCalendarStatus} 
              disabled={isLoading}
              style={{
                ...glassStyles.authButton,
                ...(isLoading && glassStyles.authButtonDisabled),
                ...(hoveredButton === 'checkCalendar' && !isLoading && {
                  borderColor: 'var(--primary)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  transform: 'translateY(-1px)'
                })
              }}
              onMouseEnter={() => setHoveredButton('checkCalendar')}
              onMouseLeave={() => setHoveredButton(null)}
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
      <GlassNav />
      
      {/* Animations that can't be done inline */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @media (max-width: 768px) {
          .glass-header {
            padding: 1rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
      <MadeInCanada />
    </>
  );
}

export default ProductPage; 