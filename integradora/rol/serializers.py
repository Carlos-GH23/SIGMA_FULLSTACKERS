from rest_framework import serializers
from .models import rol

class RolSerializer(serializers.ModelSerializer):
    class Meta: 
        model = rol
        fields = '__all__'
        extra_kwargs = {
            'name': {
                'error_messages': {
                    'blank': 'El nombre del rol no puede estar vacío',
                    'max_length': 'El nombre no puede exceder los 100 caracteres'
                }
            }
        }

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("El nombre del rol no puede estar vacío")
        return value.strip()