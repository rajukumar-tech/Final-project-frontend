@echo off
echo =============================================
echo Starting AttendanceHub - Backend and Frontend
echo =============================================
echo.

REM Start backend in new window
echo [1/2] Starting Backend Server...
start "AttendanceHub Backend" cmd /k "cd /d "%~dp0attendance-backend" && echo Installing dependencies... && npm install && echo Generating Prisma client... && npx prisma generate && echo Seeding database... && node prisma/seed.js && echo Starting server... && node src/index.js"

REM Wait a bit for backend to start
timeout /t 5 /nobreak

REM Start frontend in new window  
echo [2/2] Starting Frontend Server...
start "AttendanceHub Frontend" cmd /k "cd /d "%~dp0final project frontend-frontend" && echo Installing dependencies... && npm install && echo Starting dev server... && npm run dev"

echo.
echo =============================================
echo Both servers are starting in separate windows!
echo.
echo Backend will be on: http://localhost:3000
echo Frontend will be on: http://localhost:5173
echo.
echo Login with: admin@example.com / admin123
echo =============================================
echo.
echo Press any key to close this window...
pause >nul
