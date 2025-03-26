from rest_framework import serializers
from .models import ServiceDetail

class ServiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceDetail
        fields = '__all__'
        extra_kwargs = {
            'materials': {
                'error_messages': {
                    'required': 'Debe especificar los materiales'
                }
            }
        }