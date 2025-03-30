from django.shortcuts import render
from rest_framework.renderers import JSONRenderer
from .serializers import RolSerializer
from .models import Role
from rest_framework import viewsets
""" from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication """

class RolViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RolSerializer
    renderer_classes = [JSONRenderer]
""" 
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated] """
""" LO COMENTADO ES PARA EL TOKEN EN CASO DE NECESITAR SOLO DESCOMENTAR """