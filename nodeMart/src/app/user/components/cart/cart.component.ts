import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule , FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: any = { products: [], totalAmount: 0 };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
  }


  removeProduct(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe(
      (response) => {
        console.log(response.message);
      },
      (error) => {
        console.error('Error removing product:', error);
      }
    );
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) return;
    this.cartService.addToCart(productId, quantity).subscribe(
      (response) => {
        console.log(response.message);
      },
      (error) => {
        console.error('Error updating quantity:', error);
      }
    );
  }

  checkout(){ }
}