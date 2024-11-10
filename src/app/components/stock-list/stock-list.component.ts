// src/app/stock-list/stock-list.component.ts
import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock.service';
import { Product, Stock } from '../../models/Stock';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';


@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];
  searchTerm: string = '';

  constructor(
    private stockService: StockService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
  }
  
  filteredStocks(): Stock[] {
    if (!this.searchTerm.trim()) {
      return this.stocks;
    }

    const term = this.searchTerm.toLowerCase();
    return this.stocks.filter(stock =>
      stock.product.productName.toLowerCase().includes(term) ||
      stock.product.colors.toLowerCase().includes(term) ||
      (stock.product.size && stock.product.size.toLowerCase().includes(term))
    );
  }

  getImageUrl(data: Product): string {
    const HostUrl = "https://localhost:5001/api";
    return data && data.id ? `${HostUrl}/Products/images/product/${data.id}` : '';
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe((stocks) => {
      this.stocks = stocks;
    });
  }

  toggleStockInfo(stock: Stock): void {
    stock.showProductInfo = !stock.showProductInfo;
  }

  updateStock(stock: Stock): void {
    // Implement the logic to update stock here
    alert(`Update stock for product ID: ${stock.id}`);
  }

  restock(product: Product): void {
    this.router.navigate(['/stock/restock'], { state: { product } });
  }
}
