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
  }

  getDeliveriesByStatus(status: string): Delivery[] {
    return this.deliveries.filter(delivery => delivery.status === status);
  }

  cancelDelivery(delivery: Delivery): void {
    this.deliveries = this.deliveries.filter(d => d.id !== delivery.id);
    // alert(`Delivery ${delivery.no_} has been canceled.`);
  }

  // Simulate moving delivery to the next stage
  moveToNextStage(delivery: Delivery): void {
    if (delivery.status === 'NewOrder') {
      delivery.status = 'Shipped';
    } else if (delivery.status === 'Shipped') {
      delivery.status = 'Delivered';
    }
  }
}


