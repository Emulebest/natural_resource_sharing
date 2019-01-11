from enum import Enum

from django.db import models
from django.contrib.auth.models import User


class StatusChoices(Enum):
    OPEN = "open"
    CLOSED = "closed"


class BuySell(Enum):
    BUY = "buy"
    SELL = "sell"


class WaterRequest(models.Model):
    mode = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="requester")
    price = models.FloatField()
    amount = models.FloatField()
    status = models.TextField(choices=[(tag, tag.value) for tag in StatusChoices], default="open")


class WaterTransaction(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="from_user")
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="to_user")
    req = models.ForeignKey(WaterRequest, on_delete=models.CASCADE, related_name="transaction")
