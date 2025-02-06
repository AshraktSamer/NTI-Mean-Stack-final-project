import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';
import { Product, ProductResponse } from '../../models/productsModel';
import { Catgory, CatgoryResponse } from '../../models/catgoryModel';
import { SubCategory, SubCategoryResponse } from '../../models/subCatgoryMode';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpOption;


  constructor(private http: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
       'Content-Type': 'multipart/form-data',     
           // 'Authorization': 'Bearer <token>' 
      }),
    };
  }
//page: number = 1, limit: number = 5   ,, { params }
  getAllProduct(): Observable<ProductResponse<Product[]>> {
    // const params = { page: page.toString(), limit: limit.toString() };
    return this.http
      .get<ProductResponse<Product[]>>(`${environment.apiBaseUrl}/products`,)
}

  getProductByID(productID: number): Observable<ProductResponse<Product>> {
    return this.http
      .get<ProductResponse<Product>>(`${environment.apiBaseUrl}/products/${productID}`)
  }



  postNewProduct(product : Product): Observable<ProductResponse<Product>>{
    return this.http.post<ProductResponse<Product>>(`${environment.apiBaseUrl}/products/` , product)
  }

  updateProduct(product:Product , id: string):Observable<ProductResponse<Product>>{
    return this.http.put<ProductResponse<Product>>(`${environment.apiBaseUrl}/products/${id}` , product)

  }

  deleteProduct(id:string):Observable<ProductResponse<Product>>{
    return this.http.delete<ProductResponse<Product>>(`${environment.apiBaseUrl}/products/${id}` )


  }

  getCategories(): Observable<CatgoryResponse<Catgory[]>> {
    return this.http
      .get<CatgoryResponse<Catgory[]>>(`${environment.apiBaseUrl}/category`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getAllSubCategories(): Observable<SubCategoryResponse<SubCategory[]>> {
    return this.http
      .get<SubCategoryResponse<SubCategory[]>> (`${environment.apiBaseUrl}/subCategory`)
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

    return this.http
      .get<Product[]>(`${environment.apiBaseUrl}/products/filter`, { params: queryParams })
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // getProductBySubCatID(subCatID: string): Observable<Product[]> {
  //   return this.httpClient
  //     .get<Product[]>(`${environment.apiBaseUrl}/products/subcategory/${subCatID}`)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError))
  // }


  // getProductByCatID(CatID: number): Observable<ApiCatgoryResponse[]> {
  //   return this.httpClient
  //     .get<ApiCatgoryResponse[]>(`${environment.apiBaseUrl}/products/category/${CatID}`)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError))
  // }
  // getProductBySubCatIDAndCatID(CatID: string, SubCatID: string): Observable<Product[]> {
  //   return this.httpClient
  //     .get<Product[]>(`${environment.apiBaseUrl}/products/category/${CatID}/subcategory/${SubCatID}`)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError))

  // }


  // postNewProduct(newProduct: Product): Observable<ProductPostResponse> {
  //     const formData = new FormData();
  
  //     formData.append('id', newProduct.id?.toString() || '');
  //     formData.append('name', newProduct.name || '');
  //   const category = typeof newProduct.category === 'string'
  //     ? newProduct.category
  //     : newProduct.category?._id || '';
  //   formData.append('category', category);
  
  //   const subCategory = typeof newProduct.subCategory === 'string'
  //     ? newProduct.subCategory
  //     : newProduct.subCategory?._id || '';
  //   formData.append('subCategory', subCategory);
  
  //   if (newProduct.image  instanceof File) {
  //     formData.append('image', newProduct.image, newProduct.image.name); 
  //   }
    
    
  //     formData.append('description', newProduct.description || '');
  //     formData.append('price', newProduct.price?.toString() || '0');
  //     formData.append('isBestSeller', newProduct.isBestSeller?.toString() || 'false');
  
  //     formData.forEach((value, key) => {
  //       console.log(`${key}: ${value}`);
  //     });
  //   return this.httpClient
  //     .post<ProductPostResponse>(`${environment.apiBaseUrl}/products`, formData )
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError))
  // }



  // deleteProduct(productID: number): Observable<{ status: string; deletedData: Product }> {
  //   return this.httpClient
  //     .delete<{ status: string; deletedData: Product }>(`${environment.apiBaseUrl}/products/${productID}`)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     );


  // }  
  
  // updateProduct(productID: number, updatedProduct: Product): Observable<ProductPostResponse> {
  //   const formData = new FormData();
  
  //   formData.append('id', updatedProduct.id?.toString() || '');
  //   formData.append('name', updatedProduct.name || '');
  
  //   const category = typeof updatedProduct.category === 'string'
  //     ? updatedProduct.category
  //     : updatedProduct.category?._id || '';
  //   formData.append('category', category);
  
  //   const subCategory = typeof updatedProduct.subCategory === 'string'
  //     ? updatedProduct.subCategory
  //     : updatedProduct.subCategory?._id || '';
  //   formData.append('subCategory', subCategory);
  
  //   if (updatedProduct.image && typeof updatedProduct.image !== 'string' && updatedProduct.image instanceof File) {
  //     formData.append('image', updatedProduct.image, updatedProduct.image.name);
  //   }
  
  //   formData.append('description', updatedProduct.description || '');
  //   formData.append('price', updatedProduct.price?.toString() || '0');
  //   formData.append('isBestSeller', updatedProduct.isBestSeller?.toString() || 'false');
  
  //   return this.httpClient
  //     .post<ProductPostResponse>(`${environment.apiBaseUrl}/products/${productID}`, formData)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     );
  // }
  

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
