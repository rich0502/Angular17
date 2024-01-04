import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
    public productForm!: FormGroup;

    constructor(private fb : FormBuilder, private productService : ProductService) {
    }

  ngOnInit(): void {
      this.productForm = this.fb.group({
        name : this.fb.control('', [Validators.required]),
        price : this.fb.control(0),
        checked : this.fb.control(false)
      })
  }


  saveProduit() {
    let product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({
      next: data => {
        alert(JSON.stringify(data));
      }, error : err => {
        console.log(err);
      }
    });
  }
}
