import { Component } from '@angular/core';
import { ProductsService } from '../../services/productService';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductPostResponse, ProductResponse } from '../../models/productsModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  imports: [CommonModule ,FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  updatedProduct!: Product
  productID: number = 0

  constructor(private productService : ProductsService,
              private router : Router,
              private route : ActivatedRoute
              
  ){
    this.route.params.subscribe(params => {
      this.productID = +params['id'];
      this.loadProduct();
    });
  }







  

 // product.component.ts

loadProduct(): void {
  this.productService.getProductByID(this.productID).subscribe({
    next: (response: ProductPostResponse) => {
      this.updatedProduct = response.Data;  // Assign the single product from the Data field
    },
    error: (error) => {
      console.error('Error loading product', error);
      // Handle error (e.g., show a message to the user)
    }
  });
}

  
  

  updateProduct(): void {
    this.productService.updateProduct(this.productID, this.updatedProduct).subscribe({
      next: (response: ProductPostResponse) => {
        console.log('Product updated successfully', response);
        // Handle success, maybe navigate or show a success message
      },
      error: (error) => {
        console.error('Error updating product', error);
        // Handle error
      }
    });
  }

  deleteProduct(productID: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productID).subscribe({
        next: (response) => {
          console.log('Product deleted successfully', response);
          // Handle success, maybe navigate or show a success message
        },
        error: (error) => {
          console.error('Error deleting product', error);
          // Handle error
        }
      });
    }
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.updatedProduct.image = file;
    }
  }
}
