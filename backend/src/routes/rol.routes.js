import {createRol,
        showRoles,
        showRolById,
        updateRolById,
        deleteRol,
        deleteRolById
} from "../controllers/rol.controller.js";
export const rolRouter =express.Router();


// POST -> Crear un rol
rolRouter.post("/crear", createRol);


// GET -> Mostrar todos los roles
rolRouter.get("/mostrar", showRoles);


// GET -> Mostrar un rol por ID
rolRouter.get("/mostrar/:id", showRolById);


// PUT -> Actualizar un rol
rolRouter.put("/actualizar/:id", updateRolById);


// DELETE -> Eliminar un rol
rolRouter.delete("/eliminar/:id", deleteRolById);