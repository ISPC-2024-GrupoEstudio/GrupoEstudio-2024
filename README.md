# 🐾 Pet Boutique - Tienda en línea de productos para mascotas
Pet Boutique es una **aplicación web de e-commerce** desarrollada como proyecto académico para la Tecnicatura en Desarrollo Web y Aplicaciones Digitales del Instituto Superior Politécnico Córdoba (ISPC). La tienda permite a los usuarios explorar, comprar productos para mascotas y gestionar su perfil, ofreciendo una experiencia completa de compra.

## 🌐 Descripción General
Esta aplicación simula una tienda en línea especializada en productos para mascotas, incluyendo juguetes, accesorios, indumentaria, entre otros. Está pensada como un entorno de práctica para aplicar los conocimientos adquiridos en tecnologías web modernas, y está orientada a usuarios interesados en realizar compras simuladas, gestionar sus perfiles y explorar funcionalidades de un sistema completo de e-commerce.

## 🚀 Funcionalidades Principales
✅ **Landing Page:** Los usuarios cuentan con una landing page que tiene una pequeña reseña de la empresa y el mapa de su ubicación. 

✅ **Catálogo de Productos:** Los usuarios pueden navegar por una amplia selección de productos que incluyen indumentaria, juguetes, accesorios y más, o elegir buscar un producto específico por su nombre o descripción.  

✅ **Carrito de compras y proceso de checkout:** Los usuarios registrados tienen la funcionalidad disponible para agregar productos al carrito y después comprarlos a través de una pasarela de pagos simulada.  

✅ **Dashboard:** Los usuarios registrados tienen a su disposición un dashboard que muestra el historial de sus compras realizadas y sus cupones disponibles.  

✅ **Registro:** Los usuarios pueden registrarse en la plataforma y acceder a su cuenta para poder realizar sus compras.  

✅ **Login:** Los usuarios pueden iniciar sesión con las credenciales obtenidas del registro.  

✅ **Perfil:** Los usuarios registrados cuentan con esta funcionalidad para poder editar su foto de perfil y sus datos personales si así lo desean y poder visualizarlos en cualquier momento.  

✅ **Contacto:** Los usuarios pueden poner sus datos para facilitar el contacto, y tienen facilitado los números de contacto si ellos quisieran contactarse con la empresa directamente. Así mismo los usuarios registrados cuentan con un formulario precompletado con sus datos.  

✅ **Versión móvil:** Que redirige a la versión móvil del proyecto.  

## 🛠️ Tecnologías Utilizadas
- Angular CLI 17 → Frontend web SPA
  
- Django 4.2 → Backend y API REST
  
- MySQL Workbench → Base de datos relacional
  
- Node.js → Dependencias frontend
  
- Python (virtualenv) → Entorno virtual backend
  
- Cloudinary → Gestión de imágenes de perfil  

## 📷 Capturas de Pantalla

### Página de inicio
![Página de inicio](./Proyecto%202024/frontend/src/assets/imagenes/Readme-Capturas/inicio.png)

### Página de Productos
![Página de Productos](./Proyecto%202024/frontend/src/assets/imagenes/Readme-Capturas/productos.png)  
![Página de Detalle Producto](./Proyecto%202024/frontend/src/assets/imagenes/Readme-Capturas/productos2.png)

### Página de Contacto
![Página de Contacto](./Proyecto%202024/frontend/src/assets/imagenes/Readme-Capturas/contacto.png)

### Página de Login
![Página de Login](./Proyecto%202024/frontend/src/assets/imagenes/Readme-Capturas/login.png)

### Página de Registro
![Página de Registro](./Proyecto%202024/frontend/src/assets/imagenes/Readme-Capturas/registro.png)

### Página de Checkout
![Página de Checkout](./Proyecto%202024/frontend/src/assets/imagenes/Readme-Capturas/checkout.png)

### Página de Dashboard
![Página de Dashboard](./Proyecto%202024/frontend/src/assets/imagenes/Readme-Capturas/dashboard.png)

### Página de Perfil
![Página de Perfil](./Proyecto%202024/frontend/src/assets/imagenes/Readme-Capturas/perfil.png)

