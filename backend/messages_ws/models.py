from django.db import models
from ..breeders.models import Breeder


class Message(models.Model):
    sender = models.ForeignKey(Breeder, on_delete=models.CASCADE, related_name='sent_messages')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender.username}: {self.text[:30]}'
