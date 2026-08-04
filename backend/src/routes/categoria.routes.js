import {createCategoria} from "../controllers/categoria.controller.js";

import { showCategorias } from "../controllers/categoria.controller.js";

import{updateCategoriaById }from "../controllers/categoria.controller.js";

import { deleteCategoriaById} from "../controllers/categoria.controller.js";
import express from "express";

export const categoriaRouter=express.Router();

categoriaRouter.post("/crear",createCategoria);

categoriaRouter.get("/mostrar",showCategorias);

categoriaRouter.put("/actualizar/:id",updateCategoriaById);

categoriaRouter.delete("/eliminar/:id",deleteCategoriaById);

