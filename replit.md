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
- **Endpoint Architecture (UPDATED Nov 29)**: Frontend communicates directly with backend services:
  - **Direct MCP Servers**: Gmail (`https://api.airthreads.ai:4008`) and Calendar (`https://api.airthreads.ai:4010`) for authentication
  - **Python API Server** (Port 5001): Session, activity, vapi-session, agent, and feedback endpoints (NO `/api/` prefix)
  - All requests use `credentials: 'include'` for secure cookie handling

### Feature Specifications
- **Core Functionality**: Chat interface for task management and integration.
- **Productivity Tools**: Integrations with Gmail, Google Calendar, and Notion (coming soon).
- **User Interface**: Landing, Product (Chat), Integrations, and About pages with consistent design.
- **Voice Integration**: Vapi AI integration for voice-powered interactions.
- **Activity Stream**: Displays recent activities with real-time updates from integrated services like Gmail and Calendar, showing activity types such as send, delete, modify for Gmail, and create, update, delete for Calendar.
- **Beta Testing Feedback System**: Floating feedback button (bottom right) accessible on all pages. Tabbed modal with page-specific feedback sections (Landing, Product, Integrations, About) and general feedback (10 detailed questions). All icons use minimalist SVG line art. Form data persists in localStorage and shows success notification on submission.
- **Integrations Page**: Gmail and Google Calendar integrations with simplified user-friendly setup steps (3-step process: Navigate to Product, Select "Connect to Gmail/Calendar", Sign in). Uses capabilities-based display instead of technical scopes.
- **Environment Variables**: All API keys configured as encrypted Replit Secrets (`REACT_APP_VAPI_API_KEY`, `REACT_APP_VAPI_ASSISTANT_ID`, `REACT_APP_OAUTH_CALLBACK_URL`).

### System Design Choices
- **Frontend-Only Repository**: This repository focuses solely on the React frontend.
- **Backend Architecture (External to this repo)**: Python server (port 5001), MCP servers for Gmail/Calendar (ports 4008/4010), and Redis for session management.
- **Deployment**: Configured for Replit's autoscale deployment using `npm run build` and `npx serve -s build -l 5000`.

## Recent Changes

### November 30, 2025: Frontend API Integration Alignment 🔧
- **Calendar Status Check Fix:** All Calendar status checks now use `status === true && expired !== true` per Integration Guide
  - Previously incorrectly checked for `authenticated === true` (only Gmail uses `authenticated`)
  - Updated in: `AuthSetup.jsx`, `ProductPage.jsx` (window focus handler, handleSendMessage, handleCheckCalendarStatus)
- **Auth Handler Improvements:** Gmail and Calendar auth handlers now properly handle guide's response format
  - Handle `status: "already_authenticated"` - mark as authenticated immediately
  - Handle `status: "auth_required"` with `authUrl` - open OAuth URL
  - Proper error handling for `status: "error"` responses
- **Files Updated:** `AuthSetup.jsx`, `ProductPage.jsx`
- **Build Status:** ✅ Compiles successfully, fully aligned with Backend Integration Guide v2.0

### November 30, 2025: Rate Limit Error Handling & Airbnb Integration 🚦
- **429 Rate Limit Handling:** Comprehensive user-friendly error handling for all API rate limits
  - `fetchVapiSessionToken`: Returns 'rate_limited' sentinel value on 429, shows friendly message
  - All callers (handleSendMessage, handleModeSelect, handleSwitchMode) check for 'rate_limited' and skip further processing
  - Uses `rateLimitHandled` flag to prevent duplicate error messages in catch blocks
  - Agent endpoint (`/agent`) also checks for 429 with friendly messaging
- **Airbnb Integration (Coming Soon):** Added Airbnb as upcoming integration in IntegrationsPage and LandingPage features section
- **Files Updated:** `ProductPage.jsx`, `IntegrationsPage.jsx`, `LandingPage.jsx`
- **Build Status:** ✅ Compiles successfully

