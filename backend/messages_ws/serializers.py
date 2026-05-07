from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.username')

    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_username', 'text', 'created_at']
        read_only_fields = ['id', 'sender', 'sender_username', 'created_at']
