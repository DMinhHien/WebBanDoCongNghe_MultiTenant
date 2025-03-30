import axios from 'axios';
import { ShopDetails } from '../data/shopdetail';
import {Shop} from '../data/shop'

export const fetchShops = async (): Promise<ShopDetails[]> => {
  const response = await axios.get('https://localhost:7183/Shop/getListUse');
  return response.data;
};

export const fetchShopDetails = async (shopId: string): Promise<ShopDetails> => {
  const response = await axios.get(`https://localhost:7183/Shop/getElementById/${shopId}`);
  return response.data;
};

export const createShop = async (shop: ShopDetails) => {
  try {
    const token = localStorage.getItem("token")
    await axios.post("https://localhost:7183/Shop/create", { data: { userId: shop.userId, name: shop.name, address: shop.address, image: shop.image } }, { headers: { Authorization: `Bearer ${token}`, } })
  } catch (error) {
    console.error("không thể tạo shop", error);
    throw error
  }
}

export const deleteshop = async (id: string) => {
  try {
    const token = localStorage.getItem("token")
    await axios.post("https://localhost:7183/Shop/delete", { id }, { headers: { Authorization: `Bearer ${token}`, } })
  } catch (error) {
    console.error("không thể xóa shop", error);
    throw error
  }
}

export const getShop = async (id: string) => {
  try {
    const res = await axios.get<ShopDetails>(`https://localhost:7183/Shop/getElementById/${id}`)
    return res.data;
  } catch (error) {
    console.error("không thể lấý shop", error);
    throw error
  }
}

export const editShop = async (shop: ShopDetails) => {
  try {
    const token = localStorage.getItem("token")
    await axios.post("https://localhost:7183/Shop/edit", { data: shop }, { headers: { Authorization: `Bearer ${token}`, } })
  } catch (error) {
    console.error("không thể chỉnh sửa shop", error);
    throw error
  }
}

export async function getShopByUserId(userId: string): Promise<Shop | null> {
  const response = await fetch(`https://localhost:7183/Shop/getElementByUserId/${userId}`);
  if (response.ok) {
    return response.json();
  }
  return null;
}
export async function getShopId(userId: string): Promise<string> {
  const response = await fetch(`https://localhost:7183/Shop/getShopId/${userId}`);
  if (response.ok) {
    const result = await response.json();
    return result as string; // Ép kiểu rõ ràng
  }
  return "";
}