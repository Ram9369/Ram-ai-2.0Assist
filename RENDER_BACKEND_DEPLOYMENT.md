# Backend Deployment on Render

## Step-by-Step Guide

### Prerequisites
1. GitHub account with repository pushed
2. Render account (free) - https://render.com
3. Google Gemini API Key - https://ai.google.dev

---

## Deployment Steps

### Step 1: Prepare Environment Variables

Ensure your backend `.env` file has these variables:
```
GEMINI_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Step 2: Deploy to Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository: `Ram9369/Ram1_Chat_Assis`
5. Fill in the form:
   - **Name**: `chatbot-ai-backend` (or your choice)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free (can upgrade later)

### Step 3: Add Environment Variables

1. Scroll down to **"Environment Variables"**
2. Add the following:

| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Your Vercel frontend URL (e.g., `https://your-app.vercel.app`) |

3. Click **"Create Web Service"**

### Step 4: Wait for Deployment

- Render will auto-build and deploy
- Takes 2-5 minutes
- You'll see a live URL like `https://chatbot-ai-backend.onrender.com`

✅ Your backend is now live!

---

## Update Frontend Environment Variable

1. Go to **Vercel Dashboard**
2. Select your frontend project
3. Go to **Settings → Environment Variables**
4. Update `VITE_BACKEND_URL`:
   ```
   https://chatbot-ai-backend.onrender.com
   ```
5. Redeploy by clicking **Deployments → Redeploy**

---

## Update Backend CORS

Now that you have your Vercel frontend URL, update the backend:

1. In `backend/server.js`, the CORS is already configured to use `FRONTEND_URL` env variable
2. On Render dashboard, add the environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://your-app.vercel.app`

---

## Testing the Deployment

### Test Backend
```bash
curl https://chatbot-ai-backend.onrender.com
```

### Test Full Integration
1. Open your Vercel frontend URL
2. Type a message
3. Should get AI response from backend
4. Check browser console for any errors

---

## Important Notes

### Cold Starts
- Free tier on Render will spin down if inactive for 15 minutes
- First request will be slow (~30 seconds)
- Consider upgrading to paid for production use

### WebSocket Support
✅ Render supports WebSocket connections
✅ Socket.io will work perfectly

### Monitoring
- View logs in Render dashboard: **Logs** tab
- Check for connection errors or API issues

---

## Troubleshooting

### Issue: "Cannot GET /"
- This is normal - backend is an API, not a website
- Test with: `curl -I https://your-backend.onrender.com`
- Should return a response

### Issue: "Socket.io connection refused"
- Check `FRONTEND_URL` environment variable
- Verify CORS is configured correctly
- Check backend logs for errors

### Issue: "GEMINI_API_KEY not found"
- Add `GEMINI_API_KEY` to Render environment variables
- Restart the service in Render dashboard

### Issue: "Disconnected after 30s"
- Render free tier may have timeout issues
- Consider upgrading to paid tier
- Or deploy to Railway/Railway for better free tier

---

## Useful Render Commands

### View Live URL
Dashboard → Settings → Copy the URL

### View Logs
Dashboard → Logs tab (real-time streaming)

### Restart Service
Dashboard → Settings → Manual restart

### Update Environment Variables
Dashboard → Environment → Edit and redeploy

---

## Cost Estimation

| Tier | Price | Suitable For |
|------|-------|--------------|
| Free | $0/month | Development & testing |
| Starter | $7/month | Low-traffic apps |
| Standard | $12/month | Production |

---

## Next Steps

- ✅ Deploy backend to Render
- ✅ Get backend URL
- ✅ Update Vercel environment variables
- ✅ Test full integration
- ✅ Monitor errors and logs

---

## Quick Reference URLs

| Service | URL | Status |
|---------|-----|--------|
| Render Dashboard | https://dashboard.render.com | Backend hosting |
| Vercel Dashboard | https://vercel.com/dashboard | Frontend hosting |
| Backend API | https://your-backend.onrender.com | Live backend |
| Frontend App | https://your-app.vercel.app | Live app |

---

**Need help?** Check Render docs: https://render.com/docs
