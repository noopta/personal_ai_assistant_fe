# AirThreads - Replit Environment

## Overview
AirThreads is an AI-powered productivity assistant designed to streamline task management and integrate with essential tools like Gmail, Google Calendar, and Notion (upcoming). It offers a chat interface available as a React web application and a native iOS app, aiming to enhance user productivity through intelligent assistance, a modern UI/UX, and robust backend integration. The project focuses on providing a seamless cross-platform experience.

## User Preferences
I prefer iterative development, with a focus on clear, concise communication. Please ask before making major architectural changes or introducing new dependencies. I value detailed explanations, especially for complex features or decisions. Do not make changes to the `ios-app` folder.

## System Architecture

### UI/UX Decisions
The application features a Stripe-inspired UI with a global design system including:
- **Color Scheme**: Navy blue, cornflower purple accent, and light backgrounds.
- **Theming**: Comprehensive theme variables for light/dark mode with flash prevention.
- **Animations**: Animated mesh gradient background, scroll-triggered fade-ins, card-based UI with hover effects, and button micro-interactions.
- **Mobile Responsiveness**: Mobile-first design ensuring typography accessibility (13px min on mobile), touch target compliance (44px min), and optimized layouts for various breakpoints (390px, 430px, 540px, 768px) without overflow.
- **Activity Feed UI**: Dynamic activity count badges, clean empty states, smooth animations, and enhanced hover effects.

### Technical Implementations
- **Frontend**: React 19.1.0 (Create React App), React Router DOM 7.6.2, custom CSS Modules, `react-markdown`, `react-syntax-highlighter`, and `@vapi-ai/web` for voice integration.
- **iOS App**: Native SwiftUI application mirroring web features and design.
- **Development Environment**: Replit configured with frontend on port 5000, host `0.0.0.0`, and disabled host check.
- **Endpoint Architecture**: Frontend communicates directly with backend services:
  - Direct MCP Servers: Gmail (`https://api.airthreads.ai:4008`) and Calendar (`https://api.airthreads.ai:4010`) for authentication.
  - Python API Server (Port 5001): Session, activity, vapi-session, agent, and feedback endpoints (no `/api/` prefix).
  - All requests use `credentials: 'include'` for secure cookie handling.

### Feature Specifications
- **Core Functionality**: AI-powered chat interface for task management and service integration.
- **Productivity Tools**: Integrations with Gmail, Google Calendar, and Notion (upcoming).
- **User Interface**: Landing, Product (Chat), Integrations, and About pages with consistent design.
- **Voice Integration**: Vapi AI for voice-powered interactions.
- **Activity Stream**: Displays real-time activities from integrated services (e.g., Gmail send/delete/modify, Calendar create/update/delete).
- **Beta Testing Feedback System**: Floating button, tabbed modal (General, Landing, Product, Integrations, About), localStorage persistence, and success notifications.
- **Integrations Page**: Simplified 3-step setup for Gmail and Google Calendar with capabilities-based display.
- **Environment Variables**: API keys managed as encrypted Replit Secrets (e.g., `REACT_APP_VAPI_API_KEY`).
- **Security & Trust**: Implemented a new section on the landing page detailing OAuth 2.0, AES-256-GCM encryption, minimal data retention, GDPR & CCPA compliance, and compliance badges (OpenAI, Vapi Voice HIPAA, Google APIs OAuth 2.0 Verified).

### System Design Choices
- **Frontend-Only Repository**: This repository exclusively contains the React frontend.
- **Backend Architecture (External)**: Python server, MCP servers for Gmail/Calendar, and Redis for session management.
- **Deployment**: Configured for Replit's autoscale deployment using `npm run build` and `npx serve -s build -l 5000`.

## External Dependencies
- **Vapi AI**: For voice integration.
- **Google API Services**: For Gmail and Google Calendar integrations.
- **Notion API**: Planned for future integration.
- **Backend APIs**: Custom Python server (port 5001) and MCP servers (ports 4008, 4010).
- **OAuth2**: For authentication flows.
- **NPM Packages**: `react-markdown`, `@vapi-ai/web`, `react-syntax-highlighter`, `serve`.