import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../service/reports.service'; // Assuming there's a service to fetch payment data
import { ReportPayment } from '../../models/ReportPayment';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  payments: ReportPayment[] = [];
  paginatedPayments: ReportPayment[] = []; // Dữ liệu cho trang hiện tại
  currentPage: number = 1;
  pageSize: number = 10; // Số lượng payment mỗi trang
  totalPayments: number = 0; // Tổng số payment
  isSidebarOpen: boolean = true;

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  loadPayments(): void {
    this.reportsService.getPayments().subscribe(
      (response: any) => {
        if (response.success && Array.isArray(response.data)) {
          this.payments = response.data;
          this.totalPayments = this.payments.length;
          this.updatePaginatedPayments();  // Gọi hàm phân trang
          this.payments.forEach(payment => payment.showBookingInfo = false);
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

  // Cập nhật dữ liệu phân trang
  updatePaginatedPayments(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPayments = this.payments.slice(startIndex, endIndex);
  }

  // Điều hướng đến trang mới
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedPayments();
  }

  // Tổng số trang
  get totalPages(): number {
    return Math.ceil(this.totalPayments / this.pageSize);
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

}