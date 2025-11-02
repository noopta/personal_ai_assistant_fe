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
- 2025-11-02: Content and Feature Updates
  - **Landing Page Hero Text:** Changed hero title from "Financial infrastructure" to "AI-powered assistant to grow your productivity" to better reflect the app's purpose
  - **Notion Integration Status:** Added "Coming Soon" badges to Notion integration across Landing and Integrations pages since the feature is not yet available
    - Removed Notion from hero description (now only mentions Gmail and Google Calendar)
    - Added visual "Coming Soon" badge to Notion feature card on Landing page
    - Added "Coming Soon" badge to Notion integration header on Integrations page
    - Changed task example from "Created Notion documentation" to "Organized calendar events"
  - **Scroll Progress Indicator:** Created new ScrollProgress component that displays on the right side of the Landing page
    - Animated circular indicator that follows scroll position with gradient progress line
    - Includes pulsing animation effect on the indicator
    - Positioned 40px from right edge with smooth transitions
    - Auto-hides on mobile/tablet devices (max-width: 1024px)
    - Fixed division-by-zero bug for pages shorter than viewport height

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
