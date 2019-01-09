from django.urls import path
from .views import *

urlpatterns = [
    path('waters/', WatterSupplyListApiView.as_view()),
    path('<int:pk>/', WatterRetrieveUpdateDeleteView.as_view()),
]
