import Entidades.Usuario

class Admin(Entidades.Usuario):
    def __init__(self, nombre, nroDoc, tipoDoc, apellido, telefono, fechaAlta, direccion, fechaBaja, contraseña, nombreUsuario):
        super().__init__(nombre, nroDoc, tipoDoc, apellido, telefono, fechaAlta, direccion, fechaBaja, contraseña, nombreUsuario)