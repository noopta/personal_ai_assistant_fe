# Lucius AI Assistant - Replit Environment

## Project Overview
Lucius AI Assistant is a React-based frontend for an AI-powered multi-app task manager. The application provides a chat interface for managing tasks and integrating with productivity tools like Gmail, Google Calendar, and Notion.

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

## Recent Changes
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
