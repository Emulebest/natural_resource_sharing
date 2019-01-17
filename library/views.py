from django.shortcuts import render
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import requests

from .serializers import *


class BookListApiView(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        return Book.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookSerializer
    queryset = Book.objects.all()


class BookFileUploadView(generics.CreateAPIView):
    serializer_class = BookFileSerializer
    parser_classes = (MultiPartParser, FormParser)


class BookReadFileOnDeviceView(APIView):
    def get(self, request, book_id):
        book = Book.objects.get(id=book_id)
        content = book.book_file.file.read()
        user: User = self.request.user
        active_device = user.devices.all()[0]
        requests.post(active_device.address_on, files={"text": content})
        return Response({"status": "OK"}, status=status.HTTP_200_OK)

