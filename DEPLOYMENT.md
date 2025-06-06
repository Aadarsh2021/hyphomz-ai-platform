# 🚀 Deployment Guide - Single Platform Solutions

Deploy both Next.js frontend and FastAPI backend on a single platform.

## 🔥 Option 1: Railway (Recommended)

**Best for**: Full-stack monorepos, automatic deployments, built-in databases

### Quick Deploy
1. **Connect GitHub**
   ```bash
   # Push to GitHub (already done)
   git push origin main
   ```

2. **Deploy on Railway**
   - Visit [railway.app](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select `hyphomz-ai-platform`
   - Railway automatically detects both services

3. **Environment Variables**
   ```bash
   NODE_ENV=production
   NEXT_PUBLIC_AI_API_URL=https://your-app.railway.app
   ```

### Railway Configuration
- ✅ **Auto-detects**: Next.js + Python
- ✅ **Custom Dockerfile**: Uses our multi-stage build
- ✅ **Environment**: Production-ready
- ✅ **SSL**: Automatic HTTPS
- ✅ **Scaling**: Auto-scaling available

---

## 🌐 Option 2: Render

**Best for**: Free tier, easy setup, great documentation

### Deploy Steps
1. **Create Render Account**: [render.com](https://render.com)

2. **Create Web Service**
   - Connect GitHub repository
   - Build Command: `npm run build && cd backend && pip install -r requirements.txt`
   - Start Command: `./start-production.sh`

3. **Environment Variables**
   ```bash
   NODE_ENV=production
   NEXT_PUBLIC_AI_API_URL=https://your-app.onrender.com
   ```

### Render Benefits
- ✅ **Free Tier**: 750 hours/month
- ✅ **Auto-Deploy**: On git push
- ✅ **SSL**: Free certificates
- ✅ **Monitoring**: Built-in metrics

---

## ☁️ Option 3: DigitalOcean App Platform

**Best for**: Professional deployments, great performance

### Deploy Steps
1. **Create DO Account**: [digitalocean.com](https://digitalocean.com)

2. **App Platform Setup**
   - Create new app from GitHub
   - Select monorepo deployment
   - Configure build settings

3. **App Spec Configuration**
   ```yaml
   name: hyphomz-ai-platform
   services:
   - name: web
     source_dir: /
     github:
       repo: Aadarsh2021/hyphomz-ai-platform
       branch: main
     run_command: ./start-production.sh
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     routes:
     - path: /
     envs:
     - key: NODE_ENV
       value: production
   ```

---

## 🔮 Option 4: Vercel (Frontend) + Vercel Functions (Backend)

**Best for**: Next.js optimization, edge functions

### Setup
1. **Deploy Frontend to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Convert Backend to API Routes**
   ```typescript
   // pages/api/ai/[...path].ts
   import { createProxyMiddleware } from 'http-proxy-middleware'
   
   export default createProxyMiddleware({
     target: 'http://localhost:8000',
     changeOrigin: true,
     pathRewrite: {
       '^/api/ai': '/api/v1'
     }
   })
   ```

---

## 🚀 Quick Start Deployment

### Using Railway (Fastest)
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Initialize project
railway init

# 4. Deploy
railway up
```

### Using Render (Free)
```bash
# 1. Push to GitHub (done)
git push origin main

# 2. Go to render.com
# 3. Connect repository
# 4. Select "Web Service"
# 5. Use our start-production.sh
```

### Using Docker Anywhere
```bash
# Build image
docker build -t hyphomz-ai-platform .

# Run locally
docker run -p 3000:3000 -p 8000:8000 hyphomz-ai-platform

# Deploy to any Docker platform
# (AWS ECS, Google Cloud Run, Azure Container Instances)
```

---

## 📊 Platform Comparison

| Platform | Free Tier | Auto-Deploy | SSL | Database | Best For |
|----------|-----------|-------------|-----|----------|----------|
| **Railway** | $5/month | ✅ | ✅ | ✅ | Production |
| **Render** | 750h/month | ✅ | ✅ | ✅ | Startups |
| **DigitalOcean** | $5/month | ✅ | ✅ | ✅ | Professional |
| **Vercel** | Generous | ✅ | ✅ | Limited | Frontend-heavy |

---

## 🎯 Recommended Deployment Flow

### 1. **Development** → Railway/Render
- Quick setup for testing
- Easy CI/CD integration
- Cost-effective for prototypes

### 2. **Production** → DigitalOcean/AWS
- Better performance and scaling
- More control over infrastructure
- Professional monitoring and support

### 3. **Enterprise** → Custom Docker Deployment
- Full control over environment
- Custom scaling strategies
- Integration with existing infrastructure

---

## 🔧 Environment Variables for Production

```bash
# Frontend
NODE_ENV=production
NEXT_PUBLIC_AI_API_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=Hyphomz

# Backend
DATABASE_URL=postgresql://user:pass@host:port/db
CORS_ORIGINS=["https://your-domain.com"]
API_V1_PREFIX=/api/v1

# ML Models
MODEL_STORAGE_PATH=/app/models
PREDICTION_CONFIDENCE_THRESHOLD=0.8
```

---

## 🎉 Post-Deployment Checklist

- [ ] ✅ Frontend loads at your domain
- [ ] ✅ Backend API responds at `/api/v1/health`
- [ ] ✅ AI endpoints working (`/api/v1/recommendations/trending`)
- [ ] ✅ Database connected (if using)
- [ ] ✅ SSL certificate active
- [ ] ✅ Environment variables set
- [ ] ✅ Monitoring configured
- [ ] ✅ Domain configured (optional)

---

**Choose Railway for the quickest deployment, or Render for a free start!** 🚀 