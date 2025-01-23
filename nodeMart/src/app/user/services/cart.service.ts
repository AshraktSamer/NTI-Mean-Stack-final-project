import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}


  addToCart(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/cart/add`, { productId, quantity });
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/cart/remove`, {
      body: { productId },
    });
  }
}
