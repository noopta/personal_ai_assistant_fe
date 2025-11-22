# AirThreads - Replit Environment

## Overview
AirThreads is a cross-platform AI-powered productivity assistant designed to streamline task management and integrate with essential productivity tools. Available as a React web application and a native iOS app, its core purpose is to provide a chat interface for users to interact with services like Gmail, Google Calendar, and Notion (upcoming). The project aims to enhance user productivity through intelligent assistance, offering a seamless experience across devices with a focus on modern UI/UX and robust backend integration.

## User Preferences
I prefer iterative development, with a focus on clear, concise communication. Please ask before making major architectural changes or introducing new dependencies. I value detailed explanations, especially for complex features or decisions. Do not make changes to the `ios-app` folder.

## System Architecture

### UI/UX Decisions
**Complete Glassmorphic Design System**: The entire website uses a unified glassmorphic design system with backdrop-filter blur effects, semi-transparent glass panels, and theme-adaptive styling throughout all pages.

**Landing Page**: Glassmorphic hero section with animated gradient backgrounds (7 options: Deep Tech static + 6 animated), featuring five 3D floating cards with backdrop-filter blur, scattered arrangement using perspective transforms, and subtle floating animations. Two-column hero layout with soft bubble elements and proper z-index layering.

**Interior Pages** (Product, Integrations, About): Fully glassmorphic design matching the landing page aesthetic:
- **Glass Effects**: Backdrop-filter blur (12-20px) on all cards, panels, and UI elements
- **Color System**: CSS variables (--background, --foreground, --primary, --border, --glass) for theme consistency
- **Theme Variants**: Light/dark mode toggle + 9 color palette variants (Original, Crimson, Tangerine, Canary, Emerald, Teal, Azure, Indigo, Violet, Magenta)
- **Typography**: Clean sans-serif fonts with excellent hierarchy and spacing
- **UI Components**: Glass navigation (GlassNav), glass cards with hover effects, glass footer with responsive design
- **Animations**: Smooth transitions, fade-in effects, subtle hover animations
- **Layout**: Emphasis on whitespace, clean composition, and atmospheric design
- **Mobile Responsiveness**: Comprehensive responsive design with media queries (13px minimum font, 44px minimum touch targets, single-column layouts <768px)

### Technical Implementations
The frontend uses React 19.1.0 (Create React App) with React Router DOM, inline styles with CSS variables for theming (no CSS Modules), `react-markdown`, and `react-syntax-highlighter`. `@vapi-ai/web` is integrated for voice capabilities. An iOS app uses SwiftUI for feature parity. The Replit environment runs the frontend on port 5000.

**Styling Architecture**: Glassmorphic design implemented using inline styles combined with CSS variables for theme switching. All pages use `color-mix(in srgb, var(--background) X%, transparent)` for theme-adaptive glass effects. Media queries embedded in `<style>` tags target className props for responsive behavior.

**Theme System**: Global CSS variables in App.css define theme tokens. ThemeToggle component switches light/dark mode. DesignSwitcher provides 9 color palette variants. All glassmorphic components consume these variables for consistent theming.

Real-time features use Server-Sent Events (SSE) for an activity feed, including de-duplication, display limits, and robust auto-reconnection with exponential backoff. Authentication leverages a Python FastAPI Proxy for secure session management via HTTP-only cookies (`userIDHash`, `gmailHashID`, `calendarHashID`).

### Feature Specifications
Core functionality is a chat interface for task management, integrating with Gmail, Google Calendar, and Notion (upcoming). The UI includes Landing, Product (Chat), Integrations, and About pages, all adhering to a consistent minimalist design. Vapi AI enables voice-powered interactions. The activity stream displays real-time updates from integrated services, showing various activity types. All API keys and endpoints are managed securely as encrypted Replit Secrets.

### System Design Choices
This repository is for the React frontend. The backend, external to this repository, includes a Node.js/Express API server, a Python MCP client, a Google Calendar MCP server, and Redis for session management. The frontend is designed to be functional with placeholder content until backend services are integrated. Deployment is configured for Replit's autoscale deployment.

## Recent Changes (Nov 22, 2025)
**UI Redesign - Product, Integrations, and About Pages**:
- **Product Page**: Redesigned as "Connect Your Accounts" onboarding flow with side-by-side Gmail and Google Calendar cards. Features centered layout with clear authentication messaging, permissions info card with security notes, and refresh status button.
- **Integrations Page**: Completely redesigned with integration cards (Gmail, Google Calendar, Notion) that display inline. Each card includes Quick Setup steps (numbered 1-3), required scopes/permissions, and prominent action buttons. Layout optimized for clarity and scannability.
- **About Page**: Restructured with "Our Story" section in glass panel, Mission & Vision cards with emoji indicators, Core Values grid (4-column layout), and "Get in Touch" CTA section with email link.
- All pages maintain glassmorphic design with backdrop-filter blur, use CSS variables for light/dark mode support, and include Framer Motion animations (fade-in, slide animations with staggered delays).
- Button styling uses gradient backgrounds (#635BFF primary with shadow effects) consistent across all interactive elements.
- Fixed duplicate navbar issue on Product page by moving GlassNav to single render location.
- Standardized page spacing and title alignment across all pages for visual symmetry.

## External Dependencies
- **Vapi AI**: For voice integration.
- **Google API Services**: For integration with Gmail and Google Calendar.
- **Notion API**: Planned for future integration.
- **Backend APIs**: External services for Gmail, Calendar, and AI agent functionalities.
- **OAuth2**: For user authentication.
- **NPM Packages**: `react-markdown`, `@vapi-ai/web`, `react-syntax-highlighter`, `serve`.