from django.db import models
from servicio.models import Service

class ServiceDetail(models.Model):
    materials = models.CharField(max_length=100)

    class Meta:
        db_table = 'service_details'
    
    def __str__(self):
        return self.materials