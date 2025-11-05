import { Component } from '@angular/core';
import { Highlight } from '../../shared/directives/highlight';
import { Popup } from '../../shared/directives/popup';

@Component({
  selector: 'app-categories',
  imports: [Popup],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {}
