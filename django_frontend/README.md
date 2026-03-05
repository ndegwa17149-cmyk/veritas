# Django frontend for Veritas (minimal scaffold)

This folder contains a minimal Django project that provides a Bootstrap-based frontend which consumes the existing FastAPI JSON API at `/api/*`.

Quick start (from repository root):

Windows (PowerShell):
```powershell
python -m venv .venv_frontend
.\.venv_frontend\Scripts\activate
pip install -r requirements.txt
cd django_frontend
python manage.py runserver 8001
```

Notes:
- The frontend uses client-side `fetch` to call the FastAPI endpoints (CORS is enabled in the backend).
- Login stores the JWT access token in `localStorage` and uses it for protected requests (e.g., submissions).
- This is a minimal scaffold to iterate on — we can convert pages to a full SPA (React/Vue) later if you prefer.
This repo now includes a minimal React + Vite SPA at `django_frontend/frontend_spa` that consumes the FastAPI `/api/*` endpoints.

Running the SPA in development (recommended):

Windows (PowerShell):
```powershell
cd django_frontend/frontend_spa
npm install
npm run dev
```

The Vite dev server proxies `/api` to `http://localhost:8000` by default; run the FastAPI backend locally on port 8000.

Production build:

```powershell
cd django_frontend/frontend_spa
npm run build
# copy the `dist` output to your static hosting or configure Django to serve the built files
```

Serve built SPA with Django (integrated deployment):

1. Build the SPA:

```powershell
cd django_frontend/frontend_spa
npm run build
```

2. Copy the `dist` output into the project (the settings include `frontend_spa/dist` in Django static dirs):

```powershell
# from django_frontend/frontend_spa
# copy built files into the expected static directory
cp -r dist ..\dist
```

3. Run Django and it will serve `index.html` at `/` (the view serves the built SPA index if present).

Notes:
- The SPA reads/writes the FastAPI JWT token from `localStorage` and uses it for protected requests.
- For production, serve static files with your webserver (Nginx) and run Django with a WSGI server.
