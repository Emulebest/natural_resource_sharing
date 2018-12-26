from rest_framework import serializers
from .models import *


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ('address', 'balance')
        read_only = ('user', 'id')
