@echo off
REM ============================================================
REM  Naihati Nights Website - manual deploy to Cloudflare Pages
REM  Usage:  deploy.cmd
REM  Deploys the current build to project "naihatinights".
REM
REM  Auto-deploy from GitHub is connected on the Cloudflare side;
REM  use this only when you want to push a local build manually.
REM
REM  What it does:
REM    1. bun install
REM    2. bun run build   (vite -> dist/)
REM    3. wrangler pages deploy dist --project-name=naihatinights
REM ============================================================
setlocal
cd /d "%~dp0"

if not exist "bun.exe" (
  echo [ERROR] bun.exe not found. Install Bun from https://bun.sh
  exit /b 1
)

echo [1/3] Installing dependencies (bun)...
call bun install || exit /b 1

echo [2/3] Building (dist/) ...
call bun run build || exit /b 1

if not exist "dist\index.html" (
  echo [ERROR] Build produced no dist\index.html. Check your vite config and followed the build exit code above.
  exit /b 1
)

echo.
echo Deploying to Cloudflare Pages (project: naihatinights)...
call npx wrangler pages deploy dist --project-name=naihatinights --branch=main --commit-dirty --skip-caching
if %errorlevel% neq 0 (
  echo [ERROR] wrangler pages deploy failed.
  exit /b %errorlevel%
)

echo.
echo [OK] Deployed to https://naihatinights.pages.dev
endlocal
