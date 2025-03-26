from django.db import models
from django.utils import timezone

class Client(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    telephone = models.CharField(max_length=100)
    email = models.EmailField()
    gender = models.CharField(max_length=100)
    register_date = models.DateTimeField(default=timezone.now, editable=False)  
    
    class Meta:
        db_table = 'clients'
    
    def __str__(self):
        return f"{self.name} {self.surname}"