import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  createType(formData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Type/Create`, formData);
  }

  updateType(updateFormType: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Type/Update`, updateFormType);
  }

  createBrand(formData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Brand/Create`, formData);
  }

  updateBrand(updateFormBrand: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Brand/Update`, updateFormBrand);
  }
}
