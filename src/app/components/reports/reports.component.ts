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



  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {

    // ***************
    // Sample data
    const sampleData: ReportPayment[] = [
      {
        id: 1,
        userId: 101,
        orderId: 1001,
        totalPrice: 200,
        status: 'Pending',
        extraFee: 10,
        method: 'BANKTRANSFER',
        createdTime: '2024-11-01T12:00:00Z',
        updatedTime: '2024-11-01T12:00:00Z',
        showBookingInfo: false,
        bookingInfo: {
          id: 1001,
          userID: 101,
          shipName: 'John Doe',
          shipAddress: '123 Main St, Springfield',
          shipEmail: 'johndoe@example.com',
          shipPhone: '555-1234',
          cart: [1, 2],
          no_: 'ORD-1001',
          status: 'Shipped',
          orderDetails: 
            {
              id: 1,
              orderID: 'ORD-1001',
              productID: 1,
              productName: 'Product 1',
              priceProduc: 50,
              quantity: 2,
              totalPrice: 100,
              image: 'product1.jpg',
              color: 'Red',
              createdDate: new Date('2024-10-28T10:00:00Z')
            }
        }
      },
      {
        id: 2,
        userId: 102,
        orderId: 1002,
        totalPrice: 300,
        status: 'Pending',
        extraFee: 15,
        method: 'CREDITCARD',
        createdTime: '2024-11-02T14:00:00Z',
        updatedTime: '2024-11-02T14:00:00Z',
        showBookingInfo: false,
        bookingInfo: {
          id: 1002,
          userID: 102,
          shipName: 'Jane Doe',
          shipAddress: '456 Elm St, Springfield',
          shipEmail: 'janedoe@example.com',
          shipPhone: '555-5678',
          cart: [3, 4],
          no_: 'ORD-1002',
          status: 'Pending',
          orderDetails: 
            {
              id: 3,
              orderID: 'ORD-1002',
              productID: 3,
              productName: 'Product 3',
              priceProduc: 75,
              quantity: 2,
              totalPrice: 150,
              image: 'product3.jpg',
              color: 'Green',
              createdDate: new Date('2024-10-29T11:00:00Z')
            }
          
        }
      }
    ];
  // ***************


    // this.reportsService.getPayments().subscribe(
    //   (response: any) => {
    //     if (response.success && Array.isArray(response.data)) {
    //       this.payments = response.data;
    //       this.payments.forEach(payment => payment.showBookingInfo = false);
    //     } else {
    //       console.error('Invalid data:', response);
    //     }
    //   },
    //   (error) => {
    //     console.error('Error loading payments:', error);
    //     alert('Unable to load payments. Please try again later.');
    //   }
    // );
  }

  markAsSuccessful(payment: ReportPayment): void {
    payment.status = 'Successful';

    // this.reportsService.markAsSuccessful(payment.id).subscribe({
    //   next: (response) => {
    //     // Handle success, maybe update the payment status or show a success message
    //     console.log('Payment marked as received:', response);
    //   },
    //   error: (error) => {
    //     console.error('Error updating payment status:', error);
    //   }
    // });
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
