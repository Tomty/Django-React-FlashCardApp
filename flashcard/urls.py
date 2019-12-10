
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('flashcard', views.CardView)
router.register('category', views.CategoryView)

urlpatterns = [
    path('api/', include(router.urls))
]
