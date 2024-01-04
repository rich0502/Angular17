import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root' //remonter sur la racine donc on peut appeler dans tout le module
})
//grace à la service on peut partage les données
export class ProductService {

  private host : string = "http://localhost:8888";

  constructor(private http : HttpClient) { }

  public searchProducts(keyword: string, page: number, size: number){
    return this.http.get(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'});
  }

  public checkProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(`${this.host}/products/${product.id}`,
      {checked:!product.checked});
  }

  public deleteProduct(product: Product){
    return this.http.delete<any>(`${this.host}/products/${product.id}`);
  }

  saveProduct(product: Product) {
    return this.http.post<Product>(`${this.host}/products`, product);
  }

  findById(productId: number) {
    return this.http.get<Product>(`${this.host}/products/${productId}`);
  }

  updateProduct(product: Product) {
    return this.http.put(`${this.host}/products/${product.id}`, product);
  }

  getAll() {
    return this.http.get<Array<Product>>(`${this.host}/products`);
  }
}
