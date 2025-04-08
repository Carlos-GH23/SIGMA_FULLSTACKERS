from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView
from django_rest_passwordreset.views import (
    ResetPasswordRequestToken,
    ResetPasswordConfirm
)

router = SimpleRouter()
router.register(r'api', UserViewSet)

urlpatterns =[
    path('', include(router.urls)),
    path('token/', CustomTokenObtainPairView.as_view(), name='obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),    
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]