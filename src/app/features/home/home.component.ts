import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/Products/products.service';
import { Product } from '../../core/models/product.interface';
import { CardComponent } from '../../shared/components/card/card.component';
import { PopularProductsComponent } from './components/popular-products/popular-products.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { CategoriesComponent } from '../categories/categories.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';

@Component({
  selector: 'app-home',
  imports: [PopularProductsComponent, MainSliderComponent, PopularCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
