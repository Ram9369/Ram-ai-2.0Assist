# Backend-Frontend Integration

## Overview
The Chatbot-AI application is now fully integrated with real-time Socket.io communication between the React frontend and Express backend.

## Architecture

### Backend (d:\Chatbot-Ai\backend)
- **Framework**: Express.js + Socket.io
- **Port**: 3000
- **Features**:
  - Accepts WebSocket connections from frontend
  - Listens for 'ai-message' events
  - Integrates with Google Gemini AI API
  - Returns 'ai-response' with AI-generated text

### Frontend (d:\Chatbot-Ai\frontend)
- **Framework**: React 19 + Vite
- **Port**: 5173 (default Vite port)
- **Features**:
  - Real-time Socket.io client connection
  - Beautiful chat UI with Tailwind CSS
  - Auto-reconnection with exponential backoff
  - Local storage for chat history persistence

## Getting Started

### 1. Start the Backend Server
```bash
cd backend
npm start
# or use: npm run dev
```
The server will listen on http://localhost:3000

### 2. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will be available at http://localhost:5173

### 3. Test the Integration
1. Open the frontend in your browser (http://localhost:5173)
2. Type a message in the chat input
3. Press Enter or click Send
4. The message will be sent to the backend via Socket.io
5. Backend will process it through Google Gemini AI
6. Response will appear in the chat

## Key Changes Made

### Backend Updates
- Added CORS middleware to `src/app.js`
- Configured Socket.io with CORS for frontend connections
- Added npm scripts: `start` and `dev`
- Added `cors` package dependency

### Frontend Updates
- Installed `socket.io-client` package
- Integrated Socket.io connection in ChatScreen component
- Replaced mock responses with real backend communication
- Implemented auto-reconnection logic
- Added error handling for connection failures

## CORS Configuration
The backend is configured to accept connections from:
- http://localhost:5173 (development frontend)
- http://localhost:3000 (local requests)

To add production URLs, update the `cors` option in `backend/server.js`:
```javascript
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000", "YOUR_PRODUCTION_URL"],
    methods: ["GET", "POST"]
  }
})
```

## Environment Variables
Ensure `backend/.env` contains your Google Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

## Features
✅ Real-time messaging via Socket.io
✅ AI-powered responses using Google Gemini
✅ Chat history persistence (localStorage)
✅ Automatic reconnection
✅ Beautiful responsive UI
✅ Message timestamps and copy functionality
✅ Loading indicators
✅ Clear chat history option

## Troubleshooting

### Connection Failed
- Ensure backend is running on port 3000
- Check browser console for connection errors
- Verify CORS configuration in backend/server.js

### No AI Response
- Check that GEMINI_API_KEY is set in backend/.env
- Verify Google Gemini API is accessible
- Check backend console for error messages

### Chat History Not Saving
- Ensure localStorage is enabled in browser
- Check browser storage quota
- Look for console errors related to JSON parsing
