from django import forms
from .models import ServiceDetail

class ServiceDetailForm(forms.ModelForm):
    class Meta:
        model = ServiceDetail
        fields = ['materials']
        widgets = {

            'materials': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Materiales utilizados'
            })
        }
        labels = {
        
            'materials': 'Materiales'
        }