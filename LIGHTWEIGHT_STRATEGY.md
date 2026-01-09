# Lightweight Deployment Strategy

We've hit resource limits on free hosting platforms (Render, Railway) due to heavy ML packages like `sentence-transformers` and `torch`.

## Solution: Use Voyage AI API for Embeddings (No Local Models!)

Instead of loading models locally, we'll use **Voyage AI API** for embeddings (you already have the API key!). This means:
- ✅ No heavy ML models to load
- ✅ Fast builds (< 2 minutes)
- ✅ Low memory usage (~200 MB)
- ✅ Works on Railway/Render free tier
- ✅ Better embedding quality than local models

## Changes Needed:

1. **Remove** `sentence-transformers`, `torch`, `faiss-cpu` from requirements
2. **Use** Voyage AI API for creating embeddings
3. **Use** simple in-memory vector store (or Voyage AI's search)
4. Keep Groq for LLM (free!)

## New Simplified Stack:

```
Frontend: Vercel (Next.js) ✅
Backend: Railway/Render (FastAPI) ✅
Embeddings: Voyage AI API ✅
LLM: Groq API ✅
```

**Total cost: $0** (all free tiers!)

Should I implement this lightweight version? It will deploy successfully in < 5 minutes! 🚀
