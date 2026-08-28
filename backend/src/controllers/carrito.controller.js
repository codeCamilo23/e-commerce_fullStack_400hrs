import { carritoModel } from "../models/Carrito.model.js";
import { productModel } from "../models/product.model.js";
import { userModel1 } from "../models/users.model.js";
import { detallePedidoModel } from "../models/detallePedido.model.js";
import { pedidoModel } from "../models/Pedido.model.js";

//agregar un producto en el carrito
//para eso uno findOne/populate()

//agregar producto al carrito
export const addProductCarrito = async (req, res) => {
  try {
    const { usuario, producto, cantidad } = req.body;

    //validar cantidad
    if (cantidad <= 0) {
      return res.status(400).json({
        mensaje: "la cantidad debe ser mayor de cero.",
      });
    }
    //2.Verifico si el usuario existe
    const usuarioExiste = await userModel1.findById(usuario);
    if (!usuarioExiste) {
      return res.status(404).json({
        mensaje: "el usuario no existe",
      });
    }

    //2.buscar el carrito del ususario
    let carrito = await carritoModel.findOne({ usuario });
    //3. si el carrito no existe
    // crearlo automatixamente
    if (!carrito) {
      carrito = new carritoModel({
        usuario,
        productos: [],
        total: 0,
      });
    }
    //4. buscar el producto

    const productoEncontrado = await productModel.findById(producto);
    if (!productoEncontrado) {
      return res.status(404).json({
        mensaje: "producto no encontrado",
      });
    }
    //5.validar stock
    if (productoEncontrado.stock < cantidad) {
      return res.status(400).json({
        mensaje: "No hay suficiente stock.",
      });
    }
    //6.buscar si ya existe el carrito
    const indiceProducto = carrito.productos.findIndex(
      (item) => item.producto.toString() === producto,
    );
    if (indiceProducto >= 0) {
      carrito.productos[indiceProducto].cantidad += cantidad;
      carrito.productos[indiceProducto].subtotal =
        carrito.productos[indiceProducto].cantidad *
        carrito.productos[indiceProducto].precioUnitario;
    } else {
      carrito.productos.push({
        producto,
        cantidad,
        precioUnitario: productoEncontrado.precio * cantidad,
      });
    }

    //7. recalcular el total del carrito
    carrito.total = carrito.productos.reduce(
      (total, item) => total + item.subtotal,
      0,
    );
    //8. guardar
    await carrito.save();

    //9. mostrar info completa del carrito
    const carritoCompleto = await carritoModel
      .findById(carrito._id)
      .populate("usuario")
      .populate("productos.producto");
    return res(200).json({
      mensaje: "producto agregado al carrito",
      totalProductos: carritoCompleto.productos.length,
      totalCompra: carritoCompleto.total,
      datos: carritoCompleto,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al agregar producto al carrito.",
      problema: error.message,
    });
  }
};

//mostrar carrito GET
export const showCarrito = async (req, res) => {
  try {
    const { usuario } = req.params;

    const carrito = await carritoModel
      .findOne({ usuario })
      .populate("usuario")
      .populate("productos.producto");
    if (!carrito) {
      return res.status(400).json({
        mensaje: "el carrito no existe",
      });
    }
    return res.status(200).json({
      mensaje: "carrito encontrado.",

      totalProductos: carrito.productos.length,
      totalCompra: carrito.total,
      datos: carrito,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al mostrar el carrito.",
      problema: error.message,
    });
  }
};

export const updateCantidadProducto = async (req, res) => {
  try {
    const { usuario, producto } = req.params;
    const { cantidad } = req.body;

    const carrito = await carritoModel.findOne({ usuario });

    if (!carrito) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado.",
      });
    }

    const item = carrito.productos.find(
      (p) => p.producto.toString() === producto,
    );

    if (!item) {
      return res.status(404).json({
        mensaje: "Producto no encontrado en el carrito.",
      });
    }

    item.cantidad = cantidad;

    item.subtotal = item.precioUnitario * cantidad;

    carrito.total = carrito.productos.reduce(
      (acumulado, item) => acumulado + item.subtotal,

      0,
    );

    await carrito.save();

    return res.status(200).json({
      mensaje: "Cantidad actualizada.",

      datos: carrito,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error.",

      problema: error.message,
    });
  }
};

export const deleteProductoCarrito = async (req, res) => {
  try {
    const { usuario, producto } = req.params;
    const carrito = await carritoModel.findOne({ usuario });
    if (!carrito) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado.",
      });
    }
    const indiceProducto = carrito.productos.findIndex(
      (item) => item.producto.toString() === producto,
    );
    if (indiceProducto === -1) {
      return res.status(404).json({
        mensaje: "Producto no existe en el carrito.",
      });
    }
    carrito.productos.splice(indiceProducto, 1);
    carrito.total = carrito.productos.reduce(
      (acumulado, item) => acumulado + item.subtotal,
      0,
    );
    await carrito.save();
    return res.status(200).json({
      mensaje: "Producto eliminado.",
      datos: carrito,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error.",

      problema: error.message,
    });
  }
};

export const vaciarCarrito = async (req, res) => {
  try {
    const { usuario } = req.params;
    const carrito = await carritoModel.findOne({ usuario });
    if (!carrito) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado.",
      });
    }
    carrito.productos = [];
    carrito.total = 0;
    await carrito.save();
    return res.status(200).json({
      mensaje: "Carrito vaciado correctamente.",
      datos: carrito,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al vaciar el carrito.",

      problema: error.message,
    });
  }
};

//checkout
export const confirmarCompra = async (req, res) => {
  try {
    const { usuario } = req.params;
    const carrito = await carritoModel
      .findOne({ usuario })
      .populate("productos.producto");
    //populate se usa para conocer la informacion del producto

    if (!carrito) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado",
      });
    }

    if (carrito.productos.length === 0) {
      return res.status(400).json({
        mensaje: "El carrito está vacío",
      });
    }
    //aqui comienza la compra
    //se crea el pedido
    const nuevoPedido = await pedidoModel.create({
      usuario,
      total: carrito.total,
      estado: "Pendiente",
    });
    //aqui solo existe el encabezado del pedido
    // se recorre el carrito y cada producto genera un registro

    for (const item of carrito.productos) {
      await detallePedidoModel.create({
        pedido: nuevoPedido._id,
        producto: item.producto._id,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        precioTotal: item.subtotal,
      });
      //al recorrer el carrito se disminuye el inventarios automaticamente
      // $inc --> incrementra o disminuye automaticamente

      await productModel.findByIdAndUpdate(item.producto._id, {
        $inc: {
          stock: -item.cantidad,
        },
      });
    }
    //vaciar el carrito
    carrito.productos = [];
    carrito.total = 0;
    await carrito.save();

    //Mostrar el pedido

    const pedidoCompleto = await pedidoModel
      .findById(nuevoPedido._id)
      .populate("usuario");
    return res.status(201).json({
      mensaje: "Compra realizada correctamente.",
      pedido: pedidoCompleto,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al confirmar compra.",
      problema: error.message,
    });
  }
};
