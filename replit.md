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
- **Real-time Features**: Integrated real-time activity feed using Server-Sent Events (SSE) for initial load and streaming, with de-duplication, display limits, and auto-reconnection.
- **Authentication Flow**: Frontend interacts with a Python FastAPI Proxy (`api.airthreads.ai`) which then communicates with MCP (Model Context Protocol) servers for Gmail/Calendar. The proxy handles HTTP-only cookies (`userIDHash`, `gmailHashID`, `calendarHashID`) for secure session management, with all requests using `credentials: 'include'`.

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

## External Dependencies
- **Vapi AI**: Used for voice integration via `REACT_APP_VAPI_API_KEY` and `REACT_APP_VAPI_ASSISTANT_ID`.
- **Google API Services**: Integration with Gmail and Google Calendar.
- **Notion API**: Planned integration (coming soon).
- **Backend APIs**: Relies on external backend services for Gmail, Calendar, and AI agent functionalities (`REACT_APP_GMAIL_API_URL`, `REACT_APP_CALENDAR_API_URL`, `REACT_APP_AGENT_API_URL`).
- **OAuth2**: Uses an OAuth callback URL (`REACT_APP_OAUTH_CALLBACK_URL`) for authentication.
- **NPM Packages**: `react-markdown`, `@vapi-ai/web`, `react-syntax-highlighter`, `serve` (for deployment).