from django.urls import path, include
from rest_framework import routers
from PetBoutiqueApp import views
from rest_framework.routers import DefaultRouter
from .views import RoleListCreateAPIView, RoleRetrieveUpdateDestroyAPIView ,ProcessPaymentView,CheckoutView, GuardarCuponView, CrearCuponView, ListarCuponesView, MisCuponesView
from .views import registrar_usuario, obtener_user_por_username

router=routers.DefaultRouter()
router.register(r'productos', views.ProductoViewSet)
router.register(r'categorias', views.CategoriaProductoViewSet)
router.register(r'proveedores', views.ProveedorViewSet),
router.register(r'pedidos', views.PedidoViewSet)
router.register(r'productoXPedido', views.ProductosXPerdidoViewSet)
router.register(r'estadoPedido', views.EstadoPedidoViewSet)
router.register(r'formaDePago', views.FormaDePagoViewSet)
router.register(r'tipoEnvio', views.TipoEnvioViewSet)
router.register(r'usuarios', views.UsuarioViewSet)
# router.register(r'mis-cupones', CuponUsuarioViewSet, basename='cuponusuario')

urlpatterns = [
    path('', include(router.urls)),
    path('roles/', RoleListCreateAPIView.as_view(), name='role-list-create'),
    path('roles/<int:pk>/', RoleRetrieveUpdateDestroyAPIView.as_view(), name='role-retrieve-update-destroy'),
    path('process-payment/', ProcessPaymentView.as_view(), name='process_payment'),

    path('auth/login/',
        views.LoginView.as_view(), name='auth_login'),

    path('auth/logout/',
        views.LogoutView.as_view(), name='auth_logout'),

    path('auth/register/', 
       views. RegisterView.as_view(),name= "auth_register"),

    # Segundo intento de registro de usuarios
    path('register/', registrar_usuario, name='registrar_usuario'),

    path("add-to-cart/", 
         views.AddToCartView.as_view(), name="add_to_cart"),

    path("cart/<str:nombre_usuario>/", 
         views.CartView.as_view(), name="cart"),
        
    path("delete-from-cart/<int:id_carrito>/",
         views.DeleteFromCartView.as_view(), name="cart"),
         
    path('checkout/', CheckoutView.as_view(), name='checkout'),

    path('auth/usuarios/<str:nombre_usuario>/', obtener_user_por_username, name='usuario-por-username'),
    
    path('api/guardar-cupon/', GuardarCuponView.as_view(), name='guardar-cupon'),

    path('crear-cupon/', CrearCuponView.as_view(), name='crear-cupon'),

    path('api/listar-cupones/', ListarCuponesView.as_view(), name='listar_cupones'),

    path('api/mis-cupones/', MisCuponesView.as_view(), name='mis_cupones'),

]


