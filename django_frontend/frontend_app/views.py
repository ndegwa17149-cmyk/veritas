from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse
from pathlib import Path


def index(request):
    """If a built SPA exists in `frontend_spa/dist`, serve its index.html directly.
    Otherwise fall back to the server-rendered template for quick dev."""
    spa_index = Path(settings.BASE_DIR) / 'frontend_spa' / 'dist' / 'index.html'
    if spa_index.exists():
        return HttpResponse(spa_index.read_text(encoding='utf-8'), content_type='text/html')

    # Fallback to the server-rendered template
    return render(request, 'frontend_app/index.html')


def login_view(request):
    return render(request, 'frontend_app/login.html')


def submit_view(request):
    return render(request, 'frontend_app/submit.html')
