import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
      imagen: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("categoria", categoriaSchema);