from django.urls import path
from .views import *

urlpatterns = [
    path('transactions/', WaterRequestApiView.as_view()),
    path('send/', TransferWaterApiView.as_view()),
    path('<int:pk>/', WaterRequestEditDeleteRequestApiView.as_view()),
]
