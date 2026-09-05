import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgClass } from "../../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    NgClass
],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {}
