import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock.service';  // Assuming this fetches restock data
import { InputStock } from '../../models/InputStock'; // Assuming InputStock model is available

@Component({
    selector: 'app-input-stock',
    templateUrl: './restock-history.component.html',
    styleUrls: ['./restock-history.component.scss']
})
export class RestockHistoryComponent implements OnInit {
    inputStocks: InputStock[] = [];
    groupedRestockData: { batchNo: string; items: InputStock[] }[] = [];
    userData: { [userId: number]: { name: string, email: string } } = {}; // Store user data

    constructor(
        private stockService: StockService,
    ) { }

    ngOnInit(): void {
        this.getRestockHistory();
    }

    getRestockHistory(): void {
        this.stockService.getRestockHistory().subscribe((inputStocks) => {
            this.inputStocks = inputStocks;
            this.groupRestockData();
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
