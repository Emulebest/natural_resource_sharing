from django.db import models

# Create your models here.


class Wallet(models.Model):
    private_key = models.CharField()
    public_key = models.CharField()
    balance = models.FloatField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE)