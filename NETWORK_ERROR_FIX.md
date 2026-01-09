# 🔧 COMPLETE FIX - Network Error Issue

## Problem
- ❌ Upload: Network Error
- ❌ Chat: "Sorry, I encountered an error"
- **Root Cause**: Backend CORS not allowing Vercel frontend

## Solution: Update Render Environment Variables

### Go to Render Dashboard
1. Visit: https://dashboard.render.com
2. Select your `hr-compliance-ragbot` service
3. Go to **Environment** tab
4. **Check/Update** these variables:

```bash
FRONTEND_URL=https://hr-compliance-rag-bot.vercel.app
VOYAGE_API_KEY=<your-key>
GROQ_API_KEY=<your-key>
SECRET_KEY=<your-key>
DEBUG=false
```

### Critical: FRONTEND_URL
**Must be EXACTLY**: `https://hr-compliance-rag-bot.vercel.app`
- ✅ Correct: `https://hr-compliance-rag-bot.vercel.app`
- ❌ Wrong: `http://localhost:3000`
- ❌ Wrong: Missing or empty

### After Updating:
1. Click **Save Changes**
2. Render will auto-redeploy (2-3 minutes)
3. Wait for deployment to complete
4. Test upload again

## Verify Backend is Ready
Check: https://hr-compliance-ragbot.onrender.com/health
Should return: `{"status":"healthy"}`

## Alternative: Quick Test Locally
If you want to test immediately while Render redeploys:

```bash
cd backend
# Set environment variable
export FRONTEND_URL=https://hr-compliance-rag-bot.vercel.app
# Run locally
python run.py
```

Then update Vercel env to point to localhost temporarily.

## After Fix Works:
- ✅ Upload documents
- ✅ Chat with AI
- ✅ View documents
- ✅ All features working

---

**Next Step**: Update `FRONTEND_URL` on Render and wait 2-3 minutes for redeploy.
