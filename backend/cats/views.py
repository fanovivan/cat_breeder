from rest_framework import viewsets
from .models import Cat, Breed
from .serializers import CatSerializer, BreedSerializer


class CatViewSet(viewsets.ModelViewSet):
    serializer_class = CatSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Cat.objects.filter(breeder=user).order_by('-created_at')
        return Cat.objects.none()

    def perform_create(self, serializer):
        serializer.save(breeder=self.request.user)


class BreedViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Breed.objects.all().order_by('name')
    serializer_class = BreedSerializer
