from django.urls import path, include
from rest_framework import routers
from PetBoutiqueApp import views

router=routers.DefaultRouter()
router.register(r'productos', views.ProductoViewSet)
router.register(r'categorias', views.CategoriaProductoViewSet)
router.register(r'proveedores', views.ProveedorViewSet)

urlpatterns = [
    path('', include(router.urls))
]