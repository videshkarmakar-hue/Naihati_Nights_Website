@echo off
REM ============================================================
REM  Naihati Nights Website - manual deploy to Cloudflare Pages
REM  Usage:  deploy.cmd
REM  Deploys the current build to project "naihatinights".
REM  (Auto-deploy from GitHub is connected on the Cloudflare side;
REM   use this only when you want to push a local build manually.)
REM ============================================================
setlocal
cd /d "%~dp0"

echo [1/3] Installing dependencies (bun)...
call bun.cmd install || exit /b 1

echo [2/3] Building (dist/) ...
call bun.cmd run build || exit /b 1

echo.
echo [3/3] NOTE: removing legacy local APKs from dist (GitHub Releases hosts them)
if exist dist\downloads (
  for %%F in (dist\downloads\*.apk) do (
    if %%~zF GTR 24000000 del /Q "%%F"
  )
)

echo Deploying to Cloudflare Pages (project: naihatinights)...
call npx.cmd wrangler pages deploy dist --project-name=naihatinights --branch=main --commit-dirty=true
endlocal
