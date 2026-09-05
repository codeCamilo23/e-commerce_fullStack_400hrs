//implementatr logica en cualquier parte del rpoyecto en angular
//consumi los servicios de un backend

import { inject, Service } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';
@Service()
export class Users {
  //1. inyectar dependencias
  _http = inject(HttpClient);

  //2. ruta de conexion al backend
  //se recomienda crear la vriables
  URL_USUARIOS = environment.apiUrl + '/usuarios';

  //3. implementar las peticiones al backend
  //3.1
  mostrarUsuarios() {
    return this._http.get(this.URL_USUARIOS + '/mostrar');
  }

  registrarUsuario(user: Users) {
    return this._http.post(this.URL_USUARIOS + '/registrar', user);
  }
}
