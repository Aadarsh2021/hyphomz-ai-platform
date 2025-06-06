#!/usr/bin/env bash
# Render start script for Hyphomz AI Backend

echo "🚀 Starting Hyphomz AI Backend..."
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port $PORT 