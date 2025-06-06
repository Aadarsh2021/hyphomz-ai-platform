# Simplified Dockerfile for Railway deployment
FROM node:18-alpine AS frontend

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code (excluding backend)
COPY src ./src
COPY public ./public
COPY next.config.js ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./
COPY postcss.config.js ./

# Build frontend
ENV NEXT_PUBLIC_AI_API_URL=$RAILWAY_PUBLIC_DOMAIN
RUN npm run build

# Production stage
FROM python:3.11-slim

WORKDIR /app

# Install Node.js
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Copy frontend build
COPY --from=frontend /app/.next ./.next
COPY --from=frontend /app/public ./public
COPY --from=frontend /app/package*.json ./

# Install frontend production dependencies
RUN npm ci --only=production

# Install Python dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend source
COPY backend/ ./backend/

# Copy Next.js config for runtime
COPY next.config.js ./

# Create startup script
RUN echo '#!/bin/bash\n\
cd /app/backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000 &\n\
cd /app && npm start -- --port $PORT' > /app/start.sh && chmod +x /app/start.sh

# Expose port (Railway will set PORT env var)
EXPOSE $PORT

# Start both services
CMD ["/app/start.sh"] 