import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Highlight } from '../../shared/directives/highlight';
import { Popup } from '../../shared/directives/popup';
import { TranslatePipe } from '@ngx-translate/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../cart/models/cart.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categories = inject(CategoriesService);
  categoryList: WritableSignal<Category[]> = signal({} as Category[]);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categories.getCategories().subscribe({
      next: (response) => {
        this.categoryList.set(response.data);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }
}
