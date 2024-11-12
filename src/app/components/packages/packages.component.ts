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
  errorMessage: string | null = null;
  statusOptions: string[] = [];


  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.deliveryService.getDeliveries().subscribe(
      deliveries => {
        this.deliveries = deliveries;
      },
      error => {
        this.errorMessage = 'Failed to load deliveries';
        console.error(error);
      }
    );
    this.getStatusOptions();

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


