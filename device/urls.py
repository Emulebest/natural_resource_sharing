from django.urls import path
from .views import *

urlpatterns = [
    path('devices/', DeviceListCreateView.as_view()),
    path('<int:pk>/', DeviceRetrieveEditDeleteView.as_view()),
]
