import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Product } from '../interfaces/products';
import { environment } from '../../environments/environment';
@Service()
export class Products {
  //1.inyectar dependencias
  _http = inject(HttpClient);

  //2. ruta de conexion con el backend
  // esta es la ruta que declaramos  en el backend
  //es la ruta general para acceder a los productos
  URL_PRODUCTOS = environment.apiUrl + '/productos';

  //3. implementr las peticiones al backenf

  //peticion post backend

  //1-creo la variable
  crearProducto(producto: Product) {
    return this._http.post(this.URL_PRODUCTOS + '/crear',producto);
  }
  //peticion get
  //peticion get no recibe parametros solo hace consultas
  mostrarProducto() {
    return this._http.get(this.URL_PRODUCTOS + '/mostrar');
  }
  
  //peticion put
  //necesito un id para editar y mostrar
  //para editar le tengo que decir que voy a editar
  editarProducto(id:string , productoactualizado:Product) {
    return this._http.put(this.URL_PRODUCTOS  + '/actualizar' + id, productoactualizado);
  }

  //peticion delete
  //para eliminar lo unico que necesito es la ruta y el id
  eliminarProducto(id:string) {
    return this._http.delete(this.URL_PRODUCTOS+  '/eliminar'  + id);

  }
}
