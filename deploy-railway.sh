#!/bin/bash

echo "🚀 Hyphomz AI Platform - One-Click Railway Deployment"
echo "======================================================"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    curl -fsSL https://railway.app/install.sh | sh
    echo "✅ Railway CLI installed!"
fi

# Check if user is logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway..."
    railway login
fi

# Check if we're in a Railway project
if ! railway status &> /dev/null; then
    echo "🆕 Creating new Railway project..."
    railway link
fi

# Set environment variables
echo "🔧 Setting environment variables..."
railway variables set NEXT_PUBLIC_AI_API_URL=https://your-app.railway.app/api
railway variables set ALLOWED_ORIGINS=https://your-app.railway.app
railway variables set PORT=3000

# Deploy the application
echo "🚀 Deploying to Railway..."
railway up

echo ""
echo "✅ Deployment complete!"
echo "📊 Check your Railway dashboard for deployment status"
echo "🌐 Your app will be available at your Railway domain"
echo ""
echo "📝 Next steps:"
echo "1. Update NEXT_PUBLIC_AI_API_URL with your actual Railway domain"
echo "2. Configure custom domain if needed"
echo "3. Set up database if required"
echo ""
echo "📚 For more details, see DEPLOYMENT.md" 