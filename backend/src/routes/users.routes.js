import  {createUser} from "../controllers/usuario.controller.js";
import {showUsers} from "../controllers/usuario.controller.js";
import {loginUser} from "../controllers/usuario.controller.js";
import { deleteModel } from "mongoose";

import express from "express";

export const usuarioRouter = express.Router();
usuarioRouter.post("/registrar",createUser);
usuarioRouter.get("/mostrar",showUsers);
usuarioRouter.post("/iniciar-sesion",loginUser);