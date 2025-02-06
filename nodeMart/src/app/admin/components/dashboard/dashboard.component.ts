import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../shared/services/login.service';
import { Product } from '../../../models/productsModel';
import { ProductsService } from '../../services/productService';
import { ManageProductComponent } from '../manage-product/manage-product.component';
import { CommonModule } from '@angular/common';
import { ModelComponent } from "../model/model.component";

@Component({
  selector: 'app-dashboard',
  imports: [ManageProductComponent, CommonModule, ModelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    products : Product[] =[]
    isModelOpen = false;
    product: Product = {} as Product;
  

  loginService = inject(LoginService)
  productService = inject(ProductsService)
  constructor(){}

  ngOnInit(): void {
    this.getAllProducts()
  }
    

  Logout(){
    this.loginService.logout()
  }
  getAllProducts() {
    this.productService.getAllProduct().subscribe(
      {
        next: (response) => {
          console.log(response)
          this.products = response?.Data || []
        }
      }
    )

  }


    
  loadProduct(product: Product) {
    this.product = product;
    this.openModel();
  }


  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log(response)
        this.getAllProducts();
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllProducts();

  }

}
