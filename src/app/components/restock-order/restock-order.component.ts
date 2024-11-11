import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock.service';  // Assuming this fetches restock data
import { InputStock } from '../../models/InputStock'; // Assuming InputStock model is available

@Component({
    selector: 'app-input-stock',
    templateUrl: './restock-order.component.html',
    styleUrls: ['./restock-order.component.scss']
})
export class RestockOrderComponent implements OnInit {
    inputStocks: InputStock[] = [];
    groupedRestockData: { batchNo: string; items: InputStock[] }[] = [];
    userData: { [userId: number]: { name: string, email: string } } = {}; // Store user data
    searchTerm: string = '';
    itemsPerPage: number = 5;
    currentPage: number = 1;

    constructor(
        private stockService: StockService,
    ) { }

    ngOnInit(): void {
        this.getRestockHistory();
    }

    get filteredData() {
        if (!this.searchTerm) {
            return this.groupedRestockData;
        }

        const searchLower = this.searchTerm.toLowerCase();

        return this.groupedRestockData.filter(group =>
            group.batchNo.toLowerCase().includes(searchLower) ||
            group.items.some(item => item.product?.productName.toLowerCase().includes(searchLower))
        );
    }

    get paginatedData() {
        // Filter grouped data according to search term
        if (this.searchTerm) {
            return this.groupedRestockData.filter(group =>
                group.batchNo.includes(this.searchTerm) ||
                group.items.some(item => item.product?.productName.includes(this.searchTerm))
            );
        }
        return this.groupedRestockData;
    }

    getRestockHistory(): void {
        this.stockService.getRestockHistory().subscribe((inputStocks) => {
            this.inputStocks = inputStocks;
            this.groupRestockData();
        });
    }

    orderArrived(restock: InputStock) {
        this.stockService.restockArrived(restock.batchNo_ ?? "").subscribe(
            (updatedStocks: InputStock[]) => this.updateRestockItems(updatedStocks)
        );
    }

    orderReturned(restock: InputStock) {
        this.stockService.restockReturned(restock.batchNo_ ?? "").subscribe(
            (updatedStocks: InputStock[]) => this.updateRestockItems(updatedStocks)
        );
    }

    orderPaid(restock: InputStock) {
        this.stockService.restockPaid(restock.batchNo_ ?? "").subscribe(
            (updatedStocks: InputStock[]) => this.updateRestockItems(updatedStocks)
        );
    }

    private updateRestockItems(updatedStocks: InputStock[]) {
        // Loop through the updated stocks and update the groupedRestockData
        updatedStocks.forEach(updatedStock => {
            for (let group of this.groupedRestockData) {
                const itemIndex = group.items.findIndex(item => item.id === updatedStock.id);
                if (itemIndex !== -1) {
                    group.items[itemIndex] = updatedStock;  // Replace the old item with the updated one
                    break;
                }
            }
        });
    }

    private groupRestockData(): void {
        const groupedData = this.inputStocks.reduce((acc, item) => {
            const batchNo = item.batchNo_ || "unknown"; // Use "unknown" for undefined batch numbers
            if (!acc[batchNo]) {
                acc[batchNo] = [];
            }
            acc[batchNo].push(item);
            return acc;
        }, {} as { [batchNo: string]: InputStock[] });

        this.groupedRestockData = Object.keys(groupedData).map(batchNo => ({
            batchNo,
            items: groupedData[batchNo]
        }));
        this.fetchUserData();
    }

    fetchUserData(): void {
        this.groupedRestockData.forEach(group => {
            group.items.forEach(item => {
                const userId = item.userId;
                if (userId && !this.userData[userId]) { // Check if userId is defined
                    this.stockService.getUserInfo(userId).subscribe((userInfo) => {
                        // Store the fetched user info
                        this.userData[userId] = userInfo;
                    });
                }
            });
        });
    }

    getUserInfo(userId: number): { name: string, email: string } {
        return this.userData[userId] || { name: 'Unknown', email: 'Unknown' };
    }

}
