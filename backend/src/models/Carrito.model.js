import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
        },
        cantidad: {
          type: Number,
          default: 1,
        },
        precio:{
          type:Number,
          default:1
        }
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("carrito", carritoSchema);