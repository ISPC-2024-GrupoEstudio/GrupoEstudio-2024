class TipoDoc():
    def __init__(self, nombre, descripcion):
        self.nombre = nombre
        self.descripcion = descripcion

    def setNombre(self,nombre):
        self.nombre = nombre

    def getNombre(self):
        return self.nombre
    
    def setDescripcion(self, descripcion):
        self.descrip = descripcion
    
    def getDescripcion(self):
        return self.descripcion
    
