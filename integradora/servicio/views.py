from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from .models import Service
from .serializers import ServiceSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.select_related('vehicle').all()
    serializer_class = ServiceSerializer
    renderer_classes = [JSONRenderer]
    filter_fields = ['date', 'vehicle__plate']  