// src/app/services/stock.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Stock } from '../models/Stock';
import { InputStock } from '../models/InputStock';
import { UserInfo } from '../models/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'https://localhost:5001/api/Stock'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getStocks(): Observable<Stock[]> {
    return this.http.get<{ success: boolean; httpStatusCode: number; message: string; data: Stock[] }>(`${this.apiUrl}/All`).pipe(
      map(response => response.data)
    );
  }


  restock(inputStocks: InputStock[]): Observable<InputStock[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<{ success: boolean; httpStatusCode: number; message: string; data: InputStock[] }>(
      `${this.apiUrl}/Restock/Order`,
      inputStocks,
      { headers }
    ).pipe(
      map(response => response.data) // Extracting the data from the response
    );
  }

  restockArrived(batchNo: string): Observable<InputStock[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<{ success: boolean; httpStatusCode: number; message: string; data: InputStock[] }>(
      `${this.apiUrl}/Restock/Arrived/${batchNo}`,
      {},
      { headers }
    ).pipe(
      map(response => response.data) // Extracting the data from the response
    );
  }

  restockReturned(batchNo: string): Observable<InputStock[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<{ success: boolean; httpStatusCode: number; message: string; data: InputStock[] }>(
      `${this.apiUrl}/Restock/Returned/${batchNo}`,
      {},
      { headers }
    ).pipe(
      map(response => response.data) // Extracting the data from the response
    );
  }

  restockPaid(batchNo: string): Observable<InputStock[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<{ success: boolean; httpStatusCode: number; message: string; data: InputStock[] }>(
      `${this.apiUrl}/Restock/Confirm/${batchNo}`,
      {},
      { headers }
    ).pipe(
      map(response => response.data) // Extracting the data from the response
    );
  }

  getRestockHistory(): Observable<InputStock[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ success: boolean; httpStatusCode: number; message: string; data: InputStock[] }>(
      `${this.apiUrl}/Restock/History`, { headers }
    ).pipe(
      map(response => response.data) // Extracting the data from the response
    );
  }

  getUserInfo(userId: number): Observable<UserInfo> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<{ success: boolean; data: UserInfo }>(
      `https://localhost:5001/api/User/GetViewUser?userId=${userId}`, { headers }
    ).pipe(
      map(response => response.data)  // Return only the user data (name, email)
    );
  }
}
