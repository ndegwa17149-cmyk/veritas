from django.urls import path, include

urlpatterns = [
    path('', include('frontend_app.urls')),
]
