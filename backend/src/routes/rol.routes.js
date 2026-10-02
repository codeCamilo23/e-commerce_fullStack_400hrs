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


// GET -> Mostrar un rol por actua como experto en CV con enfoque ATS. en mi expericia real (desarrollador junior en backend, con tecnologias en node.js , express mongoDB ) y esta vacante objetivo: (pegar oferta), redacta mis responsabilidades en primera persona, usando verbos en infinitivo, con enfoque en resultados, aplicando el metodo PAR . no investes informacion. entrega el resultado en bulletsactua como experto en CV con enfoque ATS. en mi expericia real (desarrollador junior en backend, con tecnologias en node.js , express mongoDB ) y esta vacante objetivo: (pegar oferta), redacta mis responsabilidades en primera persona, usando verbos en infinitivo, con enfoque en resultados, aplicando el metodo PAR . no investes informacion. entrega el resultado en bulletsactua como experto en CV con enfoque ATS. en mi expericia real (desarrollador junior en backend, con tecnologias en node.js , express mongoDB ) y esta vacante objetivo: (pegar oferta), redacta mis responsabilidades en primera persona, usando verbos en infinitivo, con enfoque en resultados, aplicando el metodo PAR . no investes informacion. entrega el resultado en bulletsactua como experto en CV con enfoque ATS. en mi expericia real (desarrollador junior en backend, con tecnologias en node.js , express mongoDB ) y esta vacante objetivo: (pegar oferta), redacta mis responsabilidades en primera persona, usando verbos en infinitivo, con enfoque en resultados, aplicando el metodo PAR . no investes informacion. entrega el resultado en bulletsactua como experto en CV con enfoque ATS. en mi expericia real (desarrollador junior en backend, con tecnologias en node.js , express mongoDB ) y esta vacante objetivo: (pegar oferta), redacta mis responsabilidades en primera persona, usando verbos en infinitivo, con enfoque en resultados, aplicando el metodo PAR . no investes informacion. entrega el resultado en bulletsD
rolRouter.get("/mostrar/:id", showRolById);


// PUT -> Actualizar un rol
rolRouter.put("/actualizar/:id", updateRolById);


// DELETE -> Eliminar un rol
rolRouter.delete("/eliminar/:id", deleteRolById);