# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Carrito(models.Model):
    nombre_usuario = models.OneToOneField('Usuario', models.DO_NOTHING, db_column='nombre_usuario', primary_key=True)  # The composite primary key (nombre_usuario, id_producto) found, that is not supported. The first column is selected.
    id_producto = models.ForeignKey('Producto', models.DO_NOTHING, db_column='id_producto')
    cantidad = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'carrito'
        unique_together = (('nombre_usuario', 'id_producto'),)


class CategoriaProducto(models.Model):
    id_categoria_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=True, null=True)
    descripcion = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categoria_producto'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class EstadoPedido(models.Model):
    id_estado_pedido = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'estado_pedido'


class FormaDePago(models.Model):
    id_forma_de_pago = models.IntegerField(primary_key=True)
    desc = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'forma_de_pago'


class Pedido(models.Model):
    id_pedido = models.AutoField(primary_key=True)
    fecha = models.DateTimeField(blank=True, null=True)
    id_estado_pedido = models.ForeignKey(EstadoPedido, models.DO_NOTHING, db_column='id_estado_pedido', blank=True, null=True)
    nombre_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='nombre_usuario', blank=True, null=True)
    id_tipo_de_envio = models.ForeignKey('TipoEnvio', models.DO_NOTHING, db_column='id_tipo_de_envio', blank=True, null=True)
    domicilio_envio = models.CharField(max_length=50, blank=True, null=True)
    id_forma_de_pago = models.ForeignKey(FormaDePago, models.DO_NOTHING, db_column='id_forma_de_pago', blank=True, null=True)
    numero_pedido = models.IntegerField(unique=True)

    class Meta:
        managed = False
        db_table = 'pedido'


class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=True, null=True)
    descripcion = models.CharField(max_length=45, blank=True, null=True)
    precio = models.CharField(max_length=45, blank=True, null=True)
    stock_actual = models.IntegerField(blank=True, null=True)
    id_proveedor = models.ForeignKey('Proveedor', models.DO_NOTHING, db_column='id_proveedor', blank=True, null=True)
    stock_minimo = models.IntegerField(blank=True, null=True)
    id_categoria_producto = models.ForeignKey(CategoriaProducto, models.DO_NOTHING, db_column='id_categoria_producto', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'producto'


class ProductoXPedido(models.Model):
    id_producto = models.OneToOneField(Producto, models.DO_NOTHING, db_column='id_producto', primary_key=True)  # The composite primary key (id_producto, id_pedido) found, that is not supported. The first column is selected.
    id_pedido = models.ForeignKey(Pedido, models.DO_NOTHING, db_column='id_pedido')
    cantidad = models.IntegerField()
    precio = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'producto_x_pedido'
        unique_together = (('id_producto', 'id_pedido'),)


class ProductoXVenta(models.Model):
    id_venta = models.OneToOneField('Venta', models.DO_NOTHING, db_column='id_venta', primary_key=True)  # The composite primary key (id_venta, id_producto) found, that is not supported. The first column is selected.
    precio_unitario = models.FloatField(blank=True, null=True)
    cantidad = models.IntegerField(blank=True, null=True)
    id_producto = models.ForeignKey(Producto, models.DO_NOTHING, db_column='id_producto')

    class Meta:
        managed = False
        db_table = 'producto_x_venta'
        unique_together = (('id_venta', 'id_producto'),)


class Proveedor(models.Model):
    id_proveedor = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=True, null=True)
    direccion = models.CharField(max_length=45, blank=True, null=True)
    telefono = models.CharField(max_length=45, blank=True, null=True)
    mail = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'proveedor'


class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_del_rol = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rol'


class TipoDocumento(models.Model):
    id_tipo_documento = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tipo_documento'


class TipoEnvio(models.Model):
    id_tipo_envio = models.IntegerField(primary_key=True)
    desc = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tipo_envio'


class Usuario(models.Model):
    nombre_usuario = models.CharField(primary_key=True, max_length=12)
    nombre = models.CharField(max_length=45, blank=True, null=True)
    direccion = models.CharField(max_length=45, blank=True, null=True)
    telefono = models.IntegerField(blank=True, null=True)
    email = models.CharField(max_length=45, blank=True, null=True)
    apellido = models.CharField(max_length=45, blank=True, null=True)
    id_tipo_documento = models.ForeignKey(TipoDocumento, models.DO_NOTHING, db_column='id_tipo_documento', blank=True, null=True)
    numero_documento = models.IntegerField(blank=True, null=True)
    numero_cliente = models.IntegerField(blank=True, null=True)
    id_rol = models.ForeignKey(Rol, models.DO_NOTHING, db_column='id_rol', blank=True, null=True)
    estado = models.TextField(blank=True, null=True)  # This field type is a guess.
    password = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuario'


class Venta(models.Model):
    id_venta = models.AutoField(primary_key=True)
    fecha = models.CharField(max_length=45, blank=True, null=True)
    nombre_usuario = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='nombre_usuario', blank=True, null=True)
    id_pedido = models.ForeignKey(Pedido, models.DO_NOTHING, db_column='id_pedido', blank=True, null=True)
    monto = models.FloatField(blank=True, null=True)
    numero_factura = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'venta'
