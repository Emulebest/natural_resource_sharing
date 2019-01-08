from django.urls import path
from .views import *

urlpatterns = [
    path('profiles/', ProfileListCreateView.as_view()),
    path('exists/', ProfileExistsView.as_view()),
    path('<int:pk>/', ProfileEditDeleteRetrieveView.as_view()),
]
