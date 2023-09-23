class Proveedor():
    def __init__(self, id, nombre, descripcion):
        self.id = id
        self.nombre = nombre
        self.descripcion = descripcion
    
    def getId(self):
        return self.id
    
    def setId(self, id):
        self.id = id
    
    def getNombre(self):
        return self.nombre
    
    def setNombre(self, nombre):
        self.nombre = nombre
    
    def getDescripcion(self):
        return self.descripcion
    
    def setDescripcion(self, descripcion):
        self.descripcion = descripcion