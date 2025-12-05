@echo off
echo ==================================
echo Starting AttendanceHub Backend
echo ==================================

REM Seed database with test user
echo.
echo Seeding database...
call npm run prisma:seed
if errorlevel 1 (
    echo Warning: Database seeding encountered an issue
    echo Continuing anyway...
)

REM Start backend server
echo.
echo Starting backend server on port 3000...
node src/index.js
