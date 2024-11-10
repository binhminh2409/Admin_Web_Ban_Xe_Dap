// packages.component.ts

export interface Payment {
    id: number;
    userId: number;
    orderId: number;
    totalPrice: number;
    status: string;
    extraFee: number;
    method: string;
    createdTime: string;
    updatedTime: string;
  }
  
  export interface Delivery {
    eta: string;
    id: number;
    userId: number;
    no_: string;
    status: string;
    partner: string;
    payment: Payment;
    createdTime: string;
    updatedTime: string;
  }
  
  export interface ResponseData {
    success: boolean;
    httpStatusCode: number;
    message: string;
    data: Delivery[];
    totalCount: number;
  }
  