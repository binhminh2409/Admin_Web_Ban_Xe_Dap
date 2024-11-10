// delivery.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Delivery, ResponseData } from '../models/Delivery';

@Injectable({
    providedIn: 'root'
})
export class DeliveryService {
    private apiUrl = 'https://localhost:5001/api/Delivery/All';

    constructor(private http: HttpClient) { }

    getDeliveries(): Observable<Delivery[]> {
        return this.http.get<ResponseData>(this.apiUrl).pipe(
            map(response => response.data)  // Extract the 'data' field
        );
    }
}
