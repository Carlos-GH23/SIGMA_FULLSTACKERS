from django.shortcuts import render
from .models import Vehicle
from .serializer import VehicleSerializer
from rest_framework import viewsets
from .forms import VehicleForm
from rest_framework.renderers import JSONRenderer

class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    renderer_classes = [JSONRenderer]

def vista_vehiculo(req):
    form = VehicleForm
    return render(req, 'vista.html', {'form': form})