from rest_framework import serializers
from .models import *


class WatterSupplySerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterSupply
        fields = ('quantity',)
        read_only = ('user', 'id')