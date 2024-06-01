from django.urls import path, include
from rest_framework import routers
from PetBoutiqueApp import views

router=routers.DefaultRouter()
router.register(r'productos', views.ProductosViewSet)

urlpatterns = [
    path('', include(router.urls))
]