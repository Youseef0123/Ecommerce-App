import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from './services/brands.service';
import { Brand, Category } from '../cart/models/cart.interface';
import { BrandsResponse } from './models/brands.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  brandList: WritableSignal<Brand[]> = signal([]);
  ngOnInit(): void {
    this.getBrands();
  }
  getBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res: BrandsResponse) => {
        this.brandList.set(res.data);
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
      },
    });
  }
}
