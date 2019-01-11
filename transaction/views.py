import time

import requests
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from web3 import Web3
from rest_framework import generics
from .serializers import *
from multiprocessing import Process

from .models import *
from web3.eth import Eth


def transfer(to_address, from_address, value):
    w3 = Web3(Web3.HTTPProvider("http://parity:8545"))
    eth = Eth(w3)
    trans = eth.sendTransaction({"to": to_address, "from": from_address,
                                 "value": value})


def wei_to_eth(amount):
    return int(1000000000000000000 * amount)


class TransferWaterApiView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        data = request.data
        water_req = WaterRequest.objects.get(id=data["req"])
        from_user_id = request.user.id
        to_user_id = water_req.owner_id
        from_user = User.objects.get(id=from_user_id)
        to_user = User.objects.get(id=to_user_id)
        WaterTransaction.objects.create(from_user=from_user, to_user=to_user, req=water_req)
        from_user.water.quantity -= water_req.amount
        to_user.water.quantity += water_req.amount
        from_user.water.save()
        to_user.water.save()
        water_req.status = "closed"
        water_req.save()
        p = Process(target=transfer, args=(to_user.wallet.address, from_user.wallet.address, wei_to_eth(water_req.amount * water_req.price)))
        p.start()
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
