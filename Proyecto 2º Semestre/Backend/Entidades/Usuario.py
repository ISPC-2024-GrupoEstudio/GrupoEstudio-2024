class Usuario:
    def __init__(self, nombre, apellido, email, direccion, tipoDoc, nroDoc, nombreUsuario, contraseña, telefono, fechaAlta, fechaBaja, estado):
        self.nombre = nombre
        self.apellido = apellido
        self.email = email
        self.direccion = direccion
        self.tipoDoc = tipoDoc
        self.nroDoc = nroDoc
        self.nombreUsuario = nombreUsuario
        self.contraseña = contraseña
        self.telefono = telefono
        self.fechaAlta = fechaAlta
        self.fechaBaja = fechaBaja
        self.estado = estado


    def getNombre(self):
        return self.nombre
    
    def setNombre(self, nombre):
        self.nombre = nombre

    def getApellido(self):
        return self.apellido
    
    def setApellido(self, apellido):
        self.apellido = apellido

    def getDireccion(self):
        return self.direccion
    
    def setDireccion(self, direccion):
        self.direccion = direccion
    
    def getTipoDoc(self):
        return self.tipoDoc
    
    def setTipoDoc(self, tipoDoc):
        self.tipoDoc = tipoDoc
    
    def getNroDoc(self):
        return self.nroDoc
    
    def setNroDoc(self, nroDoc):
        self.nroDoc = nroDoc
    
    def getNombreUsuario(self):
        return self.nombreUsuario
    
    def setNombreUsuario(self, nombreUsuario):
        self.nombreUsuario = nombreUsuario
    
    def getContraseña(self):
        return self.contraseña
    
    def setContraseña(self, contraseña):
        self.contraseña = contraseña
    
    def getTelefono(self):
        return self.telefono
    
    def setTelefono(self, telefono):
        self.telefono = telefono

    def getFechaAlta(self):
        return self.fechaAlta
    
    def setFechaAlta(self, fechaAlta):
        self.fechaAlta = fechaAlta

    def getFechaBaja(self):
        return self.fechaBaja
    
    def setFechaBaja(self, fechaBaja):
        self.fechaBaja = fechaBaja

    def getEstado(self):
        return self.estado
    
    def setEstado(self, estado):
        self.estado = estado
    
