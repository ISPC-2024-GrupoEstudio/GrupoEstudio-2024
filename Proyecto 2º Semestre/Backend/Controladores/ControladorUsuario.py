import Entidades.Usuario

class ControladorUsuario:
    def __init__(self):
        self.usuarios = [] # Lista de usuarios

    def registrarCliente(self, usuario):
        if isinstance(usuario, Entidades.Usuario):
            self.usuarios.append(usuario)
        else:
            print("El objeto no es una instancia de la clase Usuario")

    def getUsuario(self,nombreUsuario, password):
        for usuario in self.usuarios:
            if usuario.nombreUsuario == nombreUsuario and usuario.contraseña == password:
                return usuario
    
