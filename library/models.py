from django.contrib.auth.models import User
from django.db import models


class Book(models.Model):
    name = models.TextField()
    author = models.TextField()
    num_pages = models.IntegerField()
    num_symbols = models.IntegerField()
    pub_house = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class BookFile(models.Model):
    file = models.FileField()
    book = models.OneToOneField(Book, on_delete=models.CASCADE, related_name="book_file")