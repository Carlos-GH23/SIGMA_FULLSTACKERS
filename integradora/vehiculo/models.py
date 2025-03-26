from django.db import models
from cliente.models import Client  # Consistent import

class Vehicle(models.Model):
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    service_number = models.IntegerField()
    year = models.IntegerField()
    plate = models.CharField(max_length=20, unique=True)
    color = models.CharField(max_length=50)
    fuel_type = models.CharField(max_length=20)
    client = models.ForeignKey(
        Client,  
        on_delete=models.CASCADE,
        related_name='vehicles'
    )

    class Meta:
        db_table = 'vehicles'
    
    def __str__(self):
        return f"{self.brand} {self.model} ({self.plate})"