import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TypeService } from '../../service/type.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  typeForm: FormGroup;
  updateFormType: FormGroup;
  brandForm: FormGroup;
  updateFormBrand: FormGroup;

  constructor(private fb: FormBuilder, private typeService: TypeService) {
    this.typeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      productType: ['', Validators.required],
      dateCreate: [new Date().toISOString(), Validators.required]
    });

    // Khởi tạo FormGroup cho cập nhật
    this.updateFormType = this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Khởi tạo brandForm cho cập nhật
    this.brandForm = this.fb.group({
      brandName: ['', Validators.required],
      origin: ['', Validators.required],
      create: [new Date().toISOString(), Validators.required]
    });

    // Khởi tạo UpdateGroup cho cập nhật
    this.updateFormBrand = this.fb.group({
      id: ['', Validators.required],
      origin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Nếu bạn cần lấy dữ liệu để cập nhật, gọi ở đây
  }

  onSubmitType() {
    if (this.typeForm.valid) {
      const formData = {
        name: this.typeForm.value.name,
        productType: this.typeForm.value.productType,
        description: this.typeForm.value.description,
        dateCreate: new Date().toISOString()
      };
      this.typeService.createType(formData).subscribe(
        response => {
          this.typeForm.reset();
        },
        error => {
          console.error('Lỗi khi gửi dữ liệu:', error);
        }
      );
    } else {
      console.error('Biểu mẫu không hợp lệ:', this.typeForm.errors);
    }
  }

  onUpdateType() {
    if (this.updateFormType.valid) {
      const updateFormType = {
        id: this.updateFormType.value.id,
        description: this.updateFormType.value.description
      };
      this.typeService.updateType(updateFormType).subscribe(
        response => {
          this.updateFormType.reset();
        },
        error => {
          console.error('Lỗi khi cập nhật dữ liệu:', error);
        }
      );
    } else {
      console.error('Biểu mẫu cập nhật không hợp lệ:', this.updateFormType.errors);
    }
  }

  onSubmitBrand() {
    if (this.brandForm.valid) {
      const formData = {
        brandName: this.brandForm.value.brandName,
        origin: this.brandForm.value.origin,
        create: this.brandForm.value.create,
      };
      this.typeService.createBrand(formData).subscribe(
        response => {
          this.brandForm.reset();
        },
        error => {
          console.error('Lỗi khi gửi dữ liệu:', error);
        }
      );
    } else {
      console.error('Biểu mẫu không hợp lệ:', this.brandForm.errors);
    }
  }

  onUpdateBrand() {
    if (this.updateFormBrand.valid) {
      const updateFormBrand = {
        id: this.updateFormBrand.value.id,
        origin: this.updateFormBrand.value.origin
      };
      this.typeService.updateBrand(updateFormBrand).subscribe(
        response => {
          alert('Cr');
          this.updateFormBrand.reset();
        },
        error => {
          console.error('Lỗi khi cập nhật dữ liệu:', error);
        }
      );
    } else {
      console.error('Biểu mẫu cập nhật không hợp lệ:', this.updateFormBrand.errors);
    }
  }
}

