import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "./product/product.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

export const routes: Routes = [
  {path : "home", component : HomeComponent},
  {path : "products", component : ProductComponent},
  {path : "newProduct", component : NewProductComponent},
  {path : "editProduct/:id", component : EditProductComponent},

];
