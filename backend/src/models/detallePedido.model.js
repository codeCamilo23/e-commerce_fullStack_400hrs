import mongoose from "mongoose";
import { type } from "node:os";

const detallePedidoSchema = new mongoose.Schema({
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pedido",
    required: true,
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  precioUnitario: {
    type: Number,
    required: true,
  },
  precioTotal: {
    type: Number,
    required: true,
  },
  notas:{
    type: String,
    required: true,
  },

});

export default mongoose.model("DetallePedido", detallePedidoSchema);
