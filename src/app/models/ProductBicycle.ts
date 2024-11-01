export enum StatusProduct {
    Available = "Available",
    OutOfStock = "OutOfStock",
    Discontinued = "Discontinued",
    OnSale = "OnSale"
  }
  
  export interface ProductBicycle {
    id: number;
    productName: string;
    price: number;
    priceHasDecreased: number;
    description: string;
    quantity: number;
    image: string | null;
    create: string;
    status: StatusProduct;
    isExpanded?: boolean;
  }
  