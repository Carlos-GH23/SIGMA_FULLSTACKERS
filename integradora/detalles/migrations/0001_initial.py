# Generated by Django 5.1.5 on 2025-03-26 06:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('servicio', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServiceDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('materials', models.CharField(max_length=100)),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('cost', models.DecimalField(decimal_places=2, max_digits=10)),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='details', to='servicio.service')),
            ],
            options={
                'db_table': 'service_details',
            },
        ),
    ]
