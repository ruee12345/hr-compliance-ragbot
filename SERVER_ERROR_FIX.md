# Server Error Fix - Missing Environment Variables

## Problem
**Error:** "Server error. There is a problem with the server configuration."
**Cause:** NextAuth environment variables are missing on Vercel

## Solution

### Required Environment Variables on Vercel

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select your `hr-compliance-rag-bot` project
   - Go to **Settings** → **Environment Variables**

2. **Add These Variables:**

```bash
# Required for NextAuth
NEXTAUTH_SECRET=your-super-secret-key-min-32-chars
NEXTAUTH_URL=https://hr-compliance-rag-bot.vercel.app

# Backend API
NEXT_PUBLIC_API_URL=https://hr-compliance-ragbot.onrender.com
```

### Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Or use this one:
```
7xK9mP2vQ8nL4wR6tY1uI3oE5aS7dF9gH0jK2lZ4xC6vB8nM1qW3eR5tY7uI9oP0
```

### Steps:
1. Copy the secret above (or generate new one)
2. Add to Vercel as `NEXTAUTH_SECRET`
3. Add `NEXTAUTH_URL` with your Vercel URL
4. Redeploy (or it will auto-redeploy)

### After Adding Variables:
- Vercel will automatically redeploy
- Wait 1-2 minutes for deployment
- Test login again

## Backend Status
✅ Backend is healthy: https://hr-compliance-ragbot.onrender.com/health
