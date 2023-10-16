class DetallePedido():
    def __init__(self, producto, cant):
        self.producto = producto
        self.cant = cant

    def setProducto(self, producto):
        self.producto = producto

    def getProducto(self):
        return self.producto
    
    def setCant(self, cant):
        self.cant = cant

    def getCant(self):
        return self.cant
    
    