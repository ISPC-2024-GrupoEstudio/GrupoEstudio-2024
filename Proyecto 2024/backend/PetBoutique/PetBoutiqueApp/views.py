from django.shortcuts import render
from rest_framework import status, generics, permissions
import json
from django.http import JsonResponse
from django.shortcuts import redirect, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
import uuid
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
# Importaciones para registro usuario
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from .models import CustomUser, Direccion
from .serializer import CustomUserSerializer, ArrepentimientoSerializer, DireccionSerializer
# Fin importaciones registro #
from .models import Roles, Usuario
from .serializer import RolesSerializer
from django.db import transaction
from rest_framework import viewsets
from .models import Producto, CategoriaProducto, Proveedor, Pedido, EstadoPedido, ProductoXPedido, FormaDePago, TipoEnvio, Carrito, Usuario, Cupon, UsuarioCupon, Arrepentimiento
from .serializer import ProductoSerializer, CategoriaProductoSerializer, ProveedorSerializer, PedidoSerializer, EstadoPedidoSerializer, ProductoXPedidoSerializer, FormaDePagoSerializer, TipoEnvioSerializer, UserSerializer, UsuarioSerializer, CarritoSerializer, CuponSerializer, UsuarioCuponSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import serializers
import mercadopago

# Importaciones API autenticación
sdk = mercadopago.SDK("APP_USR-833122140344943-051410-45098cbf690567d10ec9d3bfec64cc08-2437030261")
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
        print(username)   
        print(password) 

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
    permission_classes = [AllowAny]
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
            print()
            print("Datos recibidos:", request.data)
            print()
            if Carrito.objects.filter(id_producto=request.data["id_producto"], nombre_usuario=request.data["nombre_usuario"]).exists():
                # Si el carrito ya existe, actualizamos la cantidad
                carrito = Carrito.objects.get(id_producto=request.data["id_producto"], nombre_usuario=request.data["nombre_usuario"])
                carrito.cantidad += request.data["cantidad"]
                carrito.save()
                return Response(carrito_serializer.data, status= status.HTTP_201_CREATED)
            else:
                # Si el carrito no existe, lo creamos
                carrito_serializer.save()
                return Response(carrito_serializer.data, status= status.HTTP_201_CREATED)

        else:
            return Response(carrito_serializer.errors, status= status.HTTP_400_BAD_REQUEST)

