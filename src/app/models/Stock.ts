export interface Product {
    id: number;
    productName: string;
    image: string | null;
    price: number;
    priceHasDecreased: number;
    description: string | null;
    quantity: number;
    brandId: number;
    typeId: number;
    colors: string;
    size: string | null;
  }
  
  export interface Stock {
    id: number;
    product: Product;
    productId: number;
    quantity: number;
    updatedTime: string;
    showProductInfo: boolean
  }
  