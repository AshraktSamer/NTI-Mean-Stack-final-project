import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/productService';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../../../models/productsModel';


@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, MatSnackBarModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  product : Product[] =[]
  productForm!: FormGroup;



  constructor(private productService: ProductsService,
    private snackBar: MatSnackBar
    , private router: Router
    , private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.getAllProducts()
    // this.productForm = this.fb.group({
    //   id: [],
    //   name: ['', [Validators.required]],
    //   category: ['', [Validators.required]],
    //   subCategory: ['', [Validators.required]],
    //   price: ['', [Validators.required, Validators.min(0)]],
    //   description: ['', [Validators.required]],
    //   image: ['', []],
    //   isInStock: [true],
    //   isDeleted: [false],
    //   isBestSeller: [false],
    // });

    // this.getCategories();

  }
  // getAllProducts() {
  //   this.productService.getAllProduct().subscribe(
  //     {
  //       next: (response) => {
  //         console.log(response)
  //         this.product = response?.Data || []
  //       }
  //     }
  //   )

  // }
  // getCategories(): void {
  //   this.productService.getCategories().subscribe(
  //     (response) => {
  //       if (response && response.status === 'success' && response.Data) {
  //         this.categories = response.Data;
  //       } else {
  //         console.error('Invalid categories response:', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching categories:', error);
  //     }
  //   );
  // }



  // getSubCategories(event: Event): void {
  //   const categoryId = (event.target as HTMLSelectElement).value;
  //   if (!categoryId) return;

  //   this.productService.getSubCategoriesByCategoryId(categoryId).subscribe(
  //     (response: any) => {
  //       if (response && response.Data) {
  //         this.subCategories = response.Data;
  //       } else {
  //         console.error('Invalid subcategories response:', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching subcategories:', error);
  //     }
  //   );
  // }


  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.productForm.patchValue({
  //       image: file,
  //     });
  //   }
  // }



  // addNewProduct(): void {
  //   if (this.productForm.invalid) {
  //     return;
  //   }

  //   const newProduct: Product = this.productForm.value;

  //   console.log('Request payload:', newProduct); // Log the payload

  //   this.productService.postNewProduct(newProduct).subscribe(
  //     (response: ProductPostResponse) => {
  //       this.snackBar.open('Product added successfully', 'Close', {
  //         duration: 3000,
  //       });
  //       this.router.navigate(['/products']);
  //     },
  //     (error) => {
  //       this.snackBar.open('Error adding product', 'Close', {
  //         duration: 3000,
  //       });
  //       console.error('Error:', error);
  //     }
  //   );
  // }

}
