import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  nuevoUsuario = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    terminos: false,
    promociones: false,
  };

  // 2. Mostrar / ocultar contraseña
  mostrarPassword = false;
  mostrarConfirmPassword = false;

  // 3. Crear usuario
  registrarUsuario() {
    console.log('Datos del formulario:', this.nuevoUsuario);

    // Por ahora solamente comprobamos
    // que las contraseñas sean iguales

    if (this.nuevoUsuario.password !== this.nuevoUsuario.confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    // Aquí posteriormente conectaremos
    // el usuario con usuarioService

    console.log('Usuario listo para registrarse');
  }
}
