// ACÁ VA LA LÓGICA DE LOS CONTROLADORES PARA LAS PETICIONES HTTP PARA LOS USUARIOS
// Nos estaremos centrando en las peticiones POST Y GET

// 1. Importar dependencias y módulos que necesitemos
// Importar la dependenciade encriptación
import { userModel1 } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 2. Crearnos nuestras funciones asíncronas para cada petición


// --------------------------------------------------
// Petición POST -> Crear usuarios
export const createUser = async (req, res) => {
  // manejo de errores -> atrapar lo que pueda salir mal
  try {
    console.log(req.body);
    // Deestructuración -> nos va a permitir acceder a cada una de las variables suministradas por el usuario en el req.body
    const {nombreCompleto, correo, password,rol} = req.body;

    // password = sancocho;

    // vamos a encriptar la contraseña
    // .hash -> método para encriptar contraseña
    // 2 parámetros, 1. contraseña a encriptar
    //               2. # que determina cuán segura es la contraseña encriptada -> 8-10
    const codedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel1.create({
        nombreCompleto,
        correo,
        password:codedPassword,
        rol,
    });

    // 201-> se creó correctamente
    return res.status(201).json({
        mensaje: 'Usuario creado correctamente',
        datos: newUser
    });

  } catch (error) {
    return res.status(400).json({
        mensaje: 'Ocurrió un error al crear un usuario',
        problema: error || error.message
    });
  }
};



// -----------------------------------------------

// Petición GET -> Mostrar todos los usuarios
export const showUsers = async (req, res) => {
  // manejo de errores -> atrapar lo que pueda salir mal
  try {
    // Encontrar TODOS los usuarios
    let users = await userModel1.find().populate("rol");
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


// Petición POST -> Inicio de sesión (Login)
export const loginUser = async (req, res) => {
  // manejo de errores -> atrapar lo que pueda salir mal
  try {
    // Destructuración -> obtenemos las credenciales que envía el usuario
    const { correo, password } = req.body;
 
    // Validación -> verificamos que lleguen las credenciales
    if (!correo || !password) {
      return res.status(400).json({
        mensaje: "Debes proporcionar el correo y la contraseña",
      });
    }
 
    // 1. Buscamos al usuario por su correo
    const user = await userModel1.findOne({ correo });
 
    // Si no existe el usuario -> credenciales inválidas
    // (usamos un mensaje genérico para no revelar si el correo existe o no)
    if (!user) {
      return res.status(401).json({
        mensaje: "Credenciales inválidas",
      });
    }
 
    // 2. Comparamos la contraseña enviada con la contraseña encriptada almacenada
    // .compare -> devuelve true si coinciden, false si no
    const passwordValido = await bcrypt.compare(password, user.password);
 
    if (!passwordValido) {
      return res.status(401).json({
        mensaje: "Credenciales inválidas",
      });
    }
 
    // 3. Generamos el token (JWT) con la información que queremos guardar en él (payload)
    const token = jwt.sign(
      {
        id: user._id,
        email: user.correo,
      },
      process.env.JWT_SECRET, // clave secreta guardada en las variables de entorno (.env)
      { expiresIn: "1h" } // el token expira en 1 hora
    );
 
    // 4. Respondemos con el token y los datos básicos del usuario
    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al iniciar sesión",
      problema: error.message || error,
    });
  }
};


//peticion DELETE  --> eliminar usuarios
// --------------------------------------------------
// Petición DELETE -> Eliminar usuario por ID
export const deleteUserById = async (req, res) => {

    // Manejo de errores
    try {

        // Obtener el ID enviado por la URL
        const idForDelete = req.params.id;

        // Buscar el usuario y eliminarlo
        const deletedUser = await userModel1.findByIdAndDelete(idForDelete);

        // Validar si el usuario existe
        if (!deletedUser) {
            return res.status(404).json({
                mensaje: "No se encontró el usuario para eliminar"
            });
        }

        // Respuesta exitosa
        return res.status(200).json({
            mensaje: "Usuario eliminado correctamente",
            datos: deletedUser
        });

    } catch (error) {

        return res.status(400).json({
            mensaje: "Ocurrió un error al eliminar el usuario",
            problema: error.message || error
        });

    }

};