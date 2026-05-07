from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('rest_framework.urls')),
    path('api/', include('breeders.urls')),
    path('api/', include('cats.urls')),
    path('api/', include('messages_ws.urls')),
]
