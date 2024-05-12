class Categoria():
    def __init__(self, id, nombre, descrip):
        self.id = id
        self.nombre = nombre
        self.descrip = descrip

    def setId(self, id):
        self.id = id

    def getId(self):
        return self.id
    
    def setNombre(self,nombre):
        self.nombre = nombre

    def getNombre(self):
        return self.nombre
    
    def setDescripcion(self, descrip):
        self.descrip = descrip
    
    def getDescripcion(self):
        return self.descrip
    
