import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Forms } from './pages/forms/forms';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';
import { Carrito } from './pages/carrito/carrito';
import {Registro} from './pages/registro/registro';


export const routes: Routes = [
  { path: '', component: Home, title: 'inicio app' },
  { path: 'products', component: Products, title: 'Productos' },
  { path: 'forms', component: Forms, title: 'Formularios' },

  { path: 'carrito', component: Carrito, title: 'Carrito' },
  { path: 'login', component: Login, title: 'Iniciar sesion' },
   {path: 'registro', component: Registro, title:'registro de usuario'},
  { path: '**', component: NotFound, title: 'pagina no encontrada' },
];

