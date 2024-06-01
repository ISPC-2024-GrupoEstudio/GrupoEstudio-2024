from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import Productos
from .serializer import ProductosSerializer

class ProductosViewSet(viewsets.ModelViewSet):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer  

