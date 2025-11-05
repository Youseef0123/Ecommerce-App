import { RouterLink } from '@angular/router';
import { Product } from './../../../core/models/product.interface';
import { Component, inject, Input } from '@angular/core';
import { OnsalePipe } from '../../pipes/onsale-pipe';
import { CurrencyPipe } from '@angular/common';
import { TermPipe } from '../../pipes/term-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
('@angular/common');

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe, TermPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) product: Product = {} as Product;

  private readonly cartService = inject(CartService);

  private readonly toastrService = inject(ToastrService);

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
}
