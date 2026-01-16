# Email Dashboard - Backend Integration Status

**Last Updated:** January 15, 2026  
**Backend Base URL:** `https://api.airthreads.ai:5001`  
**Frontend Dev Server:** `http://localhost:2000/email-dashboard-5`

---

## ✅ What's Already Working

### Backend Implementation Complete (16/20 endpoints)

**Email Management:**
- ✅ `GET /api/emails` - Paginated list with filtering
- ✅ `GET /api/emails/{id}` - Single email details
- ✅ `PUT /api/emails/{id}/read` - Mark read/unread
- ✅ `PUT /api/emails/{id}/star` - Star/unstar
- ✅ `DELETE /api/emails/{id}` - Delete email
- ✅ `GET /api/emails/stats` - Category counts
- ✅ `GET /api/emails/search` - Full-text search

**Threading:**
- ✅ `GET /api/emails/threads/{id}` - Get thread with all messages
- ✅ `PUT /api/emails/threads/{id}/read` - Mark thread as read
- ✅ `POST /api/emails/threads/{id}/reply` - Add reply to thread
- ✅ `GET /api/emails/threads` - Threaded email list

**Custom Filters:**
- ✅ `GET /api/filters` - Get user's filters
- ✅ `POST /api/filters` - Create new filter
- ✅ `DELETE /api/filters/{id}` - Delete filter
- ✅ `GET /api/filters/{id}/apply` - Apply semantic filter

**Demo Data:**
- ✅ Auto-seeding: 300 emails per user on first request
- ✅ 10 threaded conversations (2-4 replies each)
- ✅ 5 categories with proper distribution
- ✅ Timestamps spanning last 30 days
- ✅ Claude Haiku AI classification with Redis caching

---

## ❌ What Still Needs Implementation

### Critical for Frontend Demo (4 endpoints)

**1. AI Assistant Integration**
```
POST /api/ai-assistant
```
**Purpose:** Handle AI queries with optional email context (drag-and-drop feature)

**Request:**
```json
{
  "query": "Summarize these emails",
  "context": [
    {
      "id": "email-1",
      "subject": "Project Kickoff Meeting",
      "body": "Hi team! I wanted to schedule...",
      "from": "sarah.johnson@company.com",
      "category": "meetings"
    }
  ]
}
```

**Response:**
```json
{
  "response": "Based on the 2 email(s) in context:\n\n1. \"Project Kickoff Meeting\" - Hi team! I wanted to schedule...",
  "timestamp": "2026-01-15T14:30:00.000Z"
}
```

**Frontend Usage:**
- User drags emails into AI chat (adds to context array)
- User types query: "Summarize these emails"
- Frontend sends query + context array to backend
- Backend uses LLM to analyze and respond

---

**2. Reply to Email**
```
POST /api/emails/:emailId/reply
```
**Purpose:** Send reply via Gmail MCP

**Request:**
```json
{
  "content": "Thanks for the update! I'll review the document and get back to you by EOD.",
  "threadId": "thread-1"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Reply sent successfully",
  "replyId": "email-456",
  "threadId": "thread-1"
}
```

**Frontend Usage:**
- User clicks "Reply" button on email
- Modal opens for composing reply
- On submit, sends reply content to backend
- Backend uses Gmail MCP to send actual email

---

**3. Forward Email**
```
POST /api/emails/:emailId/forward
```
**Purpose:** Forward email via Gmail MCP

**Request:**
```json
{
  "to": "colleague@company.com",
  "note": "FYI - thought this might be relevant to your project"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email forwarded successfully",
  "forwardedEmailId": "email-789"
}
```

**Frontend Usage:**
- User clicks "Forward" button
- Modal opens with recipient field and optional note
- Backend forwards original email with user's note prepended

---

**4. Create Calendar Event**
```
POST /api/calendar/create-event
```
**Purpose:** Create Google Calendar event from email

**Request:**
```json
{
  "title": "Project Kickoff Meeting - Next Tuesday",
  "date": "2026-01-20",
  "time": "14:00",
  "notes": "Discuss project timeline and milestones\nReview team roles",
  "emailId": "email-1",
  "threadId": "thread-1"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Calendar event created successfully",
  "event": {
    "eventId": "cal-event-123",
    "title": "Project Kickoff Meeting - Next Tuesday",
    "startTime": "2026-01-20T14:00:00.000Z",
    "calendarLink": "https://calendar.google.com/calendar/event?eid=..."
  }
}
```

