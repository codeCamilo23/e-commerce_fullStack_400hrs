//1. importar dependencias
import express from "express";
import dotenv from "dotenv";
import { conectionMongo } from "./src/config/dataBase.js";

import { productsRouter } from "./src/routes/productos.routes.js";
import { usuarioRouter } from "./src/routes/users.routes.js";
import { categoriaRouter } from "./src/routes/categoria.routes.js";
import { detallePedidoRouter } from "./src/routes/detallePedido.routes.js";
import { carritoRouter } from "./src/routes/carrito.routes.js";

//2. crear las configuraciones necesarias
const app = express();

dotenv.config();

const port = process.env.PORT;

conectionMongo(); //llamar a la funcion para conectar a la bd

//configurar las rutas

app.use(express.json()); //permite recibir datos en formato json

app.use("/usuarios", usuarioRouter);
app.use("/productos", productsRouter);
app.use("/categoria", categoriaRouter);
app.use("/detallePedido", detallePedidoRouter);
app.use("/carrito",carritoRouter);



// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
