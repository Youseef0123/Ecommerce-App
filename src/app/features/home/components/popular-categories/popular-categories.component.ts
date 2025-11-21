import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Categories } from '../../../../core/models/categories.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule, TranslatePipe],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categoryList: Categories[] = [];

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    rtl: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData() {
    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        this.categoryList = response.data;
      },
      error: (error) => console.log(error),
    });
  }
}
