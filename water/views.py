from rest_framework import generics
from .serializers import *


class WatterSupplyListApiView(generics.ListCreateAPIView):
    serializer_class = WatterSupplySerializer

    def get_queryset(self):
        return WaterSupply.objects.get(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WatterRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WatterSupplySerializer
    queryset = WaterSupply.objects.all()