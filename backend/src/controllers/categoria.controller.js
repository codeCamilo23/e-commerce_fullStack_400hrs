import { categoriaModel } from "../models/Categoria.model.js";

//POST -  crear categoria
export const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const categoriaExistente = await categoriaModel.findOne({ nombre });

    if (categoriaExistente) {
      return res.status(400).json({
        mensaje: "La categoría ya existe",
      });
    }

    const newCategoria = await categoriaModel.create({
      nombre,
      descripcion,
    });

    return res.status(201).json({
      mensaje: "Categoría creada correctamente",
      datos: newCategoria,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al crear la categoría",
      problema: error.message || error,
    });
  }
};

//mostrar categorias ---> peticion GET
export const showCategorias = async (req, res) => {
  try {
    const categorias = await categoriaModel.find();

    if (categorias.length === 0) {
      return res.status(200).json({
        mensaje: "No existen categorías registradas",
      });
    }

    return res.status(200).json({
      mensaje: "Categorías encontradas",
      cantidad: categorias.length,
      datos: categorias,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al mostrar categorías",
      problema: error.message || error,
    });
  }
};

// ---------------------------------------------
// Petición PUT -> Actualizar categoría
export const updateCategoriaById = async (req, res) => {
  try {
    const categoriaActualizada = await categoriaModel.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
        runValidators: true,
      },
    );

    if (!categoriaActualizada) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Categoría actualizada correctamente",
      datos: categoriaActualizada,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al actualizar la categoría",
      problema: error.message || error,
    });
  }
};

// ---------------------------------------------
// Petición DELETE -> Eliminar categoría
export const deleteCategoriaById = async (req, res) => {
  try {
    const categoriaEliminada = await categoriaModel.findByIdAndDelete(
      req.params.id,
    );

    if (!categoriaEliminada) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Categoría eliminada correctamente",
      datos: categoriaEliminada,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al eliminar la categoría",
      problema: error.message || error,
    });
  }
};
