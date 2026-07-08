const usuarioSchema = new Schema({

    nombre:{
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
        type:String,
        enum:["cliente","administrador"],
        default:"cliente"
    }

},{
    timestamps:true
})