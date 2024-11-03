import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../service/reports.service'; // Assuming there's a service to fetch payment data
import { ReportPayment } from '../../models/ReportPayment';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  payments: ReportPayment[] = [];

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.reportsService.getPayments().subscribe(
      (response: any) => {
        if (response.success && Array.isArray(response.data)) {
          this.payments = response.data;
        } else {
          console.error('Invalid data:', response);
        }
      },
      (error) => {
        console.error('Error loading payments:', error);
        alert('Unable to load payments. Please try again later.');
      }
    );
  }
}
