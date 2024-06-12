from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from .models import Roles
from .serializer import RolesSerializer
from django.db import transaction
from rest_framework import viewsets
from .models import Producto, CategoriaProducto, Proveedor, Pedido, EstadoPedido, ProductoXPedido, FormaDePago, TipoEnvio, Carrito
from .serializer import ProductoSerializer, CategoriaProductoSerializer, ProveedorSerializer, PedidoSerializer, EstadoPedidoSerializer, ProductoXPedidoSerializer, FormaDePagoSerializer, TipoEnvioSerializer, UserSerializer, UsuarioSerializer, CarritoSerializer
from django.views.decorators.csrf import csrf_exempt

# Importaciones API autenticación

# Create your views here.
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
            raise status.HTTP_404_NOT_FOUND

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
    
# Vistas login / logout
class LoginView(APIView):
    def post (self, request):
        # Recuperamos las credenciales y autenticamos al usuario
        username = request.data.get('username', None)
        password = request.data.get('password', None)

        user = authenticate(username=username, password=password)

        # Si es correcto, añadimos a la request la información de sesión
        if user:
            login(request, user)
            return Response(
                status=status.HTTP_200_OK)
        
        # Si no es correcto, devolvemos un error en la petición
        return Response(
            status=status.HTTP_404_NOT_FOUND)

class LogoutView(APIView):
    def post(self, request):
        # Borramos de la request la información de sesión
        logout(request)

        # Devolvemos la respuesta al cliente
        return Response(status=status.HTTP_200_OK)
    
class RegisterView (APIView):
    def post (self, request):
        nuevo_usuario = request.data
        nuevo_usuario["id_rol"] = 2

        usuario_serializer = UsuarioSerializer(data = nuevo_usuario)
        
        admin_user_data =  {
            "first_name": request.data.get("nombre"),
            "last_name": request.data.get("apellido"),
            "username":  request.data.get("nombre_usuario"),
            "password": request.data.get("password"),
            "email": request.data.get("email"),
        }
        admin_user_serializer = UserSerializer(data = admin_user_data)

        if admin_user_serializer.is_valid() and usuario_serializer.is_valid():
            usuario_serializer.save()
            admin_user_serializer.save()

            return Response(usuario_serializer.data, status= status.HTTP_201_CREATED)
        else:
            return Response(admin_user_serializer.errors, status= status.HTTP_400_BAD_REQUEST)
        

class AddToCartView (APIView):
    def post (self, request):
        carrito_serializer = CarritoSerializer(data = request.data)

        if carrito_serializer.is_valid():
            carrito_serializer.save()

            return Response(carrito_serializer.data, status= status.HTTP_201_CREATED)
        else:
            return Response(carrito_serializer.errors, status= status.HTTP_400_BAD_REQUEST)

class DeleteFromCartView (APIView):
    def delete (self, request, id_carrito):
        carrito = Carrito.objects.get(id_carrito=id_carrito)
        carrito.delete()

        return Response(status= status.HTTP_200_OK)

        
class CartView(APIView):
    def get(self, request, nombre_usuario):
        carritos = Carrito.objects.filter(nombre_usuario=nombre_usuario).select_related('id_producto')
        carrito_serializer = CarritoSerializer(carritos, many=True)
       
        producto_ids = [carrito.id_producto.id_producto for carrito in carritos]
        productos = Producto.objects.filter(id_producto__in=producto_ids)
        producto_serializer = ProductoSerializer(productos, many=True)
        
        productos_data = {producto.id_producto: producto_serializer.data[index] for index, producto in enumerate(productos)}
        for carrito_data in carrito_serializer.data:
            id_producto = carrito_data['id_producto']
            carrito_data['producto'] = productos_data.get(id_producto, {})
       
        return Response(carrito_serializer.data, status=status.HTTP_200_OK)

class CheckoutView(APIView):
    def post(self, request):
        items_comprados = request.data.get('items_comprados', [])  # Obtener los productos comprados
        payment_details = request.data.get('payment_details', {})  # Detalles del pago
        print("Items comprados:", items_comprados)  # Debugging line
        print("Payment details:", payment_details)  # Debugging line
        process_payment_response = self.process_payment(payment_details)  # Procesar el pago

        if process_payment_response.status_code != status.HTTP_200_OK:
            return process_payment_response  # Si el pago falla, retornar la respuesta de la pasarela de pago

        try:
            with transaction.atomic():
                # Actualizar el stock de los productos comprados
                for item in items_comprados:
                    producto_id = item.get('id_producto')
                    cantidad = item.get('cantidad')
                    producto = Producto.objects.get(id_producto=producto_id)
                    producto.stock_actual -= cantidad
                    producto.save()

                # Crear el pedido
                pedido_serializer = PedidoSerializer(data={
                    'items_comprados': items_comprados,
                    'payment_details': payment_details,
                    'usuario': request.user.id  # Suponiendo que tienes un sistema de autenticación configurado
                })
                if pedido_serializer.is_valid():
                    pedido_serializer.save()
                else:
                    return Response({"error": "Error al crear el pedido"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Proceso de pago completado y stock actualizado correctamente"}, status=status.HTTP_200_OK)

    def process_payment(self, payment_details):
        card_number = payment_details.get('cardNumber')
        expiration_date = payment_details.get('expirationDate')
        cvv = payment_details.get('cvv')
        if not card_number or not expiration_date or not cvv:
            return Response ({"error": "Detalles de pagos incompletos"}, status=status.HTTP_400_BAD_REQUEST)
        return Response ({"message": "Pago procesado exitosamente"}, status=status.HTTP_200_OK)