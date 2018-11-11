from django.urls import path
from .views import *

urlpatterns = [
    path('profiles/', ProfileListCreateView.as_view()),
    path('profile/<int:pk>/', ProfileRetrieveView.as_view()),
    path('profile/<int:pk>/', ProfileEditView.as_view()),
    path('profile/<int:pk>/', ProfileDeleteView.as_view())
]
