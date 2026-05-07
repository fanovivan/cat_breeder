from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import BreederSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register_breeder(request):
    serializer = BreederSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(BreederSerializer(user).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
