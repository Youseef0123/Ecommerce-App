import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart/services/cart.service';
import { Observable } from 'rxjs';
import { Allorders } from './models/allorders.interface';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe, UpperCasePipe, CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly cartService = inject(CartService);

  Allorders: Allorders[] = [];

  ngOnInit(): void {
    this.getAllUserOrders();
  }

  getAllUserOrders(): void {
    this.cartService.getUserOrders().subscribe({
      next: (res) => {
        console.log('Full Orders Response:', res);

        this.Allorders = res;
      },
    });
  }
}
