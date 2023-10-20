from Entidades.Producto import Producto
from Utils.Conector import connection
class ControladorProductos():

    def filtrarPorCategoria(self,categoria):
        prodXCategoria = []
        for p in self.productos:
            if p.categoria == categoria:
                prodXCategoria.append(p)
        return prodXCategoria

    def modificar_producto(_self_, producto):
        connection.connect()
        cursor=connection.cursor()
        consulta = "UPDATE productos SET nombre = %s, descripcion = %s, precio = %s, stock_actual = %s, proveedor = %s, stock_min = %s, categoria = %s WHERE idProducto = %s"
        valores = (producto.getNombre(), producto.getDescripcion(), producto.getPrecio(), producto.getCantidadStockActual(), producto.getProveedor(), producto.getCantidadStockMin(), producto.getCategoria(), producto.getId())
        cursor.execute(consulta, valores)
        connection.commit()

    def obtener_productos(_self_):
        connection.connect()
        cursor=connection.cursor()
        cursor.execute("SELECT * FROM productos")
        query = cursor.fetchall()
        productos = []
        for i in query:
            producto = Producto(i[0],i[1],i[2],i[3],i[4],i[6],i[5],i[7])
            productos.append(producto)
        return productos
    

   consulta = "SELECT * FROM productos"
   cursor = conexion.cursor()

   cursor.execute(consulta)

   resultados = cursor.fetchall()

for fila in resultados:
    idProductos, nombre, descripcion, pedido, stock_actual, proveedor, stock_min, categoria = fila
    print(f"ID de Producto: {idProductos}")
    print(f"Nombre: {nombre}")
    print(f"Descripción: {descripcion}")
    print(f"Pedido: {pedido}")
    print(f"Stock Actual: {stock_actual}")
    print(f"Proveedor: {proveedor}")
    print(f"Stock Mínimo: {stock_min}")
    print(f"Categoría: {categoria}")
    print("\n")

cursor.close()
conexion.close()


    def crear_producto(self, producto):
            connection.connect()
            cursor = connection.cursor()
            consulta = "INSERT INTO productos (nombre, descripcion, precio, stock_actual, proveedor, stock_min, categoria) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            valores = (producto.getNombre(), producto.getDescripcion(), producto.getPrecio(), producto.getCantidadStockActual(), producto.getProveedor(), producto.getCantidadStockMin(), producto.getCategoria())
            cursor.execute(consulta, valores)
            connection.commit()
        

