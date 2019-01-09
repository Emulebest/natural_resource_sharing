from django.urls import path
from .views import *

urlpatterns = [
    path('wallets/', WalletListView.as_view()),
    path('<int:pk>/', WalletRetrieveUpdateDeleteView.as_view()),
]
