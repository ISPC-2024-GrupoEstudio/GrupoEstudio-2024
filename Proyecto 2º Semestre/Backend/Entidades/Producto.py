class Producto():
    def __init__(self, id, nombre, descripcion, precio, cantidadStockActual, cantidadStockMin, proveedor, categoria):
        self.id = id
        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.cantidadStockActual = cantidadStockActual
        self.cantidadStockMin = cantidadStockMin
        self.proveedor = proveedor
        self.categoria = categoria
    
    def getId(self):
        return self.id
    
    def setId(self, id):
        self.id = id

    def getNombre(self):
        return self.nombre
    
    def setNombre(self, nombre):
        self.nombre = nombre

    def getDescripcion(self):
        return self.descripcion
    
    def setDescripcion(self, descripcion):
        self.descripcion = descripcion

    def getPrecio(self):
        return self.precio
    
    def setPrecio(self, precio):
        self.precio = precio

    def getCantidadStockActual(self):
        return self.cantidadStockActual
    
    def setCantidadStockActual(self, cantidadStockActual):
        self.cantidadStockActual = cantidadStockActual
    
    def getCantidadStockMin(self):
        return self.cantidadStockMin
    
    def setCantidadStockMin(self, cantidadStockMin):
        self.cantidadStockMin = cantidadStockMin
    
    def getProveedor(self):
        return self.proveedor
    
    def setProveedor(self, proveedor):
        self.proveedor = proveedor
    
    def getCategoria(self):
        return self.categoria
    
    def setCategoria(self, categoria):
        self.categoria = categoria
