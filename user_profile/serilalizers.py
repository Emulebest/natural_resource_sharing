from rest_framework import serializers
from .models import *


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'name', 'surname', 'city', 'country', 'user',)
        read_only_fields = ('user',)
