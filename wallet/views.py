from rest_framework import generics
from web3 import Web3
from web3.eth import Eth

from .serializers import *


class WalletListView(generics.ListAPIView):
    serializer_class = WalletSerializer

    def get_queryset(self):
        w3 = Web3(Web3.HTTPProvider("http://parity:8545"))
        wallets = Wallet.objects.filter(user=self.request.user)
        wallet = wallets[0]
        eth = Eth(w3)
        balance = eth.getBalance(wallet.address)
        wallet.balance = balance
        wallet.save()
        return wallets


class WalletRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WalletSerializer
    queryset = Wallet.objects.all()
