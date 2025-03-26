from django import forms
from .models import Role

class RoleForm(forms.ModelForm):
    class Meta:
        model = Role
        fields = ['name']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Ingrese el nombre del rol',
                'autofocus': 'autofocus'
            })
        }
        labels = {
            'name': 'Nombre del Rol'
        }
        error_messages = {
            'name': {
                'required': 'Este campo es obligatorio',
                'max_length': 'El nombre no puede exceder los 100 caracteres'
            }
        }

    def clean_name(self):
        name = self.cleaned_data.get('name')
        if not name.strip():
            raise forms.ValidationError("El nombre del rol no puede estar vacío")
        return name.strip()