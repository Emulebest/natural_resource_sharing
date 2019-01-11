import time

import requests
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
        w3 = Web3(Web3.HTTPProvider("http://parity:8545"))
        eth = Eth(w3)
        data = request.data
        water_req = WaterRequest.objects.get(id=data["req"])
        from_user_id = request.user.id
        to_user_id = water_req.owner_id
        from_user = User.objects.get(id=from_user_id)
        to_user = User.objects.get(id=to_user_id)
        trans = eth.sendTransaction({"to": to_user.wallet.address, "from": from_user.wallet.address,
                                     "value": int(water_req.amount * water_req.price)})
        WaterTransaction.objects.create(from_user=from_user, to_user=to_user, req=water_req, crypto_transaction=trans)
        from_user.water.quantity -= water_req.amount * water_req.price
        to_user.water.quantity += water_req.amount * water_req.price
        # TransferWaterApiView.send_water(from_user, water_req.amount)
        return Response({"status": "ok"})

    @staticmethod
    def send_water(user: User, amount):
        device = user.devices.all().first()
        wait = amount / device.liter_per_second
        requests.get(device.address_on)
        time.sleep(wait)
        requests.get(device.address_off)


class WaterRequestApiView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = WaterRequestSerializer
    queryset = WaterRequest.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class WaterRequestEditDeleteRequestApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = WaterRequestSerializer
    queryset = WaterRequest.objects.all()
