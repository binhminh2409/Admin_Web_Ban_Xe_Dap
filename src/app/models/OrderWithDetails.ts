
export interface OrderWithDetail {
    id: number | null;
    userID: number | null;
    shipName: string;
    shipAddress: string;
    shipEmail: string;
    shipPhone: string;
    cart: number[];
    no_: string;
    status: string;
    orderDetails: OrderDetail
}

export interface OrderDetail {
    id: number;
    orderID: string;
    productID: number;
    productName: string;
    priceProduc: number;
    quantity: number;
    totalPrice: number;
    image: string;
    color: string;
    createdDate: Date;
}


