# Quick Start Guide - Chatbot-AI Integration

## 🎯 What Was Done

Your backend and frontend are now **fully integrated** with real-time Socket.io communication!

### Changes Summary:

**Backend (Node.js + Express)**
- ✅ Added CORS middleware for cross-origin requests
- ✅ Configured Socket.io with CORS for localhost connections
- ✅ Added npm scripts for easy startup
- ✅ Ready to receive messages from frontend

**Frontend (React + Vite)**
- ✅ Installed socket.io-client package
- ✅ Connected ChatScreen to backend via Socket.io
- ✅ Removed mock responses - now uses real AI responses
- ✅ Auto-reconnection with error handling

## 🚀 How to Run (Choose One)

### Option 1: Use the Quick Start Script
```bash
# In PowerShell, from project root
.\start.ps1
```
This will:
- Install any missing dependencies
- Start backend in one window
- Start frontend in another window
- Open both URLs automatically

### Option 2: Manual Start (Two Terminal Windows)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Will run on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Will run on http://localhost:5173
```

## ✨ Features

- 💬 Real-time chat with AI responses
- 🤖 Powered by Google Gemini AI
- 💾 Chat history saves to browser
- 🔄 Auto-reconnects if connection drops
- 📱 Responsive design (mobile friendly)
- ⚡ Fast and responsive interface

## 🧪 Test It

1. Open http://localhost:5173 in your browser
2. Type: "Hello! What is 2+2?"
3. Press Enter
4. Watch the AI respond in real-time

## 📋 File Structure

```
d:\Chatbot-Ai\
├── backend/
│   ├── server.js (updated - added CORS config)
│   ├── src/
│   │   ├── app.js (updated - added CORS)
│   │   └── service/
│   │       └── ai.service.js (Google Gemini integration)
│   ├── package.json (updated - added cors package + scripts)
│   └── .env (has GEMINI_API_KEY)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ChatScreen.jsx (updated - added Socket.io)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json (has socket.io-client)
│   └── vite.config.js
├── start.ps1 (quick start script)
├── INTEGRATION.md (detailed documentation)
└── SETUP.md (this file)
```

## 🔧 Configuration

**To change ports:**
- Backend: Edit `backend/server.js` line 43
- Frontend: Edit `frontend/vite.config.js`

**To add production URLs:**
- Edit `backend/server.js` CORS origin array (line 11-14)

## 🆘 Troubleshooting

**Chat not connecting?**
- Check if backend is running (should see "Server is running on port 3000")
- Check browser console (F12) for errors
- Ensure port 3000 is not blocked by firewall

**No AI responses?**
- Check `.env` has valid GEMINI_API_KEY
- Check backend console for errors
- Verify internet connection

**Port 5173 already in use?**
- Vite will auto-select port 5174, 5175, etc.
- Or kill existing process: `netstat -ano | findstr :5173`

## 📚 Next Steps

- Review `INTEGRATION.md` for detailed technical documentation
- Customize the UI colors/styles in `ChatScreen.jsx`
- Add more features like typing indicators, user presence, etc.
- Deploy to production with proper CORS configuration

---

**Ready?** Run `.\start.ps1` and start chatting! 🎉
