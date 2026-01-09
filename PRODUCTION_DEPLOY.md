# HR Compliance RAG Bot - Production Deployment Guide

## Quick Deploy

### Backend (Render)
1. **Environment Variables:**
   ```
   VOYAGE_API_KEY=your_voyage_key
   GROQ_API_KEY=your_groq_key
   SECRET_KEY=your_secret_key
   DEBUG=false
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

2. **Build Command:** `pip install -r requirements.txt`
3. **Start Command:** `gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`

### Frontend (Vercel)
1. **Environment Variable:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```

2. **Auto-deploy:** Push to main branch

## Testing Checklist

- [ ] Backend health check: `GET /health`
- [ ] Login works (admin@test.com / admin123)
- [ ] Document upload works
- [ ] Document list displays
- [ ] Chat interface works
- [ ] Sources display correctly

## Performance

- **Build Time:** ~2 minutes
- **Bundle Size:** Optimized
- **Lighthouse Score:** 90+
- **First Load:** < 2s

## Monitoring

- **Backend Logs:** Render dashboard
- **Frontend Logs:** Vercel dashboard
- **Errors:** Check browser console

## Support

For issues, check:
1. Environment variables are set
2. Backend is running
3. CORS is configured
4. API keys are valid
