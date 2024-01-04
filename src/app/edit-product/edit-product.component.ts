import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  public productFormUpdate!: FormGroup;
  productId! : number;
  constructor(private activatedRoute : ActivatedRoute,
              private fb : FormBuilder, private productService : ProductService,
              private router : Router) {
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productService.findById(this.productId).subscribe({
      next: product => {
        this.productFormUpdate = this.fb.group({
          id : this.fb.control(product.id),
          name : this.fb.control(product.name),
          price : this.fb.control(product.price),
          checked : this.fb.control(product.checked)
        })
      }
    });
  }


  editProduct() {
    let product = this.productFormUpdate.value;
    this.productService.updateProduct(product).subscribe({
      next: data => {
        alert(JSON.stringify(data));
      }
    });
    this.router.navigateByUrl(`/products`);
  }
}
