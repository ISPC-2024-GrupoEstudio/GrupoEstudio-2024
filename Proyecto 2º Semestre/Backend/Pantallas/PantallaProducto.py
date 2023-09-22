import Controladores.ControladorProductos
class PantallaProducto():
    def __init__(self):
        self.controlador = Controladores.ControladorProductos()

    def filtrarPorCategoria(self,categoria):
        self.controlador.filtrarPorCategoria(categoria)