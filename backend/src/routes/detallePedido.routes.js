import express from "express";

import {
    createDetallePedido,
    showDetallePedido,
    showDetallePedidoById,
    updateDetallePedido,
    deleteDetallePedido
} from "../controllers/detallePedido.controller.js";

export const detallePedidoRouter = express.Router();

// Crear detalle
detallePedidoRouter.post(
    "/crear",
    createDetallePedido
);

// Mostrar todos los detalles
detallePedidoRouter.get(
    "/mostrar",
    showDetallePedido
);

// Mostrar un detalle por ID
detallePedidoRouter.get(
    "/mostrar/:id",
    showDetallePedidoById
);

// Actualizar un detalle
detallePedidoRouter.put(
    "/actualizar/:id",
    updateDetallePedido
);

// Eliminar un detalle
detallePedidoRouter.delete(
    "/eliminar/:id",
    deleteDetallePedido
);