### November 30, 2025: HTTP-Only Cookie Authentication Fix 🔐
- **Issue:** Auth status check endpoints were not being called on page load - UI showed "Checking Authentication" then immediately displayed "Connect to Gmail/Calendar" buttons
- **Root Cause:** Hash IDs (`gmailHashID`, `userIDHash`) are stored as HTTP-only cookies by the backend, meaning JavaScript cannot read them via `document.cookie`
- **Solution:** 
  - Removed the `waitForHashID()` function that was blocking API calls when hash IDs weren't found in cookies
  - Now call endpoints unconditionally with `credentials: 'include'`
  - Backend uses HTTP-only cookies for authentication, frontend passes hash ID only if readable (for backwards compatibility)
  - Updated all endpoint calls to use `{ gmailHashID: gmailHashID || undefined }` pattern
- **Files Updated:** `AuthSetup.jsx`, `ProductPage.jsx`
- **Build Status:** ✅ Compiles successfully

### November 29, 2025: Frontend Endpoint Alignment with Python Server 🔌
- **Architecture Update:** Frontend endpoints now correctly aligned with backend infrastructure
  - **MCP Servers (Ports 4008/4010):** Direct auth endpoints for Gmail and Calendar
  - **Python Server (Port 5001):** Session, activity stream, vapi-session, agent, and feedback endpoints (NO `/api/` prefix)
- **Changes Made:**
  - `RecentActivity.jsx`: Updated to use `https://api.airthreads.ai:5001/user/session`, `/activity/recent`, `/activity/stream`
  - `ProductPage.jsx`: Updated to use `https://api.airthreads.ai:5001/vapi-session` and `/agent`
  - `FeedbackModal.jsx`: Updated to use `https://api.airthreads.ai:5001/feedback`
  - Maintained direct MCP endpoints for auth (ports 4008, 4010)
  - Added `getCookieValue()` helper for extracting hash IDs from cookies
- **Request Format:**
  - Gmail: Direct endpoints at `:4008/initiate-auth` and `:checkGmailStatus` with `gmailHashID`
  - Calendar: Direct endpoints at `:4010/initiate-auth` and `:checkCalendarStatus` with `userIDHash`
  - Python server: All endpoints use `credentials: 'include'` for secure cookie handling
  - **Critical:** Hash IDs are HTTP-only cookies - cannot be read via JS, backend uses cookies sent with `credentials: 'include'`
- **Build Status:** ✅ Compiles successfully, ready for production

### November 23, 2025: Security Audit & Production Code Cleanup 🔒
- Removed all console.log, console.error, console.warn from production code
- Cleaned securityUtils.js: secureLog function production-ready
- Removed unused imports and state variables
- **Build Status:** Production-ready with minimal warnings

### November 23, 2025: Mobile Navigation Bar Responsiveness Fix 📱
- Fixed horizontal scrolling on iPhone 14 (390px) and smaller devices
- Progressive content hiding and responsive theme toggle
- Clean professional navbar with no overflow on all devices

### November 22, 2025: Beta Testing Feedback System with Page-Specific Tabs ✨
- Floating feedback button (bottom right) on all pages
- Tabbed modal with 5 tabs (General + 4 page-specific)
- Minimalist SVG icons, localStorage persistence
- Backend integration with success notifications

### November 17, 2025: Activity Stream Integration Complete ✅
- Real-time activity feed using Server-Sent Events (SSE)
- Backend auto-aggregates activities from all linked services
- Robust reconnection logic with exponential backoff
- Comprehensive error handling and state management

## External Dependencies
- **Vapi AI**: Voice integration via `REACT_APP_VAPI_API_KEY` and `REACT_APP_VAPI_ASSISTANT_ID`
- **Google API Services**: Gmail and Google Calendar via MCP servers
- **Notion API**: Planned integration
- **Backend APIs**: Python server (port 5001) and MCP servers (ports 4008, 4010)
- **OAuth2**: OAuth callback for authentication flows
- **NPM Packages**: `react-markdown`, `@vapi-ai/web`, `react-syntax-highlighter`, `serve`
