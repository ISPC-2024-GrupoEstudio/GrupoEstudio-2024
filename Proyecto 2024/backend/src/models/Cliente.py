from .Usuario import Usuario

class Cliente(Usuario):
    def __init__(self, nombre, apellido, telefono, direccion, fechaAlta, fechaBaja, nroDoc, estado, tipoDoc, contraseña, nombreUsuario, nroCliente):
        super().__init__(nombre, apellido, telefono, direccion, fechaAlta, fechaBaja, nroDoc, estado, tipoDoc, contraseña, nombreUsuario)
        self.nroCliente = nroCliente

    def obtenerNroCliente(self):
        return self.nroCliente
    
    def bajaCliente(self):
        self.estado = False


