# Vercel Deployment Guide

## Overview
This guide walks you through deploying the **Frontend** on Vercel. The backend (Node.js/Express with Socket.io) requires a separate hosting solution due to WebSocket compatibility.

---

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Backend Deployed**: Deploy backend separately (see Backend Deployment section)

---

## Frontend Deployment on Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Project"**
3. Select your repository: `Ram9369/Ram1_Chat_Assis`
4. Click **"Import"**

### Step 3: Configure Build Settings

The form should auto-detect these settings:
- **Framework Preset**: React
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables

1. In the deployment form, scroll to **"Environment Variables"**
2. Add the backend URL:
   - **Name**: `VITE_BACKEND_URL`
   - **Value**: `YOUR_BACKEND_URL` (e.g., `https://your-backend.com`)

**Note**: Replace `YOUR_BACKEND_URL` with your actual backend deployment URL.

### Step 5: Deploy
Click **"Deploy"** and wait for the build to complete (~2-5 minutes).

✅ Your frontend will be live at `https://[your-project-name].vercel.app`

---

## Backend Deployment Options

Since Vercel doesn't support long-running WebSocket connections, deploy the backend to:

### Option 1: Railway (Recommended for Node.js)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Set environment variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `PORT`: 3000 (Railway assigns this automatically)
4. Deploy

### Option 2: Render
1. Go to [render.com](https://render.com)
2. Click **"New Web Service"**
3. Connect your GitHub repository
4. Set **Start Command**: `cd backend && npm start`
5. Add environment variables
6. Deploy

### Option 3: Heroku (with credits)
1. Install Heroku CLI
2. Connect to your repo: `heroku create your-app-name`
3. Set environment variables: `heroku config:set GEMINI_API_KEY=your-key`
4. Deploy: `git push heroku main`

---

## Update Frontend After Backend Deployment

Once your backend is deployed:

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings → Environment Variables**
4. Update `VITE_BACKEND_URL` with your backend's deployed URL
5. Redeploy (Settings → Deployments → Redeploy)

---

## Environment Variables Needed

### Frontend (`VITE_BACKEND_URL`)
- **Development**: `http://localhost:3000`
- **Production**: Your deployed backend URL (e.g., `https://chatbot-api.railway.app`)

### Backend (`.env` file)
```
GEMINI_API_KEY=your_google_gemini_api_key
PORT=3000
```

---

## Verify Deployment

1. Visit your Vercel frontend URL
2. Type a message in the chat
3. Check if you receive AI responses from the backend
4. If no response:
   - Check browser console (F12) for errors
   - Verify `VITE_BACKEND_URL` environment variable
   - Ensure backend is running and accessible

---

## Troubleshooting

### Issue: "Cannot connect to backend"
- ✅ Verify backend URL is correct in Vercel environment variables
- ✅ Check if backend is running and accessible
- ✅ Ensure CORS is configured on backend

### Issue: "Build fails on Vercel"
- ✅ Check build logs in Vercel dashboard
- ✅ Ensure `package.json` scripts are correct
- ✅ Try building locally: `npm run build`

### Issue: "CORS errors"
- ✅ Backend's CORS origin should include your Vercel URL
- ✅ Update `backend/server.js` line 12-14 with frontend URL

---

## Update CORS for Production

Edit `backend/server.js`:
```javascript
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://[your-vercel-project].vercel.app"  // Add this
    ],
    methods: ["GET", "POST"]
  }
});
```

---

## Git Commands to Deploy

```bash
# Stage all changes
git add .

# Commit
git commit -m "Configure Vercel deployment"

# Push to GitHub
git push origin main

# Vercel will auto-deploy from main branch
```

---

## Quick Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Vercel | https://vercel.com | Frontend hosting |
| Railway | https://railway.app | Backend hosting |
| GitHub | https://github.com | Repository |
| Google Gemini | https://ai.google.dev | AI API |

---

## Next Steps

1. ✅ Deploy frontend to Vercel
2. ✅ Deploy backend to Railway/Render
3. ✅ Update environment variables
4. ✅ Test the full application
5. ✅ Monitor logs and errors

---

**Questions?** Check the Vercel docs: https://vercel.com/docs
