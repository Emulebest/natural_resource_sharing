from rest_framework import serializers
from .models import *


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class WaterRequestSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True)

    class Meta:
        model = WaterRequest
        fields = ('mode', 'owner', 'price', 'amount', 'status', 'id', 'owner')
        read_only_fields = ('id', 'owner', 'status')
