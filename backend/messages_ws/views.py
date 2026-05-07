from rest_framework import viewsets
from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Message.objects.filter(sender=user).order_by('-created_at')
        return Message.objects.none()
