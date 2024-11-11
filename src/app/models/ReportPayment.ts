import { OrderWithDetail } from "./OrderWithDetails";

export interface ReportPayment {
    id: number;
    userId: number;
    orderId: number;
    totalPrice: number;
    status: string;
    extraFee: number;
    method: string;
    createdTime: string;
    updatedTime: string;
    showBookingInfo: boolean;
    bookingInfo?: OrderWithDetail
  }
  