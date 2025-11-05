import { RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Product } from '../../core/models/product.interface';
import { Cart } from './models/cart.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  cartItems: Cart = {} as Cart;

  ngOnInit(): void {
    this.getLoggedUserData();
  }

  getLoggedUserData() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this.cartItems = response.data;
      },
      error: (error) => {
        console.error('Error fetching logged user cart data:', error);
      },
    });
  }

  removeItem(id: string) {
    this.cartService.removeItemFromCart(id).subscribe({
      next: (response) => {
        this.cartService.countNumber.set(response.numOfCartItems);
        this.cartItems = response.data;
        console.log(response);
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
      },
    });
  }

  updateCount(id: string, count: number) {
    this.cartService.updateCartCount(id, count).subscribe({
      next: (response) => {
        this.cartItems = response.data;
      },
      error: (error) => {
        console.error('Error updating item count in cart:', error);
      },
    });
  }
}
