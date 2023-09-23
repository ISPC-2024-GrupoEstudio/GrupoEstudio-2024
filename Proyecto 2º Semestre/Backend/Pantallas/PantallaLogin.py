import Controladores.ControladorUsuario
class PantallaLogin():
    def __init__(self, controlador):
        self.controlador = Controladores.ControladorUsuario()

    def login(self,nombreUsuario, contraseña):
        self.controlador.getUsuario(nombreUsuario, contraseña)