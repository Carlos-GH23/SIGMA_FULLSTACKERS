from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import *

router = SimpleRouter()

router.register(r'api', ClientViewSet)

urlpatterns =[
    path('', include(router.get_urls))
]