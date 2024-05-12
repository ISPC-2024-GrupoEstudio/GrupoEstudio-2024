from .Usuario import Usuario

class Admin(Usuario):
    def __init__(self, nombre, nroDoc, tipoDoc, apellido, telefono, fechaAlta, direccion, fechaBaja, contraseña, nombreUsuario):
        super().__init__(nombre, nroDoc, tipoDoc, apellido, telefono, fechaAlta, direccion, fechaBaja, contraseña, nombreUsuario)