import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsService } from '../../../admin/services/productService';
import { SubCategory } from '../../../models/subCatgoryMode';
import { Catgory } from '../../../models/catgoryModel';

import { Product } from '../../../models/productsModel';
import { BoxDirective } from '../../directive/box';
import { CartService } from '../../../user/services/cart.service';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, BoxDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnChanges {
  categories: Catgory[] = [];
  subCategories: SubCategory[] = [];
  filteredSubCategories: SubCategory[] = [];
  productList!: Product[];
  filteredProductList!: Product[] 
  categoryId!: string; 
  subCategoryId!: string; 
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 5;
  products: Product[] = [];




  constructor(private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private cartservice: CartService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.cdr.detectChanges();
    console.log('filtered products', this.filteredProductList)
  }

  ngOnInit(): void {

    this.productService.getCategories().subscribe((response) => {
      this.categories = response.Data || [];
    });

    this.productService.getAllSubCategories().subscribe((response) => {
      this.subCategories = response.Data || [];
    });

    this.fetchProducts();
    this.filterProducts();


  }


  fetchProducts(): void {
    this.productService.getAllProduct().subscribe(
      {
        next: (response) => {
          console.log('Get all product response:', response);
          this.productList = response.Data || [];
          this.filteredProductList = this.productList
          //   if(response.pagination){
          //   this.totalPages = Math.ceil(response.pagination?.totalPages / this.itemsPerPage); // Use totalProducts from pagination
          // }},
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        }
      }
    );
  }



  filterProducts(): void {
    if (this.categoryId) {
      this.filteredSubCategories = this.subCategories.filter(
        (subCategory) => subCategory.categoryId === this.categoryId
      );
    } else {
      this.filteredSubCategories = [...this.subCategories];
    }

    const filterParams = {
      categoryId: this.categoryId,
      subCategoryId: this.subCategoryId || '', // Pass an empty string if no subcategory is selected
    };


    this.productService.filterProducts(filterParams).subscribe(
      {
        next: (response: any) => {
          console.log('filtered product response :', response);
          this.filteredProductList = response.Data || []; 
          console.log('Updated Filtered Products:', this.filteredProductList);
    
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching filtered products:', error);
          this.filteredProductList = [];
        }
      }
    );
    //  this.filteredProductList = this.filteredSubCategories 

    console.log('Filtered Subcategories:', this.filteredSubCategories);
    console.log('Filtered Products:', this.filteredProductList);
  }


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchProducts();
    }
  }

  addToCart(product: Product): void {
    const quantity = 1;
    this.cartservice.addToCart(product._id, quantity).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }
}


