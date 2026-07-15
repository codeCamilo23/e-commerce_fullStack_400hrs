import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema(
  {
    pedido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pedido",
      required: true,
    },
    metodoPago: {
      type: String,
      enum: ["Nequi", "Daviplata", "PSE", "Tarjeta", "Efectivo"],
      required: true,
    },
    estado: {
      type: String,
      enum: ["Pendiente", "Aprobado", "Rechazado"],
      default: "Pendiente",
    },
    valor: {
      type: Number,
      required: true,
    },
    fechaPago: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pago", pagoSchema);