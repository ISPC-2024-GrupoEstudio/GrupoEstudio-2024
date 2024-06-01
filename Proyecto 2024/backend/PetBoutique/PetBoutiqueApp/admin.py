from django.contrib import admin
from .models import Venta,  Usuario, TipoEnvio, TipoDocumento, Rol, Proveedor, ProductoXVenta, ProductoXPedido, Carrito, Producto, Pedido, FormaDePago, EstadoPedido,CategoriaProducto

admin.site.register(CategoriaProducto)
admin.site.register(EstadoPedido)
admin.site.register(FormaDePago)
admin.site.register(Pedido)
admin.site.register(Producto)
admin.site.register(Carrito)
admin.site.register(ProductoXPedido)
admin.site.register(ProductoXVenta)
admin.site.register(Proveedor)
admin.site.register(Rol)
admin.site.register(TipoDocumento)
admin.site.register(TipoEnvio)
admin.site.register(Usuario)
admin.site.register(Venta)