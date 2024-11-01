import { Component, OnInit } from '@angular/core';
import { AccessoryService } from '../../service/accessory.service';
import { ProductBicycle } from '../../models/ProductBicycle';
import { environment } from '../../../environments/environment.prod';
import { ProductResponseType } from '../../models/ProductType';
import { ProductType } from '../../models/ProductType';

@Component({
  selector: 'app-accessory-list',
  templateUrl: './accessory-list.component.html',
  styleUrls: ['./accessory-list.component.scss']
})
export class AccessoryListComponent {
  producType: ProductType[] = []

  constructor(private accessoryService: AccessoryService) { }

  ngOnInit(): void {
    this.getProductTypes();
  }

  getProductTypes(): void {
    this.accessoryService.getProductType().subscribe({
      next: (response: ProductResponseType) => {
        if (response.success) {
          this.producType = response.data;
          console.log('Dữ liệu sản phẩm trả về:', this.producType);
        } else {
          console.error('Không có dữ liệu sản phẩm', response.message);
        }
      },
      error: (err) => {
        console.error('Error fetching product types', err);
      }
    });
  }

  editProduct(product: ProductBicycle): void {
    // Xử lý logic cho nút Sửa
    console.log('Sửa sản phẩm:', product);
    // Bạn có thể điều hướng đến trang sửa hoặc mở một modal để sửa sản phẩm
  }

  deleteProduct(Id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.accessoryService.deleteProductBicycle(Id).subscribe(
        () => {
          this.producType = this.producType.filter(producType => producType.id !== Id);
          alert('Sản phẩm đã được xóa thành công.');
        },
        (error) => {
          console.error('Lỗi khi xóa sản phẩm:', error);
          alert('Không thể xóa sản phẩm. Vui lòng thử lại sau.');
        }
      );
    }
  }

  getImageUrl(data: ProductType): string {
    const imageUrl = data && data.id ? `${environment.apiUrl}/Products/images/product/${data.id}` : '';
    return imageUrl;
  }
}
