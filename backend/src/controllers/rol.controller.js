import {Rol} from "../models/rol.model.js";

//defino las funciones CRUD
//crear un nuevo rol
export const  createRol = async(req,res)=>{
    //manejo de errores
    try{
        const {nombre,descripcion}=req.body;
        //verificamos que se ingresen datos obligatorios
        if (!nombre){
            return res.status(400).json({
                message:"el nombre del rol es obligatorio"
            });
        }
        
        
        //validar si el rol ya existe
        const rolExistente= await Rol.findOne({
            nombre: nombre.trim()
        });
        if (rolExistente){
            return res.status(400).jason({
                message: "ese rol ya existe"
            })
        }
        const nuevoRol=await Rol.create({
            nombre,
            descripcion
        });
        return res.status(201).json({
            message: "rol creado exactamente.",
            datos: nuevoRol
        })

    }catch(error){
        return res.status(500).json({
            message:"error al crear el rol",
            error:error || error.message
        })


    }
}

//GET mostrar todos  roles.
export const showRoles= async(req,res)=>{
    try{
        const roles = await Rol.find();

        if (roles.length === 0) {

            return res.status(200).json({
                mensaje: "No existen roles registrados."
            });

        }

        return res.status(200).json({

            mensaje: "Roles encontrados.",

            cantidad: roles.length,

            datos: roles

        });

    } catch (error) {

        return res.status(500).json({

            mensaje: "Error al consultar los roles.",

            problema: error.message

        });

    }

};

// ===============================================
// GET -> Buscar rol por ID
// ===============================================


export const showRolById = async (req, res) => {

    try {

        const { id } = req.params;

        const rol = await Rol.findById(id);

        if (!rol) {

            return res.status(404).json({

                mensaje: "Rol no encontrado."

            });

        }

        return res.status(200).json({

            mensaje: "Rol encontrado.",

            datos: rol

        });

    } catch (error) {

        return res.status(500).json({

            mensaje: "Ocurrió un error.",

            problema: error.message

        });

    }

};
//actualizar roles PUT
export const updateRolById = async (req,res)=>{
    try{
        const {id}=req.params;
        const rolActualizado =await Rol.findByIdAndUpdate(
            id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        )
        
        
        if (!rolActualizado){
            return res.status(404).json({
                message:"rol no encontrado"
            })
        }
        return res.status(200).json({
            message:"rol actualizado correctamente.",
            datos: rolActualizado
        })
    }catch(error){
        return res.status(500).json({
            message:"error al actualizar el rol",
            problema: error.message
        })
    }
}

// ===============================================
// DELETE -> Eliminar rol
// ===============================================
export const deleteRolById = async (req, res) => {

    try {

        const { id } = req.params;

        const rolEliminado = await Rol.findByIdAndDelete(id);

        if (!rolEliminado) {

            return res.status(404).json({

                mensaje: "Rol no encontrado."

            });

        }

        return res.status(200).json({

            mensaje: "Rol eliminado correctamente.",

            datos: rolEliminado

        });

    } catch (error) {

        return res.status(500).json({

            mensaje: "Error al eliminar el rol.",

            problema: error.message

        });

    }

};