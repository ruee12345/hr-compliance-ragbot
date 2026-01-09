# Deployment Guide: HR Compliance RAG Bot

This guide provides step-by-step instructions for deploying the HR Compliance RAG bot to production using Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Render account (free tier works)
- Voyage AI API key (for embeddings)

## Backend Deployment (Render)

### Step 1: Push Code to GitHub

1. Initialize git repository (if not already done):
   ```bash
   cd /path/to/hr-compliance-rag-bot-main
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/your-username/hr-compliance-rag-bot.git
   git push -u origin main
   ```

### Step 2: Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `hr-compliance-rag-backend` (or your choice)
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`

5. Set Environment Variables (click **Advanced** → **Add Environment Variable**):
   ```
   VOYAGE_API_KEY=your-voyage-ai-api-key-here
   SECRET_KEY=your-super-secret-jwt-key-change-this
   DEBUG=false
   FRONTEND_URL=https://your-app.vercel.app
   UPLOAD_FOLDER=./data/documents
   VECTOR_STORE_PATH=./data/vector_store
   ```

6. Click **Create Web Service**
7. Wait for deployment to complete (5-10 minutes)
8. Copy your backend URL (e.g., `https://hr-compliance-rag-backend.onrender.com`)

> **Note**: Free tier Render services spin down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds.

## Frontend Deployment (Vercel)

### Step 1: Configure Environment Variables

1. Create `.env.local` in the `frontend` directory:
   ```bash
   cd frontend
   cp .env.example .env.local
   ```

2. Edit `.env.local` and set your backend URL:
   ```
   NEXT_PUBLIC_API_URL=https://hr-compliance-rag-backend.onrender.com
   ```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy from the frontend directory:
   ```bash
   cd frontend
   vercel
   ```

3. Follow the prompts:
   - **Set up and deploy**: Yes
   - **Which scope**: Your account
   - **Link to existing project**: No
   - **Project name**: `hr-compliance-rag-bot` (or your choice)
   - **Directory**: `./`
   - **Override settings**: No

4. Set production environment variable:
   ```bash
   vercel env add NEXT_PUBLIC_API_URL production
   ```
   Enter your Render backend URL when prompted.

5. Deploy to production:
   ```bash
   vercel --prod
   ```

#### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://hr-compliance-rag-backend.onrender.com` (your Render URL)

6. Click **Deploy**
7. Wait for deployment (2-5 minutes)

### Step 3: Update Backend CORS

After deploying to Vercel, update the backend's `FRONTEND_URL` environment variable on Render:

1. Go to Render Dashboard → Your Service → Environment
2. Update `FRONTEND_URL` to your Vercel URL (e.g., `https://your-app.vercel.app`)
3. Save changes (this will redeploy the backend)

## Verification

### 1. Backend Health Check

Visit `https://your-backend.onrender.com/health`

Expected response:
```json
{"status": "healthy"}
```

### 2. Frontend Access

Visit your Vercel URL (e.g., `https://your-app.vercel.app`)

You should see the login page.

### 3. End-to-End Test

1. Log in to the application
2. Navigate to Admin → Upload
3. Upload a test PDF document
4. Wait for processing to complete
5. Navigate to Employee → Chat
6. Ask a question about the uploaded document
7. Verify you receive a relevant response with sources

## Troubleshooting

### CORS Errors

**Symptom**: Browser console shows CORS errors

**Solution**:
- Verify `FRONTEND_URL` is set correctly on Render
- Ensure it matches your Vercel deployment URL exactly (no trailing slash)
- Redeploy backend after changing environment variables

### Backend Not Responding

**Symptom**: 502/504 errors or very slow responses

**Solution**:
- Free tier Render services sleep after inactivity
- First request may take 30-60 seconds to wake up
- Consider upgrading to paid tier for always-on service

### API Key Errors

**Symptom**: "Voyage AI API key not configured" or similar errors

**Solution**:
- Verify `VOYAGE_API_KEY` is set correctly on Render
- Check the API key is valid and has sufficient quota
- Redeploy backend after setting the key

### Build Failures

**Frontend Build Failure**:
- Check `package.json` dependencies are correct
- Verify Node.js version compatibility
- Review build logs in Vercel dashboard

**Backend Build Failure**:
- Check `requirements.txt` is complete
- Verify Python version (should be 3.11)
- Review build logs in Render dashboard

## Environment Variables Reference

### Backend (Render)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VOYAGE_API_KEY` | Yes | Voyage AI API key for embeddings | `pa-xxxxx...` |
| `SECRET_KEY` | Yes | JWT secret key for authentication | Random string |
| `DEBUG` | No | Enable debug mode | `false` |
| `FRONTEND_URL` | Yes | Frontend URL for CORS | `https://your-app.vercel.app` |
| `UPLOAD_FOLDER` | No | Document storage path | `./data/documents` |
| `VECTOR_STORE_PATH` | No | Vector store path | `./data/vector_store` |

### Frontend (Vercel)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API URL | `https://your-backend.onrender.com` |

## Monitoring

### Render

- View logs: Dashboard → Your Service → Logs
- Monitor metrics: Dashboard → Your Service → Metrics
- Check events: Dashboard → Your Service → Events

### Vercel

- View deployments: Dashboard → Your Project → Deployments
- Check logs: Click on deployment → View Function Logs
- Monitor analytics: Dashboard → Your Project → Analytics

## Updating the Application

### Backend Updates

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update backend"
   git push
   ```

2. Render will automatically redeploy (if auto-deploy is enabled)

### Frontend Updates

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update frontend"
   git push
   ```

2. Vercel will automatically redeploy

## Cost Considerations

### Free Tier Limitations

**Render Free Tier**:
- 750 hours/month
- Services spin down after 15 minutes of inactivity
- Slower performance than paid tiers

**Vercel Free Tier**:
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless function execution limits

### Upgrading

Consider upgrading if you need:
- Always-on backend service (Render: $7/month)
- More bandwidth (Vercel: $20/month)
- Custom domains
- Better performance

## Security Best Practices

1. **Never commit `.env` files** - They're gitignored by default
2. **Rotate secrets regularly** - Update `SECRET_KEY` periodically
3. **Use strong API keys** - Generate random, long keys
4. **Enable HTTPS only** - Both platforms provide this by default
5. **Monitor logs** - Check for suspicious activity
6. **Limit file uploads** - Current limit is 10MB per file

## Support

For issues specific to:
- **Render**: https://render.com/docs
- **Vercel**: https://vercel.com/docs
- **Voyage AI**: https://docs.voyageai.com
