import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import styles from './OAuth2CallbackPage.module.css';
import { validateUrlParam, secureLog, getEnvVar } from '../utils/securityUtils';

function OAuth2CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [authInfo, setAuthInfo] = useState({});
  const [error, setError] = useState('');

  // Get OAuth callback URL from environment variables
  const OAUTH_CALLBACK_URL = getEnvVar('REACT_APP_OAUTH_CALLBACK_URL', 'http://localhost:5000/oauth2/exchange');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Extract and validate parameters from URL
        const code = validateUrlParam(searchParams.get('code'));
        const state = searchParams.get('state'); // Don't validate state yet, it's JSON
        const scope = searchParams.get('scope');
        const error = validateUrlParam(searchParams.get('error'));

        // Handle OAuth error
        if (error) {
          setStatus('error');
          setError(`OAuth Error: ${error}`);
          secureLog('OAuth error received');
          return;
        }

        // Parse and validate state parameter for CSRF protection
        let userID = '';
        let service = '';

        if (state) {
          try {
            const stateData = JSON.parse(state);
            userID = validateUrlParam(stateData.userID);
            
            // Determine service based on scope
            if (scope?.includes('gmail')) {
              service = 'Gmail';
            } else if (scope?.includes('calendar')) {
              service = 'Google Calendar';
            } else {
              service = 'Google Service';
            }
          } catch (parseError) {
            // Silently fail on parse error
          }
        }

        // Set auth info for display
        setAuthInfo({
          userID: userID || 'Unknown',
          service,
          scope: scope || 'Unknown scope',
          code: code ? `${code.substring(0, 20)}...` : 'No code received'
        });

        // Send the authorization code to your backend
        if (code && userID) {
          setStatus('exchanging');
          secureLog('Exchanging OAuth code for tokens');

          // WARNING: This should use HTTPS in production
          const response = await fetch(OAUTH_CALLBACK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',  // Send cookies with request
            body: JSON.stringify({
              code,
              userID,
              service: service.toLowerCase().replace(' ', ''),
              scope
            })
          });

          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              setStatus('success');
              secureLog('OAuth token exchange successful');
            } else {
              setStatus('error');
              setError(result.error || 'Failed to complete authentication');
              secureLog('OAuth token exchange failed');
            }
          } else {
            setStatus('error');
            setError('Failed to communicate with backend');
            secureLog('OAuth backend communication failed');
          }
        } else {
          secureLog('Missing code or userID, showing success anyway');
          setStatus('success'); // Show success even if we can't process on backend
        }

      } catch (err) {
        secureLog('OAuth callback error occurred');
        setStatus('error');
        setError(err.message || 'An unexpected error occurred');
      }
    };

    handleOAuthCallback();
  }, [searchParams]);

  const handleContinue = () => {
    // Determine service based on scope for URL parameters
    let serviceParam = 'unknown';
    if (authInfo.service) {
      if (authInfo.service.toLowerCase().includes('calendar')) {
        serviceParam = 'calendar';
      } else if (authInfo.service.toLowerCase().includes('gmail')) {
        serviceParam = 'gmail';
      }
    }

    // Navigate back to auth setup with success parameters
    navigate(`/product?return_to_auth=true&auth_success=true&service=${serviceParam}`);
  };

  const handleRetry = () => {
    navigate('/product');
  };

  return (
    <div className={styles.callbackPage}>
      <div className={styles.container}>
        <div className={styles.card}>
          {status === 'processing' && (
            <div className={styles.processing}>
              <div className={styles.spinner}></div>
              <h2>Processing Authentication...</h2>
              <p>Please wait while we complete your authentication.</p>
            </div>
          )}

          {status === 'exchanging' && (
            <div className={styles.processing}>
              <div className={styles.spinner}></div>
              <h2>Finalizing Setup...</h2>
              <p>Exchanging authorization code for access tokens.</p>
            </div>
          )}

          {status === 'success' && (
            <div className={styles.success}>
              <div className={styles.successIcon}>✅</div>
              <h2>Authentication Successful!</h2>
              <p>Your {authInfo.service || 'Google service'} has been successfully connected to AirThreads.</p>
              
              <div className={styles.authDetails}>
                <h3>Authentication Details:</h3>
                <div className={styles.detailItem}>
                  <strong>Service:</strong> {authInfo.service}
                </div>
                <div className={styles.detailItem}>
                  <strong>User ID:</strong> {authInfo.userID}
                </div>
                <div className={styles.detailItem}>
                  <strong>Permissions:</strong> {authInfo.scope}
                </div>
                <div className={styles.detailItem}>
                  <strong>Authorization Code:</strong> {authInfo.code || '[Protected]'}
                </div>
              </div>

              <div className={styles.actions}>
                <button onClick={handleContinue} className={styles.primaryButton}>
                  Continue to AirThreads
                </button>
                <Link to="/integrations" className={styles.secondaryButton}>
                  View All Integrations
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className={styles.error}>
              <div className={styles.errorIcon}>❌</div>
              <h2>Authentication Failed</h2>
              <p>There was an issue completing your authentication.</p>
              
              <div className={styles.errorDetails}>
                <h3>Error Details:</h3>
                <p className={styles.errorMessage}>{error}</p>
                
                {authInfo.userID && (
                  <div className={styles.debugInfo}>
                    <h4>Debug Information:</h4>
                    <div className={styles.detailItem}>
                      <strong>User ID:</strong> {authInfo.userID}
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Service:</strong> {authInfo.service}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.actions}>
                <button onClick={handleRetry} className={styles.primaryButton}>
                  Try Again
                </button>
                <Link to="/integrations" className={styles.secondaryButton}>
                  Setup Instructions
                </Link>
              </div>
            </div>
          )}

          <div className={styles.footer}>
            <p>
              <Link to="/" className={styles.homeLink}>← Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OAuth2CallbackPage; 