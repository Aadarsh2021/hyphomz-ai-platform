@echo off
echo 🚀 Hyphomz AI Platform - Railway Deployment (Windows)
echo ======================================================

REM Check if Railway CLI is installed
where railway >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Railway CLI not found. Please install it manually:
    echo    Visit: https://railway.app/cli
    echo    Or run: npm install -g @railway/cli
    pause
    exit /b 1
)

REM Check if user is logged in
railway whoami >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo 🔐 Please login to Railway...
    railway login
)

REM Check if we're in a Railway project
railway status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo 🆕 Creating new Railway project...
    railway link
)

REM Set environment variables
echo 🔧 Setting environment variables...
railway variables set NEXT_PUBLIC_AI_API_URL=https://your-app.railway.app/api
railway variables set ALLOWED_ORIGINS=https://your-app.railway.app
railway variables set PORT=3000

REM Deploy the application
echo 🚀 Deploying to Railway...
railway up

echo.
echo ✅ Deployment complete!
echo 📊 Check your Railway dashboard for deployment status
echo 🌐 Your app will be available at your Railway domain
echo.
echo 📝 Next steps:
echo 1. Update NEXT_PUBLIC_AI_API_URL with your actual Railway domain
echo 2. Configure custom domain if needed
echo 3. Set up database if required
echo.
echo 📚 For more details, see DEPLOYMENT.md
pause 