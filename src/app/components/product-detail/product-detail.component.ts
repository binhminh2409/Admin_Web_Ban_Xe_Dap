import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductDetailService } from '../../service/product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  productDetailForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder, private productDetailSV: ProductDetailService) {
    this.productDetailForm = this.fb.group({
      ProductID: ['', Validators.required],
      Weight: ['', [Validators.required, Validators.min(1)]],
      Other_Details: ['', Validators.required]
    });
  }

  // Phương thức xử lý chọn file
  onFileSelect(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.selectedFiles = Array.from(files);
    }
  }

  // Phương thức gửi dữ liệu form
  submitForm(): void {
    if (this.productDetailForm.valid) {
      const formData = new FormData();
      formData.append('ProductID', this.productDetailForm.get('ProductID')?.value);
      formData.append('Weight', this.productDetailForm.get('Weight')?.value);
      formData.append('Other_Details', this.productDetailForm.get('Other_Details')?.value);
      this.selectedFiles.forEach(file => formData.append('Imgage', file));

      this.productDetailSV.createProductDetail(formData).subscribe(
        response => {
          alert('Create successfully');
          this.productDetailForm.reset();
        },
        error => {
          console.error('Error creating product', error);
        }
      );
    }
  }
  selectedForm: string = 'productDetailForm'; // Giá trị mặc định là form đầu tiên

}
