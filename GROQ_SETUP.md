# Quick Setup Guide: Get Your Groq API Key

## Step 1: Sign Up for Groq (FREE)

1. Go to https://console.groq.com
2. Click **Sign Up** (or Sign In if you have an account)
3. Complete the registration (no credit card required!)

## Step 2: Create API Key

1. Once logged in, go to **API Keys** section
2. Click **Create API Key**
3. Give it a name (e.g., "HR Compliance Bot")
4. Click **Create**
5. **COPY THE KEY** - you won't see it again!

## Step 3: Add to Render

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your service: `hr-compliance-rag-backend`
3. Go to **Environment** tab
4. Click **Add Environment Variable**
5. Add:
   - **Key**: `GROQ_API_KEY`
   - **Value**: `paste-your-groq-api-key-here`
6. Click **Save Changes**

Render will automatically redeploy with the new key!

## Step 4: Verify Deployment

Once Render finishes deploying:
1. Check the logs for any errors
2. Visit: `https://your-backend-url.onrender.com/health`
3. Should see: `{"status": "healthy"}`

## Your Backend URL

After deployment, your backend will be at:
```
https://hr-compliance-rag-backend-XXXX.onrender.com
```

Copy this URL - you'll need it for the frontend deployment!

---

## Why Groq?

- ✅ **100% FREE** - No credit card required
- ✅ **Very Fast** - Faster than OpenAI
- ✅ **Good Quality** - Uses Llama 3.1 model
- ✅ **Easy Setup** - Just sign up and get API key

---

**Next Steps After Backend is Live:**
1. Deploy frontend to Vercel
2. Connect frontend to backend
3. Test the application!
