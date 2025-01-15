import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsService } from '../../services/productService';
import { ApiSubCategory } from '../../models/subCatgoryMode';
import { ApiCatgory } from '../../models/catgoryModel';

import { Product } from '../../models/productsModel';
import { BoxDirective } from '../../directive/box';


@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, BoxDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnChanges {
  categories: ApiCatgory[] = [];
  subCategories: ApiSubCategory[] = [];
  filteredSubCategories: ApiSubCategory[] = [];
  productList!: Product[];
  filteredProductList: Product[] = []
  categoryId!: string; // Bound to category dropdown
  subCategoryId!: string; // Bound to subcategory dropdown
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 5;




  constructor(private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef,
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

    // this.productService.getAllProduct(this.currentPage, this.itemsPerPage).subscribe((response) => {
    //   this.productList = response.Data ; 
    //   this.filteredProductList = this.productList; 
    //   console.log('getting all products', this.filteredProductList );



    // });


  }


  fetchProducts(): void {
    this.productService.getAllProduct(this.currentPage, this.itemsPerPage).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.productList = response.Data || [];
        this.filteredProductList= this.productList
        this.totalPages = Math.ceil(response.pagination.totalProducts / this.itemsPerPage); // Use totalProducts from pagination
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  


  filterProducts(): void {
    // Filter subcategories based on selected category
    if (this.categoryId) {
      this.filteredSubCategories = this.subCategories.filter(
        (subCategory) => subCategory.categoryId === this.categoryId
      );
    } else {
      this.filteredSubCategories = [...this.subCategories]; // Show all subcategories if no category is selected
    }

    const filterParams = {
      categoryId: this.categoryId,
      subCategoryId: this.subCategoryId || '', // Pass an empty string if no subcategory is selected
    };

    // Fetch filtered products from the API
    this.productService.filterProducts(filterParams).subscribe(
      (response: any) => {
        console.log('API Response:', response); // Debugging API response
        this.filteredProductList = response.data || []; // Use response.data if it exists
        console.log('Updated Filtered Products:', this.filteredProductList); // Log the updated list
        this.cdr.detectChanges(); // Trigger UI update
      },
      (error) => {
        console.error('Error fetching filtered products:', error);
        this.filteredProductList = [];
      }
    );
    this.productService.filterProducts(filterParams).subscribe(
      (response: any) => {
        console.log('API Response:', response); // Debugging API response
        this.filteredProductList = response.data || []; // Use response.data if it exists
        console.log('Updated Filtered Products:', this.filteredProductList); // Log the updated list
        this.cdr.detectChanges(); // Trigger UI update
      },
      (error) => {
        console.error('Error fetching filtered products:', error);
        this.filteredProductList = [];
      }
    );
    //  this.filteredProductList = this.filteredSubCategories 

    // Debugging: log current state
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
}


