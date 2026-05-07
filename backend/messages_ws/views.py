from rest_framework import viewsets

from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Message.objects.all().select_related("sender").order_by("created_at")
        return Message.objects.none()
