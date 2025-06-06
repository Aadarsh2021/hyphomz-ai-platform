# 🚀 Deployment Guide

## Single Platform Deployment Options

### 🛤️ Railway (Recommended)

Railway is perfect for our monorepo and handles both frontend and backend automatically.

#### Steps:

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `hyphomz-ai-platform`

3. **Configure Services**
   Railway will auto-detect both services:
   - **Frontend Service** (Next.js)
   - **Backend Service** (Python)

4. **Set Environment Variables**
   
   **Frontend:**
   ```bash
   NEXT_PUBLIC_AI_API_URL=https://your-backend-url.railway.app
   ```
   
   **Backend:**
   ```bash
   DATABASE_URL=postgresql://user:pass@host:port/db
   ALLOWED_ORIGINS=["https://your-frontend-url.railway.app"]
   ```

5. **Deploy**
   - Railway will automatically build and deploy both services
   - Get your URLs from the Railway dashboard

#### Estimated Cost: **Free tier available** (500 hours/month)

---

### 🔷 Vercel + Serverless Functions

Deploy frontend on Vercel and backend as API routes.

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel --prod
   ```

3. **Configure**
   - Set `NEXT_PUBLIC_AI_API_URL` to your Vercel domain
   - Backend will be available at `/api/*` routes

#### Estimated Cost: **Free tier available**

---

### 🟣 Heroku

Traditional but reliable platform.

#### Steps:

1. **Install Heroku CLI**
   ```bash
   # Download from heroku.com/cli
   ```

2. **Create Apps**
   ```bash
   heroku create hyphomz-frontend
   heroku create hyphomz-backend
   ```

3. **Deploy Frontend**
   ```bash
   git subtree push --prefix=. heroku main
   ```

4. **Deploy Backend**
   ```bash
   git subtree push --prefix=backend heroku main
   ```

5. **Configure Environment Variables**
   ```bash
   heroku config:set NEXT_PUBLIC_AI_API_URL=https://hyphomz-backend.herokuapp.com
   ```

#### Estimated Cost: **$7/month per dyno**

---

## Separate Platform Deployment

### Frontend Options:

#### 1. Vercel (Recommended)
```bash
# Connect GitHub repo to Vercel
# Set environment variables in dashboard
NEXT_PUBLIC_AI_API_URL=https://your-backend-url.com
```

#### 2. Netlify
```bash
# Connect GitHub repo to Netlify
# Set environment variables in dashboard
```

### Backend Options:

#### 1. Railway
```bash
# Create new Railway project
# Deploy from GitHub repo /backend folder
```

#### 2. Heroku
```bash
heroku create hyphomz-api
git subtree push --prefix=backend heroku main
```

#### 3. DigitalOcean App Platform
```bash
# Create app from GitHub repo
# Set build command: pip install -r requirements.txt
# Set run command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## Environment Variables Checklist

### Frontend (.env.local)
```bash
NEXT_PUBLIC_AI_API_URL=https://your-backend-url.com
NEXT_PUBLIC_APP_NAME=Hyphomz
NODE_ENV=production
```

### Backend (.env)
```bash
DATABASE_URL=postgresql://user:pass@host:port/db
ALLOWED_ORIGINS=["https://your-frontend-url.com"]
API_V1_PREFIX=/api/v1
HOST=0.0.0.0
PORT=8000
```

---

## Database Setup

### Railway PostgreSQL
```bash
# Railway automatically provides PostgreSQL
# Use the DATABASE_URL from Railway dashboard
```

### Heroku PostgreSQL
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

### Supabase (Alternative)
```bash
# Create project at supabase.com
# Get DATABASE_URL from project settings
```

---

## Custom Domain Setup

### 1. Purchase Domain
- Namecheap, GoDaddy, or Cloudflare

### 2. Configure DNS
```bash
# Add CNAME records
www.yourdomain.com -> your-app.railway.app
yourdomain.com -> your-app.railway.app
```

### 3. SSL Certificate
- Railway/Vercel automatically provides SSL
- Custom domains get free SSL certificates

---

## Monitoring & Analytics

### 1. Railway Metrics
- Built-in monitoring dashboard
- Resource usage tracking
- Log aggregation

### 2. Vercel Analytics
```bash
npm install @vercel/analytics
```

### 3. Sentry Error Tracking
```bash
npm install @sentry/nextjs
```

---

## Performance Optimization

### 1. Frontend
```bash
# Enable compression
npm install next-compress

# Image optimization (built-in Next.js)
# API route caching
# Static generation where possible
```

### 2. Backend
```bash
# Database connection pooling
# API response caching
# Async processing for heavy tasks
```

---

## Security Checklist

✅ Environment variables properly set
✅ CORS configured correctly
✅ API rate limiting implemented
✅ HTTPS enabled
✅ Database credentials secured
✅ Authentication tokens secured

---

## Deployment Commands Summary

### Quick Railway Deployment
1. Push to GitHub
2. Connect Railway to repo
3. Configure environment variables
4. Deploy automatically

### Manual Deployment
```bash
# Frontend (Vercel)
npx vercel --prod

# Backend (Railway)
railway login
railway link
railway up
```

---

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies in package.json

2. **API Connection Issues**
   - Verify CORS settings
   - Check environment variable URLs

3. **Database Connection**
   - Verify DATABASE_URL format
   - Check firewall settings

4. **SSL Certificate Issues**
   - Wait 24-48 hours for DNS propagation
   - Verify domain configuration

---

## Cost Estimation

### Free Tier Limits:
- **Railway**: 500 hours/month, 1GB RAM
- **Vercel**: 100GB bandwidth, 6000 hours
- **Heroku**: 550-1000 dyno hours/month

### Paid Plans:
- **Railway**: $5/month per service
- **Vercel Pro**: $20/month per team
- **Heroku**: $7/month per dyno

---

**Choose Railway for the easiest single-platform deployment of your full-stack AI application!** 