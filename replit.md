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

### November 20, 2025: Glassmorphic Landing Page - Reference Design Implementation ✅
- **Scope**: Complete transformation to modern glassmorphic design based on provided reference
- **Design Philosophy**: Clean, modern, professional with depth and blur effects

**Glassmorphic Landing Page Design:**
- **Navbar**: Fixed floating pill design with glassmorphic effect, rounded full borders
- **Hero Section**: 
  - Gradient headline text ("Your Productivity, On Autopilot")
  - Framer Motion entrance animations with staggered delays
  - "NOW IN PUBLIC BETA" badge with sparkle icon
  - Two CTA buttons (primary with glow effect, secondary glass button)
  - Floating notification cards (Gmail Integration, Calendar Agent) with animate-float effect
- **Features Section**:
  - 2x2 grid of glassmorphic feature cards
  - Voice Command, Smart Scheduling, Inbox Triage, Private by Design
  - Hover effects with color transitions
- **Footer**: Clean minimal footer with company info and social links

**Technical Implementation:**
- ✅ Framer Motion for smooth entrance animations
- ✅ Lucide React for icons (Mail, Calendar, Sparkles, Zap, etc.)
- ✅ Glass panel effects with backdrop-filter blur
- ✅ Gradient text utilities (.text-gradient, .text-gradient-primary)
- ✅ Float animations for floating cards
- ✅ Responsive design with mobile/tablet/desktop breakpoints
- ✅ CSS variables for theming (primary, accent, muted colors)
- ✅ Hover effects and transitions throughout

**Color System:**
- Primary: hsl(252 90% 55%) - purple
- Accent: hsl(190 100% 40%) - cyan
- Background: #fafafa - light gray
- Glass effects using rgba with backdrop-filter

**Components Created:**
- GlassNav.jsx - Floating navbar with glassmorphic pill design
- GlassHero.jsx - Hero section with gradient text and floating cards
- GlassFeatures.jsx - Features grid with glass panel cards
- LandingPageGlass.jsx - Main landing page component

---

### November 19, 2025: Experimental Concept Art Studio Landing Page [ARCHIVED]
- **Scope**: Complete transformation to cutting-edge experimental design inspired by top-tier concept art studios
- **Design Philosophy**: Layered depth, advanced interactions, artistic typography, generous whitespace

**Experimental Features:**
- **Multi-layer parallax system**: 3 depth planes with mouse-reactive 3D transforms (background SVG -200px, mid-layer shapes -50px, foreground typography +20px)
- **Custom cursor**: Inverted circle cursor with mix-blend-mode for premium feel
- **Morphing SVG**: Animated organic blob with feTurbulence noise filter and 20s morph cycle
- **Floating geometric cluster**: Circle, square, triangle with independent animations (float, rotate, scale)
- **Annotation lines**: Diagonal guide lines with pulsing opacity for editorial aesthetic
- **Staggered reveals**: Sequential fade-in animations for hero elements (0.3s-0.9s delays)
- **Diagonal stats section**: Skewed container with ultra-light typography (100-weight numerals)
- **Asymmetric capability grid**: 8-column by 6-row experimental layout with cards spanning variable sizes
- **Advanced interactions**: Cards lift on hover with translateZ, gradient sweeps, magnetic button effects
- **Typography hierarchy**: "CONCEPT STUDY 01" metadata, ultra-light 200-weight hero title, animated underlines

**Technical Implementation:**
- Pure CSS animations and transforms (no external libraries)
- Accessibility: Reduced-motion fallbacks ensure text visibility
- Responsive: Collapses to single-column mobile layout
- Performance: Hardware-accelerated transforms with will-change hints

**Design Tokens:**
- Background: #FAFAFA (light minimal)
- Text: #0A0A0A (near-black)
- Typography: Ultra-light weights (100-300) at massive scale (up to 9rem)
- Spacing: Generous whitespace (12rem vertical padding, 8vw horizontal)
- Motion: Smooth cubic-bezier(0.19, 1, 0.22, 1) easing

**Latest Enhancements (Pushed Even Further):**
- ✅ Removed custom cursor to avoid user confusion
- ✅ Redesigned navigation - ultra-minimal, transparent with animated underlines
- ✅ Global 100px grid overlay across entire page
- ✅ Giant kinetic "AI" typography (35rem) with stroke outline
- ✅ Vertical rotated label "AIRTHREADS — 2025"
- ✅ Experimental footer with clean grid and animated links (only on landing page)
- ✅ Section numbering system (01-04) throughout
- ✅ Complete accessibility with reduced-motion fallbacks
- ✅ **Interactive Data Network Visualization**:
  - 5 pulsing network nodes with staggered animations
  - 6 animated connections with dashed lines flowing along paths
  - Data packets (circles) traveling between nodes at different speeds
  - Binary data stream scrolling horizontally across background
  - 6 mouse-reactive particles that follow cursor movement
  - All elements create abstract representation of data transmission

---

### November 19, 2025: Glassmorphic Landing Page - Reference Design Implementation [ARCHIVED]
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