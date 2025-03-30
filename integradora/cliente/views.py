from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from .models import Client
from .serializers import ClientSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all().order_by('-register_date')
    serializer_class = ClientSerializer
    renderer_classes = [JSONRenderer]
    filterset_fields = ['name', 'email']  # Campos para filtrar

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]