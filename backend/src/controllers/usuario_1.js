import {userModel1} from "../models/users.modell.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"




//peticion POST --> crear usuarios con contraseña encriptada


export async function crearUsuario(req,res){


    try{
//deseestructuramos los datos del body
        const {nombreCompleto,correo,password,rol}=req.body;
        const codedPassword=await bcrypt.hash(password,6);

        const newUser=await userModel1.create({
            nombreCompleto,
            correo,
            password: codedPassword,
            rol

        })
        return Response.status(200).json({
            message:"usuario registrado correctament"

        })


    }catch(error){
        return Response.status(500).json({
         message:"error al registarr el usuario, intentelo de nuevo",
            error: error || error.message,
            problema: error || error.message
        })
    }
}




// peticion GET --> obtener usuario


// Petición GET -> Mostrar todos los usuarios
export const showUsers = async (req, res) => {
  // manejo de errores -> atrapar lo que pueda salir mal
  try {
    // Encontrar TODOS los usuarios
    let users = await userModel.find();
    // validación si no se encuentran usuarios almacenados
    if(users.length === 0){
        return res.status(200).json({
            mensaje: 'No hay usuarios almacenados'
        })
    }

    return res.status(200).json({
        menasaje: 'Se encontraron usuarios almacenados',
        numeroUsuarios: users.length,
        datos: users
    })

  } catch (error) {
    return res.status(400).json({
        mensaje: 'Ocurrió un error al mostrar los usuarios',
        problema: error || error.message
    });
  }
};




//peticion POSt --> hacer un inicio de sesion con Validacion de contraseña



