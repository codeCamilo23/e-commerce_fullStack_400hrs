
import { carritoModel } from "../models/carrito.model.js";
import { userModel1 } from "../models/Usuario.model.js";
import { productModel } from "../models/product.model.js";
import { pedidoModel } from "../models/Pedido.model.js";
import { detallePedidoModel } from "../models/detallePedido.model.js";

// =====================================================
// 1. AGREGAR PRODUCTO AL CARRITO (POST)
// =====================================================

export const addProductCarrito = async (req, res) => {
  try {
    const { usuario, producto, cantidad } = req.body;

    // Validar cantidad
    if (!cantidad || cantidad <= 0) {
      return res.status(400).json({
        mensaje: "La cantidad debe ser mayor a cero.",
      });
    }

    // Validar usuario existe
    const usuarioExiste = await userModel1.findById(usuario);
    if (!usuarioExiste) {
      return res.status(404).json({
        mensaje: "El usuario no existe.",
      });
    }

    // Buscar o crear carrito
    let carrito = await carritoModel.findOne({ usuario });
    if (!carrito) {
      carrito = new carritoModel({
        usuario,
        productos: [],
        total: 0,
        subtotal: 0,
      });
    }

    // Validar producto existe
    const productoEncontrado = await productModel.findById(producto);
    if (!productoEncontrado) {
      return res.status(404).json({
        mensaje: "Producto no encontrado.",
      });
    }

    // Validar stock
    if (productoEncontrado.stock < cantidad) {
      return res.status(400).json({
        mensaje: `Stock insuficiente. Disponible: ${productoEncontrado.stock}`,
        stockDisponible: productoEncontrado.stock,
      });
    }

    // Buscar producto en carrito
    const indiceProducto = carrito.productos.findIndex(
      (item) => item.producto.toString() === producto
    );

    if (indiceProducto >= 0) {
      // Producto existe: validar nuevo total de stock
      const cantidadAdicional =
        cantidad - carrito.productos[indiceProducto].cantidad;
      if (productoEncontrado.stock < cantidadAdicional) {
        return res.status(400).json({
          mensaje: `No hay suficiente stock para agregar ${cantidadAdicional} más unidades.`,
          stockDisponible: productoEncontrado.stock,
        });
      }
      // Actualizar cantidad
      carrito.productos[indiceProducto].cantidad = cantidad;
      carrito.productos[indiceProducto].subtotal =
        cantidad * carrito.productos[indiceProducto].precioUnitario;
    } else {
      // Producto nuevo
      carrito.productos.push({
        producto,
        cantidad,
        precioUnitario: productoEncontrado.precio,
        subtotal: productoEncontrado.precio * cantidad,
      });
    }

    // Recalcular totales
    carrito.subtotal = carrito.productos.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    carrito.total = carrito.subtotal; // Sin impuestos por ahora

    // Guardar carrito
    await carrito.save();

    // Retornar carrito populado
    const carritoCompleto = await carritoModel
      .findById(carrito._id)
      .populate("usuario", "nombre email")
      .populate("productos.producto", "nombre precio imagen");

    return res.status(200).json({
      mensaje: "Producto agregado al carrito.",
      totalProductos: carritoCompleto.productos.length,
      subtotal: carritoCompleto.subtotal,
      total: carritoCompleto.total,
      datos: carritoCompleto,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al agregar producto al carrito.",
      problema: error.message,
    });
  }
};

// =====================================================
// 2. OBTENER CARRITO DEL USUARIO (GET)
// =====================================================

export const obtenerCarrito = async (req, res) => {
  try {
    const { usuario } = req.params;

    // Validar usuario existe
    const usuarioExiste = await userModel1.findById(usuario);
    if (!usuarioExiste) {
      return res.status(404).json({
        mensaje: "El usuario no existe.",
      });
    }

    // Buscar carrito
    const carrito = await carritoModel
      .findOne({ usuario })
      .populate("usuario", "nombre email")
      .populate("productos.producto", "nombre precio imagen stock");

    if (!carrito || carrito.productos.length === 0) {
      return res.status(200).json({
        mensaje: "Carrito vacío.",
        datos: null,
      });
    }

    return res.status(200).json({
      mensaje: "Carrito obtenido.",
      totalProductos: carrito.productos.length,
      subtotal: carrito.subtotal,
      total: carrito.total,
      datos: carrito,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener el carrito.",
      problema: error.message,
    });
  }
};

