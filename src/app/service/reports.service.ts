import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportPayment } from '../models/ReportPayment';

@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    private apiUrl = `https://localhost:5001/api/Accounting`; // Replace with the actual endpoint

    constructor(private http: HttpClient) { }

    // Method to fetch all payments
    getPayments(): Observable<{
        success: boolean; data: ReportPayment[]; totalCount: number
    }> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<{ success: boolean; data: ReportPayment[]; totalCount: number }>(`${this.apiUrl}/All`);
    }
}
