from rest_framework import serializers
from .models import Breeder


class BreederSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Breeder
        fields = ['id', 'username', 'password', 'email', 'phone', 'address']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Breeder(**validated_data)
        user.set_password(password)
        user.save()
        return user
