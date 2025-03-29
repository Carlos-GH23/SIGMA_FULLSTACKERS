from rest_framework import serializers
from .models import User
from rol.models import Role

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    role_id = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        source='role',
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = User
        fields = ['id', 'email', 'token', 'password', 'name', 'role', 'role_id']
        extra_kwargs = {
            'email': {
                'error_messages': {
                    'required': 'El correo electrónico es obligatorio',
                    'invalid': 'Ingrese un correo electrónico válido',
                    'unique': 'Este correo electrónico ya está registrado'
                }
            },
            'password': {
                'write_only': True,
                'error_messages': {
                    'required': 'La contraseña es obligatoria',
                    'max_length': 'La contraseña no puede exceder los 20 caracteres'
                }
            },
            'name': {
                'error_messages': {
                    'required': 'El nombre es obligatorio'
                }
            }
        }

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("La contraseña debe tener al menos 8 caracteres")
        return value
    
    def create(self, validated_data):
        # Extraemos la contraseña de los datos validados
        password = validated_data.pop('password', None)
        
        # Creamos el usuario
        user = super().create(validated_data)
        
        # Encriptamos la contraseña antes de guardarla
        if password:
            user.set_password(password)  # Encriptamos la contraseña
            user.save()  # Guardamos el usuario con la contraseña encriptada
        
        return user

    def update(self, instance, validated_data):
        # Si la contraseña está en los datos validados, la encriptamos
        password = validated_data.pop('password', None)
        
        # Actualizamos los campos del usuario
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Encriptamos la contraseña si se proporciona una nueva
        if password:
            instance.set_password(password)
            
        instance.save()
        return instance