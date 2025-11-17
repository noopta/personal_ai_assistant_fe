# AirThreads - Replit Environment

## Project Overview
AirThreads is a cross-platform AI-powered productivity assistant available as both a React web application and a native iOS app. The application provides a chat interface for managing tasks and integrating with productivity tools like Gmail, Google Calendar, and Notion (coming soon).

## Technical Stack
- **Frontend Framework**: React 19.1.0 (Create React App)
- **Routing**: React Router DOM 7.6.2
- **UI Components**: Custom components with CSS Modules
- **Additional Libraries**: 
  - react-markdown for rich text formatting
  - @vapi-ai/web for voice integration
  - react-syntax-highlighter for code display

## Project Structure
- `src/components/` - Reusable UI components (Chat, Navigation, Animations, etc.)
- `src/pages/` - Main application pages (Landing, Product, Integrations, About)
- `src/contexts/` - React context providers (Theme)
- `src/assets/` - Static assets and icons
- `public/` - Static files served by the app

## Replit Configuration

### Port Configuration
- **Frontend runs on port 5000** (required for Replit webview)
- Host set to `0.0.0.0` to allow external connections
- Host check disabled (`DANGEROUSLY_DISABLE_HOST_CHECK=true`) to work with Replit's proxy iframe
- WebSocket port set to `0` for automatic configuration

### Development Workflow
The npm start script is configured with the following environment variables:
- `PORT=5000` - Runs on port 5000 for Replit compatibility
- `HOST=0.0.0.0` - Binds to all network interfaces
- `DANGEROUSLY_DISABLE_HOST_CHECK=true` - Allows Replit proxy to work
- `WDS_SOCKET_PORT=0` - Auto-configures WebSocket for hot reload

## Architecture Notes

### Frontend-Only Repository
This repository contains only the React frontend. The full architecture includes:
- **Backend Services** (not in this repo):
  - Node.js/Express API server
  - Python MCP (Model Context Protocol) client
  - Google Calendar MCP server
  - Redis for session management

### Current Functionality
Without the backend services, the frontend will:
- Display the landing page, about page, and integrations page
- Show the chat UI on the product page
- Handle routing and navigation
- Manage theme switching
- Display UI components and animations

Note: Chat functionality and service integrations require the backend services to be running.

## Deployment Configuration
The project is configured for deployment using Replit's autoscale deployment:
- **Deployment Type**: Autoscale (stateless web application)
- **Build Command**: `npm run build` - Creates optimized production build
- **Run Command**: `npx serve -s build -l 5000` - Serves the static build on port 5000
- **Dependencies**: The `serve` package is included for production serving

## iOS App

### Location
`ios-app/LuciusAI/` - Native iOS application built with SwiftUI

