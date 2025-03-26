from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from .models import User
from .serializer import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer]
    
    def perform_create(self, serializer):
        user = serializer.save()
