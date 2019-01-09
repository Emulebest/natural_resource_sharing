from django.urls import path
from .views import *

urlpatterns = [
    path('waters/', WaterSupplyListApiView.as_view()),
    path('<int:pk>/', WaterRetrieveUpdateDeleteView.as_view()),
]
