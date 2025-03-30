
export interface Order {
    idReceipt: string;
    accountName: string | null;
    total: number;
    date: string;
    ListSP: {
      idProduct: string;
      productName: string;
      unitPrice: number;
      totalPrice: number;
      quantity: number;
    }[];
}

export interface RawOrderItem {
    idProduct: string;
    quantity: number;
    idReceipt: string;
    receipt: {
      userId: string;
      date: string;
      accountName: string | null;
    };
    product: {
      id: string;
      productName: string;
      unitPrice: number;
      totalPrice: number;
    };
  }
  export interface OrderUser {
    id:string;
    idReceipt: string;
    shopName: string | null;
    totalAmount: number;
    date: Date;
}
export interface OrderDetail{
    id:string;
    idProduct:string;
    productName: string;
    quantity: number;
    unitPrice:number;
    image: string;
}