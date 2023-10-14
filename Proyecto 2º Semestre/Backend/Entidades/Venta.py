class Venta():
    def __init__(self, nroFactura, fecha, detalleVenta):
        self.nroFactura = nroFactura
        self.fecha = fecha
        self.detalleVenta = detalleVenta

    def getNroFactura(self):
        return self.nroFactura
    
    def setNroFactura(self, nroFactura):
        self.nroFactura = nroFactura

    def getFecha(self):
        return self.fecha
    
    def setFecha(self, fecha):
        self.fecha = fecha

    def getDetalleVenta(self):
        return self.detalleVenta
    
    def setDetalleVenta(self, detalleVenta):
        self.detalleVenta = detalleVenta

    