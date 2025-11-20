# AirThreads - Replit Environment

## Overview
AirThreads is a cross-platform AI-powered productivity assistant designed to streamline task management and integrate with essential productivity tools. Available as a React web application and a native iOS app, its core purpose is to provide a chat interface for users to interact with services like Gmail, Google Calendar, and Notion (upcoming). The project aims to enhance user productivity through intelligent assistance, offering a seamless experience across devices with a focus on modern UI/UX and robust backend integration.

## User Preferences
I prefer iterative development, with a focus on clear, concise communication. Please ask before making major architectural changes or introducing new dependencies. I value detailed explanations, especially for complex features or decisions. Do not make changes to the `ios-app` folder.

## System Architecture

### UI/UX Decisions
**Landing Page**: Glassmorphic design with a purple-to-blue gradient background, featuring five 3D floating cards with backdrop-filter blur, scattered arrangement using perspective transforms, and subtle floating animations. It includes a two-column hero layout, soft bubble elements, and proper z-index layering. The landing page also supports light/dark mode, 9 color palette variants, and 7 animated hero backgrounds.

**Interior Pages**: Minimalist, artistic aesthetic inspired by Blade Runner 2049, emphasizing sophistication, cleanliness, and atmosphere. Key elements include:
- **Color Palette**: Muted dark grays with subtle orange/amber accents.
- **Typography**: Clean sans-serif fonts with excellent hierarchy and spacing.
- **Visual Style**: Atmospheric gradients, subtle particle effects, and simple geometric elements.
- **UI Components**: Minimal cards, clean buttons, and subtle accent lines.
- **Animations**: Minimal motion design limited to fade-in, slide-up, and subtle-glow effects.
- **Layout Philosophy**: Emphasis on whitespace, typography hierarchy, and clean geometric composition.
- **Mobile Responsiveness**: Comprehensive responsive design (13px minimum font, 44px minimum touch targets).

### Technical Implementations
The frontend uses React 19.1.0 (Create React App) with React Router DOM, custom CSS Modules, `react-markdown`, and `react-syntax-highlighter`. `@vapi-ai/web` is integrated for voice capabilities. An iOS app uses SwiftUI for feature parity. The Replit environment runs the frontend on port 5000. Real-time features use Server-Sent Events (SSE) for an activity feed, including de-duplication, display limits, and robust auto-reconnection with exponential backoff. Authentication leverages a Python FastAPI Proxy for secure session management via HTTP-only cookies (`userIDHash`, `gmailHashID`, `calendarHashID`).

### Feature Specifications
Core functionality is a chat interface for task management, integrating with Gmail, Google Calendar, and Notion (upcoming). The UI includes Landing, Product (Chat), Integrations, and About pages, all adhering to a consistent minimalist design. Vapi AI enables voice-powered interactions. The activity stream displays real-time updates from integrated services, showing various activity types. All API keys and endpoints are managed securely as encrypted Replit Secrets.

### System Design Choices
This repository is for the React frontend. The backend, external to this repository, includes a Node.js/Express API server, a Python MCP client, a Google Calendar MCP server, and Redis for session management. The frontend is designed to be functional with placeholder content until backend services are integrated. Deployment is configured for Replit's autoscale deployment.

## External Dependencies
- **Vapi AI**: For voice integration.
- **Google API Services**: For integration with Gmail and Google Calendar.
- **Notion API**: Planned for future integration.
- **Backend APIs**: External services for Gmail, Calendar, and AI agent functionalities.
- **OAuth2**: For user authentication.
- **NPM Packages**: `react-markdown`, `@vapi-ai/web`, `react-syntax-highlighter`, `serve`.