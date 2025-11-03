# AirThreads

AirThreads is a modern, AI-powered multi-app task manager that helps users manage tasks, connect productivity tools, and automate workflows through a beautiful, interactive chat interface.

## 🎯 What Problem Does It Solve?

**The Pain Point**: Managing multiple productivity tools (Gmail, Google Calendar, Notion) requires constant context switching and manual coordination. Users waste time jumping between applications to schedule meetings, check emails, and update tasks.

**The Solution**: AirThreads provides a unified chat interface where users can interact with all their productivity tools through natural language. Instead of opening multiple apps, you simply chat with the AI to manage your entire workflow.

## ✨ Key Benefits

- **🚀 Unified Workflow**: Manage Gmail, Google Calendar, and Notion from a single chat interface
- **⚡ Time Savings**: Automate repetitive tasks and reduce context switching
- **🤖 AI-Powered**: Natural language processing for intuitive task management
- **🔗 Seamless Integration**: Works with your existing productivity tools
- **🔒 Privacy-First**: Secure OAuth2 authentication with anonymous user IDs
- **💫 Modern UI**: High-tech, engaging interface with animations and dark mode

## 🛠️ Technical Architecture

### Core Technologies

**Frontend (React SPA)**
- **React 19.1.0** - Modern functional components with hooks
- **React Router DOM** - Client-side routing
- **CSS Modules** - Scoped, maintainable styling
- **React Markdown** - Rich text formatting in chat
- **Custom Animations** - Typewriter effects and loading animations

**Backend (Multi-Service Architecture)**
- **MCP (Model Context Protocol)** - AI agent communication framework
- **Node.js/Express** - API server for authentication and chat endpoints
- **Python Client** - MCP client for LLM interactions
- **Google APIs** - Gmail and Calendar integration via OAuth2
- **Redis** - Conversation history and session management

**Integration Layer**
- **OAuth2** - Secure authentication with Google services
- **REST APIs** - Communication between frontend and backend services
- **WebSocket-like Streaming** - Real-time chat responses

### Key Technical Concepts

1. **MCP (Model Context Protocol)**: Enables the AI agent to communicate with external services and tools in a standardized way
2. **LLM Integration**: Uses language models to process natural language requests and generate appropriate API calls
3. **Stateful Conversations**: Redis-based conversation history maintains context across user sessions
4. **Anonymous User Management**: Privacy-preserving user identification system
5. **Service Authentication**: OAuth2 flows for secure access to Google services

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16+ recommended)
- **Python** (3.8+ for MCP client)
- **Redis** (for conversation history)
- **Google Cloud Project** with OAuth2 credentials

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/multi-app-task-manager.git
   cd multi-app-task-manager
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up Google Calendar MCP Server**
   ```bash
   cd google-calendar-mcp
   npm install
   npm run build
   ```

4. **Set up Python MCP Client**
   ```bash
   cd python-client-mcp
   pip install -r requirements.txt  # (create based on mcpagent.py imports)
   ```

5. **Configure Google OAuth2**
   - Create a Google Cloud project
   - Enable Gmail and Calendar APIs
   - Create OAuth2 credentials
   - Place `gcp-oauth.keys.json` in both `google-calendar-mcp/` and `python-client-mcp/` directories

6. **Start the services**
   
   **Terminal 1 - Frontend:**
   ```bash
   npm start
   ```
   
   **Terminal 2 - Google Calendar MCP Server:**
   ```bash
   cd google-calendar-mcp
   npm start
   ```
   
   **Terminal 3 - Python MCP Client:**
   ```bash
   cd python-client-mcp
   python mcpagent.py
   ```

7. **Access the application**
   - Open http://localhost:3000
   - Navigate to the Product page to start chatting with the AI

## 🏗️ Project Structure

```
multi-app-task-manager/
├── src/                          # React frontend
│   ├── components/               # Reusable UI components
│   │   ├── ChatMessage.jsx      # Chat message display
│   │   ├── ChatInput.jsx        # Message input component
│   │   ├── AILoadingAnimation.jsx # Loading indicators
│   │   ├── AuthStatusIndicator.jsx # Service connection status
│   │   └── ...
│   ├── pages/                    # Main application pages
│   │   ├── LandingPage.jsx       # Marketing/intro page
│   │   ├── ProductPage.jsx       # Main chat interface
│   │   ├── IntegrationsPage.jsx  # Service integrations
│   │   └── ...
│   ├── contexts/                 # React context providers
│   └── assets/                   # Static assets and icons
├── google-calendar-mcp/          # Google Calendar MCP Server
│   ├── src/
│   │   ├── handlers/             # API request handlers
│   │   ├── auth/                 # OAuth2 authentication
│   │   └── schemas/              # Type definitions
│   └── build/                    # Compiled TypeScript
├── python-client-mcp/            # Python MCP Client
│   ├── mcpagent.py              # Main MCP agent with Redis
│   └── main.py                  # Entry point
└── public/                       # Static frontend assets
```

## 🔧 Usage Examples

**Schedule a Meeting:**
```
User: "Schedule a team meeting for tomorrow at 2 PM"
AI: "✅ I've scheduled 'Team Meeting' for tomorrow at 2:00 PM and sent calendar invites to all team members via Gmail."
```

**Check Email:**
```
User: "Do I have any important emails?"
AI: "📧 You have 3 unread emails. The most important is from your manager about the project deadline..."
```

**Multi-Service Task:**
```
User: "Create a meeting about the Q4 review and email the team about it"
AI: "✅ Created calendar event 'Q4 Review Meeting' for Friday at 10 AM and sent notification email to the team."
```

## 🔐 Security & Privacy

- **Anonymous User IDs**: Users are identified by random hashes, never exposing personal information
- **OAuth2 Security**: Secure token-based authentication with Google services
- **Local Storage**: Sensitive data stays on the user's device
- **No Data Persistence**: Conversation history is managed securely in Redis with expiration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**AirThreads** - Transforming productivity through intelligent automation! 🚀
