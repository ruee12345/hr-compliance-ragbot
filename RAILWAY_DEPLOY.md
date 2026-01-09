# Railway Deployment Guide

## Step 1: Sign Up for Railway

1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Sign up with GitHub (easiest way)

## Step 2: Deploy Backend

1. **Click "New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: `ruee12345/hr-compliance-ragbot`
4. Railway will auto-detect it's a Python app

## Step 3: Configure Service

Railway should auto-detect most settings, but verify:

1. **Root Directory**: 
   - Click on your service
   - Go to **Settings** → **Service**
   - Set **Root Directory**: `backend`

2. **Build Command** (should auto-detect):
   ```
   pip install -r requirements.txt
   ```

3. **Start Command**:
   - Go to **Settings** → **Deploy**
   - Set **Custom Start Command**:
   ```
   gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
   ```

## Step 4: Add Environment Variables

1. Go to **Variables** tab
2. Click **"+ New Variable"** for each:

```
VOYAGE_API_KEY=pa-iznSYTT-ntR0a_wgXP29udIem0x9WvVt0U6cKb6BAFX
GROQ_API_KEY=your-groq-api-key-here
SECRET_KEY=hr-bot-2024-production-key-divesh-secure-xyz789
DEBUG=false
FRONTEND_URL=https://hr-compliance-rag-bot.vercel.app
UPLOAD_FOLDER=./data/documents
VECTOR_STORE_PATH=./data/vector_store
PYTHON_VERSION=3.11.0
```

**Important:** Get your Groq API key from https://console.groq.com

## Step 5: Deploy!

1. Click **"Deploy"**
2. Wait for build to complete (~5 minutes)
3. Railway will give you a URL like: `https://your-app.up.railway.app`

## Step 6: Get Your Backend URL

1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy your Railway URL (e.g., `https://hr-compliance-ragbot-production.up.railway.app`)

## Step 7: Update Frontend

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_API_URL` to your Railway URL
3. Redeploy frontend

## Step 8: Update CORS

1. Go back to Railway → Variables
2. Update `FRONTEND_URL` to your Vercel URL
3. Redeploy (Railway auto-redeploys on variable change)

## Verify Deployment

Test your backend:
```
https://your-app.up.railway.app/health
```

Should return: `{"status": "healthy"}`

---

## Railway Free Tier

- **$5 free credit/month**
- **512 MB RAM** (same as Render, but with credits)
- **100 GB bandwidth**
- **No sleep** (unlike Render)

Your app should use ~$3-4/month, so you'll have free usage!

---

## Troubleshooting

### If deployment fails:

1. **Check Logs**: Railway → Deployments → Click on deployment → View Logs
2. **Memory issues**: Railway has same 512 MB as Render, but better management
3. **Build errors**: Check that root directory is set to `backend`

### Common Issues:

- **"No module named 'app'"**: Root directory not set correctly
- **Port binding error**: Make sure start command uses `$PORT`
- **Out of memory**: Contact me, we'll optimize further

---

## Next Steps After Deployment

1. ✅ Backend deployed on Railway
2. ✅ Frontend deployed on Vercel
3. ✅ Environment variables configured
4. ✅ CORS updated
5. 🎉 Test your app end-to-end!

**Your app will be live at:**
- Frontend: `https://hr-compliance-rag-bot.vercel.app`
- Backend: `https://your-app.up.railway.app`
