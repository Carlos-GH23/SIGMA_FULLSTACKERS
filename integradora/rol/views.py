from django.shortcuts import render
from rest_framework.renderers import JSONRenderer
from .serializers import RolSerializer
from .models import rol
from rest_framework import viewsets

class RolViewSet(viewsets.ModelViewSet):
    queryset = rol.objects.all()
    serializer_class = RolSerializer
    renderer_classes = [JSONRenderer]
