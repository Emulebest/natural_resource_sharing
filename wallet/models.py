from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Wallet(models.Model):
    address = models.TextField()
    balance = models.FloatField(default=0)
    password = models.TextField(null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)