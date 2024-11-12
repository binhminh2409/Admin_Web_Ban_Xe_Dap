// delivery.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Delivery, ResponseData } from '../models/Delivery';

@Injectable({
    providedIn: 'root'
})
export class DeliveryService {
    private apiUrl = 'https://localhost:5001/api/Delivery';

    constructor(private http: HttpClient) { }

    getDeliveries(): Observable<Delivery[]> {
        return this.http.get<ResponseData>(`${this.apiUrl}/All`).pipe(
            map(response => response.data)  // Extract the 'data' field
        );
    }

    getStatus(): Observable<string[]> {
        return this.http.get<ResponseData>(`${this.apiUrl}/GetStatus`).pipe(
            map(response => response.data)  // Extract the 'data' field
        );
    }

    updateDelivery(delivery: Delivery): Observable<Delivery[]> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        console.log(delivery)
        return this.http.put<ResponseData>(`${this.apiUrl}/Update`, delivery, { headers }).pipe(
            map(response => response.data)  // Extract the 'data' field
        );
    }
}
