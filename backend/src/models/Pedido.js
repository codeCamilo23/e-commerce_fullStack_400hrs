import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    estado: {
      type: String,
      enum: [
        "Pendiente",
        "Pagado",
        "Enviado",
        "Entregado",
        "Cancelado",
      ],
      default: "Pendiente",
    },
    total: {
      type: Number,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pedido", pedidoSchema);