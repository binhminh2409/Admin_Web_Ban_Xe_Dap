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

  constructor(private productService: ProductBicycleService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductBicycles().subscribe(
      (response: any) => {
        if (response.success && Array.isArray(response.data)) {
          // Add `showDetails` property for each product to control collapsibility
          this.products = response.data.map((product: ProductBicycle) => ({
            ...product,
            showDetails: false // Initialize as collapsed
          }));
        } else {
          console.error('Invalid data:', response);
        }
      },
      (error) => {
        console.error('Error loading product list:', error);
        alert('Unable to load product list. Please try again later.');
      }
    );
  }

  toggleDetails(product: ProductBicycle): void {
    product.showDetails = !product.showDetails;
  }

  editProduct(product: ProductBicycle): void {
    console.log('Editing product:', product);
    this.router.navigate(['/product', { product: JSON.stringify(product) }]);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProductBicycle(id).subscribe(
        () => {
          this.products = this.products.filter(product => product.id !== id);
          alert('Product deleted successfully.');
        },
        (error) => {
          console.error('Error deleting product:', error);
          alert('Unable to delete product. Please try again later.');
        }
      );
    }
  }

  getImageUrl(product: ProductBicycle): string {
    return product && product.id ? `${environment.apiUrl}/Products/images/product/${product.id}` : '';
  }
}
