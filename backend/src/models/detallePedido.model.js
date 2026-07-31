import mongoose from "mongoose";

const detallePedidoSchema = new mongoose.Schema({
  pedido:  {
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
    required: true
  },
  notas:{
    type: String,
    triam:true,
    default: ""
    }
  
  
    {
    timestamps:true
  });

  detallePedidoSchema.index({
    pedido:1
  });



export default mongoose.model("DetallePedido", detallePedidoSchema);
