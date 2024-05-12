class Proveedor():
    def __init__(self, id, nombre, direccion, telefono, mail):
        self.id = id
        self.nombre = nombre
        self.direccion = direccion
        self.telefono = telefono
        self.mail = mail
    
    def getId(self):
        return self.id
    
    def setId(self, id):
        self.id = id
    
    def getNombre(self):
        return self.nombre
    
    def setNombre(self, nombre):
        self.nombre = nombre
    
    def getDireccion(self):
        return self.direccion
    
    def setDireccion(self, direccion):
        self.direccion = direccion

    def getTelefono(self):
        return self.telefono
    
    def setTelefono(self, telefono):
        self.telefono = telefono
    
    def getMail(self):
        return self.mail
    
    def setMail(self, mail):
        self.mail = mail