import mongoose from "mongoose";

const detallePedidoSchema = new mongoose.Schema(
  {
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

    notas: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Índice para buscar rápidamente los detalles de un pedido
detallePedidoSchema.index({
  pedido: 1,
});

export const detallePedidoModel = mongoose.model(
  "detallepedido",
  detallePedidoSchema,
);
