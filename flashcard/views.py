from rest_framework import viewsets
from .models import Card, Category
from .serializers import CardSerializers, CategorySerializers


class CardView(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializers


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers
