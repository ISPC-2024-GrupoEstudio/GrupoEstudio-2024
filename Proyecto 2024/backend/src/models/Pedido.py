class Pedido():
    def __init__(self, nroPedido, usuario, fecha, detallePedido, estado):
        self.nroPedido = nroPedido 
        self.usuario = usuario
        self.fecha = fecha
        self.detallePedido = detallePedido
        self.estado = estado

    def setNroPedido(self, nroPedido):
        self.nroPedído = nroPedido

    def getNroPedido(self):
        return self.nroPedido
    
    def setUsuario(self, usuario):
        self.usuario = usuario

    def getUsuario(self):
        return self.usuario
    
    def setFecha(self, fecha):
        self.fecha = fecha

    def getFecha(self):
        return self.fecha
    
    def setDetallePedido(self, detallePedido):
        self.detallePedido = detallePedido

    def getDetallePedido(self):
        return self.detallePedido
    
    def setEstado(self, estado):
        self.estado = estado

    def getEstado(self):
        return self.estado
    
    