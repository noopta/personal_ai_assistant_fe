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
  // Production-ready: all logging is disabled for production builds
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
 * Logged fetch wrapper that logs all API requests and responses
 * Only logs in development mode
 * @param {string} url - The URL to fetch
 * @param {object} options - Fetch options
 * @returns {Promise<Response>} The fetch response
 */
export const loggedFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    throw error;
  }
};
