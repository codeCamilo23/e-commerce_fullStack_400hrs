# e-commerce_fullStack_400hrs

# 🛒 E-Commerce Full Stack

## Descripción General

E-Commerce Full Stack es un aplicativo web desarrollado como proyecto de formación, cuyo objetivo es gestionar la venta de productos mediante una arquitectura cliente-servidor.

El backend está desarrollado con Node.js, Express.js y MongoDB utilizando Mongoose como ODM para la gestión de la base de datos.

 Funcionalidades principales

- Registro y autenticación de usuarios.
- Gestión de roles de usuario.
- Gestión de categorías.
- Gestión de productos.
- Conexión con base de datos MongoDB.
- API REST para las operaciones CRUD.
- Organización del proyecto bajo una arquitectura modular.

---

# Requisitos Previos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js (versión 18 o superior)
- pnpm
- MongoDB Community Server o MongoDB Atlas
- MongoDB Compass (opcional para administrar la base de datos)
- Visual Studio Code
- Git

2. paso
Clonar el repositorio

git clone https://github.com/codeCamilo23/e-commerce_fullStack_400hrs.git

cd e-commerce_fullStack_400hrs

Instalar las dependencias
pnpm install
Configurar las variables de entorno

3. paso
Para probar la conexión a mongodb, antes de crear los modelos, controladores o rutas se debe asegurar
    •	Que la app se conecta a la base de datos
      1.	Instalar mongoose
	        Pnpm add mongoose
        	
      2.	Crear el archivo de conexión
	        Config/dataBase.js
      3.	Configurar el archivo .env
		      .env 
		        PORT=3000
        		URI_MONGO= MONGODB://LOCALHOST:
      4.	CARGAR LAS VARIABLES DE ENTORNO
      5.	
		        EN app.js => import dotenv from “dotenv”
			      dotenv.config()
  	
LISTA DE CHEQUEO – CONEXIÓN MONGODB
•  ✔️ Instalacion Mongoose. 
•  ✔️ Creacion un módulo para la conexión (dataBase.js). 
•  ✔️ Guardar la URI en un archivo .env. 
•  ✔️ Llamar a conectionMongo() desde app.js. 
•  ✔️ El servidor muestra en consola que la conexión fue exitosa.


para probar la conexion
En modo desarrollo:

pnpm run dev

O con Nodemon:

nodemon app.js
Verificar el funcionamiento

Abre el navegador o una herramienta como Postman y visita:

http://localhost:3000/

Si todo está configurado correctamente, el servidor responderá con un mensaje indicando que Express está funcionando.

Tecnologías utilizadas
JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Dotenv
- Nodemon
- pnpm
- Git
- GitHub

Estructura del Proyecto

backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middlewares/
│
├── app.js
├── package.json
└── .env

Estado del Proyecto

🚧 Proyecto en desarrollo.

Actualmente se encuentra en la fase de implementación del backend, incluyendo la configuración del servidor, conexión con MongoDB, definición de modelos de datos y desarrollo de los servicios REST.

---

# Contacto

**Autor:** Camilo Rueda López

GitHub:

https://github.com/codeCamilo23
