from django import forms
from .models import Service

class ServiceForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = ['name', 'description', 'date', 'cost', 'vehicle']
        widgets = {
            'cost': forms.NumberInput(attrs={
                'class': 'form-control',
                'step': '0.01',
                'min': '0'
            }),
            'date': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control'
            }),
            'image_url': forms.URLInput(attrs={
                'class': 'form-control', 
                'placeholder': 'URL de la imagen'
            })
        }
        labels = {
            'cost': 'Costo del Servicio',
            'date': 'Fecha del Servicio',
            'image_url': 'URL de la imagen'
        }

    def clean_cost(self):
        data = self.cleaned_data['cost']
        if data <= 0:
            raise forms.ValidationError("El costo debe ser mayor a 0")
        return data