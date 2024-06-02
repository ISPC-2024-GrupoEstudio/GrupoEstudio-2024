from rest_framework import serializers
from .models import Producto, CategoriaProducto, Proveedor, Pedido, EstadoPedido, ProductoXPedido

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'  

class CategoriaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaProducto
        fields = '__all__'  

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

class EstadoPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoPedido
        fields = '__all__'

class ProductoXPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoXPedido
        fields = '__all__'