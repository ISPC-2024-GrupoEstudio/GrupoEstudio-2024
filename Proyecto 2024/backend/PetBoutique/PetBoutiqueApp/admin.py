from django.contrib import admin
from .models import Categoriaproductos, Estadopedido, Formadepago, Pedidos, Productos, Productosxcarrito, Productosxpedido, Productosxventa, Proveedores, Roles, Tipodoc, Tipoenvio, Usuarios, Ventas 

admin.site.register(Categoriaproductos)
admin.site.register(Estadopedido)
admin.site.register(Formadepago)
admin.site.register(Pedidos)
admin.site.register(Productos)
admin.site.register(Productosxcarrito)
admin.site.register(Productosxpedido)
admin.site.register(Productosxventa)
admin.site.register(Proveedores)
admin.site.register(Roles)
admin.site.register(Tipodoc)
admin.site.register(Tipoenvio)
admin.site.register(Usuarios)
admin.site.register(Ventas)