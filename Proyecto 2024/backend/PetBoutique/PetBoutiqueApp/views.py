from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import Producto, CategoriaProducto, Proveedor
from .serializer import ProductoSerializer, CategoriaProductoSerializer, ProveedorSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer  

class CategoriaProductoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaProducto.objects.all()
    serializer_class = CategoriaProductoSerializer

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

