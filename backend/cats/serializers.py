from rest_framework import serializers
from .models import Cat, Breed


class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = ['id', 'name']


class CatSerializer(serializers.ModelSerializer):
    breeder = serializers.ReadOnlyField(source='breeder.id')
    breeder_username = serializers.ReadOnlyField(source='breeder.username')

    class Meta:
        model = Cat
        fields = ['id', 'breeder', 'breeder_username', 'name', 'age', 'breed', 'hairiness', 'created_at']
