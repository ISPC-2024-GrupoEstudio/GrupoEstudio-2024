from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Roles
from .serializer import RolesSerializer
from django.http import Http404

# Create your views here.

from rest_framework import viewsets
from .models import Producto, CategoriaProducto, Proveedor, Pedido, EstadoPedido, ProductoXPedido, FormaDePago, TipoEnvio
from .serializer import ProductoSerializer, CategoriaProductoSerializer, ProveedorSerializer, PedidoSerializer, EstadoPedidoSerializer, ProductoXPedidoSerializer, FormaDePagoSerializer, TipoEnvioSerializer

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

class FormaDePagoViewSet(viewsets.ModelViewSet):
    queryset = FormaDePago.objects.all()
    serializer_class = FormaDePagoSerializer

class TipoEnvioViewSet(viewsets.ModelViewSet):
    queryset = TipoEnvio.objects.all()
    serializer_class = TipoEnvioSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer  

class RoleListCreateAPIView(APIView):
    def get(self, request):
        roles = Roles.objects.all()
        serializer = RolesSerializer(roles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RolesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RoleRetrieveUpdateDestroyAPIView(APIView):
    def get_object(self, pk):
        try:
            return Roles.objects.get(pk=pk)
        except Roles.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        role = self.get_object(pk)
        serializer = RolesSerializer(role)
        return Response(serializer.data)

    def put(self, request, pk):
        role = self.get_object(pk)
        serializer = RolesSerializer(role, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        role = self.get_object(pk)
        role.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class ProcessPaymentView(APIView):
    def post(self,resquest, format=None):
        payment_details = resquest.data
        return Response ({"status": "success", "message": "Pago procesado exitosamente"}, status=status.HTTP_200_OK)