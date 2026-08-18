@echo off
cd /d "%~dp0"

if not exist node_modules (
  echo Installing dependencies...
  call npm install
)

start "HomeKeeper dev server" cmd /k "npm run dev -- --host 127.0.0.1 --port 5187 --strictPort"
timeout /t 3 >nul
start http://127.0.0.1:5187/
