@echo off
cd /d "c:\Users\ibrah\OneDrive\Desktop\veritas-phase1-main"

"C:\Program Files\Git\bin\git.exe" add index.html
"C:\Program Files\Git\bin\git.exe" commit -m "Add GitHub Pages homepage with mission/vision and deployment links"
"C:\Program Files\Git\bin\git.exe" push origin main

pause
