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

  constructor(private deliveryService: DeliveryService) {}

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
}
