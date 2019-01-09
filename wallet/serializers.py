from rest_framework import serializers
from .models import *


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ('address', 'balance', 'user', 'id', 'password')
        read_only_fields = ('user', 'id', 'password')
