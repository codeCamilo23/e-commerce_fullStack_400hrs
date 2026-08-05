import detallePedidoModel from "../models/detallePedido.model.js";
import pedidoModel from "../models/pedido.model.js";
import productModel from "../models/product.model.js";

//1. Crear detalle de pedido (POST)
export const createDetallePedido = async (req, res) => {
    try {

        const {
            pedido,
            producto,
            cantidad,
            precioUnitario,
            notas
        } = req.body;

        // Validar que exista el pedido
        const pedidoExiste = await pedidoModel.findById(pedido);

        if (!pedidoExiste) {
            return res.status(404).json({
                mensaje: "El pedido no existe."
            });
        }

        // Validar que exista el producto
        const productoExiste = await productModel.findById(producto);

        if (!productoExiste) {
            return res.status(404).json({
                mensaje: "El producto no existe."
            });
        }

        // Calcular automáticamente el precio total
        const precioTotal = cantidad * precioUnitario;

        const nuevoDetalle = await detallePedidoModel.create({

            pedido,
            producto,
            cantidad,
            precioUnitario,
            precioTotal,
            notas

        });

        return res.status(201).json({
            mensaje: "Detalle del pedido creado correctamente.",
            datos: nuevoDetalle

        });

    } catch (error) {
        return res.status(400).json({
        mensaje: "Error al crear el detalle del pedido.",
        problema: error.message

        });

    }

};


//2. Mostrar todos los detalles (GET)
export const showDetallePedido = async (req, res) => {

    try {

        const detalles = await detallePedidoModel

        .find()

        .populate("pedido")

        .populate("producto");

        if (detalles.length === 0) {

            return res.status(200).json({

                mensaje: "No existen detalles de pedidos."

            });

        }

        return res.status(200).json({

            totalDetalles: detalles.length,

            datos: detalles

        });

    } catch (error) {

        return res.status(400).json({

            mensaje: "Error al mostrar los detalles.",

            problema: error.message

        });

    }

};
//mostar un detalle por id
export const showDetallePedidoById = async (req, res) => {

    try {

        const { id } = req.params;

        const detalle = await detallePedidoModel

        .findById(id)

        .populate("pedido")

        .populate("producto");

        if (!detalle) {

            return res.status(404).json({

                mensaje: "Detalle no encontrado."

            });

        }

        return res.status(200).json({

            datos: detalle

        });

    } catch (error) {

        return res.status(400).json({

            mensaje: "Error.",

            problema: error.message

        });

    }

};

//actualizar detalle PUT
export const updateDetallePedido = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            cantidad,

            precioUnitario,

            notas

        } = req.body;

        const detalle = await detallePedidoModel.findById(id);

        if (!detalle) {

            return res.status(404).json({

                mensaje: "Detalle no encontrado."

            });

        }

        detalle.cantidad = cantidad;

        detalle.precioUnitario = precioUnitario;

        detalle.notas = notas;

        // Recalcular automáticamente

        detalle.precioTotal = cantidad * precioUnitario;

        await detalle.save();

        return res.status(200).json({

            mensaje: "Detalle actualizado correctamente.",

            datos: detalle

        });

    } catch (error) {

        return res.status(400).json({

            mensaje: "Error al actualizar.",

            problema: error.message

        });

    }

};


//5. Eliminar detalle (DELETE)
export const deleteDetallePedido = async (req, res) => {

    try {

        const { id } = req.params;

        const detalle = await detallePedidoModel.findById(id);

        if (!detalle) {

            return res.status(404).json({

                mensaje: "Detalle no encontrado."

            });

        }

        await detallePedidoModel.findByIdAndDelete(id);

        return res.status(200).json({

            mensaje: "Detalle eliminado correctamente."

        });

    } catch (error) {

        return res.status(400).json({

            mensaje: "Error al eliminar.",

            problema: error.message

        });

    }

};