class DeleteItemFromCartView (APIView):
    def post (self, request):
        carrito_serializer = CarritoSerializer(data = request.data)

        if carrito_serializer.is_valid():
            if Carrito.objects.filter(id_producto=request.data["id_producto"], nombre_usuario=request.data["nombre_usuario"]).exists():
                # Si el carrito ya existe, actualizamos la cantidad
                carrito = Carrito.objects.get(id_producto=request.data["id_producto"], nombre_usuario=request.data["nombre_usuario"])
                carrito.cantidad -= request.data["cantidad"]
                if (carrito.cantidad <= 0):
                    carrito.delete()
                else:
                    carrito.save()
                return Response(carrito_serializer.data, status= status.HTTP_200_OK)
            else:
                # Si el carrito no existe, lo creamos
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
    authentication_classes = [JWTAuthentication]  # Añadimos la autenticación con JWT
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder
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
        items_comprados = request.data.get('items_comprados', [])
        payment_details = request.data.get('payment_details', {})
        nombre_usuario = request.data.get("nombre_usuario")
            
        if not items_comprados or not payment_details or not nombre_usuario:
            return Response({"error": "Datos incompletos en la solicitud"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            usuario = User.objects.get(username=nombre_usuario)
        except User.DoesNotExist:
            return Response({"error": f"Usuario con nombre {nombre_usuario} no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        required_fields = ["transaction_amount", "token", "payment_method_id", "cardholderEmail", "identificationType", "identificationNumber"]
        for field in required_fields:
            if not payment_details.get(field):
                return Response({"error": f"Falta el campo {field} en los detalles de pago"}, status=status.HTTP_400_BAD_REQUEST)
        # Procesar pago con Mercado Pago
        try:
            payment_data = {
                "transaction_amount": float(payment_details.get("transaction_amount")),
                "token": payment_details.get("token"),
                "description": payment_details.get("description", "Compra en Pet Boutique"),
                "installments": int(payment_details.get("installments", 1)),
                "payment_method_id": payment_details.get("payment_method_id"),
                "payer": {
                    "email": payment_details.get("cardholderEmail"),
                    "first_name": payment_details.get("cardholderName", "Nombre no proporcionado"),
                    "identification": {
                        "type": payment_details.get("identificationType"),
                        "number": payment_details.get("identificationNumber")
                    }
                }
            }
            print("PAYMENT DATA:", payment_data)

            payment_response = sdk.payment().create(payment_data)
            print(payment_response)
            payment = payment_response["response"]

            if payment.get("status") != "approved":
                return Response({
            "message": "Pago rechazado por Mercado Pago",
            "status": payment.get("status"),
            "status_detail": payment.get("status_detail")
            }, status=402)

        except Exception as e:
            return Response({"error": "Error al procesar el pago: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Registrar pedido solo si el pago fue aprobado
        try:
            with transaction.atomic():
                for item in items_comprados:
                    producto_id = item.get('id_producto')
                    cantidad = item.get('cantidad')
                    try:
                        producto = Producto.objects.get(id_producto=producto_id)
                    except Producto.DoesNotExist:
                        return Response({"error": f"Producto con id {producto_id} no encontrado"}, status=status.HTTP_404_NOT_FOUND)
                    
                    if producto.stock_actual < cantidad:
                        return Response({"error": f"Stock insuficiente para el producto {producto_id}"}, status=status.HTTP_400_BAD_REQUEST)
                    
                    producto.stock_actual -= cantidad
                    producto.save()

                ultimo_pedido = Pedido.objects.all().order_by('-numero_pedido').first()
                numero_pedido = ultimo_pedido.numero_pedido + 1 if ultimo_pedido else 1

                pedido_data = {
                    'nombre_usuario': nombre_usuario,
                    'fecha': timezone.now(),
                    'id_estado_pedido': 1,
                    'numero_pedido': numero_pedido,
                }

                pedido_serializer = PedidoSerializer(data=pedido_data)
                if pedido_serializer.is_valid():
                    pedido = pedido_serializer.save()
                    for item in items_comprados:
                        producto = Producto.objects.get(id_producto=item.get('id_producto'))
                        ProductoXPedido.objects.create(
                            id_producto=producto,
                            id_pedido=pedido,
                            cantidad=item.get('cantidad'),
                            precio=producto.precio
                        )
                else:
                    return Response({"error": pedido_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        Carrito.objects.filter(nombre_usuario=nombre_usuario).delete()

        return Response({
            "message": "Pago aprobado y pedido registrado correctamente",
            "payment_id": payment["id"],
            "pedido_id": pedido.id
        }, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def crear_preferencia(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Datos recibidos en crear_preferencia:", data)

            items = data.get("items")
            if not items or not isinstance(items, list):
                return JsonResponse({"error": "Lista de items no válida"}, status=400)
            
            external_reference = data.get("external_reference")
            print("External Reference enviada a MP:", external_reference)

            preference_data = {
                "items": [
                    {
                        "title": item["title"],
                        "quantity": item["quantity"],
                        "unit_price": float(item["unit_price"]),
                        "currency_id": "ARS",
                    } for item in items
                ],
                "back_urls": {
                    "success": "https://dbe9-2803-9800-9883-4725-7873-2721-c155-d6eb.ngrok-free.app/api/pago-exitoso/",
                    "failure": "https://tusitio.com/failure",
                    "pending": "https://tusitio.com/pending"
                },
                "auto_return": "approved",
                "external_reference": external_reference if external_reference else "no-reference"
            }

            print("Preference data enviado a MercadoPago:", preference_data)

            preference_response = sdk.preference().create(preference_data)
            preference = preference_response["response"]

            print("Respuesta de Mercado Pago:", preference_response)

            return JsonResponse({
                "preference_id": preference["id"],
                "init_point": preference["init_point"]
            })
        except KeyError as e:
            return JsonResponse({"error": f"Falta el campo requerido: {str(e)}"}, status=400)
        except Exception as e:
            print("Error al crear preferencia:", str(e))
            return JsonResponse({"error": f"Error al crear preferencia: {str(e)}"}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)


def procesar_pedido(external_reference_completa):
    # Parsear la referencia externa completa
    parts = external_reference_completa.split('|')
    nombre_usuario = parts[0]
    direccion_envio = parts[1] if len(parts) > 1 else ""
    codigo_postal = parts[2] if len(parts) > 2 else ""
    opcion_envio_json = parts[3] if len(parts) > 3 else "{}"
    total_final = float(parts[4]) if len(parts) > 4 else 0.0
    tipo_envio_id = int(parts[5]) if len(parts) > 5 else None
    ciudad_envio = parts[6] if len(parts) > 6 else ""
    descuento = float(parts[7]) if len(parts) > 7 else 0.0
    localidad = parts[8] if len(parts) > 8 else ""  

    try:
        opcion_envio = json.loads(opcion_envio_json)
    except:
        opcion_envio = {}
    carrito = Carrito.objects.filter(nombre_usuario=nombre_usuario)

    if not carrito.exists():
        raise Exception("El carrito está vacío o no existe.")

    items_comprados = [
        {
            'id_producto': item.id_producto.id_producto,
            'cantidad': item.cantidad
        } for item in carrito
    ]

    with transaction.atomic():
        for item in items_comprados:
            producto = Producto.objects.get(id_producto=item['id_producto'])
            if producto.stock_actual < item['cantidad']:
                raise Exception(f"Stock insuficiente para el producto {producto.nombre}")
            producto.stock_actual -= item['cantidad']
            producto.save()

        ultimo_pedido = Pedido.objects.all().order_by('-numero_pedido').first()
        numero_pedido = (ultimo_pedido.numero_pedido + 1) if ultimo_pedido else 1

        pedido_data = {
            'nombre_usuario': nombre_usuario,
            'fecha': timezone.now(),
            'id_estado_pedido': 1,
            'numero_pedido': numero_pedido,
            'domicilio_envio': direccion_envio,
            'codigo_postal': codigo_postal,
            'costo_envio': opcion_envio.get('costo', 0),
            'tipo_envio': opcion_envio.get('tipo', ''),
            'datos_envio': json.dumps(opcion_envio),
            'total': total_final,
            'ciudad_envio': ciudad_envio,
            'id_tipo_de_envio': tipo_envio_id,
            'descuento': descuento,
            'localidad': localidad,

        }

        pedido_serializer = PedidoSerializer(data=pedido_data)
        if pedido_serializer.is_valid():
            pedido = pedido_serializer.save()
        else:
            raise Exception(f"Error al crear el pedido: {pedido_serializer.errors}")

        for item in items_comprados:
            producto = Producto.objects.get(id_producto=item['id_producto'])
            ProductoXPedido.objects.create(
                id_producto=producto,
                id_pedido=pedido,
                cantidad=item['cantidad'],
                precio=producto.precio
            )

        carrito.delete()


@api_view(['GET'])
def procesar_pago_exitoso(request):
    print("Procesando el pago...")
    print("Datos recibidos:", request.GET)

    external_reference = request.query_params.get('external_reference') # nombre_usuario
    print("Referencia externa recibida:", external_reference)

    if not external_reference:
        return JsonResponse({'error': 'Referencia externa no recibida'}, status=400)

    try:
        procesar_pedido(external_reference)
        print("Pedido procesado correctamente")
        return redirect('http://localhost:4200/dashboard')
    except Exception as e:
        print("Error al procesar el pedido:", str(e))
        return JsonResponse({'error': str(e)}, status=500)






# Vistas login / logout #####################################################################################
class LoginView(APIView):
    def post (self, request):
        # Recuperamos las credenciales y autenticamos al usuario
        username = request.data.get('username', None)
        password = request.data.get('password', None)

        user = authenticate(username=username, password=password)

        # Si es correcto, añadimos a la request la información de sesión
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        # Borramos de la request la información de sesión
        logout(request)

        # Devolvemos la respuesta al cliente
        return Response(status=status.HTTP_200_OK)
    
class RegisterView (APIView):
    permission_classes = [AllowAny]
    def post (self, request):
        usuario_serializer = UsuarioSerializer(data = request.data)
        admin_user_data =  {
            "first_name": request.data.get("nombre"),
            "last_name": request.data.get("apellido"),
            "username":  request.data.get("nombre_usuario"),
            "password": request.data.get("password"),
            "email": request.data.get("email"),
        }
        admin_user_serializer = UserSerializer(data = admin_user_data)

        if usuario_serializer.is_valid() and admin_user_serializer.is_valid():
            usuario_serializer.save()
            admin_user_serializer.save()

            return Response(usuario_serializer.data, status= status.HTTP_201_CREATED)
        else:
            return Response(admin_user_serializer.errors, status= status.HTTP_400_BAD_REQUEST)

class UsuarioPorNombreView(APIView):
    permission_clases = [IsAuthenticated]

    def get(self, request, nombre_usuario):
        try:
            usuario = Usuario.objects.get(nombre_usuario=nombre_usuario)
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=404)
    
    def put(self, request, nombre_usuario):
        try:
            usuario = Usuario.objects.get(nombre_usuario=nombre_usuario)
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=404)
    
        serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

# Para registrar usuarios en BDD
@api_view(['POST'])
def registrar_usuario(request):
    user_data = {
        'username': request.data.get('username'),
        'password': request.data.get('password'),
        'email': request.data.get('email'),
    }
    
    user_serializer = UserSerializer(data=user_data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        
        # Aquí creamos el perfil asociado
        custom_user_data = {
            'user': user.id,
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'username': request.data.get('username'),
            'password': request.data.get('password'),
            'email': request.data.get('email')
        }
        custom_user_serializer = CustomUserSerializer(data=custom_user_data)
        if custom_user_serializer.is_valid():
            custom_user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        else:
            user.delete()  # Si el perfil no es válido, borramos el usuario creado
            return Response(custom_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def obtener_user_por_username(request, nombre_usuario):
    try:
        usuario = Usuario.objects.get(nombre_usuario=nombre_usuario)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=404)
    
    if request.method == 'GET':
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    
class CuponViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cupon.objects.all()
    serializer_class = CuponSerializer

class UsuarioCuponListCreateView(generics.RetrieveUpdateAPIView):
    serializer_class = UsuarioCuponSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    
@api_view(['GET'])
def obtener_usuario(request, username):
    try:
        usuario = User.objects.get(username=username)
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=404)

class CuponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cupon
        fields = ['id', 'nombre', 'descripcion', 'tipo_descuento', 'valor_descuento', 'imagen_url', 'fecha_vencimiento']


class MisCuponesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, nombre_usuario=None):
        if nombre_usuario is None:
            # Si no se pasa el nombre de usuario en la URL, usa el usuario autenticado
            nombre_usuario = request.user.username  

        # Filtra los cupones del usuario
        cupones_usuario = UsuarioCupon.objects.filter(usuario__nombre_usuario=nombre_usuario)
        
        # Obtiene los cupones completos (no solo los IDs)
        cupones = [cupon.cupon for cupon in cupones_usuario]

        # Serializa los cupones completos
        cupones_serializados = CuponSerializer(cupones, many=True)

        return Response(cupones_serializados.data)

    def post(self, request):
        username = request.user.username
        cupon_id = request.data.get('cupon_id')

        try:
            usuario = Usuario.objects.get(nombre_usuario=username)
            cupon = Cupon.objects.get(id=cupon_id)
            # Crear relación si no existe
            usuario_cupon, created = UsuarioCupon.objects.get_or_create(usuario=usuario, cupon=cupon)
            if not created:
                return Response({'mensaje': 'El usuario ya tiene este cupón'}, status=200)
            return Response({'mensaje': 'Cupón agregado correctamente'})
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=404)
        except Cupon.DoesNotExist:
            return Response({'error': 'Cupón no encontrado'}, status=404)        

    def delete(self, request, nombre_usuario=None):
        if nombre_usuario is None:
            nombre_usuario = request.user.username

        try:
            usuario = Usuario.objects.get(nombre_usuario=nombre_usuario)
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=404)

        relaciones = UsuarioCupon.objects.filter(usuario=usuario)
        cantidad = relaciones.count()
        relaciones.delete()

        return Response({'mensaje': f'Se eliminaron {cantidad} cupon(es) del usuario.'}, status=200)
    

class ArrepentimientoCreateView(generics.CreateAPIView):
    queryset = Arrepentimiento.objects.all()
    serializer_class = ArrepentimientoSerializer    


# class DireccionViewSet(viewsets.ModelViewSet):
#     queryset = Direccion.objects.all()
#     serializer_class = DireccionSerializer
#     permission_classes = [AllowAny]

#     def get_queryset(self):
#         # Mostrar solo las direcciones del usuario autenticado
#         return Direccion.objects.filter(usuario=self.request.user)

#     def perform_create(self, serializer):
#         # Asignar automáticamente el usuario autenticado
#         serializer.save(usuario=self.request.user)
# class DireccionViewSet(viewsets.ModelViewSet):
#     queryset = Direccion.objects.all()
#     serializer_class = DireccionSerializer
#     permission_classes = [AllowAny]

#     def get_queryset(self):
#         return Direccion.objects.all()

#     def perform_create(self, serializer):
#         serializer.save()

class DireccionViewSet(viewsets.ModelViewSet):
    queryset = Direccion.objects.all()
    serializer_class = DireccionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # Si usuario está autenticado, filtrar por usuario, sino devolver todo o vacío
        if self.request.user and self.request.user.is_authenticated:
            return Direccion.objects.filter(usuario=self.request.user)
        return Direccion.objects.none()

    def perform_create(self, serializer):
        if self.request.user and self.request.user.is_authenticated:
            serializer.save(usuario=self.request.user)
        else:
            serializer.save(usuario=None)
