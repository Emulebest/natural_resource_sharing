from rest_framework import serializers
from .models import *


class WaterSupplySerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterSupply
        fields = ('quantity', 'user', 'id')
        read_only_fields = ('user', 'id')