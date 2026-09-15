@echo off
cd /d "%~dp0\.."

echo ========================================================
echo        UltimateCRM -- Nuxt 3 Smart Launcher
echo ========================================================
echo:

echo [1/3] Preparing Nuxt 3 & Running Type Verification...
call npx nuxi prepare
call npx vue-tsc --noEmit
if %errorlevel% neq 0 (
    echo:
    echo [ERROR] Pre-flight type check failed! Please fix TypeScript errors.
    pause
    exit /b %errorlevel%
)
echo [SUCCESS] Nuxt 3 Type verification passed with 0 errors!
echo:

echo [2/3] Checking active session on port 3000...
set "FOUND_PID="
for /f "tokens=5" %%A in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    set "FOUND_PID=%%A"
)

if defined FOUND_PID (
    echo:
    echo [WARNING] Active server session detected on port 3000 ^(PID: %FOUND_PID%^).
    echo:
    echo Opening existing session in browser...
    start http://localhost:3000
    exit /b 0
)

echo [3/3] Starting Nuxt 3 Dev Server and Opening Browser...
start http://localhost:3000
call npm run dev