### Overview
A complete recreation of the web interface as a native iOS app, featuring:
- **SwiftUI Architecture**: Modern declarative UI framework
- **Full Feature Parity**: Landing, Product (Chat), Integrations, and About pages
- **Stripe-Inspired Design**: Matching navy (#0A2540) and purple (#635BFF) color scheme
- **Theme Support**: Complete dark/light mode with toggle
- **Responsive Layout**: Adapts to all iOS device sizes

### Structure
- `AirThreadsApp.swift` - Main app entry point (formerly LuciusAIApp.swift)
- `ContentView.swift` - Navigation and tab bar system
- `Theme/` - Color palette and theme management
- `Views/` - Four main pages (Landing, Product, Integrations, About)
- `Components/` - Reusable UI components (buttons, cards)

### Running the iOS App
1. Open `ios-app` directory in Xcode 14+
2. Select an iPhone simulator (iOS 16.0+)
3. Press ⌘+R to build and run

### Current Status
- ✅ Complete UI implementation
- ✅ All pages functional with placeholder content
- ⏳ Backend API integration (coming soon)
- ⏳ OAuth flows for integrations (coming soon)

See `ios-app/README.md` for detailed documentation.

## Recent Changes
- 2025-11-15: API Endpoint & CORS Preflight Fixes
  - **Fixed Calendar Endpoint Migration:**
    - Changed all Calendar endpoints from direct port calls (`:3005/checkCalendarStatus`, `:3005/initiate-auth`) to Python proxy routes (`/api/calendar-status`, `/api/calendar-auth`)
    - Ensures cookies flow through FastAPI proxy for proper authentication
    - Mirrors Gmail's working pattern (`/api/gmail-status`, `/api/gmail-auth`)
    - Updated 6 locations across ProductPage and AuthSetup components
  - **Fixed CORS Preflight Failures:**
    - Added `body: JSON.stringify({})` to all 12 Gmail/Calendar API requests
    - Previously had `Content-Type: application/json` header but no body, causing `content-length: 0`
    - Browser was rejecting OPTIONS preflight due to missing Access-Control-Allow-Origin
    - All POST requests now include proper JSON body to satisfy CORS requirements
  - **Authentication Flow Architecture:**
    - Frontend → Python FastAPI Proxy (`api.airthreads.ai`) → MCP Servers (Gmail/Calendar)
    - Proxy injects/reads HTTP-only cookies: `userIDHash`, `gmailHashID`, `calendarHashID`
    - All requests use `credentials: 'include'` to send cookies
    - No direct port access (prevents CORS cookie stripping)
  - **Status:** ✅ Architect-approved, ready for testing

- 2025-11-17: Activity Stream Integration Fix
  - **Issue Identified:** EventSource stream missing required `userIDHash` URL parameter
  - **Frontend Implementation:**
    - Added userIDHash retrieval from cookies (non-HTTP-only)
    - Added fallback to fetch from `/api/user/session` endpoint
    - Updated EventSource URL: `/api/activity/stream?userIDHash=${hashID}`
    - Added comprehensive logging for debugging authentication flow
  - **Backend Requirement (ACTION NEEDED):**
    - Must add `GET /api/user/session` endpoint that returns:
      ```json
      {
        "userIDHash": "...",
        "gmailHashID": "...",
        "calendarHashID": "..."
      }
      ```
    - Endpoint should read from existing session/cookies and return hash IDs
    - Required for frontend to properly authenticate EventSource streams
  - **Status:** ⏳ Frontend ready, waiting for backend endpoint

- 2025-11-17: Recent Activity UI Enhancements
  - **Dynamic Activity Count:** Badge now shows actual number of activities (not hardcoded default)
  - **Empty State:** Clean empty state with icon when no activities exist
  - **Smooth Animations:**
    - Cubic-bezier easing (0.4, 0, 0.2, 1) for professional material design feel
    - Faster stagger delay (0.05s) for snappier appearance
    - Subtle scale effect (0.98 → 1.0) on slide-in for depth
  - **Enhanced Hover Effects:**
    - Subtle lift animation (translateY(-2px))
    - Purple glow shadow on hover
    - Increased background opacity for better feedback
  - **Status:** ✅ Architect-approved, smooth minimalist UI

- 2025-11-15: Real-Time Activity Feed Integration
  - **Backend Infrastructure Connection:** Integrated real-time activity feed from backend API
    - **Initial Load:** GET `/api/activity/recent?limit=20` fetches latest activities on mount
    - **Real-Time Streaming:** EventSource `/api/activity/stream` with Server-Sent Events (SSE)
    - **Authentication:** Uses credentials: 'include' for cookie-based session auth
    - **Data Transformation:**
      - Maps backend structure (summary, timestamp, source, metadata) to component format
      - Converts Unix timestamps to relative time ("2 minutes ago")
      - Updates timestamps every minute for freshness
    - **Features:**
      - Auto-prepends new activities in real-time
      - De-duplicates based on description + timestamp
      - Limits display to 50 most recent items
      - Ignores heartbeat messages (every 15s) to prevent parse errors
      - Auto-reconnects on connection errors
    - **Cleanup:** Properly closes EventSource and clears timers on unmount
  - **Activity Types Supported:**
    - Gmail: send, delete, modify, batch_modify, batch_delete
    - Calendar: create, update, delete
  - **Status:** ✅ Architect-approved, production-ready

- 2025-11-05: Production-Ready Mobile Responsive Design
  - **Comprehensive Mobile Optimization:** Complete mobile-first responsive design overhaul for production deployment
    - **Typography Accessibility:** All text elements meet 13px minimum across all breakpoints (390px, 480px, 768px, desktop) for WCAG readability compliance
    - **Touch Target Compliance:** All interactive elements (buttons, links, nav items, footer links, theme toggle) meet 44px minimum height for accessibility
    - **Responsive Breakpoints:** Optimized layouts for:
      - iPhone 13 (390px)
      - iPhone XR (414px)
      - Android phones (360px-430px)
      - Tablets (768px-1024px)
    - **Layout Quality:**
      - Global horizontal overflow prevention (overflow-x: hidden)
      - Smooth scrolling enabled across entire app
      - Consistent spacing and hierarchy across all pages
      - No broken layouts or overlapping elements
    - **Component Updates:**
      - Navigation: 44px touch targets for all links and CTA buttons
      - Footer: 44-48px touch targets for all links with proper flex alignment
      - Theme Toggle: Enlarged to 88×44px for accessibility
      - Product Page: Switch mode button meets 44px minimum
      - All badges, labels, and text elements ≥13px
    - **Production Status:** ✅ Architect-approved for deployment at airthreads.ai

- 2025-11-05: Environment Variables & Footer Redesign
  - **Environment Variables:** Configured all API keys and endpoints as encrypted Replit Secrets
    - `REACT_APP_VAPI_API_KEY` - Vapi voice integration API key
    - `REACT_APP_VAPI_ASSISTANT_ID` - Vapi assistant identifier
    - `REACT_APP_GMAIL_API_URL` - Backend Gmail API endpoint
    - `REACT_APP_CALENDAR_API_URL` - Backend Calendar API endpoint
    - `REACT_APP_AGENT_API_URL` - Backend AI agent endpoint
    - `REACT_APP_OAUTH_CALLBACK_URL` - OAuth callback URL (set to https://airthreads.ai/oauth2/exchange)
  - **Theme Flash Fix:** Added blocking script in index.html that sets theme before React loads, eliminating dark mode flash on page load
  - **Footer Redesign:** Complete redesign of footer component (MadeInCanada) with Stripe-inspired layout
    - Removed grey background box that appeared in dark mode
    - Added proper footer sections: Brand, Product, Company, Integrations
    - Improved typography and spacing with hover effects
    - Fixed tagline alignment issue with flex-start positioning
    - Fully responsive design for mobile/tablet
  - **Final Branding Updates:** Changed remaining "Lucius AI" references to "AirThreads" in IntegrationsPage, ProductPage, ModeSelection, OAuth2CallbackPage, and VoiceMode components

- 2025-11-02: Content and Feature Updates
  - **Landing Page Hero Text:** Changed hero title from "Financial infrastructure" to "AI-powered assistant to grow your productivity" to better reflect the app's purpose
  - **Notion Integration Status:** Added "Coming Soon" badges to Notion integration across Landing and Integrations pages since the feature is not yet available
    - Removed Notion from hero description (now only mentions Gmail and Google Calendar)
    - Added visual "Coming Soon" badge to Notion feature card on Landing page
    - Added "Coming Soon" badge to Notion integration header on Integrations page
    - Changed task example from "Created Notion documentation" to "Organized calendar events"

- 2025-11-02: Complete Stripe-inspired UI Redesign (All Pages)
  - **Global Design System:**
    - Navy blue (#0A2540) primary background for dark theme
    - Cornflower purple (#635BFF) as accent color
    - Light backgrounds (#F6F9FC, #FFFFFF) for light theme
    - Comprehensive theme variables for seamless light/dark mode switching
    - Implemented animated mesh gradient background using WebGL/Canvas
  
  - **Landing Page:**
    - Stripe-style hero section with scroll-triggered fade-in animations
    - Card-based UI with refined hover interactions (lift, shadow, border glow)
    - Improved typography with large headings (72px hero, 48px sections)
    - Company logo showcase with infinite scroll animation
    - Micro-interactions on buttons (scale, shimmer, shadow effects)
  
  - **Integrations Page:**
    - Centered header with clean typography
    - Integration cards with clean borders and refined shadows
    - Step cards with numbered badges and hover animations
    - Scope tags and capabilities lists with proper styling
    - Help section with hover-responsive cards
  
  - **About Page:**
    - Clean hero section with fade-in animation
    - Mission & Vision cards with hover lift effects
    - Values grid with icon-based cards
    - Team member showcase with avatar circles
    - Technology highlights and contact section
  
  - **Navigation:**
    - Cleaner, more minimal design matching Stripe
    - Smooth hover effects on menu items
    - Updated theme toggle styling
  
  - **All Pages:**
    - Consistent use of theme variables for light/dark compatibility
    - Unified spacing, typography, and animation patterns
    - Professional hover effects and micro-interactions
    - Responsive design for mobile and tablet viewports

- 2025-11-02: Initial Replit environment setup
  - Configured Create React App to run on port 5000
  - Set up host configuration for Replit proxy compatibility
  - Added workflow configuration for development server
  - Installed npm dependencies
  - Configured deployment settings for autoscale
  - Verified all pages load correctly (Landing, Product, Integrations, About)

## Development Notes
- This is a Create React App project - avoid ejecting unless absolutely necessary
- The app uses CSS Modules for component styling
- React Router handles client-side routing
- Theme context provides dark/light mode switching
- ESLint warnings exist for unused imports but don't affect functionality
