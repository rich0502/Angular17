import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AppStateProductService} from "../services/app-state-product.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    RouterLink,
    NavbarComponent,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions : Array<any> = [
    {title : "Home", route: "/home", icon : "bi-house"},
    {title : "Products", route: "/products", icon : "bi-newspaper"},
    {title : "NewProduct", route: "/newProduct", icon : "bi-bag-plus-fill"}
  ]

  currentAction : any;

  constructor(public appState : AppStateProductService) {
  }

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
