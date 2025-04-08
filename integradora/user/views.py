from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from .models import User
from .serializer import UserSerializer, CustomTokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from django.core.mail import EmailMultiAlternatives
from email.mime.image import MIMEImage
import os



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer]

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'DELETE', 'GET']:
            return [IsAuthenticated()]
        return []
    
    def perform_create(self, serializer):
        user = serializer.save()

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class AppTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        """
        Genera el valor hash usando timestamp UTC (manejo consistente)
        """
        return (
            str(user.pk) + 
            str(timestamp) +  # Usamos timestamp UTC directamente
            str(user.is_active) + 
            str(user.reset_token_created_at.timestamp() if user.reset_token_created_at else '')
        )
logo_path = os.path.join(settings.BASE_DIR, 'static/images/logo.jpeg')
token_generator = AppTokenGenerator()

class PasswordResetView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        
        if user:
            try:
                user.reset_token_created_at = timezone.now()
                token = token_generator.make_token(user)
                user.reset_token = token
                user.save()
                
                
                
                reset_link = f"http://localhost:5173/reset-password?uid={user.id}&token={token}"
                
                logo_url = 'http://localhost:8000/static/images/logo.jpeg'
                
                subject = "🔐 Recuperación de contraseña - FullStakers"
                from_email = "no-reply@fullstakers.com"
                recipient_list = [email]
                
                html_message = f"""
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Recuperación de contraseña - FullStakers</title>
                    <style>
                        body {{
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            line-height: 1.6;
                            color: #2d3748;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f8fafc;
                        }}
                        .container {{
                            background-color: #ffffff;
                            border-radius: 8px;
                            padding: 30px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }}
                        .header {{
                            text-align: center;
                            margin-bottom: 25px;
                        }}
                        .logo {{
                            max-width: 180px;
                            margin-bottom: 20px;
                        }}
                        h1 {{
                            color: #2b6cb0;
                            font-size: 24px;
                            margin-top: 0;
                        }}
                        .button {{
                            display: inline-block;
                            padding: 12px 24px;
                            background-color: #4299e1;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 6px;
                            font-weight: 600;
                            margin: 20px 0;
                            transition: background-color 0.3s;
                        }}
                        .button:hover {{
                            background-color: #3182ce;
                        }}
                        .footer {{
                            margin-top: 30px;
                            font-size: 12px;
                            color: #718096;
                            text-align: center;
                            border-top: 1px solid #e2e8f0;
                            padding-top: 20px;
                        }}
                        .link {{
                            color: #4299e1;
                            word-break: break-all;
                        }}
                        .code {{
                            background-color: #edf2f7;
                            padding: 10px;
                            border-radius: 4px;
                            font-family: monospace;
                            word-break: break-all;
                        }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <img src="cid:logo" alt="FullStakers" class="logo">
                            <h1>Recuperación de contraseña</h1>
                        </div>
                        
                        <p>Hola,</p>
                        
                        <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en FullStakers.</p>
                        
                        <p style="text-align: center;">
                            <a href="{reset_link}" class="button">Restablecer contraseña</a>
                        </p>
                        
                        <p>Si el botón no funciona, copia y pega esta URL en tu navegador:</p>
                        <p class="code">{reset_link}</p>
                        
                        <p>Este enlace expirará en 1 hora por motivos de seguridad.</p>
                        
                        <p>Si no solicitaste este cambio, por favor ignora este mensaje o contacta a nuestro equipo de soporte.</p>
                        
                        <div class="footer">
                            <p>© {timezone.now().year} FullStakers. Todos los derechos reservados.</p>
                            <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                
                plain_message = f"""Hola,

Para restablecer tu contraseña en FullStakers, por favor visita el siguiente enlace:

<p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
<a href="{reset_link}">Cambio de contraseña</a>

Este enlace expirará en 1 hora. Si no solicitaste este cambio, ignora este mensaje.

