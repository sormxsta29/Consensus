@echo off
echo ============================================
echo   CONSENSUS - Starting Development Server
echo ============================================
echo.
echo Navigating to project folder...
cd /d "C:\Users\SORMISTA PAL\Desktop\Python\consensus-frontend"

echo.
echo Checking if Node.js is installed...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found!
echo.
echo Installing dependencies (if needed)...
call npm install

echo.
echo ============================================
echo   Starting Next.js Development Server
echo ============================================
echo.
echo The server will start at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
