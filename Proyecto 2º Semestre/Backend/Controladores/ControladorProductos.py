import Entidades.Producto
class ControladorProductos():
    def __init__(self,productos):
        self.productos = [] # Lista de productos

    def filtrarPorCategoria(self,categoria):
        prodXCategoria = []
        for p in self.productos:
            if p.categoria == categoria:
                prodXCategoria.append(p)
        return prodXCategoria

    