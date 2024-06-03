from django.urls import path, include
from rest_framework import routers
from PetBoutiqueApp import views
from .views import RoleListCreateAPIView, RoleRetrieveUpdateDestroyAPIView ,ProcessPaymentView
# Parte de API autenticación
from .views import LoginView, LogoutView

router=routers.DefaultRouter()
router.register(r'productos', views.ProductoViewSet)
router.register(r'categorias', views.CategoriaProductoViewSet)
router.register(r'proveedores', views.ProveedorViewSet),
router.register(r'pedidos', views.PedidoViewSet)
router.register(r'productoXPedido', views.ProductosXPerdidoViewSet)
router.register(r'estadoPedido', views.EstadoPedidoViewSet)
router.register(r'formaDePago', views.FormaDePagoViewSet)
router.register(r'tipoEnvio', views.TipoEnvioViewSet)
router.regoster(r'processpaymentview', views.ProcessPaymentView)

urlpatterns = [
    path('', include(router.urls)),
    path('roles/', RoleListCreateAPIView.as_view(), name='role-list-create'),
    path('roles/<int:pk>/', RoleRetrieveUpdateDestroyAPIView.as_view(), name='role-retrieve-update-destroy'),
    path('process-payment/', ProcessPaymentView.as_view(), name='process_payment'),,

    # Registro API autenticación
    path('auth/login/',
         LoginView.as_view(), name='auth-.login'),

    path('auth/logout/',
         LogoutView.as_view(), name='auth_logout'),
]


