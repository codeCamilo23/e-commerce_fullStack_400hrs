import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Forms } from './pages/forms/forms';
import { NotFound} from './pages/not-found/not-found';
import { Services } from "./pages/services/services";


import { Component } from '@angular/core';

export const routes: Routes = [

   {path:'',component:Home, title:"inicio app"},
   {path: 'products',component:Products,title:"Productos"},
   {path:'forms',component:Forms,title:"Formularios"},
   {path:'services',component:Services, title:"Servicios"},
   {path:'**',component:NotFound,title:"pagina no encontrada"}

];
