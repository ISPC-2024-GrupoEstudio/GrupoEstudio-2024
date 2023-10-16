class DetalleVenta():
    def __init__(self, producto, monto, cant):
        self.producto = producto
        self.monto = monto
        self.cant = cant

    def setProducto(self, producto):
        self.producto = producto

    def getProducto(self):
        return self.producto
    
    def setMonto(self, monto):
        self.monto = monto

    def getMonto(self):
        return self.monto
    
    def setCant(self, cant):
        self.cant = cant

    def getCant(self):
        return self.cant
    
    