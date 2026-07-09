# e-commerce_fullStack_400hrs

Cómo iniciar el servidor
Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

Node.js (versión 18 o superior)
pnpm
MongoDB (local o una conexión a MongoDB Atlas)
Clonar el repositorio
git clone https://github.com/codeCamilo23/e-commerce_fullStack_400hrs.git
cd e-commerce_fullStack_400hrs
Instalar las dependencias
pnpm install
Configurar las variables de entorno

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

PORT=3000
URI_MONGO=mongodb://localhost:27017/ecommerce

Si utilizas MongoDB Atlas, reemplaza URI_MONGO por la cadena de conexión correspondiente.

Iniciar el servidor

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
