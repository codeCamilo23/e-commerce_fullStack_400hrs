import mongoose from "mongoose"

const {Schema,model}=mongoose;

const userSchema = new Schema({

    nombreCompleto:{
        type:String,
        required:true
    },

    correo:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    rol:{
        
        type: mongoose.Schema.Types.ObjectId,
        ref:"Rol",
        required:true
        
    }

},{
    timestamps:true
})

export const userModel1=mongoose.model("Usuario",userSchema)