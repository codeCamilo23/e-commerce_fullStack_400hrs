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
    stock:{
        type:Number,
        required:true,
        default:0
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
      default: 0,
    },
    disponible: {
      type: Boolean,
      
    },
    
  },
  {
    timestamps: true,
  }
);

export const productModel = mongoose.model('Producto',productoSchema);
