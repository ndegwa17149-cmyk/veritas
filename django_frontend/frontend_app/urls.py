from django.urls import path
from . import views

app_name = 'frontend_app'

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login_view, name='login'),
    path('submit/', views.submit_view, name='submit'),
]
