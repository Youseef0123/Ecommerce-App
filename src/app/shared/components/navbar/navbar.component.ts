import { AuthService } from './../../../core/auth/services/auth.service';
import { Component, computed, inject, Input, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite/lib/esm/components';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input({ required: true }) isLogin!: boolean;
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly id = inject(PLATFORM_ID);

  count: Signal<number> = computed(() => this.cartService.countNumber());

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if (isPlatformBrowser(this.id)) {
      this.getAllDataCart();
    }
  }

  getAllDataCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this.cartService.countNumber.set(response.numOfCartItems);
      },
      error: (error) => {
        console.error('Error fetching cart data:', error);
      },
    });
  }

  signOut(): void {
    this.authService.logout();
  }
}
