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
  isSidebarOpen: boolean = true;
  constructor(private productService: ProductBicycleService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen; // Đảo ngược trạng thái của sidebar
  }

  loadProducts(): void {
    this.productService.getProductBicycles().subscribe(
      (response: any) => {
        if (response.success && Array.isArray(response.data)) {
          this.products = response.data;
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

  editProduct(product: ProductBicycle): void {
    console.log('Sửa sản phẩm:', product);
    // Điều hướng đến trang sửa sản phẩm với ID sản phẩm
    this.router.navigate(['/product', { product: JSON.stringify(product) }]);
  }

  deleteProduct(Id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.deleteProductBicycle(Id).subscribe(
        () => {
          this.products = this.products.filter(product => product.id !== Id);
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
    const imageUrl = data && data.id ? `${environment.apiUrl}/Products/images/product/${data.id}` : '';
    return imageUrl;
  }
}
