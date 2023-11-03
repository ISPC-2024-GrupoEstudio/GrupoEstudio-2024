
from Entidades.Producto import Producto

from Controladores.ControladorProductos import ControladorProductos

controlador_producto = ControladorProductos()


def mostrar_menu():
    print("Menú CRUD de Productos:")
    print("1. Crear Producto")
    print("2. Listar Productos")
    print("3. Actualizar Producto")
    print("4. Borrar Producto")
    print("5. Salir")

while True:
    mostrar_menu()
    opcion = input("Selecciona una opción (1/2/3/4/5): ")

    if opcion == '1':
        #nombre, descripcion, precio, stock_actual, proveedor, stock_min, categoria
        nombre = input("Ingrese el nombre del producto a crear: ")
        descripcion = input("Ingrese la descripción del producto a crear: ")
        precio = input("Ingrese el precio del producto a crear: ")
        stock_actual = input("Ingrese el stock actual del producto a crear: ")
        proveedor = input("Ingrese el número correspondiente al proveedor del producto a crear: \n 1- Sorita \n 2- MamaDog \n")
        stock_min = input("Ingrese el stock minimo del producto a crear: ")
        categoria = input("Ingrese el número correspondiente a la categoria del producto a crear: \n 1- Accesorio \n 2-Cuchas \n 3-Juguetes \n 4-Ropa \n")
        producto=Producto(None, nombre, descripcion, precio, stock_actual, stock_min, proveedor, categoria)
        controlador_producto.crear_producto(producto)
        listado=controlador_producto.listar_productos()
        print("Se actualiza el listado de Productos")
        print(listado)
    elif opcion == '2':
        controlador_producto.listar_productos()
    elif opcion == '3':
        controlador_producto.listar_productos()
        id = input("Ingrese el ID del producto a actualizar: ")
        producto_a_modificar = controlador_producto.obtener_producto(id)
        print(producto_a_modificar.getNombre())
        opcionActualizar= input("Ingrese la opción correspondiente a lo que desea modificar: \n 1- Nombre \n 2- Descripción \n 3- Precio \n 4- Stock Actual \n 5- Proveedor \n 6- Stock Minimo \n 7- Categoría \n")
        if opcionActualizar == '1':
            nombre = input("Ingrese el nuevo nombre del producto: ")
            producto_a_modificar.setNombre(nombre)
        elif opcionActualizar == '2':
            descrip = input("Ingrese la nueva descripción del Producto: ")
            producto_a_modificar.setDescripcion(descrip)
        elif opcionActualizar == '3':
            precio = input("Ingrese el nuevo precio del Producto: ")
            producto_a_modificar.setPrecio(precio)
        elif opcionActualizar == '4':
            stock_actual = input("Ingrese el nuevo stock actual del Producto: ")
            producto_a_modificar.setCantidadStockActual(stock_actual)
        elif opcionActualizar == '5':
            proveedor = input("Ingrese el nuevo proveedor del Producto: ")
            producto_a_modificar.setProveedor(proveedor)
        elif opcionActualizar == '6':
            stock_min = input("Ingrese el nuevo stock minimo del Producto: ")
            producto_a_modificar.setCantidadStockMin(stock_min)
        elif opcionActualizar == '7':
            categoria = input("Ingrese el nuevo categoria del Producto: ")
            producto_a_modificar.setCategoria(categoria)
        controlador_producto.modificar_producto(producto_a_modificar)
        print("El producto ha sido actualizado")
        print(f"idProducto: {producto_a_modificar.getId()}, nombre: {producto_a_modificar.getNombre()}, descripcion: {producto_a_modificar.getDescripcion()}, precio: {producto_a_modificar.getPrecio()}, stock_actual: {producto_a_modificar.getCantidadStockActual()}, proveedor: {producto_a_modificar.getProveedor()}, stock_min: {producto_a_modificar.getCantidadStockMin()}, categoria: {producto_a_modificar.getCategoria()}")
    elif opcion == '4':
        controlador_producto.listar_productos()
        id = input("Ingrese el ID del producto a eliminar: ")
        controlador_producto.eliminar_producto(id)
        print("Se eliminó el producto correctamente")
    elif opcion == '5':
        print("Saliendo del programa.")
        break
    else:
        print("Opción no válida. Por favor, selecciona una opción válida.")
