from rest_framework import generics
from .serializers import *


class WaterSupplyListApiView(generics.ListCreateAPIView):
    serializer_class = WaterSupplySerializer

    def get_queryset(self):
        return WaterSupply.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WaterRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WaterSupplySerializer
    queryset = WaterSupply.objects.all()