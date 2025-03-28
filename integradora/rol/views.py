from django.shortcuts import render
from rest_framework.renderers import JSONRenderer
from .serializers import RolSerializer
from .models import Role
from rest_framework import viewsets

class RolViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RolSerializer
    renderer_classes = [JSONRenderer]
