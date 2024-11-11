import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock.service';  // Import your StockService
import { InputStock } from '../../models/InputStock'; // Import models
import { Stock, Product } from '../../models/Stock'; // Import models
import { Router } from '@angular/router';


@Component({
    selector: 'app-input-stock',
    templateUrl: './input-stock.component.html',
    styleUrls: ['./input-stock.component.scss']
})
export class InputStockComponent implements OnInit {
    inputStocks: InputStock[] = [];
    products: Product[] = [];
    newInputStock: InputStock = {
        quantity: 0,
        createdTime: new Date(),
        type: 'RESTOCK',
        price: 0,
        totalPrice: 0,
        status: "ORDERED",
        paid: false
    };
    loadingProducts: boolean = true; 
    passedProduct: Product = history.state.product;
    

    constructor(
        private stockService: StockService,
        private router: Router) { }

    ngOnInit(): void {
        this.getStocks();
        this.inputStocks.push({
            productId: this.passedProduct.id ?? this.passedProduct.id | 0,
            quantity: 0,
            createdTime: new Date(),
            type: 'RESTOCK',
            status: "ORDERED",
            paid: false,
            price: 0,
            totalPrice: 0
        });

    }

    // Fetch available products from the service (if needed)
    getStocks(): void {
        this.stockService.getStocks().subscribe((stocks) => {
            stocks.forEach(stock => {
                this.products.push(stock.product); // Adds product to the array
            });
            this.loadingProducts = false;
            console.log(this.products)
        });
    }

    addInputStock(): void {
        // Add a new input stock to the list without validity check
        this.inputStocks.push({ ...this.newInputStock });
        this.resetNewInputStock(); // Reset the input fields
    }

    updateTotalPrice(inputStock: InputStock): void {
        inputStock.totalPrice = inputStock.quantity * inputStock.price;
    }
    

    getImageUrl(productId: number): string {
        const HostUrl = "https://localhost:5001/api";
        return productId && productId ? `${HostUrl}/Products/images/product/${productId}` : '';
      }

    removeInputStock(index: number): void {
        this.inputStocks.splice(index, 1);
    }

    isValidInputStock(inputStock: InputStock): boolean {
        return inputStock.quantity > 0 && inputStock.price > 0 && inputStock.productId != null;
    }

    resetNewInputStock(): void {
        this.newInputStock = {
            quantity: 0,
            createdTime: new Date(),
            type: 'RESTOCK',
            price: 0,
            status: "ORDERED",
            paid: false,
            totalPrice: 0
        };
    }

    submitInputStocks(): void {
        if (this.inputStocks.length > 0) {
            this.stockService.restock(this.inputStocks).subscribe(
                (response) => {
                    console.log('Input stocks submitted successfully', response);
                    this.inputStocks = []; // Clear the form after submission
                    this.router.navigate(['/stock']);
                },
                (error) => {
                    console.error('Error submitting input stocks', error);
                }
            );
        } else {
            alert('No input stock data to submit.');
        }
    }
}
