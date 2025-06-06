# Multi-stage Dockerfile for Hyphomz AI Platform
# Builds both Next.js frontend and FastAPI backend

# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app

# Copy frontend package files
COPY package*.json ./
RUN npm ci --only=production

# Copy frontend source
COPY src ./src
COPY public ./public
COPY next.config.js ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./
COPY postcss.config.js ./

# Build frontend
ENV NEXT_PUBLIC_AI_API_URL=http://localhost:8000
RUN npm run build

# Stage 2: Setup Backend
FROM python:3.11-slim AS backend-setup
WORKDIR /app/backend

# Install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ ./

# Stage 3: Final Runtime
FROM python:3.11-slim AS runtime
WORKDIR /app

# Install Node.js for serving frontend
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Copy built frontend
COPY --from=frontend-builder /app/.next ./.next
COPY --from=frontend-builder /app/public ./public
COPY --from=frontend-builder /app/package*.json ./
COPY --from=frontend-builder /app/node_modules ./node_modules

# Copy backend
COPY --from=backend-setup /app/backend ./backend
COPY --from=backend-setup /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=backend-setup /usr/local/bin /usr/local/bin

# Copy startup script
COPY start-production.sh ./
RUN chmod +x start-production.sh

# Expose ports
EXPOSE 3000 8000

# Start both services
CMD ["./start-production.sh"] 