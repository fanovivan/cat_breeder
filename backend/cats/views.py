from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Cat, Breed
from .serializers import CatSerializer, BreedSerializer

class CatViewSet(viewsets.ModelViewSet):
    serializer_class = CatSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Cat.objects.filter(breeder=user)
        return Cat.objects.none()

    @action(detail=True, methods=['get'])
    def details(self, request, pk=None):
        cat = self.get_object()
        serializer = self.get_serializer(cat)
        return Response(serializer.data)

class BreedViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Breed.objects.all()
    serializer_class = BreedSerializer
