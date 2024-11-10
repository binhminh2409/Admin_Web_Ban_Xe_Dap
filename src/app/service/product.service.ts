import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { BrandSelect, TypeSelect } from '../models/Select';
import { Res } from '../models/Res';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `https://localhost:5001/api`; // Replace with the actual endpoint

  constructor(private http: HttpClient) { }

  createProduct(formData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Products/Create`, formData);
  }

  updateProduct(id: number, updateFormBrand: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Products/Update/${id}`, updateFormBrand);
  }


  // Get the list of brands
  getBrands(): Observable<Res<BrandSelect>> {
    return this.http.get<Res<BrandSelect>>(`${this.apiUrl}/Brand/All`);
  }

  // Get the list of types
  getTypes(): Observable<Res<TypeSelect>> {
    return this.http.get<Res<TypeSelect>>(`${this.apiUrl}/Type/All`);
  }
}
