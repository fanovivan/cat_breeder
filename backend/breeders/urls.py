from django.urls import path
from .views import register_breeder

urlpatterns = [
    path('register/', register_breeder, name='register_breeder'),
]
