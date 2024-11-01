import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  createProduct(formData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Products/Create`, formData);
  }

  updateProduct(id: number, updateFormBrand: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Products/Update/${id}`, updateFormBrand);
  }
}
