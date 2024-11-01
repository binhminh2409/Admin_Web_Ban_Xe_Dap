import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponseType } from '../models/ProductType';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {

  constructor(private http: HttpClient) { }

  getProductType(keyword: string = 'Phụ Kiện'): Observable<ProductResponseType> {
    let params = new HttpParams()
      .set('productType', keyword);
    return this.http.get<ProductResponseType>(`${environment.apiUrl}/Products/GetViewProductType`, { params });
  }

  deleteProductBicycle(Id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/Products/Delete/${Id}`);
  }
}