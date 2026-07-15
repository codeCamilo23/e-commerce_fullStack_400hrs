import mongoose from "mongoose";

const detallePedidoSchema = new mongoose.Schema({
  pedidoNo
  
  : {
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
  iva:{
    type:number,
    required: true,
  },

});

export default mongoose.model("DetallePedido", detallePedidoSchema);
