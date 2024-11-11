import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ReportPayment } from '../models/ReportPayment';
import { OrderWithDetail } from '../models/OrderWithDetails';

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

  markAsSuccessful(paymentId: number): Observable<ReportPayment> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.apiUrl}/UpdateStatus?paymentId=${paymentId}?Status=Successful`, null, { headers }).pipe(
      map((confirmResponse: any) => {
        if (confirmResponse?.success && confirmResponse?.data) {
          console.log('Confirmed Payment Data:', confirmResponse.data);
          return confirmResponse.data as ReportPayment; // Cast to PaymentDto for the correct return type
        } else {
          console.error('Unexpected response format from Confirm request');
          throw new Error('Invalid response format');
        }
      }),
      catchError((err: Error) => {
        console.error('Error confirming payment:', err);
        return throwError(() => err);
      })
    );
  }

  getOrderById(orderId: number): Observable<OrderWithDetail> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ success: boolean; httpStatusCode: number; message: string; data: OrderWithDetail }>(
      `https://localhost:5001/api/Order/Reports/${orderId}`,
      { headers }
    ).pipe(
      map(response => response.data)
    );
  }
}
