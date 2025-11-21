import { Component, inject } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { Product } from '../../core/models/product.interface';
import { CardComponent } from '../../shared/components/card/card.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  imports: [CardComponent, TranslatePipe],
})
export class WishlistComponent {
  private readonly wishlistService = inject(WishlistService);

  wishlist = this.wishlistService.wishlist;

  ngOnInit() {
    this.wishlistService.getLoggedUserWishlistData();
  }
}
