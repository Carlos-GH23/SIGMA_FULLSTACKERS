from rest_framework import serializers
from .models import Vehicle

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'
        extra_kwargs = {
            'plate': {
                'error_messages': {
                    'blank': 'La placa no puede estar vacía',
                    'unique': 'Esta placa ya existe'
                }
            },
            'year': {
                'error_messages': {
                    'invalid': 'Ingrese un año válido',
                    'max_value': 'El año no puede ser futuro',
                    'min_value': 'El año debe ser posterior a 1900'
                }
            }
        }

    def validate_year(self, value):
        from datetime import datetime
        current_year = datetime.now().year
        if value < 1900:
            raise serializers.ValidationError("El año debe ser posterior a 1900")
        if value > current_year:
            raise serializers.ValidationError("El año no puede ser futuro")
        return value

    def validate_plate(self, value):
        if not value.isalnum():
            raise serializers.ValidationError("La placa solo debe contener letras y números")
        return value.upper()