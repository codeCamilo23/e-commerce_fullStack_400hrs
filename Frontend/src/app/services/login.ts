import { Service } from '@angular/core';
import { Credentials } from '../interfaces/credentials';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Service()
export class Login {
    _http=inject(HttpClient);
    URL_LOGIN =environment.apiUrl+ '/usuarios/inicial-sesion';

    //logica de inicio de sesion

    //1. LOGIN --peticion post
    //creamos la funcion inicar sesison: para inicar sesion necesito enviar las credenciales
    //en inicar sesion mandamos la informacion =POST
    inciarSesion(credenciales:Credentials){
        return this._http.post(this.URL_LOGIN,credenciales);
    }

    //2. guardar el token en el localstorage
    //se debe crear un metodo para todo
    guardarToken(token:string){localStorage.setItem('id_user',token);

    }
     
    //3.obtener el token en localstorage
    obtenerToken(){
        return localStorage.getItem('id_user')
    }

    //4.logout -- eliminar el token del localstorage
    cerrarSesion(){
        localStorage.removeItem('id_user');

    }

    //5.validar si el usuario esta logeado
    estaLogeado():{
       crearProducto(producto: Product) {
           return this._http.post(this.URL_PRODUCTOS + '/crear',producto);
         }