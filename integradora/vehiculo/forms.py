from django import forms
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from .models import Vehicle

class VehicleForm(forms.ModelForm):
    class Meta:
        model = Vehicle
        fields = ['brand', 'model', 'service_number', 'year', 'plate', 'color', 'fuel_type']
        
        widgets = {
            'brand': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Marca del vehículo'
            }),
            'model': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Modelo del vehículo'
            }),
            'service_number': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': 'Número de servicio'
            }),
            'year': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': 'Año de fabricación',
                'min': '1900',
                'max': str(timezone.now().year)
            }),
            'plate': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Placa del vehículo'
            }),
            'color': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Color del vehículo'
            }),
            'fuel_type': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Tipo de combustible'
            }),
            'image_url': forms.URLInput(attrs={
                'class': 'form-control', 
                'placeholder': 'URL de la imagen'
            })
        }
        
        labels = {
            'brand': 'Marca',
            'model': 'Modelo',
            'service_number': 'Número de servicio',
            'year': 'Año',
            'plate': 'Placa',
            'color': 'Color',
            'fuel_type': 'Combustible',
            'image_url': 'URL de la imagen'
        }
        
        error_messages = {
            'plate': {
                'unique': 'Esta placa ya está registrada',
                'required': 'La placa es obligatoria'
            },
            'year': {
                'invalid': 'Ingrese un año válido',
                'min_value': 'El año debe ser posterior a 1900',
                'max_value': f"El año no puede ser mayor a {timezone.now().year}"
            }
        }

    def clean_year(self):
        year = self.cleaned_data['year']
        current_year = timezone.now().year
        if year < 1900:
            raise forms.ValidationError("El año debe ser posterior a 1900")
        if year > current_year:
            raise forms.ValidationError(f"El año no puede ser mayor a {current_year}")
        return year

    def clean_plate(self):
        plate = self.cleaned_data['plate']
        if not plate.isalnum():
            raise forms.ValidationError("La placa solo debe contener letras y números")
        return plate.upper()