**Frontend Usage:**
- User clicks "Add to..." → "Google Calendar"
- Modal opens with pre-filled title (from email subject)
- User selects date, time, adds optional notes
- Backend uses Google Calendar MCP to create event

---

## 🔄 Category Mapping Issue

### Backend: 5 Categories
```
urgent (10%)
meetings (25%)
bills (15%)
personal (20%)
social (30%)
```

### Frontend Sidebar: 6 Filters
```
All Mail
Work → maps to: meetings
Personal → maps to: personal
Finance → maps to: bills
Urgent → maps to: urgent
Social → maps to: social
```

### ✅ Solution: Frontend Already Handles This

The frontend has category mapping logic:
```javascript
// src/pages/EmailDashboardDemo5.jsx, lines 15-22
const CATEGORY_MAPPING = {
  all: null,
  work: ['meetings'],           // Backend only has "meetings"
  personal: ['personal'],         // Direct match
  finance: ['bills'],            // Direct match
  urgent: ['urgent'],            // Direct match
  social: ['social'],            // Direct match
};
```

**No backend changes needed** - frontend will request `category=meetings` when user clicks "Work" filter.

---

## 📊 Response Format Verification

### Backend Response Structure (from testing)

```json
{
  "emails": [
    {
      "id": "email-1",
      "threadId": "thread-1",
      "subject": "Project Kickoff Meeting",
      "from": "sarah.johnson@company.com",
      "body": "Hi team! I wanted to schedule...",
      "snippet": "Hi team! I wanted to schedule our project...",
      "receivedAt": "2026-01-15T12:30:00.000Z",
      "isRead": false,
      "isStarred": false,
      "hasAttachment": false,
      "category": "meetings",
      "urgency": "high",
      "categoryMeta": {
        "label": "Meetings",
        "color": "#7c3aed",
        "icon": "📅",
        "description": "Calendar invites, interviews, and meeting requests"
      },
      "replies": [],
      "replyCount": 0
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 100,
    "hasNextPage": true,
    "hasPrevPage": false,
    "totalCount": 300
  },
  "categoryCounts": {
    "all": 300,
    "urgent": 30,
    "meetings": 75,
    "bills": 45,
    "personal": 60,
    "social": 90
  },
  "unreadCount": 91
}
```

### ✅ Required Fields Present
- ✅ All email fields match frontend expectations
- ✅ `categoryMeta` included for UI rendering
- ✅ `pagination` object with all required fields
- ✅ `categoryCounts` for sidebar display
- ✅ `unreadCount` for badge

---

## 🧪 Integration Testing Plan

### Phase 1: Email List (READY TO TEST)
```bash
# Backend is ready, frontend needs to connect
# Change API base URL in frontend to: https://api.airthreads.ai:5001
```

**Frontend Changes Needed:**
1. Update API base URL from `http://localhost:8000` to `https://api.airthreads.ai:5001`
2. Ensure `credentials: 'include'` for cookie handling
3. Test pagination (20 emails per page)
4. Test category filtering (Work, Personal, Finance, Urgent, Social)
5. Test search functionality

### Phase 2: Threading (READY TO TEST)
```bash
# Click email with replyCount > 0
# Verify thread messages display correctly
```

**Frontend Changes Needed:**
1. Update thread endpoint URL
2. Test thread expansion
3. Verify replies render in chronological order

### Phase 3: Custom Filters (READY TO TEST)
```bash
# Create new filter in sidebar
# Backend already has LLM-based semantic matching
```

**Frontend Changes Needed:**
1. Update filter CRUD endpoints
2. Test filter creation modal
3. Test applying filters to email list

### Phase 4: AI Assistant (WAITING ON BACKEND)
```bash
# ❌ Backend needs to implement POST /api/ai-assistant
```

**What Backend Needs:**
- LLM integration for natural language queries
- Context parsing (array of email objects)
- Response generation based on email context
- Handle queries like:
  - "Summarize these emails"
  - "Show me urgent emails"
  - "When is the meeting?"

