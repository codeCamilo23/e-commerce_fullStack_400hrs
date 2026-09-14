import { Component } from '@angular/core';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { ProductsService } from '../../services/products';
import { Product } from '../../interfaces/product';
@Component({
  selector: 'app-products',
  imports: [FormsModule,CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products{ 
  //1. inyectar dependencias
  // 1. Inyectar el servicio con inject()
  private _productsService = inject(ProductsService);

  // 2. Estado local con signals
  productos = signal<Product[]>([]);
  cargando = signal(false);

  //2. definir las variables
// 3. Modelo simple para el formulario de creación
  nuevoProducto = {
    imagen: '',
    nombre: '',
    precio: 0,
    stock: 0
  };


  //3.implementacion
ngOnInit(): void {
    this.mostrarProductos();
  }

  // GET
  mostrarProductos() {
    this.cargando.set(true);

    this._productsService.mostrarProductos().subscribe({
      next: (data: any) => {
        this.productos.set(data.datos ?? []); // el back manda { mensaje, datos }
        this.cargando.set(false);
      },
      error: (err) => {
        this.cargando.set(false);
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'No se pudieron cargar los productos'
        });
      }
    });
  }

  // POST
  crearProducto() {
    this._productsService.crearProducto(this.nuevoProducto as Product).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Producto creado',
          timer: 1500,
          showConfirmButton: false
        });
        this.nuevoProducto = { imagen: '', nombre: '', precio: 0, stock: 0 };
        this.mostrarProductos(); // refrescar lista
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear el producto'
        });
      }
    });
  }

  // DELETE (con confirmación previa)
  eliminarProducto(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._productsService.eliminarProducto(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El producto fue eliminado', 'success');
            this.mostrarProductos();
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
          }
        });
      }
    });
  }
}





