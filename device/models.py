from django.contrib.auth.models import User
from django.db import models


class Device(models.Model):
    name = models.CharField(max_length=100)
    address_on = models.TextField(null=True)
    address_off = models.TextField(null=True)
    purpose = models.TextField(null=True)
    liter_per_second = models.FloatField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)