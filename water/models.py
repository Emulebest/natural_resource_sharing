from django.contrib.auth.models import User
from django.db import models
from device.models import Device


class WaterSupply(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    quantity = models.FloatField(default=0)
