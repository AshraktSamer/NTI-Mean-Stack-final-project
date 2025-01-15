import { Injectable } from '@angular/core';
import { Product, ProductPostResponse, ProductResponse } from '../models/productsModel';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../enviroment/enviroment';
import { ApiCatgoryResponse } from '../models/catgoryModel';
import { ApiSubCategory, ApiSubCategoryResponse } from '../models/subCatgoryMode';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpOption;


  constructor(private httpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
       'Content-Type': 'multipart/form-data',     
           // 'Authorization': 'Bearer <token>' 
      }),
    };
  }

  getAllProduct(page: number = 1, limit: number = 5): Observable<ProductResponse> {
    const params = { page: page.toString(), limit: limit.toString() };
    return this.httpClient
      .get<ProductResponse>(`${environment.apiBaseUrl}/products`, { params })
      .pipe(
        retry(2),
        catchError(this.handleError))

  }

  getProductByID(productID: number): Observable<ProductPostResponse> {
    return this.httpClient
      .get<ProductPostResponse>(`${environment.apiBaseUrl}/products/${productID}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getCategories(): Observable<ApiCatgoryResponse> {
    return this.httpClient
      .get<ApiCatgoryResponse>(`${environment.apiBaseUrl}/category`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getAllSubCategories(): Observable<ApiSubCategoryResponse> {
    return this.httpClient
      .get<ApiSubCategoryResponse>(`${environment.apiBaseUrl}/subCategory`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getSubCategoriesByCategoryId(categoryId: string): Observable<ApiSubCategory[]> {
    return this.httpClient
      .get<ApiSubCategory[]>(`${environment.apiBaseUrl}/subCategory/${categoryId}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }



  filterProducts(params: { categoryId?: string; subCategoryId?: string }): Observable<Product[]> {
    const queryParams: { [key: string]: string } = {};

    // Dynamically add properties to the queryParams object
    if (params.categoryId) queryParams['categoryId'] = params.categoryId;
    if (params.subCategoryId) queryParams['subCategoryId'] = params.subCategoryId;

    console.log('Request Params:', queryParams); // Debugging request params

    return this.httpClient
      .get<Product[]>(`${environment.apiBaseUrl}/products/filter`, { params: queryParams })
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getProductBySubCatID(subCatID: string): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(`${environment.apiBaseUrl}/products/subcategory/${subCatID}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  getProductByCatID(CatID: number): Observable<ApiCatgoryResponse[]> {
    return this.httpClient
      .get<ApiCatgoryResponse[]>(`${environment.apiBaseUrl}/products/category/${CatID}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  getProductBySubCatIDAndCatID(CatID: string, SubCatID: string): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(`${environment.apiBaseUrl}/products/category/${CatID}/subcategory/${SubCatID}`)
      .pipe(
        retry(2),
        catchError(this.handleError))

  }


  postNewProduct(newProduct: Product): Observable<ProductPostResponse> {
      const formData = new FormData();
  
      formData.append('id', newProduct.id?.toString() || '');
      formData.append('name', newProduct.name || '');
    const category = typeof newProduct.category === 'string'
      ? newProduct.category
      : newProduct.category?._id || '';
    formData.append('category', category);
  
    const subCategory = typeof newProduct.subCategory === 'string'
      ? newProduct.subCategory
      : newProduct.subCategory?._id || '';
    formData.append('subCategory', subCategory);
  
    if (newProduct.image  instanceof File) {
      formData.append('image', newProduct.image, newProduct.image.name); 
    }
    
    
      formData.append('description', newProduct.description || '');
      formData.append('price', newProduct.price?.toString() || '0');
      formData.append('isInStock', newProduct.isInStock?.toString() || 'false');
      formData.append('isDeleted', newProduct.isDeleted?.toString() || 'false');
      formData.append('isBestSeller', newProduct.isBestSeller?.toString() || 'false');
  
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    return this.httpClient
      .post<ProductPostResponse>(`${environment.apiBaseUrl}/products`, formData )
      .pipe(
        retry(2),
        catchError(this.handleError))
  }



  deleteProduct(productID: number): Observable<{ status: string; deletedData: Product }> {
    return this.httpClient
      .delete<{ status: string; deletedData: Product }>(`${environment.apiBaseUrl}/products/${productID}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );


  }  
  
  updateProduct(productID: number, updatedProduct: Product): Observable<ProductPostResponse> {
    const formData = new FormData();
  
    formData.append('id', updatedProduct.id?.toString() || '');
    formData.append('name', updatedProduct.name || '');
  
    const category = typeof updatedProduct.category === 'string'
      ? updatedProduct.category
      : updatedProduct.category?._id || '';
    formData.append('category', category);
  
    const subCategory = typeof updatedProduct.subCategory === 'string'
      ? updatedProduct.subCategory
      : updatedProduct.subCategory?._id || '';
    formData.append('subCategory', subCategory);
  
    if (updatedProduct.image && typeof updatedProduct.image !== 'string' && updatedProduct.image instanceof File) {
      formData.append('image', updatedProduct.image, updatedProduct.image.name);
    }
  
    formData.append('description', updatedProduct.description || '');
    formData.append('price', updatedProduct.price?.toString() || '0');
    formData.append('isInStock', updatedProduct.isInStock?.toString() || 'false');
    formData.append('isDeleted', updatedProduct.isDeleted?.toString() || 'false');
    formData.append('isBestSeller', updatedProduct.isBestSeller?.toString() || 'false');
  
    return this.httpClient
      .post<ProductPostResponse>(`${environment.apiBaseUrl}/products/${productID}`, formData)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(` error occured : ${error.error}`)
    }
    else {
     console.error('Backend returned code:', error.status, ', body was:', error.error);
    }
    return throwError(() => new Error(` something bad happened please try again later  `))
  }

}
