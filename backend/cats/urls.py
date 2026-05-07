from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CatViewSet, BreedViewSet

router = DefaultRouter()
router.register(r'cats', CatViewSet)
router.register(r'breeds', BreedViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
