from django.db import models
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50)


class Card(models.Model):
    question = models.CharField(max_length=150)
    answer = models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.question + self.answer
