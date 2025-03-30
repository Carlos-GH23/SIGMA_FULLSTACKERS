from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from .models import ServiceDetail
from .serializers import ServiceDetailSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class ServiceDetailViewSet(viewsets.ModelViewSet):
    queryset = ServiceDetail.objects.select_related('service').all()
    serializer_class = ServiceDetailSerializer
    renderer_classes = [JSONRenderer]

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
