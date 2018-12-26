from rest_framework import generics
from .serializers import *


class WalletListView(generics.ListAPIView):
    serializer_class = WalletSerializer

    def get_queryset(self):
        return Wallet.objects.get(user=self.request.user)