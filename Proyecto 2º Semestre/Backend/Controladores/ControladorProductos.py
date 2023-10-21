from Entidades.Producto import Producto
from Entidades.Proveedor import Proveedor
from Utils.Conector import connection


class ControladorProductos():

    def filtrarPorCategoria(self, categoria):
        prodXCategoria = []
        for p in self.productos:
            if p.categoria == categoria:
                prodXCategoria.append(p)
        return prodXCategoria

    def modificar_producto(_self_, producto):
        connection.connect()
        cursor = connection.cursor()
        consulta = "UPDATE productos SET nombre = %s, descripcion = %s, precio = %s, stock_actual = %s, proveedor = %s, stock_min = %s, categoria = %s WHERE idProducto = %s"
        valores = (producto.getNombre(), producto.getDescripcion(), producto.getPrecio(), producto.getCantidadStockActual(
        ), producto.getProveedor(), producto.getCantidadStockMin(), producto.getCategoria(), producto.getId())
        cursor.execute(consulta, valores)
        connection.commit()

    def obtener_productos(_self_):
        connection.connect()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM productos")
        query = cursor.fetchall()
        productos = []
        for i in query:
            producto = Producto(i[0], i[1], i[2], i[3], i[4], i[6], i[5], i[7])
            productos.append(producto)
        return productos

    def listar_productos(_self_):
        connection.connect()
        cursor = connection.cursor()

        consulta = """Select
                        prod.IdProducto, 
                        prod.nombre, 
                        prod.descripcion, 
                        prod.precio, 
                        prod.stock_actual, 
                        prov.nombre, 
                        prod.stock_min, 
                        cat.nombre
                    from Productos prod 
	                    inner join categoriaproductos cat on prod.categoria = cat.idCategoriaProducto
                        inner join proveedores prov on prod.proveedor = prov.idProveedores"""

        cursor.execute(consulta)

        query = cursor.fetchall()

        productos = []
        for fila in query:

            # obtengo cada valor de la fila de la consula
            idProducto = fila[0]
            nombre = fila[1]
            descripcion = fila[2]
            precio = fila[3]
            stock_actual = fila[4]
            proveedor = fila[5]
            stock_min = fila[6]
            categoria = fila[7]

            # creamos el objeto producto
            producto = Producto(idProducto, nombre, descripcion,
                                precio, stock_actual, stock_min, proveedor, categoria)
            productos.append(producto)

        for p in productos:
            print(f"idProducto: {p.getId()}, nombre: {p.getNombre()}, descripcion: {p.getDescripcion()}, precio: {p.getPrecio()}, stock_actual: {p.getCantidadStockActual()}, proveedor: {p.getProveedor()}, stock_min: {p.getCantidadStockMin()}, categoria: {p.getCategoria()}")
        cursor.close()

    def crear_producto(self, producto):
        connection.connect()
        cursor = connection.cursor()
        consulta = "INSERT INTO productos (nombre, descripcion, precio, stock_actual, proveedor, stock_min, categoria) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        valores = (producto.getNombre(), producto.getDescripcion(), producto.getPrecio(), producto.getCantidadStockActual(
        ), producto.getProveedor(), producto.getCantidadStockMin(), producto.getCategoria())
        cursor.execute(consulta, valores)
        connection.commit()

    def eliminar_producto(self, id):
        connection.connect()
        cursor = connection.cursor()
        consulta = "DELETE FROM productos WHERE idProducto = %s"
        valores = (id,)
        cursor.execute(consulta, valores)
        connection.commit()
        cursor.close()
