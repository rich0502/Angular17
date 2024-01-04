import { Component } from '@angular/core';
import {AppStateProductService} from "../services/app-state-product.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-app-errors',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './app-errors.component.html',
  styleUrl: './app-errors.component.css'
})
export class AppErrorsComponent {
constructor(public appState : AppStateProductService) {
}
}