// =====================================================
// 3. ACTUALIZAR CANTIDAD DE PRODUCTO (PUT)
// =====================================================

export const actualizarCantidadProducto = async (req, res) => {
  try {
    const { usuario, producto } = req.params;
    const { cantidad } = req.body;

    // Validar cantidad
    if (!cantidad || cantidad <= 0) {
      return res.status(400).json({
        mensaje: "La cantidad debe ser mayor a cero.",
      });
    }

    // Buscar carrito
    const carrito = await carritoModel.findOne({ usuario });
    if (!carrito) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado.",
      });
    }

    // Buscar producto en carrito
    const indiceProducto = carrito.productos.findIndex(
      (item) => item.producto.toString() === producto
    );

    if (indiceProducto === -1) {
      return res.status(404).json({
        mensaje: "Producto no encontrado en el carrito.",
      });
    }

    // Validar stock
    const productoEncontrado = await productModel.findById(producto);
    if (productoEncontrado.stock < cantidad) {
      return res.status(400).json({
        mensaje: `Stock insuficiente. Disponible: ${productoEncontrado.stock}`,
        stockDisponible: productoEncontrado.stock,
      });
    }

    // Actualizar cantidad
    carrito.productos[indiceProducto].cantidad = cantidad;
    carrito.productos[indiceProducto].subtotal =
      cantidad * carrito.productos[indiceProducto].precioUnitario;

    // Recalcular total
    carrito.subtotal = carrito.productos.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    carrito.total = carrito.subtotal;

    await carrito.save();

    // Retornar carrito actualizado
    const carritoActualizado = await carritoModel
      .findById(carrito._id)
      .populate("usuario", "nombre email")
      .populate("productos.producto", "nombre precio imagen");

    return res.status(200).json({
      mensaje: "Cantidad actualizada.",
      subtotal: carritoActualizado.subtotal,
      total: carritoActualizado.total,
      datos: carritoActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al actualizar cantidad.",
      problema: error.message,
    });
  }
};

// =====================================================
// 4. ELIMINAR PRODUCTO DEL CARRITO (DELETE)
// =====================================================

export const eliminarProductoCarrito = async (req, res) => {
  try {
    const { usuario, producto } = req.params;

    // Buscar carrito
    const carrito = await carritoModel.findOne({ usuario });
    if (!carrito) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado.",
      });
    }

    // Buscar producto en carrito
    const indiceProducto = carrito.productos.findIndex(
      (item) => item.producto.toString() === producto
    );

    if (indiceProducto === -1) {
      return res.status(404).json({
        mensaje: "Producto no encontrado en el carrito.",
      });
    }

    // Eliminar producto
    carrito.productos.splice(indiceProducto, 1);

    // Recalcular totales
    carrito.subtotal = carrito.productos.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    carrito.total = carrito.subtotal;

    await carrito.save();

    // Si carrito está vacío, podría eliminarse (opcional)
    if (carrito.productos.length === 0) {
      await carritoModel.deleteOne({ _id: carrito._id });
      return res.status(200).json({
        mensaje: "Producto eliminado. Carrito vacío.",
        datos: null,
      });
    }

    // Retornar carrito actualizado
    const carritoActualizado = await carritoModel
      .findById(carrito._id)
      .populate("usuario", "nombre email")
      .populate("productos.producto", "nombre precio imagen");

    return res.status(200).json({
      mensaje: "Producto eliminado del carrito.",
      subtotal: carritoActualizado.subtotal,
      total: carritoActualizado.total,
      datos: carritoActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al eliminar producto.",
      problema: error.message,
    });
  }
};

// =====================================================
// 5. VACIAR CARRITO (DELETE)
// =====================================================

export const vaciarCarrito = async (req, res) => {
  try {
    const { usuario } = req.params;

    // Buscar carrito
    const carrito = await carritoModel.findOne({ usuario });
    if (!carrito) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado.",
      });
    }

    // Vaciar
    carrito.productos = [];
    carrito.subtotal = 0;
    carrito.total = 0;

    await carrito.save();

    return res.status(200).json({
      mensaje: "Carrito vaciado correctamente.",
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al vaciar carrito.",
      problema: error.message,
    });
  }
};

// =====================================================
// 6. REALIZAR COMPRA - CREAR PEDIDO + DETALLES (POST)
// =====================================================

