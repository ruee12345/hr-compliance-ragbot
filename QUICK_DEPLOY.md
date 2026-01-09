# Quick Deployment Steps

## Prerequisites
✅ Backend dependencies fixed and installing
✅ Frontend dependencies installed (npm install completed)
✅ All deployment configuration files created

## Step 1: Push to GitHub

```bash
# From the project root
cd /Users/divesh/Downloads/hr-compliance-rag-bot-main

# Initialize git (if not already done)
git init
git add .
git commit -m "Add deployment configuration for Vercel and Render"

# Create repository on GitHub, then:
git remote add origin https://github.com/ruee12345/hr-compliance-ragbot.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Render

1. Go to https://dashboard.render.com/
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `hr-compliance-rag-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`

5. **Environment Variables** (click Advanced):
   ```
   VOYAGE_API_KEY=pa-iznSYTT-ntR0a_wgXP29udIem0x9WvVt0U6cKb6BAFX
   SECRET_KEY=hr-bot-2024-production-key-divesh-secure-xyz789
   DEBUG=false
   FRONTEND_URL=https://hr-compliance-rag-bot.vercel.app
   UPLOAD_FOLDER=./data/documents
   VECTOR_STORE_PATH=./data/vector_store
   ```

6. Click **Create Web Service**
7. **Copy your backend URL** (e.g., `https://hr-compliance-rag-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI if not installed
npm install -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Follow prompts:
# - Set up and deploy: Yes
# - Which scope: Your account
# - Link to existing project: No
# - Project name: hr-compliance-rag-bot
# - Directory: ./
# - Override settings: No

# Add environment variable
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://hr-compliance-rag-backend.onrender.com

# Deploy to production
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. **Environment Variables**:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://hr-compliance-rag-backend.onrender.com` (your Render URL)

6. Click **Deploy**

## Step 4: Update Backend CORS

After Vercel deployment completes:

1. Go to Render Dashboard → Your Service → Environment
2. Update `FRONTEND_URL` to your Vercel URL (e.g., `https://your-app.vercel.app`)
3. Save (this will trigger a redeploy)

## Step 5: Verify Deployment

### Backend Health Check
Visit: `https://your-backend.onrender.com/health`

Expected: `{"status": "healthy"}`

### Frontend
Visit: `https://your-app.vercel.app`

Should see the login page

### End-to-End Test
1. Log in to the application
2. Go to Admin → Upload
3. Upload a test PDF
4. Go to Employee → Chat
5. Ask a question about the document
6. Verify you get a response with sources

## Troubleshooting

### CORS Errors
- Verify `FRONTEND_URL` on Render matches your Vercel URL exactly
- No trailing slash
- Redeploy backend after changing

### Backend Slow/502 Errors
- Free tier Render services sleep after 15 min inactivity
- First request may take 30-60 seconds
- This is normal for free tier

### Build Failures
- Check logs in Render/Vercel dashboard
- Verify all environment variables are set
- Ensure Python 3.11 is specified in runtime.txt

## Important Notes

- **Free Tier Limitations**: Backend will spin down after 15 minutes of inactivity
- **API Key Security**: The Voyage AI key is in the deployment config - keep it secure
- **First Request**: May be slow due to cold start on free tier

For detailed documentation, see [DEPLOYMENT.md](file:///Users/divesh/Downloads/hr-compliance-rag-bot-main/DEPLOYMENT.md)
