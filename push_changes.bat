@echo off
cd /d "c:\Users\ibrah\OneDrive\Desktop\veritas-phase1-main"

echo === Git Status ===
"C:\Program Files\Git\bin\git.exe" status

echo.
echo === Adding changes ===
"C:\Program Files\Git\bin\git.exe" add .

echo.
echo === Committing ===
"C:\Program Files\Git\bin\git.exe" commit -m "Final Render deployment fixes: psycopg2cffi, optimized Dockerfile"

echo.
echo === Pushing to GitHub ===
"C:\Program Files\Git\bin\git.exe" push origin main

echo.
echo === Done! ===
pause