export const realizarCompra = async (req, res) => {
  try {
    const { usuario, direccion, telefono, notas } = req.body;

    // ====== VALIDACIONES ======
    if (!usuario || !direccion) {
      return res.status(400).json({
        mensaje: "Usuario y dirección son obligatorios.",
      });
    }

    // Validar usuario existe
    const usuarioExiste = await userModel1.findById(usuario);
    if (!usuarioExiste) {
      return res.status(404).json({
        mensaje: "El usuario no existe.",
      });
    }

    // Buscar carrito
    const carrito = await carritoModel
      .findOne({ usuario })
      .populate("productos.producto");

    if (!carrito || carrito.productos.length === 0) {
      return res.status(400).json({
        mensaje: "El carrito está vacío. No se puede realizar la compra.",
      });
    }

    // ====== VALIDAR STOCK (verificación final) ======
    for (let item of carrito.productos) {
      const producto = await productModel.findById(item.producto._id);
      if (!producto) {
        return res.status(404).json({
          mensaje: `Producto ${item.producto.nombre} no encontrado.`,
        });
      }
      if (producto.stock < item.cantidad) {
        return res.status(400).json({
          mensaje: `Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}`,
        });
      }
    }

    // ====== CREAR PEDIDO ======
    const nuevoPedido = await pedidoModel.create({
      usuario,
      total: carrito.total,
      subtotal: carrito.subtotal,
      direccion,
      telefono,
      notas,
      estado: "Pendiente",
      detalles: [],
    });

    // ====== CREAR DETALLES DE PEDIDO Y ACTUALIZAR STOCK ======
    const detallesCreados = [];

    for (let item of carrito.productos) {
      // Crear detalle pedido
      const nuevoDetalle = await detallePedidoModel.create({
        pedido: nuevoPedido._id,
        producto: item.producto._id,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        precioTotal: item.subtotal,
        notas: notas || "",
      });

      detallesCreados.push(nuevoDetalle._id);

      // Actualizar stock del producto
      await productModel.findByIdAndUpdate(
        item.producto._id,
        { $inc: { stock: -item.cantidad } },
        { new: true }
      );
    }

    // ====== AGREGAR DETALLES AL PEDIDO ======
    nuevoPedido.detalles = detallesCreados;
    await nuevoPedido.save();

    // ====== VACIAR CARRITO ======
    await carritoModel.deleteOne({ _id: carrito._id });

    // ====== RESPONDER CON PEDIDO COMPLETO ======
    const pedidoCompleto = await pedidoModel
      .findById(nuevoPedido._id)
      .populate("usuario", "nombre" email")
      .populate({
        path: "detalles",
        populate: {
          path: "producto",
          select: "nombre precio imagen",
        },
      });

    return res.status(201).json({
      mensaje: "Compra realizada exitosamente.",
      pedidoId: nuevoPedido._id,
      estado: nuevoPedido.estado,
      total: nuevoPedido.total,
      numerArticulos: carrito.productos.length,
      datos: pedidoCompleto,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al realizar la compra.",
      problema: error.message,
    });
  }
};

// =====================================================
// 7. OBTENER DETALLES DEL CARRITO (para mostrar resumen antes de comprar)
// =====================================================

export const resumenCarrito = async (req, res) => {
  try {
    const { usuario } = req.params;

    const carrito = await carritoModel
      .findOne({ usuario })
      .populate({
        path: "productos.producto",
        select: "nombre precio imagen stock",
      })
      .populate("usuario", "nombre email");

    if (!carrito || carrito.productos.length === 0) {
      return res.status(200).json({
        mensaje: "Carrito vacío.",
        resumen: {
          totalProductos: 0,
          subtotal: 0,
          impuestos: 0,
          total: 0,
        },
      });
    }

    // Calcular impuestos (IVA 19% - ajustar según tu país)
    const impuestos = carrito.subtotal * 0.19;
    const totalConImpuestos = carrito.subtotal + impuestos;

    return res.status(200).json({
      mensaje: "Resumen del carrito obtenido.",
      resumen: {
        totalProductos: carrito.productos.length,
        subtotal: carrito.subtotal,
        impuestos: impuestos.toFixed(2),
        total: totalConImpuestos.toFixed(2),
        productos: carrito.productos,
      },
      datos: carrito,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener resumen.",
      problema: error.message,
    });
  }
};
