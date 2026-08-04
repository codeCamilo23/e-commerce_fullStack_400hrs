import carritoModel from "../models/Carrito.model.js";
import productModel from"../models/product.model.js";
import userModel1 from "../models/users.model.js";

//agregar un producto en el carrito
//para eso uno findOne/populate()



//agregar producto al carrito 
export const addProcuctCarrito = async(req,res)=>{
    try{
        const {
            usuario , 
            producto,
            cantidad }=req.body;

            //validar cantidad
            if (cantidad<=0){return res.status(400).json({
                mensaje: "la cantidad debe ser mayor de cero."
            })
            }
            //2.Verifico si el usuario existe
            const usuarioExiste =await userModel1.findById(usuario);
            if (!usuarioExiste){
                return res.status(404).json({
                    mensaje:"el usuario no existe"
                });
            }

            //2.buscar el carrito del ususario
            let carrito =await CarritoModel.findOne({usuario});
            //3. si el carrito no existe 
            // crearlo automatixamente
            if (!carrito){
                    carrito=new carritoModel({
                    usuario,
                    productos : [],
                    total:0
                });
            }
            //4. buscar el producto
           
            const  productoEncontrado=await productModel.findById(producto);
            if (!productoEncontrado){
                 return res.status(404).json({
                    mensaje:"producto no encontrado"
                });
            }
         //5.validar stock
         if (productoEncontrado.stock < cantidad){
                return res.status(400).json({
                mensaje: "No hay suficiente stock."
            });        
         }
         //6.buscar si ya existe el carrito
         const indiceProducto = carrito.productos.findIndex(
            item => item.producto.toString()===producto
         )
         if (indiceProducto >=0){
            carrito.productos[indiceProducto].cantidad+=cantidad;
            carrito.productos[indiceProducto].subtotal=
            carrito.productos[indiceProducto].cantidad * 
            carrito.productos[indiceProducto].precioUnitario;   
            
         }
         else{
            carrito.productos.push({
                producto,
                cantidad,
                precioUnitario:productoEncontrado.precio*cantidad
            })
         }

         //7. recalcular el total del carrito
         carrito.total=carrito.productos.reduce(
            (total,item)=>total + item.subtotal,
            0

         );
         //8. guardar
         await carrito.save();

         //9. mostrar info completa del carrito
         const carritoCompleto =await carritoModel.findById(carrito._id)
         .populate("usuario")
         .populate ("productos.producto");
         return res (200).json({
            mensaje: "producto agregado al carrito",
            totalProductos: carritoCompleto.productos.length,
            totalCompra: carritoCompleto.total,
            datos: carritoCompleto
         });
        
        
        
}




    catch (error) {
        return res.status(400).json({
        mensaje: "Error al agregar producto al carrito.",
        problema: error.message
        });

    }

}
    

export const showCarrito = async(req,res)=>{
    
    
    try{

    }catch(){

    }
}

export const addProcuctCarrito = async(req,res)=>{
    //desestructuracion 

    const { producto,
            cantidad
    }=  req.body;
    const productoEncontrado=await productModel.findById(producto);
}

export const updateCantidadProducto=async(req,res)=>{

}

export const deleteProductoCarrito = async(req,res)=>{

}

export const vaciarCarrito =async (req,res)=>{

}