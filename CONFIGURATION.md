# Configuration Guide

## Environment Variables

### Frontend (.env.local)
Create a `.env.local` file in the root directory with:

```bash
# Backend API Configuration
NEXT_PUBLIC_AI_API_URL=http://localhost:8000

# App Configuration
NEXT_PUBLIC_APP_NAME=Hyphomz
NEXT_PUBLIC_APP_VERSION=1.0.0

# Development Mode
NODE_ENV=development
```

### Backend (backend/.env)
Create a `.env` file in the `backend/` directory with:

```bash
# Database Configuration
DATABASE_URL=sqlite:///./hyphomz_ml.db

# API Configuration
API_V1_PREFIX=/api/v1
HOST=0.0.0.0
PORT=8000

# CORS Configuration
ALLOWED_ORIGINS=["http://localhost:3000", "http://127.0.0.1:3000"]

# ML Model Configuration
MODEL_STORAGE_PATH=./models
RETRAIN_INTERVAL_HOURS=24
RECOMMENDATION_MODEL_THRESHOLD=0.7
PREDICTION_CONFIDENCE_THRESHOLD=0.8

# Feature Flags
ENABLE_RECOMMENDATIONS=true
ENABLE_PREDICTIONS=true
ENABLE_ANALYTICS=true
ENABLE_PROVIDER_MATCHING=true

# Logging
LOG_LEVEL=INFO
```

## Development Setup

### 1. Start Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Start Frontend
```bash
# In root directory
npm install
npm run dev
```

### 3. Access Applications
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Production Configuration

### Frontend (Vercel)
Add environment variables in Vercel dashboard:
```bash
NEXT_PUBLIC_AI_API_URL=https://your-backend-domain.com
```

### Backend (Docker)
```dockerfile
# Use environment variables for production
ENV DATABASE_URL=postgresql://user:pass@host:port/db
ENV ALLOWED_ORIGINS=["https://your-frontend-domain.com"]
```

## API Integration

The frontend automatically connects to the backend using the `HyphomzAI` class:

```typescript
import { HyphomzAI } from '@/lib/ai-api';

const ai = new HyphomzAI();

// Get recommendations
const recommendations = await ai.getPersonalizedRecommendations(userId);

// Predict duration
const duration = await ai.predictServiceDuration({
  service_type: 'cleaning',
  area_sqft: 1200
});
```

## Health Checks

### Backend Health
```bash
curl http://localhost:8000/health
```

### AI Services Health
```bash
curl http://localhost:8000/api/v1/health
``` 