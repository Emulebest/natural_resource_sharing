from rest_framework import serializers
from .models import *


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ('id', 'address_on', 'address_off', 'name', 'liter_per_second', 'purpose')
        read_only_fields = ('user',)
