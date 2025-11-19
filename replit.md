# AirThreads - Replit Environment

## Overview
AirThreads is a cross-platform AI-powered productivity assistant designed to streamline task management and integrate with essential productivity tools. Available as a React web application and a native iOS app, its core purpose is to provide a chat interface for users to interact with services like Gmail, Google Calendar, and Notion (upcoming). The project aims to enhance user productivity through intelligent assistance, offering a seamless experience across devices with a focus on modern UI/UX and robust backend integration.

## User Preferences
I prefer iterative development, with a focus on clear, concise communication. Please ask before making major architectural changes or introducing new dependencies. I value detailed explanations, especially for complex features or decisions. Do not make changes to the `ios-app` folder.

## System Architecture

### UI/UX Decisions

**Landing Page**: Glassmorphic design with purple-to-blue gradient background (#9c2cf3 → #7c4dff → #4f7dfd → #35a1ff), featuring five 3D floating cards (Mitedoy, Gmail x2, Calendar, Calegrator) with backdrop-filter blur, scattered arrangement using perspective transforms, and subtle floating animations. Two-column hero layout with text on left (40%) and cards on right (60%), soft bubble elements in background, and proper z-index layering (text > cards > bubbles).

**Interior Pages**: Minimalist, artistic aesthetic inspired by Blade Runner 2049 - sophisticated, clean, and atmospheric. The design emphasizes:
- **Color Palette**: Muted dark grays (#0F0F0F, #1A1A1A, #252525) with subtle orange/amber accents (#FF8C42) for strategic highlights
- **Typography**: Clean sans-serif fonts with excellent hierarchy and spacing, focusing on large, minimal text treatments
- **Visual Style**: Atmospheric gradients, subtle particle effects (30 low-opacity amber particles), simple geometric elements
- **UI Components**: Minimal cards with subtle borders, clean buttons with restrained hover states, subtle accent lines
- **Animations**: Minimal motion design limited to fade-in, slide-up, and subtle-glow effects - no glitch or heavy effects
- **Layout Philosophy**: Emphasis on whitespace, typography hierarchy, and clean geometric composition
- **Mobile Responsiveness**: Comprehensive responsive design ensuring accessibility (13px minimum font, 44px minimum touch targets) while maintaining the minimalist aesthetic

### Technical Implementations
The frontend is built with React 19.1.0 (Create React App), utilizing React Router DOM for routing, custom CSS Modules for styling, `react-markdown` for rich text, and `react-syntax-highlighter` for code display. `@vapi-ai/web` is integrated for voice capabilities. An iOS app is developed with SwiftUI for feature parity. The development environment is configured for Replit, with the frontend running on port 5000. Real-time features are implemented using Server-Sent Events (SSE) for an activity feed, including de-duplication, display limits, and robust auto-reconnection logic with exponential backoff. Authentication leverages a Python FastAPI Proxy that handles HTTP-only cookies (`userIDHash`, `gmailHashID`, `calendarHashID`) for secure session management, with all requests including credentials.

### Feature Specifications
Core functionality revolves around a chat interface for task management, integrating with Gmail, Google Calendar, and Notion (upcoming). The UI includes Landing, Product (Chat), Integrations, and About pages, all adhering to a consistent minimalist design. Vapi AI enables voice-powered interactions. The activity stream displays real-time updates from integrated services like Gmail and Calendar, showing various activity types (e.g., send, delete, modify). All API keys and endpoints are managed securely as encrypted Replit Secrets.

### System Design Choices
This repository is dedicated to the React frontend. The backend architecture, external to this repository, includes a Node.js/Express API server, a Python MCP client, a Google Calendar MCP server, and Redis for session management. The frontend is designed to be functional with placeholder content until these backend services are fully integrated. Deployment is configured for Replit's autoscale deployment.

## Recent Changes

### November 19, 2025: Glassmorphic Landing Page - Reference Design Implementation ✅
- **Scope**: Complete landing page redesign to match reference image with purple-blue gradient and 3D floating cards
- **Design Philosophy**: Modern, professional glassmorphic aesthetic with depth and dimension

**Landing Page Design:**
- **Background**: Purple-to-blue gradient (#9c2cf3 → #7c4dff → #4f7dfd → #35a1ff)
- **Hero Layout**: Two-column CSS Grid (text left 40%, cards right 60%)
- **Typography**: "AirThreads AI Assistant" with large, bold text treatments, proper text shadows
- **Glassmorphic Cards**: Five 3D floating cards with backdrop-filter blur(45px), subtle transparency, 1px white borders
  - Mitedoy (bottom left): Colorful gradient icon, "Task Management"
  - Gmail Red (top center): Red Gmail icon, "Correspondence & Assisting"
  - Gmail Blue (center left): Blue Gmail icon, "Compose & Send"
  - Calendar (top right): Calendar icon with "14", "Smart Scheduling"
  - Calegrator (middle right): Green calendar icon, "Event Coordination"
- **3D Perspective**: Individual transform3d and rotateX/Y/Z values for each card creating scattered floating effect
- **Animations**: Subtle floating animations (translateY -10px to -18px) with 6.5s-8.5s durations
- **Background Elements**: Soft blurred bubbles (blur(60px)) with radial gradients for atmospheric depth
- **Z-Index Layering**: Text (z-index: 20) > Cards (z-index: 3-7) > Bubbles (z-index: 1)
- **Header**: Updated to "AI Aseguet" button matching reference design
- **Responsive**: Grid layout maintained above 900px, fallback to stacked layout below

**Technical Implementation:**
- ✅ All 5 cards positioned and visible with proper 3D transforms
- ✅ Glassmorphic styling with backdrop-filter and gradients
- ✅ Proper stacking contexts and z-index management
- ✅ Smooth animations using CSS keyframes
- ✅ Architect review passed
- ✅ No code quality regressions

### November 19, 2025: Complete Minimalist Redesign - Blade Runner 2049 Inspired ✅
- **Scope**: Complete transformation from cyberpunk to minimalist artistic aesthetic across interior pages
- **Design Philosophy**: Artistic, clean, sophisticated - inspired by Blade Runner 2049

**Product/Chat Page Redesign:**
- Minimal chat interface with clean message bubbles
- Simple input field with subtle border
- Clean authentication/connection cards
- Restrained hover states and interactions

**Integrations Page Redesign:**
- Clean integration cards with simple borders
- Minimal status indicators ("Active" in subtle orange)
- Typography-focused layout
- Simple geometric elements

**About Page Redesign:**
- Typography-focused storytelling
- Clean sections with subtle dividers
- Minimal mission/vision cards
- Elegant, sophisticated layout

**Removed Elements:**
- ❌ All cyberpunk aesthetics (neon glows, glitch effects, scanlines)
- ❌ Terminal windows and command-line interfaces
- ❌ Matrix-style binary rain and grid overlays
- ❌ Holographic effects and angular clip-paths
- ❌ Heavy animations and busy visual effects
- ❌ Stereotypical SaaS design patterns

**Technical Results:**
- ✅ All pages compiled successfully
- ✅ Complete CSS system rewrite
- ✅ All functionality preserved
- ✅ Cohesive minimalist aesthetic across entire site
- ✅ Architect review passed
- ✅ Mobile-responsive design maintained

## External Dependencies
- **Vapi AI**: For voice integration.
- **Google API Services**: For integration with Gmail and Google Calendar.
- **Notion API**: Planned for future integration.
- **Backend APIs**: External services for Gmail, Calendar, and AI agent functionalities.
- **OAuth2**: For user authentication.
- **NPM Packages**: `react-markdown`, `@vapi-ai/web`, `react-syntax-highlighter`, `serve`.