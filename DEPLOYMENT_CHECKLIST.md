# Quick Deployment Checklist

## ✅ Vercel (Frontend)
**Environment Variables:**
```
NEXTAUTH_SECRET=7xK9mP2vQ8nL4wR6tY1uI3oE5aS7dF9gH0jK2lZ4xC6vB8nM1qW3eR5tY7uI9oP0
NEXTAUTH_URL=https://hr-compliance-rag-bot.vercel.app
NEXT_PUBLIC_API_URL=https://hr-compliance-ragbot.onrender.com
```

**Steps:**
1. Go to https://vercel.com/dashboard
2. Select project → Settings → Environment Variables
3. Add all 3 variables above
4. Redeploy (auto or manual)

---

## ✅ Render (Backend)
**Environment Variables:**
```
FRONTEND_URL=https://hr-compliance-rag-bot.vercel.app
VOYAGE_API_KEY=<your-voyage-key>
GROQ_API_KEY=<your-groq-key>
SECRET_KEY=<your-secret-key>
DEBUG=false
VECTOR_STORE_PATH=./data/vector_store
UPLOAD_FOLDER=./data/documents
PYTHON_VERSION=3.11.0
```

**Steps:**
1. Go to https://dashboard.render.com
2. Select service → Environment
3. Verify all variables (especially `FRONTEND_URL`)
4. Save changes → auto-redeploy

---

## 🧪 Test After Deployment

1. **Backend Health**: https://hr-compliance-ragbot.onrender.com/health
   - Should return: `{"status":"healthy"}`

2. **Frontend**: https://hr-compliance-rag-bot.vercel.app
   - Login with: `admin@test.com` / `admin123`
   - Try upload
   - Try chat

---

## 🐛 Common Issues

### "Network Error" on Upload/Chat
- **Fix**: Check `FRONTEND_URL` on Render
- Must be: `https://hr-compliance-rag-bot.vercel.app`

### "Server error" on Login
- **Fix**: Check `NEXTAUTH_SECRET` on Vercel
- Must be set and at least 32 characters

### Backend not responding
- **Fix**: Render free tier sleeps after inactivity
- Visit health endpoint to wake it up
- Wait 30 seconds and try again

---

## 📝 Deployment URLs

- **Frontend**: https://hr-compliance-rag-bot.vercel.app
- **Backend**: https://hr-compliance-ragbot.onrender.com
- **GitHub**: https://github.com/ruee12345/hr-compliance-ragbot
