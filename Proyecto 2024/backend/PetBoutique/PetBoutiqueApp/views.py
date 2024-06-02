from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import Producto, CategoriaProducto, Proveedor, Pedido, EstadoPedido, ProductoXPedido
from .serializer import ProductoSerializer, CategoriaProductoSerializer, ProveedorSerializer, PedidoSerializer, EstadoPedidoSerializer, ProductoXPedidoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer  

class CategoriaProductoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaProducto.objects.all()
    serializer_class = CategoriaProductoSerializer

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class EstadoPedidoViewSet(viewsets.ModelViewSet):
    queryset = EstadoPedido.objects.all()
    serializer_class = EstadoPedidoSerializer

class ProductosXPerdidoViewSet(viewsets.ModelViewSet):
    queryset = ProductoXPedido.objects.all()
    serializer_class = ProductoXPedidoSerializer