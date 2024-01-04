import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {AppStateProductService} from "../services/app-state-product.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    FormsModule,
    NgClass,
    DashboardComponent,
    NgIf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  pagesArray: number[] = [];

  constructor(private productService: ProductService, private router : Router,
              public appStateProduct : AppStateProductService) {
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts(){
    this.appStateProduct.setStateProduct({status:"LOADING"});
    this.productService.searchProducts(this.appStateProduct.stateProduct.keyword,
      this.appStateProduct.stateProduct.currentPage,
      this.appStateProduct.stateProduct.pageSize).subscribe({
      next: (resp) => {
        let products = resp.body as Product[];
        let totalProducts : number = parseInt(resp.headers.get('x-total-count')!);
        let totalPages = Math.floor(totalProducts / this.appStateProduct.stateProduct.pageSize);
        if(totalProducts%this.appStateProduct.stateProduct.pageSize != 0){
          ++totalPages;
        }
        this.appStateProduct.setStateProduct({products : products, totalPages : totalPages, status:"LOADED"});
        this.pagesArray = Array.from({ length: this.appStateProduct.stateProduct.totalPages }, (_, index) => index + 1);
        },
      error: err => {
        this.appStateProduct.setStateProduct({
          status:"ERROR",
          errorMessage: err
        })
      }
    });
  }

  handleCheckProduct(product: Product) {
    if(product.checked){
      --this.appStateProduct.stateProduct.checked
    }else {
      ++this.appStateProduct.stateProduct.checked;
    }
    this.productService.checkProduct(product).subscribe({
      next: updateProduct => {
        product.checked = !product.checked;
      }
    });
  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sûre de bien supprimer"))
  this.productService.deleteProduct(product).subscribe({
    next: data => {

      --this.appStateProduct.stateProduct.total;
      if(product.checked)
        --this.appStateProduct.stateProduct.checked
      this.appStateProduct.stateProduct.products = this.appStateProduct.stateProduct.products.filter((p:any) => p.id != product.id);
    }
    });
    this.searchProducts();
  }

  handleGoToPage(page: number) {
    this.appStateProduct.setStateProduct({currentPage : page});
      this.searchProducts();
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
