from rest_framework import serializers
from .models import Breed, Cat

class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = '__all__'

class CatSerializer(serializers.ModelSerializer):
    breeder = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Cat
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['breeder'] = request.user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        request = self.context.get('request')
        if instance.breeder != request.user:
            raise serializers.ValidationError(
                'Вы не можете редактировать чужого кота.'
            )
        return super().update(instance, validated_data)