Saludos,
El equipo de FullStakers
                """
                # Crear el mensaje alternativo con HTML
                message = EmailMultiAlternatives(
                    subject=subject,
                    body=plain_message,
                    from_email=from_email,
                    to=recipient_list,
                )
                
                # Adjuntar el HTML al mensaje
                message.attach_alternative(html_message, "text/html")
                
                # Adjuntar la imagen como un archivo MIME
                logo_path = os.path.join(settings.BASE_DIR, 'static/images/logo.jpeg')
                with open(logo_path, 'rb') as img_file:
                    img = MIMEImage(img_file.read())
                    img.add_header('Content-ID', '<logo>')  # Content-ID para referenciar en el HTML
                    message.attach(img)
                
                # Enviar el correo
                message.send()
                
                return Response({
                    'detail': 'Si el email existe, se ha enviado un enlace de recuperación',
                    'debug_token': token
                }, status=200)

            except Exception as e:
                print(f"Error al enviar correo: {str(e)}")
                return Response(
                    {'error': 'Error al procesar la solicitud'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            return Response(
                {'error': 'Usuario no encontrado'},
                status=status.HTTP_404_NOT_FOUND
            )

class PasswordResetConfirmView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        try:
            uid = int(request.data.get('uid'))
            token = request.data.get('token')
            new_password = request.data.get('password')
            
            user = User.objects.get(pk=uid)
            
            # Verificación con tiempo UTC
            expiration_time = user.reset_token_created_at + timedelta(minutes=5)
            is_token_valid = (
                user.reset_token and 
                user.reset_token == token and
                token_generator.check_token(user, token) and
                timezone.now() <= expiration_time
            )
            
            if not is_token_valid:
                local_expiration = timezone.localtime(expiration_time)
                raise ValidationError(
                    f"Token inválido o expirado (expiró el {local_expiration})"
                )
            
            # Cambiar contraseña e invalidar token
            user.set_password(new_password)
            user.reset_token = None
            user.reset_token_created_at = None
            user.save()
            
            # Construir URL del logo
            logo_path = os.path.join(settings.BASE_DIR, 'static/images/logo.jpeg')
            url_login = 'http://localhost:5173/login'
                     
            # Enviar correo de confirmación
            try:
                html_message = f"""
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {{
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            line-height: 1.6;
                            color: #2d3748;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f8fafc;
                        }}
                        .container {{
                            background-color: #ffffff;
                            border-radius: 8px;
                            padding: 30px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }}
                        .header {{
                            text-align: center;
                            margin-bottom: 25px;
                        }}
                        .logo {{
                            max-width: 180px;
                            margin-bottom: 20px;
                        }}
                        h1 {{
                            color: #38a169;
                            font-size: 24px;
                            margin-top: 0;
                        }}
                        .button {{
                            display: inline-block;
                            padding: 12px 24px;
                            background-color: #38a169;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 6px;
                            font-weight: 600;
                            margin: 20px 0;
                            transition: background-color 0.3s;
                        }}
                        .button:hover {{
                            background-color: #2f855a;
                        }}
                        .footer {{
                            margin-top: 30px;
                            font-size: 12px;
                            color: #718096;
                            text-align: center;
                            border-top: 1px solid #e2e8f0;
                            padding-top: 20px;
                        }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <img src="cid:logo" alt="FullStakers" class="logo">
                            <h1>✅ Contraseña actualizada con éxito</h1>
                        </div>
                        
                        <p>Hola {user.name},</p>
                        
                        <p>Tu contraseña en FullStakers ha sido cambiada exitosamente.</p>
                        
                        <p style="text-align: center;">
                            <a href="{url_login}" class="button">
                                Iniciar sesión ahora
                            </a>
                        </p>
                        
                        <p>Si no realizaste este cambio, por favor contacta a nuestro equipo de soporte inmediatamente.</p>
                        
                        <div class="footer">
                            <p>© {timezone.now().year} FullStakers. Todos los derechos reservados.</p>
                            <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                
                plain_message = f"""Hola {user.name},

Tu contraseña en FullStakers ha sido cambiada exitosamente.

Si no realizaste este cambio, por favor contacta a nuestro equipo de soporte inmediatamente.

Saludos,
El equipo de FullStakers
                """
                
                # Crear el mensaje alternativo con HTML
                message = EmailMultiAlternatives(
                    subject="✅ Confirmación de cambio de contraseña - FullStakers",
                    body=plain_message,
                    from_email="no-reply@fullstakers.com",
                    to=[user.email],
                )
                
                # Adjuntar el HTML al mensaje
                message.attach_alternative(html_message, "text/html")
                
                # Adjuntar la imagen como un archivo MIME
                with open(logo_path, 'rb') as img_file:
                    img = MIMEImage(img_file.read())
                    img.add_header('Content-ID', '<logo>')  # Content-ID para referenciar en el HTML
                    message.attach(img)
                
                # Enviar el correo
                message.send()
                
            except Exception as e:
                print(f"Error al enviar correo de confirmación: {str(e)}")
                # No fallar la operación solo por error en el correo
                pass
            
            return Response({
                "detail": "Contraseña actualizada correctamente",
                "email_sent": True
            })
            
        except (TypeError, ValueError):
            raise ValidationError("ID de usuario inválido")
        except User.DoesNotExist:
            raise ValidationError("Usuario no encontrado")