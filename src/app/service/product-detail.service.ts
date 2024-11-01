import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private http: HttpClient) { }

  createProductDetail(formData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Product_Details/Create`, formData);
  }

  updateProduct(id: number, updateFormBrand: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Products/Update/${id}`, updateFormBrand);
  }
}
