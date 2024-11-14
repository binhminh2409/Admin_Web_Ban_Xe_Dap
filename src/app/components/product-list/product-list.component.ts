import { Component, OnInit } from '@angular/core';
import { ProductBicycleService } from '../../service/product-bicycle.service';
import { ProductBicycle } from '../../models/ProductBicycle';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: ProductBicycle[] = [];
  paginatedProducts: ProductBicycle[] = []; // Dữ liệu cho trang hiện tại
  currentPage: number = 1;
  pageSize: number = 10;
  totalProducts: number = 0;
  isSidebarOpen: boolean = true;

  constructor(private productService: ProductBicycleService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  loadProducts(): void {
    this.productService.getProductBicycles().subscribe(
      (response: any) => {
        if (response.success && Array.isArray(response.data)) {
          this.products = response.data;
          this.totalProducts = this.products.length;
          this.updatePaginatedProducts();
        } else {
          console.error('Dữ liệu không hợp lệ:', response);
        }
      },
      (error) => {
        console.error('Lỗi khi tải danh sách sản phẩm:', error);
        alert('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
      }
    );
  }

  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.pageSize);
  }

  editProduct(product: ProductBicycle): void {
    this.router.navigate(['/product', { product: JSON.stringify(product) }]);
  }

  deleteProduct(Id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.deleteProductBicycle(Id).subscribe(
        () => {
          this.products = this.products.filter(product => product.id !== Id);
          this.totalProducts = this.products.length;
          this.updatePaginatedProducts();
          alert('Sản phẩm đã được xóa thành công.');
        },
        (error) => {
          console.error('Lỗi khi xóa sản phẩm:', error);
          alert('Không thể xóa sản phẩm. Vui lòng thử lại sau.');
        }
      );
    }
  }

  getImageUrl(data: ProductBicycle): string {
    return data && data.id ? `${environment.apiUrl}/Products/images/product/${data.id}` : '';
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
