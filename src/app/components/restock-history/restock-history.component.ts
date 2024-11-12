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
    searchTerm: string = '';
    itemsPerPage: number = 5;
    currentPage: number = 1;
    totalPages: number = 1;

    constructor(
        private stockService: StockService,
    ) { }

    ngOnInit(): void {
        this.getRestockHistory();
    }

    get filteredData() {
        if (!this.searchTerm) {
            return this.paginatedData;
        }

        const searchLower = this.searchTerm.toLowerCase();

        return this.groupedRestockData.filter(group =>
            group.batchNo.toLowerCase().includes(searchLower) ||
            group.items.some(item => item.product?.productName.toLowerCase().includes(searchLower))
        );
    }

    get paginatedData() {
        // Filter the data based on the search term (if any)
        const filteredGroups = this.searchTerm ?
            this.groupedRestockData.filter(group =>
                group.batchNo.includes(this.searchTerm) ||
                group.items.some(item => item.product?.productName.includes(this.searchTerm))
            )
            : this.groupedRestockData;

        // Calculate the total number of pages after filtering
        const totalFilteredItems = filteredGroups.length;
        const totalPages = Math.ceil(totalFilteredItems / this.itemsPerPage);

        // Ensure currentPage is within the valid range
        if (this.currentPage > totalPages) {
            this.currentPage = totalPages; // Set currentPage to the last page if out of bounds
        }
        if (this.currentPage < 1) {
            this.currentPage = 1; // Prevent negative page numbers
        }

        // Calculate pagination indices
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = this.currentPage * this.itemsPerPage;

        console.log(filteredGroups.slice(startIndex, Math.min(endIndex, totalFilteredItems)))

        // Return the paginated data
        return filteredGroups.slice(startIndex, Math.min(endIndex, totalFilteredItems));
    }



    // Function to handle changing pages
    goToPage(page: number): void {
        if (page < 1 || page > this.totalPages) return; // Prevent out-of-bounds
        this.currentPage = page;
    }

    getRestockHistory(): void {
        this.stockService.getRestockHistory().subscribe((inputStocks) => {
            this.inputStocks = inputStocks.filter(stock => stock.status === 'SUCCESSFUL');
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
        this.totalPages = Math.ceil(this.groupedRestockData.length / this.itemsPerPage);

        // Fetch user data for each item
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
