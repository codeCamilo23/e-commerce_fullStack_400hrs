import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Login as loginService } from '../../services/login';
import { Credentials } from '../../interfaces/credentials';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],

  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  //1. inyectamos el servicio de login
  
  private loginService = inject(loginService);
  correo = '';
  password = '';

  iniciarSesion() {
    console.log('1. se ejecuto iniciarsesion ()')
    const credenciales:Credentials = {
      correo: this.correo,
      password: this.password,
    };

    console.log('Credenciales:', credenciales);

    this.loginService.iniciarSesion(credenciales).subscribe({
      next: (respuesta:any) => {
        console.log('Login exitoso:', respuesta);
        // Guardamos el token recibido del backend 
          this.loginService.guardarToken(respuesta.token);
           console.log('Token guardado:', this.loginService.obtenerToken());
      },

      error: (error) => {
        console.error('Error en el login:', error);
      },
    });
  }
}
