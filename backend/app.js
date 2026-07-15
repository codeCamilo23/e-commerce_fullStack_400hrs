
//1. importar dependencias
import express from "express";
import dotenv from "dotenv";
import { conectionMongo } from "./src/config/dataBase.js";




//2. crear las configuraciones necesarias
const app = express();
dotenv.config();

const port = process.env.PORT;
conectionMongo();//llamar a la funcion para conectar a la bd


// 3. rutas
// Endpoint de prueba
app.get("/", (req, res) => {
  res.send("hola, el servidor funciona")
});


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});



