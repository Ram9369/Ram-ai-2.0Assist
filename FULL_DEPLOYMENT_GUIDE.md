# Complete Deployment Guide - Vercel + Render

## 🚀 Overview

This guide covers **full-stack deployment**:
- **Frontend**: React app on Vercel
- **Backend**: Node.js API on Render

Both will be connected via Socket.io WebSocket connection.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Your Users                                │
└──────────────┬──────────────────────────────────────────────┘
               │
               │ HTTPS
               ▼
┌──────────────────────────────┐
│   Vercel Frontend            │
│  (React + Vite)              │
│  https://app.vercel.app      │
└──────────────┬───────────────┘
               │ WebSocket
               │
               ▼
┌──────────────────────────────┐
│   Render Backend             │
│  (Node.js + Socket.io)       │
│  https://api.onrender.com    │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│   Google Gemini AI API       │
│  (AI responses)              │
└──────────────────────────────┘
```

---

## Deployment Checklist

- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Render
- [ ] Environment variables configured
- [ ] CORS configured
- [ ] WebSocket connection working
- [ ] AI responses working
- [ ] Full integration tested

---

## Step 1: Deploy Frontend on Vercel

### 1.1 Push to GitHub
```bash
cd d:\Chatbot-Ai
git add .
git commit -m "Prepare for full-stack deployment"
git push origin main
```

### 1.2 Create Vercel Project
1. Go to https://vercel.com/new
2. Select **Import Project**
3. Enter repository: `Ram9369/Ram1_Chat_Assis`
4. Click **Import**

### 1.3 Configure Build Settings
- **Framework**: React
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`

### 1.4 Add Environment Variables
- **Key**: `VITE_BACKEND_URL`
- **Value**: (leave empty for now, we'll update after deploying backend)

### 1.5 Deploy
Click **Deploy** and wait 2-5 minutes.

✅ **Frontend URL**: `https://your-project.vercel.app`

---

## Step 2: Deploy Backend on Render

### 2.1 Create Render Project
1. Go to https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Connect GitHub if needed
4. Select repository: `Ram9369/Ram1_Chat_Assis`
5. Configure:
   - **Name**: `chatbot-ai-backend`
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

### 2.2 Add Environment Variables
Add these variables in Render:

| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Your Vercel URL (e.g., `https://your-project.vercel.app`) |

### 2.3 Deploy
Click **Create Web Service** and wait 2-5 minutes.

✅ **Backend URL**: `https://chatbot-ai-backend.onrender.com`

---

## Step 3: Connect Frontend to Backend

### 3.1 Update Vercel Environment Variable
1. Go to Vercel Dashboard
2. Select your frontend project
3. **Settings** → **Environment Variables**
4. Update `VITE_BACKEND_URL`:
   ```
   https://chatbot-ai-backend.onrender.com
   ```
5. Click **Settings** → **Deployments** → **Redeploy Latest**

### 3.2 Update Backend CORS
Backend already configured! The `FRONTEND_URL` environment variable handles CORS.

---

## Step 4: Test Integration

### 4.1 Test Frontend
1. Open https://your-project.vercel.app
2. You should see the chat interface

### 4.2 Test Backend Connection
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. You should see: **"Connected to backend server"**

### 4.3 Test Full Chat
1. Type a message: "Hello"
2. Press Enter
3. Should receive AI response within a few seconds
4. No console errors

✅ If all above work → **Full deployment successful!**

---

## Verify Deployment

### Check Frontend
```bash
curl https://your-project.vercel.app/index.html
# Should return HTML
```

### Check Backend
```bash
curl https://chatbot-ai-backend.onrender.com
# Will show "Cannot GET /" - that's fine, API is running
```

### Check Logs
- **Frontend**: Vercel Dashboard → Deployments → View logs
- **Backend**: Render Dashboard → Logs → View live logs

---

## Environment Variables Summary

### Frontend (Vercel)
```
VITE_BACKEND_URL=https://chatbot-ai-backend.onrender.com
```

### Backend (Render)
```
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=production
FRONTEND_URL=https://your-project.vercel.app
```

---

## Troubleshooting

### Issue: "Cannot connect to backend"

**Solution**:
1. Check `VITE_BACKEND_URL` in Vercel
2. Verify backend is running on Render
3. Check browser console for exact error
4. Ensure CORS is configured

### Issue: "No AI responses"

**Solution**:
1. Check `GEMINI_API_KEY` on Render
2. Open backend logs: Render Dashboard → Logs
3. Verify internet connection
4. Check Google Gemini API status

### Issue: "Backend 502 error"

**Solution**:
1. Check backend logs on Render
2. Verify Node version compatibility
3. Try restarting the service
4. Check `package.json` dependencies

### Issue: "Frontend shows old data after redeploy"

**Solution**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh page (Ctrl+F5)
3. Check deployment was successful in Vercel

---

## Monitoring & Logs

### View Frontend Logs (Vercel)
1. Dashboard → Project → Deployments
2. Select latest deployment
3. View **Logs** tab

### View Backend Logs (Render)
1. Dashboard → Backend Service
2. Click **Logs** tab (real-time streaming)

### Common Log Messages
```
"Connected to backend server" → Good ✅
"Disconnected from backend server" → Check backend
"CORS error" → Update FRONTEND_URL
"Cannot find module" → Missing dependency
```

---

## Performance Tips

### Frontend (Vercel)
- Pre-built and cached globally
- CDN distribution worldwide
- No action needed ✅

### Backend (Render)
- Free tier spins down after 15 minutes
- First request takes ~30 seconds (cold start)
- Consider upgrading for production

### Optimization
- Enable caching on Render
- Use paid tier if expecting frequent requests
- Monitor error rates in logs

---

## Security Checklist

- ✅ CORS configured only for your frontend
- ✅ GEMINI_API_KEY is environment variable (not in code)
- ✅ NODE_ENV set to production
- ✅ HTTPS enabled on both services
- ✅ Socket.io credentials enabled

---

## Update & Redeploy

### Frontend Changes
```bash
git add .
git commit -m "Update frontend"
git push origin main
# Vercel auto-deploys
```

### Backend Changes
```bash
git add .
git commit -m "Update backend"
git push origin main
# Render auto-deploys
```

---

## Useful Links

| Service | Dashboard | Docs |
|---------|-----------|------|
| Vercel | https://vercel.com/dashboard | https://vercel.com/docs |
| Render | https://dashboard.render.com | https://render.com/docs |
| Google Gemini | https://ai.google.dev | https://ai.google.dev/docs |
| GitHub | https://github.com | https://docs.github.com |

---

## Support Resources

- Vercel: https://vercel.com/help
- Render: https://render.com/docs
- Socket.io: https://socket.io/docs/
- Google Gemini: https://ai.google.dev/docs

---

## Success! 🎉

Your full-stack application is now deployed and accessible worldwide!

- **Frontend**: https://your-project.vercel.app
- **Backend**: https://chatbot-ai-backend.onrender.com
- **Chat Interface**: https://your-project.vercel.app

Share the frontend URL with users - they can start chatting with AI!
