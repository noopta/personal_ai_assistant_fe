/**
 * Email Dashboard API Service
 * Handles all backend communication for the email dashboard feature
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.airthreads.ai:5001';

/**
 * Make API request with proper error handling
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    credentials: 'include', // Send cookies (userIDHash)
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

/**
 * Fetch paginated list of emails
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.per_page - Items per page (default: 20)
 * @param {string} params.category - Filter by category (optional)
 * @param {string} params.search - Search query (optional)
 * @returns {Promise<Object>} { emails, pagination, categoryCounts, unreadCount }
 */
export async function fetchEmails({ page = 1, per_page = 20, category, search } = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
  });

  if (category && category !== 'all') {
    params.append('category', category);
  }

  if (search) {
    params.append('search', search);
  }

  return apiRequest(`/api/emails?${params.toString()}`);
}

/**
 * Fetch a single email thread with all messages
 * @param {string} threadId - Thread ID
 * @returns {Promise<Object>} Thread object with messages
 */
export async function fetchThread(threadId) {
  return apiRequest(`/api/emails/threads/${threadId}`);
}

/**
 * Mark email as read/unread
 * @param {string} emailId - Email ID
 * @param {boolean} isRead - Read status
 * @returns {Promise<Object>} Updated email
 */
export async function updateEmailReadStatus(emailId, isRead) {
  return apiRequest(`/api/emails/${emailId}/read`, {
    method: 'PUT',
    body: JSON.stringify({ is_read: isRead }),
  });
}

/**
 * Star/unstar an email
 * @param {string} emailId - Email ID
 * @param {boolean} isStarred - Starred status
 * @returns {Promise<Object>} Updated email
 */
export async function updateEmailStarStatus(emailId, isStarred) {
  return apiRequest(`/api/emails/${emailId}/star`, {
    method: 'PUT',
    body: JSON.stringify({ is_starred: isStarred }),
  });
}

/**
 * Delete an email
 * @param {string} emailId - Email ID
 * @returns {Promise<Object>} Success response
 */
export async function deleteEmail(emailId) {
  return apiRequest(`/api/emails/${emailId}`, {
    method: 'DELETE',
  });
}

/**
 * Get email statistics (category counts, unread count)
 * @returns {Promise<Object>} { categoryCounts, unreadCount }
 */
export async function fetchEmailStats() {
  return apiRequest('/api/emails/stats');
}

/**
 * Search emails
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @param {number} per_page - Items per page
 * @returns {Promise<Object>} Search results
 */
export async function searchEmails(query, page = 1, per_page = 20) {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    per_page: per_page.toString(),
  });

  return apiRequest(`/api/emails/search?${params.toString()}`);
}

/**
 * Fetch user's custom filters
 * @returns {Promise<Array>} Array of custom filters
 */
export async function fetchCustomFilters() {
  return apiRequest('/api/filters');
}

/**
 * Create a new custom filter
 * @param {string} name - Filter name
 * @param {string} criteria - Filter criteria (natural language)
 * @returns {Promise<Object>} Created filter
 */
export async function createCustomFilter(name, criteria) {
  return apiRequest('/api/filters', {
    method: 'POST',
    body: JSON.stringify({ name, criteria }),
  });
}

/**
 * Delete a custom filter
 * @param {string} filterId - Filter ID
 * @returns {Promise<Object>} Success response
 */
export async function deleteCustomFilter(filterId) {
  return apiRequest(`/api/filters/${filterId}`, {
    method: 'DELETE',
  });
}

/**
 * Apply a custom filter to get matching emails
 * @param {string} filterId - Filter ID
 * @param {number} page - Page number
 * @param {number} per_page - Items per page
 * @returns {Promise<Object>} Filtered emails
 */
export async function applyCustomFilter(filterId, page = 1, per_page = 20) {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
  });

  return apiRequest(`/api/filters/${filterId}/apply?${params.toString()}`);
}

/**
 * Send AI assistant query with optional email context
 * @param {string} query - User's question
 * @param {Array} context - Array of email objects for context
 * @returns {Promise<Object>} { response, timestamp }
 */
export async function sendAIQuery(query, context = []) {
  return apiRequest('/api/ai-assistant', {
    method: 'POST',
    body: JSON.stringify({ query, context }),
  });
}

/**
 * Reply to an email
 * @param {string} emailId - Email ID
 * @param {string} content - Reply content
 * @param {string} threadId - Thread ID
 * @returns {Promise<Object>} Reply confirmation
 */
export async function replyToEmail(emailId, content, threadId) {
  return apiRequest(`/api/emails/${emailId}/reply`, {
    method: 'POST',
    body: JSON.stringify({ content, threadId }),
  });
}

/**
 * Forward an email
 * @param {string} emailId - Email ID
 * @param {string} to - Recipient email
 * @param {string} note - Optional note
 * @returns {Promise<Object>} Forward confirmation
 */
export async function forwardEmail(emailId, to, note) {
  return apiRequest(`/api/emails/${emailId}/forward`, {
    method: 'POST',
    body: JSON.stringify({ to, note }),
  });
}

/**
 * Create a calendar event from email
 * @param {Object} eventData - Event details
 * @returns {Promise<Object>} Created event
 */
export async function createCalendarEvent(eventData) {
  return apiRequest('/api/calendar/create-event', {
    method: 'POST',
    body: JSON.stringify(eventData),
  });
}

/**
 * Mark entire thread as read
 * @param {string} threadId - Thread ID
 * @returns {Promise<Object>} Success response
 */
export async function markThreadAsRead(threadId) {
  return apiRequest(`/api/emails/threads/${threadId}/read`, {
    method: 'PUT',
  });
}

/**
 * Add reply to thread
 * @param {string} threadId - Thread ID
 * @param {string} content - Reply content
 * @returns {Promise<Object>} Reply confirmation
 */
export async function addReplyToThread(threadId, content) {
  return apiRequest(`/api/emails/threads/${threadId}/reply`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}
