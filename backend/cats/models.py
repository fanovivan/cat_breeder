from django.db import models
from backend.breeders.models import Breeder

class Breed(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Cat(models.Model):
    hairiness_choices = [
        ('short', 'Короткошёрстная'),
        ('medium', 'Средняя'),
        ('long', 'Длинношёрстная'),
    ]

    breeder = models.ForeignKey(
        Breeder,
        on_delete=models.CASCADE,
        related_name='cats'
    )
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    breed = models.ForeignKey(
        Breed,
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
    hairiness = models.CharField(max_length=10, choices=hairiness_choices)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.breeder.username})"
