# Generated by Django 5.1.4 on 2025-03-27 23:22

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='register_date',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
    ]
