@echo off
echo 🚀 Starting Hyphomz AI Platform Development Environment
echo =================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python first.
    pause
    exit /b 1
)

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
call npm install

REM Install backend dependencies
echo 🐍 Installing backend dependencies...
cd backend
call pip install -r requirements.txt
cd ..

echo ✅ Dependencies installed successfully!
echo.
echo 🎯 Starting development servers...
echo    - Frontend: http://localhost:3000
echo    - Backend API: http://localhost:8000
echo    - API Docs: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start both frontend and backend
call npm run dev:full

pause 