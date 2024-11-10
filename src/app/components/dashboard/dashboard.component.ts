import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ReportsService } from '../../service/reports.service';
import { ReportPayment } from '../../models/ReportPayment';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, LineController, LineElement, PointElement, ArcElement } from 'chart.js';

// Register the necessary components, including LineController
Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, LineController, LineElement, PointElement, ArcElement);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewChecked {
    payments: ReportPayment[] = [];
    revenueData: any = null;
    selectedMonth: number = new Date().getMonth() + 1; // Default to current month
    selectedYear: number = new Date().getFullYear(); // Default to current year
    availableYears: number[] = [2023, 2024, 2025];

    @ViewChild('revenueChart') revenueChart!: ElementRef; // Reference to the canvas element

    constructor(private dashboardService: ReportsService) { }

    ngOnInit(): void {
        this.loadPayments();
    }

    ngAfterViewChecked(): void {
        // Only render the chart if payments are available and canvas is ready
        if (this.revenueData && this.revenueChart && this.revenueChart.nativeElement) {
            this.renderRevenueChart();
        }
    }

    loadPayments(): void {
        this.dashboardService.getPayments().subscribe(
            (response: any) => {
                if (response.success && Array.isArray(response.data)) {
                    this.payments = response.data.map((payment: ReportPayment) => ({
                        ...payment,
                        showBookingInfo: false // Initialize booking info visibility
                    }));
                    this.loadRevenueChart(); // Load the chart after payments are loaded
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

    loadRevenueChart(): void {
        if (!this.payments.length) {
            console.warn('No payments available to load revenue chart.');
            return;
        }

        const filteredPayments = this.payments.filter(payment => {
            const paymentDate = new Date(payment.createdTime);
            return paymentDate.getMonth() + 1 === this.selectedMonth && paymentDate.getFullYear() === this.selectedYear;
        });
        const revenueByDay: { [key: string]: number } = {};
        filteredPayments.forEach(payment => {
            const paymentDate = new Date(payment.createdTime);
            const day = paymentDate.getDate();
            revenueByDay[day] = (revenueByDay[day] || 0) + payment.totalPrice; // Assuming totalPrice is a field in ReportPayment
            
        });
        
        const days = Object.keys(revenueByDay).sort();
        const revenue = days.map(day => revenueByDay[day]);
        console.log(revenue);
        console.log(days);
        this.revenueData = { labels: days, data: revenue };
        console.log(this.revenueData);
    }

    renderRevenueChart(): void {
        if (!this.revenueChart || !this.revenueChart.nativeElement) {
            console.error('Canvas element not found');
            return;
        }
    
        const canvasElement = this.revenueChart.nativeElement as HTMLCanvasElement;
    
        // Destroy existing chart instance if it exists
        const existingChart = Chart.getChart(canvasElement);
        if (existingChart) {
            existingChart.destroy();
        }
    
        // Log revenue data for debugging
        console.log('Revenue Data:', this.revenueData);
    
        // Create a new chart instance
        new Chart(canvasElement, {
            type: 'line', // Line chart
            data: {
                labels: this.revenueData.labels,
                datasets: [{
                    label: 'Revenue',
                    data: this.revenueData.data,
                    borderColor: '#1abc9c',
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Allow custom height/width
                scales: {
                    x: {
                        type: 'category', // Ensure 'category' scale for categorical data
                        title: { display: true, text: 'Days' },
                    },
                    y: {
                        type: 'linear', // 'linear' scale for numeric data
                        title: { display: true, text: 'Revenue' },
                    }
                }
            }
        });
    }

    toggleBookingInfo(payment: ReportPayment): void {
        payment.showBookingInfo = !payment.showBookingInfo;

        if (payment.showBookingInfo && !payment.bookingInfo) {
            this.dashboardService.getOrderById(payment.orderId).subscribe(
                orderWithDetail => {
                    payment.bookingInfo = orderWithDetail;
                },
                error => console.error('Error fetching booking info:', error)
            );
        }
    }
}
