import { Component } from '@angular/core';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { ProductCard } from '../../components/product-card/product-card';


@Component({
  selector: 'app-products',
  imports: [NavBar],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products{ 
}


