import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
    precio: {
      type: Number,
      required: true,
    },
   
    imagen: {
      type: String,
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    cantidad: {
      type: Number,
      default: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Producto", productoSchema);