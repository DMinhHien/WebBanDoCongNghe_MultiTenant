// Thông tin sản phẩm
interface ProductInfo {
    productName: string;
    unitPrice: number;
    image:string;
    quantity:number;
  }
  
  // Chi tiết sản phẩm trong giỏ hàng
export interface ProductCart {
    id: string;
    idProduct: string;
    quantity: number;
    productInfo: ProductInfo;
  }
  
  // Thông tin cửa hàng
  interface ShopInfo {
    name: string;
    image: string;
  }
  
  // Cửa hàng trong giỏ hàng
  interface Shop {
    shopId: string;
    shopInfo: ShopInfo;
    products: ProductCart[];
  }
  
  // Dữ liệu của giỏ hàng
  export interface Cart {
    id: string;
    userId: string;
    shops: Shop[];
  }
  