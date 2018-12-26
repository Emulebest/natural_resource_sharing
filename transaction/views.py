from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from web3 import Web3
from rest_framework import generics
from .serializers import *

from .models import *
from web3.eth import Eth


class TransferWaterApiView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        w3 = Web3(Web3.HTTPProvider("127.0.0.1:8545"))
        eth = Eth(w3)
        data = request.data
        water_req = WaterRequest.objects.get(data["req"])
        from_user_id = data["from_user"]
        to_user_id = data["to_user"]
        from_user = User.objects.get(from_user_id)
        to_user = User.objects.get(to_user_id)
        trans = eth.sendTransaction({"to": to_user.wallet.address, "from": from_user.wallet.address, "value": water_req.amount * water_req.price})
        WaterTransaction.objects.create(from_user=from_user, to_user=to_user, req=water_req, crypto_transaction=trans)
        from_user.water.quantity -= water_req.amount * water_req.price
        to_user.water.quantity += water_req.amount * water_req.price
        return Response({"status": "ok"})


class WaterRequestApiView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = WaterRequestSerializer

    def get_queryset(self):
        mode = self.kwargs["mode"]
        return WaterRequest.objects.filter(mode=mode)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
