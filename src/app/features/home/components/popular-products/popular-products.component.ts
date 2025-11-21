import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../core/services/Products/products.service';
import { Product } from '../../../../core/models/product.interface';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent, TranslatePipe],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  productList: Product[] = [];

  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData() {
    this.productsService.getProducts().subscribe({
      next: (response) => {
        this.productList = response.data;
      },
      error: (error) => console.log(error),
    });
  }
}
