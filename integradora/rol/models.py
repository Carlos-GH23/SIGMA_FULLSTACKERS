from django.db import models


class Role(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'roles'
    
    def __str__(self):
        return self.name



