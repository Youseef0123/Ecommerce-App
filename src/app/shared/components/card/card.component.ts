import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { Product } from './../../../core/models/product.interface';
import {
  Component,
  inject,
  Input,
  WritableSignal,
  signal,
  Output,
  EventEmitter,
} from '@angular/core';
import { OnsalePipe } from '../../pipes/onsale-pipe';
import { CurrencyPipe } from '@angular/common';
import { TermPipe } from '../../pipes/term-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { sign } from 'crypto';
('@angular/common');

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe, TermPipe, TranslatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) product: Product = {} as Product;
  private readonly cartService = inject(CartService);

  private readonly toastrService = inject(ToastrService);

  private readonly wishlistService = inject(WishlistService);

  addProductItemToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (response) => {
        this.cartService.countNumber.set(response.numOfCartItems);
        if (response.status === 'success') {
          this.toastrService.success('Product added to cart successfully', 'FreshCart');
        }
      },
      error: (error) => {
        console.error('Error adding product to cart', error);
      },
    });
  }

  addToWishlist(productId: string) {
    this.wishlistService.addProductToWishlist(productId).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === 'success') {
          this.toastrService.success('Product added to wishlist successfully', 'FreshCart');
          this.wishlistService.countNumber.update((count) => count + 1);
        }
      },
      error: (error) => {
        console.error('Error adding product to wishlist', error);
      },
    });
  }

  removeFromWishlist(productId: string) {
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.toastrService.success('Product removed from wishlist', 'FreshCart');
          this.wishlistService.getLoggedUserWishlistData();

          this.wishlistService.countNumber.update((count) => count - 1);
        }
      },
      error: (error) => console.error('Error removing product from wishlist', error),
    });
  }
}
