from django.db import models
from backend.breeders.models import Breeder

class Message(models.Model):
    sender = models.ForeignKey(
        Breeder,
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )
    receiver = models.ForeignKey(
        Breeder,
        on_delete=models.CASCADE,
        related_name='received_messages'
    )
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} → {self.receiver}: {self.text[:30]}"
