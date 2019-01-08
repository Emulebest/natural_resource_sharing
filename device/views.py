from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated

from device.models import Device
from device.serilalizers import DeviceSerializer


class DeviceListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DeviceSerializer

    def get_queryset(self):
        return Device.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DeviceRetrieveEditDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DeviceSerializer
    queryset = Device.objects.all()
