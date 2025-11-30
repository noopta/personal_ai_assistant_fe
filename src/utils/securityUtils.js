/**
 * Security utility functions for the application
 */

/**
 * Generates a cryptographically secure random ID
 * @returns {string} A secure random UUID
 */
export const generateSecureRandomId = () => {
  // Use crypto.randomUUID() for cryptographically secure IDs
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers using crypto.getRandomValues
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);

    // Convert to hex string
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Final fallback (not recommended for production)
  return 'fallback-' + Date.now() + '-' + Math.random().toString(36).substring(2, 15);
};

/**
 * Sanitizes user input to prevent XSS attacks
 * @param {string} input - The user input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;

  // Remove potential script tags and dangerous characters
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validates and sanitizes URL parameters
 * @param {string} param - The URL parameter to validate
 * @returns {string|null} Sanitized parameter or null if invalid
 */
export const validateUrlParam = (param) => {
  if (!param || typeof param !== 'string') return null;

  // Allow only alphanumeric, hyphens, and underscores
  const sanitized = param.replace(/[^a-zA-Z0-9_-]/g, '');

  return sanitized.length > 0 ? sanitized : null;
};

/**
 * Check if detailed logging is enabled
 * Enable by setting REACT_APP_ENABLE_LOGGING=true in environment
 */
const isLoggingEnabled = () => {
  return process.env.REACT_APP_ENABLE_LOGGING === 'true' || process.env.NODE_ENV === 'development';
};

/**
 * Sensitive fields that should be redacted in logs
 */
const SENSITIVE_FIELDS = ['token', 'session_token', 'password', 'secret', 'key', 'auth', 'cookie', 'gmailHashID', 'userIDHash'];

/**
 * Redact sensitive data from objects for safe logging
 * @param {any} data - Data to redact
 * @returns {any} Redacted data
 */
const redactSensitiveData = (data) => {
  if (!data) return data;
  if (typeof data === 'string') {
    if (data.length > 50) return data.substring(0, 20) + '...[TRUNCATED]';
    return data;
  }
  if (typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(redactSensitiveData);
  
  const redacted = {};
  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();
    if (SENSITIVE_FIELDS.some(field => lowerKey.includes(field))) {
      redacted[key] = value ? '[REDACTED]' : null;
    } else if (typeof value === 'object' && value !== null) {
      redacted[key] = redactSensitiveData(value);
    } else {
      redacted[key] = value;
    }
  }
  return redacted;
};

/**
 * Format timestamp for logs
 */
const getTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Secure logging function that redacts sensitive information
 * Enabled in development or when REACT_APP_ENABLE_LOGGING=true
 * @param {string} message - The message to log
 * @param {object} data - Optional data object to log (sensitive fields will be redacted)
 */
export const secureLog = (message, data = null) => {
  if (!isLoggingEnabled()) return;
  
  const timestamp = getTimestamp();
  const prefix = `[${timestamp}] [AirThreads]`;
  
  if (data) {
    console.log(`${prefix} ${message}`, redactSensitiveData(data));
  } else {
    console.log(`${prefix} ${message}`);
  }
};

/**
 * Gets environment variable with validation
 * @param {string} key - The environment variable key
 * @param {string} defaultValue - Default value if not found
 * @returns {string} The environment variable value
 */
export const getEnvVar = (key, defaultValue = '') => {
  const value = process.env[key];

  return value || defaultValue;
};

/**
 * Extract endpoint name from URL for cleaner logging
 * @param {string} url - The full URL
 * @returns {string} The endpoint path
 */
const extractEndpoint = (url) => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.port ? ':' + urlObj.port : ''}${urlObj.pathname}`;
  } catch {
    return url;
  }
};

/**
 * Parse request body for logging (handles JSON strings)
 * @param {any} body - The request body
 * @returns {object|string} Parsed body for logging
 */
const parseBodyForLogging = (body) => {
  if (!body) return null;
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return body.substring(0, 100) + (body.length > 100 ? '...' : '');
    }
  }
  return body;
};

/**
 * Logged fetch wrapper that logs all API requests and responses
 * Provides detailed timing, status, and error information
 * @param {string} url - The URL to fetch
 * @param {object} options - Fetch options
 * @returns {Promise<Response>} The fetch response
 */
export const loggedFetch = async (url, options = {}) => {
  const requestId = Math.random().toString(36).substring(2, 8).toUpperCase();
  const endpoint = extractEndpoint(url);
  const method = options.method || 'GET';
  const startTime = performance.now();
  
  if (isLoggingEnabled()) {
    const logData = {
      requestId,
      method,
      endpoint,
      fullUrl: url,
      hasCredentials: options.credentials === 'include',
      body: parseBodyForLogging(options.body)
    };
    console.log(`[${getTimestamp()}] [API REQUEST] [${requestId}] ${method} ${endpoint}`, redactSensitiveData(logData));
  }
  
  try {
    const response = await fetch(url, options);
    const duration = Math.round(performance.now() - startTime);
    
    if (isLoggingEnabled()) {
      const statusEmoji = response.ok ? '✅' : '❌';
      const logData = {
        requestId,
        status: response.status,
        statusText: response.statusText,
        duration: `${duration}ms`,
        ok: response.ok,
        contentType: response.headers.get('content-type')
      };
      console.log(`[${getTimestamp()}] [API RESPONSE] [${requestId}] ${statusEmoji} ${method} ${endpoint} → ${response.status} (${duration}ms)`, logData);
      
      if (!response.ok) {
        console.warn(`[${getTimestamp()}] [API ERROR] [${requestId}] ${method} ${endpoint} failed with status ${response.status}`);
      }
    }
    
    return response;
  } catch (error) {
    const duration = Math.round(performance.now() - startTime);
    
    if (isLoggingEnabled()) {
      const logData = {
        requestId,
        error: error.message,
        errorType: error.name,
        duration: `${duration}ms`,
        isNetworkError: error.name === 'TypeError',
        isCorsError: error.message?.includes('CORS') || error.message?.includes('Failed to fetch')
      };
      console.error(`[${getTimestamp()}] [API EXCEPTION] [${requestId}] ❌ ${method} ${endpoint} threw error after ${duration}ms`, logData);
    }
    
    throw error;
  }
};

/**
 * Log API response body (call after reading response)
 * @param {string} requestId - The request ID from loggedFetch
 * @param {string} endpoint - The endpoint path
 * @param {any} data - The response data
 */
export const logResponseBody = (requestId, endpoint, data) => {
  if (!isLoggingEnabled()) return;
  console.log(`[${getTimestamp()}] [API BODY] [${requestId}] ${endpoint} response:`, redactSensitiveData(data));
};
