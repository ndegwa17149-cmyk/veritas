@echo off
cd /d "c:\Users\ibrah\OneDrive\Desktop\veritas-phase1-main"

"C:\Program Files\Git\bin\git.exe" init
"C:\Program Files\Git\bin\git.exe" config user.name "Ibrahim"
"C:\Program Files\Git\bin\git.exe" config user.email "developer@veritas.local"
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Production-ready Veritas: security hardening, Docker, deployment docs"
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/ndegwa17149-cmyk/veritas.git
"C:\Program Files\Git\bin\git.exe" branch -M main
"C:\Program Files\Git\bin\git.exe" push -u origin main

pause
