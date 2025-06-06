@echo off
echo 🚀 Hyphomz AI Platform - Railway Deployment Script
echo ==================================================

REM Check if Railway CLI is installed
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Railway CLI not found. Please install it first:
    echo    Visit: https://railway.app/cli
    echo    Or run: npm install -g @railway/cli
    pause
    exit /b 1
)

REM Login to Railway
echo 🔐 Logging into Railway...
call railway login

REM Check if we're in a Railway project
call railway status >nul 2>&1
if %errorlevel% neq 0 (
    echo 🆕 Creating new Railway project...
    call railway link
)

REM Deploy the application
echo 🚀 Deploying to Railway...
call railway up

echo.
echo ✅ Deployment initiated!
echo 📊 Check your Railway dashboard for deployment status
echo 🌐 Your app will be available at your Railway domain once deployed
echo.
echo 🔧 Don't forget to set environment variables:
echo    - NEXT_PUBLIC_AI_API_URL (Frontend)
echo    - ALLOWED_ORIGINS (Backend)
echo    - DATABASE_URL (Backend)
echo.
echo 📚 For detailed instructions, see DEPLOYMENT.md

pause 