from rest_framework import serializers
from .models import *


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'name', 'author', 'num_pages', 'num_symbols', 'user', 'pub_house')
        read_only_fields = ('id', 'user',)


class BookFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookFile
        fields = ('file', 'book')
