@echo off
cd /d "c:\Users\ibrah\OneDrive\Desktop\veritas-phase1-main"

"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Remove non-existent python-cors package from requirements"
"C:\Program Files\Git\bin\git.exe" push origin main

pause
