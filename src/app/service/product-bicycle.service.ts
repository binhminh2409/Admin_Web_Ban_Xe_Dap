import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { ProductBicycle } from '../models/ProductBicycle';

@Injectable({
  providedIn: 'root'
})
export class ProductBicycleService {

  constructor(private http: HttpClient) { }

  getProductBicycles(): Observable<ProductBicycle[]> {
    return this.http.get<ProductBicycle[]>(`${environment.apiUrl}/Products/GetAllProduct`);
  }

  deleteProductBicycle(Id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/Products/Delete/${Id}`);
  }
}
