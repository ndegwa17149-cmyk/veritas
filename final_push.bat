@echo off
cd /d "c:\Users\ibrah\OneDrive\Desktop\veritas-phase1-main"

"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Fix Render deployment: use psycopg3 instead of psycopg2cffi"
"C:\Program Files\Git\bin\git.exe" push origin main

pause
