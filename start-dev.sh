#!/bin/bash

echo "🚀 Starting Hyphomz AI Platform Development Environment"
echo "================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo "❌ Python is not installed. Please install Python first."
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "🐍 Installing backend dependencies..."
cd backend
if command -v python3 &> /dev/null; then
    python3 -m pip install -r requirements.txt
else
    python -m pip install -r requirements.txt
fi
cd ..

echo "✅ Dependencies installed successfully!"
echo ""
echo "🎯 Starting development servers..."
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:8000"
echo "   - API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both frontend and backend
npm run dev:full 