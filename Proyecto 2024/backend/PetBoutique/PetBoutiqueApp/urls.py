from django.urls import path, include
from rest_framework import routers
from PetBoutiqueApp import views
from .views import RoleListCreateAPIView, RoleRetrieveUpdateDestroyAPIView ,ProcessPaymentView,CheckoutView, CuponViewSet, UsuarioCuponListCreateView, MisCuponesAPIView
from .views import RoleListCreateAPIView, RoleRetrieveUpdateDestroyAPIView ,ProcessPaymentView,CheckoutView, crear_preferencia, ArrepentimientoCreateView
from .views import registrar_usuario, UsuarioPorNombreView, DireccionViewSet  

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
router.register(r'cupones', CuponViewSet)
router.register(r'direcciones', DireccionViewSet)

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

      path("delete-item-from-cart/", 
         views.DeleteItemFromCartView.as_view(), name="delete_item_from_cart"),     

    path("cart/<str:nombre_usuario>/", 
         views.CartView.as_view(), name="cart"),
        
    path("delete-from-cart/<int:id_carrito>/",
         views.DeleteFromCartView.as_view(), name="cart"),
         
    path('checkout/', CheckoutView.as_view(), name='checkout'),

    path('auth/usuarios/<str:nombre_usuario>/', UsuarioPorNombreView.as_view(), name='usuario-por-username'),
    path('api/usuarios/<str:nombre_usuario>/', UsuarioPorNombreView.as_view()),
    path('api/', include(router.urls)),
    path('mis-cupones/', views.MisCuponesAPIView.as_view()),
    path('mis-cupones/<str:nombre_usuario>/', views.MisCuponesAPIView.as_view(), name='mis-cupones-usuario'),
    # path('api/mis-cupones/', UsuarioCuponListCreateView.as_view(), name='mis-cupones'),
    path('preferencia/', views.crear_preferencia, name='crear_preferencia'),
    path('pago-exitoso/', views.procesar_pago_exitoso, name='pago_exitoso'),
    path('arrepentimiento/', ArrepentimientoCreateView.as_view(), name='arrepentimiento-create'),
]


