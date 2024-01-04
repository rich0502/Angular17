import {Component, OnInit} from '@angular/core';
import {AppStateProductService} from "../services/app-state-product.service";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(public appState : AppStateProductService, private serviceProduct : ProductService) {
  }

  totalData(){
    this.serviceProduct.getAll().subscribe({
      next: data => {
        this.appState.stateProduct.total = data.length;
        this.appState.stateProduct.checked = data.filter(p => p.checked).length;
      },
      error: err => console.log(err)
    });

  }

  ngOnInit(): void {
    this.totalData();
  }

}
