from rest_framework import serializers
from .models import Card, Category


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name',)


class CardSerializers(serializers.ModelSerializer):
    category = CategorySerializers()

    class Meta:
        model = Card
        fields = ('id', 'question', 'answer', 'category')

    def create(self, validated_data):
        # TODO :
        # Use id instead of name
        # ?Why in validated_data the category field only contain the name attribute
        category_dict = validated_data.pop('category')
        test = category_dict['name']
        category = Category.objects.get(name=test)
        card = Card.objects.create(
            **validated_data, category=category)

        return card

    def update(self, instance, validated_data):

        category_dict = validated_data.pop('category')
        test = category_dict['name']
        category = Category.objects.get(name=test)

        instance.category = category
        instance.question = validated_data.get('question', instance.question)
        instance.answer = validated_data.get('answer', instance.answer)

        instance.save()

        return instance
