import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BrandsResponse } from '../models/brands.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private readonly httpClient = inject(HttpClient);

  getAllBrands(): Observable<BrandsResponse> {
    return this.httpClient.get<BrandsResponse>(environment.baseUrl + 'brands');
  }
}
