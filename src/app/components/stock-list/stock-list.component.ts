import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock.service';
import { Product, Stock } from '../../models/Stock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];
  paginatedStocks: Stock[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalStocks: number = 0;

  constructor(
    private stockService: StockService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe((stocks) => {
      this.stocks = stocks;
      this.totalStocks = this.stocks.length;
      this.updatePaginatedStocks();
    });
  }

  updatePaginatedStocks(): void {
    const filteredStocks = this.filteredStocks();
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedStocks = filteredStocks.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedStocks();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredStocks().length / this.pageSize);
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    this.currentPage = 1;
    this.updatePaginatedStocks();
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

  restock(product: Product): void {
    this.router.navigate(['/stock/restock'], { state: { product } });
  }

  getDisplayedPages(): number[] {
    const totalPages = this.totalPages;
    const maxDisplayedPages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxDisplayedPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

    if (endPage - startPage < maxDisplayedPages - 1) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}
