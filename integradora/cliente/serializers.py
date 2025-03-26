from rest_framework import serializers
from .models import Client
from django.utils import timezone

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
        read_only_fields = ('register_date',)  
    
    def create(self, validated_data):
        validated_data['register_date'] = timezone.now()
        return super().create(validated_data)