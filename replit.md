# AirThreads - Replit Environment

## Overview
AirThreads is a cross-platform AI-powered productivity assistant designed to streamline task management and integrate with essential productivity tools. Available as a React web application and a native iOS app, its core purpose is to provide a chat interface for users to interact with services like Gmail, Google Calendar, and Notion (upcoming). The project aims to enhance user productivity through intelligent assistance, offering a seamless experience across devices with a focus on modern UI/UX and robust backend integration.

## User Preferences
I prefer iterative development, with a focus on clear, concise communication. Please ask before making major architectural changes or introducing new dependencies. I value detailed explanations, especially for complex features or decisions. Do not make changes to the `ios-app` folder.

## System Architecture

### UI/UX Decisions
The application features a complete cyberpunk terminal aesthetic across all pages, characterized by a futuristic neon design system. This includes a pure black background with neon cyan, magenta, yellow, and green accents. Typography uses monospace terminal fonts. The design incorporates matrix-style binary rain backgrounds, grid overlays, scanline effects, glitch animations, holographic glows, and angular clip-path designs. Animations include glitch effects, scanline overlays, neon-pulse, terminal cursor blink, holographic color shifts, and float effects. Terminal aesthetics are pervasive, with UI elements resembling command-line interfaces. Mobile responsiveness is comprehensive, ensuring accessibility and optimized layouts while maintaining the cyberpunk theme.

### Technical Implementations
The frontend is built with React 19.1.0 (Create React App), utilizing React Router DOM for routing, custom CSS Modules for styling, `react-markdown` for rich text, and `react-syntax-highlighter` for code display. `@vapi-ai/web` is integrated for voice capabilities. An iOS app is developed with SwiftUI for feature parity. The development environment is configured for Replit, with the frontend running on port 5000. Real-time features are implemented using Server-Sent Events (SSE) for an activity feed, including de-duplication, display limits, and robust auto-reconnection logic with exponential backoff. Authentication leverages a Python FastAPI Proxy that handles HTTP-only cookies (`userIDHash`, `gmailHashID`, `calendarHashID`) for secure session management, with all requests including credentials.

### Feature Specifications
Core functionality revolves around a chat interface for task management, integrating with Gmail, Google Calendar, and Notion (upcoming). The UI includes Landing, Product (Chat), Integrations, and About pages, all adhering to a consistent cyberpunk design. Vapi AI enables voice-powered interactions. The activity stream displays real-time updates from integrated services like Gmail and Calendar, showing various activity types (e.g., send, delete, modify). All API keys and endpoints are managed securely as encrypted Replit Secrets.

### System Design Choices
This repository is dedicated to the React frontend. The backend architecture, external to this repository, includes a Node.js/Express API server, a Python MCP client, a Google Calendar MCP server, and Redis for session management. The frontend is designed to be functional with placeholder content until these backend services are fully integrated. Deployment is configured for Replit's autoscale deployment.

## External Dependencies
- **Vapi AI**: For voice integration.
- **Google API Services**: For integration with Gmail and Google Calendar.
- **Notion API**: Planned for future integration.
- **Backend APIs**: External services for Gmail, Calendar, and AI agent functionalities.
- **OAuth2**: For user authentication.
- **NPM Packages**: `react-markdown`, `@vapi-ai/web`, `react-syntax-highlighter`, `serve`.