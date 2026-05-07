from django.db import models
from ..breeders.models import Breeder


class Breed(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Cat(models.Model):
    HAIRINESS_CHOICES = [
        ('short', 'Short'),
        ('medium', 'Medium'),
        ('long', 'Long'),
    ]

    breeder = models.ForeignKey(Breeder, on_delete=models.CASCADE, related_name='cats')
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    breed = models.ForeignKey(Breed, on_delete=models.SET_NULL, null=True, blank=True)
    hairiness = models.CharField(max_length=10, choices=HAIRINESS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
