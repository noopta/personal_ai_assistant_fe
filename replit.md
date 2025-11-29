# AirThreads - Replit Environment

## Overview
AirThreads is a cross-platform AI-powered productivity assistant designed to streamline task management and integrate with essential productivity tools. Available as a React web application and a native iOS app, its core purpose is to provide a chat interface for users to interact with services like Gmail, Google Calendar, and Notion (upcoming). The project aims to enhance user productivity through intelligent assistance, offering a seamless experience across devices with a focus on modern UI/UX and robust backend integration.

## User Preferences
I prefer iterative development, with a focus on clear, concise communication. Please ask before making major architectural changes or introducing new dependencies. I value detailed explanations, especially for complex features or decisions. Do not make changes to the `ios-app` folder.

## System Architecture

### UI/UX Decisions
The application features a complete Stripe-inspired UI redesign across all pages, characterized by a global design system:
- **Color Scheme**: Navy blue (#0A2540) for dark themes, cornflower purple (#635BFF) as the accent color, and light backgrounds (#F6F9FC, #FFFFFF) for light themes.
- **Theming**: Comprehensive theme variables ensure seamless light/dark mode switching, with a fix for theme flashing on page load.
- **Animations**: Animated mesh gradient background (WebGL/Canvas), scroll-triggered fade-in animations, card-based UI with refined hover interactions (lift, shadow, border glow), and micro-interactions on buttons (scale, shimmer, shadow effects).
- **Mobile Responsiveness**: Comprehensive mobile-first responsive design ensuring typography accessibility (13px minimum on mobile, 12px on iPhone 14/smaller), touch target compliance (44px minimum), and optimized layouts for various mobile and tablet breakpoints (390px, 430px, 540px, 768px) without overflow or horizontal scrolling. Navigation bar fully responsive with adaptive spacing, font sizes, and theme toggle sizing for all screen sizes.
- **Activity Feed UI**: Dynamic activity count badges, clean empty states, smooth cubic-bezier animations, subtle scale effects on slide-in, and enhanced hover effects with lift and purple glow.

### Technical Implementations
- **Frontend**: React 19.1.0 (Create React App) with React Router DOM 7.6.2 for routing, custom CSS Modules for styling, `react-markdown` for rich text, and `react-syntax-highlighter` for code display. `@vapi-ai/web` is used for voice integration.
- **iOS App**: A native iOS application built with SwiftUI, replicating the web interface with full feature parity and Stripe-inspired design principles.
- **Development Environment**: Configured for Replit with frontend running on port 5000, host set to `0.0.0.0`, and host check disabled for Replit proxy compatibility.
- **Authentication Flow (UPDATED Nov 29)**: Frontend now communicates directly with MCP servers on their native ports (no proxy needed):
  - **Gmail MCP Server**: `https://api.airthreads.ai:4008` - `/initiate-auth` and `/checkGmailStatus` endpoints
  - **Calendar MCP Server**: `https://api.airthreads.ai:4010` - `/initiate-auth` and `/checkCalendarStatus` endpoints
  - Request bodies include `gmailHashID` for Gmail and `userIDHash` for Calendar (extracted from cookies)
  - All requests use `credentials: 'include'` for secure cookie handling
- **Real-time Features**: Integrated real-time activity feed using Server-Sent Events (SSE) for initial load and streaming, with de-duplication, display limits, and auto-reconnection. Activities are fetched via POST to `/api/activity/recent` with `{ userIDHash, limit }` and streamed via EventSource to `/api/activity/stream?userIDHash=...`.

### Feature Specifications
- **Core Functionality**: Chat interface for task management and integration.
- **Productivity Tools**: Integrations with Gmail, Google Calendar, and Notion (coming soon).
- **User Interface**: Landing, Product (Chat), Integrations, and About pages with consistent design.
- **Voice Integration**: Vapi AI integration for voice-powered interactions.
- **Activity Stream**: Displays recent activities with real-time updates from integrated services like Gmail and Calendar, showing activity types such as send, delete, modify for Gmail, and create, update, delete for Calendar.
- **Beta Testing Feedback System**: Floating feedback button (bottom right) accessible on all pages. Tabbed modal with page-specific feedback sections (Landing, Product, Integrations, About) and general feedback (10 detailed questions). All icons use minimalist SVG line art. Form data persists in localStorage and shows success notification on submission. Backend integrated: POST to `https://api.airthreads.ai/api/feedback` with full JSON structure including timestamp and all form fields.
- **Integrations Page**: Gmail and Google Calendar integrations with simplified user-friendly setup steps (3-step process: Navigate to Product, Select "Connect to Gmail/Calendar", Sign in). Uses capabilities-based display instead of technical scopes: Gmail (Read and manage emails, Send emails, Delete and archive emails), Calendar (View all your calendars, Create and update events, Delete and reschedule events). Notion integration displays capabilities format. All links direct to appropriate pages or external documentation.
- **Environment Variables**: All API keys and endpoints are configured as encrypted Replit Secrets (`REACT_APP_VAPI_API_KEY`, `REACT_APP_VAPI_ASSISTANT_ID`, `REACT_APP_GMAIL_API_URL`, `REACT_APP_CALENDAR_API_URL`, `REACT_APP_AGENT_API_URL`, `REACT_APP_OAUTH_CALLBACK_URL`).

### System Design Choices
- **Frontend-Only Repository**: This repository focuses solely on the React frontend.
- **Backend Architecture (External to this repo)**: Includes Node.js/Express API server, Python MCP client, Google Calendar MCP server, and Redis for session management. The frontend is designed to function with placeholder content until these backend services are fully integrated.
- **Deployment**: Configured for Replit's autoscale deployment using `npm run build` and `npx serve -s build -l 5000`.

## Recent Changes

### November 29, 2025: Direct MCP Endpoint Integration 🔌
- **Architecture Change:** Frontend now uses direct MCP server endpoints instead of proxy pattern
  - Gmail authentication: `https://api.airthreads.ai:4008/initiate-auth` and `/checkGmailStatus`
  - Calendar authentication: `https://api.airthreads.ai:4010/initiate-auth` and `/checkCalendarStatus`
  - Removed dependency on proxy routing (`/api/gmail-auth`, `/api/calendar-auth`, etc.)
- **Implementation Details:**
  - Updated AuthSetup.jsx: Direct endpoint calls with `gmailHashID` and `userIDHash` from cookies
  - Updated ProductPage.jsx: Direct endpoint calls in authentication flows and status checks
  - Added `getCookieValue()` helper function for extracting hash IDs from HTTP-only cookies
  - Response parsing aligned with MCP server response format: `{ authenticated, authUrl, status }`
- **Request Format:**
  - Gmail: `POST https://api.airthreads.ai:4008/initiate-auth` with `{ gmailHashID }`
  - Gmail: `POST https://api.airthreads.ai:4008/checkGmailStatus` with `{ gmailHashID }`
  - Calendar: `POST https://api.airthreads.ai:4010/initiate-auth` with `{ userIDHash }`
  - Calendar: `POST https://api.airthreads.ai:4010/checkCalendarStatus` with `{ userIDHash }`
- **Build Status:** Compiles successfully with warnings (minor unused imports in unrelated files)

### November 23, 2025: Security Audit & Production Code Cleanup 🔒
- **Console Logging Removal:** Removed all console.log, console.error, console.warn statements from production code
  - Cleaned securityUtils.js: secureLog function now production-ready (logging disabled in production builds)
  - Simplified loggedFetch function: removed verbose request/response logging
  - Removed debug logging from RecentActivity.jsx, ProductPage.jsx, AuthSetup.jsx, OAuth2CallbackPage.jsx, VoiceMode.jsx
- **Code Cleanup:**
  - Removed unused imports: ReactMarkdown, generateSecureRandomId, ChatMessage
  - Removed unused state variables: vapiMessage
  - Simplified Vapi event handlers
- **Security Improvements:**
  - Production code no longer exposes API calls, request bodies, or response data via console
  - Sensitive information redaction in development mode only
  - XSS prevention via sanitizeInput function validation maintained
  - CSRF protection via state parameter validation maintained
- **Build Status:** App compiles successfully with minimal warnings, ready for production deployment

### November 23, 2025: Mobile Navigation Bar Responsiveness Fix 📱
- **Problem Solved:** Fixed horizontal scrolling and dark mode toggle going off-screen on iPhone 14 (390px) and smaller devices
- **Solution Implemented:**
  - **Progressive Content Hiding:** "Try Now" button hidden on screens ≤540px (redundant with Product nav link). On screens ≤390px, "Integrations" and "About" links also hidden (still accessible via footer and direct navigation)
  - **Responsive Theme Toggle:** Maintained 44px touch target height while reducing width: 88px (desktop) → 76px (≤540px) → 70px (≤430px) → 68px (≤390px)
  - **Aggressive Spacing Optimization:** Progressive reduction of container padding, nav link gaps, and horizontal padding across breakpoints (390px, 430px, 540px, 768px)
  - **Typography Scaling:** Logo font scales from 1.375rem → 0.875rem → 0.8125rem on smallest screens while maintaining 13px minimum for nav links (WCAG compliant)
  - **Overflow Prevention:** Added `overflow-x: hidden` on html/body to prevent any horizontal scrolling
  - **Accessibility Maintained:** All touch targets meet 44px minimum height requirement, font sizes meet WCAG minimums
- **Result:** Clean, professional mobile navbar with no horizontal overflow on all devices (390px, 414px, 430px, 540px+).

### November 22, 2025: Beta Testing Feedback System with Page-Specific Tabs ✨
- **Floating Feedback Button:** Purple gradient button fixed to bottom-right corner (minimalist chat bubble icon)
  - Appears on all pages (Landing, Product, Integrations, About)
  - Hover animation expands to show "Beta Feedback" label
  - Mobile-responsive with appropriate sizing and positioning
- **Tabbed Feedback Modal:** Beautiful Stripe-inspired modal with page-specific and general feedback sections
  - **5 Tab System:** General Feedback (first), Landing Page, Product, Integrations, About
  - **General Feedback Tab:** 10 focused questions covering bugs, enjoyment, improvements, problem-solving, payment willingness, convenience, feature removal, confusion, and additional thoughts.
  - **Page-Specific Tabs:** Simple textarea for users to provide feedback specific to each page
  - **Minimalist Icons:** All emojis replaced with clean, futuristic SVG line icons (bug, heart, lightbulb, target, dollar, key, zap, trash, alert, message)
  - Auto-saves feedback to localStorage as users type (persistent across sessions)
  - Success notification on submission with green checkmark animation
  - Backend integration: POST to `https://api.airthreads.ai/api/feedback`
  - Full mobile responsiveness with icon-only tabs on small screens

### November 17, 2025: Activity Stream Integration Complete ✅
- **Solution:** Backend now auto-aggregates activities from all linked services
  - Frontend uses primary `userIDHash` (from session)
  - Backend automatically includes activities from Gmail, Calendar, and other linked services
- **Implementation:**
  - `GET /api/user/session` retrieves `{ authenticated, userIDHash, gmailHashID, calendarHashID }`
  - POST to `/api/activity/recent` with `{ userIDHash, limit: 20 }` (backend aggregates)
  - EventSource to `/api/activity/stream?userIDHash=${userIDHash}` with SSE
  - Dynamic activity count badge, empty states, smooth animations
- **Robust Reconnection Logic:**
  - Connection state tracking with visual indicator (🟢 connected / 🔴 disconnected)
  - Heartbeat timeout monitoring (reconnects if no heartbeat for 60s)
  - Exponential backoff reconnection (1s, 2s, 4s... up to 30s max)
  - Race condition prevention (clears all timers before reconnect)
  - Single EventSource instance guarantee (no duplicate connections)
  - Proper cleanup on unmount

## External Dependencies
- **Vapi AI**: Used for voice integration via `REACT_APP_VAPI_API_KEY` and `REACT_APP_VAPI_ASSISTANT_ID`.
- **Google API Services**: Integration with Gmail and Google Calendar via MCP servers.
- **Notion API**: Planned integration (coming soon).
- **Backend APIs**: Backend services provide MCP servers for Gmail (port 4008) and Calendar (port 4010) on `api.airthreads.ai`.
- **OAuth2**: Uses OAuth callback for authentication flows.
- **NPM Packages**: `react-markdown`, `@vapi-ai/web`, `react-syntax-highlighter`, `serve` (for deployment).
