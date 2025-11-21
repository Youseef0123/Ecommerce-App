import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/Products/products.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterationPipe } from '../../shared/pipes/filteration-pipe';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, FilterationPipe, FormsModule, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productList: WritableSignal<Product[]> = signal([]);

  pageSize!: number;
  total!: number;
  currentPage!: number;
  searchTerm: string = '';

  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(pageNumber: number = 1) {
    this.productsService.getProducts(pageNumber).subscribe({
      next: (response) => {
        this.productList.set(response.data);
        this.pageSize = response.metadata.limit;
        this.total = response.results;
        this.currentPage = response.metadata.current_page;
      },
      error: (error) => console.log(error),
    });
  }
}
