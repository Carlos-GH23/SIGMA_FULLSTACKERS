from django import forms
from .models import Client
from django.utils import timezone

class ClientForm(forms.ModelForm):
    class Meta:
        model = Client
        fields = ['name', 'surname', 'telephone', 'email', 'gender']  
        
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nombre del cliente'
            }),
            'surname': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Apellido del cliente'
            }),
            'telephone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Ej: 5512345678'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'ejemplo@correo.com'
            }),
            'gender': forms.Select(attrs={
                'class': 'form-control'
            })
        }
        
        labels = {
            'name': 'Nombre',
            'surname': 'Apellido',
            'telephone': 'Teléfono',
            'email': 'Correo Electrónico',
            'gender': 'Género'
        }

    def clean_telephone(self):
        telephone = self.cleaned_data.get('telephone')
        if not telephone.isdigit():
            raise forms.ValidationError("El teléfono solo debe contener números")
        if len(telephone) < 10:
            raise forms.ValidationError("El teléfono debe tener al menos 10 dígitos")
        return telephone

    def save(self, commit=True):
        client = super().save(commit=False)
        if not client.pk:  
            client.register_date = timezone.now()
        if commit:
            client.save()
        return client