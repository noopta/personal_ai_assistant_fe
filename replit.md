# AirThreads - Replit Environment

## Overview
AirThreads is a cross-platform AI-powered productivity assistant designed to streamline task management and integrate with essential productivity tools. Available as a React web application and a native iOS app, its core purpose is to provide a chat interface for users to interact with services like Gmail, Google Calendar, and Notion (upcoming). The project aims to enhance user productivity through intelligent assistance, offering a seamless experience across devices with a focus on modern UI/UX and robust backend integration.

## User Preferences
I prefer iterative development, with a focus on clear, concise communication. Please ask before making major architectural changes or introducing new dependencies. I value detailed explanations, especially for complex features or decisions. Do not make changes to the `ios-app` folder.

## System Architecture

### UI/UX Decisions
The application features a complete glassmorphic redesign across all pages, characterized by a global design system:
- **Color Scheme**: Navy blue (#0A2540) for dark themes, cornflower purple (#635BFF) as the accent color, and light backgrounds (#F6F9FC, #FFFFFF) for light themes.
- **Theming**: Comprehensive theme variables ensure seamless light/dark mode switching, with a fix for theme flashing on page load.
- **Glassmorphic Design System**: Centralized frosted glass effects with `backdrop-filter: blur(20px)`, translucent backgrounds (rgba with 0.7-0.9 alpha), subtle border glows, and depth layering for a modern, elevated aesthetic.
- **Animations**: Animated mesh gradient background (WebGL/Canvas), scroll-triggered fade-in animations, card-based UI with refined hover interactions (lift, shadow, border glow), smooth cubic-bezier transitions (cubic-bezier(0.4, 0, 0.2, 1)), and pervasive micro-interactions on buttons (scale, shimmer, shadow effects, gradient sweeps).
- **Glass Effects & Glows**: All cards, navigation, footer, and chat components use shared glass variables (--glass-bg, --glass-blur, --glass-border) with purple accent glows (--glow-purple) and enhanced shadow layering for depth.
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
- **Environment Variables**: All API keys and endpoints are configured as encrypted Replit Secrets (`REACT_APP_VAPI_API_KEY`, `REACT_APP_VAPI_ASSISTANT_ID`, `REACT_APP_GMAIL_API_URL`, `REACT_APP_CALENDAR_API_URL`, `REACT_APP_AGENT_API_URL`, `REACT_APP_OAUTH_CALLBACK_URL`).

### System Design Choices
- **Frontend-Only Repository**: This repository focuses solely on the React frontend.
- **Backend Architecture (External to this repo)**: Includes Node.js/Express API server, Python MCP client, Google Calendar MCP server, and Redis for session management. The frontend is designed to function with placeholder content until these backend services are fully integrated.
- **Deployment**: Configured for Replit's autoscale deployment using `npm run build` and `npx serve -s build -l 5000`.

## Recent Changes

### November 19, 2025: Complete Site-Wide Dramatic Glassmorphic Redesign ✅
- **Scope:** Complete transformation of ENTIRE site to dramatic dark space aesthetic (all pages, all sections, all components)
- **Default Theme:** Changed from light to dark theme as default while preserving toggle functionality

**Global Design System Enhancements:**
- **Animated Space Background:** Canvas-based particle/star animation (150 particles, performant requestAnimationFrame)
- **CSS Variables:** Dramatic space gradients, neon borders, enhanced glows (40-80px spread, 0.5-0.8 opacity)
- **Utility Classes:** .dramatic-card, .space-background, .neon-text-purple, .float-animation for consistent reuse
- **Glass Effects:** 40px blur with saturate(180%), rgba(255,255,255,0.08-0.12) backgrounds
- **Shadows:** Deep 20-80px blur with 0.5-0.7 opacity for dramatic depth

**Landing Page - All Sections:**
- **Hero:** Two-column grid (title left, floating Gmail/Calendar cards right), radial gradients, pulsing neon glow on "your productivity"
- **Features:** Floating 3D panels with parallax effects, enhanced card hover states (12px lift, scale 1.02)
- **Logos:** Translucent chips with dramatic glass effects and deep shadows
- **Benefits:** Radial gradient backgrounds with space aesthetic
- **CTA:** Glass slabs with neon borders and intense purple glows

**Integrations Page:**
- 3D floating integration cards with float animations (6-8s duration)
- Nebula-style radial gradient backgrounds
- Enhanced icon containers with 60-80px glows
- Step cards with dramatic blur (40px) and border effects

**About Page:**
- Floating glass frames for story sections
- Mission/Vision/Values cards with 7s float animations
- Staggered animation timing for depth
- Enhanced text shadows and icon glows
- 3D hover transforms (scale 1.03)

**Product/Chat Page:**
- Chat container with 40px blur, 80px shadows
- 3D glass message bubbles (assistant: 40px blur, user: enhanced gradients)
- Enhanced mode switch button with intense glows
- Radial gradient overlays for depth

**Component Enhancements:**
- **Navigation:** 40px blur navbar, intense purple/cyan glows, enhanced hover states
- **Footer:** Dramatic glass effects, neon borders, animated link effects
- **ChatMessage:** Dramatic bubble styling with role-specific glass effects
- **ChatInput:** 50px glow on focus, 70px glow on send button hover
- **ActivityFeed:** Dramatic activity cards with enhanced visual hierarchy

**Performance Considerations:**
- Canvas animation optimized with lightweight particles
- Monitor backdrop-filter effects on low-powered mobile devices
- Consider reducing particle count or blur intensity based on device capabilities

**Responsive Design:**
- Desktop: Full dramatic effects with floating animations
- Mobile: Maintains dramatic aesthetic with adjusted layouts
- All touch targets meet 44px minimum accessibility standard

### November 19, 2025: Glassmorphic Redesign Complete ✅
- **Implementation:** Complete visual overhaul with glassmorphic design system applied across all pages and components
- **Global Design System:** Centralized CSS variables in `src/index.css` for glass effects, glows, animations, and transitions
  - Glass variables: `--glass-bg`, `--glass-blur`, `--glass-border`, `--glass-shadow` with theme-specific values
  - Purple glow effects: `--glow-purple`, `--glow-purple-lg`, `--glow-purple-xl` for accent highlights
  - Smooth transitions: `--transition-smooth` using cubic-bezier(0.4, 0, 0.2, 1)
  - Utility classes: `.glass-card`, `.glass-panel`, `.fade-in-up` for consistent implementation
- **Page Updates:**
  - Landing Page: Glassmorphic hero section, feature cards with hover lift effects, gradient accents
  - Product/Chat Page: Translucent chat messages, glassmorphic input field, enhanced activity feed
  - Integrations Page: Frosted integration cards with purple glow on hover, smooth state transitions
  - About Page: Glass mission cards, team section with depth layering
- **Component Updates:**
  - Navigation: Glassmorphic navbar with backdrop blur, CTA button shimmer effects
  - Footer: Gradient border accents, animated link underlines, translucent dividers
  - ChatMessage: Glass bubbles with role-specific styling, code block polish
  - ChatInput: Frosted input with focus glow, animated send button
- **Micro-interactions:** Button hover effects (scale, lift, shimmer), link animations (underline sweeps), card interactions (shadow depth, border glow)
- **Architect Review:** ✅ Passed with strong design cohesion and unified visual polish
  - Recommendations: Future mobile device testing for performance, accessibility audit for contrast ratios, consider extracting animated background into utility class
- **Performance Notes:** Layered backdrop-filter effects may impact low-powered mobile devices; monitor in production

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