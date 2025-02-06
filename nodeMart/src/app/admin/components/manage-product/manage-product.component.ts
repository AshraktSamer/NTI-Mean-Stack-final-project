import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from '../../services/productService';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product, ProductResponse } from '../../../models/productsModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-product',
  imports: [ReactiveFormsModule , CommonModule],
templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.scss'
})
export class ManageProductComponent {
  @Input() productData: Product | null = null;
  @Output() onCloseModel = new EventEmitter();


  productForm!: FormGroup
  constructor(private http : HttpClient,
              private productService: ProductsService,
              private formBuilder: FormBuilder,
  ){
    this.productForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      subCategory: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      isBestSeller: new FormControl('', [Validators.required]),

    });
  }


  onSubmit() {
    if (this.productForm.valid) {
      if (this.productData && this.productData._id) { 
        const updatedProduct: Product = {
          ...this.productData, 
          ...this.productForm.value 
        };
        this.productService.updateProduct(updatedProduct ,this.productData._id )
        .subscribe({
            next: (response: ProductResponse<Product>) => {
              console.log(response)
              this.resetProductForm();

            },
          });
      } else {
        this.productService.postNewProduct(this.productForm.value).subscribe({
          next: (response: ProductResponse<Product>) => {
            console.log(response)
            this.resetProductForm();
          },
        });
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }
  
  resetProductForm() {
    this.productForm.reset();
  }

  onClose() {
    this.onCloseModel.emit(false);
  }


}
