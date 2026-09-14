import { CurrencyPipe } from '@angular/common';

import { Component, input } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  producto = input.required<Product>();
  agregar(): void {
    console.log('Producto agregado', this.producto());
  }
}