## 💻 Instrucciones de Instalación y Ejecución Local
**1.** Clonar el repositorio
```
git clone https://github.com/tu-usuario/pet-boutique.git
cd pet-boutique
```
**2.** Backend (Django)
```
cd backend/PetBoutique
```
**3.** Crear entorno virtual e instalar dependencias
```
python -m venv miEntornoVale
source miEntornoVale/bin/activate  # En Windows: miEntornoVale\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt
```
**4.** Configurar base de datos
```
# Crear una base de datos MySQL llamada "petboutique"
# Importar el archivo SQL proporcionado (por ejemplo desde MySQL Workbench)

# Configurar variables en settings.py si es necesario (credenciales de BD, Cloudinary, etc.)

# Migrar base de datos y crear superusuario
python manage.py migrate
python manage.py createsuperuser
```
**5.** Ejecutar servidor backend
```
python manage.py runserver
```
**6.** Frontend (Angular)
```
cd frontend/pet-boutique
```
**7.** Instalar dependencias y ejecutar servidor
```
npm install

# Ejecutar servidor de desarrollo
ng serve
```
La aplicación estará disponible en http://localhost:4200/

El backend en http://127.0.0.1:8000/

## 📁 Estructura del Proyecto
```
GrupoEstudio-2024/
├── 📄 README.md
├── 📄 .gitignore
├── 📄 package.json
├── 📄 package-lock.json
├── 📁 .vscode/
│   └── settings.json
├── 📁 Proyecto 2024/
│   ├── 📁 backend/
│   │   ├── 📄 manage.py
│   │   ├── 📄 requirements.txt
│   │   ├── 📁 PetBoutique/
│   │   │   ├── settings.py
│   │   │   ├── urls.py
│   │   │   ├── wsgi.py
│   │   │   └── __init__.py
│   │   ├── 📁 PetBoutiqueApp/
│   │   │   ├── models.py
│   │   │   ├── views.py
│   │   │   ├── serializers.py
│   │   │   ├── urls.py
│   │   │   └── __init__.py
│   │   ├── 📁 BBDD/
│   │   │   ├── ScriptPetBoutiqueApp.sql
│   │   │   ├── ScriptPetBoutiqueAppnuevo.sql
│   │   │   ├── ScriptPetBoutiqueAppviejo2024.sql
│   │   │   └── ModeloBD.png
│   │   ├── 📁 Imagenes/
│   │   │   ├── Banner.png
│   │   │   └── Fondos/
│   │   │       └── wave.svg
│   │   ├── 📁 CSS/
│   │   │   └── styles.css
│   │   └──  📁 templates/
│   │  │   ├── base_generic.html
│   │   │   └── registration/
│   │   │       ├── login.html
│   │   │       └── password_reset.html
│   │   └── 📁 entornoProyecto/
│   │       └── pyvenv.cfg  # Entorno virtual (ignorar en Git)
│
│   ├── 📁 frontend/
│   │   ├── angular.json
│   │   ├── package.json
│   │   ├── 📁 src/
│   │   │   ├── 📁 app/
│   │   │   │   ├── 📁 components/
│   │   │   │   │   └── filtro-productos/
│   │   │   │   │   │   ├── filtro-productos.component.css
│   │   │   │   │   │   ├── filtro-productos.component.html
│   │   │   │   │   │   ├── filtro-productos.component.spec
│   │   │   │   │   │   └── filtro-productos.component.ts
│   │   │   │   ├── 📁 models/
│   │   │   │   │   │   ├── carrito.interface.ts
│   │   │   │   │   │   ├── categoria.interface.ts
│   │   │   │   │   │   ├── estadoPedido.interface.ts
│   │   │   │   │   │   ├── formaDePago.interface.ts
│   │   │   │   │   │   ├── pedido.interface.ts
│   │   │   │   │   │   ├── producto.interface.ts
│   │   │   │   │   │   ├── productosXPedido.interface.ts
│   │   │   │   │   │   ├── proveedor.interface.ts
│   │   │   │   │   │   ├── tipoEnvio.interface.ts
│   │   │   │   │   │   ├── usuario.interface.ts
│   │   │   │   ├── 📁 pages/
│   │   │   │   │   ├── auth/
│   │   │   │   │   │   ├── login/
│   │   │   │   │   │   │   └── login.component.ts
│   │   │   │   │   │   └── registro/
│   │   │   │   │   │       └── registro.component.ts
│   │   │   │   │   ├── cart/
│   │   │   │   │   │   ├── checkout/
│   │   │   │   │   │   │   └── checkout.component.ts
│   │   │   │   │   │   └── minicart/
│   │   │   │   │   │       └── minicart.component.ts
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   ├── cupones/
│   │   │   │   │   │   │   └── cupones.component.ts
│   │   │   │   │   │   ├── detalle-compra/
│   │   │   │   │   │   │   └── detalle-compra.component.ts
│   │   │   │   │   │   ├── historial-compra/
│   │   │   │   │   │   │   └── historial-compra.component.ts
│   │   │   │   │   │   └── dashboard.component.ts
│   │   │   │   │   ├── guards/
│   │   │   │   │   ├── home/
│   │   │   │   │   │   ├── home.component.ts
│   │   │   │   │   ├── not-found/
│   │   │   │   │   │   ├── not-found.component.ts
│   │   │   │   │   ├── perfil/
│   │   │   │   │   │   ├── perfil.component.ts
│   │   │   │   │   │   └── editar-perfil/
│   │   │   │   │   │       └── editar-perfil.component.ts
│   │   │   │   │   ├── contacto/
│   │   │   │   │   │       └── contacto.component.ts
│   │   │   │   │   └── productos/
│   │   │   │   │          └── productos.component.ts
│   │   │   │   ├── 📁 services/
│   │   │   │   │   ├── auth.service.ts
│   │   │   │   │   ├── auth.interceptor.ts
│   │   │   │   │   ├── cart.service.ts
│   │   │   │   │   ├── cupon.service.ts
│   │   │   │   │   ├── categoria.service.ts
│   │   │   │   │   ├── estadoPedido.service.ts
│   │   │   │   │   ├── formaDePago.service.ts
│   │   │   │   │   ├── pedidos.service.ts
│   │   │   │   │   ├── perfil.service.ts
│   │   │   │   │   ├── provedor.service.ts
│   │   │   │   │   ├── tipoEnvio.service.ts
│   │   │   │   │   └── user.service.ts
│   │   │   │   └── 📁 shared/
│   │   │   │   │   ├── footer/
│   │   │   │   │   │       └── footer.component.ts
│   │   │   │   │   ├── nav/
│   │   │   │   │           └── nav.component.ts
│   │   │   ├── 📁 assets/
│   │   │   │   └── 📁 imagenes/
│   │   │   │       ├── PetBoutique.png
│   │   │   │       ├── Accesorios/
│   │   │   │       ├── Contacto/
│   │   │   │       ├── Cuchas/
│   │   │   │       ├── Dashboard/
│   │   │   │       ├── Juguetes/
│   │   │   │       ├── Perfil/
│   │   │   │       ├── Ropa/
│   │   │   │       └── Capturas/
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   └── styles.css

```

## 🔗 Enlaces Útiles
- [Angular Docs](https://angular.io/docs)
- [Django Docs](https://docs.djangoproject.com/)
- [Cloudinary](https://cloudinary.com/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- [Versión móvil del proyecto]([https://github.com/tu-usuario/pet-boutique-movil](https://github.com/ISPC-2024-GrupoEstudio/GrupoEstudio-Mobile2024)) 

## 👥 Autores / Colaboradores
- Florencia Noel Carrillo - [@FlorenciaCarrilo]

- Florencia Castelucci - [@FlorCastelucci]

- Milena Nicole Giménez - [@MilenaGimenez]

- Valentina Angeletti - [@ValeAngeletti]

## 🏫 Mención a la Institución
Proyecto desarrollado en el marco de la Tecnicatura en Desarrollo Web y Aplicaciones Digitales del
Instituto Superior Politécnico Córdoba (ISPC) — Año 2023-2025

## 📄 Licencia
Este proyecto tiene fines educativos y no está destinado a producción ni a la venta real de productos.
Todos los derechos reservados © 2023-2025.
