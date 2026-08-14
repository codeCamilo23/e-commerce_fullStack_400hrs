import { pedidoModel } from "../models/Pedido.model.js";
// =====================================================
// POST -> Crear un pedido
// =====================================================

export const createPedido = async (req, res) => {
  try {
    // 1. Obtener información enviada por el cliente
    const { usuario, total, direccion } = req.body;

    // 2. Validar datos obligatorios

    if (!usuario || !total || !direccion) {
      return res.status(400).json({
        mensaje: "Usuario, total y dirección son obligatorios.",
      });
    }

    // 3. Crear el pedido

    const nuevoPedido = await pedidoModel.create({
      usuario,
      total,
      direccion,
    });

    // 4. Responder

    return res.status(201).json({
      mensaje: "Pedido creado correctamente",

      datos: nuevoPedido,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al crear el pedido",

      problema: error.message,
    });
  }
};

// =====================================================
// GET -> Mostrar todos los pedidos
// =====================================================

export const showPedidos = async (req, res) => {
  try {
    // Buscar todos los pedidos
    const pedidos = await pedidoModel.find().populate("usuario");

    // Verificar si existen pedidos
    if (pedidos.length === 0) {
      return res.status(200).json({
        mensaje: "No hay pedidos registrados",

        datos: [],
      });
    }

    return res.status(200).json({
      mensaje: "Pedidos encontrados",

      numeroPedidos: pedidos.length,

      datos: pedidos,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al mostrar los pedidos",

      problema: error.message,
    });
  }
};

// =====================================================
// GET -> Mostrar un pedido por ID
// =====================================================

export const showPedidoById = async (req, res) => {
  try {
    // Obtener ID de la URL
    const { id } = req.params;

    // Buscar pedido
    const pedido = await pedidoModel.findById(id).populate("usuario");

    // Verificar si existe
    if (!pedido) {
      return res.status(404).json({
        mensaje: "Pedido no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: "Pedido encontrado",

      datos: pedido,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al buscar el pedido",

      problema: error.message,
    });
  }
};

// =====================================================
// GET -> Mostrar pedidos de un usuario
// =====================================================

export const showPedidosByUsuario = async (req, res) => {
  try {
    const { usuario } = req.params;

    const pedidos = await pedidoModel.find({ usuario }).populate("usuario");

    if (pedidos.length === 0) {
      return res.status(200).json({
        mensaje: "El usuario no tiene pedidos",

        datos: [],
      });
    }

    return res.status(200).json({
      mensaje: "Pedidos del usuario encontrados",

      numeroPedidos: pedidos.length,

      datos: pedidos,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al buscar los pedidos",

      problema: error.message,
    });
  }
};

// =====================================================
// PUT -> Actualizar estado del pedido
// =====================================================

export const updateEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const { estado } = req.body;

    // Validar estado
    const estadosPermitidos = [
      "Pendiente",
      "Pagado",
      "Enviado",
      "Entregado",
      "Cancelado",
    ];

    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({
        mensaje: "Estado no válido",

        estadosPermitidos,
      });
    }

    // Actualizar pedido

    const pedidoActualizado = await pedidoModel.findByIdAndUpdate(
      id,

      {
        estado,
      },

      {
        new: true,
        runValidators: true,
      },
    ).populate("usuario");

    if (!pedidoActualizado) {
      return res.status(404).json({
        mensaje: "Pedido no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: "Estado del pedido actualizado correctamente",

      datos: pedidoActualizado,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al actualizar el pedido",

      problema: error.message,
    });
  }
};

// =====================================================
// PUT -> Actualizar dirección del pedido
// =====================================================

export const updateDireccionPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const { direccion } = req.body;

    if (!direccion) {
      return res.status(400).json({
        mensaje: "La dirección es obligatoria",
      });
    }

    const pedidoActualizado = await pedidoModel.findByIdAndUpdate(
      id,

      {
        direccion,
      },

      {
        new: true,
        runValidators: true,
      },
    );

    if (!pedidoActualizado) {
      return res.status(404).json({
        mensaje: "Pedido no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: "Dirección actualizada correctamente",

      datos: pedidoActualizado,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al actualizar la dirección",

      problema: error.message,
    });
  }
};

// =====================================================
// DELETE -> Cancelar pedido
// =====================================================

export const cancelPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedidoCancelado = await pedidoModel.findByIdAndUpdate(
      id,

      {
        estado: "Cancelado",
      },

      {
        new: true,
      },
    );

    if (!pedidoCancelado) {
      return res.status(404).json({
        mensaje: "Pedido no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: "Pedido cancelado correctamente",

      datos: pedidoCancelado,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al cancelar el pedido",

      problema: error.message,
    });
  }
};
