from django.urls import path
from .views import *

urlpatterns = [
    path('books/', BookListApiView.as_view()),
    path('<int:pk>/', BookRetrieveUpdateDeleteView.as_view()),
    path('upload/', BookFileUploadView.as_view()),
    path('read/<int:book_id>/', BookReadFileOnDeviceView.as_view())
]