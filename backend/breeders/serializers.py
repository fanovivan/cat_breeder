from rest_framework import serializers
from .models import Breeder

class BreederSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breeder
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Breeder.objects.create_user(**validated_data)
        return user
