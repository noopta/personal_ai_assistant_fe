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
  console.warn('Crypto API not available, using fallback random generation');
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
 * Secure logging function that redacts sensitive information
 * Only logs in development mode
 * @param {string} message - The message to log
 * @param {object} data - Optional data object to log (sensitive fields will be redacted)
 */
export const secureLog = (message, data = null) => {
  // Only log in development mode
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  if (!data) {
    console.log(`[DEV] ${message}`);
    return;
  }

  // Redact sensitive fields
  const sensitiveFields = ['token', 'password', 'secret', 'key', 'hash', 'auth'];
  const redactedData = { ...data };

  Object.keys(redactedData).forEach(key => {
    const lowerKey = key.toLowerCase();
    if (sensitiveFields.some(field => lowerKey.includes(field))) {
      redactedData[key] = '[REDACTED]';
    }
  });

  console.log(`[DEV] ${message}`, redactedData);
};

/**
 * Gets environment variable with validation
 * @param {string} key - The environment variable key
 * @param {string} defaultValue - Default value if not found
 * @returns {string} The environment variable value
 */
export const getEnvVar = (key, defaultValue = '') => {
  const value = process.env[key];

  if (!value && process.env.NODE_ENV === 'production') {
    console.error(`Missing required environment variable: ${key}`);
  }

  return value || defaultValue;
};

/**
 * Logged fetch wrapper that logs all API requests and responses
 * @param {string} url - The URL to fetch
 * @param {object} options - Fetch options
 * @returns {Promise<Response>} The fetch response
 */
export const loggedFetch = async (url, options = {}) => {
  const requestId = Math.random().toString(36).substring(7);
  const startTime = Date.now();

  // Log request details
  console.group(`🌐 API Request [${requestId}]`);
  console.log('🔵 Method:', options.method || 'GET');
  console.log('🔵 URL:', url);
  console.log('🔵 Credentials:', options.credentials || 'same-origin');
  
  if (options.headers) {
    console.log('🔵 Headers:', options.headers);
  }
  
  if (options.body) {
    try {
      const bodyData = JSON.parse(options.body);
      console.log('🔵 Body:', bodyData);
    } catch {
      console.log('🔵 Body:', options.body);
    }
  }
  
  console.log('🔵 Timestamp:', new Date().toISOString());
  console.groupEnd();

  try {
    // Make the actual fetch request
    const response = await fetch(url, options);
    const duration = Date.now() - startTime;

    // Clone response to read body without consuming it
    const clonedResponse = response.clone();
    let responseData;
    
    try {
      responseData = await clonedResponse.json();
    } catch {
      responseData = await clonedResponse.text();
    }

    // Log response details
    console.group(`📡 API Response [${requestId}]`);
    console.log('✅ Status:', response.status, response.statusText);
    console.log('✅ URL:', url);
    console.log('✅ Duration:', `${duration}ms`);
    console.log('✅ Response Data:', responseData);
    console.log('✅ Timestamp:', new Date().toISOString());
    console.groupEnd();

    return response;
  } catch (error) {
    const duration = Date.now() - startTime;
    
    // Log error details
    console.group(`❌ API Error [${requestId}]`);
    console.error('❌ Error:', error.message);
    console.error('❌ URL:', url);
    console.error('❌ Duration:', `${duration}ms`);
    console.error('❌ Timestamp:', new Date().toISOString());
    console.groupEnd();

    throw error;
  }
};
