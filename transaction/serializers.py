from rest_framework import serializers
from .models import *


class WaterRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterRequest
        fields = ('mode', 'owner', 'price', 'amount', 'status', 'id', 'owner')
        read_only_fields = ('id', 'owner')