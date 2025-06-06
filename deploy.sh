#!/bin/bash

echo "🚀 Hyphomz AI Platform - Railway Deployment Script"
echo "=================================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    curl -fsSL https://railway.app/install.sh | sh
    echo "✅ Railway CLI installed!"
fi

# Login to Railway
echo "🔐 Logging into Railway..."
railway login

# Check if we're in a Railway project
if ! railway status &> /dev/null; then
    echo "🆕 Creating new Railway project..."
    railway link
fi

# Deploy the application
echo "🚀 Deploying to Railway..."
railway up

echo ""
echo "✅ Deployment initiated!"
echo "📊 Check your Railway dashboard for deployment status"
echo "🌐 Your app will be available at your Railway domain once deployed"
echo ""
echo "🔧 Don't forget to set environment variables:"
echo "   - NEXT_PUBLIC_AI_API_URL (Frontend)"
echo "   - ALLOWED_ORIGINS (Backend)"
echo "   - DATABASE_URL (Backend)"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md" 