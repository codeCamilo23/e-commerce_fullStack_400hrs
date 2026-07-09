# e-commerce_fullStack_400hrs

Antes de ejecutar el proyecto, asegúrate de tener instalado:
Node.js (versión 18 o superior)
pnpm
MongoDB (local o una conexión a MongoDB Atlas)

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
Node.js
Express.js
MongoDB
Mongoose
Dotenv
Nodemon
pnpm
