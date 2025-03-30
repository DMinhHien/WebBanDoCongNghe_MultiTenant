import axios from "axios";
import { Product } from "../data/products";


export const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(`https://localhost:7183/Product/getListUseCategory/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm cho danh mục ${categoryId}:`, error);
      throw error;
    }
  };

  export const fetchProductsByShopId = async (shopId: string): Promise<Product[]> => {
    const response = await axios.get(`https://localhost:7183/Product/getListUseShop/${shopId}`);
    return response.data;
  };

  