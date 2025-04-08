from django.db import models
from servicio.models import Service

class ServiceDetail(models.Model):
    materials = models.CharField(max_length=100)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='details')

    class Meta:
        db_table = 'service_details'
    
    def __str__(self):
        return self.materials