import { addProductCarrito } from "../controllers/carrito.controller.js";
import { showCarrito } from "../controllers/carrito.controller.js";
import { updateCantidadProducto } from "../controllers/carrito.controller.js";
import { deleteProductoCarrito } from "../controllers/carrito.controller.js";
import { vaciarCarrito } from "../controllers/carrito.controller.js";
import { confirmarCompra } from "../controllers/carrito.controller.js";
import express from "express";

export const carritoRouter = express.Router();

carritoRouter.post("/agregar", addProductCarrito);

carritoRouter.get("/mostrar/:usuario", showCarrito);

carritoRouter.put("/actualizar/:usuario/:producto", updateCantidadProducto);

carritoRouter.delete("/eliminar/:usuario/:producto", deleteProductoCarrito);

carritoRouter.delete("/vaciar/:usuario", vaciarCarrito);

carritoRouter.post("/checkout/:usuario", confirmarCompra);