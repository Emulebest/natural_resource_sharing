from rest_framework import serializers
from .models import *
from rest_auth.registration.serializers import RegisterSerializer
from wallet.models import Wallet
from web3.personal import Personal
from .utils import randomword
from web3 import Web3


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'name', 'surname', 'city', 'country')
        read_only = ('user',)


class CustomRegisterSerializer(RegisterSerializer):
    def save(self, request):
        w3 = Web3(Web3.HTTPProvider("127.0.0.1:8545"))
        personal = Personal(w3)
        user = super().save(request)
        address = personal.newAccount(randomword(10))
        Wallet.objects.create(address=address, user=user, balance=0)
        return user
