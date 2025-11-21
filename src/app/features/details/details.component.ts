import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../core/models/product.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  id: string | null = null;
  productDetailsList: Product = {} as Product;
  selectedImage: string = '';

  ngOnInit() {
    this.getProductId();
    this.getProductDetailsData();
  }

  getProductId() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getProductDetailsData() {
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next: (res) => {
        this.productDetailsList = res.data;
        this.selectedImage = res.data.imageCover;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  changeImage(img: string) {
    this.selectedImage = img;
  }

  addToCart(productId: string) {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this.toastrService.success('Product added to cart successfully!', 'FreshCart');
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      },
    });
  }
}
