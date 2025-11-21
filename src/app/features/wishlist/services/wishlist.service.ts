import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Product } from '../../../core/models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  countNumber: WritableSignal<number> = signal(0);
  wishlist: WritableSignal<Product[]> = signal([]);

  private readonly http = inject(HttpClient);
  addProductToWishlist(productId: string): Observable<any> {
    return this.http.post(environment.baseUrl + 'wishlist', { productId });
  }

  getLoggedUserWishlist(): Observable<any> {
    return this.http.get(environment.baseUrl + 'wishlist');
  }

  removeProductFromWishlist(productId: string): Observable<any> {
    return this.http.delete(environment.baseUrl + `wishlist/${productId}`);
  }

  getLoggedUserWishlistData() {
    this.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlist.set(res.data);
        this.countNumber.set(res.count);
      },
      error: (err) => console.error(err),
    });
  }
}
