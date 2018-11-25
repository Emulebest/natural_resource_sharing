from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated

from device.models import Device


class DeviceListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Device.objects.filter(user=self.request.user)