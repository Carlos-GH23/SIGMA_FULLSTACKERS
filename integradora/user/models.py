from django.db import models
from rol.models import Role

# Create your models here.
class User(models.Model):
    email = models.EmailField(unique=True)
    token = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, related_name='users')

    class Meta:
        db_table = 'users'
    
    def __str__(self):
        return f"{self.name} {self.surname}"