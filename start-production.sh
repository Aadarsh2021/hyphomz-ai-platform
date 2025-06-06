#!/bin/bash

echo "🚀 Starting Hyphomz AI Platform in Production Mode"
echo "=================================================="

# Set environment variables
export NODE_ENV=production
export NEXT_PUBLIC_AI_API_URL=http://localhost:8000

echo "🤖 Starting FastAPI Backend on port 8000..."
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

echo "🎨 Starting Next.js Frontend on port 3000..."
cd ..
npm start &
FRONTEND_PID=$!

echo "✅ Both services started successfully!"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:8000"
echo "   - API Docs: http://localhost:8000/docs"

# Function to handle shutdown
cleanup() {
    echo "🛑 Shutting down services..."
    kill $BACKEND_PID $FRONTEND_PID
    exit 0
}

# Set up signal handlers
trap cleanup SIGTERM SIGINT

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID 