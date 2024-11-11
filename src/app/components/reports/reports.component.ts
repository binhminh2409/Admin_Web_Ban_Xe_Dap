import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../service/reports.service'; // Assuming there's a service to fetch payment data
import { ReportPayment } from '../../models/ReportPayment';
import { OrderWithDetail } from '../../models/OrderWithDetails';
import { PaginationService } from 'ngx-pagination';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  payments: ReportPayment[] = [];
  currentPage: number = 1; // Current page for pagination
  itemsPerPage: number = 10; // Items per page for pagination
  totalItems: number = 50;
  constructor(private reportsService: ReportsService) { }
  page: number = 1;
  ngOnInit(): void {
    this.loadPayments();
    
  }



  loadPayments(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage

    this.reportsService.getPayments().subscribe(
      (response: any) => {
        if (response.success && Array.isArray(response.data)) {
          this.payments = response.data.slice(startIndex, endIndex);
          this.totalItems = response.data.length;  // Cập nhật tổng số item
          this.payments.forEach(payment => payment.showBookingInfo = false);
          this.payments = response.data.slice(startIndex, endIndex);
          console.log('Payments:', this.payments);
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

  markAsSuccessful(payment: ReportPayment): void {
    payment.status = 'Successful';

    this.reportsService.markAsSuccessful(payment.id).subscribe({
      next: (response) => {
        // Handle success, maybe update the payment status or show a success message
        console.log('Payment marked as received:', response);
      },
      error: (error) => {
        console.error('Error updating payment status:', error);
      }
    });
  }


  toggleBookingInfo(payment: ReportPayment) {
    payment.showBookingInfo = !payment.showBookingInfo;

    if (payment.showBookingInfo && !payment.bookingInfo) {
      // Fetch booking info if not already loaded
      this.reportsService.getOrderById(payment.orderId).subscribe(
        orderWithDetail => {
          payment.bookingInfo = orderWithDetail;
        },
        error => console.error('Error fetching booking info:', error)
      );
    }
  }

  pageChanged(page: number): void {
    this.currentPage = page;
    this.loadPayments();
  }

}
