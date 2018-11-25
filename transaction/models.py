from enum import Enum

from django.db import models
from django.contrib.auth.models import User


class StatusChoices(Enum):
    APPROVED = "approved"
    PENDING = "pending"
    COMPLETE = "complete"


class WaterTransaction(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, on_delete=models.CASCADE)
    crypto_transaction = models.CharField()
    status = models.CharField(choices=[(tag, tag.value) for tag in StatusChoices])
