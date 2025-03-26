from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
        extra_kwargs = {
            'cost': {
                'error_messages': {
                    'invalid': 'Ingrese un monto válido'
                }
            },
            'date': {
                'error_messages': {
                    'invalid': 'Ingrese una fecha válida'
                }
            }
        }