### Phase 5: Email Actions (WAITING ON BACKEND)
```bash
# ❌ Backend needs Gmail MCP integration for:
# - POST /api/emails/:id/reply
# - POST /api/emails/:id/forward
# - POST /api/calendar/create-event
```

**What Backend Needs:**
- Gmail MCP server connection
- Google Calendar MCP server connection
- Email sending functionality
- Calendar event creation

---

## 🔗 Frontend Integration Code

### Update API Base URL

**File:** `src/pages/EmailDashboardDemo5.jsx`

**Current (likely):**
```javascript
const API_BASE = 'http://localhost:8000';
```

**Change to:**
```javascript
const API_BASE = 'https://api.airthreads.ai:5001';
```

**Or use environment variable:**
```javascript
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

Then in `.env`:
```
REACT_APP_API_URL=https://api.airthreads.ai:5001
```

### Fetch Example with Credentials

```javascript
// Ensure cookies are sent (for userIDHash)
fetch(`${API_BASE}/api/emails?page=1&per_page=20`, {
  method: 'GET',
  credentials: 'include',  // Important: sends cookies
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => {
  setEmails(data.emails);
  setPagination(data.pagination);
  setCategoryCounts(data.categoryCounts);
});
```

---

## 📋 Backend Team Next Steps

### Priority 1: AI Assistant (Critical)
This powers the main "AI chat" feature where users drag emails and ask questions.

**Implementation:**
1. Create LLM service (Claude/GPT)
2. Parse request: `{ query: string, context: Email[] }`
3. Generate prompt with email context
4. Return natural language response

**Example Prompt:**
```
You are an email assistant. The user has dragged 2 emails into context:

Email 1:
Subject: Project Kickoff Meeting
From: sarah.johnson@company.com
Body: Hi team! I wanted to schedule our project kickoff meeting...

Email 2:
Subject: Interview Confirmation
From: recruiting@techcorp.com
Body: We are pleased to confirm your interview...

User Query: "Summarize these emails"

Response: ...
```

### Priority 2: Email Actions (Important)
Reply, Forward, and Calendar event creation.

**Requirements:**
- Gmail MCP server connection (already exists?)
- Google Calendar MCP server connection (already exists?)
- Email sending via Gmail API
- Calendar event creation via Calendar API

**Note:** Frontend modals are already built and waiting for these endpoints.

### Priority 3: Testing & Validation
- Test all 16 endpoints with frontend
- Verify response formats match documentation
- Test error cases (network failures, invalid data)
- Load testing (multiple users, 300 emails each)

---

## ✅ What's Ready for Frontend Integration NOW

You can immediately test these features:

1. **Email List** - Paginated, filtered, searchable
2. **Category Filtering** - Work, Personal, Finance, Urgent, Social
3. **Email Details** - Click email to view
4. **Threading** - Click threaded email to see conversation
5. **Star/Unread** - Mark emails as starred or read/unread
6. **Custom Filters** - Create, list, delete, apply AI-powered filters
7. **Search** - Full-text search across all emails

**Just update the API base URL and start testing!**

---

## 🚨 Blockers

### Frontend Cannot Test Until:
- ❌ AI Assistant endpoint is implemented
- ❌ Reply/Forward endpoints are implemented
- ❌ Calendar event creation endpoint is implemented

### Backend Needs Access To:
- Gmail MCP server (for sending emails)
- Google Calendar MCP server (for creating events)
- LLM API (Claude/GPT) for AI assistant queries

---

## 📞 Next Steps

1. **Frontend Team:**
   - Update API base URL to `https://api.airthreads.ai:5001`
   - Test email list, filtering, search, threading
   - Report any response format issues

2. **Backend Team:**
   - Implement `POST /api/ai-assistant` (highest priority)
   - Implement `POST /api/emails/:id/reply`
   - Implement `POST /api/emails/:id/forward`
   - Implement `POST /api/calendar/create-event`
   - Provide test endpoints for frontend team

3. **Integration Testing:**
   - Schedule pairing session to test end-to-end
   - Verify all UI elements work with real backend data
   - Test error handling and edge cases

---

**Questions? Issues?** Refer to `EMAIL_DASHBOARD_BACKEND_API.md` for complete API documentation.
