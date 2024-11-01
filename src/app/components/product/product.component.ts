import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ProductBicycle } from '../../models/ProductBicycle';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  showUpdateForm: boolean = false;
  productForm: FormGroup;
  updateFormProduct: FormGroup;

  constructor(private fb: FormBuilder, private productSV: ProductService, private route: ActivatedRoute) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      priceHasDecreased: [null, Validators.min(0)],
      quantity: [null, [Validators.required, Validators.min(0)]],
      brandId: [null, Validators.required],
      typeId: [null, Validators.required],
      colors: ['', Validators.required],
      image: [null, Validators.required]
    });

    this.updateFormProduct = this.fb.group({
      id: ['', Validators.required],
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      priceHasDecreased: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      create: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: { product?: string }) => {
      if (params['product']) {
        const product: ProductBicycle = JSON.parse(params['product']);
        this.setProductData(product);
      }
    });
  }

  onSubmitProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('productName', this.productForm.value.productName);
      formData.append('description', this.productForm.value.description);
      formData.append('price', this.productForm.value.price);
      formData.append('priceHasDecreased', this.productForm.value.priceHasDecreased);
      formData.append('quantity', this.productForm.value.quantity);
      formData.append('brandId', this.productForm.value.brandId);
      formData.append('typeId', this.productForm.value.typeId);
      formData.append('colors', this.productForm.value.colors);

      const imageFile = this.productForm.value.image;
      if (imageFile) {
        formData.append('image', imageFile);
      }

      this.productSV.createProduct(formData).subscribe(
        response => {
          alert('Create successfully');
          this.productForm.reset();
        },
        error => {
          console.error('Lỗi khi gửi dữ liệu:', error);
        }
      );
    } else {
      console.error('Biểu mẫu không hợp lệ:', this.productForm.errors);
    }
  }

  onUpdateProduct() {
    if (this.updateFormProduct.valid) {
      const formData = new FormData();
      formData.append('ProductName', this.updateFormProduct.value.productName); // Chú ý viết đúng tên thuộc tính
      formData.append('Price', this.updateFormProduct.value.price); // Chú ý viết đúng tên thuộc tính
      formData.append('PriceHasDecreased', this.updateFormProduct.value.priceHasDecreased);
      formData.append('Description', this.updateFormProduct.value.description); // Chú ý viết đúng tên thuộc tính
      formData.append('Quantity', this.updateFormProduct.value.quantity);
      formData.append('Status', this.updateFormProduct.value.status); // Chú ý viết đúng tên thuộc tính
      formData.append('Create', this.updateFormProduct.value.create); // Chú ý viết đúng tên thuộc tính

      const imageFile = this.updateFormProduct.get('image')?.value; // Chú ý viết đúng tên thuộc tính
      if (imageFile) {
        formData.append('Image', imageFile);
      }

      this.productSV.updateProduct(this.updateFormProduct.value.id, formData).subscribe(
        response => {
          alert('Cập nhật sản phẩm thành công');
          this.updateFormProduct.reset();
        },
        error => {
          console.error('Lỗi khi cập nhật dữ liệu:', error);
        }
      );
    } else {
      console.error('Biểu mẫu cập nhật không hợp lệ:', this.updateFormProduct.errors);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.productForm.patchValue({
      image: file
    });
  }

  onFileChange1(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.updateFormProduct.patchValue({
        image: file
      });
    }
  }

  setProductData(product: ProductBicycle): void {
    this.updateFormProduct.patchValue({
      id: product.id,
      productName: product.productName,
      price: product.price,
      priceHasDecreased: product.priceHasDecreased,
      description: product.description,
      quantity: product.quantity,
      status: product.status,
      create: new Date(product.create).toISOString().split('T')[0],
      image: null
    });
    this.showUpdateForm = true;
  }
}
