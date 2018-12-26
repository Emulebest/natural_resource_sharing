from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *


class TransferWater(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        data = request.data
        from_user_id = data["from_user"]
        to_user_id = data["to_user"]
        from_user = User.objects.get(from_user_id)
        to_user = User.objects.get(to_user_id)
        WaterTransaction.objects.create(from_user=from_user, to_user=to_user, amount=data["amount"],
                                        crypto_transaction="test", status=StatusChoices.COMPLETE)
        from_user.water.quantity -= data["amount"]
        to_user.water.quantity += data["amount"]
        return Response({"status": "ok"})
