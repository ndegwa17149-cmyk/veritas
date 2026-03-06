@echo off
cd /d "c:\Users\ibrah\OneDrive\Desktop\veritas-phase1-main"

"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Fix Render deployment: make SECRET_KEY optional with auto-generation, allow PostgreSQL"
"C:\Program Files\Git\bin\git.exe" push origin main

pause
