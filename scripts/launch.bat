@echo off
setlocal enabledelayedexpansion
title UltimateCRM — Smart Launcher & Session Manager

echo ========================================================
echo        UltimateCRM — Smart Launcher & Session Manager
echo ========================================================
echo.

:: Step 1: Pre-flight Automated Type Check
echo [1/3] Running Automated Pre-flight Type Verification...
call npx vue-tsc --noEmit
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Pre-flight type check failed with errors!
    echo Please fix TypeScript errors before launching.
    echo.
    pause
    exit /b %errorlevel%
)
echo [SUCCESS] Type verification passed with 0 errors!
echo.

:: Step 2: Duplicate Session Guard (Port 3000)
echo [2/3] Checking for duplicate active sessions on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    set PID=%%a
    echo.
    echo [WARNING] An active server session is already running on port 3000 (PID: !PID!).
    echo.
    echo Options:
    echo   [1] Open existing session in browser (http://localhost:3000)
    echo   [2] Terminate running session (PID !PID!) and start fresh server
    echo   [3] Exit launcher
    echo.
    set /p CHOICE="Enter choice (1-3): "
    
    if "!CHOICE!"=="1" (
        echo Opening http://localhost:3000 in browser...
        start http://localhost:3000
        exit /b 0
    )
    if "!CHOICE!"=="2" (
        echo Terminating PID !PID!...
        taskkill /F /PID !PID!
        timeout /t 2 >nul
    )
    if "!CHOICE!"=="3" (
        exit /b 0
    )
)

:: Step 3: Launch Server & Auto Open Browser
echo [3/3] Starting UltimateCRM Vite Server & Opening Browser...
start http://localhost:3000
call npm run dev

pause
