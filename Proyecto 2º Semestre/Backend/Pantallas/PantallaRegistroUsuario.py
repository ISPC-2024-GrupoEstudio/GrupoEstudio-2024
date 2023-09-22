import Controladores.ControladorUsuario

class PantallaRegistroUsuario:
    def __init__ (self, usuario):
        self.controlador = Controladores.ControladorUsuario.ControladorUsuario()

    def registrarCliente(self, nombre, apellido, direccion, tipoDoc, nroDoc, nombreUsuario, contraseña, telefono):
        self.controlador.registrarCliente(nombre, apellido, direccion, tipoDoc, nroDoc, nombreUsuario, contraseña, telefono)
