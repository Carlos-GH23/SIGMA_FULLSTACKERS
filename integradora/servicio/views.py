from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from .models import Service
from .serializers import ServiceSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.select_related('vehicle').all()
    serializer_class = ServiceSerializer
    renderer_classes = [JSONRenderer]
    filter_fields = ['date', 'vehicle__plate']

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]




    