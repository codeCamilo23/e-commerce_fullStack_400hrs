import { Component,OnInit,signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito  implements OnInit{


productos = signal<Product[]>([]);

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito() {
    const carrito = localStorage.getItem('productos-en-carrito');

    if (carrito) {
      this.productos.set(JSON.parse(carrito));
    }
  }

  guardarCarrito() {
    localStorage.setItem(
      'productos-en-carrito',
      JSON.stringify(this.productos())
    );
  }

  aumentarCantidad(producto: Product) {
    producto.cantidad++;
    this.guardarCarrito();
  }

  disminuirCantidad(producto: Product) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.guardarCarrito();
    }
  }

  eliminarProducto(id: string) {
    const productosActualizados = this.productos().filter(
      producto => producto._id !== id
    );

    this.productos.set(productosActualizados);

    this.guardarCarrito();
  }

  vaciarCarrito() {
    this.productos.set([]);
    localStorage.removeItem('productos-en-carrito');
  }

  calcularSubtotal(producto: Product): number {
    return producto.precio * producto.cantidad;
  }

  calcularTotal(): number {
    return this.productos().reduce(
      (total, producto) =>
        total + producto.precio * producto.cantidad,
      0
    );
  }
}
