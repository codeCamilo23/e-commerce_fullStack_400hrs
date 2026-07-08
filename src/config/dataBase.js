import mongoose from "mongoose";
//importar es traer
//export es mandar

//establecer la conexion con la base de datos
//para ello se crea una funcion asincronica

export async function conectionMongo(params) {
    try{
        await mongoose.connect(process.env.URI_MONGO);
          

    }catch(error){
        console.log("error al conectar con la base de datos", error);

    }
}