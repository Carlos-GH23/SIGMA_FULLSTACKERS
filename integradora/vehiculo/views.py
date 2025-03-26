from django.shortcuts import render
from .models import vehiculo
from .serializer import VehiculoSerializer
from rest_framework import viewsets
from .forms import VehiculoForm
from rest_framework.renderers import JSONRenderer

class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = vehiculo.objects.all()
    serializer_class = VehiculoSerializer
    renderer_classes = [JSONRenderer]

def vista_vehiculo(req):
    form = VehiculoForm
    return render(req, 'vista.html', {'form': form})