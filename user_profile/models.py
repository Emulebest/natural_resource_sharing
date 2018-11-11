from django.db import models
from django.contrib.auth.models import User

COUNTRIES = (
    ('US', "United States of America"),
    ('UA', "Ukraine")
)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.TextField()
    surname = models.TextField()
    city = models.TextField()
    country = models.CharField(max_length=2, choices=COUNTRIES)
