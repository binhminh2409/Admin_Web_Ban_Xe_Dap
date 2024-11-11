import { Product } from "./Stock";

export interface InputStock {
  id?: number;
  product?: Product;
  productId?: number;
  quantity: number;
  createdTime: Date;
  type: string;
  price: number;
  totalPrice: number;
  batchNo_?: string;
  status: string;
  paid: boolean;
  userId?: number;
}

