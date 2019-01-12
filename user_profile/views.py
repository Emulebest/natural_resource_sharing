from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from web3 import Web3
from web3.personal import Personal

from user_profile.models import *
from user_profile.serilalizers import ProfileSerializer
from user_profile.utils import randomword
from wallet.models import Wallet
from .permissions import *
from water.models import *


class ProfileListCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        w3 = Web3(Web3.HTTPProvider("http://parity:8545"))
        personal = Personal(w3)
        password = randomword(10)
        address = personal.newAccount(password)
        Wallet.objects.create(address=address, user=self.request.user, balance=0, password=password)
        WaterSupply.objects.create(user=self.request.user, quantity=0)


class ProfileFilterView(APIView):
    def get(self, request, region):
        users = Profile.objects.filter(city=region) | Profile.objects.filter(country=region)
        return Response({"users": users}, status=status.HTTP_200_OK)


class ProfileExistsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            return Response({"result": True, "id": profile.id})
        except Profile.DoesNotExist:
            return Response({"result": False})


class ProfileEditDeleteRetrieveView(generics.RetrieveAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)