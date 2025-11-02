# Lucius AI - iOS App

A native iOS application for Lucius AI Assistant, recreating the web interface with SwiftUI.

## Overview

This iOS app provides a mobile-native experience for the Lucius AI productivity assistant, featuring:
- **Landing Page**: Hero section, features showcase, benefits, and CTA
- **Product Page**: Interactive chat interface for AI assistance
- **Integrations Page**: Gmail, Google Calendar, and Notion (Coming Soon) integrations
- **About Page**: Mission, vision, values, team, and technology stack
- **Dark/Light Mode**: Full theme support matching the web app's Stripe-inspired design

## Design System

### Colors
- **Primary Navy**: `#0A2540` - Main background color for dark theme
- **Accent Purple**: `#635BFF` - Primary action color, buttons, highlights
- **Light Backgrounds**: `#F6F9FC`, `#FFFFFF`
- **Dark Backgrounds**: Navy-based gradient

### Typography
- **Headings**: System font, bold weights (48px-72px)
- **Body**: System font, regular/medium weights (14px-18px)
- **Buttons**: Semibold weight, 16px

## Project Structure

```
ios-app/
└── LuciusAI/
    ├── LuciusAIApp.swift              # Main app entry point
    ├── ContentView.swift              # Navigation and tab bar
    ├── Theme/
    │   ├── Colors.swift               # Color palette
    │   └── ThemeManager.swift         # Theme state management
    ├── Views/
    │   ├── Landing/
    │   │   └── LandingView.swift      # Home/Landing page
    │   ├── Product/
    │   │   └── ProductView.swift      # Chat interface
    │   ├── Integrations/
    │   │   └── IntegrationsView.swift # Integration cards
    │   └── About/
    │       └── AboutView.swift        # About page
    └── Components/
        ├── PrimaryButton.swift        # Button components
        └── FeatureCard.swift          # Feature card component
```

## Features

### Current Implementation
- ✅ **Complete UI Recreation**: All pages from the web app
- ✅ **Stripe-Inspired Design**: Navy & purple color scheme, modern styling
- ✅ **Dark/Light Mode**: Full theme support with toggle
- ✅ **Responsive Layout**: Adapts to different iOS device sizes
- ✅ **Smooth Animations**: Scale effects, transitions, and micro-interactions
- ✅ **Chat Interface**: Placeholder chat UI with simulated responses
- ✅ **"Coming Soon" Badges**: Notion integration marked appropriately

### Backend Integration (Coming Soon)
- ⏳ API endpoint connections
- ⏳ Real chat functionality
- ⏳ OAuth integration flows
- ⏳ User authentication
- ⏳ Data persistence

## Running the App

### Prerequisites
- macOS with Xcode 14+ installed
- iOS 16.0+ deployment target
- Swift 5.8+

### Steps to Run

1. **Open in Xcode**:
   ```bash
   cd ios-app
   open -a Xcode LuciusAI
   ```

2. **Select a Simulator or Device**:
   - Click on the device selector in the top toolbar
   - Choose an iPhone simulator (iPhone 14, iPhone 15, etc.)

3. **Build and Run**:
   - Press `⌘ + R` or click the Play button
   - Wait for the build to complete
   - The app will launch in the simulator

### Alternative: Command Line Build

```bash
# Navigate to project directory
cd ios-app

# Build the project
xcodebuild -scheme LuciusAI -destination 'platform=iOS Simulator,name=iPhone 15' build

# Run the app (after building)
open -a Simulator
xcrun simctl install booted <path-to-built-app>
xcrun simctl launch booted com.luciusai.app
```

## Development Notes

### No Backend Required (Yet)
The app is currently UI-only and does not require backend services to run. All interactions are simulated:
- Chat messages show placeholder responses
- Integration cards are display-only
- Navigation works fully offline

### Future Backend Integration
When ready to connect to the backend API:
1. Update `ProductView.swift` to make real API calls instead of simulated responses
2. Implement OAuth flows for Gmail and Calendar in `IntegrationsView.swift`
3. Add authentication/session management
4. Connect to the same Node.js backend as the web app

## File Organization

- **Theme/**: All styling, colors, and theme management
- **Views/**: One directory per main page
- **Components/**: Reusable UI components shared across views
- Each view is self-contained with its own subcomponents

## Customization

### Changing Colors
Edit `Theme/Colors.swift` to modify the color palette.

### Adding New Views
1. Create a new file in `Views/YourFeature/`
2. Add navigation logic in `ContentView.swift`
3. Import and use theme colors for consistency

### Modifying Components
Reusable components are in `Components/`. Update these to change appearance across all pages.

## Testing

Currently no automated tests. Manual testing checklist:
- ✅ All pages load correctly
- ✅ Navigation between tabs works
- ✅ Theme toggle switches dark/light mode
- ✅ Chat interface accepts and displays messages
- ✅ Buttons have proper hover/press states
- ✅ Cards and layouts are responsive

## Contributing

When the backend is ready:
1. API integration in `ProductView` for real chat
2. OAuth implementation for integrations
3. User session management
4. Data caching and offline support

## License

Same as the web application - proprietary to Lucius AI.

## Support

For questions or issues with the iOS app, contact the development team.
