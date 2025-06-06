# Hyphomz AI Platform - Railway Deployment (PowerShell)
Write-Host "🚀 Hyphomz AI Platform - Railway Deployment (PowerShell)" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green

# Check if Railway CLI is installed
try {
    railway --version | Out-Null
    Write-Host "✅ Railway CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Railway CLI not found. Installing via npm..." -ForegroundColor Red
    npm install -g @railway/cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Railway CLI. Please install manually:" -ForegroundColor Red
        Write-Host "   Visit: https://railway.app/cli" -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Check if user is logged in
try {
    railway whoami | Out-Null
    Write-Host "✅ Already logged into Railway" -ForegroundColor Green
} catch {
    Write-Host "🔐 Please login to Railway..." -ForegroundColor Yellow
    railway login
}

# Check if we're in a Railway project
try {
    railway status | Out-Null
    Write-Host "✅ Railway project found" -ForegroundColor Green
} catch {
    Write-Host "🆕 Creating new Railway project..." -ForegroundColor Yellow
    railway link
}

# Set environment variables
Write-Host "🔧 Setting environment variables..." -ForegroundColor Yellow
railway variables set NEXT_PUBLIC_AI_API_URL=https://your-app.railway.app/api
railway variables set ALLOWED_ORIGINS=https://your-app.railway.app
railway variables set PORT=3000

# Deploy the application
Write-Host "🚀 Deploying to Railway..." -ForegroundColor Green
railway up

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "📊 Check your Railway dashboard for deployment status" -ForegroundColor Cyan
Write-Host "🌐 Your app will be available at your Railway domain" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Update NEXT_PUBLIC_AI_API_URL with your actual Railway domain" -ForegroundColor White
Write-Host "2. Configure custom domain if needed" -ForegroundColor White
Write-Host "3. Set up database if required" -ForegroundColor White
Write-Host ""
Write-Host "📚 For more details, see DEPLOYMENT.md" -ForegroundColor Cyan

Read-Host "Press Enter to continue"