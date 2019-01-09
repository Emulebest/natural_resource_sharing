from rest_framework import generics
from web3 import Web3
from web3.eth import Eth

from .serializers import *


class WalletListView(generics.ListAPIView):
    serializer_class = WalletSerializer

    def get_queryset(self):
        w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
        wallet = Wallet.objects.get(user=self.request.user)
        eth = Eth(w3)
        balance = eth.getBalance(wallet.address)
        wallet.balance = balance
        wallet.save()
        return wallet


class WalletRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WalletSerializer
    queryset = Wallet.objects.all()
