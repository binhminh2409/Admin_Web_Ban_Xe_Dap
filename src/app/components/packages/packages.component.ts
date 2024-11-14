// packages.component.ts
import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../service/delivery.service';
import { Delivery } from '../../models/Delivery';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  deliveries: Delivery[] = [];
  paginatedDeliveries: Delivery[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalDeliveries: number = 0;
  statusOptions: string[] = [];
  errorMessage: string | null = null;


  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.loadDeliveries();
    this.getStatusOptions();

  }

  loadDeliveries(): void {
    this.deliveryService.getDeliveries().subscribe(
      deliveries => {
        this.deliveries = deliveries;
        this.totalDeliveries = deliveries.length;
        this.updatePaginatedDeliveries(); 
      },
      error => {
        this.errorMessage = 'Failed to load deliveries';
        console.error(error);
      }
    );
  }
  

  updatePaginatedDeliveries(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedDeliveries = this.deliveries.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedDeliveries();
  }

  get totalPages(): number {
    return Math.ceil(this.totalDeliveries / this.pageSize);
  }


  getStatusOptions(): void {
    this.deliveryService.getStatus().subscribe((statuses) => {
      this.statusOptions = statuses;
    });
  }

  getDeliveriesByStatus(status: string): Delivery[] {
    return this.deliveries.filter(delivery => delivery.status === status);
  }

  cancelDelivery(delivery: Delivery): void {
    this.deliveries = this.deliveries.filter(d => d.id !== delivery.id);
    // alert(`Delivery ${delivery.no_} has been canceled.`);
  }

  formatStatus(status: string): string {
    return status.replace(/([a-z])([A-Z])/g, '$1 $2'); // Adds a space before uppercase letters
  }

  moveToNextStage(delivery: Delivery, event: Event): void {
    const selectedStatus = (event.target as HTMLSelectElement).value;
    delivery.status = selectedStatus;
    this.deliveryService.updateDelivery(delivery).subscribe(updatedDelivery => {
      console.log('Delivery updated:', updatedDelivery);
    });
  }

}


