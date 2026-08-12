import { postProduct } from "../controllers/producto.controller.js";

import { getProduct } from "../controllers/producto.controller.js";
import { putProductById } from "../controllers/producto.controller.js";
import { deleteProductById } from "../controllers/producto.controller.js";
import express from "express";

export const productsRouter = express.Router();

productsRouter.post("/crearProducto", postProduct);

productsRouter.get("/mostrarProducto", getProduct);

productsRouter.put("/actualizarProducto/:id", putProductById);

productsRouter.delete("/eliminarProducto/:id", deleteProductById);
