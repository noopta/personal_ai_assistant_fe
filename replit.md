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
- **Mobile Responsiveness**: Comprehensive mobile-first responsive design ensuring typography accessibility (13px minimum), touch target compliance (44px minimum), and optimized layouts for various mobile and tablet breakpoints without overflow or broken elements.
- **Activity Feed UI**: Dynamic activity count badges, clean empty states, smooth cubic-bezier animations, subtle scale effects on slide-in, and enhanced hover effects with lift and purple glow.

### Technical Implementations
- **Frontend**: React 19.1.0 (Create React App) with React Router DOM 7.6.2 for routing, custom CSS Modules for styling, `react-markdown` for rich text, and `react-syntax-highlighter` for code display. `@vapi-ai/web` is used for voice integration.
- **iOS App**: A native iOS application built with SwiftUI, replicating the web interface with full feature parity and Stripe-inspired design principles.
- **Development Environment**: Configured for Replit with frontend running on port 5000, host set to `0.0.0.0`, and host check disabled for Replit proxy compatibility.
- **Real-time Features**: Integrated real-time activity feed using Server-Sent Events (SSE) for initial load and streaming, with de-duplication, display limits, and auto-reconnection. Activities are fetched via POST to `/api/activity/recent` with `{ userIDHash, limit }` and streamed via EventSource to `/api/activity/stream?userIDHash=...`. The component uses `gmailHashID` (from session) for Gmail activities.
- **Authentication Flow**: Frontend interacts with a Python FastAPI Proxy (`api.airthreads.ai`) which then communicates with MCP (Model Context Protocol) servers for Gmail/Calendar. The proxy handles HTTP-only cookies (`userIDHash`, `gmailHashID`, `calendarHashID`) for secure session management, with all requests using `credentials: 'include'`. Session data retrieved via `GET /api/user/session`.

### Feature Specifications
- **Core Functionality**: Chat interface for task management and integration.
- **Productivity Tools**: Integrations with Gmail, Google Calendar, and Notion (coming soon).
- **User Interface**: Landing, Product (Chat), Integrations, and About pages with consistent design.
- **Voice Integration**: Vapi AI integration for voice-powered interactions.
- **Activity Stream**: Displays recent activities with real-time updates from integrated services like Gmail and Calendar, showing activity types such as send, delete, modify for Gmail, and create, update, delete for Calendar.
- **Beta Testing Feedback System**: Floating feedback button (bottom right) accessible on all pages. Tabbed modal with page-specific feedback sections (Landing, Product, Integrations, About) and general feedback (10 detailed questions). All icons use minimalist SVG line art. Form data persists in localStorage, can be minimized while navigating, and shows success notification on submission. No backend integration yet (frontend-only implementation).
- **Environment Variables**: All API keys and endpoints are configured as encrypted Replit Secrets (`REACT_APP_VAPI_API_KEY`, `REACT_APP_VAPI_ASSISTANT_ID`, `REACT_APP_GMAIL_API_URL`, `REACT_APP_CALENDAR_API_URL`, `REACT_APP_AGENT_API_URL`, `REACT_APP_OAUTH_CALLBACK_URL`).

### System Design Choices
- **Frontend-Only Repository**: This repository focuses solely on the React frontend.
- **Backend Architecture (External to this repo)**: Includes Node.js/Express API server, Python MCP client, Google Calendar MCP server, and Redis for session management. The frontend is designed to function with placeholder content until these backend services are fully integrated.
- **Deployment**: Configured for Replit's autoscale deployment using `npm run build` and `npx serve -s build -l 5000`.

## Recent Changes

### November 22, 2025: Beta Testing Feedback System with Page-Specific Tabs ✨
- **Floating Feedback Button:** Purple gradient button fixed to bottom-right corner (minimalist chat bubble icon)
  - Appears on all pages (Landing, Product, Integrations, About)
  - Hover animation expands to show "Beta Feedback" label
  - Mobile-responsive with appropriate sizing and positioning
- **Tabbed Feedback Modal:** Beautiful Stripe-inspired modal with page-specific and general feedback sections
  - **5 Tab System:** General Feedback (first), Landing Page, Product, Integrations, About
  - **General Feedback Tab (Default):** Always opens first with 10 focused questions covering bugs, enjoyment, improvements, problem-solving, payment willingness, convenience, feature removal, confusion, and additional thoughts. Includes tip notification directing users to page-specific tabs.
  - **Page-Specific Tabs:** Simple textarea for users to provide feedback specific to each page (layout, bugs, confusing elements, missing features)
  - **Minimalist Icons:** All emojis replaced with clean, futuristic SVG line icons (bug, heart, lightbulb, target, dollar, key, zap, trash, alert, message)
  - Auto-saves all feedback to localStorage as users type (persistent across sessions)
  - Minimize feature allows users to continue browsing while maintaining draft
  - Success notification on submission with green checkmark animation
  - No backend yet - logs to console for now
  - Full mobile responsiveness with icon-only tabs on small screens
- **Design Features:**
  - Matches Stripe design system (purple gradients, smooth animations, clean lines)
  - Backdrop blur overlay on modal open
  - Accessibility-compliant (ARIA labels, keyboard navigation)
  - Works seamlessly in both light and dark modes
  - Professional UX with clear hints and placeholders for each question

### November 17, 2025: Activity Stream Integration Complete ✅
- **Solution:** Backend now auto-aggregates activities from all linked services
  - Frontend uses primary `userIDHash` (from session)
  - Backend automatically includes activities from Gmail, Calendar, and other linked services
  - No need to track separate hash IDs per service in frontend
- **Implementation:**
  - `GET /api/user/session` retrieves `{ authenticated, userIDHash, gmailHashID, calendarHashID }`
  - POST to `/api/activity/recent` with `{ userIDHash, limit: 20 }` (backend aggregates)
  - EventSource to `/api/activity/stream?userIDHash=${userIDHash}` with SSE
  - Dynamic activity count badge, empty states, smooth animations
  - Comprehensive logging for debugging authentication flow
- **Robust Reconnection Logic:**
  - Connection state tracking with visual indicator (🟢 connected / 🔴 disconnected)
  - Heartbeat timeout monitoring (reconnects if no heartbeat for 60s)
  - Exponential backoff reconnection (1s, 2s, 4s... up to 30s max)
  - Race condition prevention (clears all timers before reconnect)
  - Single EventSource instance guarantee (no duplicate connections)
  - Proper cleanup on unmount
- **Backend Integration (VERIFIED):**
  - ✅ SSE connection working with 24h nginx timeout
  - ✅ CORS headers configured for all activity endpoints
  - ✅ Session endpoint returns hash IDs and authentication status
  - ✅ Backend auto-aggregates activities from all linked services
  - ✅ Real-time updates tested and confirmed
  - ✅ Automatic reconnection on connection loss

## External Dependencies
- **Vapi AI**: Used for voice integration via `REACT_APP_VAPI_API_KEY` and `REACT_APP_VAPI_ASSISTANT_ID`.
- **Google API Services**: Integration with Gmail and Google Calendar.
- **Notion API**: Planned integration (coming soon).
- **Backend APIs**: Relies on external backend services for Gmail, Calendar, and AI agent functionalities (`REACT_APP_GMAIL_API_URL`, `REACT_APP_CALENDAR_API_URL`, `REACT_APP_AGENT_API_URL`).
- **OAuth2**: Uses an OAuth callback URL (`REACT_APP_OAUTH_CALLBACK_URL`) for authentication.
- **NPM Packages**: `react-markdown`, `@vapi-ai/web`, `react-syntax-highlighter`, `serve` (for deployment).