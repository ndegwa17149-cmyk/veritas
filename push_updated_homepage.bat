@echo off
cd /d "c:\Users\ibrah\OneDrive\Desktop\veritas-phase1-main"

"C:\Program Files\Git\bin\git.exe" add index.html
"C:\Program Files\Git\bin\git.exe" commit -m "Update GitHub Pages to match Django app homepage with navigation and assets layout"
"C:\Program Files\Git\bin\git.exe" push origin main

pause
