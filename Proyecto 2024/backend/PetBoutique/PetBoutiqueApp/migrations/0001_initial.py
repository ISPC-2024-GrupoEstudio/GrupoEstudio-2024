# Generated by Django 4.2 on 2024-05-14 01:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categoriaproductos',
            fields=[
                ('idcategoriaproducto', models.AutoField(db_column='IdCategoriaProducto', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, max_length=45, null=True)),
                ('descripcion', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'categoriaproductos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Estadopedido',
            fields=[
                ('idestado', models.IntegerField(db_column='idEstado', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'estadopedido',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Formadepago',
            fields=[
                ('idformadepago', models.IntegerField(db_column='idFormaDePago', primary_key=True, serialize=False)),
                ('desc', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'formadepago',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Pedidos',
            fields=[
                ('nropedido', models.IntegerField(db_column='nroPedido', primary_key=True, serialize=False)),
                ('fecha', models.DateTimeField(blank=True, null=True)),
                ('domicilioenvio', models.CharField(blank=True, db_column='domicilioEnvio', max_length=50, null=True)),
            ],
            options={
                'db_table': 'pedidos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Productos',
            fields=[
                ('idproducto', models.AutoField(db_column='idProducto', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, max_length=45, null=True)),
                ('descripcion', models.CharField(blank=True, max_length=45, null=True)),
                ('precio', models.CharField(blank=True, max_length=45, null=True)),
                ('stock_actual', models.IntegerField(blank=True, null=True)),
                ('stock_min', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'productos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Proveedores',
            fields=[
                ('idproveedores', models.AutoField(db_column='idProveedores', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, max_length=45, null=True)),
                ('direccion', models.CharField(blank=True, max_length=45, null=True)),
                ('telefono', models.CharField(blank=True, max_length=45, null=True)),
                ('mail', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'proveedores',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('idrol', models.AutoField(db_column='idRol', primary_key=True, serialize=False)),
                ('nombre_del_rol', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'roles',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Tipodoc',
            fields=[
                ('idtipodoc', models.AutoField(db_column='idTipoDoc', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'tipodoc',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Tipoenvio',
            fields=[
                ('idtipoenvio', models.IntegerField(db_column='idTipoEnvio', primary_key=True, serialize=False)),
                ('desc', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'tipoenvio',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('nombreusuario', models.CharField(db_column='nombreUsuario', max_length=12, primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, max_length=45, null=True)),
                ('direccion', models.CharField(blank=True, max_length=45, null=True)),
                ('telefono', models.IntegerField(blank=True, null=True)),
                ('email', models.CharField(blank=True, max_length=45, null=True)),
                ('apellido', models.CharField(blank=True, max_length=45, null=True)),
                ('nrodoc', models.IntegerField(blank=True, db_column='nroDoc', null=True)),
                ('nrocliente', models.IntegerField(blank=True, db_column='nroCliente', null=True)),
                ('estado', models.TextField(blank=True, null=True)),
                ('password', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'usuarios',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Ventas',
            fields=[
                ('nrofactura', models.IntegerField(db_column='nroFactura', primary_key=True, serialize=False)),
                ('fecha', models.CharField(blank=True, max_length=45, null=True)),
                ('preciofinal', models.FloatField(blank=True, db_column='precioFinal', null=True)),
            ],
            options={
                'db_table': 'ventas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Productosxcarrito',
            fields=[
                ('nombredeusuario', models.OneToOneField(db_column='nombreDeUsuario', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='PetBoutiqueApp.usuarios')),
                ('cant', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'productosxcarrito',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Productosxpedido',
            fields=[
                ('idproducto', models.OneToOneField(db_column='idProducto', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='PetBoutiqueApp.productos')),
                ('cantidad', models.IntegerField()),
                ('precio', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'productosxpedido',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Productosxventa',
            fields=[
                ('nrofactura', models.OneToOneField(db_column='nroFactura', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='PetBoutiqueApp.ventas')),
                ('monto', models.CharField(blank=True, max_length=45, null=True)),
                ('cantidad', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'productosxventa',
                'managed': False,
            },
        ),
    ]
